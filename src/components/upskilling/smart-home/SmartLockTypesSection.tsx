import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, RefreshCw, Replace, Hash, Fingerprint, Combine } from 'lucide-react';

export const SmartLockTypesSection = () => {
  const lockTypes = [
    {
      icon: RefreshCw,
      title: "Retrofit Locks",
      description: "Fit over existing deadbolts (e.g., August)",
      features: ["Easy installation", "Keep existing lock", "Less disruptive"],
      color: "blue"
    },
    {
      icon: Replace,
      title: "Replacement Locks", 
      description: "Fully replace traditional locks",
      features: ["Complete electronic control", "Better integration", "More secure"],
      color: "green"
    },
    {
      icon: Hash,
      title: "Keypad-Enabled Locks",
      description: "Allow PIN entry instead of keys",
      features: ["No physical keys needed", "Multiple user codes", "Temporary access"],
      color: "purple"
    },
    {
      icon: Fingerprint,
      title: "Biometric Locks",
      description: "Fingerprint/face recognition",
      features: ["Unique identification", "No codes to remember", "High security"],
      color: "orange"
    },
    {
      icon: Combine,
      title: "Hybrid Locks",
      description: "Support multiple methods (PIN + app + key)",
      features: ["Maximum flexibility", "Multiple backup options", "User choice"],
      color: "cyan"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "border-blue-600 text-blue-200",
      green: "border-green-600 text-green-200", 
      purple: "border-purple-600 text-purple-200",
      orange: "border-orange-600 text-orange-200",
      cyan: "border-cyan-600 text-cyan-200"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400", 
      orange: "text-orange-400",
      cyan: "text-cyan-400"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Layers className="h-5 w-5 text-elec-yellow" />
          Types of Smart Locks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Smart locks come in various forms, each designed for different installation requirements, security levels, and user preferences.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lockTypes.map((lockType, index) => (
            <div key={index} className={`p-4 bg-[#1a1a1a] border rounded-lg ${getColorClasses(lockType.color)}`}>
              <div className="flex items-start gap-3">
                <lockType.icon className={`h-6 w-6 mt-1 flex-shrink-0 ${getIconColor(lockType.color)}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{lockType.title}</h4>
                  <p className="text-sm text-gray-300 mb-3">{lockType.description}</p>
                  <div className="space-y-1">
                    {lockType.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${getIconColor(lockType.color).replace('text', 'bg')}`} />
                        <span className="text-xs text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h4 className="font-semibold text-foreground mb-4">Smart Keypads</h4>
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-200 mb-2">Advantages</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• No physical keys to copy or lose</li>
                  <li>• Temporary codes for guests/cleaners</li>
                  <li>• One-time codes for deliveries</li>
                  <li>• Easy code management via app</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-200 mb-2">Considerations</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Codes must be regularly updated</li>
                  <li>• Risk of code sharing</li>
                  <li>• Weather resistance important</li>
                  <li>• Battery maintenance required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};