
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Shield, Scale } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection4_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Ladder Safety</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          Ladder safety is critical in electrical work where falls from height represent a significant hazard.
          Understanding proper ladder selection, inspection, and use can prevent serious injuries and fatalities.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Ladder Selection
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Types of Ladders for Electrical Work</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li><span className="font-medium text-white">Fiberglass ladders</span> - Non-conductive and preferred for electrical work</li>
                <li><span className="font-medium text-white">Wooden ladders</span> - Non-conductive but susceptible to moisture and damage</li>
                <li><span className="font-medium text-white">Aluminium ladders</span> - Conductive and should NEVER be used for electrical work</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Selecting the Right Ladder</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li><span className="font-medium text-white">Duty rating</span> - Must be appropriate for the user's weight plus tools/equipment</li>
                <li><span className="font-medium text-white">Height</span> - Correct height for the task (step ladders vs extension ladders)</li>
                <li><span className="font-medium text-white">Standards compliance</span> - Meets BS EN 131 or equivalent standards</li>
                <li><span className="font-medium text-white">Additional features</span> - Consider stabilisers, platform tops, or extension systems</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-900/20 border-l-4 border-amber-500 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-amber-400 flex items-center mb-4">
            <AlertTriangle className="mr-2 h-5 w-5" /> Ladder Inspection
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Always inspect ladders before use. Look for:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white">Structural Issues</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Cracks, splits or dents</li>
                <li>Bent or warped rails</li>
                <li>Loose, damaged or missing rungs</li>
                <li>Wobbly or unstable structure</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Hardware Problems</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Loose or missing bolts and rivets</li>
                <li>Damaged locks or hinges</li>
                <li>Worn or damaged feet</li>
                <li>Defective ropes or pulleys</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold text-white">Surface Conditions</h4>
            <ul className="list-disc pl-6 text-elec-light/80 mt-1">
              <li>Oil, grease or other slippery substances</li>
              <li>Wet or damp surfaces</li>
              <li>Paint or coating that might hide defects</li>
              <li>Corrosion or rust on metal parts</li>
            </ul>
          </div>
          
          <div className="bg-amber-900/30 rounded-lg p-4 mt-4">
            <p className="text-amber-400 font-semibold">IMPORTANT:</p>
            <p className="text-elec-light/80 mt-1">
              If any defects are found, tag the ladder as "DO NOT USE" and report it immediately.
              Never attempt to repair a ladder yourself unless qualified to do so.
            </p>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <Scale className="mr-2 h-5 w-5" /> Safe Ladder Use
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Positioning and Setup</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Place on firm, level ground</li>
                <li>Set extension ladders at the correct 4:1 ratio angle (75° or 1 unit out for every 4 units up)</li>
                <li>Extend at least 1 metre or 3 rungs above landing point</li>
                <li>Secure the ladder at top and bottom where possible</li>
                <li>Keep ladder clear of electrical overhead lines (minimum 6 metres)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Climbing and Working</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Maintain three points of contact at all times</li>
                <li>Face the ladder when climbing and descending</li>
                <li>Never stand on the top three rungs of an extension ladder</li>
                <li>Never stand on the top or the top step of a stepladder</li>
                <li>Keep your belt buckle (navel) between the side rails</li>
                <li>Never overreach - move the ladder instead</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Weight and Load Considerations</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Do not exceed the maximum load rating</li>
                <li>Consider tools and materials when calculating load</li>
                <li>Do not use ladders in strong winds (above 30 mph)</li>
                <li>Only one person on a ladder at a time</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Risk Assessment</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-2">
                <li>Consider if a ladder is the right equipment for the job</li>
                <li>For work lasting more than 30 minutes, consider alternative access equipment</li>
                <li>Assess electrical risks if working near electrical installations</li>
                <li>Consider weather conditions for outdoor work</li>
                <li>Evaluate the need for additional safety measures</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">
            Legal Requirements
          </h3>
          
          <p className="text-elec-light/80 mb-4">
            Working at height in the UK is governed by the Work at Height Regulations 2005:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-elec-light/80">
            <li>Work at height should be properly planned and supervised</li>
            <li>Equipment must be inspected and maintained regularly</li>
            <li>Those involved must be competent or under supervision</li>
            <li>Risks from fragile surfaces must be properly controlled</li>
            <li>Equipment for work at height must be properly inspected and maintained</li>
          </ul>
          
          <p className="mt-4 text-elec-light/80">
            Remember: Ladders should only be used for low-risk, short-duration tasks (30 minutes maximum).
            For longer or more complex tasks, consider mobile elevated work platforms, scaffolding, or tower scaffolds.
          </p>
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

export default Subsection4_1;
