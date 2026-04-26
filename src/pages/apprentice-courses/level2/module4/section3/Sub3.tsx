/**
 * Module 4 · Section 3 · Sub 3 — Fixing accessories to dimensions
 * Maps to City & Guilds 2365-02 / Unit 204 / LO3 / AC 3.3
 *   "Fix accessories to dimensions from drawings"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section5_1.tsx
 *   - OLD Module4Section5_2.tsx
 *   - OLD Module4Section5_7.tsx
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

const TITLE = "Fixing accessories to dimensions | Level 2 Module 4.3.3 | Elec-Mate";
const DESCRIPTION =
  "Back boxes, dado, pattress and consumer units — fixed plumb, level and at the height the drawing specifies.";

const quizQuestions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  question: `Placeholder question ${i + 1} — to be written when this Sub is built out.`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,
  explanation: 'Placeholder explanation — replace when content is written.',
}));

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 3"
            title="Fixing accessories to dimensions"
            description="Back boxes, dado, pattress and consumer units — fixed plumb, level and at the height the drawing specifies."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              "Source: OLD Module4Section5_1.tsx + OLD Module4Section5_2.tsx + OLD Module4Section5_7.tsx",
              'Three punchy promises about what the apprentice will know after the page.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Fix back boxes plumb, level and to the dimensions on the drawing.",
              "Choose the correct fixings for plasterboard, brick and dado.",
              "Mount consumer units, pattresses and dado at the heights required.",
              "Recognise when a marked-out position needs to be queried before drilling.",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Fixing accessories to dimensions">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              content from: OLD Module4Section5_1.tsx; OLD Module4Section5_2.tsx; OLD Module4Section5_7.tsx.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS 7671 522.8, BS 8300, manufacturer fixing instructions),
              2-3 InlineChecks, 1+ CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6
              KeyTakeaways and 8 real Quiz questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets, each one worth remembering after the page closes.',
              "Maps back to AC 3.3: fix accessories to dimensions from drawings.",
            ]}
          />

          <Quiz title="Fixing accessories to dimensions knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section3/3-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Marking out
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level2/module4/section3/3-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Installing wiring
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
