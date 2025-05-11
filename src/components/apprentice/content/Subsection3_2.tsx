
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Safe Working Procedures Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Safe Working Procedures
          </h3>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
            <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Before Starting Work:</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Complete risk assessment</li>
              <li>Ensure proper authorization</li>
              <li>Check test equipment calibration</li>
              <li>Verify safe isolation procedures</li>
              <li>Communicate with affected persons</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3 text-xs">
            <p className="font-medium text-elec-yellow">During Work:</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>Use appropriate PPE at all times</li>
              <li>Apply lock-off procedures</li>
              <li>Use insulated tools</li>
              <li>Follow permit-to-work systems</li>
            </ul>
          </div>
        </div>
        
        {/* PPE and Safety Equipment Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            PPE & Safety Equipment
          </h3>
          
          {!isMobile ? (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
                <h4 className="font-semibold text-elec-yellow mb-1">Essential PPE:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Insulated gloves (rated for voltage)</li>
                  <li>Eye protection/face shield</li>
                  <li>Non-conductive safety footwear</li>
                  <li>Flame-resistant clothing</li>
                  <li>Insulating mats</li>
                </ul>
              </div>
              <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
                <h4 className="font-semibold text-elec-yellow mb-1">Safety Equipment:</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Voltage indicators</li>
                  <li>Proving units</li>
                  <li>Locking-off devices</li>
                  <li>Warning signs</li>
                  <li>Barriers/screening</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
                <h4 className="font-semibold text-elec-yellow mb-1">Essential PPE & Equipment:</h4>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Insulated gloves</li>
                  <li>Eye protection</li>
                  <li>Voltage indicators</li>
                  <li>Locking-off devices</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Safe Isolation Procedures Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Safe Isolation Procedures
          </h3>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
            <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Five Steps of Safe Isolation:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs">
              <li><span className="font-medium">Identify</span> the circuit</li>
              <li><span className="font-medium">Isolate</span> and lock off</li>
              <li><span className="font-medium">Prove</span> the voltage tester</li>
              <li><span className="font-medium">Test</span> the circuit is dead</li>
              <li><span className="font-medium">Reprove</span> the tester</li>
            </ol>
          </div>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3 text-xs">
            <p className="font-medium text-elec-yellow">When live work is permitted:</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>It's unreasonable for the circuit to be dead</li>
              <li>Suitable precautions are in place</li>
              <li>Authorized by competent person</li>
            </ul>
          </div>
        </div>
        
        {/* Electrical Hazards Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Common Electrical Hazards
          </h3>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
            <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Hazard Types:</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Direct contact with live parts</li>
              <li>Indirect contact through conductive materials</li>
              <li>Arc flash/blast injuries</li>
              <li>Fire from electrical faults</li>
              <li>Stored electrical energy</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3 text-xs">
            <p className="font-medium text-elec-yellow">Common Issues:</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>Exposed conductors</li>
              <li>Damaged insulation</li>
              <li>Water ingress</li>
              <li>Overloaded circuits</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4">
        <h3 className="text-lg font-bold text-elec-yellow mb-3 flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2" />
          Key Regulations for Working Safely
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-semibold text-white">Electricity at Work Regulations 1989</h4>
            <p className="text-elec-light/80 mt-1">Regulation 14 specifically covers working on or near live conductors, requiring that no person shall work on or near any live conductor unless:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>It is unreasonable for it to be dead</li>
              <li>Suitable precautions are taken</li>
              <li>It is reasonable to work live</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white">BS 7671 Wiring Regulations</h4>
            <p className="text-elec-light/80 mt-1">The IET Wiring Regulations provide specific technical standards for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Protection against electric shock</li>
              <li>Isolation and switching procedures</li>
              <li>Protective measures</li>
              <li>Inspection and testing requirements</li>
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

export default Subsection3_2;
