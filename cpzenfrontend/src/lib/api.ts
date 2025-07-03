const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Topic {
  id: string;
  name: string;
  link: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: string;
  additional_links?: string[];
  practice_sheet?: string;
}

export interface ProgressData {
  completedTopics: string[];
  lastTopic: string | null;
  topics: Topic[];
}

export interface ProgressStats {
  completedCount: number;
  totalTopics: number;
  completionPercentage: number;
  completedByDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  totalByDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
}

export interface UserNote {
  topicId: string;
  topicName: string;
  content: string;
}

class ApiClient {
  private async request<T>(
    url: string,
    options: RequestInit = {},
    token?: string
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  }

  // Topics API (no auth required)
  async getTopics(): Promise<Topic[]> {
    const response = await this.request<{ topics: Topic[] }>('/topics');
    return response.topics || [];
  }

  async getTopicById(id: string): Promise<Topic> {
    return this.request<Topic>(`/topics/${id}`);
  }

  // Progress API (auth required)
  async getUserProgress(token: string): Promise<ProgressData> {
    return this.request<ProgressData>('/progress', {}, token);
  }

  async toggleTopicCompletion(topicId: string, token: string) {
    return this.request('/progress/toggle', {
      method: 'POST',
      body: JSON.stringify({ topicId }),
    }, token);
  }

  async markTopicComplete(topicId: string, token: string) {
    return this.request('/progress/complete', {
      method: 'POST',
      body: JSON.stringify({ topicId }),
    }, token);
  }

  async updateLastTopic(topicId: string, token: string) {
    return this.request('/progress/last-topic', {
      method: 'PUT',
      body: JSON.stringify({ topicId }),
    }, token);
  }

  async getUserStats(token: string): Promise<ProgressStats> {
    return this.request<ProgressStats>('/progress/stats', {}, token);
  }

  async getNextRecommendedTopic(token: string): Promise<string | null> {
    const res = await this.request<{ nextTopicId: string | null }>('/progress/next', {}, token);
    return res.nextTopicId;
  }

  // Notes API (auth required)
  async getAllUserNotes(token: string): Promise<UserNote[]> {
    return this.request<UserNote[]>('/notes', {}, token);
  }

  async getUserNote(topicId: string, token: string): Promise<string | null> {
    try {
      const res = await this.request<{ note: string | null }>(`/notes/${topicId}`, {}, token);
      return res.note;
    } catch (error) {
      // If note doesn't exist, return null instead of throwing
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async saveUserNote(topicId: string, content: string, token: string) {
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify({ topicId, content }),
    }, token);
  }

  async deleteUserNote(topicId: string, token: string) {
    return this.request(`/notes/${topicId}`, {
      method: 'DELETE',
    }, token);
  }
}

export const api = new ApiClient(); 