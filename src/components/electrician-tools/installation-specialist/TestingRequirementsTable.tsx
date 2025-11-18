import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";

interface TestingRequirement {
  description: string;
  regulation: string;
  expectedReading: string;
  passRange: string;
}

interface TestingRequirementsTableProps {
  testingRequirements: TestingRequirement[];
}

export const TestingRequirementsTable = ({ testingRequirements }: TestingRequirementsTableProps) => {
  if (!testingRequirements || testingRequirements.length === 0) {
    return null;
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 via-primary/5 to-background shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 animate-fade-in">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 shadow-lg">
            <ClipboardCheck className="h-6 w-6 text-green-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-xl text-foreground">Testing Requirements</h3>
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                BS 7671 Part 6
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {testingRequirements.length} test{testingRequirements.length !== 1 ? 's' : ''} required for compliance verification
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Test Description</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Regulation</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Expected Reading</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Pass Criteria</th>
              </tr>
            </thead>
            <tbody>
              {testingRequirements.map((test, index) => (
                <tr 
                  key={index} 
                  className="border-b border-border/30 last:border-0 hover:bg-green-500/5 transition-colors"
                >
                  <td className="py-3 px-2">
                    <p className="text-sm font-medium text-foreground">{test.description}</p>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-foreground text-xs font-mono">
                      {test.regulation}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <p className="text-sm text-foreground">{test.expectedReading}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <p className="text-sm text-foreground">{test.passRange}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {testingRequirements.map((test, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-card border border-border/50 hover:border-green-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="text-sm font-semibold text-foreground flex-1">{test.description}</p>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs shrink-0">
                  Test {index + 1}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-3 w-3 text-green-400" />
                    <p className="text-xs text-muted-foreground">Regulation Reference</p>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-foreground text-xs font-mono">
                    {test.regulation}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <p className="text-xs text-muted-foreground">Expected Reading</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">{test.expectedReading}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      <p className="text-xs text-muted-foreground">Pass Criteria</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">{test.passRange}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> All testing must be conducted in accordance with BS 7671:2018+A3:2024 Part 6 (Inspection & Testing).
            Record all test results on the Electrical Installation Certificate.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
