import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, MapPin, BarChart3, Shield, PoundSterling } from 'lucide-react';

export const CCTVBestPracticesSection = () => {
  const practices = [
    {
      icon: MapPin,
      title: "Strategic Positioning",
      description: "Position cameras to cover entrances, exits, and vulnerable areas",
      tips: ["Cover all entry points", "Avoid blind spots", "Consider lighting conditions"]
    },
    {
      icon: BarChart3,
      title: "Balance Resolution with Storage",
      description: "Balance resolution with storage and bandwidth availability",
      tips: ["Match resolution to purpose", "Consider storage costs", "Plan for bandwidth limits"]
    },
    {
      icon: Shield,
      title: "GDPR and Privacy Compliance",
      description: "Always check GDPR and privacy compliance for recording",
      tips: ["Display warning signs", "Limit recording areas", "Secure data storage"]
    },
    {
      icon: PoundSterling,
      title: "Client Education",
      description: "Ensure clients understand maintenance and subscription costs",
      tips: ["Explain ongoing costs", "Maintenance schedules", "Software updates"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Best Practices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {practices.map((practice, index) => (
            <div key={index} className="bg-elec-dark/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-start gap-3 mb-3">
                <practice.icon className="h-5 w-5 text-elec-yellow mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-foreground font-semibold">{practice.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{practice.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {practice.tips.map((tip, idx) => (
                      <Badge key={idx} variant="outline" className="border-green-500/30 text-green-400 text-xs">
                        {tip}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-950/30 rounded-lg p-4 border border-orange-700/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="text-orange-400 font-semibold mb-2">Important Considerations</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Privacy laws vary by location - always check local regulations</li>
                <li>• Inform neighbours about camera placement to avoid disputes</li>
                <li>• Regular maintenance is essential for optimal performance</li>
                <li>• Keep firmware updated for security and feature improvements</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};