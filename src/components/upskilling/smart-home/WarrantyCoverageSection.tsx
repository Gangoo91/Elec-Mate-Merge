import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Clock, AlertCircle } from 'lucide-react';

const WarrantyCoverageSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          2. Warranty Coverage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Clear warranty explanation protects both installer and client by setting realistic expectations 
          about what is covered and what responsibilities each party has.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                Manufacturer Warranties
              </h4>
              <p className="text-gray-300 text-sm mb-2">Most devices come with manufacturer coverage:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Typically 1–3 years for hardware defects</li>
                <li>• Covers manufacturing faults and component failures</li>
                <li>• May require proof of purchase and installation</li>
                <li>• Usually excludes damage from misuse or environmental factors</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                Installation Workmanship Warranty
              </h4>
              <p className="text-gray-300 text-sm mb-2">Installer warranties typically cover:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Usually 12 months workmanship guarantee</li>
                <li>• Covers installation faults and wiring issues</li>
                <li>• Includes configuration and commissioning problems</li>
                <li>• Separate from device manufacturer warranties</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
              <h4 className="font-medium text-red-200 mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                What's NOT Covered
              </h4>
              <p className="text-red-100 text-sm mb-2">Clients must understand exclusions:</p>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• Damage from misuse or unauthorised modifications</li>
                <li>• Network connectivity issues beyond installer control</li>
                <li>• Software updates that change device functionality</li>
                <li>• Environmental damage (flooding, lightning, etc.)</li>
                <li>• Normal wear and tear or battery replacements</li>
              </ul>
            </div>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-medium text-amber-200 mb-2">Client Responsibilities</h4>
              <p className="text-amber-100 text-sm mb-2">For warranty validity:</p>
              <ul className="text-amber-100 text-sm space-y-1">
                <li>• Keep installation and purchase receipts</li>
                <li>• Follow manufacturer usage guidelines</li>
                <li>• Report issues promptly when discovered</li>
                <li>• Allow reasonable access for warranty work</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-200 mb-2">Warranty Communication Best Practices</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Clear Explanation</h5>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Distinguish between manufacturer and installer warranties</li>
                <li>• Provide warranty periods in writing</li>
                <li>• Explain claim procedures for different issues</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Documentation</h5>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Provide warranty cards and certificates</li>
                <li>• Include contact details for warranty claims</li>
                <li>• Keep records of all warranty information provided</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarrantyCoverageSection;