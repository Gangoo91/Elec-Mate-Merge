
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Shield, AlertOctagon } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";

const Subsection3_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Electrical Hazards
          </h3>
          <div className="space-y-3">
            <h4 className="font-semibold">Electric Shock</h4>
            <p className="text-sm">
              Electric shock occurs when current passes through the body, disrupting normal electrical functions.
              The severity depends on current path, voltage, duration, body resistance, and frequency.
              Wet conditions significantly reduce skin resistance, increasing shock hazard.
            </p>
            
            <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mt-2">
              <h4 className="font-semibold text-elec-yellow mb-2">Current Effects on the Human Body:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-white">1-5mA</span> - Slight tingling sensation, most people can let go</li>
                <li><span className="font-medium text-white">5-30mA</span> - Painful shock, potential 'freezing' to circuit, cannot let go</li>
                <li><span className="font-medium text-white">30-50mA</span> - Severe muscle contractions, respiratory difficulty</li>
                <li><span className="font-medium text-white">50-100mA</span> - Possible ventricular fibrillation, heart rhythm disruption</li>
                <li><span className="font-medium text-white">100-200mA</span> - Certain ventricular fibrillation, mortality rate high</li>
                <li><span className="font-medium text-white">200+ mA</span> - Severe burns, cardiac arrest, death almost certain</li>
              </ul>
            </div>
            
            <h4 className="font-semibold mt-3">Electrical Fire and Burns</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Thermal burns from heated equipment or conductors</li>
              <li>Arc flash burns from electrical explosions (temperatures up to 20,000°C)</li>
              <li>Fires from overheating cables, faulty equipment, or ignition of combustible materials</li>
              <li>Explosions in flammable atmospheres when electrical equipment creates sparks</li>
            </ul>
            
            <div className="mt-3 pt-3 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-elec-yellow mb-2">UK Electrical Safety Statistics:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Approximately 1,000 electrical accidents at work annually in the UK</li>
                <li>Around 30 people die from electrical accidents each year in Great Britain</li>
                <li>Electricians are 4x more likely to be injured at work than other workers</li>
                <li>Most common sources: faulty plugs, sockets and wiring</li>
                <li>Improper isolation procedures are a leading cause of electrical accidents</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Safe Isolation Procedures
          </h3>
          <div className="space-y-3">
            <p className="text-sm">
              Safe isolation is the process of ensuring electrical equipment is disconnected from all sources of supply
              and cannot be reconnected while work is being carried out. This procedure must be followed without exception.
            </p>
            
            <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mt-2">
              <h4 className="font-semibold text-elec-yellow mb-2">The Safe Isolation Procedure:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-white">Identify</span> - Correctly identify the circuit or equipment to be worked on</li>
                <li><span className="font-medium text-white">Isolate</span> - Switch off and lock the isolation device</li>
                <li><span className="font-medium text-white">Prove the tester</span> - Test your voltage indicator on a known live source</li>
                <li><span className="font-medium text-white">Test dead</span> - Verify the circuit or equipment is dead</li>
                <li><span className="font-medium text-white">Reprove the tester</span> - Test your voltage indicator again on a known live source</li>
                <li><span className="font-medium text-white">Lock off and tag</span> - Apply locking devices, padlocks and warning notices</li>
                <li><span className="font-medium text-white">Issue permit</span> - For complex systems, issue a permit-to-work</li>
              </ol>
            </div>
            
            <h4 className="font-semibold mt-3">Working Safely with Electricity</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Never work on live equipment unless absolutely necessary and justified</li>
              <li>When live working is required, a risk assessment and method statement must be completed</li>
              <li>Use the correct insulated tools and equipment for the task</li>
              <li>Ensure appropriate PPE is worn (insulated gloves, eye protection, etc.)</li>
              <li>Follow proper wiring standards as per BS 7671</li>
            </ul>
            
            <div className="mt-3 p-3 bg-elec-dark/70 rounded-lg border border-elec-yellow/30 text-sm">
              <p className="font-medium mb-1 text-elec-yellow">When is live work permitted?</p>
              <p>Live working is only permitted when it can be demonstrated that:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>It is unreasonable in all circumstances for the conductor to be dead</li>
                <li>It is reasonable in all circumstances for work to be carried out on or near a live conductor</li>
                <li>Suitable precautions (including where necessary the use of PPE) have been taken to prevent injury</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <AlertOctagon className="h-5 w-5 mr-2" />
            Electrical Safety Legislation
          </h3>
          <div className="space-y-3">
            <p className="text-sm">
              Key legislation governs electrical safety in the workplace in the UK, setting out the legal requirements
              for employers and individuals carrying out electrical work.
            </p>
            
            <h4 className="font-semibold">Primary Legislation</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">Health and Safety at Work etc. Act 1974</span>
                <p className="text-xs mt-1">Overarching duty to ensure safety of employees and others who may be affected by work activities</p>
              </li>
              <li>
                <span className="font-medium">Electricity at Work Regulations 1989</span>
                <p className="text-xs mt-1">Specific requirements for electrical safety, focusing on preventing death or injury from electricity in work activities</p>
              </li>
              <li>
                <span className="font-medium">Management of Health and Safety at Work Regulations 1999</span>
                <p className="text-xs mt-1">Requirements for risk assessment, health surveillance, and competence</p>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-3">Guidance and Standards</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <span className="font-medium">BS 7671 (IET Wiring Regulations)</span>
                <p className="text-xs mt-1">Technical standard for electrical installations in the UK (18th Edition)</p>
              </li>
              <li>
                <span className="font-medium">HSE Guidance Notes</span>
                <p className="text-xs mt-1">HSG85 (Electricity at work: Safe working practices), HSG230 (Keeping electrical switchgear safe)</p>
              </li>
            </ul>
            
            <div className="mt-3 p-3 bg-elec-dark/70 rounded-lg border border-elec-yellow/30 text-sm">
              <p className="font-medium mb-1 text-elec-yellow">Competence Requirement:</p>
              <p className="text-xs italic">Regulation 16 of the Electricity at Work Regulations 1989 states:</p>
              <p className="text-xs mt-1 italic">"No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."</p>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-elec-yellow flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            First Aid for Electrical Incidents
          </h3>
          <div className="space-y-3">
            <p className="text-sm">
              Responding correctly to an electrical injury can save lives. All electrical workers should be familiar
              with emergency procedures for electrical incidents.
            </p>
            
            <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mt-2">
              <h4 className="font-semibold text-elec-yellow mb-2">Emergency Response Procedure:</h4>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li><span className="font-medium text-white">Ensure your own safety</span> - Never touch the casualty if they may still be in contact with electricity</li>
                <li><span className="font-medium text-white">Disconnect the power</span> - Turn off power at the mains or isolation point if safe to do so</li>
                <li><span className="font-medium text-white">If power cannot be turned off</span> - Use a non-conductive object to separate the casualty from the electrical source</li>
                <li><span className="font-medium text-white">Call emergency services</span> - Dial 999 or 112 immediately</li>
                <li><span className="font-medium text-white">Check response</span> - Check if the casualty is conscious and breathing</li>
                <li><span className="font-medium text-white">Start CPR if required</span> - If not breathing normally, commence CPR</li>
              </ol>
            </div>
            
            <h4 className="font-semibold mt-3">Workplace Requirements</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>First aid kits must be readily available in electrical work areas</li>
              <li>At least one trained first aider should be present on site</li>
              <li>First aid training should include specific guidance on electrical injuries</li>
              <li>Emergency contact information must be clearly displayed</li>
              <li>Incident reporting procedures must be followed after any electrical incident</li>
            </ul>
            
            <div className="mt-3 pt-3 border-t border-elec-yellow/20">
              <h4 className="font-semibold text-elec-yellow mb-2">Important Considerations:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Even minor electric shocks should be medically evaluated</li>
                <li>Electrical burns may be more serious internally than they appear externally</li>
                <li>Delayed effects can occur hours after an electric shock</li>
                <li>All electrical incidents must be documented and reported according to RIDDOR requirements when applicable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
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
