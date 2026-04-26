/**
 * Module 4 · Section 6 · Sub 1 — Testing continuity of CPC
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.1
 *   "Test continuity of protective conductor"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section6_2.tsx
 *   - OLD Module6Section4_1.tsx
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

const TITLE = "Testing continuity of CPC | Level 2 Module 4.6.1 | Elec-Mate";
const DESCRIPTION =
  "R1 + R2 across the circuit — the test that proves the earth path back to the MET is intact.";

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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 1"
            title="Testing continuity of CPC"
            description="R1 + R2 across the circuit — the test that proves the earth path back to the MET is intact."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              "Source: OLD Module4Section6_2.tsx + OLD Module6Section4_1.tsx",
              'Three punchy promises about what the apprentice will know after the page.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Carry out a R1 + R2 continuity test using the long-lead method.",
              "Carry out a R2-only continuity test using a wander lead and main earthing terminal.",
              "Null the test leads correctly before each set of readings.",
              "Record continuity results with the polarity / r1+r2 columns on the test schedule.",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Testing continuity of CPC">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              content from: OLD Module4Section6_2.tsx; OLD Module6Section4_1.tsx.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS 7671 643.2; GN3 Sections 2.7.7, 2.7.8),
              2-3 InlineChecks, 1+ CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6
              KeyTakeaways and 8 real Quiz questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets, each one worth remembering after the page closes.',
              "Maps back to AC 6.1: test continuity of protective conductor.",
            ]}
          />

          <Quiz title="Testing continuity of CPC knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section5/5-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Visual inspection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section6/6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Ring final continuity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
