/**
 * Module 5 · Section 3 · Sub 4 — Effects of poor communication
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.4
 *   "State the effects that poor communication may have on an organisation"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module5Section6_x.tsx (cross-reference across the
 * Section 6 communication sub-pages).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Effects of poor communication | Level 2 Module 5.3.4 | Elec-Mate';
const DESCRIPTION =
  'Safety incidents, blown budgets, missed deadlines, lost customers — the real cost to a business when communication breaks down.';

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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 4"
            title="Effects of poor communication"
            description="Safety, cost, schedule, customer relationship — what it costs a business when comms break down. Aligned to Unit 210 AC 3.4."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material is
              spread across the old Module 5 Section 6 communication chapters and will
              be consolidated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
