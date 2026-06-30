import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const COLORS = ['#22d3ee', '#a78bfa', '#60a5fa', '#f472b6', '#34d399', '#fbbf24'];

function createSplash(x, y, big = false) {
  return {
    id: `${Date.now()}-${Math.random()}`,
    x,
    y,
    size: big ? 28 + Math.random() * 20 : 8 + Math.random() * 14,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * Math.PI * 2,
    distance: big ? 40 + Math.random() * 50 : 20 + Math.random() * 30,
  };
}

export default function CursorSplash() {
  const [splashes, setSplashes] = useState([]);
  const lastMove = useRef(0);

  const addSplash = useCallback((x, y, big = false) => {
    const batch = Array.from({ length: big ? 10 : 3 }, () => createSplash(x, y, big));
    setSplashes((prev) => [...prev.slice(-40), ...batch]);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastMove.current < 48) return;
      lastMove.current = now;
      addSplash(e.clientX, e.clientY);
    };

    const onClick = (e) => addSplash(e.clientX, e.clientY, true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [addSplash]);

  useEffect(() => {
    if (!splashes.length) return;
    const timer = setInterval(() => {
      setSplashes((prev) => prev.slice(1));
    }, 120);
    return () => clearInterval(timer);
  }, [splashes.length]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.color,
              boxShadow: `0 0 ${s.size}px ${s.color}`,
            }}
            initial={{ opacity: 0.85, scale: 0.4, x: '-50%', y: '-50%' }}
            animate={{
              opacity: 0,
              scale: 1.8,
              x: `calc(-50% + ${Math.cos(s.angle) * s.distance}px)`,
              y: `calc(-50% + ${Math.sin(s.angle) * s.distance}px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
