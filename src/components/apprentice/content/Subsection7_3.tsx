
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Building, Plug } from "lucide-react";

interface Subsection7_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection7_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection7_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Special Installations</h2>
      
      <div className="space-y-4">
        <p>
          Certain locations and installations require special considerations due to increased risks or specific requirements.
          Understanding these requirements is essential for compliant and safe electrical work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Bathrooms and Shower Rooms
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Zone Classifications</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Zone 0: Interior of bath or shower basin</li>
                <li>Zone 1: Area directly above bath/shower up to 2.25m</li>
                <li>Zone 2: Area extending 0.6m beyond Zone 1, height 2.25m</li>
                <li>Outside zones: Remainder of bathroom</li>
                <li>Different electrical equipment permitted in each zone</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Protection Requirements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>All circuits require 30mA RCD protection</li>
                <li>IPX7 equipment in Zone 0</li>
                <li>IPX4 equipment in Zone 1 (IPX5 for water jets)</li>
                <li>IPX4 equipment in Zone 2</li>
                <li>Equipotential bonding of all extraneous-conductive-parts</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Equipment Restrictions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Zone 0: SELV 12V AC or 30V DC equipment only</li>
                  <li>Zone 1: Electric showers, SELV equipment, or specially protected appliances</li>
                  <li>Zone 2: Shaver units, SELV equipment, and specific luminaires</li>
                  <li>Outside zones: Standard equipment with RCD protection</li>
                  <li>No socket outlets allowed in Zones 0, 1, or 2 (except shaver units)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Other Special Locations
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Swimming Pools</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Extended zone classifications (0, 1, 2)</li>
                <li>SELV (max 12V AC) in Zone 0</li>
                <li>IPX8 rating for Zone 0 equipment</li>
                <li>Enhanced supplementary bonding</li>
                <li>Specific spacing requirements from pool edge</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Agricultural Locations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Additional protection against fire (AFDDs recommended)</li>
                <li>Increased IP ratings for dust/water protection</li>
                <li>Animal-resistant enclosures and cable protection</li>
                <li>Enhanced equipotential bonding</li>
                <li>Special considerations for livestock areas</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Temporary Installations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Construction sites: reduced LV system (110V center-tapped)</li>
                  <li>Exhibitions: enhanced mechanical protection for cables</li>
                  <li>BS 7909 requirements for temporary events</li>
                  <li>Frequent inspection requirements</li>
                  <li>Enhanced RCD protection (30mA, time-delayed types)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <Plug className="h-5 w-5 mr-2" />
            Embedded Electrical Systems
          </h3>
          
          <div className="space-y-4">
            <p>Modern buildings often include embedded or concealed electrical systems with special requirements:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Floor and Ceiling Heating</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Underfloor heating systems</span>
                    <p className="text-sm mt-1">RCD protection required, specific cable routing</p>
                  </li>
                  <li>
                    <span className="font-medium">Embedded heating elements</span>
                    <p className="text-sm mt-1">Earth screen requirements, control system limitations</p>
                  </li>
                  <li>
                    <span className="font-medium">Temperature limitations</span>
                    <p className="text-sm mt-1">Controls to prevent overheating of cables/surroundings</p>
                  </li>
                  <li>
                    <span className="font-medium">Testing requirements</span>
                    <p className="text-sm mt-1">Special testing procedures before and after installation</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Concealed Cables</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Cables in walls</span>
                    <p className="text-sm mt-1">RCD protection or mechanical protection requirements</p>
                  </li>
                  <li>
                    <span className="font-medium">Embedded conduit systems</span>
                    <p className="text-sm mt-1">Depth requirements and routing considerations</p>
                  </li>
                  <li>
                    <span className="font-medium">Cable routes</span>
                    <p className="text-sm mt-1">Documentation and "safe zones" for installation</p>
                  </li>
                  <li>
                    <span className="font-medium">Detection systems</span>
                    <p className="text-sm mt-1">Use of cable detectors before drilling or cutting</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 Section 701 covers requirements for bathrooms, Section 702 for swimming pools, and Section 705 for agricultural locations. Regulation 522.6 details the requirements for cables embedded in walls. All special installations require enhanced documentation including clear marking of concealed cables or equipment locations.</p>
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

export default Subsection7_3;
