
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Scale, FileCheck, FlagTriangleRight } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionRegulations = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.1">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Workplace Inspection Procedures
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Regulations and Standards for Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Key legislation, regulations, and industry standards that govern workplace inspections in the electrical sector.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <BookOpen className="mr-3 h-5 w-5" /> Primary Legislation
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Core laws that establish the legal requirements for workplace safety and inspections.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Health and Safety at Work Act 1974</span>: Foundational legislation establishing general duties</li>
                <li><span className="font-medium text-white">Management of Health and Safety at Work Regulations 1999</span>: Requirements for risk assessment</li>
                <li><span className="font-medium text-white">Electricity at Work Regulations 1989</span>: Specific requirements for electrical safety</li>
                <li><span className="font-medium text-white">Construction (Design and Management) Regulations 2015</span>: For construction sites</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileCheck className="mr-3 h-5 w-5" /> Industry Standards
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Technical standards that provide detailed guidance for electrical safety and inspections.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">BS 7671</span>: Requirements for Electrical Installations (IET Wiring Regulations)</li>
                <li><span className="font-medium text-white">IET Code of Practice</span>: For In-Service Inspection and Testing of Electrical Equipment</li>
                <li><span className="font-medium text-white">BS EN 61439</span>: Low-voltage switchgear and controlgear assemblies</li>
                <li><span className="font-medium text-white">HSG85</span>: HSE guidance on electrical safety</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Scale className="mr-3 h-5 w-5" /> Regulatory Requirements
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Specific obligations for inspections under key legislation.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Regular Inspections</span>: MHSWR 1999 requires suitable and sufficient risk assessment</li>
                <li><span className="font-medium text-white">Competent Persons</span>: Requirement for properly trained and qualified inspectors</li>
                <li><span className="font-medium text-white">Documentation</span>: Legal obligation to record significant findings</li>
                <li><span className="font-medium text-white">Equipment Testing</span>: PUWER 1998 requires inspection and maintenance of work equipment</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FlagTriangleRight className="mr-3 h-5 w-5" /> Enforcement
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Regulatory bodies and consequences of non-compliance with inspection requirements.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Health and Safety Executive (HSE)</span>: Primary enforcement agency</li>
                <li><span className="font-medium text-white">Local Authorities</span>: Enforcement in certain premises</li>
                <li><span className="font-medium text-white">Improvement Notices</span>: Requiring improvements to be made within a specified period</li>
                <li><span className="font-medium text-white">Prohibition Notices</span>: Stopping work activities until remedial action is taken</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Inspection Frequency Requirements</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-white border-b border-elec-yellow/30">
                <tr>
                  <th scope="col" className="px-4 py-3">Inspection Type</th>
                  <th scope="col" className="px-4 py-3">Legislation/Standard</th>
                  <th scope="col" className="px-4 py-3">Typical Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-elec-yellow/10 text-elec-light/90">
                <tr>
                  <td className="px-4 py-3">Fixed Installation Testing</td>
                  <td className="px-4 py-3">BS 7671</td>
                  <td className="px-4 py-3">Every 1-5 years depending on premises type</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Portable Appliance Testing</td>
                  <td className="px-4 py-3">IET Code of Practice</td>
                  <td className="px-4 py-3">3 months to 4 years based on equipment type and usage</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Workplace Safety Inspection</td>
                  <td className="px-4 py-3">MHSWR 1999</td>
                  <td className="px-4 py-3">Based on risk assessment - typically monthly</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Access Equipment</td>
                  <td className="px-4 py-3">WAHR 2005</td>
                  <td className="px-4 py-3">Before use and periodic thorough examination</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionRegulations;
