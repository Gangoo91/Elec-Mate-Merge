import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationLearningOutcomes = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Learning Outcomes</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
        <p className="mb-4">By the end of this section, you'll be able to:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Select appropriate termination tools for different cable categories and connector types</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Understand tool calibration requirements and maintenance schedules</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Apply proper termination techniques for achieving consistent results</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Recognise quality indicators and test for termination integrity</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
            <span>Implement professional quality control and documentation practices</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};