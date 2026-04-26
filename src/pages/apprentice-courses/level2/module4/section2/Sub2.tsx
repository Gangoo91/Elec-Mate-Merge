/**
 * Module 4 · Section 2 · Sub 2 — Selecting PPE for tasks
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.2
 *   "Identify PPE for different tasks"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module3Section3_6.tsx (PPE for tooling tasks)
 *   - OLD Module4Section1_3.tsx (PPE on installs)
 *   - OLD Module4Section7_3.tsx (PPE site safety)
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

const TITLE = 'Selecting PPE for tasks | Level 2 Module 4.2.2 | Elec-Mate';
const DESCRIPTION =
  'Hi-vis, helmet, eye protection, gloves, arc-rated kit — choosing the level that matches the actual task.';

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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 2"
            title="Selecting PPE for tasks"
            description="Hi-vis, helmet, eye protection, gloves, arc-rated kit — choosing the level that matches the actual task."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module3Section3_6 + Module4Section1_3 + Module4Section7_3.',
              'Three promises about matching PPE to the actual task.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify standard PPE worn on an electrical install.',
              'Match PPE selection to the specific task and hazards present.',
              'Recognise when extra PPE (arc-rated, dust mask, ear defenders) is required.',
              'Inspect PPE before use and reject items that are damaged.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — PPE selection introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              tooling-task PPE content from OLD Module 3 Section 3.6, install-context
              PPE from OLD Module 4 Section 1.3, and the site safety PPE material from
              OLD Module 4 Section 7.3.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (PPE Regulations
              2002 + 2022, HASAWA s.2 + s.7, EAWR Reg 4(4)), 2-3 InlineChecks, 1+
              CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz
              questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on PPE selection, fit and inspection.',
              'Maps back to AC 2.2: identify PPE for different tasks.',
            ]}
          />

          <Quiz title="PPE selection knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Workspace hazards
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Access equipment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
