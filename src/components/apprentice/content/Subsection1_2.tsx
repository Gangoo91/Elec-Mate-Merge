
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Book } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection1_2 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">BS 7671 (IET Wiring Regulations)</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="BS 7671 (IET Wiring Regulations)"
          description="BS 7671, known as the IET Wiring Regulations, provides comprehensive technical standards for electrical installations in the UK. Currently in its 18th Edition, these regulations specify requirements for the design, installation, inspection, and testing of all electrical installations. While not statutory law themselves, they are the accepted standard for compliance with relevant statutory regulations. The regulations are divided into parts covering fundamental principles, definitions, assessment of general characteristics, protection, selection and erection of equipment, inspection and testing, and special installations."
          keyPoints={[
            "Current 18th Edition provides latest technical standards",
            "Covers all aspects from design to verification of installations",
            "Compliance demonstrates meeting statutory requirements",
            "Regular updates ensure standards reflect current best practices"
          ]}
          icon="info"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Structure of BS 7671
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Part 1: Scope, Object and Fundamental Principles</h4>
              <p className="text-sm md:text-base">
                Establishes the purpose of the regulations and fundamental safety principles.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Part 4: Protection for Safety</h4>
              <p className="text-sm md:text-base">
                Covers protection against electric shock, thermal effects, overcurrent, and more.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Part 6: Inspection and Testing</h4>
              <p className="text-sm md:text-base">
                Details requirements for initial verification and periodic inspection of electrical installations.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Part 7: Special Installations or Locations</h4>
              <p className="text-sm md:text-base">
                Provides additional requirements for installations in special locations like bathrooms, swimming pools, etc.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Legal Status</h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Though BS 7671 is not statutory law, it is the recognized standard for demonstrating compliance with legal requirements established by:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium text-white">Electricity at Work Regulations 1989</span>
                <p className="text-sm mt-1">Following BS 7671 helps satisfy the "prevention of danger" requirements.</p>
              </li>
              <li>
                <span className="font-medium text-white">Building Regulations</span>
                <p className="text-sm mt-1">Specifically Part P for domestic installations in England and Wales.</p>
              </li>
              <li>
                <span className="font-medium text-white">Electricity Safety, Quality and Continuity Regulations 2002</span>
                <p className="text-sm mt-1">For connections to distribution networks.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-6 border-t border-elec-yellow/20">
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
  );
};

export default Subsection1_2;
