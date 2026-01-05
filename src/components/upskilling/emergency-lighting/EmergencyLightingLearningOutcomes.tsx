import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingLearningOutcomes = () => {
  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-600/30 shadow-lg">
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
            <span>Identify the key legislation governing emergency lighting requirements</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-blue-500/10 border-l-2 border-blue-500">
            <span className="text-blue-400 text-sm">✓</span>
            <span>Understand the duties of responsible persons under the law</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-purple-500/10 border-l-2 border-purple-500">
            <span className="text-purple-400 text-sm">✓</span>
            <span>Explain the role of BS 5266-1 and related standards</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-amber-500/10 border-l-2 border-amber-500">
            <span className="text-amber-400 text-sm">✓</span>
            <span>Recognise the consequences of non-compliance</span>
          </li>
          <li className="flex items-start gap-3 p-2 rounded-md bg-teal-500/10 border-l-2 border-teal-500">
            <span className="text-teal-400 text-sm">✓</span>
            <span>Apply legal requirements to different building types</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};