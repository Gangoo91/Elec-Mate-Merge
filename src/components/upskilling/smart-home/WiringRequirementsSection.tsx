import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, AlertTriangle } from 'lucide-react';
import DCPolarityQuickCheck from './DCPolarityQuickCheck';

const WiringRequirementsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            Device Wiring Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Voltage Requirements</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Many smart devices operate on low voltage (e.g., 12V, 24V DC)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Others connect directly to mains supply (230V AC)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Always verify device specifications before installation
                </li>
              </ul>
            </div>

            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-amber-200 mb-1">Critical: DC Polarity</h5>
                  <p className="text-amber-100 text-sm">
                    Correct polarity is critical for DC-powered devices. Reverse polarity can cause 
                    permanent damage or create safety hazards.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Smart Switch Requirements</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Smart switches and relays often require a neutral connection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Always check manufacturer instructions for specific wiring diagrams
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  Some smart switches can work without neutral but with reduced functionality
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <DCPolarityQuickCheck />
    </div>
  );
};

export default WiringRequirementsSection;