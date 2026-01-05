import { BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummary3_4 = () => {
  const keyPoints = [
    "Risk assessment is essential for tailoring emergency lighting beyond generic minimum standards",
    "Vulnerable occupants including elderly, disabled, and patients require enhanced lighting levels and duration",
    "Building-specific hazards and functions must be considered in luminaire placement and coverage",
    "Healthcare facilities typically need 3-5 lux levels compared to 1 lux minimum for standard buildings",
    "High-rise and complex buildings generally require 3-hour battery duration for safe evacuation",
    "Fire Risk Assessment findings should directly inform lighting design decisions and documentation",
    "Extra coverage may be needed at hazardous equipment, refuge points, and accessible routes",
    "Design philosophy should focus on actual safety needs rather than minimum compliance"
  ];

  return (
    <Card className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/10 border border-indigo-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-indigo-300 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400 drop-shadow-md" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-indigo-200 mb-4">
          This section has explored how to adapt emergency lighting design based on specific building risks and occupant needs. Risk-based adjustments ensure that lighting systems provide genuine safety benefits rather than just regulatory compliance.
        </p>
        
        <div className="space-y-3">
          <h4 className="text-indigo-300 font-semibold">Key Learning Points:</h4>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
          <p className="text-purple-200 text-sm">
            <strong>Next Steps:</strong> Complete the quiz below to test your understanding of risk-based design principles. Then proceed to Section 5 to learn about system integration and control methods for complete emergency lighting solutions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};