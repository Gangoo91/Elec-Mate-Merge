import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Shield, CheckCircle, FileText } from 'lucide-react';

const SmartHomeModule7Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground mb-4">
          As an electrician working with smart home systems, these practical safety guidelines will ensure BS 7671 compliance and professional standards:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-red-400" />
              <span className="font-medium text-foreground">Safe Isolation Process</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Follow a lockout–tagout procedure every time you isolate</li>
              <li>• Use mechanical lock-off devices, not just switches</li>
              <li>• Test proving unit before and after voltage testing</li>
              <li>• Never work alone on high-risk installations</li>
              <li>• Inform all site personnel about isolation status</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-foreground">Documentation Standards</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Double-check manufacturer installation manuals</li>
              <li>• Record all test results for compliance evidence</li>
              <li>• Complete EIC or MEIWC certificates accurately</li>
              <li>• Photograph complex installations before closing</li>
              <li>• Keep calibration certificates for test equipment</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="font-medium text-foreground">Testing Protocol</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Use insulated tools when working on live testing</li>
              <li>• Test in correct sequence: dead tests first</li>
              <li>• Disconnect sensitive equipment during IR testing</li>
              <li>• Verify RCD operation at rated sensitivity</li>
              <li>• Check earth continuity in all metal enclosures</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-foreground">Installation Best Practice</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Separate mains and low-voltage cable runs</li>
              <li>• Use appropriate IP ratings for environments</li>
              <li>• Size cables correctly for load and volt drop</li>
              <li>• Install RCD protection where required</li>
              <li>• Ensure adequate earthing of metal containment</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Standards Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                Isolation procedure documented and followed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                All tests completed and results recorded
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                Compliance certificates issued
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                Installation meets BS 7671 requirements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                Client handover documentation prepared
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                Test equipment calibration verified
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4Practical;