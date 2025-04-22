import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json()

    // Check if user already exists
    const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (existingUser.rows.length) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insert user into database
    const result = await db.query(
      "INSERT INTO users (name, email, phone, hashedpassword, rawpassword) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone",
      [name, email, phone, hashedPassword, password], // Store raw password for debugging (remove in production)
    )

    return NextResponse.json({
      user: result.rows[0],
      message: "User registered successfully",
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
