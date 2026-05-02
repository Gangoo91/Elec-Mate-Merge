/**
 * Module 2 · Section 4 · Subsection 6 — Human Comfort in Lighting and Acoustics
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Stub placeholder — will integrate visual and acoustic comfort metrics
 *   (illuminance, glare UGR, NR/NC, reverberation time) into a single
 *   occupant-comfort design statement.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageFrame, PageHero } from '@/components/college/primitives';
import { ConceptBlock, SectionRule } from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Human Comfort in Lighting and Acoustics - HNC Module 2 Section 4.6';
const DESCRIPTION =
  'Occupant comfort and performance standards for lighting and acoustic design';

const HNCModule2Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 6"
            title="Human Comfort in Lighting and Acoustics"
            description="Occupant comfort and performance standards for optimal lighting and acoustic environments."
            tone="purple"
          />

          <SectionRule />

          <ConceptBlock
            title="Human Comfort in Lighting and Acoustics"
            plainEnglish="Pulling lighting and acoustics together at the user end — what makes a space comfortable, alert and productive for the people inside it."
          >
            <p>
              Occupant comfort and performance standards for optimal lighting and acoustic
              environments.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Noise Control Methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Standards and Guidelines
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_6;
