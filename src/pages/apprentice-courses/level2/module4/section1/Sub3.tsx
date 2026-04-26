/**
 * Module 4 · Section 1 · Sub 3 — Tool safety checks and maintenance
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.3
 *   "Describe safety checks used for tools"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module3Section3_4.tsx (tool inspection)
 *   - OLD Module3Section3_5.tsx (tool maintenance)
 *   - OLD Module4Section7_2.tsx (PAT and pre-use checks)
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

const TITLE = 'Tool safety checks and maintenance | Level 2 Module 4.1.3 | Elec-Mate';
const DESCRIPTION =
  'Pre-use checks, PAT intervals, blade and bit condition — the routine that stops a tool putting you in A&E.';

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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 3"
            title="Tool safety checks and maintenance"
            description="Pre-use checks, PAT intervals, blade and bit condition — the routine that stops a tool putting you in A&E."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module3Section3_4 + Module3Section3_5 + Module4Section7_2.',
              'Three promises about pre-use checks, PAT and what to take out of service.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out pre-use safety checks on hand and power tools.',
              'Recognise the visible signs that a tool should be quarantined.',
              'Explain how PAT testing fits with daily user checks.',
              'Maintain hand tools so they last and stay safe.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Tool safety overview">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              tool inspection material from OLD Module 3 Section 3.4, the maintenance
              routine from OLD Module 3 Section 3.5, and the PAT / pre-use safety
              detail from OLD Module 4 Section 7.2.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (PUWER Reg 4 + 5,
              EAWR Reg 4, HSE PAT guidance), 2-3 InlineChecks, 1+ CommonMistake, 1+
              Scenario, 5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on visual checks, PAT intervals and quarantine procedure.',
              'Maps back to AC 1.3: describe safety checks used for tools.',
            ]}
          />

          <Quiz title="Tool safety knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power tools
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Preparing for installation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
