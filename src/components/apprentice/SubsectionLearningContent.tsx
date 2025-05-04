
import React from "react";
import Subsection1_1 from "./content/Subsection1_1";
import Subsection1_2 from "./content/Subsection1_2";
import Subsection1_3 from "./content/Subsection1_3";
import Subsection2_1 from "./content/Subsection2_1";
import Subsection2_2 from "./content/Subsection2_2";
import Subsection2_3 from "./content/Subsection2_3";
import ElectricalSymbolsDisplay from "./ElectricalSymbolsDisplay";
import InteractiveLightDemo from "./InteractiveLightDemo";

type SubsectionLearningContentProps = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const SubsectionLearningContent = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionLearningContentProps) => {
  
  // Render the appropriate content based on subsection ID
  const renderContentBySubsectionId = () => {
    switch (subsectionId) {
      case "1.1":
        return (
          <>
            <Subsection1_1 
              subsectionId={subsectionId} 
              isCompleted={isCompleted} 
              markAsComplete={markAsComplete}
            />
            <ElectricalSymbolsDisplay subsectionId={subsectionId} />
            <InteractiveLightDemo 
              subsectionId={subsectionId}
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
          </>
        );
      case "1.2":
        return (
          <Subsection1_2 
            subsectionId={subsectionId}
          />
        );
      case "1.3":
        return (
          <Subsection1_3 
            subsectionId={subsectionId}
          />
        );
      case "2.1":
        return (
          <Subsection2_1 />
        );
      case "2.2":
        return (
          <>
            <Subsection2_2 
              subsectionId={subsectionId}
            />
            <ElectricalSymbolsDisplay subsectionId={subsectionId} />
          </>
        );
      case "2.3":
        return (
          <Subsection2_3 
            subsectionId={subsectionId}
          />
        );
      default:
        return <p>Content for subsection {subsectionId} is not yet available.</p>;
    }
  };

  return (
    <div className="space-y-8">
      {renderContentBySubsectionId()}
    </div>
  );
};

export default SubsectionLearningContent;
