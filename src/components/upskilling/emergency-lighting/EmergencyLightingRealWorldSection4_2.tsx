import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export const EmergencyLightingRealWorldSection4_2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hospital Case Study */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-5">
            <h4 className="text-purple-400 font-bold text-lg mb-3">Birmingham Hospital — Central Battery System</h4>
            <div className="space-y-3 text-foreground text-sm">
              <p className="leading-relaxed">
                <strong>Scenario:</strong> A large hospital with over 2,000 emergency luminaires across multiple buildings required a reliable emergency lighting solution for critical areas including operating theatres, corridors, and fire escape routes.
              </p>
              <p className="leading-relaxed">
                <strong>Solution:</strong> A central battery system was installed with fire-resistant cabling throughout. The battery bank was housed in a dedicated, ventilated room with remote monitoring capabilities.
              </p>
              <div className="bg-purple-500/20 rounded p-3 mt-3">
                <p className="font-semibold text-purple-300 mb-2">Results:</p>
                <ul className="space-y-1 text-xs">
                  <li>• High installation cost justified by 15-year battery life</li>
                  <li>• Maintenance simplified — single location for testing</li>
                  <li>• Remote monitoring reduced routine inspection time by 60%</li>
                  <li>• System met stringent healthcare facility standards</li>
                  <li>• Reduced long-term operational costs significantly</li>
                </ul>
              </div>
            </div>
          </div>

          {/* School Case Study */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
            <h4 className="text-blue-400 font-bold text-lg mb-3">Primary School — Self-Contained System</h4>
            <div className="space-y-3 text-foreground text-sm">
              <p className="leading-relaxed">
                <strong>Scenario:</strong> A local primary school with 150 emergency fittings across classrooms, halls, and corridors needed to upgrade its emergency lighting within a tight budget.
              </p>
              <p className="leading-relaxed">
                <strong>Solution:</strong> Self-contained emergency luminaires were installed throughout, using standard final circuit wiring. Automated self-test fittings were chosen to reduce manual testing requirements.
              </p>
              <div className="bg-blue-500/20 rounded p-3 mt-3">
                <p className="font-semibold text-blue-300 mb-2">Results:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Low installation cost suited limited school budget</li>
                  <li>• No dedicated battery room required</li>
                  <li>• Independent units prevented system-wide failures</li>
                  <li>• Self-test feature reduced annual maintenance costs</li>
                  <li>• Simple replacement when individual units failed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <p className="text-foreground text-sm leading-relaxed">
            <strong className="text-elec-yellow">Key Takeaway:</strong> Each system suited the risk profile and budget of the building. The hospital prioritised long-term reliability and centralised maintenance, whilst the school prioritised low upfront costs and installation simplicity. Both approaches met BS 5266 compliance whilst addressing their specific operational needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
