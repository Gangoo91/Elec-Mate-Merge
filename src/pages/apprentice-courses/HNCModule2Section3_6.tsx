/**
 * Module 2 · Section 3 · Subsection 6 — HVAC Load Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Stub placeholder — will apply psychrometric chart skills to whole-AHU load
 *   calculations, mixed-air sequences and design-condition selection.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { ConceptBlock, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'HVAC Load Calculations - HNC Module 2 Section 3.6';
const DESCRIPTION =
  'Applications of psychrometrics to air-conditioning and HVAC load calculations';

const HNCModule2Section3_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 6"
            title="Applications to Air-Conditioning and HVAC Load Calcs"
            description="Practical applications of psychrometrics to air-conditioning and HVAC load calculations."
            tone="purple"
          />

          <SectionRule />

          <ConceptBlock
            title="Applications to Air-Conditioning and HVAC Load Calcs"
            plainEnglish="Putting psychrometrics to work — taking the chart skills from the previous subsections and applying them to real air-handling unit and HVAC load calculations."
          >
            <p>
              Practical applications of psychrometrics to air-conditioning and HVAC load
              calculations.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cooling and Heating Coils
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting and Acoustics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_6;
