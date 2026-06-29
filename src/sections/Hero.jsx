import SplitText from '@/components/SplitText';
import GradientText from '@/components/GradientText';
import DecryptedText from '@/components/DecryptedText';
import ShinyText from '@/components/ShinyText';
import Aurora from '@/components/Aurora';
import GlowingButton from '@/components/GlowingButton';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { useSiteData } from '@/lib/data';
import { useChat } from '@/context/ChatContext';

export default function Hero() {
  const { hero } = useSiteData();
  const { openChat } = useChat();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Aurora
          colorStops={['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899']}
          amplitude={1.4}
          speed={0.9}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-4">
          <ShinyText
            text="Welcome to my portfolio"
            speed={3}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          />
        </div>

        <div className="mb-6">
          <GradientText
            colors={['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6']}
            animationSpeed={6}
            className="text-6xl md:text-8xl font-extrabold leading-tight"
          >
            {hero.name}
          </GradientText>
        </div>

        <div className="mb-8">
          <SplitText
            text={hero.title}
            className="text-2xl md:text-3xl font-light text-muted-foreground"
            delay={40}
            duration={0.8}
          />
        </div>

        <div className="mb-12">
          <DecryptedText
            text={hero.tagline}
            animateOn="view"
            speed={30}
            className="text-lg text-muted-foreground/80"
            sequential={true}
            revealDirection="start"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowingButton href="#projects">View Projects</GlowingButton>
          {hero.resume_url && (
            <GlowingButton href={hero.resume_url} variant="outline">
              <FileDown size={18} />
              Download Resume
            </GlowingButton>
          )}
          <GlowingButton onClick={openChat} variant="outline">
            Get in Touch
          </GlowingButton>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href={hero.github_url || 'https://github.com/YhaZt'}
            target="_blank"
            rel="noopener noreferrer"
            className="social-glow"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/carpel-sweet-dreams-lanto-8515a2258/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-glow"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={hero.email || 'mailto:lantocapel1@gmail.com'}
            className="social-glow"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
