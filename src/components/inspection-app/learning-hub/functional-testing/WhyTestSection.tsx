
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Shield, CheckCircle2, AlertTriangle, FileCheck, Zap } from 'lucide-react';

const WhyTestSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
          <h4 className="text-base sm:text-lg font-semibold text-green-400">Why Functional Testing is Essential</h4>
        </div>
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                Safety Verification
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Ensures emergency stops work correctly under fault conditions</li>
                <li>• Verifies RCD test buttons operate within specified time limits</li>
                <li>• Confirms safety systems function as designed</li>
                <li>• Validates protective device operation under normal conditions</li>
                <li>• Tests interlocking systems and safety circuits</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-400" />
                Regulatory Compliance
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Required by BS 7671 Regulation 612.13</li>
                <li>• Part of initial verification process</li>
                <li>• Essential for EIC/EICR certification completion</li>
                <li>• Demonstrates due diligence in testing procedures</li>
                <li>• Meets insurance and legal requirements</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                Operational Benefits
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Identifies faulty controls before they cause problems</li>
                <li>• Prevents unexpected downtime and equipment failure</li>
                <li>• Ensures reliable operation of critical systems</li>
                <li>• Validates manufacturer specifications</li>
                <li>• Confirms proper installation and commissioning</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                System Performance
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Tests system response times under load</li>
                <li>• Verifies control logic and sequencing</li>
                <li>• Confirms proper equipment coordination</li>
                <li>• Validates automatic transfer systems</li>
                <li>• Tests backup and redundant systems</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Real-World Impact
            </h4>
            <p className="text-sm text-white">
              Functional testing has prevented countless accidents by identifying faulty emergency stops, 
              malfunctioning RCDs, and defective control systems. A properly functioning emergency stop 
              can be the difference between a minor incident and a serious injury. Regular functional 
              testing ensures that when safety systems are needed most, they operate correctly.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Consequences of Not Testing
            </h4>
            <ul className="space-y-1 text-sm text-white">
              <li>• Emergency systems may fail when needed most</li>
              <li>• RCD protection may not operate correctly</li>
              <li>• Legal liability for accidents and injuries</li>
              <li>• Insurance claims may be rejected</li>
              <li>• Equipment damage from uncontrolled shutdowns</li>
              <li>• Regulatory non-compliance and potential prosecution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTestSection;
