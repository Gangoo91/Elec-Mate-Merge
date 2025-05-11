
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "./subsection1_1/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { AlertTriangle, Shield, FileText, List, ClipboardCheck } from 'lucide-react';

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Control of Substances Hazardous to Health (COSHH)</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <AlertTriangle className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to COSHH Regulations
        </h2>
        <p className="mb-4">
          The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control 
          substances that are hazardous to health. These regulations are particularly relevant to electrical work, 
          where electricians may encounter various chemicals, fumes, dusts, and other hazardous substances.
        </p>
        <p>
          Understanding and complying with COSHH regulations is essential for preventing work-related 
          ill health, which affects thousands of workers each year. The regulations provide a framework 
          for protecting both workers and others who may be exposed to hazardous substances.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <List className="mr-3 h-6 w-6" />
            Key Requirements of COSHH
          </CardTitle>
          <CardDescription>Essential elements of compliance with the regulations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            COSHH establishes a clear set of requirements that employers must follow to protect 
            workers from exposure to hazardous substances. These requirements create a 
            comprehensive approach to managing chemical risks in the workplace.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Main COSHH Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Assess risks to health arising from hazardous substances</li>
              <li>Decide what precautions are needed before work begins</li>
              <li>Prevent or adequately control exposure to hazardous substances</li>
              <li>Ensure control measures are used and maintained properly</li>
              <li>Monitor exposure of employees to hazardous substances when necessary</li>
              <li>Carry out appropriate health surveillance where required</li>
              <li>Prepare plans and procedures to deal with accidents, incidents, and emergencies</li>
              <li>Ensure employees are properly informed, trained, and supervised</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Common Hazardous Substances in Electrical Work:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Solvents and cleaning agents</span> - Used for cleaning electrical components and contacts</li>
              <li><span className="font-semibold">Lead</span> - Present in some solder and older cable insulation</li>
              <li><span className="font-semibold">Silica dust</span> - Created when cutting or drilling through concrete, brick, or stone</li>
              <li><span className="font-semibold">Asbestos</span> - May be encountered in older buildings during electrical installation work</li>
              <li><span className="font-semibold">Cable insulation fumes</span> - Released when cables are heated</li>
              <li><span className="font-semibold">PCBs (Polychlorinated biphenyls)</span> - Found in older electrical equipment</li>
              <li><span className="font-semibold">Battery acids</span> - Present in battery backup systems</li>
              <li><span className="font-semibold">SF6 gas</span> - Used in certain high-voltage switchgear</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <ClipboardCheck className="mr-3 h-6 w-6" />
            COSHH Assessment Process
          </CardTitle>
          <CardDescription>How to properly assess risks from hazardous substances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A COSHH assessment is a systematic examination of hazardous substances in the workplace and the risks 
            they present to health. For electrical workers, these assessments need to be specific to the 
            substances they might encounter during their work activities.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Steps in a COSHH Assessment:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-semibold">Identify the hazardous substances</span> - Review safety data sheets and product information</li>
              <li><span className="font-semibold">Consider the risks</span> - How might people be exposed and what harm could come to them?</li>
              <li><span className="font-semibold">Evaluate existing precautions</span> - Are current measures sufficient?</li>
              <li><span className="font-semibold">Implement additional controls if needed</span> - Following the hierarchy of control</li>
              <li><span className="font-semibold">Record the findings</span> - Document the assessment and control measures</li>
              <li><span className="font-semibold">Inform and train workers</span> - Ensure everyone understands the risks and controls</li>
              <li><span className="font-semibold">Review regularly</span> - Update the assessment when conditions change</li>
            </ol>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Hierarchy of Control for COSHH:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-semibold">Elimination</span> - Remove the hazardous substance completely</li>
              <li><span className="font-semibold">Substitution</span> - Replace with a less hazardous alternative</li>
              <li><span className="font-semibold">Engineering controls</span> - Prevent or reduce exposure by isolation or containment</li>
              <li><span className="font-semibold">Administrative controls</span> - Develop safe working procedures and limit exposure time</li>
              <li><span className="font-semibold">Personal protective equipment (PPE)</span> - Use as a last resort when other controls are not sufficient</li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <FileText className="mr-3 h-6 w-6" />
            COSHH Documentation
          </CardTitle>
          <CardDescription>Managing information about hazardous substances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Proper documentation is a crucial aspect of COSHH compliance. It helps ensure that information 
            about hazardous substances is readily available, understood, and acted upon by all relevant personnel.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Essential COSHH Documentation:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Safety Data Sheets (SDS)</span> - Suppliers must provide these for all hazardous substances</li>
              <li><span className="font-semibold">COSHH risk assessments</span> - Detailed evaluations of specific substance risks in the workplace</li>
              <li><span className="font-semibold">Control measure records</span> - Documentation of implemented controls and their maintenance</li>
              <li><span className="font-semibold">Exposure monitoring results</span> - Records of any workplace monitoring carried out</li>
              <li><span className="font-semibold">Health surveillance records</span> - Medical monitoring results where applicable</li>
              <li><span className="font-semibold">Training records</span> - Evidence that workers have been properly trained on COSHH</li>
              <li><span className="font-semibold">Emergency procedures</span> - Plans for dealing with spills, leaks, or other incidents</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Case Study: COSHH in Electrical Work</h3>
            <p className="mb-3">
              An electrical contractor was working on a renovation project in an older building and identified asbestos-containing materials near 
              the electrical installation. By following COSHH procedures they:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>Halted work immediately upon suspecting asbestos was present</li>
              <li>Arranged for proper testing and identification of the material</li>
              <li>Engaged licensed asbestos contractors to remove the material before proceeding</li>
              <li>Documented the incident and provided additional training to all staff</li>
              <li>Implemented a more thorough pre-work survey process for future projects</li>
            </ul>
            <p>
              This example demonstrates how proper application of COSHH procedures can prevent serious health risks in the electrical industry. 
              By identifying the hazard before disturbance, the potential for harmful exposure was eliminated.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {!isCompleted && (
        <div className="flex justify-center pt-6">
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

export default Subsection1_3;
