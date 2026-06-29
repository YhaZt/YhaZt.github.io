import Aurora from '@/components/Aurora';
import Particles from '@/components/Particles';

export default function AppBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="mesh-bg absolute inset-0" aria-hidden="true" />

      <div className="absolute inset-0 opacity-35">
        <Aurora
          colorStops={['#1d4ed8', '#6366f1', '#a855f7', '#ec4899']}
          amplitude={1.6}
          speed={0.7}
        />
      </div>

      <div className="absolute inset-0 opacity-80">
        <Particles
          particleCount={140}
          particleColors={['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899']}
          speed={0.04}
          particleBaseSize={90}
          alphaParticles={true}
          sizeRandomness={0.9}
          cameraDistance={22}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_78%)] pointer-events-none" />
    </div>
  );
}
