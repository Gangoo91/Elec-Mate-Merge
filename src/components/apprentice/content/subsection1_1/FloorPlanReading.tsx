
import React from "react";

const FloorPlanReading = () => {
  return (
    <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
      <h3 className="text-xl font-bold text-elec-yellow mb-4">Reading Electrical Floor Plans</h3>
      
      <div className="space-y-4">
        <p>
          Floor plans show the layout of electrical components within a building, including power outlets, 
          lighting fixtures, switches, and their associated circuits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Key Elements to Identify</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Circuit Numbering</span>
                <p className="text-sm mt-1">Each circuit is typically identified by a number or code that corresponds to the consumer unit schedule.</p>
              </li>
              <li>
                <span className="font-medium">Cable Routing</span>
                <p className="text-sm mt-1">Indicated by lines showing where cables run, often with annotations for cable type and size.</p>
              </li>
              <li>
                <span className="font-medium">Special Requirements</span>
                <p className="text-sm mt-1">Notes about IP ratings, mounting heights, or special installation methods.</p>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Scale and Dimensions</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Standard Scales</span>
                <p className="text-sm mt-1">Commonly 1:50 or 1:100 for residential plans, 1:200 for larger buildings.</p>
              </li>
              <li>
                <span className="font-medium">Measurement Methods</span>
                <p className="text-sm mt-1">Use a scale rule to accurately determine distances and positions.</p>
              </li>
              <li>
                <span className="font-medium">Positioning Requirements</span>
                <p className="text-sm mt-1">Standard heights (e.g., switches at 1200mm, sockets at 450mm from finished floor level).</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/20 p-4 rounded-md mt-5">
          <h5 className="font-semibold text-elec-yellow mb-2">Practical Tips for Drawing Interpretation</h5>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Always check the drawing revision number to ensure you're working from the most recent version.</li>
            <li>Familiarise yourself with the legend/key before attempting to interpret the drawing.</li>
            <li>Cross-reference electrical drawings with architectural drawings to identify potential clashes.</li>
            <li>Mark your working copy as you install each component to track progress.</li>
            <li>Keep a record of any deviations from the drawing required during installation.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanReading;
