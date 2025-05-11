
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection5_2/IntroSection";
import CompletionButton from "../shared/CompletionButton";
import { 
  AlertTriangle, 
  FileText, 
  Users, 
  MessageSquare, 
  FileWarning, 
  CheckCircle, 
  Clipboard, 
  Eye
} from "lucide-react";

const Subsection5_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Reporting Procedures Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-elec-yellow">Formal Hazard Reporting Procedures</h3>
        
        <p className="text-sm md:text-base mb-4">
          Understanding and following the correct reporting procedures ensures that hazards are addressed promptly and effectively.
          Every workplace should have established protocols for reporting hazards that all workers must follow.
        </p>
        
        {/* Horizontal Layout for Reporting Process */}
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Initial Reporting</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Immediate Action:</span> If the hazard presents an immediate danger, take appropriate steps to make the area safe if possible and alert others nearby.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Verbal Report:</span> Notify your supervisor or safety representative verbally as soon as the hazard is identified.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Written Documentation:</span> Complete the required hazard report form, providing detailed information about the nature and location of the hazard.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <Users className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Reporting Chain</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Direct Supervisor:</span> Your immediate supervisor is typically the first point of contact for reporting hazards.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Health & Safety Rep:</span> If your supervisor is unavailable or the issue remains unresolved, contact your workplace safety representative.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Management:</span> Escalate to senior management if the hazard is significant or if there's been no response to initial reports.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">External Authorities:</span> For serious unresolved hazards, contact the HSE or other relevant regulatory bodies as a last resort.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <MessageSquare className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Follow-Up Process</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Hazard Investigation:</span> Supervisors should investigate reported hazards promptly, typically within 24 hours of notification.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Resolution Timeline:</span> Set clear timeframes for addressing the hazard based on its severity and risk level.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Reporter Feedback:</span> Provide feedback to the person who reported the hazard about actions taken and resolution status.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <p className="text-sm"><span className="font-medium text-elec-yellow">Documentation:</span> Record all actions taken in response to the hazard report, including control measures implemented.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-elec-gray rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-elec-yellow mb-1">Legal Obligations</h4>
                <p className="text-sm">
                  Under the Health and Safety at Work Act 1974 and the Management of Health and Safety at Work Regulations 1999, 
                  both employers and employees have legal duties regarding hazard reporting. Employees must report hazards they 
                  identify, and employers must have systems in place to record and address these reports.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Documentation Requirements Section - Horizontal Layout */}
        <h3 className="text-xl font-bold text-elec-yellow mt-8">Documentation Requirements</h3>
        
        <p className="text-sm md:text-base mb-4">
          Proper documentation of hazards is crucial for maintaining safety records, ensuring appropriate action is taken, and meeting legal obligations.
        </p>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Hazard Report Form Contents</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Hazard Details</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Specific location of the hazard</li>
                    <li>Detailed description</li>
                    <li>Date and time identified</li>
                    <li>Potential consequences</li>
                  </ul>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Risk Assessment</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Likelihood of incident</li>
                    <li>Potential severity</li>
                    <li>Overall risk level</li>
                    <li>People potentially affected</li>
                  </ul>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Reporter Information</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Name of person reporting</li>
                    <li>Contact details</li>
                    <li>Job role/position</li>
                    <li>Signature and date</li>
                  </ul>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Immediate Actions</h5>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Steps taken to control</li>
                    <li>Temporary measures</li>
                    <li>Communication to others</li>
                    <li>Evidence (photos, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-elec-yellow/10 rounded">
                      <Eye className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <h4 className="font-medium text-elec-yellow">Record-Keeping</h4>
                  </div>
                  
                  <div className="bg-elec-gray rounded-md p-3 h-full">
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium text-elec-yellow">Retention Period:</span> Minimum 3 years, 5 years recommended</li>
                      <li><span className="font-medium text-elec-yellow">Accessibility:</span> Records must be easily accessible to safety representatives and inspectors</li>
                      <li><span className="font-medium text-elec-yellow">Storage Format:</span> Both physical and electronic records acceptable with backup</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-elec-yellow/10 rounded">
                      <Clipboard className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <h4 className="font-medium text-elec-yellow">Management Review</h4>
                  </div>
                  
                  <div className="bg-elec-gray rounded-md p-3 h-full">
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium text-elec-yellow">Regular Review:</span> All reports reviewed in safety meetings</li>
                      <li><span className="font-medium text-elec-yellow">Action Tracking:</span> Document actions taken, dates, and responsible persons</li>
                      <li><span className="font-medium text-elec-yellow">Effectiveness:</span> Periodically assess effectiveness of control measures</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Process Flow - Horizontal */}
              <div className="bg-elec-gray rounded-lg p-3">
                <h4 className="font-medium text-elec-yellow mb-2">Documentation Process Flow</h4>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-elec-dark rounded border border-elec-yellow/10 w-20">
                      <p className="text-xs font-medium text-elec-yellow">Hazard Identified</p>
                      <p className="text-xs mt-1">Day 1</p>
                    </div>
                  </div>
                  <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-elec-dark rounded border border-elec-yellow/10 w-20">
                      <p className="text-xs font-medium text-elec-yellow">Report Filed</p>
                      <p className="text-xs mt-1">Day 1</p>
                    </div>
                  </div>
                  <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-elec-dark rounded border border-elec-yellow/10 w-20">
                      <p className="text-xs font-medium text-elec-yellow">Assessment</p>
                      <p className="text-xs mt-1">Day 1-2</p>
                    </div>
                  </div>
                  <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-elec-dark rounded border border-elec-yellow/10 w-20">
                      <p className="text-xs font-medium text-elec-yellow">Action</p>
                      <p className="text-xs mt-1">By Day 7</p>
                    </div>
                  </div>
                  <div className="w-4 h-0.5 bg-elec-yellow/30 hidden sm:block"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 bg-elec-dark rounded border border-elec-yellow/10 w-20">
                      <p className="text-xs font-medium text-elec-yellow">Review</p>
                      <p className="text-xs mt-1">Day 14-28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reporting Tools Section - Horizontal Layout */}
        <h3 className="text-xl font-bold text-elec-yellow mt-8">Reporting Tools and Systems</h3>
        
        <p className="text-sm md:text-base mb-4">
          Modern workplaces employ various tools and systems to streamline the hazard reporting process, ensure proper tracking, 
          and facilitate effective resolution.
        </p>
        
        <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Reporting Methods */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <FileWarning className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Reporting Methods</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Paper-Based Systems</h5>
                <p className="text-sm mt-1">Traditional forms, near-miss cards, and safety observation booklets for manual recording of hazards.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Digital Systems</h5>
                <p className="text-sm mt-1">Health & safety software platforms, mobile reporting apps, and QR code scanning for streamlined digital reporting.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm">Integrated Approaches</h5>
                <p className="text-sm mt-1">Toolbox talks, safety committee reviews, and anonymous reporting channels to ensure comprehensive coverage.</p>
              </div>
            </div>
            
            {/* Effective Reporting */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Effective Reporting</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Be Specific</h5>
                <p className="text-sm mt-1">Provide exact location and detailed description. "Exposed wiring near workstation 3" is better than "Dangerous wiring."</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Include Evidence</h5>
                <p className="text-sm mt-1">Whenever possible, attach photographs or videos of the hazard to provide visual context for assessment.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm">Suggest Solutions & Follow Up</h5>
                <p className="text-sm mt-1">Include ideas for hazard control and follow up if no action is taken within a reasonable timeframe.</p>
              </div>
            </div>
            
            {/* Common Barriers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                </div>
                <h4 className="font-medium text-elec-yellow">Common Barriers</h4>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Fear of Blame</h5>
                <p className="text-sm mt-1">Workers may hesitate if they fear being blamed. Management should promote a no-blame culture focused on fixing problems.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3 mb-3">
                <h5 className="font-medium text-elec-yellow text-sm">Perceived Lack of Action</h5>
                <p className="text-sm mt-1">If previous reports haven't led to visible action, workers may become discouraged. Ensure all reports receive feedback.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm">Time Constraints & Training</h5>
                <p className="text-sm mt-1">Use simple reporting processes and provide regular hazard identification training to overcome these barriers.</p>
              </div>
            </div>
          </div>
          
          {/* Case Study - Horizontal */}
          <div className="mt-5 bg-elec-gray rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Case Study: Effective Hazard Reporting</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded h-fit">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h5 className="text-elec-yellow mb-1 text-sm font-medium">The Scenario:</h5>
                  <p className="text-sm">
                    At a commercial electrical installation site, an apprentice noticed several temporary power cables creating a trip hazard across a walkway.
                    The situation was complicated because the cables needed to power essential equipment.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded h-fit">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h5 className="text-elec-yellow mb-1 text-sm font-medium">The Response:</h5>
                  <ol className="list-decimal list-inside text-sm space-y-1">
                    <li>Apprentice photographed the hazard and completed the digital report form</li>
                    <li>Supervisor acknowledged the report and implemented a temporary solution within hours</li>
                    <li>The report triggered a site-wide cable management review</li>
                    <li>The apprentice received recognition at the next safety meeting</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <p className="text-sm italic mt-3">
              This example demonstrates how proper hazard reporting can lead to both immediate action and longer-term improvements to workplace safety.
            </p>
          </div>
        </div>
      </div>
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection5_2;
