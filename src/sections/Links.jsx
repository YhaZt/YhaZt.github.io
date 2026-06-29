import { useState } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/SpotlightCard';
import ContactModal from '@/components/ContactModal';
import { ExternalLink, Mail } from 'lucide-react';
import { useSiteData } from '@/lib/data';
import { getIcon } from '@/lib/icons';

export default function Links() {
  const [contactOpen, setContactOpen] = useState(false);
  const { socialLinks } = useSiteData();

  return (
    <section id="links" className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let's connect"
          description="Open to collaborations, freelance work, and full-time opportunities."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => (
            <AnimatedContent key={link.id || link.name} distance={32} delay={index * 0.06}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <SpotlightCard
                  className="p-5 rounded-xl bg-card/80 border border-border/80 hover:border-primary/25 transition-colors h-full"
                  spotlightColor={link.color}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-0.5">
                      {getIcon(link.icon_name, { size: 22 })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{link.name}</h3>
                        <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent distance={32} delay={0.3}>
          <div className="mt-14 text-center">
            <SpotlightCard className="inline-block p-8 rounded-xl bg-card/80 border border-border/80 max-w-lg" spotlightColor="rgba(59, 130, 246, 0.1)">
              <h3 className="text-lg font-semibold text-foreground mb-2">Have a project in mind?</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Tell me about the problem you're solving — I'll get back to you within a day or two.
              </p>
              <button
                onClick={() => setContactOpen(true)}
                className="btn-primary cursor-pointer"
              >
                <Mail size={16} />
                Send a message
              </button>
            </SpotlightCard>
          </div>
        </AnimatedContent>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
