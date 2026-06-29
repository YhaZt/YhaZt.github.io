import AnimatedContent from '@/components/AnimatedContent';
import CountUp from '@/components/CountUp';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/SpotlightCard';
import { useSiteData } from '@/lib/data';
import { getIcon } from '@/lib/icons';

export default function About() {
  const { about, stats } = useSiteData();

  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="About"
          title="Building products end to end"
          description="A full-stack developer focused on clean architecture, reliable delivery, and interfaces that feel fast and intentional."
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <AnimatedContent distance={40} direction="horizontal" reverse>
            <SpotlightCard className="h-full p-8 rounded-xl bg-card/80 border border-border/80" spotlightColor="rgba(59, 130, 246, 0.12)">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Who I Am</h3>
              {about.who_i_am.split('\n\n').map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]">{p}</p>
              ))}
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent distance={40} direction="horizontal">
            <SpotlightCard className="h-full p-8 rounded-xl bg-card/80 border border-border/80" spotlightColor="rgba(99, 102, 241, 0.1)">
              <h3 className="text-lg font-semibold mb-4 text-foreground">What I Do</h3>
              <p className="text-muted-foreground leading-relaxed mb-5 text-[0.95rem]">{about.what_i_do}</p>
              <div className="flex flex-wrap gap-2">
                {about.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-md bg-secondary text-muted-foreground border border-border/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, index) => (
            <AnimatedContent key={stat.id || stat.label} distance={30} delay={index * 0.08}>
              <SpotlightCard className="p-5 md:p-6 rounded-xl bg-card/80 border border-border/80 text-center" spotlightColor="rgba(99, 102, 241, 0.08)">
                <div className="text-primary/90 mb-3 flex justify-center">
                  {getIcon(stat.icon, { size: 22 })}
                </div>
                <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1 tabular-nums">
                  <CountUp from={0} to={stat.value} duration={2} separator="," />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
