
import React from "react";
import { SubsectionProps } from "./subsection1_1/types";
import IntroSection from "./subsection5_2/IntroSection";
import CompletionButton from "../shared/CompletionButton";

const Subsection5_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <IntroSection subsectionId={subsectionId} />
      
      {/* Reporting Procedures Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-elec-yellow">Formal Hazard Reporting Procedures</h3>
        
        <p className="text-sm md:text-base">
          Understanding and following the correct reporting procedures ensures that hazards are addressed promptly and effectively.
          Every workplace should have established protocols for reporting hazards that all workers must follow.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Initial Reporting */}
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Initial Reporting</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Immediate Action</h5>
                <p className="text-sm">If the hazard presents an immediate danger, take appropriate steps to make the area safe if possible and alert others nearby.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Verbal Report</h5>
                <p className="text-sm">Notify your supervisor or safety representative verbally as soon as the hazard is identified.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Written Documentation</h5>
                <p className="text-sm">Complete the required hazard report form, providing detailed information about the nature and location of the hazard.</p>
              </li>
            </ul>
          </div>
          
          {/* Reporting Chain */}
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Reporting Chain</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Direct Supervisor</h5>
                <p className="text-sm">Your immediate supervisor is typically the first point of contact for reporting hazards.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Health & Safety Representative</h5>
                <p className="text-sm">If your supervisor is unavailable or the issue remains unresolved, contact your workplace safety representative.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Management</h5>
                <p className="text-sm">Escalate to senior management if the hazard is significant or if there's been no response to initial reports.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">External Authorities</h5>
                <p className="text-sm">For serious unresolved hazards, contact the HSE or other relevant regulatory bodies as a last resort.</p>
              </li>
            </ul>
          </div>
          
          {/* Follow-Up Process */}
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Follow-Up Process</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Hazard Investigation</h5>
                <p className="text-sm">Supervisors should investigate reported hazards promptly, typically within 24 hours of notification.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Resolution Timeline</h5>
                <p className="text-sm">Set clear timeframes for addressing the hazard based on its severity and risk level.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Reporter Feedback</h5>
                <p className="text-sm">Provide feedback to the person who reported the hazard about actions taken and resolution status.</p>
              </li>
              
              <li className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Documentation</h5>
                <p className="text-sm">Record all actions taken in response to the hazard report, including control measures implemented.</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-elec-gray border border-elec-yellow/15 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow mt-1"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
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
      
      {/* Documentation Requirements Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-elec-yellow">Documentation Requirements</h3>
        
        <p className="text-sm md:text-base">
          Proper documentation of hazards is crucial for maintaining safety records, ensuring appropriate action is taken, and meeting legal obligations.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Hazard Report Form Contents</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Hazard Details</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Specific location of the hazard</li>
                  <li>Detailed description of the hazard</li>
                  <li>Date and time the hazard was identified</li>
                  <li>Potential consequences if not addressed</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Risk Assessment</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Likelihood of incident occurring</li>
                  <li>Potential severity of consequences</li>
                  <li>Overall risk level (high/medium/low)</li>
                  <li>Number of people potentially affected</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Reporter Information</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Name of person reporting the hazard</li>
                  <li>Contact details for follow-up</li>
                  <li>Job role/position</li>
                  <li>Signature and date</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Immediate Actions</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Steps already taken to control the hazard</li>
                  <li>Temporary measures put in place</li>
                  <li>Communication to others about the hazard</li>
                  <li>Any relevant photographs or evidence</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <h4 className="font-medium text-elec-yellow">Record-Keeping Requirements</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Retention Period</h5>
                  <p className="text-sm">Hazard reports must be retained for a minimum of 3 years, although 5 years is recommended for electrical work environments.</p>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Accessibility</h5>
                  <p className="text-sm">Records must be easily accessible to safety representatives, managers, and regulatory inspectors when required.</p>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Storage Format</h5>
                  <p className="text-sm">Both physical and electronic records are acceptable, but electronic systems must have adequate backup procedures.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-elec-yellow/10 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="5" x="8" y="2" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
                </div>
                <h4 className="font-medium text-elec-yellow">Management Review Process</h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Regular Review</h5>
                  <p className="text-sm">All hazard reports should be reviewed in safety meetings, with trends and recurring issues identified for systemic action.</p>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Action Tracking</h5>
                  <p className="text-sm">Document all actions taken in response to reports, including dates completed and by whom.</p>
                </div>
                
                <div className="bg-elec-gray rounded-md p-3">
                  <h5 className="font-medium text-elec-yellow text-sm mb-1">Effectiveness Evaluation</h5>
                  <p className="text-sm">Periodically assess whether implemented control measures have effectively addressed reported hazards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-gray border border-elec-yellow/15 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-elec-yellow mb-2">Documentation Process Flow</h4>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex-1 text-center p-2 bg-elec-dark rounded border border-elec-yellow/10">
              <p className="font-medium text-elec-yellow text-sm">Hazard Identified</p>
              <p className="text-xs mt-1">Day 1</p>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-elec-yellow/30"></div>
            <div className="flex-1 text-center p-2 bg-elec-dark rounded border border-elec-yellow/10">
              <p className="font-medium text-elec-yellow text-sm">Report Filed</p>
              <p className="text-xs mt-1">Day 1</p>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-elec-yellow/30"></div>
            <div className="flex-1 text-center p-2 bg-elec-dark rounded border border-elec-yellow/10">
              <p className="font-medium text-elec-yellow text-sm">Assessment</p>
              <p className="text-xs mt-1">Day 1-2</p>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-elec-yellow/30"></div>
            <div className="flex-1 text-center p-2 bg-elec-dark rounded border border-elec-yellow/10">
              <p className="font-medium text-elec-yellow text-sm">Action Taken</p>
              <p className="text-xs mt-1">By Day 7</p>
            </div>
            <div className="hidden sm:block w-4 h-0.5 bg-elec-yellow/30"></div>
            <div className="flex-1 text-center p-2 bg-elec-dark rounded border border-elec-yellow/10">
              <p className="font-medium text-elec-yellow text-sm">Review & Close</p>
              <p className="text-xs mt-1">Day 14-28</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reporting Tools Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-elec-yellow">Reporting Tools and Systems</h3>
        
        <p className="text-sm md:text-base">
          Modern workplaces employ various tools and systems to streamline the hazard reporting process, ensure proper tracking, 
          and facilitate effective resolution.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M11.5 13.5 9 16l-1.5-1.5"/><path d="M18 16v.01"/><path d="M18 13v.01"/><path d="M15 11v.01"/><path d="M11.5 11v.01"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Reporting Methods</h4>
            </div>
            
            <div className="space-y-3">
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Paper-Based Systems</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Traditional hazard report forms</li>
                  <li>Near-miss report cards</li>
                  <li>Safety observation booklets</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Digital Systems</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Health & safety software platforms</li>
                  <li>Mobile reporting applications</li>
                  <li>QR code scanning systems</li>
                </ul>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Integrated Approaches</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Toolbox talk reporting</li>
                  <li>Safety committee reviews</li>
                  <li>Anonymous reporting channels</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Effective Reporting</h4>
            </div>
            
            <div className="space-y-3">
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Be Specific</h5>
                <p className="text-sm">Provide exact location and detailed description. "Exposed wiring near workstation 3" is better than "Dangerous wiring."</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Include Evidence</h5>
                <p className="text-sm">Whenever possible, attach photographs or videos of the hazard to provide visual context for assessment.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Suggest Solutions</h5>
                <p className="text-sm">If you have ideas for how the hazard might be controlled, include these in your report.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Follow Up</h5>
                <p className="text-sm">If no action is taken within a reasonable timeframe, follow up through appropriate channels.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-elec-yellow/10 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-elec-yellow"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              </div>
              <h4 className="font-medium text-elec-yellow">Common Barriers</h4>
            </div>
            
            <div className="space-y-3">
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Fear of Blame</h5>
                <p className="text-sm">Workers may hesitate if they fear being blamed. Management should promote a no-blame culture focused on fixing problems.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Perceived Lack of Action</h5>
                <p className="text-sm">If previous reports haven't led to visible action, workers may become discouraged. Ensure all reports receive feedback.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Time Constraints</h5>
                <p className="text-sm">Complex reporting processes discourage reporting. Implement simple, quick methods that take just minutes to complete.</p>
              </div>
              
              <div className="bg-elec-gray rounded-md p-3">
                <h5 className="font-medium text-elec-yellow text-sm mb-1">Training Gaps</h5>
                <p className="text-sm">Workers may not recognize certain conditions as hazards. Regular training on hazard identification is essential.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 bg-elec-gray border border-elec-yellow/15 rounded-lg p-4">
          <h4 className="font-medium text-elec-yellow mb-3">Case Study: Effective Hazard Reporting</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/10">
              <h5 className="text-elec-yellow mb-2 text-sm font-medium">The Scenario:</h5>
              <p className="text-sm">
                At a commercial electrical installation site, an apprentice noticed several temporary power cables creating a trip hazard across a walkway.
                The situation was complicated because the cables needed to power essential equipment.
              </p>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/10">
              <h5 className="text-elec-yellow mb-2 text-sm font-medium">The Response:</h5>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Apprentice photographed the hazard and completed the digital report form</li>
                <li>Supervisor acknowledged the report and implemented a temporary solution within hours</li>
                <li>The report triggered a site-wide cable management review</li>
                <li>The apprentice received recognition at the next safety meeting</li>
              </ol>
            </div>
          </div>
          
          <p className="text-sm italic mt-3">
            This example demonstrates how proper hazard reporting can lead to both immediate action and longer-term improvements to workplace safety.
          </p>
        </div>
      </div>
      
      {/* Completion Button */}
      <CompletionButton isCompleted={isCompleted} markAsComplete={markAsComplete} />
    </div>
  );
};

export default Subsection5_2;

