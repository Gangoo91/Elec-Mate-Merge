
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

const Subsection1_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Roles and Responsibilities in Electrical Safety</h1>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Employer Responsibilities</CardTitle>
          <CardDescription>Legal duties of employers to ensure electrical safety</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Employers have extensive responsibilities for ensuring electrical safety in the workplace. 
            These duties are legally enforced through various regulations including the Health and Safety 
            at Work Act and the Electricity at Work Regulations.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Employer Duties:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure electrical systems are designed, constructed, and maintained to be safe</li>
              <li>Carry out risk assessments for all electrical work</li>
              <li>Provide and maintain safe work equipment</li>
              <li>Provide adequate information, instruction, training, and supervision</li>
              <li>Create and implement safe systems of work</li>
              <li>Ensure only competent persons work on electrical systems</li>
              <li>Provide suitable personal protective equipment (PPE)</li>
              <li>Implement emergency procedures for electrical incidents</li>
              <li>Maintain accurate records of maintenance and testing</li>
              <li>Report serious electrical incidents under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Employee Responsibilities</CardTitle>
          <CardDescription>Duties of workers in electrical environments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            All employees, especially electricians and those working with electrical equipment, have 
            significant responsibilities for maintaining safety. These responsibilities are both 
            legal obligations and essential practices for preventing electrical incidents.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Employee Duties:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Take reasonable care of their own health and safety and that of others</li>
              <li>Cooperate with employers on health and safety matters</li>
              <li>Follow safe working procedures and instructions</li>
              <li>Use equipment correctly according to training</li>
              <li>Wear appropriate PPE as required</li>
              <li>Report hazards, defects, and unsafe conditions immediately</li>
              <li>Not interfere with or misuse safety equipment</li>
              <li>Maintain competence through continual professional development</li>
              <li>Only undertake work for which they are competent</li>
              <li>Stop work if it becomes unsafe</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Duties of Other Stakeholders</CardTitle>
          <CardDescription>Roles of additional parties in ensuring electrical safety</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Beyond employers and employees, several other stakeholders have important roles in maintaining 
            electrical safety. These include clients, designers, contractors, manufacturers, and regulatory bodies.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Clients and Building Owners:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Select competent contractors for electrical work</li>
              <li>Provide information about existing electrical installations</li>
              <li>Ensure adequate resources for safe work</li>
              <li>Maintain electrical installations once installed</li>
              <li>Keep records of electrical certification</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Designers and Consultants:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Design electrical systems that comply with regulations</li>
              <li>Consider safety during installation, maintenance, and use</li>
              <li>Specify appropriate equipment and materials</li>
              <li>Communicate design requirements clearly</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulatory Bodies:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Health and Safety Executive (HSE) - Enforcement and guidance</li>
              <li>Local Authority Building Control - Enforcement of Building Regulations</li>
              <li>Institution of Engineering and Technology (IET) - Technical standards</li>
              <li>NICEIC, ELECSA, etc. - Registration and assessment of contractors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Competence and Qualifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A fundamental requirement for electrical safety is ensuring that work is only carried out by those 
            who are competent to do so. Competence is a combination of training, qualifications, knowledge, 
            experience, and ongoing professional development.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Elements of Electrical Competence:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Appropriate technical knowledge</li>
              <li>Experience with the type of installation</li>
              <li>Understanding of the equipment and hazards involved</li>
              <li>Ability to recognize limitations of own competence</li>
              <li>Knowledge of relevant standards and regulations</li>
              <li>Formal qualifications (NVQs, City & Guilds, etc.)</li>
              <li>Regular updates on new technologies and regulations</li>
              <li>Membership of professional bodies (IET, ECA, etc.)</li>
              <li>Evidence of continued professional development</li>
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

export default Subsection1_2;
