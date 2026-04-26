/**
 * Module 5 · Section 1 · Sub 3 — Site visitors and other roles
 * Maps to City & Guilds 2365-02 / Unit 210 / LO1 / AC 1.3
 *   "Identify the key roles of site visitors"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module5Section5_3.tsx
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Site visitors and other roles | Level 2 Module 5.1.3 | Elec-Mate';
const DESCRIPTION =
  'Clients, building control, DNO, HSE inspectors — the people who turn up unannounced on site and what they want from you.';

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
            eyebrow="Module 5 · Section 1 · Subsection 3"
            title="Site visitors and other roles"
            description="Clients, building control inspectors, DNO engineers, HSE — who turns up on site, why they're there and what they want. Aligned to Unit 210 AC 1.3."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              the old Module 5 (Section 5.3) covers the same ground and will be
              migrated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
