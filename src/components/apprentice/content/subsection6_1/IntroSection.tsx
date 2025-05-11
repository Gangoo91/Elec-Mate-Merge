
import React from "react";
import CourseContentSection from "../../CourseContentSection";
import { FileText, ExternalLink } from "lucide-react";

interface IntroSectionProps {
  subsectionId: string;
}

const IntroSection = ({ subsectionId }: IntroSectionProps) => {
  return (
    <div className="space-y-6">
      <CourseContentSection
        title="Safe Working Practices"
        description="Understanding and implementing safe working practices is fundamental for electricians to prevent accidents, injuries, and property damage. This section explores the essential guidelines and procedures that should be followed when working on electrical installations."
        keyPoints={[
          "Best practices for maintaining safety in electrical work environments",
          "Risk assessment procedures before commencing electrical work",
          "Planning considerations for electrical installation activities",
          "Safe isolation procedures to prevent electrical hazards",
          "Methods for maintaining safe and orderly work areas"
        ]}
        icon="tools"
        subsectionId={subsectionId}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-5 hover:border-elec-yellow/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-elec-yellow/10 p-2 rounded-md">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
            <h4 className="font-medium text-elec-yellow">Learning Outcomes</h4>
          </div>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-3">
              <span className="bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded text-xs font-medium mt-0.5">LO1</span>
              <p className="text-sm">Identify and apply safe working practices during electrical installation tasks</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded text-xs font-medium mt-0.5">LO2</span>
              <p className="text-sm">Conduct effective risk assessments for electrical work environments</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded text-xs font-medium mt-0.5">LO3</span>
              <p className="text-sm">Implement appropriate safe isolation procedures to prevent electrical accidents</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded text-xs font-medium mt-0.5">LO4</span>
              <p className="text-sm">Develop comprehensive work plans that prioritize safety and efficiency</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-5 hover:border-elec-yellow/40 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-elec-yellow/10 p-2 rounded-md">
              <ExternalLink className="h-5 w-5 text-elec-yellow" />
            </div>
            <h4 className="font-medium text-elec-yellow">Key Resources</h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 group">
              <div className="h-6 w-6 rounded bg-elec-yellow/10 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                <span className="text-xs font-medium text-elec-yellow">01</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-elec-yellow transition-colors">Electricity at Work Regulations 1989</p>
                <p className="text-xs text-gray-400">HSE legal framework for electrical safety</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-6 w-6 rounded bg-elec-yellow/10 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                <span className="text-xs font-medium text-elec-yellow">02</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-elec-yellow transition-colors">HSG85 - Electricity at work: Safe working practices</p>
                <p className="text-xs text-gray-400">Health and Safety Executive guidance</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-6 w-6 rounded bg-elec-yellow/10 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                <span className="text-xs font-medium text-elec-yellow">03</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-elec-yellow transition-colors">BS 7671:2018 - Requirements for Electrical Installations</p>
                <p className="text-xs text-gray-400">IET Wiring Regulations 18th Edition</p>
              </div>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="h-6 w-6 rounded bg-elec-yellow/10 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors">
                <span className="text-xs font-medium text-elec-yellow">04</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-elec-yellow transition-colors">GS38 - Electrical test equipment for use by electricians</p>
                <p className="text-xs text-gray-400">Guidance on proper test equipment</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
