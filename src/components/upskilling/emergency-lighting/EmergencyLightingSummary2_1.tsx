import { Target, BookOpen, Key } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const EmergencyLightingSummary2_1 = () => {
  const keyPoints = [
    {
      category: 'Illuminance Requirements',
      points: [
        'Minimum 1 lux horizontal illuminance on escape routes',
        'Uniformity ratio not exceeding 40:1',
        'Higher levels required at floor level changes and obstacles'
      ]
    },
    {
      category: 'Spacing and Positioning',
      points: [
        'Maximum spacing = 2 × mounting height for corridors',
        'Luminaires at every change of direction and level',
        'Exit doors and safety signs must be clearly illuminated'
      ]
    },
    {
      category: 'Design Standards',
      points: [
        'BS 5266-1 provides detailed design requirements',
        'Building Regulations Part B compliance essential',
        'Fire Risk Assessment may specify additional requirements'
      ]
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Section Summary: Emergency Escape Lighting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {keyPoints.map((section, index) => (
            <div key={index} className="bg-elec-dark rounded-lg p-4 border border-gray-600">
              <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {section.category}
              </h4>
              <ul className="space-y-2">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="text-elec-yellow font-semibold mb-3 flex items-center gap-2">
            <Key className="h-4 w-4" />
            Essential Takeaways
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-foreground font-medium">Critical Path:</span> Ensure continuous illumination from any point to final exit</p>
              <p><span className="text-foreground font-medium">Mounting Strategy:</span> Use 2:1 spacing ratio for reliable coverage</p>
            </div>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-foreground font-medium">Standards Compliance:</span> BS 5266-1 and Building Regulations Part B</p>
              <p><span className="text-foreground font-medium">Practical Application:</span> Consider building geometry and occupant flow</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
            BS 5266-1
          </Badge>
          <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
            1 Lux Minimum
          </Badge>
          <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
            40:1 Uniformity
          </Badge>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-600/30">
            Escape Routes
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};