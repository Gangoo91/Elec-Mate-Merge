
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionBox } from '@/components/apprentice/SectionBox';
import TheoryQuizCard from './TheoryQuizCard';

interface TheorySectionsProps {
  unitCode: string;
  quizCompleted: boolean;
  onResourceClick: (type: string) => void;
}

const TheorySections = ({ unitCode, quizCompleted, onResourceClick }: TheorySectionsProps) => {
  const navigate = useNavigate();
  const courseSlug = "level-2-diploma";
  
  // The section titles for Electrical Theory
  const sectionTitles = [
    "Legislation & Regulations",
    "Technical Information",
    "Wiring Systems",
    "Service Position Equipment",
    "Lighting Circuits",
    "Ring and Radial Circuits",
    "Circuit Requirements",
    "Earthing and Bonding",
    "Overcurrent Protection",
    "Circuit Design"
  ];
  
  return (
    <div className="space-y-6">
      {/* Section boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {sectionTitles.map((title, index) => {
          const sectionNumber = `${index + 1}`;
          return (
            <SectionBox
              key={sectionNumber}
              sectionNumber={sectionNumber}
              title={title}
              isExpanded={false}
              onClick={() => {}}
              content={null}
              isCompleted={false}
              unitCode={unitCode}
              courseSlug={courseSlug}
            />
          );
        })}
      </div>
      
      {/* Quiz card */}
      <div className="mt-8">
        <TheoryQuizCard 
          courseSlug={courseSlug} 
          unitCode={unitCode}
          quizCompleted={quizCompleted}
          onClick={() => onResourceClick("quiz")}
        />
      </div>
    </div>
  );
};

export default TheorySections;
