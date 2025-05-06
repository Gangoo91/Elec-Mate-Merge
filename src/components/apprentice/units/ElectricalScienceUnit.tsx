
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { useParams } from "react-router-dom";

interface ElectricalScienceUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalScienceUnit = ({ unitCode, onResourceClick }: ElectricalScienceUnitProps) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { courseSlug } = useParams();
  
  // Load completion status
  useEffect(() => {
    const storedQuizStatus = localStorage.getItem(`unit_${unitCode}_quiz_completed`);
    if (storedQuizStatus === 'true') {
      setQuizCompleted(true);
    }
  }, [unitCode]);

  const handleSectionClick = () => {
    // Report study activity when opening a section
    onResourceClick('learning');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Science and Principles Content */}
      <div className="space-y-6">
        <SectionBox
          sectionNumber="1"
          title="Fundamental Electrical Concepts"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        <SectionBox
          sectionNumber="2"
          title="Electrical Circuits and Ohm's Law"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        <SectionBox
          sectionNumber="3"
          title="Power and Energy in Electrical Systems"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        <SectionBox
          sectionNumber="4"
          title="Magnetism and Electromagnetism"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        <SectionBox
          sectionNumber="5"
          title="AC Theory and Principles"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Quiz Section */}
        <SectionBox
          sectionNumber="Q"
          title="Electrical Science Assessment Quiz"
          isExpanded={false}
          onClick={() => {
            handleSectionClick();
            onResourceClick('assessment');
          }}
          content={<></>}
          isCompleted={quizCompleted}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
      </div>
    </div>
  );
};

export default ElectricalScienceUnit;
