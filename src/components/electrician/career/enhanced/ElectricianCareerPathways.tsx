 
/**
 * ElectricianCareerPathways — editorial rebuild.
 *
 * Two views: hub (section index) and section (drill-in). Same data layer
 * (careerPathwaysData) — re-skinned to match the College Hub / dashboard
 * editorial language. Numbered eyebrows, gradient cards, hairline dividers,
 * type-led not icon-led.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CareerDetailModal from '../modals/CareerDetailModal';
import {
  careerSections,
  getSectionById,
  type ContentItem,
  type CareerSection,
} from '../data/careerPathwaysData';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

type ViewState = 'hub' | 'section';

const ElectricianCareerPathways = () => {
  const [view, setView] = useState<ViewState>('hub');
  const [activeSection, setActiveSection] = useState<CareerSection | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    const section = getSectionById(sectionId);
    if (section) {
      setActiveSection(section);
      setView('section');
    }
  };

  const handleBackToHub = () => {
    setView('hub');
    setActiveSection(null);
  };

  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8 sm:space-y-10">
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
                    className="text-left group rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation min-h-[140px]"
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
                  <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-tight leading-[1.05]">
                    <span className="text-white">{activeSection.title}.</span>
                  </h2>
                  <p className="text-[13.5px] sm:text-[15px] leading-relaxed text-white max-w-3xl">
                    {activeSection.description}
                  </p>
                  {activeSection.previewStat && (
                    <div className="flex items-baseline gap-3 pt-2">
                      <span className="text-[24px] sm:text-[28px] font-semibold tabular-nums text-elec-yellow">
                        {activeSection.previewStat}
                      </span>
                      <span className="text-[11.5px] uppercase tracking-[0.16em] text-white/85">
                        {activeSection.statLabel}
                      </span>
                      <span className="text-[11px] text-white/65">·</span>
                      <span className="text-[11.5px] tabular-nums text-white/85">
                        {activeSection.items.length} topic
                        {activeSection.items.length === 1 ? '' : 's'}
                      </span>
                    </div>
                  )}
                </section>

                {/* Content cards */}
                <section className="space-y-4">
                  <Eyebrow>TOPICS</Eyebrow>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {activeSection.items.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          'text-left group rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation'
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold tabular-nums text-elec-yellow/85 border border-elec-yellow/35 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-[16px] sm:text-[17px] font-semibold tracking-tight leading-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">
                          {item.description}
                        </p>
                        {item.stats && Object.keys(item.stats).length > 0 && (
                          <dl className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-x-4 gap-y-1.5 text-[11px]">
                            {Object.entries(item.stats)
                              .slice(0, 3)
                              .map(([k, v]) => (
                                <div key={k} className="inline-flex items-baseline gap-1.5">
                                  <dt className="uppercase tracking-[0.14em] text-[9.5px] text-white/65 font-semibold">
                                    {k}
                                  </dt>
                                  <dd className="tabular-nums font-semibold text-white">
                                    {String(v)}
                                  </dd>
                                </div>
                              ))}
                          </dl>
                        )}
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedItem && (
        <CareerDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedItem.title}
          description={selectedItem.description}
          badge={selectedItem.badge}
          icon={selectedItem.icon}
          color={activeSection?.color || 'yellow'}
          content={selectedItem.content}
          ctaText="Got it"
          ctaAction={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ElectricianCareerPathways;
