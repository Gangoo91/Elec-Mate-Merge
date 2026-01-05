import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BS7671Module8Section2LearningOutcomes = () => {
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
            <span>Complete electrical installation certificates (EIC) and minor works certificates (MEIWC) to professional standards</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Understand the legal requirements and responsibilities associated with different certificate types</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Implement systematic quality control procedures using BS 7671 schedules and checklists</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Use reference charts and tables for design verification and quick compliance checks</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Apply documentation best practices that meet professional and regulatory standards</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Integrate digital documentation tools with traditional certification requirements</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section2LearningOutcomes;