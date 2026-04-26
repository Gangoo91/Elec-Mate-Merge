/**
 * Module 4 · Section 4 · Sub 4 — Testing continuity of main bonds
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.4
 *   "Test continuity"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - NEW content
 *   - Feed from OLD Module4Section5_6.tsx
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

const TITLE = "Testing continuity of main bonds | Level 2 Module 4.4.4 | Elec-Mate";
const DESCRIPTION =
  "R1 / R2 with a low-resistance ohmmeter to prove the bond actually does what it is there to do.";

const quizQuestions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  question: `Placeholder question ${i + 1} — to be written when this Sub is built out.`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,
  explanation: 'Placeholder explanation — replace when content is written.',
}));

export default function Sub4() {
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 4"
            title="Testing continuity of main bonds"
            description="R1 / R2 with a low-resistance ohmmeter to prove the bond actually does what it is there to do."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              "Source: NEW content + Feed from OLD Module4Section5_6.tsx + OLD Module6Section4_1.tsx",
              'Three punchy promises about what the apprentice will know after the page.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Use a low-resistance ohmmeter to test continuity of main protective bonding.",
              "Null the test leads before any continuity reading is recorded.",
              "Interpret the reading and decide whether the bond is acceptable.",
              "Record the bonding continuity result on the test schedule.",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Testing continuity of main bonds">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              content from: NEW content; Feed from OLD Module4Section5_6.tsx; OLD Module6Section4_1.tsx.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS 7671 643.2.1; GN3 Section 2.7; HSE GS 38),
              2-3 InlineChecks, 1+ CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6
              KeyTakeaways and 8 real Quiz questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets, each one worth remembering after the page closes.',
              "Maps back to AC 4.4: test continuity.",
            ]}
          />

          <Quiz title="Testing continuity of main bonds knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section4/4-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Connecting clamps
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Inspecting dead
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
