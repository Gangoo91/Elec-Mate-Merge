 
/**
 * ElectricianCareerPathways — editorial rebuild.
 *
 * Two views: hub (section index) and section (drill-in). Same data layer
 * (careerPathwaysData) — re-skinned to match the College Hub / dashboard
 * editorial language. Numbered eyebrows, gradient cards, hairline dividers,
 * type-led not icon-led.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import {
  careerSections,
  getSectionById,
  isDetailList,
  type ContentItem,
  type CareerSection,
  type ContentSection,
} from '../data/careerPathwaysData';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

type ViewState = 'hub' | 'section';

const topicAnchorId = (itemId: string) => `topic-${itemId}`;

/**
 * Body of a detail section. Written-up sections carry `{ term, detail }` rows
 * — term stays scannable, detail says what competent actually looks like.
 * Plain string lists still render as before for sections not yet written up.
 */
const TopicBody = ({ body }: { body: ContentSection['content'] }) => {
  if (!Array.isArray(body)) {
    return <p className="text-[14px] leading-[1.65] text-white">{body}</p>;
  }

  if (isDetailList(body)) {
    return (
      <ul className="space-y-4">
        {body.map((row, idx) => (
          <li key={row.term} className="flex items-baseline gap-3">
            <span className="text-[10px] tabular-nums font-semibold text-white/45 shrink-0 w-5">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-snug tracking-tight text-white">
                {row.term}
              </p>
              <p className="mt-1 text-[13.5px] leading-[1.6] text-white/85">{row.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2.5">
      {(body as string[]).map((line, idx) => (
        <li key={idx} className="flex items-baseline gap-3 text-[14px] leading-relaxed text-white">
          <span className="text-[10px] tabular-nums font-semibold text-white/45 shrink-0 w-5">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0">{line}</span>
        </li>
      ))}
    </ul>
  );
};

/**
 * One topic, rendered inline. This content used to live behind a modal —
 * three taps from the hub and unreadable end-to-end. It is now part of the
 * page so the whole route reads as one document.
 */
const TopicArticle = ({ item, index }: { item: ContentItem; index: number }) => {
  const { content } = item;
  return (
    <article
      id={topicAnchorId(item.id)}
      // Clear the app header AND the sticky chip row when jumping to a topic;
      // on desktop there is no chip row, so only the header plus a little air.
      style={{
        scrollMarginTop: 'calc(var(--header-height, 56px) + 4.5rem)',
      }}
      className={cn(
        // Quiet panel, house depth recipe — no gradients, no coloured glow.
        // Edge-to-edge and chrome-free on mobile (house mobile-flat rule),
        // a proper raised surface from sm up.
        '-mx-4 border-y border-white/[0.12] bg-white/[0.055] px-4 py-7',
        'sm:mx-0 sm:rounded-2xl sm:border sm:px-7 sm:py-8 lg:px-9',
        'sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-14px_rgba(0,0,0,0.7)]'
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
          {String(index + 1).padStart(2, '0')}
        </span>
        {/* Badge is a label, not an emphasis — the accent is spent on the
            section number and the active contents item, one per screen. */}
        {item.badge && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 border border-white/[0.14] rounded-md px-2 py-0.5">
            {item.badge}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-[23px] sm:text-[30px] font-semibold tracking-[-0.02em] leading-[1.1] text-white">
        {item.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-white/85 max-w-[62ch]">
        {item.description}
      </p>

      {item.stats && item.stats.length > 0 && (
        <dl className="mt-5 inline-flex flex-wrap items-stretch divide-x divide-white/[0.12] overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04]">
          {item.stats.map((stat) => (
            <div key={stat.label} className="px-4 py-2.5 sm:px-5">
              <dd className="text-[18px] font-semibold tabular-nums tracking-tight text-white">
                {stat.value}
              </dd>
              <dt className="mt-0.5 uppercase tracking-[0.16em] text-[9.5px] text-white/60 font-semibold whitespace-nowrap">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      )}

      {content.overview && (
        <p className="mt-6 text-[15px] leading-[1.65] text-white max-w-[68ch]">
          {content.overview}
        </p>
      )}

      {content.sections?.length > 0 && (
        <div className="mt-7 divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {content.sections.map((section, idx) => (
            <div key={section.title} className="py-5 first:pt-5">
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] tabular-nums font-semibold text-white/45 shrink-0 w-5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h4 className="text-[15px] font-semibold tracking-tight text-white">
                  {section.title}
                </h4>
              </div>
              <div className="mt-3 sm:pl-8 max-w-[64ch]">
                <TopicBody body={section.content} />
              </div>
            </div>
          ))}
        </div>
      )}

      {content.tips && content.tips.length > 0 && (
        <div className="mt-6 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-4 sm:px-5">
          <Eyebrow>IN PRACTICE</Eyebrow>
          <ul className="mt-3 space-y-2.5 max-w-[64ch]">
            {content.tips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-3 text-[14px] leading-relaxed text-white"
              >
                <span className="text-[10px] tabular-nums font-semibold text-white/45 shrink-0 w-5">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {content.resources && content.resources.length > 0 && (
        <div className="mt-6 border-t border-white/[0.10] pt-5">
          <Eyebrow>WHERE TO GO NEXT</Eyebrow>
          <ul className="mt-3 space-y-3 max-w-[64ch]">
            {content.resources.map((resource) => (
              <li key={resource.title}>
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1.5 text-[14px] font-semibold text-white hover:text-elec-yellow underline underline-offset-4 decoration-white/25 hover:decoration-elec-yellow/60 min-h-[32px] touch-manipulation transition-colors"
                  >
                    {resource.title}
                    <ExternalLink className="h-3 w-3 shrink-0 self-center" />
                  </a>
                ) : (
                  <span className="text-[14px] font-semibold text-white">{resource.title}</span>
                )}
                {resource.description && (
                  <p className="mt-0.5 text-[13px] leading-relaxed text-white/75">
                    {resource.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

/** Scroll-spy: which topic is currently in view, for the contents nav. */
const useActiveTopic = (items: ContentItem[]) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  // Keep the observer stable across re-renders but re-bind when the route changes.
  const idsKey = items.map((i) => i.id).join('|');

  useEffect(() => {
    setActiveId(items[0]?.id ?? null);
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id.replace(/^topic-/, ''));
      },
      // Band across the upper part of the viewport so the active item changes
      // as a heading reaches reading position, not when it fully clears.
      { rootMargin: '-88px 0px -65% 0px', threshold: 0 }
    );

    const nodes = items
      .map((item) => document.getElementById(topicAnchorId(item.id)))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
};

const ElectricianCareerPathways = () => {
  const [view, setView] = useState<ViewState>('hub');
  const [activeSection, setActiveSection] = useState<CareerSection | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const activeTopicId = useActiveTopic(activeSection?.items ?? []);

  const handleSectionClick = (sectionId: string) => {
    const section = getSectionById(sectionId);
    if (section) {
      setActiveSection(section);
      setView('section');
      // Entering a route from a scrolled hub would otherwise drop the reader
      // partway down the new page.
      topRef.current?.scrollIntoView({ block: 'start' });
    }
  };

  const handleBackToHub = () => {
    setView('hub');
    setActiveSection(null);
    topRef.current?.scrollIntoView({ block: 'start' });
  };

  const scrollToTopic = useCallback((itemId: string) => {
    document
      .getElementById(topicAnchorId(itemId))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div ref={topRef} className="space-y-8 sm:space-y-10 scroll-mt-4">
      <AnimatePresence mode="wait">
        {view === 'hub' ? (
          <motion.div
            key="hub"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-8 sm:space-y-10"
          >
            {/* Hero */}
            <section className="space-y-3">
              <Eyebrow>01 · PATHWAYS</Eyebrow>
              <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
                <span className="text-elec-yellow">Pick</span>{' '}
                <span className="text-white">your route.</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
                {careerSections.length} pathways across the UK electrical industry — JIB-aligned,
                with the qualifications, day rates and progression milestones laid out so you can
                plan a real next move.
              </p>
            </section>

            {/* Section index */}
            <section className="space-y-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <Eyebrow>02 · SPECIALISMS</Eyebrow>
                <span className="text-[11px] tabular-nums text-white/65">
                  {careerSections.length} routes
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {careerSections.map((section, idx) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className="text-left group rounded-2xl bg-white/[0.055] border border-white/[0.12] hover:border-elec-yellow/40 active:bg-white/[0.09] transition-colors p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-14px_rgba(0,0,0,0.7)] touch-manipulation min-h-[140px]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-white/65 group-hover:text-elec-yellow transition-colors">
                        Open →
                      </span>
                    </div>
                    <h3 className="mt-3 text-[19px] sm:text-[22px] font-semibold tracking-tight leading-tight text-white">
                      {section.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white max-w-md">
                      {section.description}
                    </p>
                    {section.previewStat && (
                      <div className="mt-3 flex items-baseline gap-2 pt-3 border-t border-white/[0.06]">
                        <span className="text-[16px] font-semibold tabular-nums text-elec-yellow">
                          {section.previewStat}
                        </span>
                        <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/65">
                          {section.statLabel}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <p className="text-[10.5px] leading-relaxed text-white/65 max-w-2xl">
              Aligned with the JIB grading scheme and BS 7671:2018+A4:2026.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="section"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-8 sm:space-y-10"
          >
            {activeSection && (
              <>
                {/* Section header */}
                <section className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={handleBackToHub}
                      className="text-white/85 hover:text-white inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] font-semibold border border-white/15 hover:border-white/30 rounded-full px-3 py-1 min-h-[32px] touch-manipulation"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Pathways
                    </button>
                    <Eyebrow>{activeSection.title.toUpperCase()}</Eyebrow>
                  </div>
                  <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] font-semibold tracking-[-0.025em] leading-[1.03]">
                    <span className="text-white">{activeSection.title}.</span>
                  </h2>
                  <p className="text-[14.5px] sm:text-[16px] leading-relaxed text-white/85 max-w-[62ch]">
                    {activeSection.description}
                  </p>
                  {activeSection.previewStat && (
                    <dl className="!mt-5 inline-flex flex-wrap items-stretch divide-x divide-white/[0.12] overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.055]">
                      <div className="px-5 py-3">
                        <dd className="text-[22px] sm:text-[26px] font-semibold tabular-nums tracking-tight text-elec-yellow">
                          {activeSection.previewStat}
                        </dd>
                        <dt className="mt-0.5 text-[9.5px] uppercase tracking-[0.16em] font-semibold text-white/60">
                          {activeSection.statLabel}
                        </dt>
                      </div>
                      <div className="px-5 py-3">
                        <dd className="text-[22px] sm:text-[26px] font-semibold tabular-nums tracking-tight text-white">
                          {activeSection.items.length}
                        </dd>
                        <dt className="mt-0.5 text-[9.5px] uppercase tracking-[0.16em] font-semibold text-white/60">
                          Topic{activeSection.items.length === 1 ? '' : 's'}
                        </dt>
                      </div>
                    </dl>
                  )}
                </section>

                {/* Mobile contents — sticky chip row, horizontally scrollable */}
                <nav
                  aria-label="Topics"
                  // Offset by the real header height (Header.tsx publishes
                  // --header-height: 48px mobile / 64px desktop) so the chips
                  // pin below the app bar instead of sliding under it.
                  style={{ top: 'var(--header-height, 56px)' }}
                  className="sticky z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16 py-2.5 bg-background/95 backdrop-blur-sm border-b border-white/[0.10]"
                >
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide snap-x">
                    {activeSection.items.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToTopic(item.id)}
                        className={cn(
                          'snap-start shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 min-h-[36px] text-[12px] font-semibold tracking-tight touch-manipulation transition-colors',
                          activeTopicId === item.id
                            ? 'border-elec-yellow/50 bg-elec-yellow/[0.10] text-elec-yellow'
                            : 'border-white/15 text-white active:bg-white/[0.06]'
                        )}
                      >
                        <span className="text-[9.5px] tabular-nums opacity-70">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {item.title}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Reading layout: contents rail + the topics themselves, all inline */}
                <section className="space-y-5 sm:space-y-6">
                  {activeSection.items.map((item, idx) => (
                    <TopicArticle key={item.id} item={item} index={idx} />
                  ))}
                </section>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectricianCareerPathways;
