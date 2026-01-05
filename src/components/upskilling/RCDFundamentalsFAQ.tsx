import { HelpCircle, CheckCircle, AlertTriangle, Info, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RCDFundamentalsFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-4">
          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              What exactly does an RCD detect?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              An RCD detects the difference between current flowing through the live conductor and current 
              returning through the neutral conductor. This difference indicates current leaking to earth, 
              which could be through a person or damaged insulation.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Technical note:</strong> The RCD uses a toroidal transformer where live and neutral 
                conductors pass through in opposite directions. Under normal conditions, their magnetic 
                fields cancel out. Any imbalance creates a magnetic flux that induces voltage in the detection coil.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              Why is 30mA chosen as the standard for personal protection?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              30mA is below the level where ventricular fibrillation (dangerous heart rhythm) typically occurs 
              in most people. Current above 50mA can cause ventricular fibrillation, while 30mA provides a 
              safety margin accounting for individual variations and duration of contact.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                The "let-go" threshold (ability to release grip) is typically around 10-15mA. 30mA allows 
                for this plus additional safety margin while being practical for normal installation leakage currents.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Can RCDs protect against all types of electric shock?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              No, RCDs only protect against earth fault shock (contact between live conductor and earth). 
              They cannot protect against shock between live and neutral conductors, as this doesn't create 
              the current imbalance needed for RCD operation.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Important limitation:</strong> RCDs provide "additional protection" in BS 7671 
                terminology. Basic protection (insulation, enclosures) and fault protection (earthing, 
                bonding) remain essential for complete electrical safety.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Do RCDs work during power cuts?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              No, standard RCDs require power from the supply to operate their detection and trip circuits. 
              During power cuts, RCDs cannot provide protection. However, once power is restored, they 
              immediately resume protection.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                Some specialist RCDs with auxiliary power supplies can maintain protection during outages, 
                but these are rarely used in normal installations due to cost and complexity.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              Why do RCDs sometimes trip when switching on certain appliances?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              Some appliances, particularly those with motors or electronic components, can create brief 
              earth leakage currents during startup. Switch-mode power supplies in electronic equipment 
              can also create high-frequency leakage that may cause nuisance tripping.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                Solutions include using time-delayed RCDs, checking appliance earth leakage levels, 
                or installing surge protection. Persistently tripping RCDs should always be investigated 
                as they may indicate genuine earth faults.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              How often should I test my RCDs?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              BS 7671 requires RCDs to be tested at suitable intervals. For domestic installations, 
              quarterly testing is recommended using the test button. Professional testing with proper 
              instruments should be carried out during periodic inspections.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                The test button only verifies basic functionality. Professional testing measures actual 
                trip times and earth fault current levels to ensure the RCD meets performance standards.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              What's the difference between RCDs and RCBOs?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              An RCD only provides earth fault protection. An RCBO (Residual Current Breaker with Overload) 
              combines RCD protection with overcurrent protection (like an MCB), providing both earth fault 
              and overload/short-circuit protection in one device.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                RCBOs are often preferred in modern consumer units as they provide complete circuit protection 
                and can isolate individual circuits without affecting others when earth faults occur.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              Can I have too many RCDs in an installation?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              While you can't have "too much" protection, improper RCD coordination can cause problems. 
              Multiple RCDs should be time-graded or current-graded to ensure proper discrimination. 
              Upstream devices should have longer time delays or higher current settings.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                Poor coordination can result in upstream RCDs tripping for downstream faults, affecting 
                more circuits than necessary. Proper design ensures only the RCD closest to the fault operates.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Do LED lights affect RCD operation?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              LED lights with switch-mode power supplies can create small earth leakage currents, typically 
              0.5-2mA per luminaire. While individual LEDs rarely cause problems, large numbers on one RCD 
              can create cumulative leakage approaching trip levels.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                Consider the total leakage current when designing circuits with many LED lights. Good quality 
                LEDs should have minimal leakage, but cheaper units may have higher levels requiring careful planning.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Are RCDs required for all electrical installations?
            </h4>
            <p className="text-sm sm:text-base text-foreground mb-2">
              Not all circuits require RCD protection, but BS 7671 mandates RCDs for specific applications: 
              socket outlets, bathrooms, outdoor circuits, and cables concealed in walls. Industrial 
              installations may have different requirements based on risk assessment.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-xs sm:text-sm text-foreground">
                Even where not mandated, RCDs provide valuable additional safety. Many modern installations 
                use RCD or RCBO protection for all circuits as good practice, though this requires careful 
                attention to coordination and earth leakage levels.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};