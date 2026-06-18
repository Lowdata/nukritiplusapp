import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-8 text-center text-muted-foreground">
        <p className="mb-4">&copy; {new Date().getFullYear()} Nukriti+ Streaming. All rights reserved.</p>
        <p className="text-sm">Built with ❤️ for preserving life memories.</p>
      </div>
    </footer>
  );
}
