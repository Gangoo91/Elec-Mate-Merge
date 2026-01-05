import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingRealWorldSection4_4 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-red-300 mb-3">
            London Office Refurbishment: Non-Compliant Segregation
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">The Project</h4>
              <p className="text-foreground">
                A large office refurbishment in central London involved installing a new emergency lighting system throughout a 6-storey building. The electrical contractor used existing cable tray infrastructure to minimise costs and installation time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">The Problem</h4>
              <p className="text-foreground mb-2">
                During inspection by Building Control, multiple non-compliances were identified:
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                <li>Emergency lighting cables run in the same plastic trunking as data and general power cables</li>
                <li>No physical separation between emergency and normal lighting circuits</li>
                <li>Plastic cable clips used instead of metal fixings</li>
                <li>Standard PVC cables instead of LSZH enhanced fire-resistant cables</li>
                <li>No dedicated distribution board for emergency circuits</li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-300 mb-2">Why This Failed Inspection</h4>
              <p className="text-foreground mb-2">
                The plastic trunking would fail under fire conditions, compromising circuit integrity. The installation violated:
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                <li><strong className="text-foreground">BS 7671 Regulation 521.10.202:</strong> Escape route circuits must be protected against premature collapse</li>
                <li><strong className="text-foreground">BS 5266-1:</strong> Emergency lighting circuits must maintain integrity for full emergency duration</li>
                <li><strong className="text-foreground">Building Regulations Approved Document B:</strong> Fire safety provisions for means of escape</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">The Remediation</h4>
              <p className="text-foreground mb-2">
                The installation had to be completely re-routed with dedicated fire-resistant containment:
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground">
                <li>New steel conduit installed throughout all 6 floors</li>
                <li>LSZH enhanced fire-resistant cables (Category F1) replacing all PVC cables</li>
                <li>Dedicated emergency lighting distribution board on each floor</li>
                <li>Metal cable clips and fixings throughout</li>
                <li>Complete re-labelling and as-built documentation</li>
              </ul>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-300 mb-3">Cost Impact</h4>
              <div className="space-y-2.5 text-foreground text-sm sm:text-base">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline">
                  <span className="text-left">Original installation cost:</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">£45,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline">
                  <span className="text-left">Remediation materials:</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">£28,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline">
                  <span className="text-left">Additional labour (2 weeks):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">£16,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline">
                  <span className="text-left">Building closure costs:</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">£50,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-baseline border-t border-yellow-600/40 pt-2.5 mt-1">
                  <span className="font-semibold text-left">Total additional cost:</span>
                  <span className="font-bold text-red-400 whitespace-nowrap text-right text-lg sm:text-xl">£94,000</span>
                </div>
              </div>
            </div>

            <div className="bg-green-600/20 border border-green-600/40 rounded-lg p-4">
              <h4 className="font-semibold text-green-300 mb-2">Key Lessons</h4>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-foreground">Plan segregation from the start:</strong> Retrofitting costs far more than initial proper installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-foreground">Use correct materials:</strong> LSZH enhanced cables and metal fixings are mandatory, not optional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-foreground">Understand the regulations:</strong> Emergency lighting has specific requirements beyond normal electrical installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong className="text-foreground">Budget appropriately:</strong> Cutting corners on emergency lighting leads to expensive failures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-foreground italic">
          This case study demonstrates why segregation must be planned from the start. The contractor's attempt to save time and money by reusing existing infrastructure resulted in costs more than double the original installation price, plus significant project delays and reputational damage.
        </p>
      </CardContent>
    </Card>
  );
};
