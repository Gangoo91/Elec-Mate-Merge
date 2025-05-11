
import { useState, useEffect } from "react";
import SectionBox from "@/components/apprentice/SectionBox";
import { 
  electricalTheorySection, 
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection
} from "@/data/electricalTheory";
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
          key={electricalTheorySection.sectionNumber}
          sectionNumber={electricalTheorySection.sectionNumber}
          title={electricalTheorySection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        {/* Individual topic sections */}
        <SectionBox
          key={basicElectricalTheorySection.sectionNumber}
          sectionNumber={basicElectricalTheorySection.sectionNumber}
          title={basicElectricalTheorySection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={technicalInformationSection.sectionNumber}
          sectionNumber={technicalInformationSection.sectionNumber}
          title={technicalInformationSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={wiringSectionsSection.sectionNumber}
          sectionNumber={wiringSectionsSection.sectionNumber}
          title={wiringSectionsSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={servicePositionSection.sectionNumber}
          sectionNumber={servicePositionSection.sectionNumber}
          title={servicePositionSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={lightingCircuitsSection.sectionNumber}
          sectionNumber={lightingCircuitsSection.sectionNumber}
          title={lightingCircuitsSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={ringRadialCircuitsSection.sectionNumber}
          sectionNumber={ringRadialCircuitsSection.sectionNumber}
          title={ringRadialCircuitsSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={circuitRequirementsSection.sectionNumber}
          sectionNumber={circuitRequirementsSection.sectionNumber}
          title={circuitRequirementsSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={earthingBondingSection.sectionNumber}
          sectionNumber={earthingBondingSection.sectionNumber}
          title={earthingBondingSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={overcurrentProtectionSection.sectionNumber}
          sectionNumber={overcurrentProtectionSection.sectionNumber}
          title={overcurrentProtectionSection.title}
          isExpanded={false}
          onClick={handleSectionClick}
          content={<></>}
          unitCode={unitCode}
          courseSlug={courseSlug}
        />
        
        <SectionBox
          key={circuitDesignSection.sectionNumber}
          sectionNumber={circuitDesignSection.sectionNumber}
          title={circuitDesignSection.title}
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
