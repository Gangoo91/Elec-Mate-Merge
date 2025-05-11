
import React from "react";

const AccessEquipmentSelection = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Access Equipment Selection</h3>
      
      <div className="space-y-4">
        <p>
          Selecting the appropriate access equipment for electrical work is crucial for both safety and 
          efficiency. The choice depends on the task duration, height, location, and specific electrical 
          hazards present.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Short Duration Work</h4>
            <p className="text-sm mb-2">Best for tasks under 30 minutes where minimal movement is required</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Step ladders (non-conductive)</li>
              <li>Platform step ladders</li>
              <li>Lightweight mobile scaffold towers</li>
              <li>Podium steps</li>
              <li>Hop-ups and work platforms</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Medium Duration Work</h4>
            <p className="text-sm mb-2">For tasks taking 30 minutes to several hours</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Mobile scaffold towers</li>
              <li>Podium platforms</li>
              <li>Mobile Elevating Work Platforms (MEWPs)</li>
              <li>Fixed scaffolds</li>
              <li>Specialist electrical access platforms</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Long Duration Work</h4>
            <p className="text-sm mb-2">For electrical installations taking days or weeks</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Fixed scaffolding</li>
              <li>Mast climbing work platforms</li>
              <li>Tower scaffolds with multiple levels</li>
              <li>Custom-built work platforms</li>
              <li>Specialist electrical access systems</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 p-5 rounded-lg border border-elec-yellow/20 mt-6">
          <h4 className="font-semibold text-elec-yellow mb-3">Selection Decision Process</h4>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <span className="font-medium">Task Risk Assessment</span>
              <p className="text-sm mt-1">
                Evaluate electrical hazards, working height, task duration, access constraints, and environmental conditions.
              </p>
            </li>
            <li>
              <span className="font-medium">Consider Electrical Hazards</span>
              <p className="text-sm mt-1">
                For work near live systems, non-conductive equipment is essential. Metal scaffolding and MEWPs 
                require additional precautions near overhead lines.
              </p>
            </li>
            <li>
              <span className="font-medium">Evaluate Working Space</span>
              <p className="text-sm mt-1">
                Consider space constraints, floor loading capacity, and surface conditions. Some equipment requires 
                level, stable ground while other types can accommodate uneven surfaces.
              </p>
            </li>
            <li>
              <span className="font-medium">Competence Assessment</span>
              <p className="text-sm mt-1">
                Ensure workers are trained and competent to use the selected equipment. Specialized access equipment 
                like MEWPs requires specific certification.
              </p>
            </li>
            <li>
              <span className="font-medium">Emergency Planning</span>
              <p className="text-sm mt-1">
                Consider how a worker would be rescued in the event of an emergency, particularly for isolated 
                electrical work at height. Rescue plans must be documented.
              </p>
            </li>
          </ol>
        </div>
        
        <div className="mt-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Special Considerations for Electrical Work</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Non-conductive requirements</span> 
              <p className="text-sm mt-1">When working near live electrical equipment, access equipment must be non-conductive 
              to prevent electric shock hazards. Fiberglass ladders and insulated platforms are typically required.</p>
            </li>
            <li>
              <span className="font-medium">Clearance distances</span>
              <p className="text-sm mt-1">Maintain safe clearance distances from live electrical equipment. Access equipment 
              must allow workers to maintain minimum approach distances per voltage level requirements.</p>
            </li>
            <li>
              <span className="font-medium">Tool management</span>
              <p className="text-sm mt-1">Select access equipment with suitable tool trays or attachments to prevent dropped 
              objects when working on electrical installations at height.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessEquipmentSelection;
