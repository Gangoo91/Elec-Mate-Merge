import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageGetSync } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { legislationSection } from '@/data/electricalTheory/section1-legislation';

interface ElectricalTheorySectionProps {
  sectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const ElectricalTheorySection: React.FC<ElectricalTheorySectionProps> = ({
  sectionId,
  isCompleted,
  markAsComplete,
}) => {
  const navigate = useNavigate();
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);

  const handleNavigateToSubsection = (subsectionId: string) => {
    // Get base path from current URL
    const basePath = window.location.pathname.split('/section')[0];
    navigate(`${basePath}/section/1/subsection/${subsectionId}`);
  };

  // Check which subsections have been completed
  const getCompletionStatus = (subsectionId: string) => {
    const storageKey = `completion_elec_1_${subsectionId}`;
    return storageGetSync(storageKey) === 'true';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            {legislationSection.title}
          </h1>
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          )}
        </div>
        <p className="text-[14px] text-white/70 leading-relaxed">{legislationSection.description}</p>
        <p className="text-[14px] text-white/85 leading-relaxed pt-2 border-t border-white/[0.06]">
          {legislationSection.content.introduction}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {legislationSection.content.subsections.map((subsection) => {
          const isSubsectionCompleted = getCompletionStatus(subsection.id);

          return (
            <button
              key={subsection.id}
              onClick={() => handleNavigateToSubsection(subsection.id)}
              className="text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 active:bg-white/[0.04] transition-colors touch-manipulation space-y-2"
            >
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
                  {subsection.id}
                </span>
                {isSubsectionCompleted && (
                  <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                )}
              </div>
              <h3 className="text-[16px] font-semibold text-white leading-tight">
                {subsection.title}
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed line-clamp-2">
                {subsection.content}
              </p>
              <ul className="space-y-1 pt-1">
                {subsection.keyPoints.slice(0, 2).map((point, idx) => (
                  <li
                    key={idx}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span className="truncate">{point}</span>
                  </li>
                ))}
                {subsection.keyPoints.length > 2 && (
                  <li className="text-[12px] text-white/55 pl-3">
                    + {subsection.keyPoints.length - 2} more topics
                  </li>
                )}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          onClick={() => {
            const pathParts = window.location.pathname.split('/');
            const unitPath = pathParts.slice(0, pathParts.indexOf('section')).join('/');
            navigate(unitPath);
          }}
        >
          Back to unit
        </Button>

        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
        >
          {isCompleted ? 'Section completed' : 'Mark section as complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default ElectricalTheorySection;
