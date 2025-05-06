
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquare, Users, FileCheck, FileText } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";

const Subsection2_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Safety Communication Systems</h2>
      
      <div className="space-y-6">
        <p className="text-elec-light/80">
          Effective safety communication systems are vital for preventing accidents and maintaining safe working environments in the electrical industry.
          Clear communication ensures all workers understand hazards, control measures, and emergency procedures.
        </p>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center">
            <Users className="mr-2 h-5 w-5" /> Communication Structures
          </h3>
          
          <p className="text-elec-light/80 mb-3">
            Effective safety communication requires clear organisational structures with defined roles and responsibilities:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Management Level</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Establishes safety policies and procedures</li>
                <li>Allocates resources for safety initiatives</li>
                <li>Reviews safety performance and incident data</li>
                <li>Communicates commitment to safety</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Supervisor Level</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Conducts toolbox talks and safety briefings</li>
                <li>Enforces safety rules and procedures</li>
                <li>Monitors workplace conditions</li>
                <li>Reports hazards and incidents up the chain</li>
                <li>Communicates safety information to workers</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Worker Level</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Reports hazards and near misses</li>
                <li>Participates in safety meetings and discussions</li>
                <li>Suggests safety improvements</li>
                <li>Follows established safety procedures</li>
                <li>Communicates with colleagues about safety concerns</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Safety Representatives</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Act as liaison between workers and management</li>
                <li>Participate in safety inspections and investigations</li>
                <li>Raise concerns on behalf of workers</li>
                <li>Help develop and review safety procedures</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <MessageSquare className="mr-2 h-5 w-5" /> Communication Methods
          </h3>
          
          <p className="text-elec-light/80 mb-3">
            A variety of communication methods should be used to ensure safety information reaches all workers:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Written Communication</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Safety policies and procedures</li>
                <li>Risk assessments and method statements</li>
                <li>Safety alerts and bulletins</li>
                <li>Safety signage and notices</li>
                <li>Email updates and newsletters</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Verbal Communication</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Safety briefings and toolbox talks</li>
                <li>Safety committee meetings</li>
                <li>One-on-one safety discussions</li>
                <li>Safety training sessions</li>
                <li>Verbal warnings and instructions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Visual Communication</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Warning signs and symbols</li>
                <li>Colour coding (e.g., for different voltage systems)</li>
                <li>Safety posters and infographics</li>
                <li>Demonstration videos</li>
                <li>Safety dashboards showing performance metrics</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Electronic Communication</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Safety apps and digital checklists</li>
                <li>Text alerts for emergency situations</li>
                <li>Digital safety management systems</li>
                <li>Online reporting tools for hazards and incidents</li>
                <li>Virtual safety training platforms</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/60 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <FileCheck className="mr-2 h-5 w-5" /> Safety Meetings
          </h3>
          
          <p className="text-elec-light/80 mb-3">
            Regular safety meetings are essential for maintaining awareness and addressing emerging issues:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Toolbox Talks</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Brief (10-15 minute) focused discussions</li>
                <li>Conducted at the start of shifts or before specific tasks</li>
                <li>Cover specific safety topics relevant to the day's work</li>
                <li>Opportunity for questions and clarification</li>
                <li>Documented attendance and topics covered</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Safety Committee Meetings</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Regular scheduled meetings (monthly or quarterly)</li>
                <li>Include representatives from management and workers</li>
                <li>Review safety performance and incidents</li>
                <li>Discuss safety concerns and improvement initiatives</li>
                <li>Follow formal agenda and produce minutes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Pre-job Briefings</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Conducted immediately before starting complex or high-risk electrical work</li>
                <li>Review specific hazards and control measures</li>
                <li>Clarify roles and responsibilities</li>
                <li>Confirm understanding of emergency procedures</li>
                <li>Ensure all workers are properly prepared</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center mb-4">
            <FileText className="mr-2 h-5 w-5" /> Documentation Systems
          </h3>
          
          <p className="text-elec-light/80 mb-3">
            Proper documentation is crucial for effective safety communication and legal compliance:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white">Safety Communication Records</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Toolbox talk attendance sheets</li>
                <li>Safety meeting minutes</li>
                <li>Training records and competency assessments</li>
                <li>Safety briefing documentation</li>
                <li>Distribution records for safety notices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Incident Reporting Systems</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Accident report forms</li>
                <li>Near miss reporting procedures</li>
                <li>Investigation documentation</li>
                <li>Corrective action tracking</li>
                <li>RIDDOR reporting records</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white">Safety Performance Documentation</h4>
              <ul className="list-disc pl-6 text-elec-light/80 mt-1">
                <li>Safety audit reports</li>
                <li>Inspection checklists and findings</li>
                <li>Risk assessment reviews</li>
                <li>Safety observation records</li>
                <li>Safety performance metrics and trends</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-elec-dark/70 rounded-lg">
            <h4 className="font-semibold text-white">Best Practices for Safety Communication</h4>
            <ul className="list-disc pl-6 text-elec-light/80 mt-2">
              <li>Use clear, simple language avoiding jargon</li>
              <li>Confirm understanding through feedback and questions</li>
              <li>Provide information in multiple formats (visual, written, verbal)</li>
              <li>Ensure communications are timely and relevant</li>
              <li>Maintain open door policies for raising safety concerns</li>
              <li>Recognise and reward good safety communication</li>
              <li>Consider language barriers and literacy levels</li>
              <li>Review and improve communication systems regularly</li>
            </ul>
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
