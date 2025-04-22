import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FashioneZ. Made with{" "}
            <Heart className="inline-block h-4 w-4 text-primary" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  )
}
