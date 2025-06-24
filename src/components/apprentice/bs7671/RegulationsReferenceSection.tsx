
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegulationsReferenceSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Regulations Reference
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Quick access to key BS7671 regulations, guidance notes, and reference materials for testing procedures.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <FileText className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Part 6 - Verification</h4>
              <p className="text-sm text-muted-foreground">Initial verification procedures and requirements</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Search className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Appendix 13</h4>
              <p className="text-sm text-muted-foreground">Methods of test and test sequence requirements</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <BookOpen className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">GN3 Guidance</h4>
              <p className="text-sm text-muted-foreground">IET Guidance Note 3 - Inspection & Testing</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Download className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Test Values</h4>
              <p className="text-sm text-muted-foreground">Maximum Zs values and acceptable test results</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-green-500/30 rounded-lg bg-green-500/10">
          <h4 className="font-medium text-green-300 mb-2">Key Regulations</h4>
          <ul className="text-sm text-green-200 space-y-1">
            <li>• Regulation 610 - Initial verification requirements</li>
            <li>• Regulation 643 - Initial verification procedures</li>
            <li>• Regulation 653 - Inspection checklist requirements</li>
            <li>• Table 61 - Test sequence and methods</li>
            <li>• Appendix 2 - Statutory requirements</li>
          </ul>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Access Regulations Database
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegulationsReferenceSection;
