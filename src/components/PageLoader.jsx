import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GradientText from '@/components/GradientText';

export default function PageLoader({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;

    const tick = (now) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => onDone?.(), 350);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="loader-orb loader-orb-1" />
        <div className="loader-orb loader-orb-2" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-t-primary border-r-purple-500 border-b-transparent border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_oklch(0.62_0.2_264)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        <GradientText
          colors={['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6']}
          animationSpeed={5}
          className="text-2xl md:text-3xl font-bold tracking-tight"
        >
          Carpel SD
        </GradientText>

        <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Loading portfolio
        </p>
      </div>
    </motion.div>
  );
}
