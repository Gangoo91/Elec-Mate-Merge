
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, ClipboardList, FileSearch, ChartBar } from "lucide-react";
import { Link } from "react-router-dom";

const InspectionDocumentation = () => {
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
            Documentation Process for Workplace Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Effective documentation is essential for tracking hazards, ensuring accountability, and maintaining a record of safety efforts.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ClipboardList className="mr-3 h-5 w-5" /> Standardized Forms
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Using standardized forms ensures consistency in inspections and makes it easier to track trends over time.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Header Information</span>: Date, time, location, inspector's name and position</li>
                <li><span className="font-medium text-white">Inspection Categories</span>: Organized sections for different types of hazards</li>
                <li><span className="font-medium text-white">Compliance Rating</span>: Yes/No/N/A or numeric scale for each item</li>
                <li><span className="font-medium text-white">Action Planning</span>: Sections for corrective actions, responsibilities and due dates</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Recording Findings
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Thorough documentation of inspection findings creates an audit trail and ensures issues are addressed.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Detailed Descriptions</span>: Specific information about each hazard or issue found</li>
                <li><span className="font-medium text-white">Risk Assessment</span>: Evaluation of the severity and likelihood of each hazard</li>
                <li><span className="font-medium text-white">Visual Evidence</span>: Photographs of hazards to provide clear documentation</li>
                <li><span className="font-medium text-white">Contextual Information</span>: Work activities and conditions at the time of inspection</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileSearch className="mr-3 h-5 w-5" /> Tracking Corrective Actions
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                A robust tracking system ensures that identified hazards are addressed in a timely manner.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Assignment Process</span>: Clear designation of responsibility for each corrective action</li>
                <li><span className="font-medium text-white">Follow-Up Procedures</span>: Regular reviews of outstanding actions and verification</li>
                <li><span className="font-medium text-white">Tracking Tools</span>: Action registers, digital platforms or visual management boards</li>
                <li><span className="font-medium text-white">Escalation Process</span>: Procedures for when corrective actions are not completed</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ChartBar className="mr-3 h-5 w-5" /> Analyzing Trends
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Analyzing inspection data over time can reveal patterns and systemic issues.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Data Collection</span>: Gathering information from multiple inspections for analysis</li>
                <li><span className="font-medium text-white">Pattern Identification</span>: Spotting recurring issues across locations or time periods</li>
                <li><span className="font-medium text-white">Root Cause Analysis</span>: Investigating underlying causes of repeated findings</li>
                <li><span className="font-medium text-white">Prevention Planning</span>: Using trend data to develop preventative measures</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Documentation Best Practices</h2>
          <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
            <li>Keep inspection records for a minimum of three years (or as required by regulations)</li>
            <li>Make records accessible to relevant stakeholders while maintaining confidentiality</li>
            <li>Use clear file naming conventions and organized storage systems</li>
            <li>Regularly back up electronic documentation</li>
            <li>Review and update documentation processes as part of continuous improvement</li>
            <li>Ensure inspection forms align with current regulations and company policies</li>
            <li>Train inspectors on proper documentation techniques and importance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspectionDocumentation;
