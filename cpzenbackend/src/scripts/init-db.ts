import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables (you might need to create a .env file in the backend)
import * as dotenv from 'dotenv';
dotenv.config();

async function initializeDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required');
    console.log('Please set up your .env file in the cpzenbackend folder with:');
    console.log('DATABASE_URL=your_neon_postgresql_connection_string');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('🔗 Connecting to database...');
    
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', '..', 'database.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('📋 Creating database tables...');
    
    // Execute the SQL script
    await pool.query(sqlScript);
    
    console.log('✅ Database tables created successfully!');
    console.log('🎉 Your CpZen Progress Hub database is ready to use!');
    
    // Test a simple query to verify tables exist
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'user_progress', 'user_last_topic', 'user_notes')
      ORDER BY table_name;
    `);
    
    console.log('📊 Created tables:', result.rows.map(row => row.table_name).join(', '));
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
