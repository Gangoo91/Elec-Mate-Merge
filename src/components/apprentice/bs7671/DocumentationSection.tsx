
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DocumentationSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentation & Certificates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Proper documentation is essential for compliance and provides evidence of safe installation and testing procedures.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Electrical Installation Certificate (EIC)</h4>
              <p className="text-sm text-muted-foreground">For new installations and additions to existing installations</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Minor Electrical Installation Works Certificate</h4>
              <p className="text-sm text-muted-foreground">For additions and alterations that don't extend circuits</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Electrical Installation Condition Report (EICR)</h4>
              <p className="text-sm text-muted-foreground">For periodic inspection and testing of existing installations</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-green-500/30 rounded-lg bg-green-500/10">
          <h4 className="font-medium text-green-300 mb-2">Required Documentation</h4>
          <ul className="text-sm text-green-200 space-y-1">
            <li>• Schedule of test results</li>
            <li>• Schedule of items inspected</li>
            <li>• Circuit charts and diagrams</li>
            <li>• Declaration of conformity</li>
            <li>• Observations and recommendations</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Templates
          </Button>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Certificate Generator
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationSection;
