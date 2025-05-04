
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, FileText } from "lucide-react";

interface Subsection5_1Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection5_1 = ({ subsectionId, isCompleted, markAsComplete }: Subsection5_1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Legal and Regulatory Requirements</h2>
      
      <div className="space-y-5">
        <p>
          Electrical installation work is governed by various regulations and standards that ensure safety, quality, and compliance.
          Understanding these legal requirements is essential for any electrical practitioner.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">BS 7671 - IET Wiring Regulations</h3>
            </div>
            
            <div className="space-y-4">
              <p>
                BS 7671 (currently in its 18th Edition with Amendments) is the national standard for electrical installations
                in the UK. While not directly law, it is the primary reference for electrical installation work.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Key Sections:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Part 1: Scope, object, and fundamental principles</li>
                  <li>Part 2: Definitions</li>
                  <li>Part 3: Assessment of general characteristics</li>
                  <li>Part 4: Protection for safety</li>
                  <li>Part 5: Selection and erection of equipment</li>
                  <li>Part 6: Inspection and testing</li>
                  <li>Part 7: Special installations or locations</li>
                  <li>Part 8: Functional requirements</li>
                </ul>
              </div>
              
              <div className="mt-4 bg-elec-dark/70 p-4 rounded-md border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Important Note:</h4>
                <p className="text-sm">
                  Compliance with BS 7671 is typically considered necessary to satisfy relevant legal requirements 
                  such as the Electricity at Work Regulations 1989. New amendments and updates are published periodically, 
                  and electricians must keep their knowledge current.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <h3 className="text-xl font-bold text-elec-yellow">Key Legislation</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Electricity at Work Regulations 1989</h4>
                <p className="mt-1">
                  These regulations place duties on employers, employees, and self-employed persons to ensure 
                  electrical safety in the workplace. They require:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Electrical systems to be maintained safely</li>
                  <li>Work activities to be carried out safely</li>
                  <li>Persons working on electrical systems to be competent</li>
                  <li>Precautions to prevent danger and injury</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-white">Building Regulations - Part P</h4>
                <p className="mt-1">
                  Part P applies to electrical installations in dwellings in England and Wales. Key requirements include:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Design and installation of electrical installations that are safe and prevent fire</li>
                  <li>Notification of certain electrical work to building control bodies</li>
                  <li>Certification of notifiable work by a competent person</li>
                  <li>Compliance with relevant standards (primarily BS 7671)</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-white">Health and Safety at Work Act 1974</h4>
                <p className="mt-1">
                  This legislation provides the overarching legal framework for workplace health and safety, requiring:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Employers to ensure the health, safety and welfare of employees</li>
                  <li>Safe systems of work and provision of information and training</li>
                  <li>Employees to take reasonable care of themselves and others</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Certification and Notification Requirements</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Electrical Installation Certificate (EIC)</h4>
              <p>
                Required for new installations, complete rewires, or major alterations and additions. 
                Must be issued by a competent person upon completion.
              </p>
              <div className="bg-elec-dark/70 p-3 rounded-md text-sm mt-2">
                <p><span className="font-semibold text-elec-yellow">Contains:</span> Details of work, declaration of compliance, test results, next inspection date.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Minor Electrical Installation Works Certificate (MEIWC)</h4>
              <p>
                Used for additions or alterations to an existing circuit (no new circuits).
              </p>
              <div className="bg-elec-dark/70 p-3 rounded-md text-sm mt-2">
                <p><span className="font-semibold text-elec-yellow">Contains:</span> Description of work, test results, declaration the work is safe.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Electrical Installation Condition Report (EICR)</h4>
              <p>
                Periodic inspection report for existing installations. Identifies damage, deterioration, defects, and non-compliance.
              </p>
              <div className="bg-elec-dark/70 p-3 rounded-md text-sm mt-2">
                <p><span className="font-semibold text-elec-yellow">Contains:</span> Observations and recommendations coded by severity (C1, C2, C3, FI).</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-elec-yellow/20">
            <h4 className="font-semibold text-white mb-3">Building Regulations Notification</h4>
            
            <div className="space-y-4">
              <p>Under Part P of the Building Regulations, certain electrical work in dwellings must be notified to local authorities:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-elec-yellow mb-2">Notifiable Work</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Consumer unit replacement</li>
                    <li>New circuit installation</li>
                    <li>Work in special locations (bathrooms, swimming pools)</li>
                    <li>New installations or rewires</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-lg">
                  <h5 className="font-semibold text-elec-yellow mb-2">Notification Methods</h5>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Through building control bodies</li>
                    <li>Through a competent person scheme</li>
                    <li>Using a registered third-party certifier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4">Competent Person Schemes</h3>
          
          <div className="space-y-4">
            <p>
              Competent person schemes allow registered electricians to self-certify that their work complies with building regulations without the need for prior approval from building control bodies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 p-3 rounded-md text-center">
                <p className="font-semibold">NICEIC</p>
                <p className="text-sm">(National Inspection Council for Electrical Installation Contracting)</p>
              </div>
              
              <div className="bg-elec-dark/50 p-3 rounded-md text-center">
                <p className="font-semibold">ELECSA</p>
                <p className="text-sm">(Part of Certsure with NICEIC)</p>
              </div>
              
              <div className="bg-elec-dark/50 p-3 rounded-md text-center">
                <p className="font-semibold">NAPIT</p>
                <p className="text-sm">(National Association of Professional Inspectors and Testers)</p>
              </div>
            </div>
            
            <div className="mt-4 bg-elec-dark/70 p-4 rounded-md border border-elec-yellow/20">
              <h4 className="font-semibold text-elec-yellow mb-2">Benefits of Registration:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ability to self-certify compliant work</li>
                <li>Demonstrable proof of competence to clients</li>
                <li>Regular assessment ensures standards are maintained</li>
                <li>Work covered by insurance-backed warranties</li>
                <li>Technical support and updates on regulatory changes</li>
              </ul>
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

export default Subsection5_1;
