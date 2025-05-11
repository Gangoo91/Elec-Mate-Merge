
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
        <h2 className="text-2xl md:text-3xl font-bold text-elec-yellow">Practical Risk Assessment</h2>
        <p className="mt-2 text-elec-light/80">
          Applying risk assessment principles to real electrical work scenarios
        </p>
      </div>
      
      {/* Introduction Section */}
      <CourseContentSection
        title="Introduction to Practical Risk Assessment"
        description="Risk assessment is not just a theoretical exercise but an essential practical skill that every electrician must apply daily. This section provides hands-on guidance for conducting effective risk assessments in real-world electrical work environments."
        keyPoints={[
          "Converting theoretical knowledge into practical application",
          "Developing critical thinking for hazard identification",
          "Building confidence in risk assessment decisions",
          "Creating habitual safety practices"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Pre-Work Assessment Process</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Before beginning any electrical work, follow these practical steps:</p>
            <ol className="list-decimal pl-5 space-y-3 text-elec-light/80">
              <li className="pl-2">
                <span className="font-medium text-white">Site survey</span> - Physically inspect the work area looking for potential hazards such as water sources, damaged infrastructure, or access issues
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Documentation review</span> - Check building plans, existing electrical diagrams, and previous risk assessments for known issues
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Task breakdown</span> - Divide the job into discrete steps and assess risks for each component of the work
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Control measures selection</span> - Choose appropriate controls for each identified risk and ensure necessary equipment is available
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Team briefing</span> - Communicate the risk assessment findings to all workers involved before starting
              </li>
            </ol>
          </div>
        </div>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow mb-4">Practical Hazard Identification</h3>
          <div className="space-y-4">
            <p className="text-elec-light/90">Develop your hazard spotting skills with these practical techniques:</p>
            <ul className="list-disc pl-5 space-y-3 text-elec-light/80">
              <li className="pl-2">
                <span className="font-medium text-white">The 5-minute walk-through</span> - Conduct a brief site review specifically looking for electrical, physical, environmental, and access hazards
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">The "what if" technique</span> - For each element of work, ask "what if something goes wrong here?" to identify potential problems
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Sensory assessment</span> - Use all senses (unusual smells, sounds, visual indicators) to identify potential issues such as overheating or damaged insulation
              </li>
              <li className="pl-2">
                <span className="font-medium text-white">Sequential assessment</span> - Visualize the job from start to finish, focusing on transition points between tasks where risks often occur
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Case Study: Domestic Rewiring Risk Assessment</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            Consider a typical domestic rewiring project and how risk assessment principles apply in practice:
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse my-4">
              <thead>
                <tr className="bg-elec-yellow/20 text-left">
                  <th className="p-3 border border-elec-yellow/30">Task Element</th>
                  <th className="p-3 border border-elec-yellow/30">Identified Hazards</th>
                  <th className="p-3 border border-elec-yellow/30">Practical Controls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-elec-yellow/30">Initial inspection</td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Unknown live circuits</li>
                      <li>Structural issues</li>
                      <li>Confined spaces</li>
                    </ul>
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Use voltage tester before touching</li>
                      <li>Torch inspection before entry</li>
                      <li>Minimum two-person team</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-elec-gray">
                  <td className="p-3 border border-elec-yellow/30">Cable installation</td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Working at height</li>
                      <li>Dust/debris</li>
                      <li>Sharp objects</li>
                    </ul>
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Stable step ladder with helper</li>
                      <li>Dust masks and eye protection</li>
                      <li>Cut-resistant gloves</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-elec-yellow/30">Consumer unit replacement</td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Electrical shock</li>
                      <li>Fire risk</li>
                      <li>Service disruption</li>
                    </ul>
                  </td>
                  <td className="p-3 border border-elec-yellow/30">
                    <ul className="list-disc pl-4">
                      <li>Confirm DNO isolation</li>
                      <li>Safe isolation procedure</li>
                      <li>Customer communication plan</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-elec-yellow mb-4">Interactive Risk Assessment Exercise</h3>
        <div className="space-y-4">
          <p className="text-elec-light/90">
            For practical application, consider this electrical installation scenario and identify the key risks and appropriate controls:
          </p>
          
          <div className="bg-elec-gray/50 p-4 rounded-lg my-4">
            <p className="font-medium text-white">Scenario:</p>
            <p className="text-elec-light/90 mt-2">
              You need to install new lighting circuits in a retail store that remains open during the work. The installation involves running cables through the ceiling void where there are existing services, and working above a busy customer area.
            </p>
            
            <div className="mt-4 space-y-3">
              <p className="font-medium text-white">Consider these aspects:</p>
              <ul className="list-disc pl-5 space-y-2 text-elec-light/80">
                <li>What specific hazards would you look for?</li>
                <li>How would you safely isolate areas while maintaining business operations?</li>
                <li>What PPE and equipment would be essential?</li>
                <li>How would you communicate with staff and customers?</li>
                <li>What emergency procedures should be in place?</li>
              </ul>
            </div>
            
            <p className="text-elec-light/90 mt-4">
              Document these considerations as you would in a real risk assessment form, and discuss with your supervisor or instructor.
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
