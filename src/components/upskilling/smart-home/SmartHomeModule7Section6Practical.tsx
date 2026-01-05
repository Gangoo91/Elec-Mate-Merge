import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Archive, FileCheck, Shield } from 'lucide-react';

const SmartHomeModule7Section6Practical = () => {
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
          As an electrician managing smart home documentation and aftercare, these practical guidelines ensure professional standards and client satisfaction:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Archive className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-foreground">Documentation Management</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Always keep backup copies in secure storage</li>
              <li>• Use cloud storage with multiple backup locations</li>
              <li>• Organise files by client name and installation date</li>
              <li>• Implement version control for updated documents</li>
              <li>• Set calendar reminders for retention period reviews</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-medium text-foreground">Support Boundaries</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Be clear about which services are billable</li>
              <li>• Define emergency vs non-urgent response times</li>
              <li>• Explain warranty vs chargeable work distinctions</li>
              <li>• Set realistic expectations for remote support</li>
              <li>• Provide written support terms and conditions</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <FileCheck className="h-5 w-5 text-purple-400" />
              <span className="font-medium text-foreground">Client Documentation</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Encourage clients to keep receipts and warranties together</li>
              <li>• Provide document storage recommendations</li>
              <li>• Create simple filing systems they can maintain</li>
              <li>• Suggest photographing important information</li>
              <li>• Remind about document locations during maintenance</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-foreground">Template Consistency</span>
            </div>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>• Use consistent templates for all projects</li>
              <li>• Include company branding and contact details</li>
              <li>• Standardise test result formats and layouts</li>
              <li>• Create checklists for document completion</li>
              <li>• Review and update templates regularly</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-2">Professional Documentation Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                All electrical certificates completed and signed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Device inventory with locations documented
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Test results recorded and stored
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Warranty information provided to client
              </li>
            </ul>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Support contact details clearly provided
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Backup copies stored securely
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Client trained on document access
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">□</span>
                Follow-up maintenance scheduled if required
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section6Practical;