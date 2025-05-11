
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { useParams } from "react-router-dom";

interface ElectricalTheoryUnitProps {
  unitCode: string;
  onResourceClick: (type: string) => void;
}

const ElectricalTheoryUnit = ({ unitCode, onResourceClick }: ElectricalTheoryUnitProps) => {
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
      {/* Electrical Theory Content */}
      <div className="space-y-6">
        {/* Main section */}
        <SectionBox
          key="04"
          sectionNumber="04"
          title="Electrical Theory"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Individual topic sections */}
        <SectionBox
          key="1"
          sectionNumber="1"
          title="Basic Electrical Theory"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="2"
          sectionNumber="2"
          title="Technical Information"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="3"
          sectionNumber="3"
          title="Wiring Sections"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="4"
          sectionNumber="4"
          title="Service Position"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="5"
          sectionNumber="5"
          title="Lighting Circuits"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="6"
          sectionNumber="6"
          title="Ring and Radial Circuits"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="7"
          sectionNumber="7"
          title="Circuit Requirements"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="8"
          sectionNumber="8"
          title="Earthing and Bonding"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="9"
          sectionNumber="9"
          title="Overcurrent Protection"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key="10"
          sectionNumber="10"
          title="Circuit Design"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Quiz Section */}
        <SectionBox
          sectionNumber="Q"
          title="Electrical Theory Assessment Quiz"
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

export default ElectricalTheoryUnit;
