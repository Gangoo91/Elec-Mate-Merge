import { BookOpen, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummary3_3 = () => {
  const keyPoints = [
    "Mounting height directly affects light distribution and determines whether required lux levels can be achieved",
    "Photometric data including polar curves, spacing tables, and utilisation factors are essential for proper design",
    "Emergency mode performance is typically 10-20% lower than mains operation and must be used for calculations",
    "Luminaire spacing must be calculated using manufacturer data, not estimated or guessed",
    "Surface reflectances significantly impact light distribution and may require design adjustments",
    "High ceiling applications require specific high-bay luminaires with appropriate beam angles",
    "Maintenance access and ongoing testing costs should be considered when selecting mounting heights",
    "Full commissioning testing with lux measurements is essential to verify photometric performance"
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
          This section has covered the critical relationship between mounting heights, photometric data, and emergency lighting performance. Understanding these principles ensures compliant and cost-effective installations.
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
            <strong>Next Steps:</strong> Use the quiz below to test your understanding of mounting heights and photometric considerations. Then proceed to Section 4 to learn about system integration and control methods.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};