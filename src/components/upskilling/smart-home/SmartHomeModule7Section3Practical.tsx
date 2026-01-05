import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, MapPin, TestTube2, Users } from 'lucide-react';

const SmartHomeModule7Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 mb-4">
          As an electrician working with smart home wireless systems, these practical approaches will help ensure reliable connectivity:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <TestTube2 className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-foreground">Pre-Installation Testing</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Test Wi-Fi and RF signal before finalising device placement</li>
              <li>• Use smartphone apps for basic signal strength checks</li>
              <li>• Identify dead zones and interference sources early</li>
              <li>• Plan device locations around strong coverage areas</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-green-400" />
              <span className="font-medium text-foreground">Coverage Documentation</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Document areas of poor coverage for client records</li>
              <li>• Advise clients if network upgrades are needed</li>
              <li>• Map out signal strength at key device locations</li>
              <li>• Note interference sources and mitigation options</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-foreground">Client Education</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Train clients to use Wi-Fi analyser apps</li>
              <li>• Explain how to check signal strength themselves</li>
              <li>• Show them basic troubleshooting steps</li>
              <li>• Provide guidance on when to call for support</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-foreground">Design Considerations</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Design installations around strong coverage, not force devices into dead zones</li>
              <li>• Consider mesh network requirements early in planning</li>
              <li>• Account for building materials that affect signals</li>
              <li>• Plan for future expansion and additional devices</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-2">Testing Tools Recommendation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-foreground font-medium">Free Apps:</span>
              <ul className="text-gray-300 mt-1 space-y-1">
                <li>• WiFi Analyzer (Android)</li>
                <li>• Network Analyzer (iOS)</li>
                <li>• WiFi Explorer (iOS)</li>
              </ul>
            </div>
            <div>
              <span className="text-foreground font-medium">Professional Tools:</span>
              <ul className="text-gray-300 mt-1 space-y-1">
                <li>• RF spectrum analysers</li>
                <li>• Professional Wi-Fi survey tools</li>
                <li>• Network cable testers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Best Practices</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Strong signals reduce call-backs and keep systems stable
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Invest time in proper testing — it prevents future problems
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Document everything for warranty and support purposes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Build client confidence by explaining your testing process
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section3Practical;