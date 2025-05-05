
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Megaphone, MessageSquare, ShieldAlert } from "lucide-react";

type Subsection2_3Props = {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
};

const Subsection2_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection2_3Props) => {
  return (
    <>
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-elec-yellow mb-4">Safety Communication Systems</h2>
        
        <p className="text-base">
          Effective safety communication is vital to preventing accidents in electrical work.
          Clear communication ensures hazards are reported promptly and safety information reaches everyone who needs it.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <MessageSquare className="h-5 w-5 mr-2" />
              Communication Structures
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Organized systems for safety information flow:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Reporting Hierarchies:</span> Clear chains of communication for different types of safety concerns</li>
                <li><span className="font-medium">Emergency Communication:</span> Procedures for immediate response to serious hazards</li>
                <li><span className="font-medium">Safety Representatives:</span> Designated individuals to facilitate safety communication</li>
                <li><span className="font-medium">Feedback Loops:</span> Systems to ensure reported issues are addressed and reporters informed</li>
                <li><span className="font-medium">Cross-Team Communication:</span> Methods to share safety information between different work groups</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Communication systems should be designed to ensure critical safety information reaches everyone affected, regardless of their position in the organization hierarchy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <Megaphone className="h-5 w-5 mr-2" />
              Communication Methods
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Effective approaches to delivering safety messages:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Toolbox Talks:</span> Brief, focused discussions on specific safety topics before work begins</li>
                <li><span className="font-medium">Safety Briefings:</span> More detailed sessions when tasks change or new hazards emerge</li>
                <li><span className="font-medium">Visual Communication:</span> Signage, color coding, and warning systems in work areas</li>
                <li><span className="font-medium">Digital Tools:</span> Apps, messaging systems, and alerts for immediate hazard notification</li>
                <li><span className="font-medium">Anonymous Reporting:</span> Confidential channels for reporting concerns without fear</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Use multiple communication channels to ensure messages reach everyone. Different people respond better to different communication styles (visual, verbal, written).
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Safety Meeting Structure
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Organized safety discussions for team engagement:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Regular Schedule:</span> Consistent timing to establish safety as a priority</li>
                <li><span className="font-medium">Clear Agenda:</span> Structured format covering incidents, inspections, and upcoming risks</li>
                <li><span className="font-medium">Documented Attendance:</span> Record of who received the information</li>
                <li><span className="font-medium">Interactive Format:</span> Encourage questions and discussion rather than one-way communication</li>
                <li><span className="font-medium">Action Items:</span> Assign specific tasks with deadlines and follow-up</li>
              </ul>
              
              <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg">
                <p className="text-xs text-gray-300 italic">
                  Effective safety meetings include reviewing recent incidents or near-misses to extract lessons, not to assign blame. This creates a learning culture rather than a blame culture.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-5">
            <h3 className="flex items-center text-lg font-semibold text-elec-yellow mb-3">
              <MessageSquare className="h-5 w-5 mr-2" />
              Inclusive Communication
            </h3>
            <div className="space-y-3">
              <p className="text-sm">Ensuring safety messages reach and are understood by everyone:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li><span className="font-medium">Language Considerations:</span> Materials in languages understood by all workers</li>
                <li><span className="font-medium">Literacy Awareness:</span> Visual aids and verbal communication for those with limited reading ability</li>
                <li><span className="font-medium">Accessibility:</span> Ensuring communication methods work for people with disabilities</li>
                <li><span className="font-medium">Cultural Sensitivity:</span> Awareness of how cultural differences affect communication</li>
                <li><span className="font-medium">Verification of Understanding:</span> Checking that messages have been correctly understood</li>
              </ul>
              
              <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg">
                <p className="font-medium mb-1 text-elec-yellow">Important Note:</p>
                <p className="text-sm">Communication is only effective if it leads to action. Always include clear instructions about what workers should do with the information provided, and check that appropriate actions are being taken.</p>
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
