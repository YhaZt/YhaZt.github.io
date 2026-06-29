import AnimatedContent from '@/components/AnimatedContent';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/SpotlightCard';
import { BarChart3, ExternalLink } from 'lucide-react';

export default function WakaTime() {
  return (
    <section id="wakatime" className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Activity"
          title="Coding rhythm"
          description="Track record of consistent development — measured with WakaTime."
        />

        <AnimatedContent distance={36}>
          <SpotlightCard
            className="p-8 md:p-10 rounded-xl bg-card/80 border border-border/80 max-w-3xl mx-auto text-center"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <BarChart3 size={40} className="text-primary/50 mx-auto mb-5" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-foreground mb-2">WakaTime profile</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Live language breakdowns, daily averages, and coding streaks are available on my public WakaTime dashboard.
            </p>
            <a
              href="https://wakatime.com/@YhaZt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on WakaTime
              <ExternalLink size={16} />
            </a>
          </SpotlightCard>
        </AnimatedContent>
      </div>
    </section>
  );
}
