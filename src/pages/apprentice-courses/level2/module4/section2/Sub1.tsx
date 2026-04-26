/**
 * Module 4 · Section 2 · Sub 1 — Identifying hazards in the workspace
 * Maps to City & Guilds 2365-02 / Unit 204 / LO2 / AC 2.1
 *   "Identify possible hazards in the workspace"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module4Section1_5.tsx (workspace hazards)
 *   - OLD Module4Section7_x.tsx (site safety material)
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

const TITLE = 'Identifying hazards in the workspace | Level 2 Module 4.2.1 | Elec-Mate';
const DESCRIPTION =
  'The walk-round before any tool comes out — slips, trips, live services, dust, working at height, other trades on top of you.';

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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 1"
            title="Identifying hazards in the workspace"
            description="The walk-round before any tool comes out — slips, trips, live services, dust, working at height, other trades on top of you."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR to be written when this Sub is built out.',
              'Source: old Module4Section1_5 + Module4Section7_x site-safety material.',
              'Three promises about hazard spotting before work starts.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Walk a workspace and list the foreseeable hazards before work starts.',
              'Recognise hazards specific to electrical installation work.',
              'Apply the HSE 5-step risk assessment approach to a small install.',
              'Decide when conditions need to stop work and trigger a fresh RAMS.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Workspace hazard introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull
              workspace hazard content from OLD Module 4 Section 1.5 and the broader
              site safety material in OLD Module 4 Section 7.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts (HASAWA s.2,
              MHSWR Reg 3, CDM 2015), 2-3 InlineChecks, 1+ CommonMistake, 1+ Scenario,
              5-6 FAQs, 5-6 KeyTakeaways, 8 real Quiz questions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets on common workspace hazards and the walk-round routine.',
              'Maps back to AC 2.1: identify possible hazards in the workspace.',
            ]}
          />

          <Quiz title="Workspace hazards knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Tool safety checks
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Selecting PPE
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
