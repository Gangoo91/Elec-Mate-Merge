
import React from 'react';
import { List } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const KeyRequirements = () => {
  return (
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
  );
};

export default KeyRequirements;
