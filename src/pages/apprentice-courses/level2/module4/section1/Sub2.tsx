/**
 * Module 4 · Section 1 · Sub 2 — Power tools (selection, use, safety)
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.2
 *   "Identify power tools for different tasks"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module3Section3_2.tsx (power tools selection)
 *   - OLD Module4Section3_2.tsx (power tool use on installs)
 *   - OLD Module4Section7_2.tsx (power tool safety)
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

const TITLE = 'Power tools — selection, use, safety | Level 2 Module 4.1.2 | Elec-Mate';
const DESCRIPTION =
  'Drills, SDS, grinders, jigsaws — picking the right one, running it safely and the rules around 110 V site supply.';

const quizQuestions = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  question: `Placeholder question ${i + 1} — to be written when this Sub is built out.`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 0,
  explanation: 'Placeholder explanation — replace when content is written.',
}));

export default function Sub2() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 2"
            title="Power tools — selection, use and safety"
            description="Drills, SDS, grinders, jigsaws — picking the right one, running it safely and the rules around 110 V site supply."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module3Section3_2 + Module4Section3_2 + Module4Section7_2.',
              'Three punchy promises about power-tool selection and safe use.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the common power tools used on electrical installation work.',
              'Match each power tool to the task it is designed for.',
              'Explain why 110 V site transformers are used in preference to 230 V on construction sites.',
              'Recognise unsafe power-tool conditions before plugging in.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Power tools introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              power-tool selection content from OLD Module 3 Section 3.2, the
              installation-use content from OLD Module 4 Section 3.2, and the safety
              material from OLD Module 4 Section 7.2.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (PUWER, EAWR
              Reg 4, HSE 110 V site supply guidance), 2-3 InlineChecks, 1+
              CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz
              questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets covering tool selection, 110 V site supply and pre-use safety.',
              'Maps back to AC 1.2: identify power tools for different tasks.',
            ]}
          />

          <Quiz title="Power tools knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Hand tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Tool safety checks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
