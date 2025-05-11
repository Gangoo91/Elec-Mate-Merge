
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, AlertOctagon } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const Subsection3_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 mx-auto">
      <CourseContentSection
        title="Electrical Safety Fundamentals"
        description="Electrical safety is fundamental to preventing accidents in electrical work. Understanding the dangers posed by electricity and taking appropriate precautions is essential for all electrical workers. The Electricity at Work Regulations 1989 place legal responsibilities on both employers and individuals to ensure competence for electrical work."
        keyPoints={[
          "Electric shock can cause effects ranging from tingling to death, with 50mA potentially fatal",
          "Safe isolation procedures must be followed without exception before working on electrical equipment",
          "Electrical fires can result from overheating, arcing, or ignition of combustible materials",
          "The Electricity at Work Regulations 1989 require competence for all electrical work",
          "Appropriate PPE and insulated tools must be used for electrical work"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      <Accordion type="single" collapsible defaultValue="overview" className="space-y-4">
        {/* Electrical Hazards Section */}
        <AccordionItem value="hazards" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Electrical Hazards</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Electric Shock</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Current passing through the body can disrupt normal electrical functions of the body</li>
                    <li>Effects range from tingling sensation to death (cardiac arrest)</li>
                    <li>As little as 50mA can be fatal if it passes through the heart</li>
                    <li>Factors affecting severity: current path, voltage, duration, body resistance, frequency</li>
                    <li>Wet conditions significantly reduce skin resistance, increasing shock hazard</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mt-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">Current Effects on the Human Body:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="font-medium text-white">1-5mA</span> - Slight tingling sensation, most people can let go</li>
                    <li><span className="font-medium text-white">5-30mA</span> - Painful shock, potential 'freezing' to circuit, cannot let go</li>
                    <li><span className="font-medium text-white">30-50mA</span> - Severe muscle contractions, respiratory difficulty</li>
                    <li><span className="font-medium text-white">50-100mA</span> - Possible ventricular fibrillation, heart rhythm disruption</li>
                    <li><span className="font-medium text-white">100-200mA</span> - Certain ventricular fibrillation, mortality rate high</li>
                    <li><span className="font-medium text-white">200+ mA</span> - Severe burns, cardiac arrest, death almost certain</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mt-3">Electrical Fire and Burns</h4>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Thermal burns from heated equipment or conductors</li>
                    <li>Arc flash burns from electrical explosions (temperatures up to 20,000°C)</li>
                    <li>Fires from overheating cables, faulty equipment, or ignition of combustible materials</li>
                    <li>Explosions in flammable atmospheres when electrical equipment creates sparks</li>
                    <li>Secondary fires from damaged equipment or falling objects after electrical incidents</li>
                  </ul>
                </div>
                
                <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">UK Electrical Safety Statistics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Approximately 1,000 electrical accidents at work annually in the UK</li>
                    <li>Around 30 people die from electrical accidents each year in Great Britain</li>
                    <li>Electricians are 4x more likely to be injured at work than other workers</li>
                    <li>Most common sources: faulty plugs, sockets and wiring</li>
                    <li>Improper isolation procedures are a leading cause of electrical accidents</li>
                    <li>The HSE estimates that 25% of all reportable electrical accidents involve portable equipment</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* Safe Isolation Section */}
        <AccordionItem value="isolation" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Safe Isolation Procedures</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="text-center sm:text-left">
                <p>The essential steps of safe isolation must be followed without exception:</p>
                
                <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 my-4">
                  <h4 className="font-semibold text-elec-yellow mb-2">The Safe Isolation Procedure:</h4>
                  <ol className="list-decimal pl-5 space-y-3 mt-3 mx-auto text-left">
                    <li><span className="font-medium text-white">Identify</span> - Correctly identify the circuit or equipment to be worked on using diagrams, labels and testing</li>
                    <li><span className="font-medium text-white">Isolate</span> - Switch off and lock the isolation device, ensuring complete disconnection from all sources</li>
                    <li><span className="font-medium text-white">Prove the tester</span> - Test your voltage indicator on a known live source to verify it works</li>
                    <li><span className="font-medium text-white">Test dead</span> - Verify the circuit or equipment is dead using an approved voltage indicator</li>
                    <li><span className="font-medium text-white">Reprove the tester</span> - Test your voltage indicator again on a known live source to confirm it still works</li>
                    <li><span className="font-medium text-white">Lock off and tag</span> - Apply locking devices, padlocks and warning notices to prevent reconnection</li>
                    <li><span className="font-medium text-white">Issue permit</span> - For complex systems, issue a permit-to-work to document the isolation</li>
                  </ol>
                </div>
                
                <h4 className="font-semibold mt-4 text-left">Working Safely with Electricity</h4>
                <ul className="list-disc pl-5 space-y-1 mt-2 mx-auto text-left">
                  <li>Never work on live equipment unless absolutely necessary and justified</li>
                  <li>When live working is required, a risk assessment and method statement must be completed</li>
                  <li>Use the correct insulated tools and equipment for the task</li>
                  <li>Ensure appropriate PPE is worn (insulated gloves, eye protection, etc.)</li>
                  <li>Follow proper wiring standards as per BS 7671</li>
                  <li>Maintain good housekeeping in work areas to prevent hazards</li>
                  <li>Follow safe systems of work and company procedures at all times</li>
                </ul>
                
                <div className="mt-4 pt-3 border-t border-elec-yellow/20 text-left">
                  <h4 className="font-semibold text-elec-yellow mb-2">Essential Safety Equipment:</h4>
                  <ul className="list-disc pl-5 space-y-1 mx-auto text-left">
                    <li>Approved voltage indicator (test lamp or two-pole voltage detector)</li>
                    <li>Proving unit for safely testing the voltage indicator</li>
                    <li>Locking off devices and padlocks suitable for various isolation points</li>
                    <li>Warning signs, tags and barriers to prevent unauthorised access</li>
                    <li>Insulated tools meeting BS EN 60900 standards</li>
                    <li>Appropriate PPE including insulated gloves, mats, and face protection</li>
                  </ul>
                </div>
                
                <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg border border-elec-yellow/30 text-sm">
                  <p className="font-medium mb-1 text-elec-yellow">When is live work permitted?</p>
                  <p>Live working is only permitted when it can be demonstrated that:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>It is unreasonable in all circumstances for the conductor to be dead</li>
                    <li>It is reasonable in all circumstances for work to be carried out on or near a live conductor</li>
                    <li>Suitable precautions (including where necessary the use of PPE) have been taken to prevent injury</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* Safety Legislation Section */}
        <AccordionItem value="legislation" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <AlertOctagon className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">Electrical Safety Legislation</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div className="text-center sm:text-left">
                <p>Key legislation that governs electrical safety in the workplace in the UK:</p>
                
                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="font-semibold text-white">Primary Legislation</h4>
                    <ul className="list-disc pl-5 space-y-2 mt-2 mx-auto text-left">
                      <li>
                        <span className="font-medium">Health and Safety at Work etc. Act 1974</span>
                        <p className="text-sm mt-1">Overarching duty to ensure safety of employees and others who may be affected by work activities</p>
                      </li>
                      <li>
                        <span className="font-medium">Electricity at Work Regulations 1989</span>
                        <p className="text-sm mt-1">Specific requirements for electrical safety, focusing on preventing death or injury from electricity in work activities</p>
                      </li>
                      <li>
                        <span className="font-medium">Management of Health and Safety at Work Regulations 1999</span>
                        <p className="text-sm mt-1">Requirements for risk assessment, health surveillance, and competence</p>
                      </li>
                      <li>
                        <span className="font-medium">Provision and Use of Work Equipment Regulations 1998</span>
                        <p className="text-sm mt-1">Requirements for electrical equipment safety including maintenance and training</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="font-semibold text-white">Guidance and Standards</h4>
                    <ul className="list-disc pl-5 space-y-2 mt-2 mx-auto text-left">
                      <li>
                        <span className="font-medium">BS 7671 (IET Wiring Regulations)</span>
                        <p className="text-sm mt-1">Technical standard for electrical installations in the UK (18th Edition)</p>
                      </li>
                      <li>
                        <span className="font-medium">HSE Guidance Notes</span>
                        <p className="text-sm mt-1">HSG85 (Electricity at work: Safe working practices), HSG230 (Keeping electrical switchgear safe), INDG354 (Safety in electrical testing)</p>
                      </li>
                      <li>
                        <span className="font-medium">ENA publications</span>
                        <p className="text-sm mt-1">Energy Networks Association guidance for working on distribution networks</p>
                      </li>
                      <li>
                        <span className="font-medium">Company-specific policies</span>
                        <p className="text-sm mt-1">Site-specific rules and procedures which must be adhered to</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-3 bg-elec-dark/70 rounded-lg border border-elec-yellow/30 text-sm">
                    <p className="font-medium mb-1 text-elec-yellow">Competence Requirement:</p>
                    <p>Regulation 16 of the Electricity at Work Regulations 1989 states:</p>
                    <p className="mt-2 italic">"No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>

        {/* First Aid for Electrical Incidents */}
        <AccordionItem value="firstaid" className="border-none">
          <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-elec-yellow" />
                <h3 className="text-lg sm:text-xl font-medium">First Aid for Electrical Incidents</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <div>
                <p className="mb-4">Responding correctly to an electrical injury can save lives. Follow these steps:</p>
                
                <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mb-6">
                  <h4 className="font-medium text-elec-yellow mb-2">Emergency Response Procedure:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><span className="font-medium text-white">Ensure your own safety</span> - Never touch the casualty if they may still be in contact with a live electrical source</li>
                    <li><span className="font-medium text-white">Disconnect the power</span> - Turn off power at the mains or isolation point if safe to do so</li>
                    <li><span className="font-medium text-white">If power cannot be turned off</span> - Use a non-conductive object (like a dry wooden broom handle) to separate the casualty from the electrical source</li>
                    <li><span className="font-medium text-white">Call emergency services</span> - Dial 999 or 112 immediately</li>
                    <li><span className="font-medium text-white">Check response</span> - Check if the casualty is conscious and breathing</li>
                    <li><span className="font-medium text-white">Start CPR if required</span> - If not breathing normally, commence CPR</li>
                    <li><span className="font-medium text-white">Treat burns</span> - Cool any burns with cool running water for at least 20 minutes</li>
                    <li><span className="font-medium text-white">Monitor</span> - Stay with the casualty until emergency services arrive</li>
                  </ol>
                </div>
                
                <h4 className="font-semibold mb-2">Workplace Requirements</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>First aid kits must be readily available in electrical work areas</li>
                  <li>At least one trained first aider should be present on site</li>
                  <li>First aid training should include specific guidance on electrical injuries</li>
                  <li>Emergency contact information must be clearly displayed</li>
                  <li>Incident reporting procedures must be followed after any electrical incident</li>
                </ul>
                
                <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Important Considerations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Even minor electric shocks should be medically evaluated</li>
                    <li>Electrical burns may be more serious internally than they appear externally</li>
                    <li>Delayed effects can occur hours after an electric shock</li>
                    <li>Cardiac monitoring is often necessary following significant electrical exposure</li>
                    <li>All electrical incidents must be documented and reported according to RIDDOR requirements when applicable</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-center pt-4 border-t border-elec-yellow/20">
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

export default Subsection3_1;
