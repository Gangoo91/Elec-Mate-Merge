
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection1_3 = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete 
}: SubsectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Building Regulations Part P</h2>
      
      <div className="space-y-5">
        <CourseContentSection
          title="Building Regulations Part P"
          description="Building Regulations Part P applies specifically to domestic electrical installations in England and Wales. It requires that electrical installations are designed and installed to protect people from fire and electric shock. Under Part P, certain electrical work must be notified to local building control authorities unless carried out by a registered competent person who can self-certify their work. Work requiring notification includes new circuits, consumer unit replacements, and work in special locations such as bathrooms and swimming pools. It is essential for electricians working in domestic settings to understand these requirements."
          keyPoints={[
            "Applies to domestic electrical installations in England and Wales",
            "Requires notification of certain electrical work",
            "Registered competent persons can self-certify work",
            "Special locations have additional requirements"
          ]}
          icon="section"
          subsectionId={subsectionId}
        />
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-4 md:p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Notifiable Work
          </h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              The following electrical work must be notified to building control unless carried out by a registered competent person:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Installation of New Circuits</h4>
                <p className="text-sm">
                  Any new circuit installation in a domestic property, regardless of the intended use.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Consumer Unit Replacements</h4>
                <p className="text-sm">
                  Replacing a consumer unit or distribution board.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Work in Special Locations</h4>
                <p className="text-sm">
                  Any work in bathrooms, shower rooms, swimming pools, or hot tub installations.
                </p>
              </div>
              
              <div className="border border-elec-yellow/20 rounded p-3 bg-elec-dark/30">
                <h4 className="font-semibold text-white mb-2">Alterations to Existing Circuits</h4>
                <p className="text-sm">
                  In special locations or when adding significant loads to existing circuits.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-4 md:p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Competent Person Schemes</h3>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base">
              Registered competent persons can self-certify their work without needing building control notification. Main schemes include:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium text-white">NICEIC</span>
                <p className="text-sm mt-1">National Inspection Council for Electrical Installation Contracting</p>
              </li>
              <li>
                <span className="font-medium text-white">ELECSA</span>
                <p className="text-sm mt-1">Part of Certsure LLP alongside NICEIC</p>
              </li>
              <li>
                <span className="font-medium text-white">NAPIT</span>
                <p className="text-sm mt-1">National Association of Professional Inspectors and Testers</p>
              </li>
              <li>
                <span className="font-medium text-white">STROMA</span>
                <p className="text-sm mt-1">Certification services for building standards</p>
              </li>
            </ul>
            
            <div className="mt-4 bg-elec-dark/50 p-3 rounded border border-elec-yellow/20">
              <p className="text-sm">
                <strong>Note:</strong> Upon completion of notifiable work, registered competent persons must issue an Electrical Installation Certificate or Minor Works Certificate to the customer and register the work with their scheme provider.
              </p>
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

export default Subsection1_3;
