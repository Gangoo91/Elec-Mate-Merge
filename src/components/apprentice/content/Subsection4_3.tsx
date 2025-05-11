
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection4_3/IntroSection";
import MEWPCategories from "./subsection4_3/MEWPCategories";
import MEWPSafety from "./subsection4_3/MEWPSafety";
import CompletionButton from "./subsection4_3/CompletionButton";

const Subsection4_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* First horizontal box - MEWP Categories */}
      <MEWPCategories />
      
      {/* Second horizontal box - MEWP Safety */}
      <MEWPSafety />
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection4_3;
