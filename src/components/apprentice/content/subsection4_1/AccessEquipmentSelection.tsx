
import React from "react";

const AccessEquipmentSelection = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Access Equipment Selection</h3>
      
      <div className="space-y-4">
        <p>
          Selecting appropriate access equipment is critical for electrical workers. 
          The task, environment, duration, and risk level all influence the choice of equipment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Ladders and Stepladders</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Only suitable for short-duration work (less than 30 minutes)</li>
              <li>Must be secured to prevent movement</li>
              <li>Class 1 (Industrial) or EN131 (Professional) ratings required</li>
              <li>Maintain three points of contact at all times</li>
              <li>Avoid carrying tools while climbing (use tool belts)</li>
              <li>Position at 75° angle (1:4 ratio)</li>
              <li>Inspect before each use for defects</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Mobile Elevated Work Platforms (MEWPs)</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Suitable for extended work at height in electrical installations</li>
              <li>Requires specific IPAF operator training</li>
              <li>Must assess ground conditions before use</li>
              <li>Always use fall restraint harness when operating boom-type MEWPs</li>
              <li>Consider proximity to overhead power lines</li>
              <li>Establish exclusion zones around working area</li>
              <li>Daily pre-use checks mandatory</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Mobile Scaffold Towers</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>PASMA certified training required for assembly</li>
              <li>3T (Through, Throw, Together) or AGR (Advanced Guardrail) assembly methods</li>
              <li>Check Working Height to Base Width ratio (3:1 indoor, 2.5:1 outdoor)</li>
              <li>Never climb external frames unless designed for access</li>
              <li>Must be on level ground with stabilizers deployed</li>
              <li>Move only with no persons or materials on tower</li>
              <li>Regular inspections required (pre-use, weekly, after alteration)</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Podium Steps/Low-Level Work Platforms</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ideal for electrical work at low/medium height (up to 3m)</li>
              <li>Must have guardrails on all working platforms</li>
              <li>Ensure brakes are applied before ascending</li>
              <li>Never overreach – always reposition platform</li>
              <li>Check maximum safe working load</li>
              <li>Ensure platform is fully locked before use</li>
              <li>Guard against electrical risks when using near live equipment</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Selection Factors for Electrical Work</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Presence of electrical hazards (live/isolated equipment)</li>
            <li>Need for electrical insulation on access equipment</li>
            <li>Space constraints in electrical switch rooms/plant areas</li>
            <li>Duration and complexity of electrical task</li>
            <li>Need to carry tools, materials, or electrical components</li>
            <li>Distance from electrical supply that may create trip hazards</li>
            <li>Surface conditions and stability for equipment placement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccessEquipmentSelection;
