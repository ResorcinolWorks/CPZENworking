import { db } from '../config/database';

export class NotesModel {
  static async getUserNote(userId: string, topicId: string): Promise<string | null> {
    const result = await db.query(
      'SELECT content FROM user_notes WHERE user_id = $1 AND topic_id = $2',
      [userId, topicId]
    );
    return result.rows[0]?.content || null;
  }

  static async saveUserNote(userId: string, topicId: string, content: string): Promise<void> {
    await db.query(
      `INSERT INTO user_notes (user_id, topic_id, content) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (user_id, topic_id) 
       DO UPDATE SET content = EXCLUDED.content, updated_at = CURRENT_TIMESTAMP`,
      [userId, topicId, content]
    );
  }

  static async deleteUserNote(userId: string, topicId: string): Promise<void> {
    await db.query(
      'DELETE FROM user_notes WHERE user_id = $1 AND topic_id = $2',
      [userId, topicId]
    );
  }

  static async getAllUserNotes(userId: string): Promise<Array<{ topic_id: string, content: string }>> {
    const result = await db.query(
      'SELECT topic_id, content FROM user_notes WHERE user_id = $1 ORDER BY updated_at DESC',
      [userId]
    );
    return result.rows;
  }
} 