import { db, initDb } from "./db"

// Initialize the database when the application starts
export async function initializeDatabase() {
  try {
    await initDb()
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database:", error)
  }
}

// Export the database connection
export { db }
