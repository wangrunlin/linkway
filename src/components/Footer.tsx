import { siteName } from "@/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6">
          <Link 
            href="/" 
            className="text-sm hover:text-foreground/80 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about"
            className="text-sm hover:text-foreground/80 transition-colors"
          >
            About
          </Link>
          <Link
            href="https://github.com/wangrunlin/linkway"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-foreground/80 transition-colors"
          >
            GitHub
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
