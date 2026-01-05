import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, FileText, Shield, Lightbulb } from 'lucide-react';

export const EmergencyLightingModule5Section3Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Key Points */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Key Points to Remember
          </h4>
          <div className="grid gap-3">
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-foreground text-sm sm:text-base">
                <strong className="text-green-400">Monthly Functional Tests:</strong> Short-duration tests (few minutes) carried out every 30 days to confirm luminaires switch to emergency mode and batteries are charging. Kept brief to avoid unnecessary battery drain.
              </p>
            </div>
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-foreground text-sm sm:text-base">
                <strong className="text-blue-400">Annual Duration Tests:</strong> Full 3-hour tests carried out annually to prove batteries can sustain illumination for the complete rated period. Must be scheduled during low occupancy and allow 24-hour recharge afterwards.
              </p>
            </div>
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="text-foreground text-sm sm:text-base">
                <strong className="text-purple-400">Logbook Documentation:</strong> All tests must be recorded with five essential details: date, test type, person conducting test, pass/fail result, and any defects with remedial action. Records must be kept on-site for inspectors.
              </p>
            </div>
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-foreground text-sm sm:text-base">
                <strong className="text-red-400">Legal Compliance:</strong> Testing is mandatory under the Fire Safety Order 2005 and BS 5266-8. Failure to test or maintain records can result in invalid insurance, enforcement notices, unlimited fines, and prosecution.
              </p>
            </div>
          </div>
        </div>

        {/* Testing Readiness Checklist */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Testing Compliance Checklist
          </h4>
          <div className="bg-elec-dark border border-gray-700 rounded-lg p-4">
            <p className="text-gray-300 text-sm mb-3">
              Use this checklist to ensure testing compliance:
            </p>
            <div className="space-y-2">
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Monthly functional tests scheduled every 30 days</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Annual 3-hour duration tests scheduled during low occupancy</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Emergency lighting logbook maintained and kept on-site</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">All five required details recorded for each test</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Failed luminaires repaired promptly with retesting documented</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Responsible Person understands their legal obligations</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Logbook accessible to fire authorities and insurers</span>
              </label>
              <label className="flex items-start gap-3 text-foreground text-sm cursor-pointer group">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-600 text-elec-yellow focus:ring-elec-yellow focus:ring-offset-elec-dark" />
                <span className="group-hover:text-elec-yellow transition-colors">Battery recharge verified after duration tests (24 hours)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Compliance Benefits Summary */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Compliance Benefits Summary</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Legal Protection
              </p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>• Full compliance with Fire Safety Order 2005</li>
                <li>• Valid insurance coverage maintained</li>
                <li>• Protection from prosecution</li>
                <li>• No enforcement notices or fines</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Operational Benefits
              </p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>• System reliability verified</li>
                <li>• Early fault detection</li>
                <li>• Planned battery replacements</li>
                <li>• Reduced emergency failure risk</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaway for Electricians */}
        <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-500/20 border-l-4 border-elec-yellow p-5 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-elec-yellow flex-shrink-0 mt-1" />
            <div>
              <p className="text-foreground font-semibold text-base mb-2">
                Key Takeaway for Electricians
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                Testing without documentation is legally worthless. As an electrician, your role extends beyond conducting tests — you must ensure proper logbook records are maintained and educate clients about their legal obligations under the Fire Safety Order 2005. Implement systematic testing procedures, recommend self-test systems for large installations, and always follow up failed tests with prompt corrective action. Regular testing compliance protects lives, maintains insurance validity, and prevents costly enforcement actions.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
