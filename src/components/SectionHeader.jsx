import AnimatedContent from '@/components/AnimatedContent';

export default function SectionHeader({ label, title, description, className = '' }) {
  return (
    <div className={`mb-16 md:mb-20 ${className}`}>
      {label && (
        <AnimatedContent distance={20} delay={0}>
          <p className="section-label text-center mb-3">{label}</p>
        </AnimatedContent>
      )}
      <AnimatedContent distance={30} delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-center">
          {title}
        </h2>
      </AnimatedContent>
      {description && (
        <AnimatedContent distance={30} delay={0.12}>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg text-center leading-relaxed">
            {description}
          </p>
        </AnimatedContent>
      )}
    </div>
  );
}
