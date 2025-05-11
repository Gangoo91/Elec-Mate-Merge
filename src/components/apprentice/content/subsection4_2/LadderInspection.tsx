
import React from "react";
import { AlertTriangle } from "lucide-react";

const LadderInspection = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Ladder Inspection & Safe Use</h3>
      
      <div className="space-y-4">
        <div className="bg-elec-dark/50 border-l-4 border-red-500 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h4 className="font-semibold text-elec-yellow">Pre-use Inspection Requirements</h4>
          </div>
          <p className="text-sm">
            Before using any ladder for electrical work, a thorough visual inspection must be performed. 
            Damaged or defective ladders must be removed from service immediately and tagged with 
            "DO NOT USE" signage until repaired or replaced by a competent person.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Visual Inspection Checklist</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check stiles (side rails) for cracks, splits, or dents</li>
              <li>Ensure rungs are secure and free from damage</li>
              <li>Inspect feet for wear, missing components, or damage</li>
              <li>Check locking mechanisms function correctly</li>
              <li>Look for excessive wear, distortion or corrosion</li>
              <li>Ensure labels are legible (duty rating, standards)</li>
              <li>Verify no paint covering (could hide defects)</li>
              <li>For fiberglass, check for UV deterioration or fiber exposure</li>
              <li>Test stability on level ground</li>
              <li>Check ropes and pulleys on extension ladders</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Safe Use Practices</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Position at correct angle (1:4 or 75° ratio)</li>
              <li>Secure ladder at top or bottom to prevent movement</li>
              <li>Extend ladder at least 1m above landing point</li>
              <li>Maintain 3 points of contact while climbing</li>
              <li>Never work from top three rungs</li>
              <li>Avoid side-loading - keep body centered</li>
              <li>Never use aluminum ladders near electrical equipment</li>
              <li>Protect ladder feet from slipping</li>
              <li>Use harness if working at significant height</li>
              <li>Maintain clean rungs - free from oil, grease</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Formal Inspection Requirements</h4>
          <p className="mb-3">
            In addition to pre-use checks, ladders used for electrical work require formal documented 
            inspections at regular intervals:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Weekly visual inspections</span> 
              <p className="text-sm mt-1">Required when ladder is in frequent use or in harsh environments</p>
            </li>
            <li>
              <span className="font-medium">Detailed inspection every 3-6 months</span>
              <p className="text-sm mt-1">Must be conducted by a competent person and results recorded</p>
            </li>
            <li>
              <span className="font-medium">Tagging system</span>
              <p className="text-sm mt-1">Color-coded or dated tags to indicate inspection status</p>
            </li>
            <li>
              <span className="font-medium">Records retention</span>
              <p className="text-sm mt-1">Inspection records must be kept available for regulatory review</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LadderInspection;
