/**
 * Module 4 · Section 3 · Sub 1 — Selecting materials from drawings
 * Maps to City & Guilds 2365-02 / Unit 204 / LO3 / AC 3.1
 *   "Select materials from drawings"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section1_2.tsx (drawings overview)
 *   - OLD Module4Section2_1.tsx (materials from layouts)
 *   - OLD Module5Section4_1.tsx (specification reading)
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

const TITLE = 'Selecting materials from drawings | Level 2 Module 4.3.1 | Elec-Mate';
const DESCRIPTION =
  'Reading the spec and the drawings to pull the right cable, accessories, containment and fixings before you start.';

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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 1"
            title="Selecting materials from drawings"
            description="Reading the spec and the drawings to pull the right cable, accessories, containment and fixings before you start."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module4Section1_2 + Module4Section2_1 + Module5Section4_1.',
              'Three promises about reading drawings and pulling the right materials.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Read electrical drawings, layouts and schedules well enough to compile a materials list.',
              'Identify standard symbols used on circuit and layout drawings.',
              'Translate a specification into the correct cable type, size and quantity.',
              'Cross-check the materials list against the specification before ordering.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Materials selection introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              drawings overview content from OLD Module 4 Section 1.2, materials-from-
              layouts material from OLD Module 4 Section 2.1 and specification reading
              from OLD Module 5 Section 4.1.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (BS EN 60617
              symbols, BS 7671 514, OSG materials guidance), 2-3 InlineChecks, 1+
              CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz
              questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on reading drawings and translating to materials.',
              'Maps back to AC 3.1: select materials from drawings.',
            ]}
          />

          <Quiz title="Materials selection knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Access equipment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Marking out
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
