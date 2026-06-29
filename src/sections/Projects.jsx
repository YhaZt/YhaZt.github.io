import { useState, useMemo } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import SectionHeader from '@/components/SectionHeader';
import SpotlightCard from '@/components/SpotlightCard';
import { ExternalLink, Github, ChevronRight, Lock } from 'lucide-react';
import { useSiteData } from '@/lib/data';

export default function Projects() {
  const { projects } = useSiteData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(true);

  const filters = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
  }, [projects]);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => (p.tags || []).includes(activeFilter));

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Work"
          title="Selected projects"
          description="Production apps, internal tools, and full-stack builds across different domains."
        />

        <AnimatedContent distance={24} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setShowAll(false); }}
                className={`px-3.5 py-1.5 rounded-md text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-foreground text-background'
                    : 'bg-card border border-border/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProjects.map((project, index) => {
            const hasLiveUrl = project.live_url && project.live_url !== '#';

            return (
            <AnimatedContent key={project.id || project.title} distance={36} delay={index * 0.06}>
              <SpotlightCard
                className="group p-0 rounded-xl bg-card/80 border border-border/80 overflow-hidden h-full flex flex-col"
                spotlightColor="rgba(59, 130, 246, 0.08)"
              >
                <div className="h-36 bg-gradient-to-br from-primary/10 via-transparent to-transparent flex items-center justify-center border-b border-border/60">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-semibold tracking-tight text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-foreground leading-snug">{project.title}</h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {project.is_private && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          <Lock size={10} />
                          Private
                        </span>
                      )}
                      {project.featured && (
                        <span className="text-[10px] uppercase tracking-wide text-primary font-medium">Featured</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] rounded bg-secondary/80 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-3 border-t border-border/60">
                    {hasLiveUrl && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={13} />
                        Live
                      </a>
                    )}
                    <a
                      href={project.github_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={13} />
                      {project.is_private ? 'Private repo' : 'Source'}
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
            );
          })}
        </div>

        {filteredProjects.length > 3 && !showAll && (
          <AnimatedContent distance={20} delay={0.2}>
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="btn-secondary"
              >
                View all projects
                <ChevronRight size={16} />
              </button>
            </div>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
