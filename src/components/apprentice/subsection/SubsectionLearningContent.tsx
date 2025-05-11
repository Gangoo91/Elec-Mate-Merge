
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
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
  // This component would render the actual content of a subsection
  // Ideally with detailed explanations, images, etc.
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        {/* Content will be loaded dynamically based on subsectionId */}
        <div className="prose prose-invert prose-yellow max-w-none">
          {/* Placeholder for actual content rendering */}
          <p>
            This subsection contains learning content about health and safety in electrical installations.
            In a full implementation, this would be populated with detailed information, diagrams, and examples.
          </p>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4 my-6">
            <h3 className="text-elec-yellow mb-2">Key Points to Remember</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always follow proper safety procedures when working with electrical installations</li>
              <li>Ensure appropriate PPE is worn at all times</li>
              <li>Understand and comply with relevant regulations and standards</li>
              <li>Identify and mitigate hazards before beginning work</li>
            </ul>
          </div>
        </div>
        
        {/* Completion Button */}
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
      </div>
    </div>
  );
};

export default SubsectionLearningContent;
