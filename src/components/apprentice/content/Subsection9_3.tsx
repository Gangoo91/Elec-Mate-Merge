
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Search, AlertTriangle } from "lucide-react";

interface Subsection9_3Props {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const Subsection9_3 = ({ subsectionId, isCompleted, markAsComplete }: Subsection9_3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-elec-yellow">Certification and Reporting</h2>
      
      <div className="space-y-4">
        <p>
          Documentation is a critical element of electrical installation work. Proper certification and reporting
          provide evidence of compliance and safety, as well as important information for future reference.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Types of Certification
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Electrical Installation Certificate (EIC)</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Used for new installations</li>
                <li>Used for alterations or additions to existing installations</li>
                <li>Requires design, construction, and inspection/testing sections</li>
                <li>May be completed by different competent persons</li>
                <li>Must be accompanied by schedules of inspections and test results</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Minor Electrical Installation Works Certificate (MEIWC)</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Used for minor works that don't include a new circuit</li>
                <li>Examples: additional socket to existing circuit, replacement accessories</li>
                <li>Simpler form than full EIC</li>
                <li>Contains essential safety information</li>
                <li>Still requires appropriate testing</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Electrical Installation Condition Report (EICR):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>For inspection of existing installations</li>
                  <li>Periodic inspection (recommended intervals based on installation type)</li>
                  <li>Includes observations and recommendations</li>
                  <li>Classification of condition codes (C1, C2, C3, FI)</li>
                  <li>Overall assessment of installation condition</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-elec-yellow flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Supporting Documentation
            </h3>
            <div className="space-y-3">
              <h4 className="font-semibold">Schedule of Inspections</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Comprehensive checklist of visual inspection items</li>
                <li>Verification of methods of protection</li>
                <li>Selection and erection verification</li>
                <li>Identification of items inspected</li>
                <li>Confirmation of compliance or non-compliance</li>
              </ul>
              
              <h4 className="font-semibold mt-4">Schedule of Test Results</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Details of all circuits tested</li>
                <li>Record of all test measurements</li>
                <li>Circuit descriptions and locations</li>
                <li>Cable and protective device information</li>
                <li>Reference to maximum permitted values</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Additional Documentation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Distribution board schedules</li>
                  <li>Operation and maintenance instructions</li>
                  <li>As-installed drawings and diagrams</li>
                  <li>Manufacturer's instructions for specialist equipment</li>
                  <li>Risk assessments and method statements (as applicable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-elec-dark/30 border border-elec-yellow/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-elec-yellow mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Completion and Handover
          </h3>
          
          <div className="space-y-4">
            <p>The proper completion and handover of certification is a legal requirement:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Certification Requirements</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Completion by competent persons</span>
                    <p className="text-sm mt-1">Design, construction, and inspection/testing roles</p>
                  </li>
                  <li>
                    <span className="font-medium">Accurate completion</span>
                    <p className="text-sm mt-1">All fields completed, no blank sections</p>
                  </li>
                  <li>
                    <span className="font-medium">Clear declarations</span>
                    <p className="text-sm mt-1">Explicit statements of compliance or limitations</p>
                  </li>
                  <li>
                    <span className="font-medium">Original signatures</span>
                    <p className="text-sm mt-1">Handwritten or secure electronic signatures</p>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Handover Procedures</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Distribution of documentation</span>
                    <p className="text-sm mt-1">Original to client, copy retained by contractor</p>
                  </li>
                  <li>
                    <span className="font-medium">Explanation to client</span>
                    <p className="text-sm mt-1">Clear explanation of certificates and results</p>
                  </li>
                  <li>
                    <span className="font-medium">User information</span>
                    <p className="text-sm mt-1">Operating instructions for special equipment</p>
                  </li>
                  <li>
                    <span className="font-medium">Retention period</span>
                    <p className="text-sm mt-1">Minimum recommended retention of documentation</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-elec-dark/70 rounded-lg text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Regulatory Note:</p>
              <p>BS 7671 requires that electrical installation certificates be issued for all new installations, alterations, and additions. Regulation 644.4 requires that the inspector provide a clear "unsatisfactory" or "satisfactory" conclusion on condition reports. Certification must indicate compliance with BS 7671, or detail any departures from the standard. Building Regulations also require appropriate certification for notifiable electrical work.</p>
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

export default Subsection9_3;
