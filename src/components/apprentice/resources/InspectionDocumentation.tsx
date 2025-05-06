
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
        <div className="space-y-6">
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ClipboardList className="mr-3 h-5 w-5" /> Standardized Forms
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Using standardized forms ensures consistency in inspections and makes it easier to track trends over time. Well-designed forms guide inspectors to examine all relevant aspects of the workplace.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Key Elements of Inspection Forms:</h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-elec-light/90">
                  <li>
                    <span className="font-medium">Header Information:</span>
                    <ul className="list-circle pl-5 mt-1">
                      <li>Date and time of inspection</li>
                      <li>Location/area inspected</li>
                      <li>Inspector's name and position</li>
                      <li>Type of inspection (daily, weekly, monthly)</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Inspection Items:</span>
                    <ul className="list-circle pl-5 mt-1">
                      <li>Clearly defined categories (equipment, environment, etc.)</li>
                      <li>Specific items to check within each category</li>
                      <li>Compliance rating system (Yes/No/N/A or numeric scale)</li>
                      <li>Space for detailed observations</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-medium">Action Plan Section:</span>
                    <ul className="list-circle pl-5 mt-1">
                      <li>Description of hazards or issues found</li>
                      <li>Risk rating for prioritization</li>
                      <li>Recommended corrective actions</li>
                      <li>Responsibility assignment</li>
                      <li>Target completion dates</li>
                    </ul>
                  </li>
                </ul>
              </div>
              
              <p className="text-elec-light/90">
                Electronic forms can streamline the process and automatically feed into tracking systems. However, paper forms should also be available as backups or for areas where electronic devices are not practical.
              </p>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileText className="mr-3 h-5 w-5" /> Recording Findings
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Thorough documentation of inspection findings creates an audit trail and helps ensure that issues are addressed appropriately.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Best Practices for Recording Findings:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Be specific and detailed in describing hazards (e.g., "Frayed electrical cord on drill press in northeast corner" rather than just "damaged cord")</li>
                  <li>Document even minor issues, as these can develop into serious hazards if left unaddressed</li>
                  <li>Use clear, non-technical language that anyone reading the report can understand</li>
                  <li>Take photographs of hazards when possible to provide visual evidence</li>
                  <li>Record measurements or readings where applicable (e.g., light levels, noise levels)</li>
                  <li>Note both compliance and non-compliance to provide a balanced view</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Example Documentation Entry:</h3>
                <div className="text-elec-light/90 bg-elec-dark/70 p-3 rounded-md">
                  <p><strong>Hazard:</strong> Extension lead running across walkway to power circular saw.</p>
                  <p><strong>Location:</strong> Main workshop, central aisle</p>
                  <p><strong>Risk Level:</strong> Medium (trip hazard, potential for equipment damage)</p>
                  <p><strong>Corrective Action:</strong> Reroute cable overhead using cable management system or relocate power source closer to workstation</p>
                  <p><strong>Responsible Person:</strong> John Smith (Site Supervisor)</p>
                  <p><strong>Target Date:</strong> 15/05/2025</p>
                  <p><strong>Photo Reference:</strong> IMG_0023</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <FileSearch className="mr-3 h-5 w-5" /> Tracking Corrective Actions
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                A robust tracking system ensures that identified hazards are addressed in a timely manner and that nothing falls through the cracks.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Assignment Process</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Clearly designate responsibility for each corrective action</li>
                    <li>Ensure the assigned person has authority and resources to implement the action</li>
                    <li>Set realistic but prompt deadlines based on risk level</li>
                    <li>Communicate assignments in writing to responsible parties</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Follow-Up Procedures</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-elec-light/90">
                    <li>Schedule regular reviews of outstanding actions</li>
                    <li>Send reminders as deadlines approach</li>
                    <li>Verify completion of actions before closing them out</li>
                    <li>Document verification with date and inspector name</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Tracking Tools:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>
                    <span className="font-medium">Action Registers:</span> Spreadsheets or databases that list all identified hazards and track their status
                  </li>
                  <li>
                    <span className="font-medium">Digital Platforms:</span> Safety management software that can automate notifications and track progress
                  </li>
                  <li>
                    <span className="font-medium">Visual Management Boards:</span> Physical displays in the workplace showing outstanding safety actions and their status
                  </li>
                  <li>
                    <span className="font-medium">Regular Reports:</span> Weekly or monthly summaries of open actions and their progress
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-elec-dark p-6 rounded-lg border border-elec-yellow/20">
            <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
              <ChartBar className="mr-3 h-5 w-5" /> Analyzing Trends
            </h2>
            <div className="space-y-4">
              <p className="text-elec-light/90">
                Analyzing inspection data over time can reveal patterns and systemic issues that might not be apparent from individual inspections.
              </p>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">What to Analyze:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Frequency of specific types of hazards (e.g., electrical, housekeeping, PPE)</li>
                  <li>Locations or departments with higher rates of findings</li>
                  <li>Recurring issues that appear despite corrective actions</li>
                  <li>Seasonal or time-related patterns in hazard identification</li>
                  <li>Correlation between inspection findings and incident reports</li>
                  <li>Effectiveness and timeliness of corrective actions</li>
                </ul>
              </div>
              
              <div className="bg-elec-dark/50 p-4 rounded-md border border-elec-yellow/10">
                <h3 className="font-medium text-elec-yellow mb-2">Using Analysis for Improvement:</h3>
                <ul className="list-disc pl-5 space-y-2 text-elec-light/90">
                  <li>Identify root causes of recurring issues</li>
                  <li>Adjust inspection frequencies or focus areas based on findings</li>
                  <li>Develop targeted safety training based on common hazards</li>
                  <li>Revise procedures or controls for problem areas</li>
                  <li>Allocate resources to address systemic issues</li>
                  <li>Track improvement over time to measure effectiveness of safety programs</li>
                </ul>
              </div>
              
              <p className="text-elec-light/90 mt-4">
                Regular reporting of trends to management and workers helps maintain focus on safety improvement and demonstrates the value of the inspection program.
              </p>
            </div>
          </section>
          
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
    </div>
  );
};

export default InspectionDocumentation;
