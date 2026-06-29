import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import LogoLoop from '@/components/LogoLoop';
import { useSiteData } from '@/lib/data';

export default function Skills() {
  const { skillCategories } = useSiteData();

  const techLogos = skillCategories.flatMap(cat =>
    cat.skills.map(s => ({
      node: <span className="text-2xl font-bold text-foreground/70">{s.name}</span>,
    }))
  );

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Tech Stack</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Technologies and tools I use to bring ideas to life
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={40} delay={0.1}>
          <div className="mb-20">
            <LogoLoop
              logos={techLogos}
              speed={80}
              logoHeight={32}
              gap={48}
              pauseOnHover
            />
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <AnimatedContent key={category.id || category.title} distance={50} delay={catIndex * 0.15}>
              <SpotlightCard
                className="glass-panel p-6 rounded-2xl h-full"
                spotlightColor={category.color}
              >
                <h3 className="text-lg font-semibold text-foreground mb-5">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{skill.icon}</span>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
