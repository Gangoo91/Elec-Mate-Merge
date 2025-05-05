
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Lightbulb, Scale } from "lucide-react";

type Subsection2_1Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_1Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Reading Electrical Drawings and Diagrams</h2>
        
        <p className="text-base">
          Electrical drawings and diagrams are essential communication tools that use standardized symbols to represent 
          components and connections. Understanding these visual representations is fundamental to proper installation work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileText className="h-5 w-5 mr-2" />
              Types of Electrical Drawings
            </h3>
            <ul className="space-y-3">
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Schematic Diagrams</span>
                <p className="text-sm text-gray-300 mt-1">Show the operation principles of circuits using symbolic representation rather than physical layout. Used to understand how a circuit functions.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Wiring Diagrams</span>
                <p className="text-sm text-gray-300 mt-1">Show the actual wire connections and physical relationships between components. Used for installation and troubleshooting.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Layout Drawings</span>
                <p className="text-sm text-gray-300 mt-1">Show the physical placement of components within a building or space. Often drawn to scale and include dimensions.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Block Diagrams</span>
                <p className="text-sm text-gray-300 mt-1">Simplified representations showing major system components and their relationships without detailed connections.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <Scale className="h-5 w-5 mr-2" />
              Scale and Conventions
            </h3>
            <ul className="space-y-3">
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Drawing Scales</span>
                <p className="text-sm text-gray-300 mt-1">Layouts typically use standard scales (1:50, 1:100). Understanding scale is critical for accurate installations and measurements.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Line Types</span>
                <p className="text-sm text-gray-300 mt-1">Different line styles represent different circuit types (power, lighting, communication) or physical elements (existing vs. new work).</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Drawing Conventions</span>
                <p className="text-sm text-gray-300 mt-1">Vary between domestic, commercial, and industrial installations. Each sector has specific conventional practices for representing systems.</p>
              </li>
              <li className="border-l-2 border-elec-yellow/30 pl-3">
                <span className="font-medium block">Title Blocks</span>
                <p className="text-sm text-gray-300 mt-1">Contain critical information including project details, drawing number, revision history, and approval signatures.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5 mt-6">
          <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
            <Lightbulb className="h-5 w-5 mr-2" />
            Reading and Interpreting Skills
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Key Skills for Electricians:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Identifying different types of drawings and their purpose</li>
                <li>Understanding symbolic representation of components</li>
                <li>Interpreting cable types and connection requirements</li>
                <li>Recognizing circuit protection and control elements</li>
                <li>Reading dimensions and scales accurately</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Common Challenges:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Reconciling discrepancies between drawings and site conditions</li>
                <li>Understanding cross-references between multiple drawings</li>
                <li>Interpreting drawing revisions and updates</li>
                <li>Reading legacy drawings with outdated conventions</li>
                <li>Coordinating electrical work with other services</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
            <p className="font-medium mb-1 text-elec-yellow">Professional Tip:</p>
            <p>Always cross-reference between different drawing types to build a complete understanding of the installation requirements. Check schematic diagrams for circuit operation, wiring diagrams for connection details, and layout drawings for physical placement and routing.</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-6 border-t border-elec-yellow/20 mt-6">
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
    </>
  );
};

export default Subsection2_1;
