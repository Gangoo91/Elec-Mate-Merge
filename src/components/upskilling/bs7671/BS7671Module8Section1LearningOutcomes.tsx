import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section1LearningOutcomes = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">By the end of this section, you will be able to:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Navigate and effectively use Zs tables for protective device coordination and compliance verification</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Apply conductor sizing methodologies including correction factors for ambient temperature, grouping, and thermal insulation</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Calculate voltage drop for both single-phase and three-phase circuits using tabulated data and formulae</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Determine appropriate derating factors for cables in various installation conditions</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Use reference charts for quick design decisions and verification procedures</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Apply practical design examples to real-world installation scenarios</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1LearningOutcomes;