
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowBigUp, AlertTriangle, HardHat } from "lucide-react";

interface Subsection4_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection4_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection4_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Ladder Safety</h2>
      
      <div className="space-y-4">
        <p>
          Ladders are among the most commonly used items of access equipment in electrical work.
          Proper selection, inspection, and use of ladders is essential to prevent falls and accidents.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <HardHat className="h-5 w-5 mr-2" />
              Ladder Selection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Types of Ladders</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Step ladders - for short duration tasks</li>
                <li>Extension ladders - for access to higher levels</li>
                <li>Combination ladders - versatile multi-purpose ladders</li>
                <li>Platform ladders - provide stable working platform</li>
                <li>Fibreglass/non-conductive ladders - for electrical work</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Selection Criteria</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Non-conductive materials for electrical work</li>
                <li>Appropriate height (top 3 rungs not to be used)</li>
                <li>Load rating sufficient for user and equipment</li>
                <li>Suitable for environment (indoor/outdoor)</li>
                <li>Stability features like wide bases or stabilizers</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Pre-Use Inspection
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Inspection Checklist</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Stiles (side rails) - free from cracks or damage</li>
                <li>Rungs - secure and undamaged</li>
                <li>Feet - present, secure, and in good condition</li>
                <li>Locking mechanisms - working properly</li>
                <li>Labels - legible with load ratings and instructions</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Common Defects</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cracks or splits in stiles or rungs</li>
                <li>Missing or damaged feet</li>
                <li>Loose or missing rungs</li>
                <li>Excessive wear or corrosion</li>
                <li>Paint covering (can hide defects)</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Important:</h4>
                <p className="text-sm">Never use a defective ladder. Tag it as defective, remove from service, and report to supervisor immediately.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ArrowBigUp className="h-5 w-5 mr-2" />
            Safe Use Practices
          </h3>
          
          <div className="space-y-4">
            <p>Following these guidelines will help ensure safe use of ladders:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Setting Up</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Angle of 75° (1:4 ratio)</span>
                    <p className="text-sm mt-1">For leaning ladders, position one unit out for every four units up</p>
                  </li>
                  <li>
                    <span className="font-medium">Level ground</span>
                    <p className="text-sm mt-1">Never use bricks or other items to level ladders</p>
                  </li>
                  <li>
                    <span className="font-medium">Secure the ladder</span>
                    <p className="text-sm mt-1">Tie at top, bottom, or both when possible</p>
                  </li>
                  <li>
                    <span className="font-medium">Extend above landing point</span>
                    <p className="text-sm mt-1">At least 1m (3 rungs) above landing point</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">While Using</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Maintain three points of contact</span>
                    <p className="text-sm mt-1">Both feet and one hand or both hands and one foot</p>
                  </li>
                  <li>
                    <span className="font-medium">Face the ladder</span>
                    <p className="text-sm mt-1">Never work with your back to the ladder</p>
                  </li>
                  <li>
                    <span className="font-medium">Don't overreach</span>
                    <p className="text-sm mt-1">Keep your belt buckle between the stiles</p>
                  </li>
                  <li>
                    <span className="font-medium">Don't exceed maximum load</span>
                    <p className="text-sm mt-1">Consider combined weight of person, tools, and materials</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>The Work at Height Regulations 2005 require that work at height is properly planned, supervised, and carried out by competent people. Ladders should only be used for short duration work (maximum 30 minutes in one position) and where a risk assessment demonstrates that a more suitable work platform cannot be used.</p>
            </div>
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

export default Subsection4_1;
