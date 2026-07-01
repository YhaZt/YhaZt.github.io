import { useEffect, useRef, useState } from 'react';
import TechIcon from '@/components/TechIcon';

// Even distribution of points on a sphere (Fibonacci sphere).
function fibonacciSphere(n) {
  return Array.from({ length: n }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta),
    };
  });
}

export default function TechGlobe({ items, iconSize = 42 }) {
  const refs = useRef([]);
  const base = useRef([]);
  const [radius, setRadius] = useState(165);

  if (base.current.length !== items.length) {
    base.current = fibonacciSphere(items.length);
  }

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setRadius(w < 420 ? 110 : w < 768 ? 140 : 165);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const tilt = -0.42;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const speed = prefersReduced ? 0 : 0.0032;

    let angle = 0;
    let frame;

    const render = () => {
      angle += speed;
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);

      for (let i = 0; i < base.current.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const p = base.current[i];

        // rotate around Y
        const x = p.x * ca + p.z * sa;
        let z = -p.x * sa + p.z * ca;
        let y = p.y;

        // tilt around X
        const y2 = y * cosT - z * sinT;
        const z2 = y * sinT + z * cosT;
        y = y2;
        z = z2;

        const depth = (z + 1) / 2; // 0 (back) .. 1 (front)
        const scale = 0.5 + depth * 0.7;

        el.style.transform = `translate(-50%, -50%) translate3d(${x * radius}px, ${y * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(0.3 + depth * 0.7);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = `blur(${(1 - depth) * 1.3}px)`;
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [radius, items.length]);

  const chip = iconSize + 18;

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        style={{ width: radius * 1.1, height: radius * 1.1 }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2">
        {items.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => (refs.current[i] = el)}
            className="absolute left-0 top-0 will-change-transform"
          >
            <div
              className="flex items-center justify-center rounded-2xl bg-card/70 border border-white/10 backdrop-blur-sm shadow-lg hover:border-primary/40 transition-colors"
              style={{ width: chip, height: chip }}
            >
              <TechIcon name={item.name} size={iconSize} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
