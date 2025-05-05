
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Ruler } from "lucide-react";

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Understanding Electrical Drawings and Diagrams</h2>
      
      <div className="space-y-5">
        <p>
          Electrical drawings and diagrams are the foundation of any successful installation. They provide critical information 
          about circuit layouts, component locations, and connection details required for accurate and safe electrical installations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Ruler className="h-5 w-5 mr-2" />
              Electrical Symbols and Notations
            </h3>
            
            <div className="space-y-4">
              <p>
                BS EN 60617 standardises electrical symbols used in drawings. Recognising these symbols is essential for 
                interpreting electrical plans correctly. Common symbols include:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-elec-yellow/20 rounded p-3 text-sm">
                  <div className="font-semibold text-elec-yellow mb-1">Power</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Socket outlet (single/twin)</li>
                    <li>Fused connection unit</li>
                    <li>Consumer unit/distribution board</li>
                    <li>Isolator switch</li>
                  </ul>
                </div>
                
                <div className="border border-elec-yellow/20 rounded p-3 text-sm">
                  <div className="font-semibold text-elec-yellow mb-1">Lighting</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Ceiling rose/pendant</li>
                    <li>Wall light</li>
                    <li>Spotlights/downlights</li>
                    <li>Emergency lighting</li>
                  </ul>
                </div>
                
                <div className="border border-elec-yellow/20 rounded p-3 text-sm">
                  <div className="font-semibold text-elec-yellow mb-1">Control</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>One-way switch</li>
                    <li>Two-way switch</li>
                    <li>Intermediate switch</li>
                    <li>Dimmer switch</li>
                  </ul>
                </div>
                
                <div className="border border-elec-yellow/20 rounded p-3 text-sm">
                  <div className="font-semibold text-elec-yellow mb-1">Protection</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Circuit breaker</li>
                    <li>RCD (Residual Current Device)</li>
                    <li>RCBO</li>
                    <li>Fuse</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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

export default Subsection1_1;
