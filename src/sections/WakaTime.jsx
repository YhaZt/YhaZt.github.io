import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import GlowingButton from '@/components/GlowingButton';
import { BarChart3, ExternalLink } from 'lucide-react';

export default function WakaTime() {
  return (
    <section id="wakatime" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Coding Activity</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              My coding stats powered by WakaTime
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={40}>
          <SpotlightCard className="glass-panel p-10 rounded-2xl text-center max-w-2xl mx-auto" spotlightColor="rgba(59, 130, 246, 0.12)">
            <BarChart3 size={48} className="text-primary/50 mx-auto mb-5" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-foreground mb-2">Live WakaTime Dashboard</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Language breakdowns, daily averages, and coding streaks — tracked in real time on my public WakaTime profile.
            </p>
            <GlowingButton href="https://wakatime.com/@YhaZt">
              View on WakaTime
              <ExternalLink size={16} />
            </GlowingButton>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
}
