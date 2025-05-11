
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "../subsection1_1/types";
import COSHHIntro from './COSHHIntro';
import KeyRequirements from './KeyRequirements';
import COSHHAssessment from './COSHHAssessment';
import COSHHDocumentation from './COSHHDocumentation';

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Control of Substances Hazardous to Health (COSHH) Regulations</h1>
      
      <COSHHIntro />
      <KeyRequirements />
      <COSHHAssessment />
      <COSHHDocumentation />
      
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
