import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle2 } from 'lucide-react';

export const SmartHomeModule6Section1Summary = () => {
  const keyPoints = [
    "Smart home hubs connect devices and manage automation across different protocols",
    "Home Assistant = powerful and flexible but requires technical skills",
    "SmartThings = user-friendly, wide compatibility, cloud-reliant",
    "Proprietary hubs = stable within brand but limited across ecosystems",
    "Choosing the right hub depends on the customer's technical ability, system complexity, and long-term plans"
  ];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <FileText className="h-7 w-7 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          Understanding smart home hub types is crucial for making informed recommendations that match client needs and technical capabilities.
        </p>

        {/* Key Points */}
        <div className="space-y-3">
          <h4 className="font-semibold text-elec-yellow">Key Points Covered:</h4>
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-elec-dark/50 rounded-lg border border-gray-600/30">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-foreground text-sm">{point}</span>
            </div>
          ))}
        </div>

        {/* Hub Comparison Quick Reference */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Quick Reference Guide:</h4>
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-2 bg-blue-900/20 rounded">
              <span className="text-foreground font-medium">Home Assistant</span>
              <span className="text-blue-300 text-sm">Advanced users, maximum flexibility</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-900/20 rounded">
              <span className="text-foreground font-medium">SmartThings</span>
              <span className="text-green-300 text-sm">Beginners to intermediate, balanced approach</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
              <span className="text-foreground font-medium">Proprietary</span>
              <span className="text-purple-300 text-sm">Single-brand solutions, plug-and-play</span>
            </div>
          </div>
        </div>

        {/* Electrician's Role */}
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Your Role as an Electrician:</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Assess client technical capabilities and preferences</li>
            <li>• Recommend appropriate hub based on system complexity</li>
            <li>• Ensure device compatibility before installation</li>
            <li>• Plan for future expansion and integration</li>
            <li>• Provide appropriate level of ongoing support</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Coming Up Next:</h4>
          <p className="text-foreground text-sm">
            In the next section, we'll explore how voice assistants like Alexa, Google Home, and Siri integrate with these hub systems to provide hands-free control and enhanced user experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};