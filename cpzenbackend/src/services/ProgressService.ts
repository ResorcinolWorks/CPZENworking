import { ProgressModel } from '../models/Progress';
import { UserModel } from '../models/User';
import { TopicService } from './TopicService';
import { AppError } from '../middleware/errorHandler';
import { ProgressResponse } from '../types';

export class ProgressService {
  // Helper method to ensure user exists in database
  private static async ensureUserExists(userId: string): Promise<void> {
    const existingUser = await UserModel.getUserByClerkId(userId);
    if (!existingUser) {
      // Create the user if they don't exist
      await UserModel.createUser(userId);
    }
  }

  static async getUserProgress(userId: string): Promise<ProgressResponse> {
    // Ensure user exists before getting progress
    await this.ensureUserExists(userId);

    const [completedTopics, lastTopic] = await Promise.all([
      ProgressModel.getCompletedTopics(userId),
      ProgressModel.getLastTopic(userId)
    ]);

    const topics = TopicService.getAllTopics();

    return {
      completedTopics,
      lastTopic,
      topics
    };
  }

  static async toggleTopicCompletion(userId: string, topicId: string): Promise<{
    isCompleted: boolean;
    message: string;
  }> {
    // Ensure user exists before toggling progress
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    const isCurrentlyCompleted = await ProgressModel.isTopicCompleted(userId, topicId);

    if (isCurrentlyCompleted) {
      await ProgressModel.markTopicIncomplete(userId, topicId);
      return {
        isCompleted: false,
        message: 'Topic marked as incomplete'
      };
    } else {
      await ProgressModel.markTopicComplete(userId, topicId);
      return {
        isCompleted: true,
        message: 'Topic marked as complete'
      };
    }
  }

  static async markTopicComplete(userId: string, topicId: string): Promise<void> {
    // Ensure user exists before marking progress
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    await ProgressModel.markTopicComplete(userId, topicId);
  }

  static async updateLastVisitedTopic(userId: string, topicId: string): Promise<void> {
    // Ensure user exists before updating last topic
    await this.ensureUserExists(userId);

    // Validate topic exists
    if (!TopicService.validateTopicId(topicId)) {
      throw new AppError(`Topic with id '${topicId}' does not exist`, 400);
    }

    await ProgressModel.updateLastTopic(userId, topicId);
  }

  static async getUserStats(userId: string) {
    // Ensure user exists before getting stats
    await this.ensureUserExists(userId);

    const stats = await ProgressModel.getUserProgressStats(userId);
    const topicStats = TopicService.getTopicStats();

    // Get completed topics by difficulty
    const completedTopics = await ProgressModel.getCompletedTopics(userId);
    const completedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };

    completedTopics.forEach(topicId => {
      const topic = TopicService.getTopicById(topicId);
      if (topic) {
        completedByDifficulty[topic.difficulty]++;
      }
    });

    return {
      ...stats,
      completedByDifficulty,
      totalByDifficulty: topicStats.byDifficulty
    };
  }

  static async getNextRecommendedTopic(userId: string): Promise<string | null> {
    // Ensure user exists before getting next topic
    await this.ensureUserExists(userId);

    const completedTopics = await ProgressModel.getCompletedTopics(userId);
    const allTopics = TopicService.getAllTopics();

    // Find first uncompleted topic (assumes topics are ordered by difficulty/progression)
    const nextTopic = allTopics.find(topic => !completedTopics.includes(topic.id));
    
    return nextTopic?.id || null;
  }
} 