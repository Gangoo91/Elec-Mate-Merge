import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle } from 'lucide-react';

export const EmergencyLightingPracticalSection4_3 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-blue-300">Use Manufacturer Data</h4>
            </div>
            <p className="text-sm">
              Always use manufacturer data for battery efficiency and expected life cycle. Generic calculations 
              may not account for specific battery chemistry characteristics.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-blue-300">LED Driver Consumption</h4>
            </div>
            <p className="text-sm">
              For LED luminaires, check emergency driver consumption—not just lamp wattage. Driver losses can 
              add 10-20% to total load.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-blue-300">Battery Technology Selection</h4>
            </div>
            <p className="text-sm">
              Select NiCd, NiMH, or Lithium-ion depending on environment, size, and maintenance requirements. 
              Each has different characteristics for temperature tolerance and cycle life.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-blue-300">Ventilation and Cooling</h4>
            </div>
            <p className="text-sm">
              Ensure adequate ventilation and cooling in central battery rooms. High temperatures accelerate 
              battery degradation and reduce capacity.
            </p>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4 md:col-span-2">
            <div className="flex items-start gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-semibold text-blue-300">Regular Testing</h4>
            </div>
            <p className="text-sm">
              Test batteries regularly—even correctly sized batteries degrade with time. BS 5266-1 requires 
              monthly and annual duration tests to verify performance.
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Battery Technology Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600/30">
                  <th className="text-left p-2 text-foreground">Technology</th>
                  <th className="text-left p-2 text-foreground">Life Expectancy</th>
                  <th className="text-left p-2 text-foreground">Temperature Range</th>
                  <th className="text-left p-2 text-foreground">Maintenance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-600/20">
                  <td className="p-2 font-semibold text-elec-yellow">NiCd</td>
                  <td className="p-2">3-5 years</td>
                  <td className="p-2">-20°C to +50°C</td>
                  <td className="p-2">Moderate</td>
                </tr>
                <tr className="border-b border-gray-600/20">
                  <td className="p-2 font-semibold text-elec-yellow">NiMH</td>
                  <td className="p-2">3-5 years</td>
                  <td className="p-2">0°C to +40°C</td>
                  <td className="p-2">Low</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-elec-yellow">Lithium-ion</td>
                  <td className="p-2">5-10 years</td>
                  <td className="p-2">-10°C to +45°C</td>
                  <td className="p-2">Very Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <p className="text-elec-yellow font-medium">
            <strong>Professional Tip:</strong> Always over-specify battery capacity slightly rather than 
            under-sizing. The additional cost is minimal compared to the risk of system failure during an 
            emergency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
