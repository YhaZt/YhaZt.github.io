import GradientText from '@/components/GradientText';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useSiteData } from '@/lib/data';

export default function Hero() {
  const { hero } = useSiteData();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="hero-glow pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/60 backdrop-blur-sm px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              Open to opportunities
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-5">
            Full-stack developer
          </p>

          <h1 className="mb-6">
            <GradientText
              colors={['#60a5fa', '#818cf8', '#a78bfa', '#60a5fa']}
              animationSpeed={8}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              {hero.name}
            </GradientText>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-foreground/90 mb-4">
            {hero.title}
          </p>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            {hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12">
            <a href="#projects" className="btn-primary group">
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#links" className="btn-secondary">
              Get in Touch
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={hero.github_url || 'https://github.com/YhaZt'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/carpel-sweet-dreams-lanto-8515a2258/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={hero.email || 'mailto:lantocapel1@gmail.com'}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
