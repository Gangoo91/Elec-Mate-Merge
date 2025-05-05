
import React from "react";
import SubsectionLearningContent from "./SubsectionLearningContent";

type SubsectionData = {
  id: string;
  title: string;
  content: string;
};

type SubsectionDisplayProps = {
  subsectionData: SubsectionData;
  isCompleted: boolean;
  markAsComplete: () => void;
  subsectionId: string;
};

const SubsectionDisplay = ({ 
  subsectionData, 
  isCompleted, 
  markAsComplete,
  subsectionId 
}: SubsectionDisplayProps) => {
  return (
    <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-4 md:p-6 animate-fade-in">
      <div className="prose prose-invert max-w-none">
        <SubsectionLearningContent 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      </div>
    </div>
  );
};

export default SubsectionDisplay;
