import { motion } from 'motion/react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import LogoLoop from '@/components/LogoLoop';
import { useSiteData } from '@/lib/data';

function SkillChip({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3, scale: 1.03 }}
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-background/40 border border-white/8 hover:border-primary/35 transition-colors duration-300"
    >
      <span className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      <motion.span
        className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-lg group-hover:bg-primary/20 transition-colors"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.12,
        }}
      >
        {skill.icon}
      </motion.span>
      <span className="relative text-sm font-medium text-foreground">{skill.name}</span>
    </motion.div>
  );
}

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
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillChip key={skill.name} skill={skill} index={skillIndex + catIndex} />
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
