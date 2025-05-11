
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import SubsectionRenderer from "./SubsectionRenderer";
import CourseContentSection from "@/components/apprentice/CourseContentSection";

interface SubsectionLearningContentProps {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const SubsectionLearningContent = ({
  subsectionId,
  isCompleted,
  markAsComplete
}: SubsectionLearningContentProps) => {
  console.log("SubsectionLearningContent rendering with ID:", subsectionId);
  
  useEffect(() => {
    console.log("SubsectionLearningContent mounted with subsectionId:", subsectionId, "isCompleted:", isCompleted);
  }, [subsectionId, isCompleted]);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        {/* Content will be loaded dynamically based on subsectionId */}
        <div className="prose prose-invert prose-yellow max-w-none">
          {subsectionId ? (
            <SubsectionRenderer 
              subsectionId={subsectionId}
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
          ) : (
            <p>No subsection ID provided. Please select a valid section.</p>
          )}
        </div>
        
        {/* Completion Button - Only show if completion button isn't already in the component */}
        {/* We'll remove this button since the subsection components now have their own */}
      </div>
    </div>
  );
};

export default SubsectionLearningContent;
