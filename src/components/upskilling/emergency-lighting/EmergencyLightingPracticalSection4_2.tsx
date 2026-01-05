import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const EmergencyLightingPracticalSection4_2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-elec-yellow mt-1 font-bold">→</span>
            <p className="text-foreground leading-relaxed">
              <strong className="text-elec-yellow">For smaller projects</strong>, recommend self-contained units for cost and simplicity. They're easier to install and don't require dedicated battery rooms.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-elec-yellow mt-1 font-bold">→</span>
            <p className="text-foreground leading-relaxed">
              <strong className="text-elec-yellow">For critical infrastructure</strong>, central battery systems provide long-term reliability and reduced maintenance workload despite higher upfront costs.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-elec-yellow mt-1 font-bold">→</span>
            <p className="text-foreground leading-relaxed">
              <strong className="text-elec-yellow">Always design central battery cabling</strong> using enhanced fire-resistant cable (FP200, FP Plus, or equivalent) to maintain circuit integrity during fire conditions.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-elec-yellow mt-1 font-bold">→</span>
            <p className="text-foreground leading-relaxed">
              <strong className="text-elec-yellow">Discuss maintenance budgets</strong> with the client — central systems cost more upfront but save labour in the long run. Calculate 10-year lifecycle costs to demonstrate value.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-elec-yellow mt-1 font-bold">→</span>
            <p className="text-foreground leading-relaxed">
              <strong className="text-elec-yellow">Ensure battery rooms are ventilated and secure</strong> if central systems are used. They must be accessible for maintenance but protected from unauthorised access.
            </p>
          </li>
        </ul>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
          <h4 className="text-amber-400 font-semibold mb-2">System Selection Decision Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/30">
                  <th className="text-left text-foreground py-2 pr-4">Factor</th>
                  <th className="text-left text-foreground py-2 px-4">Self-Contained</th>
                  <th className="text-left text-foreground py-2 pl-4">Central Battery</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-medium">Installation Cost</td>
                  <td className="py-2 px-4">Low</td>
                  <td className="py-2 pl-4">High</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-medium">Maintenance Cost</td>
                  <td className="py-2 px-4">High (labour-intensive)</td>
                  <td className="py-2 pl-4">Low (centralised)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-medium">Battery Life</td>
                  <td className="py-2 px-4">3–5 years</td>
                  <td className="py-2 pl-4">10–25 years</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-medium">Best For</td>
                  <td className="py-2 px-4">Small-medium buildings</td>
                  <td className="py-2 pl-4">Large/critical facilities</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Space Required</td>
                  <td className="py-2 px-4">None</td>
                  <td className="py-2 pl-4">Dedicated battery room</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
