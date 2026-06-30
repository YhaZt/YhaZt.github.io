import { useRef, useState } from 'react';
import ElectricBorder from '@/components/ElectricBorder';

let effectCounter = 0;

export function useCardEffectIndex() {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = effectCounter;
    effectCounter += 1;
  }
  return ref.current;
}

export default function EffectCard({
  children,
  className = '',
  effectIndex,
  spotlightColor = 'rgba(255, 255, 255, 0.2)',
  rounded = 'rounded-2xl',
}) {
  const autoIndex = useCardEffectIndex();
  const index = effectIndex ?? autoIndex;
  const divRef = useRef(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ElectricBorder className={rounded} presetIndex={index}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(0.55)}
        onMouseLeave={() => setOpacity(0)}
        className={`relative h-full overflow-hidden ${rounded} ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
        <div className="relative z-[1] h-full">{children}</div>
      </div>
    </ElectricBorder>
  );
}
