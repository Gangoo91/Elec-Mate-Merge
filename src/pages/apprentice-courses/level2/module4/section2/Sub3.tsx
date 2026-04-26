/**
 * Module 4 · Section 2 · Sub 3 — Selecting access equipment (working at height)
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.3
 *   "Select access equipment"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section4_7.tsx (access equipment for installs)
 *   - OLD Module5Section3_3.tsx (working at height communication)
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

const TITLE = 'Selecting access equipment | Level 2 Module 4.2.3 | Elec-Mate';
const DESCRIPTION =
  'Steps, podiums, towers, MEWPs — Work at Height Regulations 2005 and the LACES test for picking the right one.';

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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 3"
            title="Selecting access equipment"
            description="Steps, podiums, towers, MEWPs — Work at Height Regulations 2005 and the LACES test for picking the right one."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module4Section4_7 + Module5Section3_3.',
              'Three promises about choosing access equipment that survives a HSE visit.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the common types of access equipment used by electricians.',
              'Apply the Work at Height Regulations 2005 hierarchy when selecting kit.',
              'Use the LACES test to justify a choice of access equipment.',
              'Carry out a pre-use inspection on steps, podiums and towers.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Access equipment introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              install access content from OLD Module 4 Section 4.7 and the working at
              height communication material from OLD Module 5 Section 3.3.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (Work at Height
              Regulations 2005 Reg 6 + 7, PUWER, HSE INDG401), 2-3 InlineChecks, 1+
              CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz
              questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on access selection, hierarchy and pre-use inspection.',
              'Maps back to AC 2.3: select access equipment.',
            ]}
          />

          <Quiz title="Access equipment knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Selecting PPE
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Installing wiring systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
