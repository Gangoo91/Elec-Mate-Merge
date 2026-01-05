import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const EnergyEfficiencyComparisonSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          Energy Efficiency Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Scheduled Control</h4>
            <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-3">
                <strong>Efficient when:</strong> Lifestyle is consistent and predictable
              </p>
              <ul className="space-y-1 text-blue-100 text-sm">
                <li>• Fixed routine households</li>
                <li>• Regular work/sleep patterns</li>
                <li>• Minimal unexpected schedule changes</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">AI Learning Control</h4>
            <div className="bg-green-950/30 border border-green-600 rounded-lg p-4">
              <p className="text-green-100 text-sm mb-3">
                <strong>More efficient for:</strong> Irregular households and dynamic lifestyles
              </p>
              <ul className="space-y-1 text-green-100 text-sm">
                <li>• Shift workers with changing schedules</li>
                <li>• Households with frequent travel</li>
                <li>• Variable occupancy patterns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-950/20 border border-yellow-600 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-2">Key Finding</h4>
          <p className="text-yellow-100">
            Both approaches can outperform traditional thermostats significantly, especially when combined with zoning systems. The choice depends on household patterns rather than inherent superiority of either method.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Typical Energy Savings</h4>
          <ul className="space-y-1 list-disc list-inside ml-4 text-sm">
            <li>Scheduled control: 15-25% vs. basic thermostat</li>
            <li>AI learning control: 20-30% vs. basic thermostat</li>
            <li>Both with zoning: Up to 40% savings possible</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};