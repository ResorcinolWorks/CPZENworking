import { NotesModel } from '../models/Notes';
import { UserModel } from '../models/User';
import { TopicService } from './TopicService';
import { AppError } from '../middleware/errorHandler';
import { UserNoteWithTopicName } from '../types';

export class NotesService {
  // Helper method to ensure user exists in database
  private static async ensureUserExists(userId: string): Promise<void> {
    const existingUser = await UserModel.getUserByClerkId(userId);
    if (!existingUser) {
      // Create the user if they don't exist
      await UserModel.createUser(userId);
    }
  }

  static async getAllUserNotes(userId: string): Promise<UserNoteWithTopicName[]> {
    await this.ensureUserExists(userId);
    
    const notes = await NotesModel.getAllUserNotes(userId);
    
    return notes.map(note => {
      const topic = TopicService.getTopicById(note.topic_id);
      return {
        topicId: note.topic_id,
        topicName: topic?.name || 'Unknown Topic',
        content: note.content
      };
    });
  }

  static async getUserNote(userId: string, topicId: string): Promise<string | null> {
    // Ensure user exists before getting note
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    return await NotesModel.getUserNote(userId, topicId);
  }

  static async saveUserNote(userId: string, topicId: string, content: string): Promise<void> {
    // Ensure user exists before saving note
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    // Validate content length
    if (content.length > 100) {
      throw new AppError('Note content must be 100 characters or less', 400);
    }

    await NotesModel.saveUserNote(userId, topicId, content);
  }

  static async deleteUserNote(userId: string, topicId: string): Promise<void> {
    // Ensure user exists before deleting note
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    await NotesModel.deleteUserNote(userId, topicId);
  }
} 