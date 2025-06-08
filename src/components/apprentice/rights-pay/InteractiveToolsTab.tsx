
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, HelpCircle } from "lucide-react";
import PayCalculator from "./PayCalculator";
import RightsQuiz from "./RightsQuiz";
import DocumentTemplates from "./DocumentTemplates";

const InteractiveToolsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-elec-gray text-center">
          <CardContent className="pt-6">
            <Calculator className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Pay Calculator</h3>
            <p className="text-sm text-muted-foreground">Calculate your expected wages</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-blue-500/10 text-center">
          <CardContent className="pt-6">
            <HelpCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Rights Assessment</h3>
            <p className="text-sm text-muted-foreground">Test your knowledge of your rights</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/20 bg-green-500/10 text-center">
          <CardContent className="pt-6">
            <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Document Templates</h3>
            <p className="text-sm text-muted-foreground">Useful forms and letters</p>
          </CardContent>
        </Card>
      </div>

      <PayCalculator />
      
      <RightsQuiz />
      
      <DocumentTemplates />
    </div>
  );
};

export default InteractiveToolsTab;
