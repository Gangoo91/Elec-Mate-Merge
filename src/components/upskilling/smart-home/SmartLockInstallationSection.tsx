import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, CheckCircle2, AlertCircle, Settings } from 'lucide-react';

export const SmartLockInstallationSection = () => {
  const installationSteps = [
    {
      step: "1",
      title: "Property Assessment",
      description: "Evaluate door type, existing lock, and connectivity requirements",
      details: ["Check door thickness and material", "Assess existing deadbolt compatibility", "Test Wi-Fi signal strength at door"]
    },
    {
      step: "2", 
      title: "Lock Selection",
      description: "Choose appropriate smart lock type based on assessment",
      details: ["Retrofit vs replacement decision", "Connectivity method selection", "Feature requirements (keypad, biometric, etc.)"]
    },
    {
      step: "3",
      title: "Installation",
      description: "Professional installation following manufacturer guidelines",
      details: ["Precise alignment for smooth operation", "Secure mounting and calibration", "Battery installation and testing"]
    },
    {
      step: "4",
      title: "Configuration & Testing",
      description: "Set up connectivity, codes, and perform comprehensive testing",
      details: ["App pairing and user setup", "PIN code configuration", "Integration with existing smart home systems"]
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Installation Process and Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p>
          Professional installation ensures optimal performance and security. The process varies by lock type but follows consistent best practices for assessment, installation, and testing.
        </p>

        <div className="space-y-4">
          {installationSteps.map((step, index) => (
            <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-elec-yellow/10 rounded-lg">
                  <Badge variant="secondary" className="bg-elec-yellow text-elec-dark font-bold">
                    {step.step}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                  <div className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-6">
          <h4 className="font-semibold text-foreground mb-4">Property Type Considerations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-600 rounded-lg">
              <h5 className="font-medium text-blue-200 mb-2">Apartments</h5>
              <ul className="text-xs text-blue-100 space-y-1">
                <li>• Often require retrofit solutions</li>
                <li>• Check lease restrictions</li>
                <li>• Bluetooth/Wi-Fi connectivity</li>
                <li>• Minimal visible modifications</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-600 rounded-lg">
              <h5 className="font-medium text-green-200 mb-2">Family Homes</h5>
              <ul className="text-xs text-green-100 space-y-1">
                <li>• Replacement locks often suitable</li>
                <li>• Multiple user codes needed</li>
                <li>• Integration with security systems</li>
                <li>• Child-friendly operation</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-lg">
              <h5 className="font-medium text-purple-200 mb-2">Rental Properties</h5>
              <ul className="text-xs text-purple-100 space-y-1">
                <li>• Remote management essential</li>
                <li>• Temporary code generation</li>
                <li>• Easy tenant turnover</li>
                <li>• Audit trail for security</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-600 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-200 mb-2">Important Installation Notes</h4>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• Always test mechanical backup key before completing installation</li>
                <li>• Ensure proper door alignment to prevent jamming</li>
                <li>• Check local building codes and insurance requirements</li>
                <li>• Provide client training on operation and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};