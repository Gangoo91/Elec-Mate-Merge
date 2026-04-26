/**
 * Module 5 · Section 3 · Sub 1 — Suitable verbal communication methods
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.1
 *   "Identify suitable communication methods for use in work situations"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module5Section5_2.tsx + Module5Section6_1.tsx +
 * Module5Section6_2.tsx + Module5Section6_3.tsx + Module7Section6_2.tsx
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Suitable verbal communication methods | Level 2 Module 5.3.1 | Elec-Mate';
const DESCRIPTION =
  'Face-to-face, phone, two-way radio and written messages — when each one fits and how to keep the message clean on a noisy site.';

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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 1"
            title="Suitable verbal communication methods"
            description="Face-to-face, phone, two-way radio and written — picking the right method for the situation. Aligned to Unit 210 AC 3.1."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              the old Module 5 (Sections 5.2, 6.1, 6.2 and 6.3) and old Module 7
              (Section 6.2) covers the same ground and will be migrated into this
              stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
