import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section1Practical = () => {
  const practicalTips = [
    {
      title: "Pre-Installation Planning",
      content: "Always consult device datasheets before wiring. Understanding power requirements, connection types, and environmental specifications prevents costly mistakes."
    },
    {
      title: "Enclosure Selection",
      content: "Use junction boxes and enclosures rated for the environment. Consider IP ratings for moisture protection and ensure adequate space for connections."
    },
    {
      title: "Route Planning",
      content: "Plan containment routes before installation to reduce rework. Consider future access requirements and potential system expansions."
    },
    {
      title: "Accessibility",
      content: "Keep wiring accessible for future maintenance and upgrades. Avoid permanently sealing connections that may need future attention."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 mb-4">
          As an electrician working with smart home installations, these practical tips will help ensure professional results:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practicalTips.map((tip, index) => (
            <div key={index} className="bg-elec-dark/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{tip.title}</h4>
                  <p className="text-gray-300 text-sm">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Tip</h4>
          <p className="text-gray-300 text-sm">
            Document your installation with photos before closing up walls or ceilings. This creates a valuable 
            reference for future maintenance and demonstrates professional workmanship to customers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section1Practical;