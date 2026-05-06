/**
 * CareerDetailModal — editorial topic modal.
 *
 * Type-led, gradient surface, eyebrow numbering. Single responsive layout
 * (full-screen sheet on mobile, centred 3xl card on desktop). Sections
 * rendered as a numbered list with hairline dividers; resources and tips
 * follow the same editorial cadence used across the College Hub. Colour
 * theme retained for legacy callers but applied as a single accent line —
 * never as a flood-fill background.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight, type LucideIcon } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ContentSection {
  title: string;
  content: string | string[];
  icon?: LucideIcon;
}

interface Resource {
  title: string;
  url?: string;
  description?: string;
}

interface ModalContent {
  overview: string;
  sections: ContentSection[];
  resources?: Resource[];
  tips?: string[];
}

interface CareerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  badge?: string;
  icon?: LucideIcon;
  color?: 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'amber' | 'red';
  content: ModalContent;
  ctaText?: string;
  ctaAction?: () => void;
}

const accentByColor: Record<NonNullable<CareerDetailModalProps['color']>, string> = {
  yellow: 'bg-elec-yellow',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
    {children}
  </span>
);

const renderBody = (body: string | string[]) => {
  if (Array.isArray(body)) {
    return (
      <ul className="space-y-2">
        {body.map((item, idx) => (
          <li
            key={idx}
            className="flex items-baseline gap-2.5 text-[13px] leading-relaxed text-white"
          >
            <span className="text-[10px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="text-[13px] leading-relaxed text-white">{body}</p>;
};

const CareerDetailModal = ({
  isOpen,
  onClose,
  title,
  description,
  badge,
  color = 'yellow',
  content,
  ctaText,
  ctaAction,
}: CareerDetailModalProps) => {
  const accent = accentByColor[color];

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
            aria-hidden
          />

          {/* Modal — full-screen on mobile, centred card on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="career-modal-title"
            className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center sm:p-4"
          >
            <div
              className={cn(
                'w-full sm:max-w-3xl sm:max-h-[85vh] flex flex-col',
                'bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)]',
                'sm:rounded-2xl border border-white/[0.10] sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
                'overflow-hidden'
              )}
            >
              {/* Accent line */}
              <div className={cn('h-[2px] shrink-0', accent)} aria-hidden />

              {/* Header */}
              <div className="shrink-0 border-b border-white/[0.06] px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <Eyebrow>{badge ?? 'Topic'}</Eyebrow>
                  </div>
                  <h2
                    id="career-modal-title"
                    className="mt-1.5 text-[22px] sm:text-[28px] font-semibold tracking-tight leading-tight text-white"
                  >
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1.5 text-[12.5px] sm:text-[13px] leading-relaxed text-white/85">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center shrink-0 touch-manipulation transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-7 sm:space-y-8 pb-24 sm:pb-6">
                  {/* Overview */}
                  <section className="space-y-2">
                    <Eyebrow>01 · OVERVIEW</Eyebrow>
                    <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white">
                      {content.overview}
                    </p>
                  </section>

                  {/* Sections */}
                  {content.sections.length > 0 && (
                    <section className="space-y-4">
                      <Eyebrow>02 · DETAIL</Eyebrow>
                      <ul className="divide-y divide-white/[0.06]">
                        {content.sections.map((section, idx) => (
                          <li key={section.title} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-baseline gap-3">
                              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-[14px] sm:text-[15px] font-semibold text-white">
                                  {section.title}
                                </h3>
                                <div className="mt-2">{renderBody(section.content)}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Tips */}
                  {content.tips && content.tips.length > 0 && (
                    <section className="space-y-3">
                      <Eyebrow>
                        {String(content.sections.length > 0 ? 3 : 2).padStart(2, '0')} · PRO TIPS
                      </Eyebrow>
                      <ol className="divide-y divide-white/[0.06]">
                        {content.tips.map((tip, idx) => (
                          <li key={idx} className="py-3 first:pt-0 last:pb-0">
                            <div className="flex items-baseline gap-3">
                              <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <p className="text-[13px] leading-relaxed text-white">{tip}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}

                  {/* Resources */}
                  {content.resources && content.resources.length > 0 && (
                    <section className="space-y-3">
                      <Eyebrow>
                        {String(
                          (content.sections.length > 0 ? 3 : 2) +
                            (content.tips && content.tips.length > 0 ? 1 : 0)
                        ).padStart(2, '0')}{' '}
                        · RESOURCES
                      </Eyebrow>
                      <ul className="divide-y divide-white/[0.06]">
                        {content.resources.map((resource, idx) => (
                          <li key={idx} className="py-3 first:pt-0 last:pb-0">
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group rounded-md -mx-1 px-1 py-1 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation"
                            >
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="text-[13.5px] font-semibold text-white truncate">
                                  {resource.title}
                                </h4>
                                <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/65 group-hover:text-elec-yellow transition-colors shrink-0 inline-flex items-center gap-1">
                                  Open
                                  <ExternalLink className="h-3 w-3" />
                                </span>
                              </div>
                              {resource.description && (
                                <p className="mt-0.5 text-[12px] leading-relaxed text-white/85">
                                  {resource.description}
                                </p>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              {ctaText && ctaAction && (
                <div className="shrink-0 border-t border-white/[0.06] px-5 sm:px-6 py-4 bg-[hsl(0_0%_10%)]">
                  <button
                    type="button"
                    onClick={ctaAction}
                    className="w-full text-[13px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
                  >
                    {ctaText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CareerDetailModal;
