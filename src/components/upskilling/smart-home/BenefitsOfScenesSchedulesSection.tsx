import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const BenefitsOfScenesSchedulesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits of Scenes & Schedules
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid gap-4">
          <div className="p-4 bg-green-600/10 border-l-4 border-green-500 rounded-lg">
            <h5 className="font-semibold text-green-200 mb-3">💰 Energy Efficiency & Cost Savings</h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-100 font-medium mb-2">Quantified Energy Savings:</p>
                <ul className="text-green-100 space-y-1">
                  <li>• Occupancy sensing: 20-50% reduction</li>
                  <li>• Daylight harvesting: 15-40% reduction</li>
                  <li>• Scheduled dimming: 10-30% reduction</li>
                  <li>• Combined systems: 40-70% total savings</li>
                </ul>
              </div>
              <div>
                <p className="text-green-100 font-medium mb-2">Real-World Cost Impact:</p>
                <ul className="text-green-100 space-y-1">
                  <li>• Typical home: £200-400/year savings</li>
                  <li>• Commercial office: £2-8 per m² annually</li>
                  <li>• LED + smart control: 80-90% vs incandescent</li>
                  <li>• Peak demand charges reduced 30-60%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-3">🏡 Comfort & Lifestyle Enhancement</h5>
            <div className="text-sm">
              <p className="text-blue-100 mb-2"><strong>Circadian Health Benefits:</strong> Improved sleep quality (15-25% better), reduced eye strain, enhanced mood and productivity, support for shift workers.</p>
              <p className="text-blue-100"><strong>Convenience Features:</strong> One-touch scene activation, automatic seasonal adjustments, voice control integration, remote monitoring.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};