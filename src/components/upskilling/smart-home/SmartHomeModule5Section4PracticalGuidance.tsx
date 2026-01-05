import { Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4PracticalGuidance = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance for Electricians
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-yellow/10 p-4 rounded-lg border border-elec-yellow/30">
          <h4 className="text-foreground font-semibold mb-3">Installation and Setup Responsibilities</h4>
          <p className="text-sm mb-3">
            As an electrician installing smart home systems, your role extends beyond basic wiring 
            to include network configuration, security setup, and customer education. Proper 
            remote access configuration is critical for system reliability and user satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Pre-Installation Checklist</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Network Assessment</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Test internet speed and reliability</li>
                  <li>• Check Wi-Fi coverage in all device locations</li>
                  <li>• Verify router specifications and capabilities</li>
                  <li>• Plan network segmentation if required</li>
                </ul>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Customer Requirements</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Understand desired remote access features</li>
                  <li>• Identify mobile devices to be used</li>
                  <li>• Discuss notification preferences</li>
                  <li>• Plan user access levels for family members</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Security Planning</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Establish strong authentication requirements</li>
                  <li>• Plan firewall and network security</li>
                  <li>• Identify backup access methods</li>
                  <li>• Create security incident response plan</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Configuration Best Practices</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-orange-400 font-semibold text-sm mb-1">Network Setup</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Position hubs for optimal coverage</li>
                  <li>• Configure Quality of Service (QoS) rules</li>
                  <li>• Set up guest networks for visitors</li>
                  <li>• Enable automatic firmware updates</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">Security Configuration</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Enable WPA3 encryption on Wi-Fi</li>
                  <li>• Set up strong admin passwords</li>
                  <li>• Configure two-factor authentication</li>
                  <li>• Disable unnecessary network services</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Device Management</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Label all devices clearly in the app</li>
                  <li>• Set up logical device groupings</li>
                  <li>• Configure appropriate notification levels</li>
                  <li>• Test all remote access functions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Customer Education Essentials</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Initial Training:</p>
              <ul className="text-xs space-y-1">
                <li>• Demonstrate app installation and login</li>
                <li>• Show basic device control functions</li>
                <li>• Explain notification settings</li>
                <li>• Practice emergency procedures</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Security Education:</p>
              <ul className="text-xs space-y-1">
                <li>• Emphasise strong password importance</li>
                <li>• Explain two-factor authentication</li>
                <li>• Discuss safe remote access practices</li>
                <li>• Provide security update guidelines</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Ongoing Support:</p>
              <ul className="text-xs space-y-1">
                <li>• Provide troubleshooting guide</li>
                <li>• Schedule follow-up check visits</li>
                <li>• Offer firmware update service</li>
                <li>• Establish emergency contact procedures</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
          <h4 className="text-red-400 font-semibold mb-3">Critical Reminders</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Always Verify:</p>
              <ul className="text-xs space-y-1">
                <li>• Reliable Wi-Fi coverage before configuration</li>
                <li>• Hub positioning for optimal device coverage</li>
                <li>• All remote functions work before completion</li>
                <li>• Customer understands security requirements</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Never Forget:</p>
              <ul className="text-xs space-y-1">
                <li>• Document all passwords and configurations</li>
                <li>• Test emergency access procedures</li>
                <li>• Provide written setup instructions</li>
                <li>• Schedule maintenance reminder alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};