import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 md:py-12 pb-24 md:pb-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Carpel SD
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Designed & built with React, Vite, and Tailwind CSS
          </p>
        </div>

        <a
          href="https://github.com/YhaZt/YhaZt.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github size={15} />
          View source
        </a>
      </div>
    </footer>
  );
}
