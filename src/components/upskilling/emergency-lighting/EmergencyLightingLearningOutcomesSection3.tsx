import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingLearningOutcomesSection3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-green-400 drop-shadow-md" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
        <p className="mb-4">By the end of this section, you will be able to:</p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 p-2 rounded-md bg-green-500/10 border-l-2 border-green-500">
            <span className="text-green-400 text-sm">✓</span>
            <span>Distinguish between central battery and self-contained emergency lighting systems</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-blue-500/10 border-l-2 border-blue-500">
            <span className="text-blue-400 text-sm">✓</span>
            <span>Understand maintained, non-maintained, and sustained operating modes</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-purple-500/10 border-l-2 border-purple-500">
            <span className="text-purple-400 text-sm">✓</span>
            <span>Identify different luminaire types and their specific applications</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-amber-500/10 border-l-2 border-amber-500">
            <span className="text-amber-400 text-sm">✓</span>
            <span>Compare battery technologies and their suitability for different installations</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-teal-500/10 border-l-2 border-teal-500">
            <span className="text-teal-400 text-sm">✓</span>
            <span>Select appropriate system types based on building characteristics and requirements</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};