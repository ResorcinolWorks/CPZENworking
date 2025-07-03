export interface Topic {
  id: string;
  name: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: string;
  additional_links?: string[];
  practice_sheet?: string;
}

export interface UserProgress {
  user_id: string;
  topic_id: string;
  completed_at: Date;
}

export interface UserLastTopic {
  user_id: string;
  topic_id: string;
  updated_at: Date;
}

export interface UserNote {
  user_id: string;
  topic_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserNoteWithTopicName {
  topicId: string;
  topicName: string;
  content: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProgressResponse {
  completedTopics: string[];
  lastTopic: string | null;
  topics: Topic[];
} 