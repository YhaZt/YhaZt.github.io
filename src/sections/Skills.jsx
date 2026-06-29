import AnimatedContent from '@/components/AnimatedContent';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/SpotlightCard';
import { useSiteData } from '@/lib/data';

export default function Skills() {
  const { skillCategories } = useSiteData();

  return (
    <section id="skills" className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Expertise"
          title="Tech stack"
          description="Tools and frameworks I use to ship production-ready applications."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.map((category, catIndex) => (
            <AnimatedContent key={category.id || category.title} distance={40} delay={catIndex * 0.1}>
              <SpotlightCard
                className="p-6 rounded-xl bg-card/80 border border-border/80 h-full"
                spotlightColor={category.color}
              >
                <h3 className="text-base font-semibold text-foreground mb-5">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">{skill.level}%</span>
                      </div>
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/80 rounded-full transition-all duration-1000 ease-out"
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
