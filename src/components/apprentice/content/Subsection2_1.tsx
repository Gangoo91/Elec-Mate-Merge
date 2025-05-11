
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield } from "lucide-react";
import CourseContentSection from "@/components/apprentice/CourseContentSection";

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <CourseContentSection 
        title="Accident and Emergency Procedures"
        description="Understanding the correct procedures to follow in the event of an accident or emergency is essential for electrical workers."
        icon="shield-alert"
      />

      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Key Emergency Procedures</h2>
        
        <div className="space-y-6">
          {/* Electric Shock Response */}
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-lg font-medium mb-2">Electric Shock Response</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Do not touch the casualty if they are still in contact with the electrical source</li>
              <li>• Switch off the power supply if possible</li>
              <li>• If power cannot be switched off, use insulated material to separate casualty from source</li>
              <li>• Check breathing and pulse once safe to do so</li>
              <li>• Begin CPR if necessary and call for emergency services immediately</li>
              <li>• All electric shock incidents require medical evaluation, even if the casualty appears fine</li>
            </ul>
          </div>
          
          {/* Fire Procedures */}
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-lg font-medium mb-2">Fire Procedures</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Raise the alarm immediately by activating the nearest fire alarm</li>
              <li>• For electrical fires, use appropriate fire extinguishers (CO₂ or dry powder)</li>
              <li>• Never use water on electrical fires</li>
              <li>• Follow workplace evacuation procedures</li>
              <li>• Account for all personnel at the designated assembly point</li>
              <li>• Do not re-enter the building until authorized to do so</li>
            </ul>
          </div>
          
          {/* First Aid Requirements */}
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-lg font-medium mb-2">First Aid Requirements</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Know the location of first aid kits and equipment</li>
              <li>• Identify trained first aiders within your workplace</li>
              <li>• Document all incidents in the accident book</li>
              <li>• Report incidents to supervisors immediately</li>
              <li>• For serious injuries, call emergency services (999/112)</li>
              <li>• Maintain clear access to first aid equipment at all times</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Emergency Response Plan */}
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Emergency Response Plan</h2>
        <p className="text-muted-foreground mb-4">
          Every workplace should have a clear emergency response plan that all workers are familiar with. 
          This plan should include:
        </p>
        
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <span>Emergency contact numbers prominently displayed</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <span>Evacuation routes and assembly points clearly marked</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <span>Procedures for different types of emergencies (fire, electric shock, chemical spill)</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <span>Regular drills and training to ensure preparedness</span>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <span>Emergency equipment locations and maintenance schedules</span>
          </li>
        </ul>
      </div>
      
      {/* Completion button */}
      <div className="pt-6 border-t border-elec-yellow/20 flex justify-end">
        {!isCompleted ? (
          <Button 
            onClick={markAsComplete}
            className="hover:bg-elec-yellow hover:text-elec-dark"
          >
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subsection2_1;
