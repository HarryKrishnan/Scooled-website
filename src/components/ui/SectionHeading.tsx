interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ badge, title, subtitle, center = true, light }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
          {badge}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
