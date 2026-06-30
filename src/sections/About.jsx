import AnimatedContent from '@/components/AnimatedContent';
import CountUp from '@/components/CountUp';
import ScrollFloat from '@/components/ScrollFloat';
import EffectCard from '@/components/EffectCard';
import { useSiteData } from '@/lib/data';
import { getIcon } from '@/lib/icons';

export default function About() {
  const { about, stats } = useSiteData();

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">About Me</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              A passionate full-stack developer who loves turning ideas into clean, scalable, modern web applications.
            </p>
          </AnimatedContent>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <AnimatedContent distance={60} direction="horizontal" reverse>
            <EffectCard className="glass-panel h-full p-8 rounded-2xl" spotlightColor="rgba(59, 130, 246, 0.15)">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Who I Am</h3>
              {about.who_i_am.split('\n\n').map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </EffectCard>
          </AnimatedContent>

          <AnimatedContent distance={60} direction="horizontal">
            <EffectCard className="glass-panel h-full p-8 rounded-2xl" spotlightColor="rgba(139, 92, 246, 0.15)">
              <h3 className="text-xl font-semibold mb-4 text-foreground">What I Do</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{about.what_i_do}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {about.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </EffectCard>
          </AnimatedContent>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedContent key={stat.id || stat.label} distance={40} delay={index * 0.1}>
              <EffectCard className="glass-panel p-6 rounded-2xl text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
                <div className="text-primary mb-3 flex justify-center">
                  {getIcon(stat.icon, { size: 24 })}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <CountUp from={0} to={stat.value} duration={2.5} separator="," />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </EffectCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
