
import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const COSHHAssessment = () => {
  return (
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
  );
};

export default COSHHAssessment;
