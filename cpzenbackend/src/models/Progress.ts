import { db } from '../config/database';
import { UserProgress, UserLastTopic } from '../types';

export class ProgressModel {
  static async getCompletedTopics(userId: string): Promise<string[]> {
    const result = await db.query(
      'SELECT topic_id FROM user_progress WHERE user_id = $1 ORDER BY completed_at ASC',
      [userId]
    );
    return result.rows.map(row => row.topic_id);
  }

  static async getLastTopic(userId: string): Promise<string | null> {
    const result = await db.query(
      'SELECT topic_id FROM user_last_topic WHERE user_id = $1',
      [userId]
    );
    return result.rows[0]?.topic_id || null;
  }

  static async markTopicComplete(userId: string, topicId: string): Promise<void> {
    await db.query(
      `INSERT INTO user_progress (user_id, topic_id) 
       VALUES ($1, $2) 
       ON CONFLICT (user_id, topic_id) DO NOTHING`,
      [userId, topicId]
    );
  }

  static async markTopicIncomplete(userId: string, topicId: string): Promise<void> {
    await db.query(
      'DELETE FROM user_progress WHERE user_id = $1 AND topic_id = $2',
      [userId, topicId]
    );
  }

  static async updateLastTopic(userId: string, topicId: string): Promise<void> {
    await db.query(
      `INSERT INTO user_last_topic (user_id, topic_id) 
       VALUES ($1, $2)
       ON CONFLICT (user_id) 
       DO UPDATE SET topic_id = $2, updated_at = NOW()`,
      [userId, topicId]
    );
  }

  static async getUserProgressStats(userId: string): Promise<{
    completedCount: number;
    totalTopics: number;
    completionPercentage: number;
  }> {
    const result = await db.query(
      'SELECT COUNT(*) as completed_count FROM user_progress WHERE user_id = $1',
      [userId]
    );
    
    const completedCount = parseInt(result.rows[0].completed_count);
    // You can adjust totalTopics based on your topics.ts file
    const totalTopics = 16; // Current count from topics.ts
    const completionPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    
    return {
      completedCount,
      totalTopics,
      completionPercentage
    };
  }

  static async isTopicCompleted(userId: string, topicId: string): Promise<boolean> {
    const result = await db.query(
      'SELECT 1 FROM user_progress WHERE user_id = $1 AND topic_id = $2',
      [userId, topicId]
    );
    return result.rows.length > 0;
  }
} 