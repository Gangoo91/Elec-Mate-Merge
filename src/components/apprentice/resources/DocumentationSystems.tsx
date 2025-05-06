
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentationSystems = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      {/* Back button */}
      <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation/unit/elec2-01/section/2/subsection/2.3">
        <Button variant="outline" className="mb-8 border-elec-yellow/30 hover:bg-elec-yellow/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Safety Communication
        </Button>
      </Link>
      
      {/* Main content */}
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow mb-2">
            Safety Documentation Systems
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Proper documentation creates records of safety communications, ensuring accountability and creating a traceable information flow.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Types of Safety Documentation</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Risk Assessments</h3>
                <p className="text-elec-light/90 mb-2">Formal evaluations of potential hazards and the control measures required to mitigate them.</p>
                <p className="text-elec-light/70 text-sm italic">Required for all electrical work activities with significant risks.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Method Statements</h3>
                <p className="text-elec-light/90 mb-2">Step-by-step procedures for completing tasks safely, incorporating risk assessment findings.</p>
                <p className="text-elec-light/70 text-sm italic">Particularly important for complex or high-risk electrical installations.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Toolbox Talk Records</h3>
                <p className="text-elec-light/90 mb-2">Documentation of daily safety briefings, including topics covered and attendees.</p>
                <p className="text-elec-light/70 text-sm italic">Provides evidence of ongoing safety communication and training.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Incident Reports</h3>
                <p className="text-elec-light/90 mb-2">Detailed records of accidents, near-misses, and safety violations with investigation findings.</p>
                <p className="text-elec-light/70 text-sm italic">Critical for preventing recurrence and demonstrating regulatory compliance.</p>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Electrical Installation Certificates</h3>
                <p className="text-elec-light/90 mb-2">Documentation confirming that electrical work meets required safety standards.</p>
                <p className="text-elec-light/70 text-sm italic">Legally required for most electrical installation work.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Management Systems</h2>
            <div className="space-y-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Paper-Based Systems</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Traditional forms and files organized in binders or folders</li>
                  <li>Accessible without technology but requires physical storage space</li>
                  <li>Can be difficult to search and analyze for trends</li>
                  <li>Still used in many workplaces, especially for signed documents</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Digital Documentation Systems</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Electronic forms and databases that store safety documentation</li>
                  <li>Enables quick searching, analysis, and sharing of information</li>
                  <li>Can include automated reminders for reviews and updates</li>
                  <li>Requires technology access and backup systems</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Mobile Documentation Apps</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Smartphone or tablet applications for creating and accessing documentation</li>
                  <li>Enables real-time documentation directly at the worksite</li>
                  <li>Can include photo/video evidence and GPS location tagging</li>
                  <li>Synchronizes with central systems to ensure data consistency</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Templates</h2>
            <p className="mb-4">Standardized templates ensure consistent and complete documentation:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 h-full">
                <h3 className="font-medium text-elec-yellow mb-2">Risk Assessment Template</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Hazard identification section</li>
                  <li>Risk rating methodology</li>
                  <li>Control measures required</li>
                  <li>Residual risk evaluation</li>
                  <li>Review and sign-off sections</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 h-full">
                <h3 className="font-medium text-elec-yellow mb-2">Method Statement Template</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Project details and scope</li>
                  <li>Required resources and PPE</li>
                  <li>Step-by-step procedure</li>
                  <li>Safety considerations for each step</li>
                  <li>Emergency procedures</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 h-full">
                <h3 className="font-medium text-elec-yellow mb-2">Toolbox Talk Record Template</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Date, time, and location</li>
                  <li>Topics discussed</li>
                  <li>Attendee register with signatures</li>
                  <li>Questions raised</li>
                  <li>Follow-up actions required</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10 h-full">
                <h3 className="font-medium text-elec-yellow mb-2">Incident Report Template</h3>
                <ul className="list-disc pl-6 text-elec-light/90">
                  <li>Incident details (date, time, location)</li>
                  <li>Persons involved</li>
                  <li>Description of what happened</li>
                  <li>Immediate actions taken</li>
                  <li>Root cause analysis</li>
                  <li>Corrective actions required</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
              <li>Maintain consistent documentation formats across the organization</li>
              <li>Ensure documentation is clear, concise, and using plain language</li>
              <li>Include version control to track changes to safety documents</li>
              <li>Establish a regular review schedule for all safety documentation</li>
              <li>Ensure documentation is readily accessible to all who need it</li>
              <li>Train workers on how to properly complete safety documentation</li>
              <li>Back up all safety documentation and protect confidential information</li>
              <li>Use documentation to identify trends and improve safety performance</li>
            </ul>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4">Legal Requirements</h2>
            <p className="mb-4">Many safety documents must be retained for specific periods to comply with regulations:</p>
            <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
              <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
                <li>Risk assessments: Minimum 5 years or until superseded</li>
                <li>Accident reports: Minimum 3 years after the date of the incident</li>
                <li>Electrical installation certificates: For the life of the installation</li>
                <li>Training records: Duration of employment plus 2 years</li>
                <li>Equipment inspection records: 2 years from the inspection date</li>
              </ul>
              <p className="mt-3 text-elec-light/70 text-sm italic">Always verify current legal requirements for document retention in your jurisdiction.</p>
            </div>
          </section>
        </div>
        
        {/* Templates */}
        <div className="bg-elec-dark/70 p-6 rounded-lg border border-elec-yellow/20 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Risk Assessment Template (DOCX)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Method Statement Template (DOCX)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Toolbox Talk Record Sheet (PDF)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Incident Report Form (DOCX)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Safety Meeting Minutes Template (DOCX)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/30 rounded-md">
              <FileText className="text-elec-yellow h-5 w-5" />
              <span>Safety Documentation Checklist (PDF)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationSystems;
