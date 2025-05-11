
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldAlert, Zap, AlertTriangle } from "lucide-react";
import { SubsectionProps } from "./subsection1_1/types";
import CourseContentSection from "../CourseContentSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";

const Subsection3_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-8">
      <CourseContentSection
        title="Working Safely with Electrical Systems"
        description="Understanding proper procedures and practices for working safely with electrical systems is essential for preventing accidents and ensuring compliance with regulations."
        keyPoints={[
          "Following safe working procedures to prevent electrical accidents",
          "Proper use of PPE and safety equipment",
          "Understanding and applying safe isolation procedures",
          "Identifying and mitigating electrical hazards"
        ]}
        icon="shield-alert"
        subsectionId={subsectionId}
      />
      
      {/* Safe Working Procedures Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-6 w-6 mr-2" />
          Safe Working Procedures
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Adhering to proper safe working procedures is paramount when working with electrical systems. 
          The Health and Safety Executive (HSE) in the UK provides strict guidelines that must be followed 
          to protect both workers and the public from electrical hazards.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Before Starting Work:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Complete a thorough risk assessment to identify potential hazards</li>
              <li>Ensure proper authorisation and permits are in place</li>
              <li>Check test equipment calibration and certification is current</li>
              <li>Verify safe isolation procedures and lock-off mechanisms</li>
              <li>Communicate with affected persons about the work scope</li>
              <li>Prepare the work area with appropriate barriers and signage</li>
              <li>Perform a visual inspection of all equipment to be used</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">During Work:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use appropriate PPE at all times during electrical work</li>
              <li>Apply lock-off procedures to prevent accidental energisation</li>
              <li>Use insulated tools that meet BS EN 60900 standards</li>
              <li>Follow permit-to-work systems for high-risk tasks</li>
              <li>Maintain good housekeeping practices in the work area</li>
              <li>Regularly reassess risks as work progresses</li>
              <li>Never take shortcuts with safety procedures</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* PPE and Safety Equipment Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-6 w-6 mr-2" />
          PPE & Safety Equipment
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Personal Protective Equipment (PPE) is the last line of defence against electrical hazards. 
          The Electricity at Work Regulations 1989 requires employers to provide suitable PPE, 
          and workers must use it correctly. All electrical safety equipment should conform to 
          relevant British Standards.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!isMobile ? (
            <>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Essential PPE:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Insulated gloves (rated for appropriate voltage level)</li>
                  <li>Eye protection/face shield for arc flash protection</li>
                  <li>Non-conductive safety footwear with appropriate rating</li>
                  <li>Flame-resistant clothing meeting BS EN ISO standards</li>
                  <li>Insulating mats to BS EN 61111 standards</li>
                  <li>Hard hat with electrical protection rating</li>
                  <li>Arc flash protection clothing for high-risk areas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-3">Safety Equipment:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Approved voltage indicators to GS38 standards</li>
                  <li>Proving units for testing voltage indicators</li>
                  <li>Locking-off devices and MCB locks</li>
                  <li>Warning signs and safety tags</li>
                  <li>Barriers and screening for work areas</li>
                  <li>Insulated tools to BS EN 60900</li>
                  <li>Rescue equipment including insulated hooks</li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <h4 className="font-semibold text-elec-yellow mb-3">Essential PPE & Equipment:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Insulated gloves (voltage rated)</li>
                <li>Eye protection/face shield</li>
                <li>Approved voltage indicators</li>
                <li>Proving units for testing</li>
                <li>Locking-off devices</li>
                <li>Warning signs and barriers</li>
              </ul>
            </div>
          )}
        </div>
      </Card>
      
      {/* Safe Isolation Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <Zap className="h-6 w-6 mr-2" />
          Safe Isolation Procedures
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Safe isolation is a critical procedure that must be followed before working on electrical systems. 
          The HSE's guidance HSG85 emphasises the importance of proper isolation to prevent accidental energisation. 
          Failure to follow proper isolation procedures has resulted in numerous injuries and fatalities in the UK.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Five Steps of Safe Isolation:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-medium">Identify</span> the circuit or equipment to be worked on</li>
              <li><span className="font-medium">Isolate</span> and secure with appropriate lock-off devices</li>
              <li><span className="font-medium">Prove</span> the voltage tester is working on known live source</li>
              <li><span className="font-medium">Test</span> that the circuit or equipment is dead</li>
              <li><span className="font-medium">Reprove</span> the tester works on a known live source</li>
            </ol>
            <p className="mt-3 text-elec-light/80">
              Each step must be documented in accordance with company procedures, 
              and a permit-to-work may be required for complex systems.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">When live work is permitted:</h4>
            <p className="mb-2 text-elec-light/80">
              Regulation 14 of the Electricity at Work Regulations states that live working 
              is only permitted when:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It's unreasonable for the circuit to be dead</li>
              <li>It's reasonable to work live</li>
              <li>Suitable precautions are in place to prevent injury</li>
              <li>A risk assessment has been completed and documented</li>
              <li>The work is authorised by a competent person</li>
              <li>Special tools and PPE are provided and used</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Electrical Hazards Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 mr-2" />
          Common Electrical Hazards
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Identifying and understanding electrical hazards is essential for implementing 
          effective control measures. The IET Code of Practice for Electrical Safety 
          Management provides comprehensive guidance on hazard identification and risk assessment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Hazard Types:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Direct contact with live parts causing electric shock</li>
              <li>Indirect contact through conductive materials or water</li>
              <li>Arc flash/blast injuries causing severe burns</li>
              <li>Fire from electrical faults or overheating</li>
              <li>Stored electrical energy in capacitors or UPS systems</li>
              <li>Step and touch potentials during high voltage work</li>
              <li>EMF exposure from high-current systems</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-elec-yellow mb-3">Common Issues:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Exposed conductors with damaged insulation</li>
              <li>Damaged equipment or terminated cables</li>
              <li>Water ingress in electrical installations</li>
              <li>Overloaded circuits causing excessive heat</li>
              <li>Poorly maintained equipment and connections</li>
              <li>Lack of RCD protection where required</li>
              <li>Inadequate earthing and bonding arrangements</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Key Regulations Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <ShieldAlert className="h-6 w-6 mr-2" />
          Key Regulations for Working Safely
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Electrical safety in the UK is governed by multiple regulations and standards. 
          Compliance is legally required and failure to adhere can result in prosecution 
          by the HSE, substantial fines, or imprisonment in serious cases.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Electricity at Work Regulations 1989</h4>
            <p className="text-elec-light/80 mb-2">
              These regulations place duties on employers, employees and the self-employed 
              to ensure electrical safety in the workplace.
            </p>
            <p className="text-elec-light/80">
              Regulation 14 specifically covers working on or near live conductors, requiring that 
              no person shall work on or near any live conductor unless:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>It is unreasonable for it to be dead</li>
              <li>Suitable precautions are taken</li>
              <li>It is reasonable to work live</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-3">BS 7671 Wiring Regulations</h4>
            <p className="text-elec-light/80 mb-2">
              The IET Wiring Regulations are the national standard for electrical installations 
              in the UK. The 18th Edition provides specific technical standards for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Protection against electric shock</li>
              <li>Isolation and switching procedures</li>
              <li>Protective measures for safety</li>
              <li>Inspection and testing requirements</li>
              <li>Special installations or locations</li>
              <li>Earthing arrangements and protective conductors</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Case Studies Section */}
      <Card className="p-6 shadow-sm">
        <h3 className="text-xl font-bold text-elec-yellow flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 mr-2" />
          UK Case Studies: Learning from Incidents
        </h3>
        
        <p className="mb-4 text-elec-light/90">
          Examining real incidents provides valuable learning opportunities for preventing 
          similar accidents. The HSE regularly publishes case studies of electrical incidents 
          and prosecutions.
        </p>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Case 1: Fatal Shock During Maintenance</h4>
            <p className="text-elec-light/80">
              In 2019, an electrician in Manchester received a fatal electric shock while 
              working on a distribution board that had not been properly isolated. 
              Investigation revealed that the isolation procedure had not been followed, 
              and testing was not performed to verify the dead state of the equipment. 
              The company was fined £300,000 for breaching the Electricity at Work Regulations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Case 2: Arc Flash Injury</h4>
            <p className="text-elec-light/80">
              A maintenance technician in Birmingham suffered severe burns when an arc flash 
              occurred during panel work. The technician was wearing inappropriate PPE and 
              using non-insulated tools. The investigation found inadequate risk assessment 
              and training. The employer was fined £150,000 and ordered to pay costs of £25,000.
            </p>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end pt-4 border-t border-elec-yellow/20">
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

export default Subsection3_2;
