
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react";
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
            Types of Workplace Safety Inspections
          </h1>
          <p className="text-elec-light/80 max-w-2xl mx-auto">
            Different types of inspections serve various purposes and should be conducted at appropriate intervals.
          </p>
        </div>
        
        {/* Content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Clock className="mr-3 h-5 w-5" /> Routine Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Regular scheduled inspections form the backbone of a preventative safety program.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Daily Inspections</span>: Quick checks of work areas, tools and equipment before starting work</li>
                <li><span className="font-medium text-white">Weekly Inspections</span>: More thorough examination of specific areas or equipment on rotation</li>
                <li><span className="font-medium text-white">Monthly Inspections</span>: Comprehensive inspections of all workplace areas and systems</li>
                <li><span className="font-medium text-white">Quarterly/Annual Audits</span>: Deep reviews of safety systems, documentation and compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <AlertTriangle className="mr-3 h-5 w-5" /> Incident-Triggered Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Special inspections conducted following an incident or near-miss to identify causes and prevent recurrence.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Post-Accident Investigation</span>: Detailed examination of accident scene and contributing factors</li>
                <li><span className="font-medium text-white">Near-Miss Follow-up</span>: Investigation of conditions that almost caused an incident</li>
                <li><span className="font-medium text-white">Complaint Response</span>: Inspection following worker or public safety concerns</li>
                <li><span className="font-medium text-white">Return to Work</span>: Special inspections before resuming work after significant incidents</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <CheckCircle className="mr-3 h-5 w-5" /> Focused Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Targeted inspections that concentrate on specific aspects of workplace safety.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Equipment-Specific</span>: Detailed inspection of critical equipment or machinery</li>
                <li><span className="font-medium text-white">Task-Specific</span>: Inspection focused on particular high-risk tasks or procedures</li>
                <li><span className="font-medium text-white">System-Specific</span>: Review of particular safety systems like fire protection or emergency response</li>
                <li><span className="font-medium text-white">Compliance-Focused</span>: Inspection targeting specific regulatory requirements</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <Calendar className="mr-3 h-5 w-5" /> Project Phase Inspections
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Inspections conducted at critical points in electrical project lifecycles.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-sm text-elec-light/90">
                <li><span className="font-medium text-white">Pre-Start Inspections</span>: Before beginning work on a new project or site</li>
                <li><span className="font-medium text-white">Installation Phase</span>: During critical stages of electrical installation work</li>
                <li><span className="font-medium text-white">Pre-Commissioning</span>: Before energizing new electrical systems</li>
                <li><span className="font-medium text-white">Handover Inspections</span>: Final safety checks before client acceptance</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4">Key Principles for Effective Inspections</h2>
          <ul className="list-disc pl-6 space-y-2 text-elec-light/90">
            <li>Use standardized checklists appropriate for each inspection type</li>
            <li>Ensure inspections are conducted by qualified individuals</li>
            <li>Maintain consistent frequency according to established schedules</li>
            <li>Document all findings thoroughly with evidence</li>
            <li>Follow up on all identified issues with appropriate corrective actions</li>
            <li>Review inspection processes regularly for continued effectiveness</li>
            <li>Communicate findings and lessons learned throughout the organization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspectionTypes;
