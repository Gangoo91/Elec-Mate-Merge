import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import IsolationSafetyQuickCheck from '@/components/upskilling/smart-home/IsolationSafetyQuickCheck';

const ElectricalSafetyIsolationSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          1. Isolation Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Proper isolation is the foundation of safe electrical work. Smart devices may appear harmless, but many connect directly to mains circuits and pose identical risks to traditional electrical equipment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-400" />
              Essential Isolation Steps
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">1. Switch Off at Consumer Unit</h5>
                <p className="text-gray-300 text-sm">Always isolate at the main circuit breaker, never rely on local switches or software controls</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">2. Lock Off and Tag</h5>
                <p className="text-gray-300 text-sm">Use mechanical lock-off devices and warning tags to prevent accidental re-energisation</p>
              </div>
              
              <div className="p-3 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-1">3. Test and Prove</h5>
                <p className="text-gray-300 text-sm">Use a proving unit to confirm isolation is effective before starting work</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Safe Isolation Equipment</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-sm">•</span>
                <div>
                  <span className="font-medium text-foreground">Lock-off devices:</span>
                  <span className="text-gray-300 text-sm ml-1">Mechanical prevention of switch operation</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-sm">•</span>
                <div>
                  <span className="font-medium text-foreground">Proving units:</span>
                  <span className="text-gray-300 text-sm ml-1">Test voltage presence before and after isolation</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-sm">•</span>
                <div>
                  <span className="font-medium text-foreground">Warning tags:</span>
                  <span className="text-gray-300 text-sm ml-1">Visual indication of work in progress</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-sm">•</span>
                <div>
                  <span className="font-medium text-foreground">Two-pole testers:</span>
                  <span className="text-gray-300 text-sm ml-1">Verify absence of voltage at work location</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-200 mb-2">Never Rely On</h4>
              <ul className="space-y-1 text-red-100 text-sm">
                <li>• Local light switches or smart switches for isolation</li>
                <li>• Software controls or app-based switching</li>
                <li>• Assumptions about circuit states</li>
                <li>• Other people's assurance that power is off</li>
              </ul>
            </div>
          </div>
        </div>

        <IsolationSafetyQuickCheck />
      </CardContent>
    </Card>
  );
};

export default ElectricalSafetyIsolationSection;