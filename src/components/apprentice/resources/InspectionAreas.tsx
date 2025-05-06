
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
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Eye className="mr-3 h-5 w-5" /> Work Environment
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                The physical work environment can present numerous hazards if not properly maintained and organized. Regular inspections should examine various aspects of the workspace.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Access and Egress</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Clear pathways without obstructions</li>
                    <li>Properly marked emergency exits</li>
                    <li>Adequate width for equipment movement</li>
                    <li>Stable walkways and platforms</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Lighting and Visibility</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Sufficient illumination for tasks</li>
                    <li>Working emergency lighting</li>
                    <li>No glare or shadow issues</li>
                    <li>Consistent lighting throughout work areas</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Ventilation and Temperature</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Adequate air circulation</li>
                    <li>Functioning exhaust systems</li>
                    <li>Temperature suitable for work conditions</li>
                    <li>Humidity control where necessary</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Housekeeping</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Clean and orderly work areas</li>
                    <li>Proper waste disposal</li>
                    <li>Management of cables and leads</li>
                    <li>Organized storage of materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Wrench className="mr-3 h-5 w-5" /> Tools and Equipment
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Electrical work relies on properly functioning and safe tools and equipment. Regular inspection of these items is critical for preventing accidents and ensuring quality work.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Hand Tools</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Condition of handles and grips</li>
                    <li>Proper insulation for electrical tools</li>
                    <li>No cracks, splits, or damage</li>
                    <li>Correct tools for the job available</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Test Equipment</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Calibration status and certificates</li>
                    <li>Condition of probes and leads</li>
                    <li>Battery condition and functionality</li>
                    <li>Proper storage when not in use</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">PPE (Personal Protective Equipment)</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Condition of safety gloves and boots</li>
                    <li>Availability of appropriate PPE</li>
                    <li>Eye and face protection integrity</li>
                    <li>Proper storage and maintenance</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Electrical Equipment</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Portable appliance testing (PAT) status</li>
                    <li>Condition of power cords and plugs</li>
                    <li>Functioning of safety features</li>
                    <li>Proper grounding and connections</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ShieldCheck className="mr-3 h-5 w-5" /> Safety Systems
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Safety systems are designed to prevent accidents or minimize their impact. Regular inspection ensures these critical systems remain effective and operational.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Fire Protection</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Fire extinguisher condition and expiry dates</li>
                    <li>Fire alarm functionality</li>
                    <li>Fire exit signage and accessibility</li>
                    <li>Fire prevention measures</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">First Aid</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>First aid supplies adequacy</li>
                    <li>Emergency contact information posted</li>
                    <li>Location of nearest medical facilities</li>
                    <li>Presence of trained first aiders</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Emergency Systems</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Emergency lighting function</li>
                    <li>Emergency stop buttons/switches</li>
                    <li>Evacuation procedures posted</li>
                    <li>Assembly point identification</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Signage</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Hazard warnings and notices</li>
                    <li>Electrical danger signs</li>
                    <li>Mandatory PPE signage</li>
                    <li>Emergency information signs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Documentation
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Safety documentation provides evidence of compliance and guidance for safe working. Inspections should verify that all required documentation is current and accessible.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Risk Assessments</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Current and relevant to tasks</li>
                    <li>Accessible to workers</li>
                    <li>Reviewed and updated regularly</li>
                    <li>Specific to electrical hazards</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Method Statements</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Detailed procedures for high-risk tasks</li>
                    <li>Clear step-by-step instructions</li>
                    <li>Safety precautions highlighted</li>
                    <li>Emergency procedures included</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Training Records</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Current certifications for workers</li>
                    <li>Specialized training for specific tasks</li>
                    <li>Refresher training status</li>
                    <li>Induction records for new workers</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Previous Inspections</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Records of previous findings</li>
                    <li>Corrective action status</li>
                    <li>Trend analysis of recurring issues</li>
                    <li>Follow-up verification</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
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
    </div>
  );
};

export default InspectionAreas;
