
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import CourseContentSection from '@/components/apprentice/CourseContentSection';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Subsection7_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Main header with background */}
      <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-5">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Safe Execution and Emergency Procedures</h2>
        <p className="mt-2 text-elec-light/80">
          Applying correct procedures when working with electrical systems and being prepared for emergency response
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Safe Working Practices"
        description="This section covers essential procedures for safely executing electrical work and responding to emergencies. These practices are fundamental to preventing accidents and minimising harm in workplace incidents."
        keyPoints={[
          "Safe isolation and circuit testing procedures",
          "Proper tool usage and handling techniques",
          "Emergency response protocols for electrical incidents",
          "Effective communication in hazardous situations"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections - Optimised layout */}
      <div className="space-y-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Safe Isolation Procedures</h3>
          
          <p className="text-elec-light/90 mb-3">Follow these crucial steps for safe electrical isolation:</p>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-elec-yellow/20">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white">Step</TableHead>
                  <TableHead className="text-white">Procedure</TableHead>
                  <TableHead className="text-white">Key Considerations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1. Identify</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Confirm circuit to be worked on</li>
                      <li>Locate correct isolation point</li>
                      <li>Verify with drawings/labels</li>
                    </ul>
                  </TableCell>
                  <TableCell>Never rely solely on labels; verify physically where possible</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2. Isolate</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Switch off and lock off</li>
                      <li>Apply appropriate locks/tags</li>
                      <li>Secure keys safely</li>
                    </ul>
                  </TableCell>
                  <TableCell>Use multi-lock hasps when multiple people are working on the same system</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3. Test</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Test voltage detector on known live source</li>
                      <li>Test isolated circuit for voltage</li>
                      <li>Re-test detector on known live source</li>
                    </ul>
                  </TableCell>
                  <TableCell>The "prove-test-prove" method confirms your test instrument is functioning correctly</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-elec-gray/50 p-3 rounded-lg mt-3">
            <h4 className="font-medium text-white mb-1">Safe Isolation Certification:</h4>
            <p className="text-elec-light/80 text-sm">
              Remember that formal certification is required for isolation procedures in many work environments. Ensure you have the appropriate training and authorisation before performing isolation.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-elec-yellow mb-3">Tool Usage Best Practices</h3>
            
            <p className="text-elec-light/90 mb-3">Implement these practices to ensure safe handling of tools:</p>
            
            <div className="space-y-3">
              <div className="bg-elec-gray/50 p-3 rounded-lg">
                <h4 className="font-medium text-white">Selection</h4>
                <ul className="list-disc pl-4 mt-1 text-elec-light/80 text-sm">
                  <li>Use insulated tools rated for the voltage</li>
                  <li>Select tools with the appropriate VDE certification</li>
                  <li>Ensure tools are suitable for the specific task</li>
                  <li>Check tools are properly maintained and in good condition</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray/50 p-3 rounded-lg">
                <h4 className="font-medium text-white">Handling</h4>
                <ul className="list-disc pl-4 mt-1 text-elec-light/80 text-sm">
                  <li>Maintain firm grip on handles, never touch metal parts</li>
                  <li>Keep working area clear of obstructions</li>
                  <li>Store tools safely when not in use</li>
                  <li>Never use excessive force that could cause slippage</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray/50 p-3 rounded-lg">
                <h4 className="font-medium text-white">Maintenance</h4>
                <ul className="list-disc pl-4 mt-1 text-elec-light/80 text-sm">
                  <li>Inspect tools before each use for damage</li>
                  <li>Replace damaged insulation immediately</li>
                  <li>Keep cutting tools sharp to prevent slipping</li>
                  <li>Clean tools after use to prevent contamination</li>
                </ul>
              </div>
            </div>
          </div>
        
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-elec-yellow mb-3">Safe Live Testing</h3>
            
            <p className="text-elec-light/90 mb-3">
              While it's always preferable to work on de-energised circuits, certain diagnostic procedures require live testing:
            </p>
            
            <div className="bg-elec-gray/50 p-3 rounded-lg">
              <h4 className="font-medium text-white mb-1">When Live Testing is Permitted:</h4>
              <ul className="list-disc pl-4 text-elec-light/80 text-sm">
                <li>Diagnosing faults that can't be found without power</li>
                <li>Testing RCD operation</li>
                <li>Completing initial verification tests</li>
                <li>Performing thermographic surveys</li>
              </ul>
              
              <div className="border-t border-elec-yellow/20 mt-2 pt-2">
                <p className="text-white text-sm font-medium">Required Precautions:</p>
                <ul className="list-disc pl-4 mt-1 text-elec-light/80 text-sm">
                  <li>Risk assessment must be completed and documented</li>
                  <li>Appropriate PPE must be worn</li>
                  <li>Ensure adequate working space</li>
                  <li>Use insulated tools and testing equipment</li>
                  <li>Work should be supervised if required</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-900/30 border border-red-500/30 p-3 rounded-lg mt-3">
              <p className="text-white text-sm font-medium">
                REMEMBER: The Electricity at Work Regulations 1989 require that live work shall not be carried out if it is reasonably practicable to work dead.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Emergency Response Protocols</h3>
          
          <p className="text-elec-light/90 mb-3">
            Being prepared for emergencies is crucial. Know how to respond to these common electrical incidents:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Electric Shock Response</h4>
              <ol className="list-decimal pl-5 space-y-1 text-elec-light/80">
                <li>Do not touch the casualty if still in contact with the source</li>
                <li>Switch off power immediately if possible</li>
                <li>If power cannot be switched off, use insulated material to separate casualty from source</li>
                <li>Call emergency services (999)</li>
                <li>Administer first aid if trained and safe to do so</li>
                <li>Place in recovery position if unconscious but breathing</li>
                <li>Begin CPR if not breathing normally</li>
              </ol>
              
              <div className="mt-2 p-2 bg-elec-dark rounded text-xs">
                <strong>UK Guidance:</strong> The UK Resuscitation Council recommends 30 chest compressions followed by 2 rescue breaths for adult CPR.
              </div>
            </div>
            
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Electrical Fire Response</h4>
              <ol className="list-decimal pl-5 space-y-1 text-elec-light/80">
                <li>Raise the alarm and call emergency services (999)</li>
                <li>Switch off power if safe to do so</li>
                <li>Only attempt to fight small fires if trained and safe</li>
                <li>Use appropriate fire extinguisher (CO₂ or dry powder)</li>
                <li>Never use water on electrical fires</li>
                <li>Evacuate if fire cannot be controlled</li>
                <li>Report to assembly point and await emergency services</li>
              </ol>
              
              <div className="mt-2 p-2 bg-elec-dark rounded text-xs">
                <strong>Fire Extinguisher:</strong> CO₂ extinguishers are identified by black labels and are safe for electrical fires.
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg mt-4">
            <h4 className="font-medium text-white mb-2">Communication During Emergencies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-elec-light/90 mb-2">Effective communication is critical during emergency situations:</p>
                <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                  <li>Use clear, concise language when raising alarms</li>
                  <li>Specify exact location and nature of emergency</li>
                  <li>Designate a single point of contact for emergency services</li>
                  <li>Establish communication chain for larger worksites</li>
                  <li>Use hand signals in noisy environments</li>
                </ul>
              </div>
              <div>
                <p className="text-elec-light/90 mb-2">Essential information to communicate:</p>
                <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                  <li>Exact location of incident</li>
                  <li>Type of incident (shock, fire, etc.)</li>
                  <li>Number of people affected</li>
                  <li>Actions already taken</li>
                  <li>Potential hazards for responders</li>
                  <li>Access routes for emergency services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Practical Exercise: Emergency Response Plan</h3>
          
          <p className="text-elec-light/90 mb-3">
            Apply your knowledge to create an emergency response plan for the following scenario:
          </p>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg my-4">
            <h4 className="font-medium text-white mb-2">Scenario: Industrial Distribution Board Failure</h4>
            <p className="text-elec-light/90 mb-3">
              You are working on a team installing a new industrial distribution board in a manufacturing facility. The facility remains operational during the installation, with only the immediate work area isolated. While making final connections, you notice smoke coming from an adjacent existing distribution board that is still live.
            </p>
            
            <ol className="list-decimal pl-5 mt-2 space-y-2 text-elec-light/80">
              <li className="pl-2">
                <span className="font-medium text-white">Create an emergency response plan:</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>What are your immediate actions?</li>
                  <li>Who needs to be notified and in what order?</li>
                  <li>What safety measures need to be implemented?</li>
                  <li>How would you secure the area?</li>
                </ul>
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Document the incident:</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>What information would you record?</li>
                  <li>What forms or documentation would be required?</li>
                  <li>Who would need copies of this documentation?</li>
                </ul>
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Follow-up actions:</span>
                <ul className="list-disc pl-5 mt-1 text-elec-light/80">
                  <li>What steps would you take before resuming work?</li>
                  <li>What additional safety measures might be implemented?</li>
                  <li>How would you prevent similar incidents?</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <p className="text-elec-light/90">
            Discuss this scenario with your colleagues or instructor, comparing different approaches to emergency response. Consider how the response might change if the incident occurred outside of normal working hours.
          </p>
        </div>
      </div>
      
      {/* Completion Button */}
      <div className="mt-6 flex justify-end">
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

export default Subsection7_3;
