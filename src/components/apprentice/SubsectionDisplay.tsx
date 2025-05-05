
import React from "react";
import { CheckCircle, CalculatorIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SubsectionLearningContent from "@/components/apprentice/SubsectionLearningContent";
import type { Subsection } from "@/data/healthAndSafety/types";

interface SubsectionDisplayProps {
  subsectionData: Subsection;
  isCompleted: boolean;
  markAsComplete: () => void;
  subsectionId: string;
}

const SubsectionDisplay = ({ 
  subsectionData, 
  isCompleted, 
  markAsComplete,
  subsectionId
}: SubsectionDisplayProps) => {
  return (
    <div className="bg-[#1a1a1a] border border-elec-yellow/20 rounded-lg p-6">
      <div className="flex flex-col mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-elec-yellow text-xl font-bold">{subsectionData.id}</span>
          <h2 className="text-2xl font-bold">{subsectionData.title}</h2>
          {isCompleted && <CheckCircle className="h-5 w-5 text-green-500 ml-2" />}
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-elec-light/90 leading-relaxed prose prose-invert max-w-none">
          <p className="mb-4">{subsectionData.content}</p>
          
          {/* Tools link section - Only show for subsection 2.1 */}
          {subsectionId === "2.1" && (
            <div className="my-6 p-4 bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
              <h3 className="text-lg font-semibold text-elec-yellow mb-3 flex items-center">
                <CalculatorIcon className="mr-2 h-5 w-5" />
                Useful Tools
              </h3>
              <p className="mb-3">
                Use our electrical calculators to help you determine the correct cable sizes and voltage drops for your installations.
              </p>
              <Link to="/electrician-tools">
                <Button variant="study" className="bg-elec-yellow/20 border border-elec-yellow/60 hover:bg-elec-yellow hover:text-elec-dark">
                  Open Electrical Calculators
                </Button>
              </Link>
            </div>
          )}
          
          {/* Learning content component - Always displayed */}
          <div className="mt-8">
            <SubsectionLearningContent 
              subsectionId={subsectionData.id}
              isCompleted={isCompleted}
              markAsComplete={markAsComplete}
            />
          </div>
        </div>
        
        {subsectionData.keyPoints && subsectionData.keyPoints.length > 0 && (
          <Accordion type="single" collapsible className="border-t border-elec-yellow/20 pt-4">
            <AccordionItem value="key-points" className="border-b-0">
              <AccordionTrigger className="py-3 text-elec-yellow hover:no-underline">
                Key Learning Points
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 list-disc pl-5 text-elec-light/80">
                  {subsectionData.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
        {/* Mark as Complete button */}
        <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
          <Button 
            variant="study"
            className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
            onClick={markAsComplete}
            disabled={isCompleted}
          >
            {isCompleted ? 'Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubsectionDisplay;
