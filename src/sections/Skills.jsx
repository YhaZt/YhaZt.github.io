import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import LogoLoop from '@/components/LogoLoop';
import TechGlobe from '@/components/TechGlobe';
import TechIcon from '@/components/TechIcon';
import { useSiteData } from '@/lib/data';

export default function Skills() {
  const { skillCategories } = useSiteData();

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const techLogos = allSkills.map((s) => ({
    node: (
      <span className="inline-flex items-center gap-2.5">
        <TechIcon name={s.name} size={30} />
        <span className="text-lg font-semibold text-foreground/80 whitespace-nowrap">{s.name}</span>
      </span>
    ),
  }));

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
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
          <div className="mb-10">
            <LogoLoop logos={techLogos} speed={65} logoHeight={32} gap={56} pauseOnHover />
          </div>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.15}>
          <div className="flex justify-center py-6 overflow-hidden">
            <TechGlobe items={allSkills} />
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
