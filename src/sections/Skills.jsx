import { motion } from 'motion/react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import EffectCard from '@/components/EffectCard';
import LogoLoop from '@/components/LogoLoop';
import { useSiteData } from '@/lib/data';

const RUMBLE_PATHS = [
  { x: [0, 12, -8, 5, 0], y: [0, -14, 10, -6, 0], rotate: [-4, 6, -3, 4, 0] },
  { x: [0, -14, 10, -6, 0], y: [0, 10, -12, 8, 0], rotate: [3, -5, 4, -2, 0] },
  { x: [0, 8, -12, 14, 0], y: [0, 12, -8, 14, 0], rotate: [-2, 5, -6, 3, 0] },
  { x: [0, -10, 16, -8, 0], y: [0, -8, 14, -10, 0], rotate: [5, -3, 6, -4, 0] },
  { x: [0, 16, -6, 10, 0], y: [0, 6, -16, 4, 0], rotate: [-6, 2, -5, 5, 0] },
  { x: [0, -8, 12, -14, 0], y: [0, 14, -6, 12, 0], rotate: [4, -6, 3, -5, 0] },
];

function FloatingSkill({ skill, index }) {
  const path = RUMBLE_PATHS[index % RUMBLE_PATHS.length];
  const duration = 3.2 + (index % 5) * 0.45;

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 min-w-[88px]"
      animate={path}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.18,
      }}
      whileHover={{ scale: 1.12, zIndex: 10 }}
    >
      <motion.div
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-background/60 border border-white/10 shadow-lg backdrop-blur-sm"
        animate={{
          boxShadow: [
            '0 0 0 rgba(99,102,241,0)',
            '0 0 24px rgba(99,102,241,0.35)',
            '0 0 0 rgba(99,102,241,0)',
          ],
        }}
        transition={{ duration: 2.4 + index * 0.2, repeat: Infinity }}
      >
        <span className="text-2xl select-none">{skill.icon}</span>
      </motion.div>
      <span className="text-xs font-medium text-foreground/90 text-center leading-tight">{skill.name}</span>
    </motion.div>
  );
}

function DriftMarquee({ skills }) {
  const items = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-4 mask-fade-x">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((skill, i) => (
          <motion.div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-card/40 border border-white/10 backdrop-blur-md shrink-0"
            animate={{ y: [0, -6, 4, 0] }}
            transition={{
              duration: 2.5 + (i % 4) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          >
            <span className="text-xl">{skill.icon}</span>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const { skillCategories } = useSiteData();

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const techLogos = allSkills.map((s) => ({
    node: (
      <motion.span
        className="text-2xl font-bold text-foreground/70 inline-flex items-center gap-2"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>{s.icon}</span>
        {s.name}
      </motion.span>
    ),
  }));

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
          <div className="mb-10">
            <LogoLoop logos={techLogos} speed={70} logoHeight={36} gap={56} pauseOnHover />
          </div>
        </AnimatedContent>

        <AnimatedContent distance={30} delay={0.15}>
          <DriftMarquee skills={allSkills} />
        </AnimatedContent>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {skillCategories.map((category, catIndex) => (
            <AnimatedContent key={category.id || category.title} distance={50} delay={catIndex * 0.15}>
              <EffectCard
                effectIndex={catIndex}
                className="glass-panel p-6 h-full min-h-[220px]"
                spotlightColor={category.color}
              >
                <h3 className="text-lg font-semibold text-foreground mb-6">{category.title}</h3>
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 min-h-[140px]">
                  {category.skills.map((skill, skillIndex) => (
                    <FloatingSkill
                      key={skill.name}
                      skill={skill}
                      index={skillIndex + catIndex * 3}
                    />
                  ))}
                </div>
              </EffectCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
