
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircleOff, Lightbulb, Plug } from "lucide-react";

interface Subsection7_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection7_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection7_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Lighting Circuits</h2>
      
      <div className="space-y-4">
        <p>
          Lighting circuits form a fundamental part of domestic and commercial electrical installations.
          Understanding their design, installation, and control is essential for electricians.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Lighting Circuit Design
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Circuit Characteristics</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Typical rating: 6A or 10A circuit breaker/fuse</li>
                <li>Standard cable: 1.0mm² or 1.5mm² twin and earth</li>
                <li>Maximum recommended loading: 80% of protective device rating</li>
                <li>Diversity factors apply for multiple luminaires</li>
                <li>Separate circuits for critical areas (stairs, emergency lighting)</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Layout Considerations</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Junction box method for multiple luminaires</li>
                <li>Loop-in method (most common in domestic settings)</li>
                <li>Radial circuit arrangements</li>
                <li>Position of switches and accessible control</li>
                <li>Avoiding placement in thermal insulation</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Regulatory Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Additional protection by 30mA RCD required for most installations</li>
                  <li>Specific requirements for bathrooms and special locations</li>
                  <li>Safety extra-low voltage (SELV) considerations</li>
                  <li>Minimum illumination levels for specific areas</li>
                  <li>Energy efficiency requirements from Building Regulations</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Plug className="h-5 w-5 mr-2" />
              Switching Arrangements
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Switch Types and Applications</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>One-way switches for simple control</li>
                <li>Two-way and intermediate switches for multiple control points</li>
                <li>Retractive (push-button) switches for electronic control</li>
                <li>Dimmer switches for variable light levels</li>
                <li>PIR sensors for automatic operation</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Special Control Systems</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Two-way switching arrangements</li>
                <li>Multi-point switching (3+ locations)</li>
                <li>Master control systems</li>
                <li>Scene setting programmable controls</li>
                <li>Smart lighting systems and app control</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Cable Identification:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Switch drops: typically 3-core and earth cable</li>
                  <li>Strapper wires between switches</li>
                  <li>Loop-in connections at ceiling roses</li>
                  <li>L1/L2 marking for two-way switching</li>
                  <li>Correct identification of switch wires</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <CircleOff className="h-5 w-5 mr-2" />
            Common Lighting Issues and Solutions
          </h3>
          
          <div className="space-y-4">
            <p>Understanding common lighting installation problems helps in efficient troubleshooting:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Installation Problems</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Incorrect switching</span>
                    <p className="text-sm mt-1">Verify switch wiring and connections at luminaires</p>
                  </li>
                  <li>
                    <span className="font-medium">Flashing/flickering</span>
                    <p className="text-sm mt-1">Check for loose connections or incompatible dimming</p>
                  </li>
                  <li>
                    <span className="font-medium">Circuit overloading</span>
                    <p className="text-sm mt-1">Verify total load against circuit rating</p>
                  </li>
                  <li>
                    <span className="font-medium">LED compatibility</span>
                    <p className="text-sm mt-1">Ensure dimmers and controls are compatible with LED technology</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Modern Design Considerations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Energy efficiency</span>
                    <p className="text-sm mt-1">LED lighting offers 80-90% reduction in energy use</p>
                  </li>
                  <li>
                    <span className="font-medium">Smart integration</span>
                    <p className="text-sm mt-1">Voice/app control and automation possibilities</p>
                  </li>
                  <li>
                    <span className="font-medium">Emergency lighting</span>
                    <p className="text-sm mt-1">Requirements for escape routes and safety</p>
                  </li>
                  <li>
                    <span className="font-medium">Lighting design</span>
                    <p className="text-sm mt-1">Task, ambient, and accent lighting principles</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Testing & Inspection Note:</p>
              <p>Lighting circuits must be tested in accordance with BS 7671. Tests include continuity of protective conductors, insulation resistance, polarity, and earth fault loop impedance. Special attention to switching arrangements is essential to ensure correct operation.</p>
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

export default Subsection7_1;
