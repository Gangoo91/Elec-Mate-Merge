
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import CourseContentSection from '@/components/apprentice/CourseContentSection';

const Subsection7_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Main header with background */}
      <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-5">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Preparation and Planning</h2>
        <p className="mt-2 text-elec-light/80">
          Ensuring all tools and equipment are in good condition, selecting appropriate Personal Protective Equipment (PPE), and understanding the task requirements
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Introduction to Practical Preparation"
        description="Thorough preparation and planning are fundamental to safe electrical work. This section provides guidance on the practical steps required before beginning any electrical installation or maintenance task."
        keyPoints={[
          "Tool and equipment inspection and maintenance",
          "Appropriate PPE selection for electrical tasks",
          "Task planning and preparation procedures",
          "Pre-work safety checks and documentation"
        ]}
        icon="tools"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Tool and Equipment Inspection</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Before beginning any electrical work, thorough inspection of tools and equipment is essential:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse my-4">
                <thead>
                  <tr className="bg-elec-yellow/20 text-left">
                    <th className="p-3 border border-elec-yellow/30">Inspection Element</th>
                    <th className="p-3 border border-elec-yellow/30">Key Checks</th>
                    <th className="p-3 border border-elec-yellow/30">Action if Defective</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Insulation</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>No cracks or damage</li>
                        <li>No exposed conductors</li>
                        <li>Colour-coding intact</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Remove from service, label as defective, arrange for repair or replacement
                    </td>
                  </tr>
                  <tr className="bg-elec-gray">
                    <td className="p-3 border border-elec-yellow/30">Electrical continuity</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Proper connections</li>
                        <li>No loose components</li>
                        <li>Test functionality</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Tag as "Do Not Use", record in inspection log, report to supervisor
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Physical condition</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>No structural damage</li>
                        <li>Handles firmly attached</li>
                        <li>Guards in place</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Assess if repair is possible, otherwise dispose of properly and replace
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">PPE Selection and Inspection</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Select appropriate PPE based on the specific electrical task:</p>
            <ul className="list-disc pl-5 space-y-3 text-elec-light/80">
              <li className="pl-2">
                <span className="font-medium text-white">Class 0 gloves</span> - For basic insulation from electrical shock up to 1,000V AC (verify voltage rating before use)
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Safety eyewear</span> - Always required when working with live circuits or where there's risk of arc flash
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Arc flash protection</span> - Required for higher current installations or where fault current could cause arc flash
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Insulating mats</span> - Place under work area when working on live or potentially live equipment
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Safety footwear</span> - Electrical hazard rated boots with insulated soles and toe protection
              </li>
            </ul>
            
            <div className="bg-elec-gray/30 p-3 rounded mt-4">
              <p className="text-sm text-elec-light/90">
                <strong>Inspection tip:</strong> Before each use, inspect PPE for tears, punctures, contamination by conductive materials, and signs of deterioration or ageing. Never use damaged PPE.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Task Planning Procedures</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Follow this structured approach to planning electrical installation or maintenance work:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-white">Pre-Work Planning Checklist:</h4>
              <ol className="list-decimal pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>Review circuit diagrams and installation specifications</li>
                <li>Identify required tools, materials and equipment</li>
                <li>Confirm availability of appropriate test instruments</li>
                <li>Establish safe isolation procedures</li>
                <li>Schedule work to minimise disruption</li>
                <li>Identify and communicate with affected stakeholders</li>
                <li>Ensure permits and authorisations are in place</li>
                <li>Consider emergency procedures and escape routes</li>
              </ol>
              
              <div className="bg-elec-gray/30 p-3 rounded mt-4">
                <p className="text-sm text-elec-light/90">
                  <strong>Best practice:</strong> Create a written work plan for complex tasks, detailing step-by-step procedures, responsibilities, and safety measures.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Material and Equipment Preparation:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>Ensure all materials meet current regulations</li>
                <li>Check compatibility of components with existing systems</li>
                <li>Verify correct ratings of protective devices</li>
                <li>Pre-assemble components where possible</li>
                <li>Organise materials in logical work sequence</li>
                <li>Have spares available for critical components</li>
                <li>Keep documentation for installed equipment</li>
              </ul>
              
              <div className="bg-elec-gray/30 p-3 rounded mt-4">
                <p className="text-sm text-elec-light/90">
                  <strong>Documentation tip:</strong> Take photographs of existing installations before modification work to assist with reinstatement if required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Pre-Work Safety Documentation</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Complete and review these essential safety documents before commencing work:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse my-4">
              <thead>
                <tr className="bg-elec-yellow/20 text-left">
                  <th className="p-3 border border-elec-yellow/30">Document Type</th>
                  <th className="p-3 border border-elec-yellow/30">Purpose</th>
                  <th className="p-3 border border-elec-yellow/30">Key Elements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-elec-yellow/30">Risk Assessment</td>
                  <td className="p-3 border border-elec-yellow/30">
                    Identify hazards and control measures specific to the task
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Specific electrical hazards identified</li>
                      <li>Control measures detailed</li>
                      <li>Updated for site conditions</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-elec-gray">
                  <td className="p-3 border border-elec-yellow/30">Method Statement</td>
                  <td className="p-3 border border-elec-yellow/30">
                    Step-by-step procedure for completing work safely
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Sequential work steps</li>
                      <li>Safety measures at each stage</li>
                      <li>Equipment and personnel required</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-elec-yellow/30">Permit to Work</td>
                  <td className="p-3 border border-elec-yellow/30">
                    Formal authorisation for high-risk electrical work
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Clearly defined work scope</li>
                      <li>Time limitations</li>
                      <li>Authorising signatures</li>
                      <li>Safe isolation confirmation</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg my-4">
            <p className="font-medium text-white">Practical Exercise:</p>
            <p className="text-elec-light/90 mt-2">
              For the following scenario, create a preparation checklist identifying the required tools, PPE, and key safety considerations:
            </p>
            
            <div className="mt-4 space-y-3">
              <p className="font-medium text-white">Scenario: Replacing a consumer unit in a domestic property</p>
              <ul className="list-disc pl-5 space-y-2 text-elec-light/80">
                <li>What specific tools would you prepare?</li>
                <li>What PPE would be essential?</li>
                <li>What safety documentation would you need?</li>
                <li>What isolation procedures would you plan?</li>
                <li>How would you communicate with the property occupants?</li>
              </ul>
            </div>
            
            <p className="text-elec-light/90 mt-4">
              Document your preparation plan as you would in a real work environment, and discuss with your supervisor or instructor.
            </p>
          </div>
        </div>
      </div>
      
      {/* Completion Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={markAsComplete}
          disabled={isCompleted}
          className={`${
            isCompleted
              ? "bg-green-600/20 border-green-500/50 text-green-400"
              : "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          } px-4 py-2 rounded-lg`}
        >
          {isCompleted ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Subsection7_1;
