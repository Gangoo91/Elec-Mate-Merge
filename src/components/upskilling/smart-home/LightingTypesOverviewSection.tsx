import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid3X3 } from 'lucide-react';

export const LightingTypesOverviewSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-elec-yellow" />
          Overview of Smart Lighting Types
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Decision Framework: Which System When?</h4>
          <p className="text-sm mb-4">
            Each lighting system excels in specific scenarios. Understanding these patterns helps you recommend the right solution first time.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-blue-200">1. Smart Bulbs (Wireless Individual)</h4>
              <span className="text-xs bg-blue-600/20 text-blue-200 px-2 py-1 rounded">Entry Level</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-blue-100 font-medium">Best For:</p>
                <ul className="text-blue-100 text-xs space-y-1 mt-1">
                  <li>• Rental properties</li>
                  <li>• Testing concepts</li>
                  <li>• Individual accent lighting</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-100 font-medium">Cost Range:</p>
                <p className="text-xs text-blue-100">£15-£50 per bulb</p>
                <p className="text-xs text-blue-200">Total: £150-500 per room</p>
              </div>
              <div>
                <p className="text-blue-100 font-medium">Installation:</p>
                <p className="text-xs text-blue-100">Plug & play</p>
                <p className="text-xs text-blue-200">5 mins per bulb</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-600/10 border-l-4 border-green-500 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-green-200">2. Smart Switches (Circuit Control)</h4>
              <span className="text-xs bg-green-600/20 text-green-200 px-2 py-1 rounded">Practical</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-green-100 font-medium">Best For:</p>
                <ul className="text-green-100 text-xs space-y-1 mt-1">
                  <li>• Whole room control</li>
                  <li>• Standard LED fittings</li>
                  <li>• Cost-conscious projects</li>
                </ul>
              </div>
              <div>
                <p className="text-green-100 font-medium">Cost Range:</p>
                <p className="text-xs text-green-100">£25-£80 per switch</p>
                <p className="text-xs text-green-200">Total: £50-200 per room</p>
              </div>
              <div>
                <p className="text-green-100 font-medium">Installation:</p>
                <p className="text-xs text-green-100">Replace wall switch</p>
                <p className="text-xs text-green-200">30-60 mins per switch</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-600/10 border-l-4 border-purple-500 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-purple-200">3. Centralised Systems (Professional)</h4>
              <span className="text-xs bg-purple-600/20 text-purple-200 px-2 py-1 rounded">Premium</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-purple-100 font-medium">Best For:</p>
                <ul className="text-purple-100 text-xs space-y-1 mt-1">
                  <li>• New builds</li>
                  <li>• Commercial projects</li>
                  <li>• Maximum reliability</li>
                </ul>
              </div>
              <div>
                <p className="text-purple-100 font-medium">Cost Range:</p>
                <p className="text-xs text-purple-100">£5-15k whole house</p>
                <p className="text-xs text-purple-200">Plus installation costs</p>
              </div>
              <div>
                <p className="text-purple-100 font-medium">Installation:</p>
                <p className="text-xs text-purple-100">Dedicated wiring</p>
                <p className="text-xs text-purple-200">Professional only</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-600/10 border-l-4 border-orange-500 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-orange-200">4. Hybrid Systems (Balanced)</h4>
              <span className="text-xs bg-orange-600/20 text-orange-200 px-2 py-1 rounded">Optimal</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-orange-100 font-medium">Best For:</p>
                <ul className="text-orange-100 text-xs space-y-1 mt-1">
                  <li>• Retrofit upgrades</li>
                  <li>• Future flexibility</li>
                  <li>• Mixed requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-orange-100 font-medium">Cost Range:</p>
                <p className="text-xs text-orange-100">£2-8k whole house</p>
                <p className="text-xs text-orange-200">Scalable approach</p>
              </div>
              <div>
                <p className="text-orange-100 font-medium">Installation:</p>
                <p className="text-xs text-orange-100">Mixed complexity</p>
                <p className="text-xs text-orange-200">Phased deployment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h5 className="text-yellow-200 font-medium mb-2">Quick Selection Guide</h5>
          <div className="text-sm text-yellow-100 space-y-1">
            <p><strong>Budget under £500:</strong> Smart bulbs for key rooms</p>
            <p><strong>Renting property:</strong> Smart bulbs only</p>
            <p><strong>Own home, tight budget:</strong> Smart switches</p>
            <p><strong>New build/major renovation:</strong> Centralised system</p>
            <p><strong>Existing home, future-proofing:</strong> Hybrid approach</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};