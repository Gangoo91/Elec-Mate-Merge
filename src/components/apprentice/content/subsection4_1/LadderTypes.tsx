
import React from "react";

const LadderTypes = () => {
  return (
    <div className="border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow">Types of Ladders for Electrical Work</h3>
      
      <div className="space-y-4">
        <p>
          For electrical work, selecting the appropriate ladder type is crucial not only for access but also 
          for electrical safety. Different materials and designs offer various advantages and safety features.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Fiberglass Ladders</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><span className="font-medium">Non-conductive</span> - Safe for electrical work</li>
              <li>Resistant to corrosion and chemical damage</li>
              <li>Heavier than aluminum alternatives</li>
              <li>Mandatory near exposed electrical components</li>
              <li>Typically color-coded yellow for electrical work</li>
              <li>Meets BS EN 131-7 insulation standards</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Aluminum Ladders</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><span className="text-red-400 font-medium">Conductive</span> - NOT suitable near live electricity</li>
              <li>Lightweight and easy to transport</li>
              <li>Corrosion resistant</li>
              <li>Can only be used on fully isolated electrical systems</li>
              <li>Typically more affordable than fiberglass</li>
              <li>Common in general construction settings</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
            <h4 className="font-semibold text-elec-yellow mb-2">Wooden Ladders</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Naturally non-conductive when dry</li>
              <li>Rarely used in modern electrical work</li>
              <li>Can become conductive when wet</li>
              <li>Subject to deterioration over time</li>
              <li>Regular inspection critical for integrity</li>
              <li>Limited by BS EN 131 standards</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Ladder Designs for Electrical Applications</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Extension Ladders</span>
                <p className="text-sm mt-1">Used for accessing higher elevations; must be properly secured before climbing. 
                Required overlap sections increase with ladder length.</p>
              </li>
              <li>
                <span className="font-medium">Stepladders</span>
                <p className="text-sm mt-1">Self-supporting; ideal for lighting installations and low-level distribution board work.
                Must be fully opened with spreaders locked.</p>
              </li>
              <li>
                <span className="font-medium">Platform Ladders</span>
                <p className="text-sm mt-1">Include a standing platform; excellent for extended work periods and when using both hands
                for electrical connections. Provide better stability.</p>
              </li>
              <li>
                <span className="font-medium">Combination Ladders</span>
                <p className="text-sm mt-1">Versatile design; can function as stepladder, extension ladder, or stairwell ladder.
                Useful for varying electrical tasks throughout a project.</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Classification Standards</h4>
            <p className="mb-3">
              Ladders for professional electrical work must conform to EN 131 Professional standard or 
              BS 2037 Class 1. These classifications ensure appropriate duty ratings for industrial use.
            </p>
            <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/20">
              <h5 className="font-medium text-elec-yellow mb-2">Load Ratings</h5>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Class 1 (Industrial):</span> Maximum load - 175kg</li>
                <li><span className="font-medium">EN131 Professional:</span> Maximum load - 150kg</li>
                <li><span className="font-medium">EN131 Non-Professional:</span> Maximum load - 120kg</li>
                <li><span className="font-medium">Class 3 (Domestic):</span> NOT suitable for electrical work</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadderTypes;
