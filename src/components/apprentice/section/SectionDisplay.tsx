import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storageGetSync } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import type { SectionData, Subsection } from '@/data/healthAndSafety/types';
import ElectricalTheorySection from './ElectricalTheorySection';

interface SectionDisplayProps {
  sectionData: SectionData;
  effectiveCourseSlug: string;
  effectiveUnitSlug: string;
  sectionId?: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const SectionDisplay = ({
  sectionData,
  effectiveCourseSlug,
  effectiveUnitSlug,
  sectionId,
  isCompleted,
  markAsComplete,
}: SectionDisplayProps) => {
  const navigate = useNavigate();

  // Check if we're in the electrical theory unit
  const isElectricalTheory = effectiveUnitSlug === 'elec2-04';

  console.log('SectionDisplay - Is electrical theory:', isElectricalTheory);
  console.log('SectionDisplay - Section data:', sectionData);

  // For electrical theory sections, use specialised components
  if (isElectricalTheory) {
    return (
      <ElectricalTheorySection
        sectionId={sectionId || ''}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }

  // Extract subsections from the section data
  const subsections =
    sectionData.content &&
    typeof sectionData.content === 'object' &&
    'subsections' in sectionData.content
      ? sectionData.content.subsections
      : sectionData.subsections || [];

  const navigateToSubsection = (subsection: Subsection | string) => {
    let subsectionId;
    if (typeof subsection === 'string') {
      subsectionId = subsection;
    } else {
      subsectionId = subsection.id;
    }

    navigate(
      `/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}/section/${sectionId}/subsection/${subsectionId}`
    );
  };

  // Check which subsections have been completed
  const isSubsectionCompleted = (subsectionId: string) => {
    const storageKey = `completion_hs_${sectionId}_${subsectionId}`;
    return storageGetSync(storageKey) === 'true';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            {sectionData.title}
          </h1>
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          )}
        </div>
        <p className="text-[14px] text-white/70 leading-relaxed">{sectionData.description}</p>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Section content
        </span>

        {subsections.map((subsection, index) => (
          <button
            key={subsection.id}
            onClick={() => navigateToSubsection(subsection)}
            className="w-full text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 active:bg-white/[0.04] transition-colors touch-manipulation"
          >
            <div className="flex items-start gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono mt-1">
                {index + 1}
              </span>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[16px] font-semibold text-white leading-tight">
                    {subsection.title}
                  </h3>
                  {isSubsectionCompleted(subsection.id) && (
                    <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  )}
                </div>
                <p className="text-[14px] text-white/70 leading-relaxed line-clamp-2">
                  {subsection.content}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/55 flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          onClick={() =>
            navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)
          }
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to unit
        </Button>

        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
        >
          {isCompleted ? 'Section completed' : 'Mark as complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SectionDisplay;
