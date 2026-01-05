import { HelpCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FaultCurrentFAQ = () => {
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
              What's the difference between Ipsc and Ipef?
            </h4>
            <p className="text-foreground text-sm mb-2">
              <strong>Ipsc (Prospective Short-Circuit Current)</strong> is the maximum current that would flow between 
              live conductors in a fault condition. <strong>Ipef (Prospective Earth Fault Current)</strong> is the maximum 
              current that would flow from a live conductor to earth.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Ipsc is typically higher because it doesn't include the earth fault loop path resistance. 
                Both values are critical for different aspects of protection design.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Why do some testers show different Ipsc values?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Different testers may use different measurement methods or test currents. Some calculate from 
              impedance measurements while others directly measure prospective current.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Always use the same tester for comparative measurements and ensure calibration is current. 
                Small variations are normal, but significant differences may indicate measurement issues.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What if the fault current exceeds the breaking capacity?
            </h4>
            <p className="text-foreground text-sm mb-2">
              This is a serious safety issue that must be addressed immediately. The protective device 
              may not safely interrupt fault currents, potentially leading to explosive failure.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                <strong>Immediate actions:</strong> Do not energise the circuit, upgrade protective devices 
                to higher breaking capacity, or install current-limiting devices. Cannot issue compliance certificate.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              How does supply impedance affect fault current?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Supply impedance (Ze) has a significant impact on fault current levels. Lower impedance 
              supplies provide higher fault currents, which can exceed protective device capabilities.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Modern supplies often have very low impedance, resulting in high fault currents. 
                This is why high breaking capacity MCBs are increasingly necessary.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Should I test fault current on every circuit?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Not necessarily. Test at key points such as the origin, distribution boards, and where 
              protective device ratings change. Use calculations for similar circuits supplied from the same point.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Focus testing effort on critical points and highest-risk areas. Document assumptions 
                and calculations for circuits not directly tested.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What about temperature effects on fault current?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Conductor resistance increases with temperature, reducing fault current. Test results 
              should be adjusted to reflect maximum operating temperature conditions.
            </p>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Many modern testers include temperature compensation. For manual calculations, 
                apply appropriate correction factors based on conductor material and operating temperature.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Can I calculate fault current instead of measuring it?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Yes, fault current can be calculated using Ohm's law (I = U/Z) if you know the supply 
              voltage and total impedance. However, direct measurement is preferred for accuracy.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Use calculations for verification or when direct measurement isn't practical. 
                Ensure all impedance components are accurately known, including supply impedance.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              What records should I keep for fault current testing?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Document test location, measured values, protective device ratings, compliance status, 
              and any remedial actions required. Include ambient temperature and supply voltage.
            </p>
            <div className="bg-green-600/10 border border-green-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Good records support certification, help with future maintenance, and provide 
                evidence of compliance with safety regulations. Include test equipment calibration dates.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              What if I get inconsistent readings?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Inconsistent readings may indicate loose connections, supply variations, parallel paths, 
              or test equipment issues. Investigate and resolve before accepting results.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                Check all connections, verify supply stability, repeat tests, and consider whether 
                parallel earth paths or equipment are affecting measurements. Use a different tester to verify.
              </p>
            </div>
          </div>

          <div className="bg-[#323232] rounded-lg p-4">
            <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              How often should fault current be tested?
            </h4>
            <p className="text-foreground text-sm mb-2">
              Test fault current as part of initial verification, after major modifications, and during 
              periodic inspections. Supply conditions can change over time affecting fault levels.
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-xs">
                More frequent testing may be needed in industrial environments or where supply 
                conditions are known to vary. Monitor trends over time to identify developing issues.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};