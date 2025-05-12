
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionData } from '@/data/courseTypes';
import SectionSubsectionCard from '@/components/apprentice/SectionSubsectionCard';
import { electricalTheorySections } from '@/data/electricalTheory';

interface TheorySectionsProps {
  unitCode: string;
  quizCompleted: boolean;
  onResourceClick: (type: string) => void;
}

const TheorySections = ({ unitCode, quizCompleted, onResourceClick }: TheorySectionsProps) => {
  const navigate = useNavigate();
  
  // Get the first section data which contains the legislation subsections
  const legislationSection = electricalTheorySections[0];
  
  const navigateToSubsection = (subsection: any) => {
    navigate(`/apprentice/study/eal/level-2-diploma/unit/elec2-04/section/1/subsection/${subsection.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-elec-yellow mb-4">
          {legislationSection.title}
        </h2>
        
        <p className="text-muted-foreground mb-6">
          {legislationSection.description}
        </p>
        
        {/* Subsection cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {legislationSection.content.subsections.map((subsection) => (
            <SectionSubsectionCard
              key={subsection.id}
              subsection={subsection}
              navigateToSubsection={navigateToSubsection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheorySections;
