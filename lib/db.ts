import { Pool } from "pg"
import bcryptjs from "bcryptjs"

// Create a PostgreSQL connection pool
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Initialize database tables
export async function initDb() {
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        hashedpassword VARCHAR(255) NOT NULL,
        rawpassword VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create products table
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        size VARCHAR(50),
        color VARCHAR(50),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create wishlist table
    await db.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      )
    `)

    // Create cart table
    await db.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        qty INTEGER NOT NULL DEFAULT 1,
        size VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id, size)
      )
    `)

    // Create orders table
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        items JSONB NOT NULL,
        amount INTEGER NOT NULL,
        utr_no VARCHAR(100),
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create admin table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashedpassword VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert default admin user if not exists
    const adminExists = await db.query("SELECT * FROM admin WHERE email = $1", ["a@admin.user"])

    if (!adminExists.rows.length) {
      const hashedPassword = await bcryptjs.hash("admin", 10)
      await db.query("INSERT INTO admin (email, hashedpassword, password) VALUES ($1, $2, $3)", [
        "a@admin.user",
        hashedPassword,
        "admin",
      ])
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
  }
}
