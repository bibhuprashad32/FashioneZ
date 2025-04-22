"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, ShoppingCart, User, Search, LogOut, Package, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"
import { LoginModal } from "@/components/login-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to search results page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  const handleLogout = () => {
    logout()
    // Close the mobile menu if open
    setIsMenuOpen(false)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
    { name: "Beauty", path: "/beauty" },
    { name: "Home & Living", path: "/home-living" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/70">
              FashioneZ
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition-colors hover:text-primary ${
                pathname === item.path ? "text-primary" : "text-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 items-center justify-center px-2">
          <form onSubmit={handleSearch} className="w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Desktop Right Side Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />

          {user ? (
            <>
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    0
                  </span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowLoginModal(true)}>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden ml-auto items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <div className="hamburger-menu">
              <span className={isMenuOpen ? "hamburger-menu open" : ""}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-2 py-1.5 text-sm rounded-md ${
                    pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/wishlist" className="px-2 py-1.5 text-sm rounded-md flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                  <Link href="/cart" className="px-2 py-1.5 text-sm rounded-md flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                  </Link>
                  <Link href="/profile" className="px-2 py-1.5 text-sm rounded-md flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link href="/orders" className="px-2 py-1.5 text-sm rounded-md flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-2 py-1.5 text-sm rounded-md flex items-center text-left w-full hover:bg-accent"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-2 py-1.5 text-sm rounded-md flex items-center text-left w-full hover:bg-accent"
                >
                  <User className="mr-2 h-4 w-4" />
                  Login / Signup
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </header>
  )
}
