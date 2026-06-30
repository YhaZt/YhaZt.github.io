import { useState, useMemo } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import EffectCard from '@/components/EffectCard';
import ShinyText from '@/components/ShinyText';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { useSiteData } from '@/lib/data';

export default function Projects() {
  const { projects } = useSiteData();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
  }, [projects]);

  const displayedProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => (p.tags || []).includes(activeFilter));

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Projects</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Selected work spanning full-stack apps, APIs, and modern frontends
            </p>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={30} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'glass-panel text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {displayedProjects.map((project, index) => {
            const hasLiveUrl = project.live_url && project.live_url !== '#';

            return (
            <AnimatedContent key={project.id || project.title} distance={50} delay={index * 0.1}>
              <EffectCard
                className="group glass-panel p-0 overflow-hidden h-full flex flex-col"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent flex items-center justify-center border-b border-white/5 overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <div className="flex items-center gap-2">
                      {project.is_private && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          <Lock size={10} />
                          Private
                        </span>
                      )}
                      {project.featured && (
                        <ShinyText text="Featured" speed={4} className="text-xs text-primary" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary/80 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    {hasLiveUrl && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a
                      href={project.github_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={14} />
                      <span>{project.is_private ? 'GitHub (private)' : 'Source'}</span>
                    </a>
                  </div>
                </div>
              </EffectCard>
            </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
