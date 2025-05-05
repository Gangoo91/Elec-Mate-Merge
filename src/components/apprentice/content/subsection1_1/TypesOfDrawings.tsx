
import React from "react";
import { FileText } from "lucide-react";

const TypesOfDrawings = () => {
  return (
    <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-elec-yellow flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Types of Electrical Drawings
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-white mb-2">Block Diagrams</h4>
          <p>
            Simple representations that show the relationship between major components of a system using blocks 
            connected by lines. They provide an overview without detailed connections.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-2">Schematic Diagrams</h4>
          <p>
            Show the electrical connections and functions of a specific circuit using standardised symbols. 
            These diagrams focus on the electrical operation rather than physical layout.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-2">Wiring Diagrams</h4>
          <p>
            Detailed representations showing the actual wire connections between components. 
            These are often used for installation guidance and troubleshooting.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-2">Layout Drawings</h4>
          <p>
            Show the physical arrangement and location of electrical equipment within a building or space. 
            These include socket positions, lighting points, and distribution boards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypesOfDrawings;
