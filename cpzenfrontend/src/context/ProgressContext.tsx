import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { api, Topic as ApiTopic, ProgressData } from '@/lib/api';

export interface Topic extends ApiTopic {
  is_completed?: boolean;
  description?: string;
}

interface ProgressContextType {
  topics: Topic[];
  completedTopics: Set<string>;
  toggleTopic: (topicId: string) => void;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  completedCount: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = isSignedIn ? await getToken() : null;

      if (token) {
        const progressData = await api.getUserProgress(token);
        const completedIds = new Set(progressData.completedTopics);

        const topicsWithCompletion = progressData.topics.map(topic => ({
          ...topic,
          is_completed: completedIds.has(topic.id)
        }));
        
        setTopics(topicsWithCompletion);
        setCompletedTopics(completedIds);
      } else {
        const allTopics = await api.getTopics();
        setTopics(allTopics.map(t => ({...t, is_completed: false})));
        setCompletedTopics(new Set());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch topics');
      console.error('Failed to fetch topics:', err);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      fetchTopics();
    }
  }, [isSignedIn, isLoaded, fetchTopics]);

  const toggleTopic = (topicId: string) => {
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          await api.toggleTopicCompletion(topicId, token);
        }
        
        const newCompletedTopics = new Set(completedTopics);
        if (newCompletedTopics.has(topicId)) {
          newCompletedTopics.delete(topicId);
        } else {
          newCompletedTopics.add(topicId);
        }
        setCompletedTopics(newCompletedTopics);

        setTopics(prevTopics => 
          prevTopics.map(t => 
            t.id === topicId ? { ...t, is_completed: !t.is_completed } : t
          )
        );
      } catch (err) {
        console.error("Failed to toggle topic status:", err);
      }
    })();
  };

  const completedCount = completedTopics.size;

  return (
    <ProgressContext.Provider value={{ 
      topics,
      completedTopics,
      toggleTopic,
      completedCount,
      isLoading,
      error,
      refetch: fetchTopics
    }}>
      {children}
    </ProgressContext.Provider>
  );
}; 