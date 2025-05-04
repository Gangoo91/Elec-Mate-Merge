
import React from "react";
import Subsection1_1 from "./content/Subsection1_1";
import Subsection1_2 from "./content/Subsection1_2";
import Subsection1_3 from "./content/Subsection1_3";
import Subsection2_1 from "./content/Subsection2_1";
import Subsection2_2 from "./content/Subsection2_2";
import Subsection2_3 from "./content/Subsection2_3";
import Subsection3_1 from "./content/Subsection3_1";
import Subsection3_2 from "./content/Subsection3_2";
import Subsection3_3 from "./content/Subsection3_3";
import Subsection4_1 from "./content/Subsection4_1";
import Subsection5_1 from "./content/Subsection5_1";
import Subsection6_1 from "./content/Subsection6_1";
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
      case "3.1":
        return (
          <Subsection3_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "3.2":
        return (
          <Subsection3_2
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "3.3":
        return (
          <Subsection3_3
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "4.1":
        return (
          <Subsection4_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "5.1":
        return (
          <Subsection5_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
          />
        );
      case "6.1":
        return (
          <Subsection6_1
            subsectionId={subsectionId}
            isCompleted={isCompleted} 
            markAsComplete={markAsComplete}
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
