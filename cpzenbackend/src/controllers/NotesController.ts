import { Request, Response } from 'express';
import { NotesService } from '../services/NotesService';
import { asyncHandler, AppError } from '../middleware/errorHandler';

export class NotesController {
  // GET /api/notes - Get all notes for a user
  static getAllUserNotes = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const notes = await NotesService.getAllUserNotes(userId);
    res.json({
      success: true,
      data: notes
    });
  });

  // GET /api/notes/:topicId - Get user's note for a specific topic
  static getUserNote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId } = req.params;
    
    const note = await NotesService.getUserNote(userId, topicId);
    
    res.json({
      success: true,
      data: { note }
    });
  });

  // POST /api/notes - Save or update user's note for a topic
  static saveUserNote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId, content } = req.body;
    
    if (!content || content.trim().length === 0) {
      throw new AppError('Note content cannot be empty', 400);
    }

    if (content.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Notes must be 100 characters or less'
      });
    }
    
    await NotesService.saveUserNote(userId, topicId, content.trim());
    
    res.json({
      success: true,
      message: 'Note saved successfully'
    });
  });

  // DELETE /api/notes/:topicId - Delete user's note for a specific topic
  static deleteUserNote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId } = req.params;
    
    await NotesService.deleteUserNote(userId, topicId);
    
    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  });
} 