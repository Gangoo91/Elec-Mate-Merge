import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Key, RefreshCw, Users, Settings, AlertTriangle } from 'lucide-react';

export const SmartLockBestPracticesSection = () => {
  const practices = [
    {
      icon: Key,
      title: "Always Provide Mechanical Key Override",
      description: "Never rely solely on electronic access",
      tips: ["Keep backup key in secure location", "Test mechanical override regularly", "Inform family members of backup key location"]
    },
    {
      icon: ShieldCheck,
      title: "Use Strong PIN Codes", 
      description: "Avoid common or easily guessed combinations",
      tips: ["Avoid '1234', '0000', or birthdates", "Use 6+ digit codes when possible", "Mix up number patterns"]
    },
    {
      icon: RefreshCw,
      title: "Keep Firmware Updated",
      description: "Regular updates patch security vulnerabilities",
      tips: ["Enable automatic updates where available", "Check manufacturer websites monthly", "Update immediately after security advisories"]
    },
    {
      icon: Users,
      title: "Educate Clients on Access Management",
      description: "Proper code management prevents security breaches",
      tips: ["Revoke old codes promptly", "Use temporary codes for guests", "Monitor access logs regularly"]
    }
  ];

  const risks = [
    {
      icon: AlertTriangle,
      title: "Security Risks",
      items: ["Hacking or poor encryption", "Code sharing reduces security", "Installation errors affect operation"]
    },
    {
      icon: Settings,
      title: "Technical Challenges",
      items: ["Power failure/battery depletion", "Wi-Fi connectivity issues", "Mechanical alignment problems"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-elec-yellow" />
          Best Practices for Installation and Use
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Proper installation and ongoing management are crucial for smart lock security and reliability. Following these best practices ensures optimal performance and client satisfaction.
        </p>

        <div className="space-y-4">
          {practices.map((practice, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-green-600 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <practice.icon className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{practice.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{practice.description}</p>
                  <div className="space-y-1">
                    {practice.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-green-400" />
                        <span className="text-xs text-gray-400">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h4 className="font-semibold text-foreground mb-4">Common Risks and Challenges</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {risks.map((risk, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] border border-red-600 rounded-lg">
                <div className="flex items-start gap-3">
                  <risk.icon className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-red-200 mb-2">{risk.title}</h5>
                    <ul className="space-y-1">
                      {risk.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-xs text-gray-400 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-blue-200 mb-3">Installation Testing Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground text-sm mb-2">Mechanical Tests</h5>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Door alignment and latch operation</li>
                <li>• Backup key functionality</li>
                <li>• Lock/unlock smooth operation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground text-sm mb-2">Electronic Tests</h5>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• App connectivity and control</li>
                <li>• PIN code entry and validation</li>
                <li>• Battery level and low-battery alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};