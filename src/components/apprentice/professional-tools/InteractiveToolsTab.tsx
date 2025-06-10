
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CheckSquare, FileText } from "lucide-react";
import ToolBudgetCalculator from "./ToolBudgetCalculator";
import ToolChecklistGenerator from "./ToolChecklistGenerator";

const InteractiveToolsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-elec-gray text-center">
          <CardContent className="pt-6">
            <Calculator className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Budget Calculator</h3>
            <p className="text-sm text-muted-foreground">Plan your tool investments</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/20 bg-blue-500/10 text-center">
          <CardContent className="pt-6">
            <CheckSquare className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Checklist Generator</h3>
            <p className="text-sm text-muted-foreground">Create custom tool lists</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/20 bg-green-500/10 text-center">
          <CardContent className="pt-6">
            <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-white mb-1">Documentation</h3>
            <p className="text-sm text-muted-foreground">Track purchases & warranties</p>
          </CardContent>
        </Card>
      </div>

      <ToolBudgetCalculator />
      
      <ToolChecklistGenerator />
    </div>
  );
};

export default InteractiveToolsTab;
