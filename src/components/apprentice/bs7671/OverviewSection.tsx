
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube, CheckCircle, Shield, FileText } from "lucide-react";

const OverviewSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Why We Test - Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Electrical testing is essential for safety, compliance, and reliability. Understanding why we test helps apprentices grasp the importance of each procedure.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Safety First</h4>
              <p className="text-sm text-muted-foreground">Protect people from electrical hazards and ensure safe operation</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Legal Compliance</h4>
              <p className="text-sm text-muted-foreground">Meet BS 7671 and legal requirements for electrical installations</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <FileText className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Documentation</h4>
              <p className="text-sm text-muted-foreground">Provide evidence of proper installation and testing procedures</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <TestTube className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Quality Assurance</h4>
              <p className="text-sm text-muted-foreground">Verify installation quality and prevent future faults</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-blue-500/30 rounded-lg bg-blue-500/10">
          <h4 className="font-medium text-blue-300 mb-2">Key Testing Standards</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• BS 7671:2018+A2:2022 (18th Edition Wiring Regulations)</li>
            <li>• IET Guidance Note 3 (Inspection & Testing)</li>
            <li>• IET Code of Practice for Electrical Safety Management</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewSection;
