import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/app/providers"

// Import the database initialization function
import { initializeDatabase } from "@/lib/init-db"

// Initialize the database
if (process.env.NODE_ENV === "production") {
  initializeDatabase()
    .then(() => console.log("Database initialized"))
    .catch((error) => console.error("Database initialization error:", error))
}

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FashioneZ - Fashion E-commerce",
  description: "Your one-stop fashion destination",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
