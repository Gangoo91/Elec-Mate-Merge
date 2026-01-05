import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, Search, CheckSquare, AlertTriangle, Award } from 'lucide-react';

export const CompatibilityMappingSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Map className="h-5 w-5 text-elec-yellow" />
          Compatibility Mapping
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-200 font-semibold mb-2">What is Compatibility Mapping?</h4>
          <p className="text-green-100">
            Researching device support before purchase or installation to ensure all components will work together seamlessly in the client's chosen ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2">
            <Search className="h-4 w-4 text-yellow-400" />
            What to Check Before Purchase
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <h5 className="text-yellow-400 font-medium mb-2">Protocol Support</h5>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>• Zigbee 3.0 certification</li>
                <li>• Z-Wave Plus compatibility</li>
                <li>• Wi-Fi standards (2.4GHz/5GHz)</li>
                <li>• Thread/Matter support</li>
                <li>• Bluetooth LE versions</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <h5 className="text-green-400 font-medium mb-2">Ecosystem Support</h5>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>• Amazon Alexa certification</li>
                <li>• Google Assistant compatibility</li>
                <li>• Apple HomeKit support</li>
                <li>• SmartThings integration</li>
                <li>• Third-party hub support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-900/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Matter Certification Check
          </h4>
          <p className="text-purple-100 text-sm mb-2">
            Look for Matter certification logos on packaging and product specifications. Matter devices offer enhanced interoperability across ecosystems.
          </p>
          <div className="text-xs text-purple-200">
            <strong>Tip:</strong> Matter certification ensures future-proofing as the standard becomes widely adopted.
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-amber-200 font-semibold mb-2">Installer Tip</h4>
              <p className="text-amber-100 text-sm">
                Always maintain a compatibility checklist for clients. Document supported protocols, required hubs, and any limitations before finalising device selections.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3">Mapping Process Steps</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">1. Identify client's preferred voice assistant/platform</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">2. Check existing hub/gateway compatibility</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">3. Verify device protocol support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">4. Confirm certification requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-100">5. Document any bridge/adapter needs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};