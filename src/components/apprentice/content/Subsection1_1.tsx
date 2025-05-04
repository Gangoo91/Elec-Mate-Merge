
import React from "react";
import ElectricalSymbolsDisplay from "../ElectricalSymbolsDisplay";
import InteractiveLightDemo from "../InteractiveLightDemo";

type Subsection1_1Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection1_1 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: Subsection1_1Props) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Understanding Electrical Drawings</h2>
        <p>Electrical drawings serve as the blueprint for installations and include various symbols and notations that represent electrical components. They typically include:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Floor plans with circuit layouts</li>
          <li>Schematic diagrams showing electrical connections</li>
          <li>Detailed specifications for equipment</li>
          <li>Cable routing diagrams and schedules</li>
        </ul>
        <p className="mt-3">Accurate interpretation of these drawings is crucial for successful installations that meet specifications and safety requirements.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-elec-yellow mb-3">Common Electrical Symbols</h2>
        <p>Electrical drawings use standardised symbols to represent different components:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Power Symbols:</p>
            <ul className="list-disc pl-5">
              <li>Socket outlets (single and twin)</li>
              <li>Switched socket outlets</li>
              <li>Fused connection units</li>
              <li>Distribution boards</li>
            </ul>
          </div>
          <div className="border border-elec-yellow/30 p-3 rounded-md">
            <p className="font-semibold mb-2">Lighting Symbols:</p>
            <ul className="list-disc pl-5">
              <li>Light fittings (various types)</li>
              <li>Light switches (1-way, 2-way)</li>
              <li>Dimmer switches</li>
              <li>Emergency lighting</li>
            </ul>
          </div>
        </div>
        
        <ElectricalSymbolsDisplay subsectionId={subsectionId} />
        
        <InteractiveLightDemo 
          subsectionId={subsectionId}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
        />
      </section>
    </>
  );
};

export default Subsection1_1;
