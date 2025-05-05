
import React from "react";
import { Link } from "react-router-dom";
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
    <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-elec-yellow mb-6">{subsectionData.title}</h1>
      
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
