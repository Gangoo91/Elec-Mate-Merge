
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, SwitchCamera, CircuitBoard } from "lucide-react";

interface Subsection4_2Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection4_2 = ({ subsectionId, isCompleted, markAsComplete }: Subsection4_2Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Consumer Units and Distribution Boards</h2>
      
      <div className="space-y-4">
        <p>
          Consumer units (also called distribution boards) are central components of electrical installations,
          providing protection, isolation, and distribution for all circuits in a property.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <CircuitBoard className="h-5 w-5 mr-2" />
              Modern Consumer Unit Requirements
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Key Components</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Main switch (double-pole isolation)</li>
                <li>RCDs (Residual Current Devices) for additional protection</li>
                <li>Circuit breakers (MCBs) for individual circuit protection</li>
                <li>RCBOs (combined RCD and MCB protection)</li>
                <li>Neutral and earth terminal bars</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Regulatory Requirements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Must comply with BS EN 61439-3</li>
                <li>Metal enclosures required for fire safety (Amendment 3, BS 7671)</li>
                <li>IP rating appropriate for location (typically minimum IP2X)</li>
                <li>Sufficient capacity for number of circuits</li>
                <li>RCD protection arrangements as required by BS 7671</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Protection Arrangements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Single RCD: all circuits protected by one RCD (not recommended for new installations)</li>
                  <li>Dual RCD: circuits split between two RCDs</li>
                  <li>High Integrity: main switch plus RCBOs for each circuit</li>
                  <li>Mixed: combination of RCDs and RCBOs for specific protection needs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <SwitchCamera className="h-5 w-5 mr-2" />
              Installation and Arrangement
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Positioning Requirements</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Accessible location for operation and maintenance</li>
                <li>Mounting height typically 1350-1500mm from floor to center</li>
                <li>Not in bathrooms or locations with fire risk</li>
                <li>Avoid positions above sinks or cookers</li>
                <li>Secure fixing to solid wall structure</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Circuit Arrangement</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Logical grouping of similar circuits</li>
                <li>Balanced loading across phases in three-phase systems</li>
                <li>Clear identification of all circuits</li>
                <li>Consider discrimination between protective devices</li>
                <li>Allow for future expansion (spare ways)</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Accessibility Considerations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Minimum 100mm clearance each side for access</li>
                  <li>Adequate space for cable entry and termination</li>
                  <li>Avoid mounting directly on combustible surfaces</li>
                  <li>Ensure sufficient cooling air circulation</li>
                  <li>Consider access requirements for disabled users</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Advanced Distribution Systems
          </h3>
          
          <div className="space-y-4">
            <p>Larger installations often require more complex distribution arrangements:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Hierarchical Distribution</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Main distribution boards</span>
                    <p className="text-sm mt-1">Primary distribution point receiving supply from service position</p>
                  </li>
                  <li>
                    <span className="font-medium">Sub-distribution boards</span>
                    <p className="text-sm mt-1">Fed from main distribution to serve specific areas or floors</p>
                  </li>
                  <li>
                    <span className="font-medium">Final distribution boards</span>
                    <p className="text-sm mt-1">Closest to the point of use, serving final circuits</p>
                  </li>
                  <li>
                    <span className="font-medium">Load balancing</span>
                    <p className="text-sm mt-1">Distributing load evenly across phases in three-phase systems</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Advanced Protection Features</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Surge protection devices (SPDs)</span>
                    <p className="text-sm mt-1">Protection against transient overvoltages from lightning or switching</p>
                  </li>
                  <li>
                    <span className="font-medium">Selective coordination</span>
                    <p className="text-sm mt-1">Ensuring only the device closest to a fault operates</p>
                  </li>
                  <li>
                    <span className="font-medium">Power monitoring systems</span>
                    <p className="text-sm mt-1">Tracking energy usage and system health</p>
                  </li>
                  <li>
                    <span className="font-medium">Remote operation</span>
                    <p className="text-sm mt-1">Motorized switches for remote control or automation</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 requires clear and accurate circuit identification (Regulation 514.9). Amendment 2 introduced mandatory requirements for RCD protection of socket outlet circuits, lighting circuits, and cables concealed in walls or partitions at depths less than 50mm.</p>
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

export default Subsection4_2;
