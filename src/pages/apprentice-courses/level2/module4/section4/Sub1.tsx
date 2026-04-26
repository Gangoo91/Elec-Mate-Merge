/**
 * Module 4 · Section 4 · Sub 1 — Identifying cable sizes for main bonding
 * Maps to City & Guilds 2365-02 / Unit 204 / LO4 / AC 4.1
 *   "Identify cable sizes"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - NEW content — minimal feed from old material
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

const TITLE = "Identifying cable sizes for main bonding | Level 2 Module 4.4.1 | Elec-Mate";
const DESCRIPTION =
  "10 mm² / 16 mm² / 25 mm² — the rules in BS 7671 411 and 544 that decide which to fit.";

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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 1"
            title="Identifying cable sizes for main bonding"
            description="10 mm² / 16 mm² / 25 mm² — the rules in BS 7671 411 and 544 that decide which to fit."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              "Source: NEW content — minimal feed from old material",
              'Three punchy promises about what the apprentice will know after the page.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the standard main bonding conductor sizes used in domestic and small commercial work.",
              "Apply BS 7671 544.1 to size a main protective bonding conductor for a given supply.",
              "Recognise when the rule of thumb (10 mm² for TN-C-S to 100 A) does and does not apply.",
              "Cross-check the bonding conductor size with the supply earth fault loop arrangement.",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Identifying cable sizes for main bonding">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              content from: NEW content — minimal feed from old material.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS 7671 411, 543, 544.1; OSG Section 4),
              2-3 InlineChecks, 1+ CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6
              KeyTakeaways and 8 real Quiz questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets, each one worth remembering after the page closes.',
              "Maps back to AC 4.1: identify cable sizes.",
            ]}
          />

          <Quiz title="Identifying cable sizes for main bonding knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section3/3-6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safe working practices
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section4/4-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Terminating bonding cables
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
