
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, ClipboardList, FileCheck } from "lucide-react";

type Subsection2_3Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_3Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Installation Specifications and Documentation</h2>
        
        <p className="text-base">
          Comprehensive documentation is crucial for electrical installations. These documents ensure the installation 
          meets client requirements, regulatory standards, and provides reference for future maintenance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileText className="h-5 w-5 mr-2" />
              Specification Documents
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Installation specifications provide detailed information about required materials, methods, and standards:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Material Specifications:</span> Detail required components, including brands, models, and quality standards</li>
                <li><span className="font-medium">Performance Requirements:</span> Define expected outcomes and operational parameters</li>
                <li><span className="font-medium">Method Statements:</span> Outline how work should be performed and sequence of operations</li>
                <li><span className="font-medium">Compliance References:</span> Cite applicable regulations, codes, and standards to be followed</li>
                <li><span className="font-medium">Testing Requirements:</span> Specify verification procedures and acceptance criteria</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Specifications establish the quality standards and compliance requirements that must be met by the installation. They form a contractual document between client and contractor.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ClipboardList className="h-5 w-5 mr-2" />
              Schedules and Lists
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Schedules provide organized information about system components and parameters:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Cable Schedules:</span> List cable types, sizes, routes, and termination details</li>
                <li><span className="font-medium">Distribution Board Schedules:</span> Document circuit allocations, protection devices, and ratings</li>
                <li><span className="font-medium">Lighting Schedules:</span> Detail fixture types, locations, controls, and lamp specifications</li>
                <li><span className="font-medium">Equipment Lists:</span> Catalog all electrical equipment with ratings and specifications</li>
                <li><span className="font-medium">Circuit Charts:</span> Provide reference for circuit identification and allocation</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Schedules transform complex information into accessible formats for installation and maintenance. They are essential reference tools during commissioning and testing.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileCheck className="h-5 w-5 mr-2" />
              Certification and Test Records
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Documentation that provides evidence of safety verification and compliance:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Electrical Installation Certificate (EIC):</span> Confirms the installation meets BS 7671 requirements</li>
                <li><span className="font-medium">Minor Works Certificate:</span> Used for smaller additions or alterations to an existing installation</li>
                <li><span className="font-medium">Periodic Inspection Report:</span> Documents condition of existing installations</li>
                <li><span className="font-medium">Test Results:</span> Record measurements from verification testing procedures</li>
                <li><span className="font-medium">Commissioning Records:</span> Document system performance during initial operation</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  These documents provide legal evidence that an installation is safe to use and complies with regulations. They must be completed accurately and retained for future reference.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <FileText className="h-5 w-5 mr-2" />
              Operation and Maintenance Documentation
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Information for end users and maintenance personnel:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">As-Built Drawings:</span> Show the actual installation details, reflecting any changes from design</li>
                <li><span className="font-medium">Operation Manuals:</span> Provide instructions for system use and operation</li>
                <li><span className="font-medium">Maintenance Schedules:</span> Outline required maintenance tasks and frequencies</li>
                <li><span className="font-medium">Component Data Sheets:</span> Technical information on installed equipment</li>
                <li><span className="font-medium">Warranty Information:</span> Details of guarantees and service agreements</li>
              </ul>
              
              <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg">
                <p className="font-medium mb-1 text-elec-yellow">Professional Tip:</p>
                <p className="text-sm">Create a comprehensive handover pack for clients that includes all essential documentation. This shows professionalism and ensures the client has all information needed for future maintenance and modifications.</p>
              </div>
            </div>
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

export default Subsection2_3;
