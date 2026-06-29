import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

// ─── Fallback / Default Data ───────────────────────────────
const defaultHero = {
  name: 'Carpel SD',
  title: 'Full Stack Developer',
  tagline: 'Crafting fast, accessible web apps from idea to production',
  resume_url: '',
  github_url: 'https://github.com/YhaZt',
  email: 'mailto:lantocapel1@gmail.com',
};

const defaultAbout = {
  who_i_am: "I'm a developer with a deep passion for building full-stack web applications. My expertise spans across frontend frameworks like React and Vue, backend technologies like Node.js, Express, Laravel, and CodeIgniter 4, and cloud platforms like Firebase, Supabase, and Digital Ocean.\n\nI believe in writing clean, maintainable code and creating intuitive user experiences that make a real difference. Every project is an opportunity to push boundaries and learn something new.",
  what_i_do: "From responsive frontends to robust APIs, from database design to cloud deployment — I handle the full development lifecycle. I work with modern tools and frameworks to deliver production-ready applications.",
  tags: ['Full-Stack Development', 'API Design', 'Cloud Deployment', 'Database Architecture', 'UI/UX Implementation'],
};

const defaultStats = [
  { id: '1', icon: 'Code2', value: 5, suffix: '+', label: 'Years Experience', sort_order: 0 },
  { id: '2', icon: 'Briefcase', value: 8, suffix: '+', label: 'Projects Shipped', sort_order: 1 },
  { id: '3', icon: 'Rocket', value: 12, suffix: '+', label: 'Technologies', sort_order: 2 },
  { id: '4', icon: 'Layers', value: 3, suffix: '+', label: 'Cloud Platforms', sort_order: 3 },
];

const defaultSkillCategories = [
  {
    id: '1', title: 'Frontend', color: 'rgba(59, 130, 246, 0.15)', sort_order: 0,
    skills: [
      { name: 'React', icon: '⚛️', level: 90 },
      { name: 'Vue', icon: '💚', level: 85 },
      { name: 'Quasar', icon: '🔷', level: 80 },
    ],
  },
  {
    id: '2', title: 'Backend', color: 'rgba(34, 197, 94, 0.15)', sort_order: 1,
    skills: [
      { name: 'Node.js', icon: '🟢', level: 88 },
      { name: 'Express', icon: '⚡', level: 85 },
      { name: 'Laravel', icon: '🔴', level: 82 },
      { name: 'CodeIgniter 4', icon: '🔥', level: 80 },
    ],
  },
  {
    id: '3', title: 'Cloud & BaaS', color: 'rgba(249, 115, 22, 0.15)', sort_order: 2,
    skills: [
      { name: 'Firebase', icon: '🔶', level: 85 },
      { name: 'Supabase', icon: '⚡', level: 82 },
      { name: 'Digital Ocean', icon: '🌊', level: 78 },
    ],
  },
  {
    id: '4', title: 'Databases', color: 'rgba(168, 85, 247, 0.15)', sort_order: 3,
    skills: [
      { name: 'PostgreSQL', icon: '🐘', level: 85 },
      { name: 'MongoDB', icon: '🍃', level: 82 },
    ],
  },
];

const defaultProjects = [
  {
    id: '1',
    title: 'Komyut',
    description: 'Commute and transportation companion app — route planning, fare tracking, and commuter-focused features for everyday travel.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/Komyut',
    is_private: true,
    featured: true,
    sort_order: 0,
  },
  {
    id: '2',
    title: 'RITE Website',
    description: 'Official institutional website built with HTML, Vue.js, and modern frontend tooling for RITE.',
    tags: ['HTML', 'Vue', 'JavaScript', 'CSS'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/RITE-Website',
    is_private: false,
    featured: true,
    sort_order: 1,
  },
  {
    id: '3',
    title: 'i-BIBES',
    description: 'Food ordering and bites platform — browse menus, place orders, and manage restaurant interactions.',
    tags: ['Laravel', 'Vue', 'MySQL'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/i-BIBES',
    is_private: true,
    featured: true,
    sort_order: 2,
  },
  {
    id: '4',
    title: 'KPSM',
    description: 'Full-stack management system with admin dashboards, data workflows, and role-based access control.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/kpsm',
    is_private: true,
    featured: true,
    sort_order: 3,
  },
  {
    id: '5',
    title: 'Pet Care App',
    description: 'Pet management application for tracking pets, appointments, health records, and care schedules.',
    tags: ['React', 'Firebase', 'PWA'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/Pet',
    is_private: true,
    featured: false,
    sort_order: 4,
  },
  {
    id: '6',
    title: 'E-Commerce',
    description: 'Online store with product catalog, cart, checkout flow, and admin panel for inventory management.',
    tags: ['Vue', 'Laravel', 'Stripe', 'MySQL'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/e-com',
    is_private: true,
    featured: false,
    sort_order: 5,
  },
  {
    id: '7',
    title: 'LMS',
    description: 'Learning Management System — courses, lessons, student enrollment, progress tracking, and instructor tools.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    image_url: null,
    live_url: null,
    // github_url: 'https://github.com/YhaZt/lms',
    is_private: true,
    featured: false,
    sort_order: 6,
  },
  {
    id: '8',
    title: 'Developer Portfolio',
    description: 'This site — modern portfolio with React, Vite, Tailwind CSS, and ReactBits animations. Hosted free on GitHub Pages.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    image_url: null,
    live_url: 'https://yhazt.github.io',
    github_url: 'https://github.com/YhaZt/YhaZt.github.io',
    is_private: false,
    featured: false,
    sort_order: 7,
  },
];

const defaultSocialLinks = [
  { id: '1', name: 'GitHub', url: 'https://github.com/YhaZt', icon_name: 'Github', color: 'rgba(255, 255, 255, 0.1)', description: 'Open-source projects and contributions', sort_order: 0 },
  { id: '2', name: 'LinkedIn', url: 'https://www.linkedin.com/in/carpel-sweet-dreams-lanto-8515a2258/', icon_name: 'Linkedin', color: 'rgba(10, 102, 194, 0.2)', description: 'Professional background and experience', sort_order: 1 },
  { id: '3', name: 'Email', url: 'mailto:lantocapel1@gmail.com', icon_name: 'Mail', color: 'rgba(234, 67, 53, 0.2)', description: 'Reach out for collaborations or opportunities', sort_order: 2 },
  { id: '4', name: 'Portfolio', url: 'https://yhazt.github.io', icon_name: 'Globe', color: 'rgba(59, 130, 246, 0.2)', description: 'Live portfolio site on GitHub Pages', sort_order: 3 },
];

// ─── Context ───────────────────────────────────────────────
const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [hero, setHero] = useState(defaultHero);
  const [about, setAbout] = useState(defaultAbout);
  const [stats, setStats] = useState(defaultStats);
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [projects, setProjects] = useState(defaultProjects);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [heroRes, aboutRes, statsRes, skillsRes, projRes, linksRes] = await Promise.all([
        supabase.from('hero').select('*').limit(1).single(),
        supabase.from('about').select('*').limit(1).single(),
        supabase.from('stats').select('*').order('sort_order'),
        supabase.from('skill_categories').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('social_links').select('*').order('sort_order'),
      ]);

      if (heroRes.data) setHero(heroRes.data);
      if (aboutRes.data) {
        const d = aboutRes.data;
        setAbout({
          ...d,
          tags: typeof d.tags === 'string' ? JSON.parse(d.tags) : (d.tags || defaultAbout.tags),
        });
      }
      if (statsRes.data?.length) setStats(statsRes.data);
      if (skillsRes.data?.length) {
        setSkillCategories(skillsRes.data.map(cat => ({
          ...cat,
          skills: typeof cat.skills === 'string' ? JSON.parse(cat.skills) : (cat.skills || []),
        })));
      }
      if (projRes.data?.length) {
        setProjects(projRes.data.map(p => ({
          ...p,
          tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
        })));
      }
      if (linksRes.data?.length) setSocialLinks(linksRes.data);
    } catch (err) {
      console.error('Failed to fetch site data:', err);
    }
    setLoading(false);
  }

  return (
    <SiteDataContext.Provider value={{
      hero, about, stats, skillCategories, projects, socialLinks,
      loading, refetch: fetchAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    // Return defaults if used outside provider (shouldn't happen)
    return {
      hero: defaultHero, about: defaultAbout, stats: defaultStats,
      skillCategories: defaultSkillCategories, projects: defaultProjects,
      socialLinks: defaultSocialLinks, loading: false, refetch: () => {},
    };
  }
  return ctx;
}

// ─── Icon Map (for dynamic icon rendering) ─────────────────
export const iconMap = {
  Code2: 'Code2', Coffee: 'Coffee', Briefcase: 'Briefcase', Rocket: 'Rocket',
  Github: 'Github', Linkedin: 'Linkedin', Mail: 'Mail', Globe: 'Globe',
  Twitter: 'Twitter', Facebook: 'Facebook', Instagram: 'Instagram',
  MessageCircle: 'MessageCircle', ExternalLink: 'ExternalLink',
  Calendar: 'Calendar', BarChart3: 'BarChart3', Clock: 'Clock',
  FileDown: 'FileDown', Heart: 'Heart', Star: 'Star', Zap: 'Zap',
  Target: 'Target', Award: 'Award', Users: 'Users', TrendingUp: 'TrendingUp',
  Monitor: 'Monitor', Smartphone: 'Smartphone', Database: 'Database',
  Server: 'Server', Shield: 'Shield', Terminal: 'Terminal', Layers: 'Layers',
};

// Exports for admin
export { defaultHero, defaultAbout, defaultStats, defaultSkillCategories, defaultProjects, defaultSocialLinks };
