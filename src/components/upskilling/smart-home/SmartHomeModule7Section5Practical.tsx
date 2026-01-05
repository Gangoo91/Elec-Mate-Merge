import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, Users, Clock } from 'lucide-react';

const SmartHomeModule7Section5Practical = () => {
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
          As an electrician conducting smart home handovers, these practical tips ensure professional client training that builds confidence and reduces callbacks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="font-medium text-foreground">Handover Preparation</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Prepare a structured checklist for every handover</li>
              <li>• Test all systems thoroughly before client arrival</li>
              <li>• Prepare documentation package in advance</li>
              <li>• Charge all devices and ensure stable connectivity</li>
              <li>• Plan 60-90 minutes for comprehensive training</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-foreground">Communication Skills</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Avoid technical jargon — explain in simple terms</li>
              <li>• Let the client use the app themselves during training</li>
              <li>• Be patient with clients unfamiliar with technology</li>
              <li>• Encourage questions and repeat demonstrations</li>
              <li>• Confirm understanding before moving to next topic</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-foreground">Training Structure</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Start with basic device control before advanced features</li>
              <li>• Focus on features they will use daily</li>
              <li>• Create realistic scenarios during demonstration</li>
              <li>• Show troubleshooting for common problems</li>
              <li>• End with confidence-building success examples</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-foreground">Reference Materials</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Provide written or digital guides (QR codes, PDFs)</li>
              <li>• Create laminated quick-reference cards</li>
              <li>• Record short video tutorials for complex features</li>
              <li>• Leave contact cards with clear support boundaries</li>
              <li>• Recommend useful YouTube channels or resources</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Handover Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                All devices tested and working correctly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Client can log into and navigate the app
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Basic controls demonstrated and practised
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                At least one automation routine created together
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                System limitations explained clearly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Emergency contacts and support boundaries discussed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Documentation package provided
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Client questions answered satisfactorily
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section5Practical;