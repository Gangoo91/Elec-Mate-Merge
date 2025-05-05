
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type InteractiveLightDemoProps = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const InteractiveLightDemo = ({ subsectionId }: InteractiveLightDemoProps) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [circuitComplete, setCircuitComplete] = useState(false);
  
  const toggleCircuit = () => {
    setCircuitComplete(!circuitComplete);
  };
  
  const toggleLight = () => {
    if (circuitComplete) {
      setIsLightOn(!isLightOn);
    }
  };
  
  return (
    <div className="mt-8 border border-elec-yellow/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-elec-yellow mb-4">Interactive Light Circuit Demonstration</h3>
      
      <div className="mb-4">
        <p className="mb-3">
          This interactive demonstration shows how a basic lighting circuit works. Complete the circuit to allow 
          the switch to control the light.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center py-4">
        <div className="text-center">
          <div 
            className={`w-20 h-20 rounded-md flex items-center justify-center cursor-pointer
              ${circuitComplete ? 'bg-elec-yellow/20 border-2 border-elec-yellow' : 'bg-elec-dark/70 border-2 border-elec-yellow/30'}`}
            onClick={toggleCircuit}
          >
            <span className="text-sm font-medium">
              {circuitComplete ? 'Circuit Complete' : 'Circuit Open'}
            </span>
          </div>
          <p className="mt-2 text-sm">Click to toggle circuit</p>
        </div>
        
        <div className="h-0.5 w-20 md:w-32 bg-elec-yellow/50"></div>
        
        <div className="text-center">
          <div 
            className={`w-16 h-16 rounded-md flex items-center justify-center cursor-pointer
              ${circuitComplete ? 'bg-elec-yellow/20 border-2 border-elec-yellow hover:bg-elec-yellow/40' : 'bg-elec-dark/70 border-2 border-elec-yellow/30'}`}
            onClick={toggleLight}
          >
            <span className="text-sm font-medium">Switch</span>
          </div>
          <p className="mt-2 text-sm">Click to toggle switch</p>
        </div>
        
        <div className="h-0.5 w-20 md:w-32 bg-elec-yellow/50"></div>
        
        <div className="text-center">
          <div 
            className={`w-24 h-24 rounded-full flex items-center justify-center
              ${isLightOn && circuitComplete ? 'bg-elec-yellow shadow-lg shadow-elec-yellow/50' : 'bg-elec-dark/70 border-2 border-elec-yellow/30'}`}
          >
            <span className="text-sm font-medium">
              {isLightOn && circuitComplete ? 'ON' : 'OFF'}
            </span>
          </div>
          <p className="mt-2 text-sm">Light bulb</p>
        </div>
      </div>
      
      <div className="bg-elec-dark/50 p-4 rounded-md mt-6">
        <h4 className="font-semibold text-white mb-2">How it works:</h4>
        <ol className="list-decimal pl-5 space-y-2">
          <li>The circuit must be complete for electricity to flow</li>
          <li>When the circuit is complete, the switch can control the light</li>
          <li>The switch acts as a break in the circuit, controlling current flow</li>
          <li>This demonstrates a simple lighting circuit as shown in electrical diagrams</li>
        </ol>
      </div>
    </div>
  );
};

export default InteractiveLightDemo;
