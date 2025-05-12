
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
      <h2 className="text-2xl font-bold">Electrical Installation Theory and Technology</h2>
      <p className="text-muted-foreground mb-6">
        This unit covers the essential theories, regulations, and technical information related to electrical installations.
      </p>
      
      {/* Electrical Theory Content */}
      <div className="space-y-4">
        <SectionBox
          sectionNumber="1"
          title="Legislation, Regulations, and Guidance for Electrical Installation Work"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="2"
          title="Technical Information Used in Electrical Work"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="3"
          title="Properties, Applications, and Limitations of Different Wiring Systems"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="4"
          title="General Layout of Equipment at the Service Position"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="5"
          title="Standard Lighting Circuits"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="6"
          title="Standard Ring and Radial Final Circuits"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="7"
          title="Basic Requirements for Circuits"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="8"
          title="Importance of Earthing and Bonding for Protection"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="9"
          title="Principles of Overcurrent Protection"
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          sectionNumber="10"
          title="Principles of Circuit Design"
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
