
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
        
        {/* Completion Button - Only show if not already in component */}
        {!subsectionId.includes('.') && (
          <div className="flex justify-end pt-4 border-t border-elec-yellow/20 mt-6">
            <Button
              onClick={markAsComplete}
              disabled={isCompleted}
              className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
            >
              {isCompleted ? 'Completed' : 'Mark as Complete'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubsectionLearningContent;
