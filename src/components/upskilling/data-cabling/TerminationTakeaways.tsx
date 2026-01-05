import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationTakeaways = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Tool Quality Matters:</strong> Professional-grade tools with calibration are essential for consistent results</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Regular Calibration:</strong> Quarterly calibration maintains tool accuracy and compliance standards</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Technique Consistency:</strong> Standardised procedures ensure reliable, repeatable terminations</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Quality Control:</strong> Post-termination testing and documentation verify installation integrity</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Cable Category Specific:</strong> Different cable types require appropriate tools and techniques</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Environmental Considerations:</strong> Choose termination method based on installation environment</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span><strong>Documentation Essential:</strong> Record termination parameters and test results for quality assurance</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};