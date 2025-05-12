
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "./types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { AlertTriangle, Shield, FileText, CheckCircle2, Zap, Info, HardHat, Scale } from 'lucide-react';

const ElectricalTheoryEWR = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Electricity at Work Regulations 1989</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <Shield className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to the EWR 1989
        </h2>
        <p className="mb-4">
          The Electricity at Work Regulations 1989 (EWR) came into force on 1st April 1990 as statutory regulations 
          made under the Health and Safety at Work Act 1974. These regulations specifically address electrical safety 
          in the workplace and impose duties on employers, employees, and the self-employed to control risks arising 
          from the use of electricity in work activities.
        </p>
        <p>
          The EWR applies to all aspects of electrical systems and work activities involving electricity where there 
          is a risk of injury. The regulations are goal-setting rather than prescriptive, meaning they set out the 
          objectives to be achieved rather than providing detailed methods of compliance.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <FileText className="mr-3 h-6 w-6" />
            Key Regulations Overview
          </CardTitle>
          <CardDescription>Essential regulations for electrical installation work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulation 4: Systems, Work Activities and Protective Equipment</h3>
            <p className="mb-3">
              This fundamental regulation requires that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All electrical systems shall be constructed and maintained to prevent danger</li>
              <li>All work activities shall be carried out in a manner that prevents danger</li>
              <li>All protective equipment must be suitable for use, properly maintained, and properly used</li>
              <li>Systems must be of proper construction regarding both design and materials used</li>
              <li>Strength and capability of electrical equipment must not be exceeded</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulation 12: Means for Cutting Off the Supply and for Isolation</h3>
            <p className="mb-3">
              This regulation requires that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Suitable means shall be available for cutting off the supply of electrical energy to any electrical equipment</li>
              <li>Adequate means shall be available for the isolation of any electrical equipment</li>
              <li>Precautions must be taken to prevent electrical equipment from becoming electrically charged when it has been made dead for work to be carried out</li>
              <li>Every isolation point must be secured in the OFF position where appropriate</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulation 14: Work on or Near Live Conductors</h3>
            <p className="mb-3">
              This critical regulation states that no person shall work on or near any live conductor unless:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It is unreasonable in all circumstances for it to be dead</li>
              <li>It is reasonable in all circumstances for the person to work on or near it while it is live</li>
              <li>Suitable precautions (including where necessary the provision of suitable protective equipment) are taken to prevent injury</li>
            </ul>
            <div className="bg-amber-900/30 rounded-md p-4 border border-amber-500/30 mt-4">
              <h4 className="text-base font-semibold text-amber-400 mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Important Note on Live Working
              </h4>
              <p>
                The regulations do not prohibit live working entirely, but establish a hierarchy of control measures. 
                Working dead is always preferred, and live working should only be undertaken when absolutely necessary 
                and with appropriate safety measures in place. For most routine electrical installation and maintenance work, 
                it is reasonable for the circuit to be isolated (dead) before work begins.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <HardHat className="mr-3 h-6 w-6" />
            Competency Requirements
          </CardTitle>
          <CardDescription>Regulation 16 and practical implications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Regulation 16 of the EWR states that "No person shall be engaged in any work activity where technical 
            knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses 
            such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to 
            the nature of the work."
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Elements of Electrical Competence:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-1">Technical Knowledge</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Understanding of electrical principles</li>
                  <li>Knowledge of the regulations and standards</li>
                  <li>Awareness of hazards and control measures</li>
                  <li>Understanding of equipment specifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Experience</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Practical application of knowledge</li>
                  <li>Demonstrated ability to work safely</li>
                  <li>Previous similar work undertaken</li>
                  <li>Range of different situations encountered</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Formal Qualifications</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Appropriate technical certificates</li>
                  <li>Industry-recognised qualifications</li>
                  <li>Training in specific procedures</li>
                  <li>Regular updates and CPD</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Supervision</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Level dependent on individual's competence</li>
                  <li>Supervisor must be competent themselves</li>
                  <li>May range from direct to minimal oversight</li>
                  <li>Clear communication channels required</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Practical Implications for Electricians:</h3>
            <p className="mb-3">
              For electricians and those working in the electrical industry, this regulation has several important practical implications:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Qualification requirements:</span> Need for appropriate qualifications such as EAL Level 2/3 Diplomas, NVQs, and specific certificates like the 18th Edition Wiring Regulations</li>
              <li><span className="font-semibold">Continuous professional development:</span> Ongoing training to keep up with changes to regulations and technology</li>
              <li><span className="font-semibold">Apprentice supervision:</span> Adequate supervision based on the apprentice's level of competence and the complexity of the task</li>
              <li><span className="font-semibold">Documentation:</span> Records of qualifications, training, and experience should be maintained</li>
              <li><span className="font-semibold">Assessment of competence:</span> Regular assessment of individuals' competence for specific tasks</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Zap className="mr-3 h-6 w-6" />
            Safe Isolation Procedures
          </CardTitle>
          <CardDescription>Practical application of the EWR</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Safe isolation is a critical procedure derived from the EWR requirements. It ensures that electrical equipment 
            is disconnected and secured against inadvertent reconnection before work begins.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">The Safe Isolation Procedure:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-semibold">Identify the circuit or equipment</span>
                <p className="text-sm mt-1">Use drawings, labelling, or trace the circuit to ensure the correct circuit is identified.</p>
              </li>
              <li>
                <span className="font-semibold">Inform all affected persons</span>
                <p className="text-sm mt-1">Tell anyone who might be affected that you are isolating the circuit and power will be unavailable.</p>
              </li>
              <li>
                <span className="font-semibold">Switch off and isolate</span>
                <p className="text-sm mt-1">Turn off the supply using the appropriate device (e.g., circuit breaker, switch, or isolator).</p>
              </li>
              <li>
                <span className="font-semibold">Secure the isolation</span>
                <p className="text-sm mt-1">Apply lock-off devices and warning tags to prevent the supply from being reinstated.</p>
              </li>
              <li>
                <span className="font-semibold">Verify the isolation</span>
                <p className="text-sm mt-1">Use an approved voltage indicator to prove the supply is dead. Test the indicator before and after use on a known live source.</p>
              </li>
              <li>
                <span className="font-semibold">Apply additional safety measures</span>
                <p className="text-sm mt-1">Use temporary earthing or other measures where necessary for additional safety.</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">HSE Guidance: Test Equipment</h3>
            <p className="mb-3">
              The Health and Safety Executive (HSE) recommends the use of proper test equipment for safe isolation:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>Use an approved voltage indicator (e.g., HSE GS38 compliant test lamp or two-pole voltage detector)</li>
              <li>Test the indicator before and after use</li>
              <li>Do not rely on non-contact voltage indicators (e.g., volt sticks) as the sole means of verification</li>
              <li>Ensure test equipment is regularly inspected and within calibration</li>
            </ul>
            <p className="text-sm italic">
              "The use of multimeters and voltage indicating devices that require probing or manipulation of terminals should be avoided where possible, particularly on low voltage installations." - HSE guidance
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Scale className="mr-3 h-6 w-6" />
            Enforcement and Penalties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="mb-3">
            The EWR 1989 is enforced by the Health and Safety Executive (HSE) and local authorities. Breaches of the regulations 
            can lead to significant penalties, reflecting the serious nature of electrical safety.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Enforcement Methods</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold">Improvement Notice:</span> Requiring remedial action within a specified time</li>
                <li><span className="font-semibold">Prohibition Notice:</span> Stopping work activities until hazards are addressed</li>
                <li><span className="font-semibold">Prosecution:</span> Criminal proceedings for serious or repeated breaches</li>
                <li><span className="font-semibold">Fee for Intervention:</span> Cost recovery when an inspector identifies a material breach</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Potential Penalties</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-semibold">Magistrates' Court:</span> Fines up to £20,000 per offence</li>
                <li><span className="font-semibold">Crown Court:</span> Unlimited fines and up to two years imprisonment</li>
                <li><span className="font-semibold">Corporate Manslaughter:</span> Unlimited fines where serious management failures result in a fatality</li>
                <li><span className="font-semibold">Director Disqualification:</span> Disqualification from holding director positions</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-900/30 rounded-md p-4 border border-amber-500/30">
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Case Study: EWR Enforcement
            </h3>
            <p className="mb-3">
              In 2019, an electrical contractor was fined £50,000 after an employee suffered severe electric shock when working on 
              a distribution board that had not been properly isolated. The HSE investigation found:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The company failed to ensure appropriate safe isolation procedures were followed</li>
              <li>There was inadequate supervision of relatively inexperienced staff</li>
              <li>No proper voltage testing equipment was provided</li>
              <li>The contractor had been previously warned about isolation procedures</li>
            </ul>
            <p className="mt-3">
              This case highlights the serious consequences of failing to comply with the EWR, particularly regarding 
              Regulations 4, 12, 14 and 16.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Info className="mr-3 h-6 w-6" />
            EWR and Examination Questions
          </CardTitle>
          <CardDescription>Common assessment areas in EAL qualifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="mb-3">
            The Electricity at Work Regulations 1989 feature prominently in EAL Level 2 examinations. Below are key areas that are 
            frequently tested in assessments:
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Common Examination Topics:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Key Requirements</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Identifying which regulations apply to specific scenarios</li>
                  <li>Understanding duty holder responsibilities (employers, employees)</li>
                  <li>Requirements for systems construction and maintenance</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Safe Working Practices</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Steps in safe isolation procedures</li>
                  <li>When live working may be permitted</li>
                  <li>Precautions required for working near live parts</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Competency Issues</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Defining electrical competence</li>
                  <li>Required supervision levels for apprentices</li>
                  <li>Evidence of competency for specific tasks</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Equipment Selection</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Requirements for testing equipment</li>
                  <li>Selection of appropriate protective equipment</li>
                  <li>Maintenance requirements for safety equipment</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Sample Assessment Questions:</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">1. Which regulation specifically deals with competency requirements?</p>
                <p className="text-sm italic mt-1">Answer: Regulation 16</p>
              </div>
              
              <div>
                <p className="font-semibold">2. Under what circumstances can work be carried out on live conductors?</p>
                <p className="text-sm italic mt-1">Answer: When it is unreasonable for equipment to be dead, reasonable to work live, and suitable precautions are taken to prevent injury.</p>
              </div>
              
              <div>
                <p className="font-semibold">3. What are the essential steps in the safe isolation procedure?</p>
                <p className="text-sm italic mt-1">Answer: Identify circuit, inform affected persons, switch off, secure isolation, verify isolation using approved test equipment, apply additional safety measures if required.</p>
              </div>
              
              <div>
                <p className="font-semibold">4. What is the primary requirement of Regulation 4?</p>
                <p className="text-sm italic mt-1">Answer: All electrical systems shall be constructed and maintained to prevent danger.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <CheckCircle2 className="mr-3 h-6 w-6 text-elec-yellow" />
          Key Points Summary
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>The Electricity at Work Regulations 1989 are statutory regulations made under the Health and Safety at Work Act 1974</li>
          <li>They apply to all workplaces where electricity is used and create duties for employers, employees, and the self-employed</li>
          <li>Regulation 4 requires all electrical systems to be constructed and maintained to prevent danger</li>
          <li>Regulation 12 requires suitable means for cutting off supply and isolation</li>
          <li>Regulation 14 prohibits live working unless specific conditions are met</li>
          <li>Regulation 16 requires appropriate competence for those working on electrical systems</li>
          <li>Safe isolation procedures are essential for compliance with the regulations</li>
          <li>Breaches can result in enforcement action including improvement notices, prohibition notices, fines, and imprisonment</li>
        </ul>
      </div>

      {!isCompleted && (
        <div className="flex justify-center pt-6 pb-8">
          <Button 
            onClick={markAsComplete}
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          >
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ElectricalTheoryEWR;
