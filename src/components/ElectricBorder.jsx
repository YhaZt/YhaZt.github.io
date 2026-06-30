import { useId } from 'react';

const FILTER_TEMPLATE = (id, duration, seed) => `
  <filter id="${id}" colorInterpolationFilters="sRGB" x="-25%" y="-25%" width="150%" height="150%">
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="${seed}" />
    <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
      <animate attributeName="dy" values="700; 0" dur="${duration}s" repeatCount="indefinite" calcMode="linear" />
    </feOffset>
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="${seed}" />
    <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
      <animate attributeName="dy" values="0; -700" dur="${duration}s" repeatCount="indefinite" calcMode="linear" />
    </feOffset>
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="${seed + 1}" />
    <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
      <animate attributeName="dx" values="490; 0" dur="${duration}s" repeatCount="indefinite" calcMode="linear" />
    </feOffset>
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="${seed + 1}" />
    <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
      <animate attributeName="dx" values="0; -490" dur="${duration}s" repeatCount="indefinite" calcMode="linear" />
    </feOffset>
    <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
    <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
    <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
    <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="28" xChannelSelector="R" yChannelSelector="B" />
  </filter>
`;

export const ELECTRIC_PRESETS = [
  { color: '#22d3ee', duration: 5.5, seed: 1 },
  { color: '#a78bfa', duration: 6.2, seed: 3 },
  { color: '#34d399', duration: 4.8, seed: 5 },
  { color: '#fbbf24', duration: 6.8, seed: 7 },
  { color: '#f472b6', duration: 5.2, seed: 9 },
  { color: '#60a5fa', duration: 7.1, seed: 11 },
  { color: '#fb923c', duration: 4.5, seed: 13 },
  { color: '#e879f9', duration: 6.5, seed: 15 },
];

export default function ElectricBorder({
  children,
  className = '',
  color,
  duration,
  seed,
  presetIndex = 0,
}) {
  const uid = useId().replace(/:/g, '');
  const filterId = `eb-${uid}`;
  const preset = ELECTRIC_PRESETS[presetIndex % ELECTRIC_PRESETS.length];
  const borderColor = color ?? preset.color;
  const animDuration = duration ?? preset.duration;
  const animSeed = seed ?? preset.seed;

  return (
    <div
      className={`electric-border ${className}`}
      style={{ '--electric-color': borderColor }}
    >
      <svg className="electric-border-svg" aria-hidden="true">
        <defs dangerouslySetInnerHTML={{ __html: FILTER_TEMPLATE(filterId, animDuration, animSeed) }} />
      </svg>
      <div className="electric-border-layers" aria-hidden="true">
        <div className="electric-border-frame" style={{ filter: `url(#${filterId})` }} />
        <div className="electric-border-glow-1" />
        <div className="electric-border-glow-2" />
        <div className="electric-border-bg-glow" />
      </div>
      <div className="electric-border-content">{children}</div>
    </div>
  );
}
