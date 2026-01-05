import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const FutureTrendsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          7. Future Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          HVAC integration and interlocks are evolving rapidly with advances in AI, renewable energy, and smart grid technology. 
          These developments promise even greater efficiency and environmental benefits.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
              AI-Based Optimisation
            </h4>
            <div className="space-y-2 text-sm text-blue-100">
              <p><strong>Predictive Heating/Cooling Loads:</strong></p>
              <p>AI systems will predict HVAC needs hours in advance using weather data, occupancy patterns, and building thermal models.</p>
              <p className="text-xs text-blue-200 mt-2">
                Result: Pre-conditioning buildings when energy is cheapest and most renewable.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/40 border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
              Grid-Aware Interlocks
            </h4>
            <div className="space-y-2 text-sm text-green-100">
              <p><strong>Dynamic Energy Management:</strong></p>
              <p>Systems will pause HVAC during peak tariffs and prioritise operation when renewable energy is abundant.</p>
              <p className="text-xs text-green-200 mt-2">
                Result: Lower bills and reduced carbon footprint through intelligent timing.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-950/40 to-pink-950/40 border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3 flex items-center gap-2">
              Renewable Integration
            </h4>
            <div className="space-y-2 text-sm text-purple-100">
              <p><strong>Storage &amp; Generation Coordination:</strong></p>
              <p>Greater integration with solar panels, heat pumps, and battery storage for zero-emission operation.</p>
              <p className="text-xs text-purple-200 mt-2">
                Result: Self-sufficient buildings that generate and store their own energy.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-4">Technology Convergence</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-foreground mb-2">Near-term (2-5 years):</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Machine learning for occupancy prediction</li>
                <li>• Carbon-aware control systems</li>
                <li>• Enhanced sensor integration</li>
                <li>• Improved user interfaces</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Long-term (5+ years):</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Fully autonomous building management</li>
                <li>• Neighbourhood-level energy coordination</li>
                <li>• Zero-emission building standards</li>
                <li>• Advanced predictive maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 border border-yellow-600 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-2">Industry Impact</h4>
          <p className="text-sm text-yellow-100">
            These trends will reshape the HVAC industry, requiring installers and technicians to develop new skills in 
            smart systems, data analysis, and renewable energy integration. Continuous learning will be essential 
            for professionals working with next-generation building automation systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};