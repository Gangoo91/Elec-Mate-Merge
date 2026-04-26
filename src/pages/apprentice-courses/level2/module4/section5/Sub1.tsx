/**
 * Module 4 · Section 5 · Sub 1 — Visual inspection of a dead installation
 * Maps to City & Guilds 2365-02 / Unit 204 / LO5 / AC 5.1
 *   "Verify that wiring systems conform to IET standards"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section6_1.tsx (visual inspection introduction)
 *   - OLD Module4Section6_4.tsx (verification of IET standards conformity)
 *   - OLD Module6Section2_x.tsx (best 2-3 Subs from inspection content at L2 awareness depth)
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Visual inspection — what to check before energising | Level 2 Module 4.5.1 | Elec-Mate';
const DESCRIPTION =
  'The structured walk-round of a dead installation — connections, identification, protective devices, isolation, before any test instrument touches the board.';

const quizQuestions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  question: `Placeholder question ${i + 1} — to be written when this Sub is built out.`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,
  explanation: 'Placeholder explanation — replace when content is written.',
}));

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 1"
            title="Visual inspection — what to check before energising"
            description="The structured walk-round of a dead installation — connections, identification, protective devices, isolation, before any test instrument touches the board."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module4Section6_1 + Module4Section6_4 + best Subs from old Module6Section2_x.',
              'Three promises about the dead visual inspection routine.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out a structured visual inspection of a dead installation.',
              'Use the schedule of inspections from BS 7671 Appendix 6 to drive the walk-round.',
              'Identify common defects spotted by eye before any test instrument is connected.',
              'Decide whether a defect is a fail, an observation or a recommendation.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Visual inspection introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              the visual inspection material from OLD Module 4 Section 6.1 and
              Section 6.4, then add the best 2-3 Subs from OLD Module 6 Section 2 at
              L2 awareness depth (full EICR inspection lives in the I&amp;T
              qualification).
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS 7671
              Appendix 6, GN3 Section 3, EAWR Reg 4), 2-3 InlineChecks, 1+
              CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways and 8 real
              Quiz questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on the inspection schedule and the most common defects.',
              'Maps back to AC 5.1: verify that wiring systems conform to IET standards.',
            ]}
          />

          <Quiz title="Visual inspection knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Testing main bonds
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Testing dead
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
