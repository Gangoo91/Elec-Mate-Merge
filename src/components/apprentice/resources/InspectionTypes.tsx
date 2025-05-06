
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ClipboardCheck, FileCheck, Eye, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionTypes = () => {
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
            Types of Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Understanding the different types of workplace inspections is crucial for maintaining safety standards in electrical work environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ClipboardCheck className="mr-3 h-5 w-5" /> Routine Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Regular inspections conducted on a planned schedule to proactively identify hazards before they cause incidents.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Frequency</span>: Daily, weekly, monthly, or quarterly</li>
                <li><span className="font-medium text-white">Scope</span>: General workplace conditions, equipment, and practices</li>
                <li><span className="font-medium text-white">Performed by</span>: Supervisors, safety representatives, or designated inspectors</li>
                <li><span className="font-medium text-white">Documentation</span>: Standardized checklists and forms</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileCheck className="mr-3 h-5 w-5" /> Compliance Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Inspections specifically designed to ensure adherence to regulations, standards, and legal requirements.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Frequency</span>: As required by regulations or internal policies</li>
                <li><span className="font-medium text-white">Scope</span>: Focused on regulatory compliance areas</li>
                <li><span className="font-medium text-white">Performed by</span>: Regulatory officials, quality assurance personnel, or safety officers</li>
                <li><span className="font-medium text-white">Documentation</span>: Detailed reports with compliance verification</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Eye className="mr-3 h-5 w-5" /> Specialized Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Focused inspections that target specific equipment, operations, or high-risk areas.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Frequency</span>: Based on risk assessment and operational needs</li>
                <li><span className="font-medium text-white">Scope</span>: Specific systems, equipment, or processes</li>
                <li><span className="font-medium text-white">Performed by</span>: Subject matter experts and specialists</li>
                <li><span className="font-medium text-white">Documentation</span>: Specialized technical reports</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ShieldCheck className="mr-3 h-5 w-5" /> Incident-Triggered Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Reactive inspections conducted after an accident, near-miss, or reported hazard.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Frequency</span>: As needed following incidents</li>
                <li><span className="font-medium text-white">Scope</span>: Areas, equipment, or processes involved in the incident</li>
                <li><span className="font-medium text-white">Performed by</span>: Incident investigation teams</li>
                <li><span className="font-medium text-white">Documentation</span>: Detailed incident reports with corrective actions</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Best Practices for Effective Inspections</h2>
          <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
            <li>Use standardized checklists tailored to your workplace</li>
            <li>Involve workers from different levels in the inspection process</li>
            <li>Clearly communicate findings and corrective actions</li>
            <li>Follow up on identified hazards to ensure they are addressed</li>
            <li>Document all inspection activities and outcomes</li>
            <li>Review inspection data over time to identify trends</li>
            <li>Adjust inspection frequency based on risk assessment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspectionTypes;
