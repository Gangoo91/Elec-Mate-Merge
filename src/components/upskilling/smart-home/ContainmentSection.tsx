import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Shield } from 'lucide-react';
import ContainmentBenefitsQuickCheck from './ContainmentBenefitsQuickCheck';

const ContainmentSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-elec-yellow" />
            Containment and Cable Management
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Containment Methods</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Use trunking for accessible cable runs in commercial settings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Install conduit for protective mechanical and environmental protection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Cable tray systems for multiple cable runs in larger installations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Surface-mounted cable covers for residential applications
                </li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-green-200 mb-1">Safety Benefits</h5>
                  <p className="text-green-100 text-sm">
                    Containment improves safety, prevents mechanical damage, and supports fire resistance. 
                    It's not just aesthetic - it's a safety requirement.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Professional Benefits</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Good cable management makes maintenance easier
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Keeps installations looking professional and organised
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Facilitates fault finding and system upgrades
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Reduces risk of accidental damage during other work
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Installation Considerations</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Select appropriate IP ratings for environmental conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Allow for cable expansion and future additions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Maintain minimum bend radii for all cable types
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Ensure adequate support and fixing intervals
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <ContainmentBenefitsQuickCheck />
    </div>
  );
};

export default ContainmentSection;