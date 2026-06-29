import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Code2, Globe, ExternalLink, Calendar, Mail } from 'lucide-react';
import AppBackground from '@/components/AppBackground';
import PageLoader from '@/components/PageLoader';
import FloatingChat from '@/components/FloatingChat';
import Dock from '@/components/Dock';
import ScrollProgress from '@/components/ScrollProgress';
import { ChatProvider } from '@/context/ChatContext';

import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import WakaTime from '@/sections/WakaTime';
import Links from '@/sections/Links';
import Footer from '@/sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <ChatProvider openChat={openChat}>
      <AnimatePresence mode="wait">
        {loading && <PageLoader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-x-hidden">
        <AppBackground />
        <ScrollProgress />

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <WakaTime />
          <Links />
          <Footer />
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Dock
            items={[
              { icon: <div className="text-sm font-bold">H</div>, label: 'Home', onClick: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
              { icon: <Code2 size={18} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
              { icon: <Globe size={18} />, label: 'Skills', onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
              { icon: <ExternalLink size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
              { icon: <Calendar size={18} />, label: 'WakaTime', onClick: () => document.getElementById('wakatime')?.scrollIntoView({ behavior: 'smooth' }) },
              { icon: <Mail size={18} />, label: 'Links', onClick: () => document.getElementById('links')?.scrollIntoView({ behavior: 'smooth' }) },
            ]}
            baseItemSize={40}
            magnification={60}
            panelHeight={56}
            distance={150}
          />
        </div>

        <FloatingChat isOpen={chatOpen} onOpen={openChat} onClose={closeChat} />
      </div>
    </ChatProvider>
  );
}
