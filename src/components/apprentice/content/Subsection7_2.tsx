
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

const Subsection7_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
      {/* Main header with background */}
      <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-5">
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Risk Assessment and Control</h2>
        <p className="mt-2 text-elec-light/80">
          Identifying potential hazards in the work environment and implementing control measures to mitigate risks
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Practical Risk Assessment"
        description="Effective risk assessment is a fundamental skill for electrical workers. This section provides practical guidance on identifying hazards and implementing controls in real-world electrical environments."
        keyPoints={[
          "Practical hazard identification techniques",
          "Risk mitigation strategies for electrical work",
          "Implementing effective control measures",
          "Continuous risk monitoring during work"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections - Optimised layout */}
      <div className="space-y-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Hazard Identification Methods</h3>
          
          <p className="text-elec-light/90 mb-3">Apply these practical techniques to identify electrical hazards:</p>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-elec-yellow/20">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white">Technique</TableHead>
                  <TableHead className="text-white">Application</TableHead>
                  <TableHead className="text-white">Benefits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Visual inspection</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Equipment condition checks</li>
                      <li>Wire inspection</li>
                      <li>Installation environment assessment</li>
                    </ul>
                  </TableCell>
                  <TableCell>Identifies obvious physical hazards and damage before work begins</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Task analysis</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Breaking work into sequential steps</li>
                      <li>Identifying risks at each stage</li>
                      <li>Determining control measures</li>
                    </ul>
                  </TableCell>
                  <TableCell>Ensures comprehensive coverage of all work elements and their specific hazards</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Test-before-touch</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Voltage testing before handling</li>
                      <li>Circuit verification</li>
                      <li>Proving tester functionality</li>
                    </ul>
                  </TableCell>
                  <TableCell>Confirms actual conditions rather than assuming electrical state</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Control Measure Implementation</h3>
          
          <p className="text-elec-light/90 mb-3">Follow this hierarchy of controls when mitigating electrical hazards:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-elec-gray/50 p-3 rounded-lg">
              <h4 className="font-medium text-white">1. Elimination</h4>
              <p className="text-elec-light/80 text-sm">
                Remove the hazard completely when possible (e.g., de-energise circuits before work, replace damaged equipment)
              </p>
            </div>
            
            <div className="bg-elec-gray/50 p-3 rounded-lg">
              <h4 className="font-medium text-white">2. Substitution</h4>
              <p className="text-elec-light/80 text-sm">
                Replace the hazard with a safer alternative (e.g., lower voltage equipment, alternative materials)
              </p>
            </div>
            
            <div className="bg-elec-gray/50 p-3 rounded-lg">
              <h4 className="font-medium text-white">3. Engineering Controls</h4>
              <p className="text-elec-light/80 text-sm">
                Implement physical barriers or modifications (e.g., insulation, enclosures, GFCIs, RCDs)
              </p>
            </div>
            
            <div className="bg-elec-gray/50 p-3 rounded-lg">
              <h4 className="font-medium text-white">4. Administrative Controls</h4>
              <p className="text-elec-light/80 text-sm">
                Create procedures, training, and schedules to reduce exposure (e.g., permits to work, lockout-tagout protocols)
              </p>
            </div>
          </div>
          
          <div className="bg-elec-gray/50 p-3 rounded-lg mt-3">
            <h4 className="font-medium text-white">5. Personal Protective Equipment</h4>
            <p className="text-elec-light/80 text-sm">
              Provide appropriate PPE as a last line of defence (e.g., insulating gloves, arc flash protection)
            </p>
          </div>
        </div>
      
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Risk Assessment Exercise: Electrical Panel Work</h3>
          
          <p className="text-elec-light/90 mb-3">
            Apply risk assessment principles to this practical scenario:
          </p>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Scenario:</h4>
            <p className="text-elec-light/90">
              You need to replace a circuit breaker in an existing industrial panel. The panel supplies several critical machines, and the work needs to be completed with minimal downtime.
            </p>
            
            <div className="mt-3">
              <p className="font-medium text-white">Hazards identified:</p>
              <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 gap-1 text-elec-light/80 mt-1">
                <li>Live electrical components</li>
                <li>Potential for arc flash/blast</li>
                <li>Confined workspace</li>
                <li>Time pressure to complete work</li>
                <li>Multiple energy sources</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <p className="font-medium text-white">Complete this exercise:</p>
              <ol className="list-decimal pl-5 text-elec-light/80 mt-1">
                <li>What specific control measures would you implement for each hazard?</li>
                <li>In what sequence would you perform the work?</li>
                <li>What verification steps would you include?</li>
                <li>How would you handle unexpected findings?</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <h3 className="text-xl font-semibold text-elec-yellow mb-3">Continuous Risk Monitoring</h3>
          
          <p className="text-elec-light/90 mb-3">
            Risk assessment is not a one-time activity. Implement these ongoing monitoring practices during electrical work:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-gray/30 p-3 rounded-lg">
              <h4 className="font-semibold text-white mb-1">During Work Monitoring:</h4>
              <ul className="list-disc pl-4 space-y-1 text-elec-light/80 text-sm">
                <li>Conduct regular visual checks of the work area</li>
                <li>Re-test circuits when conditions change</li>
                <li>Verify tool and equipment condition throughout the job</li>
                <li>Implement the "step back 5×5" technique at regular intervals</li>
              </ul>
              
              <div className="mt-2 p-2 bg-elec-dark/50 rounded text-xs">
                <strong>Step back 5×5 technique:</strong> Pause work every hour, step back 5 feet, spend 5 minutes reassessing the work area and conditions for new hazards.
              </div>
            </div>
            
            <div className="bg-elec-gray/30 p-3 rounded-lg">
              <h4 className="font-semibold text-white mb-1">Risk Level Indicators:</h4>
              <ul className="list-disc pl-4 space-y-1 text-elec-light/80 text-sm">
                <li>
                  <span className="font-medium text-red-400">Stop Work Triggers:</span> Unexpected findings, equipment failures, new hazards
                </li>
                <li>
                  <span className="font-medium text-amber-400">Caution Indicators:</span> Changes in environment, time pressure, fatigue
                </li>
                <li>
                  <span className="font-medium text-green-400">Proceed Conditions:</span> All controls in place, verification complete
                </li>
              </ul>
              
              <div className="mt-2 p-2 bg-elec-dark/50 rounded text-xs">
                <strong>Remember:</strong> You have the authority and responsibility to stop work if conditions become unsafe.
              </div>
            </div>
          </div>
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

export default Subsection7_2;
