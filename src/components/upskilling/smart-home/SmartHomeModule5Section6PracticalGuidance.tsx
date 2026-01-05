import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

export const SmartHomeModule5Section6PracticalGuidance = () => {
  const steps = [
    "Never leave devices with default usernames and passwords",
    "Check router settings with the client — confirm encryption is enabled",
    "Show the homeowner how to update firmware and apps",
    "Encourage clients to regularly review who has access to their system"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground mb-4">
          When installing smart home systems:
        </p>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-elec-dark rounded-lg border border-gray-600">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{step}</span>
            </div>
          ))}
        </div>

        <div className="bg-yellow-950/20 p-4 rounded-lg border border-yellow-800/30 mt-6">
          <h4 className="font-semibold text-yellow-400 mb-2">Professional Tip</h4>
          <p className="text-gray-300 text-sm">
            Create a simple security handover checklist that you can use with every client. 
            This ensures consistent security practices and demonstrates your professionalism. 
            Include items like password changes, encryption verification, and basic security education.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};