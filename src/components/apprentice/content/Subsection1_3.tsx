
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

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Health and Safety Implementation in Electrical Work</h1>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Risk Assessment Process</CardTitle>
          <CardDescription>How to properly conduct risk assessments for electrical work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Risk assessment is a fundamental process in electrical work that helps identify hazards and 
            implement appropriate controls. A proper risk assessment should be conducted before starting 
            any electrical task to ensure the safety of workers and others who may be affected.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Five Steps to Risk Assessment:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Identify hazards</span> - Look for potential sources of harm related to electrical work</li>
              <li><span className="font-semibold">Determine who might be harmed</span> - Consider workers, other trades, and building occupants</li>
              <li><span className="font-semibold">Evaluate risks and decide on precautions</span> - Assess the likelihood and severity of harm</li>
              <li><span className="font-semibold">Record findings and implement controls</span> - Document the assessment and take action</li>
              <li><span className="font-semibold">Review and update</span> - Regularly revisit the assessment as work progresses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Method Statements</CardTitle>
          <CardDescription>Creating comprehensive work instructions for electrical tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Method statements are detailed, step-by-step instructions that outline how a particular task 
            will be carried out safely. They are especially important for high-risk electrical work and 
            should be developed alongside risk assessments.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Components of a Method Statement:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Project details and scope of work</li>
              <li>Sequence of operations with detailed steps</li>
              <li>Specific control measures for identified risks</li>
              <li>Required tools, equipment, and PPE</li>
              <li>Roles and responsibilities of workers</li>
              <li>Emergency procedures and contact details</li>
              <li>References to relevant regulations and standards</li>
              <li>Permits to work requirements</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Incident Reporting and Investigation</CardTitle>
          <CardDescription>Learning from near misses and accidents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Reporting and investigating incidents, including near misses, is crucial for preventing future 
            accidents and improving safety practices in electrical work. All incidents should be properly 
            documented and analyzed to determine root causes and implement corrective actions.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Benefits of Effective Incident Reporting:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identifies trends and recurring issues</li>
              <li>Provides data for improving risk assessments</li>
              <li>Helps develop better safe working procedures</li>
              <li>Complies with legal requirements (RIDDOR)</li>
              <li>Prevents similar incidents in the future</li>
              <li>Promotes a positive safety culture</li>
              <li>Contributes to continuous improvement in safety practices</li>
            </ul>
          </div>
          
          <p className="mt-4">
            Certain incidents involving electrical work must be reported under the Reporting of Injuries, 
            Diseases and Dangerous Occurrences Regulations (RIDDOR). These include electrical accidents 
            causing death, specified injuries, or resulting in over 7 days of incapacitation.
          </p>
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
