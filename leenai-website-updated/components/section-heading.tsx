import {cn} from '@/lib/utils';

export function SectionHeading({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="text-2xl font-semibold tracking-tight text-brand-ink md:text-3xl">{title}</h2>
      {subtitle ? <p className="text-sm text-brand-ink/70 md:text-base">{subtitle}</p> : null}
    </div>
  );
}
