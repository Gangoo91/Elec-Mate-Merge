import { Globe, Users, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MatterStandardSection = () => {
  const matterBenefits = [
    "Works across Apple HomeKit, Google Home, Amazon Alexa",
    "Single app can control devices from different manufacturers",
    "Local processing reduces cloud dependency",
    "Simplified setup with Matter certification logo",
    "Enhanced security with device attestation"
  ];

  const supportedProtocols = [
    { name: "Wi-Fi", status: "Full Support", description: "High-bandwidth devices" },
    { name: "Thread", status: "Full Support", description: "Low-power mesh devices" },
    { name: "Ethernet", status: "Full Support", description: "Wired infrastructure" },
    { name: "Zigbee", status: "Bridge Required", description: "Via Matter bridges" },
    { name: "Z-Wave", status: "Bridge Required", description: "Via Matter bridges" }
  ];

  const majorBackers = [
    "Apple", "Google", "Amazon", "Samsung", "Philips", 
    "IKEA", "Nanoleaf", "Eve Systems", "Aqara", "TP-Link"
  ];

  const realWorldImpact = [
    {
      before: "Device locked to specific ecosystem",
      after: "Works with any Matter-compatible platform",
      icon: <Globe className="h-4 w-4" />
    },
    {
      before: "Multiple apps for different brands",
      after: "Single app controls all certified devices",
      icon: <Users className="h-4 w-4" />
    },
    {
      before: "Complex setup and pairing",
      after: "Scan QR code, works everywhere",
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Star className="h-5 w-5 text-elec-yellow" />
          4. Matter Standard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-foreground">
        <p>
          Matter is not a protocol itself, but an application layer standard developed by the Connectivity Standards Alliance (CSA). It promises to solve the smart home's biggest problem: device compatibility. By creating a common language that works over existing protocols, Matter enables true interoperability between brands and ecosystems.
        </p>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">What Matter Solves</h4>
          <div className="space-y-3">
            {realWorldImpact.map((impact, index) => (
              <div key={index} className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-elec-yellow mt-0.5">
                    {impact.icon}
                  </div>
                  <div className="flex-1">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-red-400 text-sm font-medium">Before Matter:</p>
                        <p className="text-foreground text-sm">{impact.before}</p>
                      </div>
                      <div>
                        <p className="text-green-400 text-sm font-medium">With Matter:</p>
                        <p className="text-foreground text-sm">{impact.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Key Benefits</h4>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <ul className="space-y-2">
                {matterBenefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Protocol Support</h4>
            <div className="space-y-2">
              {supportedProtocols.map((protocol, index) => (
                <div key={index} className="bg-elec-dark border border-gray-600 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-foreground font-medium">{protocol.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      protocol.status === 'Full Support' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}>
                      {protocol.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{protocol.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Industry Support</h4>
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <p className="text-sm text-foreground mb-3">Major companies backing Matter include:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {majorBackers.map((company, index) => (
                <div key={index} className="bg-elec-dark rounded px-3 py-1 text-center">
                  <span className="text-sm text-blue-400">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-400 font-semibold mb-3">Matter Certification</h4>
          <p className="text-sm text-foreground">
            Look for the Matter logo on devices - this guarantees compatibility across ecosystems. The certification process ensures devices meet strict interoperability and security requirements.
          </p>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Quick Check:</h4>
          <p className="text-sm text-foreground">What problem is Matter designed to solve, and how does it achieve this without replacing existing protocols?</p>
        </div>
      </CardContent>
    </Card>
  );
};