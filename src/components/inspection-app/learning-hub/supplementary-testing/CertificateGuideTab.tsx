import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { FileText, FileCheck, FileX, Settings, Lightbulb } from 'lucide-react';
import EICCompletionTab from './certificate-guide/EICCompletionTab';
import EICRCompletionTab from './certificate-guide/EICRCompletionTab';
import MWCCompletionTab from './certificate-guide/MWCCompletionTab';
import PracticalTipsTab from './certificate-guide/PracticalTipsTab';

const CertificateGuideTab = () => {
  const smartTabs = [
    {
      value: "eic-completion",
      label: "EIC Completion",
      icon: <FileCheck className="h-4 w-4" />,
      content: <EICCompletionTab />
    },
    {
      value: "eicr-completion",
      label: "EICR Completion",
      icon: <FileX className="h-4 w-4" />,
      content: <EICRCompletionTab />
    },
    {
      value: "mwc-completion",
      label: "MWC Completion",
      icon: <Settings className="h-4 w-4" />,
      content: <MWCCompletionTab />
    },
    {
      value: "practical-tips",
      label: "Practical Tips",
      icon: <Lightbulb className="h-4 w-4" />,
      content: <PracticalTipsTab />
    }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Certificate Completion Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-white">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold text-blue-400 mb-3">Certificate Overview</h4>
          <p className="text-sm mb-3">
            Electrical certificates are legal documents that verify the safety and compliance of electrical 
            work. Proper completion is essential for regulatory compliance, insurance validity, and 
            occupant safety. These documents provide a permanent record of the electrical work carried out 
            and demonstrate that the installation meets the requirements of BS 7671.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Legal Requirements:</h5>
              <ul className="space-y-1">
                <li>• Building Regulations Part P compliance (England & Wales)</li>
                <li>• BS 7671 verification requirements</li>
                <li>• Local Authority Building Control notification</li>
                <li>• Competent Person Scheme registration</li>
                <li>• Insurance and warranty validation</li>
                <li>• Health and Safety at Work Act compliance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Certificate Types:</h5>
              <ul className="space-y-1">
                <li>• Electrical Installation Certificate (EIC) - New work</li>
                <li>• Electrical Installation Condition Report (EICR) - Existing installations</li>
                <li>• Minor Works Certificate (MWC) - Small additions/alterations</li>
                <li>• Domestic Electrical Installation Certificate</li>
                <li>• Periodic Inspection Report (PIR) - Older format</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded">
            <h6 className="font-medium text-amber-400 mb-2">⚠️ Important Legal Note</h6>
            <p className="text-xs">
              Falsifying electrical certificates is a criminal offence. Only competent persons should complete 
              certificates for work they have personally designed, installed, inspected, and tested. Certificates 
              must be accurate, complete, and signed by the responsible person.
            </p>
          </div>
        </div>

        <SmartTabs 
          tabs={smartTabs}
          defaultValue="eic-completion" 
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

export default CertificateGuideTab;