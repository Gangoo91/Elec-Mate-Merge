import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const SmartHomeModule5Section6Summary = () => {
  const keyPoints = [
    "Smart homes depend on secure networks for safe operation",
    "Risks include hacking, data theft, and privacy breaches",
    "Strong passwords, encryption, firmware updates, and 2FA are essential defences",
    "Electricians must ensure secure installation and educate clients about maintaining security"
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
          Key takeaways from Network Security and User Privacy:
        </p>
        
        <div className="space-y-3">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{point}</span>
            </div>
          ))}
        </div>

        <div className="bg-yellow-950/20 p-4 rounded-lg border border-yellow-800/30 mt-6">
          <h4 className="font-semibold text-yellow-400 mb-2">Your Professional Responsibility</h4>
          <p className="text-gray-300 text-sm">
            As an electrician installing smart home systems, you have a duty of care to ensure that systems 
            are not only functional but also secure. This includes changing default passwords, configuring 
            security settings, educating clients about ongoing security maintenance, and staying informed 
            about current threats and best practices. Never hand over a system with default security settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};