import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/* ==========================================================================
   SubPageShell — wraps every apprentice College Hub sub-page with the same
   back nav + eyebrow + title pattern. Keeps each individual sub-page file
   tiny so they're just composition of existing cards.
   ========================================================================== */

export function SubPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 pb-24 space-y-5 sm:space-y-6">
        <button
          type="button"
          onClick={() => navigate('/apprentice/college-plan')}
          className="inline-flex items-center gap-1.5 text-[12.5px] text-white/70 hover:text-white transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> My College Hub
        </button>
        <header className="space-y-1.5">
          <div className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            {eyebrow}
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-[13px] text-white/70 leading-relaxed max-w-prose">{description}</p>
          )}
        </header>
        {/* Responsive 2-col fill on desktop; a lone card spans full width so
            wide single-card sections never look sparse. Single column on mobile. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-start [&>*:only-child]:lg:col-span-2">
          {children}
        </div>
      </div>
    </div>
  );
}
