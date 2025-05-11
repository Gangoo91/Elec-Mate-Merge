
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <CourseContentSection
        title="Working Safely with Electrical Systems"
        description="Understanding proper procedures and practices for working safely with electrical systems is essential for preventing accidents and ensuring compliance with regulations."
        keyPoints={[
          "Following safe working procedures to prevent electrical accidents",
          "Proper use of PPE and safety equipment",
          "Understanding and applying safe isolation procedures",
          "Identifying and mitigating electrical hazards"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Safe Working Procedures Section */}
      <div className="bg-gray-100/30 rounded-lg p-5 border border-elec-yellow/10">
        <h3 className="text-lg font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-5 w-5 mr-2" />
          Safe Working Procedures
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Before Starting Work:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Complete risk assessment</li>
              <li>Ensure proper authorization</li>
              <li>Check test equipment calibration</li>
              <li>Verify safe isolation procedures</li>
              <li>Communicate with affected persons</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">During Work:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Use appropriate PPE at all times</li>
              <li>Apply lock-off procedures</li>
              <li>Use insulated tools</li>
              <li>Follow permit-to-work systems</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* PPE and Safety Equipment Section */}
      <div className="bg-gray-100/30 rounded-lg p-5 border border-elec-yellow/10">
        <h3 className="text-lg font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-5 w-5 mr-2" />
          PPE & Safety Equipment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {!isMobile ? (
            <>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Essential PPE:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Insulated gloves (rated for voltage)</li>
                  <li>Eye protection/face shield</li>
                  <li>Non-conductive safety footwear</li>
                  <li>Flame-resistant clothing</li>
                  <li>Insulating mats</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Safety Equipment:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Voltage indicators</li>
                  <li>Proving units</li>
                  <li>Locking-off devices</li>
                  <li>Warning signs</li>
                  <li>Barriers/screening</li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Essential PPE & Equipment:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Insulated gloves</li>
                <li>Eye protection</li>
                <li>Voltage indicators</li>
                <li>Locking-off devices</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Safe Isolation and Electrical Hazards Section */}
      <div className="bg-gray-100/30 rounded-lg p-5 border border-elec-yellow/10">
        <h3 className="text-lg font-bold text-elec-yellow flex items-center mb-4">
          <Zap className="h-5 w-5 mr-2" />
          Safe Isolation Procedures
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Five Steps of Safe Isolation:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              <li><span className="font-medium">Identify</span> the circuit</li>
              <li><span className="font-medium">Isolate</span> and lock off</li>
              <li><span className="font-medium">Prove</span> the voltage tester</li>
              <li><span className="font-medium">Test</span> the circuit is dead</li>
              <li><span className="font-medium">Reprove</span> the tester</li>
            </ol>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">When live work is permitted:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>It's unreasonable for the circuit to be dead</li>
              <li>Suitable precautions are in place</li>
              <li>Authorized by competent person</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Electrical Hazards Section */}
      <div className="bg-gray-100/30 rounded-lg p-5 border border-elec-yellow/10">
        <h3 className="text-lg font-bold text-elec-yellow flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Common Electrical Hazards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Hazard Types:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Direct contact with live parts</li>
              <li>Indirect contact through conductive materials</li>
              <li>Arc flash/blast injuries</li>
              <li>Fire from electrical faults</li>
              <li>Stored electrical energy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2 text-sm">Common Issues:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Exposed conductors</li>
              <li>Damaged insulation</li>
              <li>Water ingress</li>
              <li>Overloaded circuits</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Key Regulations Section */}
      <div className="bg-gray-100/30 rounded-lg p-5 border border-elec-yellow/10">
        <h3 className="text-lg font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-5 w-5 mr-2" />
          Key Regulations for Working Safely
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">Electricity at Work Regulations 1989</h4>
            <p className="text-sm text-elec-light/80">Regulation 14 specifically covers working on or near live conductors, requiring that no person shall work on or near any live conductor unless:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>It is unreasonable for it to be dead</li>
              <li>Suitable precautions are taken</li>
              <li>It is reasonable to work live</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">BS 7671 Wiring Regulations</h4>
            <p className="text-sm text-elec-light/80">The IET Wiring Regulations provide specific technical standards for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Protection against electric shock</li>
              <li>Isolation and switching procedures</li>
              <li>Protective measures</li>
              <li>Inspection and testing requirements</li>
            </ul>
          </div>
        </div>
      </div>
      
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
  );
};

export default Subsection3_2;
