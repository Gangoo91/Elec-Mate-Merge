import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const SmartHomeModule5Section4Summary = () => {
  const summaryPoints = [
    "Remote access enables homeowners to control and monitor systems anywhere via the internet",
    "Mobile notifications provide instant awareness of events with customisable alert preferences", 
    "Cloud platforms support worldwide device management with real-time status monitoring",
    "Risks include connectivity issues and cybersecurity vulnerabilities requiring mitigation",
    "Electricians play a key role in setup, testing, security configuration, and customer training"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">
          Key takeaways from Remote Access and Alerts:
        </p>
        
        <div className="space-y-3">
          {summaryPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">{point}</p>
            </div>
          ))}
        </div>

        <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/30 mt-6">
          <h4 className="text-elec-yellow font-semibold mb-2">Professional Responsibility</h4>
          <p className="text-foreground text-sm">
            As an electrician, ensuring proper remote access configuration is essential for customer 
            satisfaction and system security. Always verify network reliability, implement strong security 
            measures, and provide comprehensive customer training before project completion.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};