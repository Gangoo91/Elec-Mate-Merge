
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, AlertOctagon } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { useIsMobile } from "@/hooks/use-mobile";

const Subsection3_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <CourseContentSection
        title="Electrical Safety Fundamentals"
        description="Understanding the dangers of electricity and taking appropriate precautions is essential for all electrical workers."
        keyPoints={[]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Electrical Hazards Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Electrical Hazards
          </h3>
          
          {!isMobile ? (
            <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4">
              <h4 className="font-semibold text-elec-yellow mb-2">Current Effects:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-white">1-5mA</span> - Slight tingling</li>
                <li><span className="font-medium text-white">5-30mA</span> - Painful shock, cannot let go</li>
                <li><span className="font-medium text-white">30-50mA</span> - Respiratory difficulty</li>
                <li><span className="font-medium text-white">50-100mA</span> - Ventricular fibrillation</li>
                <li><span className="font-medium text-white">100+ mA</span> - Severe burns, cardiac arrest</li>
              </ul>
            </div>
          ) : (
            <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
              <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Current Effects:</h4>
              <ul className="list-disc pl-4 space-y-1 text-xs">
                <li>1-5mA: Tingling</li>
                <li>5-30mA: Painful shock</li>
                <li>30-50mA: Breathing issues</li>
                <li>50+ mA: Heart problems</li>
                <li>100+ mA: Fatal</li>
              </ul>
            </div>
          )}
          
          <h4 className="font-semibold text-sm mt-2">Electrical Fire Risks:</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Thermal burns from heated equipment</li>
            <li>Arc flash burns (up to 20,000°C)</li>
            <li>Fires from overheating cables</li>
          </ul>
        </div>
        
        {/* Safe Isolation Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Safe Isolation
          </h3>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
            <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Safe Isolation Steps:</h4>
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
              <li>It's unreasonable for the conductor to be dead</li>
              <li>Suitable precautions are in place</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Legislation Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <AlertOctagon className="h-5 w-5 mr-2" />
            Key Legislation
          </h3>
          
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>
              <span className="font-medium">Health and Safety at Work Act 1974</span>
              <p className="text-xs mt-1">Overarching safety duties</p>
            </li>
            <li>
              <span className="font-medium">Electricity at Work Regulations 1989</span>
              <p className="text-xs mt-1">Specific electrical safety requirements</p>
            </li>
            <li>
              <span className="font-medium">BS 7671 Wiring Regulations</span>
              <p className="text-xs mt-1">Technical standards for installations</p>
            </li>
          </ul>
        </div>
        
        {/* First Aid Card */}
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            First Aid
          </h3>
          
          <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-3">
            <h4 className="font-semibold text-elec-yellow mb-1 text-sm">Emergency Steps:</h4>
            <ol className="list-decimal pl-4 space-y-1 text-xs">
              <li>Ensure your own safety first</li>
              <li>Disconnect power if possible</li>
              <li>Call emergency services (999/112)</li>
              <li>Start CPR if needed</li>
            </ol>
          </div>
          
          <ul className="list-disc pl-4 text-xs space-y-1">
            <li>Even minor shocks need medical attention</li>
            <li>Report all electrical incidents</li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-center pt-4 border-t border-elec-yellow/20">
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

export default Subsection3_1;
