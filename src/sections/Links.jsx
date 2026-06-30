import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import EffectCard from '@/components/EffectCard';
import { ExternalLink } from 'lucide-react';
import { useSiteData } from '@/lib/data';
import { getIcon } from '@/lib/icons';
import { useChat } from '@/context/ChatContext';

export default function Links() {
  const { socialLinks } = useSiteData();
  const { openChat } = useChat();

  const isChatLink = (link) =>
    link.icon_name === 'Mail' || link.name.toLowerCase() === 'email';

  return (
    <section id="links" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Let's Connect</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Find me on these platforms — or tap the chat icon bottom-right to message me directly.
            </p>
          </AnimatedContent>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => {
            const card = (
              <EffectCard
                className="glass-panel p-5 hover:border-primary/30 transition-all duration-300 h-full min-h-[148px] flex"
                spotlightColor={link.color}
                effectIndex={index}
              >
                <div className="flex items-start gap-4 w-full">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5">
                    {getIcon(link.icon_name, { size: 24 })}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-2 min-h-[1.5rem]">
                      <h3 className="font-semibold text-foreground">{link.name}</h3>
                      {!isChatLink(link) && (
                        <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.75rem]">
                      {link.description}
                    </p>
                  </div>
                </div>
              </EffectCard>
            );

            return (
            <AnimatedContent
              key={link.id || link.name}
              distance={40}
              delay={index * 0.08}
              className="h-full"
            >
              {isChatLink(link) ? (
                <button
                  type="button"
                  onClick={openChat}
                  className="block group h-full w-full text-left"
                >
                  {card}
                </button>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  {card}
                </a>
              )}
            </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
