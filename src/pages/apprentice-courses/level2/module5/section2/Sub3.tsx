/**
 * Module 5 · Section 2 · Sub 3 — Customer-facing information
 * Maps to City & Guilds 2365-02 / Unit 210 / LO2 / AC 2.3
 *   "Identify the purpose of information given to customers"
 *
 * STUB ONLY — content to be written in a later wave.
 * Source feed: NEW content — no equivalent in old Module 5.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Customer-facing information | Level 2 Module 5.2.3 | Elec-Mate';
const DESCRIPTION =
  'Quotes, invoices, certificates and handover documents — what the customer gets, why each one matters and what happens when it is wrong.';

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
            eyebrow="Module 5 · Section 2 · Subsection 3"
            title="Customer-facing information"
            description="Quotes, invoices, certificates and handover documents — the paperwork the customer actually sees and signs. Aligned to Unit 210 AC 2.3."
            tone="emerald"
          />

          <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-6 text-[14px] text-white/75 leading-relaxed">
            <p className="font-semibold text-white mb-2">Coming soon</p>
            <p>
              Full content for this subsection is being written. This is new material —
              the old Module 5 did not cover customer-facing paperwork in any depth, so
              the page will be drafted from scratch in a later wave.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
