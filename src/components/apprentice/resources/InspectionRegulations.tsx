
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, BookOpen, AlertCircle } from "lucide-react";
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
            Legal Requirements for Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Understanding the regulatory framework that governs workplace inspections in electrical work environments.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Scale className="mr-3 h-5 w-5" /> Primary Legislation
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Key laws that establish the requirement for workplace inspections.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Health and Safety at Work Act 1974</span>: Establishes general duties for employers to ensure workplace safety</li>
                <li><span className="font-medium text-white">Management of Health and Safety at Work Regulations 1999</span>: Requires risk assessments and safety management systems</li>
                <li><span className="font-medium text-white">Electricity at Work Regulations 1989</span>: Specific requirements for electrical safety</li>
                <li><span className="font-medium text-white">Workplace (Health, Safety and Welfare) Regulations 1992</span>: Sets standards for the physical work environment</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Regulatory Requirements
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Specific requirements for inspections under health and safety regulations.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Regular Inspections</span>: Legal requirement to inspect workplaces at suitable intervals</li>
                <li><span className="font-medium text-white">Competent Persons</span>: Inspections must be conducted by people with adequate knowledge</li>
                <li><span className="font-medium text-white">Record Keeping</span>: Legal obligation to document inspection findings</li>
                <li><span className="font-medium text-white">Equipment Inspection</span>: Specific requirements for testing and inspecting work equipment</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <BookOpen className="mr-3 h-5 w-5" /> Industry Standards
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Standards and guidance that inform best practice for electrical workplace inspections.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">BS 7671</span>: Requirements for Electrical Installations (IET Wiring Regulations)</li>
                <li><span className="font-medium text-white">HSE Guidance</span>: Health and Safety Executive guides on workplace inspection</li>
                <li><span className="font-medium text-white">Industry Codes</span>: Electrical industry codes of practice for inspections</li>
                <li><span className="font-medium text-white">ECA/JIB Standards</span>: Trade body guidance on electrical safety inspections</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <AlertCircle className="mr-3 h-5 w-5" /> Enforcement and Compliance
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Consequences of failing to meet inspection requirements and enforcement mechanisms.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">HSE Inspections</span>: Regulatory visits and powers of health and safety inspectors</li>
                <li><span className="font-medium text-white">Improvement Notices</span>: Legal orders requiring safety improvements within a timeframe</li>
                <li><span className="font-medium text-white">Prohibition Notices</span>: Orders to stop dangerous activities immediately</li>
                <li><span className="font-medium text-white">Prosecution and Fines</span>: Legal consequences for serious breaches of safety regulations</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Key Legal Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
            <li>Conduct suitable and sufficient risk assessments</li>
            <li>Implement a planned inspection program with appropriate frequency</li>
            <li>Document all inspection findings and corrective actions</li>
            <li>Ensure inspections are conducted by competent personnel</li>
            <li>Take timely action to address identified hazards</li>
            <li>Review and update inspection procedures regularly</li>
            <li>Consult with workers and safety representatives on inspection processes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspectionRegulations;
