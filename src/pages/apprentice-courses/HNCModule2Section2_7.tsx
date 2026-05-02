/**
 * Module 2 · Section 2 · Subsection 7 — Applications in Water Distribution and Duct Systems
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Pump &amp; system curves, duct sizing methods (equal friction, velocity reduction,
 *   static regain) and pressure budgets for LTHW. Stub — to be expanded with worked
 *   examples and CIBSE Guide B / ASHRAE references.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { ConceptBlock, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Applications in water distribution and duct systems | HNC Module 2.2.7 | Elec-Mate';
const DESCRIPTION =
  'Practical applications of fluid mechanics in building services — pump curves and system curves, duct sizing, water distribution losses and pressure budgets.';

const HNCModule2Section2_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 7"
            title="Applications in water distribution and duct systems"
            description="Where fluid mechanics meets the building services rig — pumps, ducts, pressure budgets and the practical maths an HNC engineer applies on a real project."
            tone="purple"
          />

          <ConceptBlock
            title="Pump and system curves"
            plainEnglish="A pump's performance curve crosses the system's resistance curve at the operating point. Move either curve and the operating point shifts."
          >
            <p>
              Two curves matter on every water system you'll design or commission:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pump curve</strong> — head produced versus flow rate, supplied by the
                manufacturer for each impeller speed
              </li>
              <li>
                <strong>System curve</strong> — head required to overcome static lift plus friction
                losses through pipework, fittings and terminal units
              </li>
              <li>
                <strong>Operating point</strong> — where the two curves intersect; this is the
                actual flow and head the pump will deliver in service
              </li>
              <li>
                Variable-speed drives shift the pump curve down to match reduced demand, saving
                energy versus throttling at a constant-speed pump
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Duct sizing for HVAC distribution"
            plainEnglish="Duct sizing balances pressure drop, noise, capital cost and floor-to-floor height. The classic methods are equal friction, velocity reduction and static regain."
          >
            <p>
              Each method optimises for a different constraint:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equal friction</strong> — sizes ducts so pressure drop per unit length is
                roughly constant. Quick and good for typical commercial buildings
              </li>
              <li>
                <strong>Velocity reduction</strong> — picks descending velocities (e.g. 8-6-4 m/s)
                from main to branches to limit noise at terminals
              </li>
              <li>
                <strong>Static regain</strong> — calculates duct sizes so velocity reduction
                downstream recovers static pressure, balancing the system without dampers. More
                complex but used where balancing time and accuracy matter
              </li>
              <li>
                CIBSE Guide B and ASHRAE Fundamentals give the friction-loss charts and rectangular
                /circular equivalent diameters
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pressure budget for a water distribution system"
            plainEnglish="The pump head has to cover everything between the source and the most-remote outlet — and you need a margin in hand for fouling and future extension."
          >
            <p>
              A typical LTHW (low-temperature hot water) circuit budget:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Static lift (vertical rise) — fixed by building geometry</li>
              <li>Pipe friction loss — usually the dominant term in long runs</li>
              <li>Fittings + valves — calculated as equivalent length or k-factor sum</li>
              <li>
                Terminal pressure drop — radiators, fan-coil coils, plate heat exchangers each take
                a defined head
              </li>
              <li>Control-valve authority — typically 50% of branch pressure drop for stable control</li>
              <li>
                Margin — engineers add 10-15% on top for pipe ageing, scale and load growth
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module2-section2-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Subsection 2.6
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module2-section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section 2 complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_7;
