/**
 * Module 2 · Section 1 · Subsection 7 — Comfort Conditions
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Human thermal comfort — air temperature, mean radiant temperature, humidity,
 *   air movement, clothing (clo) and activity (met). Stub — to be expanded with the
 *   full BS EN ISO 7730 PMV/PPD method and CIBSE Guide A comfort criteria.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { ConceptBlock, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const HNCModule2Section1_7 = () => {
  const navigate = useNavigate();
  useSEO(
    'Comfort Conditions - HNC Module 2',
    'Human thermal comfort factors including temperature, humidity and air movement'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 7"
            title="Comfort Conditions (Temperature, Humidity, Air Movement, Clothing/Activity)"
            description="Human thermal comfort factors and standards for optimal indoor environmental conditions."
            tone="purple"
          />

          <ConceptBlock
            title="Coming soon"
            plainEnglish="This subsection is being written. It'll cover the four thermal comfort factors — air temperature, mean radiant temperature, humidity and air movement — plus how clothing (clo) and activity (met) affect what feels comfortable."
          >
            <p>
              Subsection content under development. Topics will include the BS EN ISO 7730 PMV/PPD
              method, CIBSE comfort criteria, and the dry-bulb / radiant temperature trade-off
              that drives radiant heating design.
            </p>
          </ConceptBlock>

          <SectionRule />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat loss calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fluid mechanics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_7;
