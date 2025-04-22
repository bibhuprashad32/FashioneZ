import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user in database
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if (!user.rows.length) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].hashedpassword)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "7d",
    })

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        phone: user.rows[0].phone,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
