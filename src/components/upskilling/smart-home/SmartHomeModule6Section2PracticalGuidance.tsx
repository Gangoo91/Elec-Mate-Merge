import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export const SmartHomeModule6Section2PracticalGuidance = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Wrench className="h-7 w-7 text-elec-yellow" />
          Practical Guidance for Electricians
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          Successfully integrating voice assistants requires careful planning, compatibility checking, and proper client education. Here's your practical guide:
        </p>

        {/* Pre-Installation Checklist */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
            <h4 className="font-semibold text-foreground">Pre-Installation Checklist</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-green-400 text-green-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <p className="text-foreground text-sm">
                <strong>Device Compatibility:</strong> Always verify that planned devices support the client's preferred voice assistant before purchase
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-400 text-green-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <p className="text-foreground text-sm">
                <strong>Network Requirements:</strong> Ensure robust Wi-Fi coverage throughout installation areas, especially for cloud-dependent systems
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-green-400 text-green-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <p className="text-foreground text-sm">
                <strong>Account Setup:</strong> Help clients create necessary accounts (Amazon, Google, Apple) and link them during installation
              </p>
            </div>
          </div>
        </div>

        {/* Common Issues & Solutions */}
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <h4 className="font-semibold text-foreground">Common Setup Issues</h4>
          </div>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Device Not Responding to Voice Commands</h5>
              <ul className="space-y-1 text-foreground text-sm ml-4">
                <li>• Check device is properly connected to hub/Wi-Fi</li>
                <li>• Verify device is "discoverable" in assistant app</li>
                <li>• Ensure device names are simple and unique</li>
                <li>• Test with direct app control first</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">"Device Unresponsive" Messages</h5>
              <ul className="space-y-1 text-foreground text-sm ml-4">
                <li>• Check internet connectivity on both hub and assistant device</li>
                <li>• Restart hub and re-discover devices</li>
                <li>• Update firmware on all connected devices</li>
                <li>• Disable and re-enable device skills/integrations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Client Training */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-6 w-6 text-blue-400" />
            <h4 className="font-semibold text-foreground">Essential Client Training</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Basic Commands</h5>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Device naming conventions</li>
                <li>• Room-based grouping</li>
                <li>• Scene activation phrases</li>
                <li>• Troubleshooting commands</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">App Navigation</h5>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Adding new devices</li>
                <li>• Creating routines/scenes</li>
                <li>• Privacy settings</li>
                <li>• Voice training features</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Professional Best Practices:</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground text-sm">Always test voice commands with the client present before completing installation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground text-sm">Provide written documentation of device names and common commands</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground text-sm">Discuss privacy implications and provide guidance on voice recording settings</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground text-sm">Schedule a follow-up call within one week to address any issues or questions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};