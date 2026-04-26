/**
 * Module 4 · Section 1 · Sub 1 — Hand tools (selection and use)
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.1
 *   "Identify hand tools for different tasks"
 *
 * CONTENT SOURCES (to migrate when this stub is built out):
 *   - OLD Module3Section3_1.tsx (hand tools — selection and use)
 *   - OLD Module4Section4_3.tsx (relevant tooling for containment work)
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

const TITLE = 'Hand tools — selection and use | Level 2 Module 4.1.1 | Elec-Mate';
const DESCRIPTION =
  'The hand tools an electrician carries day-to-day, what each is for and how to pick the right one for the task.';

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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 1"
            title="Hand tools — selection and use"
            description="The hand tools an electrician carries day-to-day, what each is for and how to pick the right one for the task."
            tone="emerald"
          />

          <TLDR
            points={[
              'STUB — TLDR bullets to be written when this Sub is built out.',
              'Source: old Module3Section3_1 (hand tools) + Module4Section4_3 (containment tooling).',
              'Three punchy promises about what the apprentice will know after the page.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the common hand tools an electrician uses on installation work.',
              'Match each tool to the task it is designed for.',
              'Recognise when a hand tool is the right choice over a power tool.',
              'Pick the correct screwdriver, plier or stripper for the cable or accessory in front of you.',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="STUB — Hand tools introduction">
            <p>
              Placeholder ConceptBlock. When this Sub is written out it should pull the
              hand-tool content from the OLD Module 3 Section 3.1 page (which currently
              teaches Unit 204 hand-tool material under a Module 3 label) and supplement
              with the tooling notes embedded in the OLD Module 4 Section 4.3 page on
              containment work.
            </p>
            <p>
              Coverage target: 8-11 ConceptBlocks, 3-5 RegsCallouts, 2-3 InlineChecks,
              1+ CommonMistake, 1+ Scenario, 5-6 FAQs, 5-6 KeyTakeaways and 8 real Quiz
              questions per the canonical Sub structure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'STUB — KeyTakeaways to be written when this Sub is built out.',
              'Five or six bullets, each one worth remembering after the page closes.',
              'Should map back to the AC 1.1 wording: identify hand tools for different tasks.',
            ]}
          />

          <Quiz title="Hand tools knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power tools
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
