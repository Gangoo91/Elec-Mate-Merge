/**
 * Module 5 · Section 2 · Sub 1 — Statutory legislation and guidance
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.1
 *   "Identify the types of statutory legislation and guidance information
 *    that applies to working in the industry"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: old Module 1 (light touch on HASAWA / EAWR / BS 7671) +
 * fresh framing for Unit 210 reading-and-using-the-docs angle.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Statutory legislation and guidance | Level 2 Module 5.2.1 | Elec-Mate';
const DESCRIPTION =
  'HASAWA, EAWR, BS 7671 and HSE guidance — the legal and technical documents you have to know exist and where to find them on a job.';

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
            eyebrow="Module 5 · Section 2 · Subsection 1"
            title="Statutory legislation and guidance"
            description="HASAWA, EAWR, BS 7671, HSE guidance — the legal and technical documents that govern how the trade works. Aligned to Unit 210 AC 2.1."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. Source material from
              the old Module 1 (light touch on HASAWA, EAWR and BS 7671) plus fresh
              Unit 210 framing on how to actually use these documents on a job will be
              migrated into this stub.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
