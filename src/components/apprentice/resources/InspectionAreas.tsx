
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Wrench, ShieldCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionAreas = () => {
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
            What to Inspect: Key Areas for Electrical Workplace Safety
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Comprehensive workplace inspections should cover these key areas to ensure all potential hazards are identified and addressed.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Eye className="mr-3 h-5 w-5" /> Work Environment
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                The physical work environment can present numerous hazards if not properly maintained and organized.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Access and Egress</span>: Clear pathways without obstructions, properly marked emergency exits</li>
                <li><span className="font-medium text-white">Lighting and Visibility</span>: Sufficient illumination for tasks, working emergency lighting</li>
                <li><span className="font-medium text-white">Ventilation and Temperature</span>: Adequate air circulation, functioning exhaust systems</li>
                <li><span className="font-medium text-white">Housekeeping</span>: Clean and orderly work areas, proper waste disposal</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Wrench className="mr-3 h-5 w-5" /> Tools and Equipment
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Electrical work relies on properly functioning and safe tools and equipment for preventing accidents.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Hand Tools</span>: Condition of handles and grips, proper insulation for electrical tools</li>
                <li><span className="font-medium text-white">Test Equipment</span>: Calibration status and certificates, condition of probes and leads</li>
                <li><span className="font-medium text-white">PPE</span>: Condition of safety gloves and boots, availability of appropriate PPE</li>
                <li><span className="font-medium text-white">Electrical Equipment</span>: PAT testing status, condition of power cords and plugs</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ShieldCheck className="mr-3 h-5 w-5" /> Safety Systems
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Safety systems are designed to prevent accidents or minimize their impact.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Fire Protection</span>: Fire extinguisher condition and expiry dates, fire alarm functionality</li>
                <li><span className="font-medium text-white">First Aid</span>: First aid supplies adequacy, emergency contact information posted</li>
                <li><span className="font-medium text-white">Emergency Systems</span>: Emergency lighting function, emergency stop buttons/switches</li>
                <li><span className="font-medium text-white">Signage</span>: Hazard warnings and notices, electrical danger signs</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Documentation
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Safety documentation provides evidence of compliance and guidance for safe working.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Risk Assessments</span>: Current and relevant to tasks, accessible to workers</li>
                <li><span className="font-medium text-white">Method Statements</span>: Detailed procedures for high-risk tasks, clear step-by-step instructions</li>
                <li><span className="font-medium text-white">Training Records</span>: Current certifications for workers, specialized training for specific tasks</li>
                <li><span className="font-medium text-white">Previous Inspections</span>: Records of previous findings, corrective action status</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Best Practices for Inspections</h2>
          <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
            <li>Use standardized checklists to ensure consistency</li>
            <li>Involve workers in the inspection process</li>
            <li>Take photographs of hazards as evidence</li>
            <li>Prioritize findings based on risk level</li>
            <li>Assign clear responsibility for corrective actions</li>
            <li>Set realistic deadlines for issue resolution</li>
            <li>Verify that corrective actions have been completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspectionAreas;
