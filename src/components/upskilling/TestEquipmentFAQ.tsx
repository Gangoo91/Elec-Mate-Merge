import { HelpCircle, CheckCircle, AlertTriangle, Info, Settings, Battery } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestEquipmentFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-foreground text-lg sm:text-xl">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-[#323232] rounded-lg p-3 sm:p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-4 w-4 text-blue-400" />
              How often should test equipment be calibrated?
            </h4>
            <p className="text-foreground text-xs sm:text-sm mb-2">
              Most test equipment should be calibrated annually to traceable national standards. However, 
              the frequency may vary based on usage intensity, environmental conditions, and manufacturer recommendations.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                High-use equipment or equipment used in harsh conditions may require more frequent calibration. 
                Always check manufacturer specifications and consider your quality system requirements.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What should I do if my test equipment fails calibration?
            </h4>
            <p className="text-foreground text-sm mb-2">
              If equipment fails calibration, it must be withdrawn from service immediately. All measurements 
              taken since the last successful calibration should be reviewed for potential impact.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                <strong>Actions required:</strong> Mark equipment as "DO NOT USE", investigate the cause of failure, 
                have equipment repaired/adjusted, and consider retesting recent work if measurements were critical.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Can I use any test leads with my multifunction tester?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Test leads must be compatible with your equipment and suitable for the application. They should 
              meet the required safety category (CAT III/IV) and have appropriate voltage ratings.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Using inappropriate test leads can affect measurement accuracy and create safety hazards. 
                Always use manufacturer-approved leads or equivalents that meet the same specifications.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Battery className="h-4 w-4 text-green-400" />
              How do I know when my tester battery needs replacing?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Most modern testers display battery status and will warn when voltage is low. Replace batteries 
              when the low battery warning appears or when the display becomes dim or erratic.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Don't wait for complete battery failure. Low battery voltage can affect measurement accuracy. 
                Keep spare batteries and replace them as soon as warning indicators appear.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Why do I get different readings with different testers?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Small variations between testers are normal due to measurement tolerances, calibration differences, 
              and different measurement methods. Significant differences may indicate equipment problems.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Typical measurement tolerance is ±2-5% for most functions. If differences exceed this range, 
                check calibration status and compare against a known reference standard.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What's the difference between standard and non-trip loop testing?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Standard loop testing uses higher test currents (typically 10-25A) which will trip RCDs. 
              Non-trip mode uses lower currents (typically &lt;15mA) to avoid RCD operation.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Use non-trip mode for RCD-protected circuits. Readings may be slightly higher than standard 
                mode but are still valid for compliance assessment. Some testers automatically select the appropriate mode.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              How do environmental conditions affect my measurements?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Temperature significantly affects conductor resistance and thus impedance measurements. 
              Humidity affects insulation resistance. EMI can interfere with sensitive measurements.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Record ambient temperature during testing. Many modern testers include temperature 
                compensation. For critical measurements, consider environmental corrections in your calculations.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Settings className="h-4 w-4 text-green-400" />
              Should I perform a daily check of my test equipment?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Yes, daily functional checks are essential for ensuring reliable measurements. This includes 
              battery level, display function, and a basic accuracy check against a known reference.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Keep a simple checklist: visual inspection, battery level, test lead continuity, and 
                reference measurement. Document these checks as evidence of due diligence.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What PPE is required for test equipment operation?
            </h4>
            <p className="text-foreground text-sm mb-2">
              PPE requirements depend on the voltage level and energy present. Minimum requirements include 
              safety glasses, insulated gloves, and appropriate footwear. Arc flash protection may be needed.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                <strong>Always assess the specific hazards:</strong> Consider voltage level, available fault current, 
                and working environment. When in doubt, use higher protection levels and consult safety procedures.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              How should I store my test equipment?
            </h4>
            <p className="text-foreground text-sm sm:text-base mb-2 leading-relaxed">
              Store equipment in a clean, dry environment within the manufacturer's specified temperature range. 
              Protect from shock, vibration, and theft. Remove batteries if storing for extended periods.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                Use proper carrying cases, avoid extreme temperatures, and check stored equipment periodically. 
                Battery leakage can damage sensitive electronics, so remove them during long-term storage.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              What records should I keep for test equipment?
            </h4>
            <p className="text-foreground text-sm sm:text-base mb-2 leading-relaxed">
              Maintain records of calibration certificates, daily checks, maintenance activities, and any 
              repairs. Include equipment serial numbers, calibration dates, and any limitations or corrections.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs sm:text-sm">
                Good records demonstrate equipment reliability and support certification processes. 
                Keep calibration certificates for at least one full calibration cycle beyond current certificate.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};