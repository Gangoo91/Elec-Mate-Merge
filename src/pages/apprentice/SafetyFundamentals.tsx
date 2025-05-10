
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubsectionLearningContent from "@/components/apprentice/subsection/SubsectionLearningContent";
import SubsectionsNavigation from "@/components/apprentice/SubsectionsNavigation";
import BackButton from "@/components/apprentice/BackButton";

const SafetyFundamentals = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [subsectionData, setSubsectionData] = useState<any>(null);
  
  useEffect(() => {
    // Check if the section has been completed
    const storedCompletionStatus = localStorage.getItem(`subsection_3.1_completed`);
    if (storedCompletionStatus === 'true') {
      setIsCompleted(true);
    }
    
    // Load subsection data if needed
    setSubsectionData({
      id: "3.1",
      title: "Electrical Safety Fundamentals"
    });
  }, []);

  const markAsComplete = () => {
    localStorage.setItem(`subsection_3.1_completed`, 'true');
    setIsCompleted(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 py-3 bg-elec-dark/80 border-b border-elec-yellow/20">
        <h1 className="text-lg font-semibold text-elec-yellow">
          Electrical Safety Fundamentals
        </h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-4 px-4 md:px-8">
          <BackButton courseSlug="level-2-electrical-installation" unitSlug="elec2-01" />
          
          <div className="mt-4">
            <SubsectionLearningContent
              subsectionId="3.1"
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyFundamentals;
