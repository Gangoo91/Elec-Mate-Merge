
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
import CourseContentSection from '../CourseContentSection';

const Subsection1_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Legislation and Regulations in Electrical Work</h1>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Electricity at Work Regulations 1989</CardTitle>
          <CardDescription>A cornerstone of electrical safety legislation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Electricity at Work Regulations 1989 (EWR) is a key piece of legislation that 
            establishes legal duties for employers, employees, and self-employed persons. These 
            regulations specifically cover the safety of electrical systems and equipment in 
            workplaces across the UK.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All electrical systems must be maintained in a safe condition</li>
              <li>Work activities must be carried out safely to prevent danger</li>
              <li>Only competent persons may work on electrical systems</li>
              <li>All conductors must be insulated, protected, or placed to prevent danger</li>
              <li>Equipment must be suitable for its environment and intended use</li>
              <li>Means for cutting off the electrical supply and for isolation must be provided</li>
              <li>Precautions must be taken when working on dead circuits to prevent them becoming live</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Health and Safety at Work Act 1974</CardTitle>
          <CardDescription>The foundation of workplace safety legislation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Health and Safety at Work Act 1974 (HSWA) is the primary piece of legislation covering 
            occupational health and safety in the UK. It establishes a framework for managing workplace 
            health and safety, and places general duties on employers, employees, and the self-employed.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Provisions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Employers must ensure the health, safety and welfare of all employees</li>
              <li>Safe systems of work must be provided and maintained</li>
              <li>Information, instruction, training, and supervision must be provided</li>
              <li>Workplaces must be maintained in a safe condition</li>
              <li>Employees must take reasonable care of their own safety and that of others</li>
              <li>Employees must cooperate with employers on health and safety matters</li>
              <li>Equipment and substances must be handled and stored safely</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">COSHH Regulations</CardTitle>
          <CardDescription>Control of Substances Hazardous to Health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to 
            control substances that are hazardous to health. In electrical work, this includes exposure 
            to hazardous substances such as solvents, fluxes, lead, sealants, and insulation materials.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Requirements for Electricians:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Assess the risks to health from hazardous substances</li>
              <li>Decide what precautions are needed before starting work</li>
              <li>Prevent or control exposure to hazardous substances</li>
              <li>Use control measures properly and follow standard operating procedures</li>
              <li>Maintain, examine, and test control measures regularly</li>
              <li>Monitor exposure where necessary</li>
              <li>Carry out health surveillance where necessary</li>
              <li>Properly store, handle, and dispose of hazardous substances</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Other Relevant Regulations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Additional Legislation for Electricians:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">BS 7671 (IET Wiring Regulations)</span> - Provides technical standards for electrical installations</li>
              <li><span className="font-semibold">Building Regulations Part P</span> - Applies to domestic electrical installations</li>
              <li><span className="font-semibold">Management of Health and Safety at Work Regulations</span> - Requires risk assessments</li>
              <li><span className="font-semibold">Work at Height Regulations</span> - For working safely at heights</li>
              <li><span className="font-semibold">Personal Protective Equipment at Work Regulations</span> - Covers PPE requirements</li>
              <li><span className="font-semibold">Manual Handling Operations Regulations</span> - For safe lifting and carrying</li>
              <li><span className="font-semibold">Provision and Use of Work Equipment Regulations</span> - For safe use of equipment</li>
            </ul>
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

export default Subsection1_1;
