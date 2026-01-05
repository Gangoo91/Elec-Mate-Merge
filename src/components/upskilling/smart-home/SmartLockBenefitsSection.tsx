import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Key, Shield, Smartphone, Clock, BarChart3 } from 'lucide-react';

export const SmartLockBenefitsSection = () => {
  const benefits = [
    {
      icon: Key,
      title: "Convenience",
      description: "Keyless entry eliminates the need to carry or find physical keys",
      examples: ["Hands-free entry when carrying groceries", "No more hiding spare keys", "Easy access for family members"]
    },
    {
      icon: Shield,
      title: "Access Control", 
      description: "Different codes for different users with varying permission levels",
      examples: ["Separate codes for family, cleaners, guests", "Time-limited access", "Instant code revocation"]
    },
    {
      icon: Smartphone,
      title: "Remote Management",
      description: "Lock/unlock from anywhere with internet connection",
      examples: ["Let in unexpected visitors", "Check if door is locked", "Emergency access control"]
    },
    {
      icon: BarChart3,
      title: "Audit Trail",
      description: "Track who entered and when for security and monitoring",
      examples: ["Know when kids arrive home", "Monitor service provider access", "Security breach investigation"]
    },
    {
      icon: Clock,
      title: "Smart Integration",
      description: "Trigger security scenes and automation when unlocking",
      examples: ["Unlock disarms alarm system", "Lights turn on automatically", "HVAC adjusts to occupied mode"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Heart className="h-5 w-5 text-elec-yellow" />
          Benefits of Smart Locks and Keypads
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Smart locks offer significant advantages over traditional mechanical locks, providing enhanced security, convenience, and integration capabilities for modern homes.
        </p>

        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <benefit.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{benefit.description}</p>
                  <div className="space-y-1">
                    {benefit.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-xs text-gray-400">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h4 className="font-semibold text-foreground mb-4">Integration Scenarios</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Arrival Scene</h5>
              <p className="text-blue-100 text-sm mb-2">When door unlocks:</p>
              <ul className="text-xs text-blue-100 space-y-1">
                <li>• Security system disarms</li>
                <li>• Entry lights turn on</li>
                <li>• Thermostat adjusts temperature</li>
                <li>• Music starts playing</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-600 rounded-lg">
              <h5 className="font-medium text-green-200 mb-2">Guest Access</h5>
              <p className="text-green-100 text-sm mb-2">Temporary visitor code:</p>
              <ul className="text-xs text-green-100 space-y-1">
                <li>• Time-limited access (e.g., 2-hour window)</li>
                <li>• Automatic expiry after use</li>
                <li>• Notification when code is used</li>
                <li>• No need to share permanent codes</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};