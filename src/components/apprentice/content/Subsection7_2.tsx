
import React from 'react';
import { SubsectionProps } from './subsection1_1/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShieldAlert } from 'lucide-react';
import CourseContentSection from '@/components/apprentice/CourseContentSection';

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
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Hazard Identification Methods</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Apply these practical techniques to identify electrical hazards:</p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse my-4">
                <thead>
                  <tr className="bg-elec-yellow/20 text-left">
                    <th className="p-3 border border-elec-yellow/30">Technique</th>
                    <th className="p-3 border border-elec-yellow/30">Application</th>
                    <th className="p-3 border border-elec-yellow/30">Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Visual inspection</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Equipment condition checks</li>
                        <li>Wire inspection</li>
                        <li>Installation environment assessment</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Identifies obvious physical hazards and damage before work begins
                    </td>
                  </tr>
                  <tr className="bg-elec-gray">
                    <td className="p-3 border border-elec-yellow/30">Task analysis</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Breaking work into sequential steps</li>
                        <li>Identifying risks at each stage</li>
                        <li>Determining control measures</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Ensures comprehensive coverage of all work elements and their specific hazards
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-elec-yellow/30">Test-before-touch</td>
                    <td className="p-3 border border-elec-yellow/30">
                      <ul className="list-disc pl-4">
                        <li>Voltage testing before handling</li>
                        <li>Circuit verification</li>
                        <li>Proving tester functionality</li>
                      </ul>
                    </td>
                    <td className="p-3 border border-elec-yellow/30">
                      Confirms actual conditions rather than assuming electrical state
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Control Measure Implementation</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Follow this hierarchy of controls when mitigating electrical hazards:</p>
            
            <div className="space-y-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">1. Elimination</h4>
                <p className="mt-2 text-elec-light/80">
                  Remove the hazard completely when possible (e.g., de-energize circuits before work, replace damaged equipment)
                </p>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">2. Substitution</h4>
                <p className="mt-2 text-elec-light/80">
                  Replace the hazard with a safer alternative (e.g., lower voltage equipment, alternative materials)
                </p>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">3. Engineering Controls</h4>
                <p className="mt-2 text-elec-light/80">
                  Implement physical barriers or modifications (e.g., insulation, enclosures, GFCIs, RCDs)
                </p>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">4. Administrative Controls</h4>
                <p className="mt-2 text-elec-light/80">
                  Create procedures, training, and schedules to reduce exposure (e.g., permits to work, lockout-tagout protocols)
                </p>
              </div>
              
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-medium text-white">5. Personal Protective Equipment</h4>
                <p className="mt-2 text-elec-light/80">
                  Provide appropriate PPE as a last line of defense (e.g., insulating gloves, arc flash protection)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Risk Assessment Exercise: Electrical Panel Work</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Apply risk assessment principles to this practical scenario:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-white">Scenario:</h4>
              <p className="mt-2 text-elec-light/90">
                You need to replace a circuit breaker in an existing industrial panel. The panel supplies several critical machines, and the work needs to be completed with minimal downtime.
              </p>
              
              <div className="mt-4 space-y-2">
                <p className="font-medium text-white">Hazards identified:</p>
                <ul className="list-disc pl-5 space-y-1 text-elec-light/80">
                  <li>Live electrical components</li>
                  <li>Potential for arc flash/blast</li>
                  <li>Confined workspace</li>
                  <li>Time pressure to complete work</li>
                  <li>Multiple energy sources</li>
                </ul>
              </div>
            </div>
          
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-white">Complete this exercise:</h4>
              <p className="mt-2 text-elec-light/90">
                For the scenario described, develop a comprehensive risk control plan that includes:
              </p>
              
              <div className="mt-4 space-y-2">
                <ol className="list-decimal pl-5 space-y-1 text-elec-light/80">
                  <li>What specific control measures would you implement for each hazard?</li>
                  <li>In what sequence would you perform the work?</li>
                  <li>What verification steps would you include?</li>
                  <li>How would you handle unexpected findings?</li>
                  <li>What documentation would you complete?</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Continuous Risk Monitoring</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Risk assessment is not a one-time activity. Implement these ongoing monitoring practices during electrical work:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold text-white">During Work Monitoring:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>Conduct regular visual checks of the work area</li>
                <li>Re-test circuits when conditions change</li>
                <li>Verify tool and equipment condition throughout the job</li>
                <li>Implement the "step back 5×5" technique at regular intervals</li>
                <li>Maintain communication with team members</li>
              </ul>
              
              <div className="bg-elec-gray/30 p-3 rounded mt-4">
                <p className="text-sm text-elec-light/90">
                  <strong>Step back 5×5 technique:</strong> Pause work every hour, step back 5 feet, spend 5 minutes reassessing the work area and conditions for new hazards or changing circumstances.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Risk Level Indicators:</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-elec-light/80">
                <li>
                  <span className="font-medium text-red-400">Stop Work Triggers:</span> Unexpected findings, equipment failures, new hazards, uncertainty
                </li>
                <li>
                  <span className="font-medium text-amber-400">Caution Indicators:</span> Changes in environment, time pressure, fatigue, task complexity increases
                </li>
                <li>
                  <span className="font-medium text-green-400">Proceed Conditions:</span> All controls in place, verification complete, team communication established
                </li>
              </ul>
              
              <div className="bg-elec-gray/30 p-3 rounded mt-4">
                <p className="text-sm text-elec-light/90">
                  <strong>Remember:</strong> You have the authority and responsibility to stop work if conditions become unsafe. Reassess and reestablish controls before continuing.
                </p>
              </div>
            </div>
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

export default Subsection7_2;
