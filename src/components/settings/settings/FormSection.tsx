import { Eyebrow } from '@/components/college/primitives';
import type { ComponentType, ReactNode } from 'react';

interface FormSectionProps {
  /**
   * Legacy prop kept for back-compat with existing callers — ignored visually.
   * The redesign is icon-free.
   */
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Editorial form section header used inside settings sheets and Elec-ID forms.
 * Icon prop is accepted but not rendered (sweep is icon-free).
 */
export function FormSection({ title, description, children }: FormSectionProps) {
  const [index, ...rest] = title.split('. ');
  const hasNumber = rest.length > 0 && /^\d+$/.test(index);
  const eyebrow = hasNumber ? `Step ${index.padStart(2, '0')}` : undefined;
  const heading = hasNumber ? rest.join('. ') : title;

  return (
    <section className="space-y-5">
      <header className="pb-4 border-b border-white/[0.06]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="mt-1.5 text-lg sm:text-xl font-semibold text-white tracking-tight">
          {heading}
        </h3>
        {description && (
          <p className="mt-1.5 text-[13px] text-white leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
