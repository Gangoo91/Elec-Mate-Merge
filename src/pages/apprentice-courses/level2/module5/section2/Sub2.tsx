/**
 * Module 5 · Section 2 · Sub 2 — Workplace information
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.2
 *   "Identify the purpose of information that is used in the workplace"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module3Section6_6.tsx + Module4Section1_4.tsx +
 * Module5Section3_1.tsx + Module5Section3_2.tsx + Module5Section7_x.tsx
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Workplace information | Level 2 Module 5.2.2 | Elec-Mate';
const DESCRIPTION =
  'Drawings, RAMS, specs, work instructions, schedules — the day-to-day paperwork that tells you what to do and how.';

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
            eyebrow="Module 5 · Section 2 · Subsection 2"
            title="Workplace information"
            description="Drawings, RAMS, specifications, work instructions and schedules — the paperwork that tells you what to do and how. Aligned to Unit 210 AC 2.2."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              old Module 3 (Section 6.6 — drawings), old Module 4 (Section 1.4 —
              specifications) and old Module 5 (Sections 3.1, 3.2 and the Section 7
              documentation chapters) will be migrated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
