/**
 * Module 5 · Section 2 · Sub 4 — Company policies and procedures
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.4
 *   "State the importance of company policies and procedures that affect
 *    working relationships"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module5Section5_5.tsx + Module5Section7_1.tsx
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Company policies and procedures | Level 2 Module 5.2.4 | Elec-Mate';
const DESCRIPTION =
  'Equality, dignity at work, disciplinary, IT and social media policies — the internal rules that govern how your firm works.';

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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 5 · Section 2 · Subsection 4"
            title="Company policies and procedures"
            description="The internal rulebook — equality, dignity at work, disciplinary, IT and social media policies — and why they affect every working relationship. Aligned to Unit 210 AC 2.4."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              the old Module 5 (Sections 5.5 and 7.1) covers the same ground and will
              be migrated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
