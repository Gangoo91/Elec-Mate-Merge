/**
 * Module 5 · Section 1 · Sub 2 — Trades reporting to site management
 * Maps to City & Guilds 2365-02 / Unit 210 / LO1 / AC 1.2
 *   "Identify the key roles of the individuals that report to the site
 *    management team"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module5Section5_1.tsx + Module5Section5_4.tsx + Module5Section4_5.tsx
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Trades reporting to site management | Level 2 Module 5.1.2 | Elec-Mate';
const DESCRIPTION =
  'Electricians, plumbers, joiners, plasterers, labourers — the trades on a typical job and how they slot together under site management.';

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
            eyebrow="Module 5 · Section 1 · Subsection 2"
            title="Trades reporting to site management"
            description="Electricians, plumbers, joiners, plasterers and labourers — the trades on a typical site and how they interlock. Aligned to Unit 210 AC 1.2."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              the old Module 5 (Sections 5.1, 5.4 and 4.5) covers the same ground and
              will be migrated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
