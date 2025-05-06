
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Megaphone, MessageSquare, ShieldAlert } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection2_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Safety Communication Systems</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="Safety Communication Systems"
          description="Effective safety communication is vital to preventing accidents in electrical work. Clear communication ensures hazards are reported promptly and safety information reaches everyone who needs it. Communication structures should include clear reporting hierarchies, emergency communication procedures, designated safety representatives, feedback loops, and cross-team communication methods. Various communication methods should be employed, including toolbox talks, safety briefings, visual communication, digital tools, and anonymous reporting channels. Regular safety meetings with a structured format help maintain safety awareness and address emerging concerns. Communication must be inclusive, considering language needs, literacy levels, accessibility, and cultural factors."
          keyPoints={[
            "Clear communication structures prevent accidents by ensuring hazards are reported promptly",
            "Multiple communication methods reach different people effectively",
            "Regular structured safety meetings maintain awareness and address concerns",
            "Inclusive communication considers language, literacy, and cultural factors",
            "Effective communication must lead to appropriate action"
          ]}
          icon="info"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Communication Structures
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Organised systems for safety information flow:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Reporting Hierarchies</h4>
                <p className="text-sm">
                  Clear chains of communication for different types of safety concerns. Everyone should know who to report to for various issues, and backup contacts should be established.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Emergency Communication</h4>
                <p className="text-sm">
                  Procedures for immediate response to serious hazards. These should be simple, practised regularly, and include multiple communication methods in case primary systems fail.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Safety Representatives</h4>
                <p className="text-sm">
                  Designated individuals to facilitate safety communication. They serve as points of contact for safety concerns and help ensure information flows in both directions.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Feedback Loops</h4>
                <p className="text-sm">
                  Systems to ensure reported issues are addressed and reporters informed. This maintains trust in the communication system and encourages continued reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Megaphone className="h-5 w-5 mr-2" />
            Communication Methods
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Effective approaches to delivering safety messages:
            </p>
            
            <div className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-dark/30">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium text-white">Toolbox Talks</span>
                  <p className="text-sm mt-1">Brief, focused discussions on specific safety topics before work begins. These should be relevant to the day's tasks and current site conditions.</p>
                </li>
                <li>
                  <span className="font-medium text-white">Safety Briefings</span>
                  <p className="text-sm mt-1">More detailed sessions when tasks change or new hazards emerge. These provide comprehensive information about potential risks and control measures.</p>
                </li>
                <li>
                  <span className="font-medium text-white">Visual Communication</span>
                  <p className="text-sm mt-1">Signage, colour coding, and warning systems in work areas. Visual cues provide immediate reminders of hazards and required precautions.</p>
                </li>
                <li>
                  <span className="font-medium text-white">Digital Tools</span>
                  <p className="text-sm mt-1">Apps, messaging systems, and alerts for immediate hazard notification. These can reach multiple workers simultaneously and provide documentation of communication.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <ShieldAlert className="h-5 w-5 mr-2" />
            Safety Meeting Structure
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Meeting Components:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Regular schedule (weekly or bi-weekly)</li>
                  <li>Clear agenda covering key safety topics</li>
                  <li>Review of recent incidents or near-misses</li>
                  <li>Discussion of upcoming work and associated risks</li>
                  <li>Time for questions and open discussion</li>
                </ul>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Inclusive Communication:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Materials in languages understood by all workers</li>
                  <li>Visual aids for those with limited reading ability</li>
                  <li>Accessibility considerations for people with disabilities</li>
                  <li>Cultural sensitivity in communication approaches</li>
                  <li>Verification that messages have been understood</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-elec-dark/70 rounded-lg border border-elec-yellow/20 text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Important Note:</p>
              <p>Communication is only effective if it leads to action. Always include clear instructions about what workers should do with the information provided, and check that appropriate actions are being taken. Create a culture where safety communication is valued and acted upon at all levels of the organisation.</p>
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

export default Subsection2_3;
