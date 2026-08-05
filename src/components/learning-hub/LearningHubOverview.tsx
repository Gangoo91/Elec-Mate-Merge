import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { LearningSection } from '../LearningHub';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const tests = [
  { label: 'CPC', abbrev: 'Cont.' },
  { label: 'Ring', abbrev: 'R1+R2' },
  { label: 'IR', abbrev: 'Insul.' },
  { label: 'Polar.', abbrev: 'Dead' },
  { label: 'EFLI', abbrev: 'Ze/Zs' },
  { label: 'PFC', abbrev: 'Ipf' },
  { label: 'RCD', abbrev: 'Trip' },
  { label: 'Func.', abbrev: 'Op.' },
];

/**
 * The certificate card. Same class the schedule of tests and the specialist
 * certificates use, so the hub an electrician learns in and the certificate
 * they then fill out read as one product rather than two.
 *
 * Full-bleed on a phone (`-mx-4`), inset and rounded from `sm:` up.
 */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5';

/** Section heading — typography only. No icons, no dots, no gradient rules. */
const headingCn = 'mb-3 text-[15px] font-semibold tracking-tight text-white';

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 py-4 space-y-6"
    >
      {/* Safety Banner — brighter, more prominent */}
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); onNavigateToSection('testing'); }}
          className="w-full text-left touch-manipulation active:scale-[0.98] transition-transform"
        >
          {/* Red is kept here because it encodes danger, not decoration — the
              one place on this screen where colour carries meaning. */}
          <div className="-mx-4 rounded-none border-y border-red-500/30 bg-red-500/[0.12] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold tracking-tight text-white">
                  Always isolate before testing
                </p>
                <p className="mt-1 text-[12px] text-white">
                  Safe isolation is life-critical — follow GS38 every time
                </p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-white" />
            </div>
          </div>
        </button>
      </motion.div>

      {/* Required Test Sequence — brighter cards */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className={headingCn}>Required test sequence</h2>

        <div className={cardCn}>

          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 items-end">
            {tests.map((test, i) => {
              const isLive = i >= 4;
              return (
                <React.Fragment key={i}>
                  {i === 0 && (
                    <div className="shrink-0 mr-0.5">
                      <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">Dead</p>
                    </div>
                  )}
                  {i === 4 && (
                    <div className="shrink-0 flex flex-col items-center mx-1.5">
                      <div className="w-px h-6 bg-white/20 mb-1" />
                      <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Live</p>
                    </div>
                  )}
                  <div
                    className={`w-[68px] shrink-0 rounded-xl p-2.5 text-center border ${
                      isLive
                        ? 'bg-emerald-500/[0.12] border-emerald-500/25'
                        : 'bg-amber-500/[0.12] border-amber-500/25'
                    }`}
                  >
                    <p className={`text-lg font-black ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>{i + 1}</p>
                    <p className="text-[10px] text-white font-semibold mt-0.5 leading-tight">{test.label}</p>
                    <p className="text-[9px] text-white mt-0.5 leading-tight">{test.abbrev}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Learning Modules — hero variant for more visual weight */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className={headingCn}>Learning modules</h2>
        {/* Was BusinessCard from the business-hub set — a different design
            system, so these tiles did not match the certificates they teach. */}
        <div className="-mx-4 grid grid-cols-2 gap-px border-y border-white/[0.14] bg-white/[0.14] sm:mx-0 sm:gap-3 sm:border-0 sm:bg-transparent">
          {[
            { title: 'Testing', desc: '10 test procedures', section: 'testing' as LearningSection },
            { title: 'Fault finding', desc: '8 diagnostic tools', section: 'fault-finding' as LearningSection },
            { title: 'Regulations', desc: '9 reference tools', section: 'regulations' as LearningSection },
            { title: 'Quiz', desc: '460 questions', section: 'quiz' as LearningSection },
          ].map((mod) => (
            <button
              key={mod.section}
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigateToSection(mod.section);
              }}
              className="flex min-h-[5.5rem] touch-manipulation flex-col justify-between bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 text-left transition-transform active:scale-[0.98] sm:rounded-2xl sm:border sm:border-white/[0.14]"
            >
              <span className="text-[15px] font-semibold tracking-tight text-white">
                {mod.title}
              </span>
              <span className="mt-1 text-[12px] text-white">{mod.desc}</span>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Quick Reference — brighter contrast */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className={headingCn}>Quick reference</h2>
        {/* The coloured left rails and per-card border tints were decoration —
            four different hues for four equally important tables. Values are
            tabular-nums so the columns line up the way they do on a cert. */}
        <div className="-mx-4 grid grid-cols-2 gap-px border-y border-white/[0.14] bg-white/[0.14] sm:mx-0 sm:gap-3 sm:border-0 sm:bg-transparent">
          {[
            {
              title: 'Zs 80% limits',
              rows: [
                ['6A Type B', '5.82Ω'],
                ['32A Type B', '1.09Ω'],
                ['40A Type B', '0.87Ω'],
              ],
            },
            {
              title: 'RCD 30mA',
              rows: [
                ['0.5× (15mA)', 'No trip'],
                ['1× (30mA)', '≤300ms'],
                ['5× (150mA)', '≤40ms'],
              ],
            },
            {
              title: 'IR minimum',
              rows: [
                ['SELV ≤50V', '0.5MΩ'],
                ['LV ≤500V', '1.0MΩ'],
                ['500–1000V', '1.0MΩ'],
              ],
            },
            {
              title: 'Disconnection',
              rows: [
                ['Sockets ≤63A', '0.4s'],
                ['Fixed equip', '5s'],
                ['TT (230V)', '0.2s'],
              ],
            },
          ].map((ref) => (
            <div
              key={ref.title}
              className="bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:rounded-2xl sm:border sm:border-white/[0.14]"
            >
              <p className="text-[13px] font-semibold tracking-tight text-white">{ref.title}</p>
              <div className="mt-2 space-y-1.5 text-[11px]">
                {ref.rows.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-white">{label}</span>
                    <span className="font-semibold tabular-nums text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* On-Site Essentials — brighter list items */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className={headingCn}>On-site essentials</h2>
        {/* One list, hairline-separated — the pattern the schedule of tests
            uses for its rows. The coloured icon tiles were three different
            hues for three items of equal weight. */}
        <div className="-mx-4 divide-y divide-white/[0.1] border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
          {[
            {
              title: 'Common questions',
              desc: '20 plain-English regulation answers',
              section: 'regulations' as LearningSection,
            },
            {
              title: 'EICR coding guide',
              desc: 'C1, C2, C3, FI — with examples',
              section: 'regulations' as LearningSection,
            },
            {
              title: 'Compliance checklists',
              desc: 'New install, CU change, EICR, EV, PV',
              section: 'regulations' as LearningSection,
            },
          ].map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigateToSection(item.section);
              }}
              className="flex min-h-[3.25rem] w-full touch-manipulation items-center gap-3 p-4 text-left transition-colors active:bg-white/[0.04]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-white">{item.title}</p>
                <p className="mt-0.5 text-[12px] text-white">{item.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* BS 7671 Badge */}
      <motion.div variants={itemVariants}>
        {/* "A4 update coming" contradicted the heading directly above it —
            A4:2026 IS the current edition, and this content is written to it. */}
        <div className={cardCn}>
          <p className="text-[13px] font-semibold tracking-tight text-white">
            BS 7671:2018+A4:2026
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-white">
            All content on this page is written to the current edition.
          </p>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default LearningHubOverview;
