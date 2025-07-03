import { db } from '../config/database';

export interface User {
  id: string;
  clerk_user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: Date;
  updated_at: Date;
}

export class UserModel {
  /**
   * Creates a new user or updates an existing one based on the Clerk User ID.
   * This is the primary method for keeping the local user database in sync with Clerk.
   * @param clerkUserId - The unique identifier from Clerk.
   * @param email - The user's email address.
   * @param firstName - The user's first name.
   * @param lastName - The user's last name.
   * @returns The created or updated user record.
   */
  static async createUser(clerkUserId: string, email?: string, firstName?: string, lastName?: string): Promise<User> {
    const result = await db.query(
      `INSERT INTO users (clerk_user_id, email, first_name, last_name) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (clerk_user_id) DO UPDATE SET
         email = EXCLUDED.email,
         first_name = EXCLUDED.first_name,
         last_name = EXCLUDED.last_name,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [clerkUserId, email || null, firstName || null, lastName || null]
    );
    return result.rows[0];
  }

  /**
   * Retrieves a user from the database using their Clerk User ID.
   * @param clerkUserId - The user's Clerk ID.
   * @returns A user object or null if not found.
   */
  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const result = await db.query(
      'SELECT * FROM users WHERE clerk_user_id = $1',
      [clerkUserId]
    );
    return result.rows[0] || null;
  }

  /**
   * Updates a user's record. This is not typically used as Clerk is the source of truth.
   * @param clerkUserId - The Clerk ID of the user to update.
   * @param updates - An object containing the fields to update.
   * @returns The updated user record.
   */
  static async updateUser(clerkUserId: string, updates: Partial<Omit<User, 'id' | 'clerk_user_id' | 'created_at' | 'updated_at'>>): Promise<User> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [clerkUserId, ...Object.values(updates)];
    
    const result = await db.query(
      `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE clerk_user_id = $1 
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * Deletes a user from the local database.
   * @param clerkUserId - The Clerk ID of the user to delete.
   */
  static async deleteUser(clerkUserId: string): Promise<void> {
    await db.query('DELETE FROM users WHERE clerk_user_id = $1', [clerkUserId]);
  }
} 