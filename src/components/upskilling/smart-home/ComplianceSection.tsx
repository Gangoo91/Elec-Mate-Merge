import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Zap } from 'lucide-react';
import CableSeparationQuickCheck from './CableSeparationQuickCheck';

const ComplianceSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-elec-yellow" />
            Compliance and Best Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">BS 7671 Compliance</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Follow BS 7671 Wiring Regulations for all installations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Ensure proper earthing and bonding arrangements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Apply appropriate protective measures (RCD, MCB, etc.)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Consider special location requirements if applicable
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-200 mb-1">Cable Separation</h5>
                  <p className="text-blue-100 text-sm">
                    Separate power and data cables where possible to avoid electromagnetic interference. 
                    This prevents communication issues and ensures reliable operation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Documentation and Labelling</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Label all cables and terminations clearly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Maintain accurate installation drawings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Document device specifications and settings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Provide clear handover documentation to customers
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Testing Requirements</h4>
              <p className="text-gray-300 mb-2">
                Test circuits after installation to ensure safety and functionality:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Continuity testing of protective conductors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Polarity verification for all connections
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Insulation resistance testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  RCD functionality testing where applicable
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <CableSeparationQuickCheck />
    </div>
  );
};

export default ComplianceSection;