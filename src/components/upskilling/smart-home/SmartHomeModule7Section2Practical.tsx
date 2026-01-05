import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Smartphone, FileText, Users } from 'lucide-react';

const SmartHomeModule7Section2Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 mb-4">
          As an electrician working with smart home systems, these practical tips will help ensure successful commissioning:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-foreground">Mobile Preparation</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Carry smartphone/tablet with required apps pre-installed</li>
              <li>• Ensure device has adequate battery and storage</li>
              <li>• Download all manufacturer apps before arriving on site</li>
              <li>• Test apps work with your device beforehand</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-green-400" />
              <span className="font-medium text-foreground">Documentation</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Record device IDs and locations during commissioning</li>
              <li>• Take photos of device placements and settings</li>
              <li>• Create handover documents with login details</li>
              <li>• Note any specific configuration requirements</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-foreground">Client Training</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Show clients how to add/remove devices themselves</li>
              <li>• Demonstrate basic troubleshooting steps</li>
              <li>• Explain app navigation and key features</li>
              <li>• Provide written instructions for common tasks</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-foreground">Quality Assurance</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Don't leave site until every device and routine is tested</li>
              <li>• Test with client present to ensure satisfaction</li>
              <li>• Verify remote access works from client's devices</li>
              <li>• Check automation runs correctly in real scenarios</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Standards</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Maintain professional appearance and conduct throughout commissioning
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Explain what you're doing to build client confidence
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Be patient with clients who are unfamiliar with technology
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              Leave contact details for follow-up support questions
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section2Practical;