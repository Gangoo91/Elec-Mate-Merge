import { type ReactNode } from 'react';

/* ==========================================================================
   HubSection — editorial group wrapper with eyebrow + soft subline.
   Used to group multiple cards under a single header (Plan / Activities /
   EPA / Feedback) without nesting borders.
   ========================================================================== */

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function HubSection({ id, eyebrow, title, description, children }: Props) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="px-1">
        <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-[16px] sm:text-[18px] font-semibold text-white leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-[12px] text-white/85 leading-snug max-w-xl">{description}</p>
        )}
      </div>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
