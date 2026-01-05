import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion } from "@/components/ui/mobile-accordion";
import { FlaskConical, Zap } from "lucide-react";
import { TestingProcedureCard } from "./TestingProcedureCard";
import type { TestProcedure } from "@/types/commissioning-response";

interface TestingOverviewSectionProps {
  deadTests?: TestProcedure[];
  liveTests?: TestProcedure[];
}

export const TestingOverviewSection = ({ deadTests, liveTests }: TestingOverviewSectionProps) => {
  const hasDeadTests = deadTests && deadTests.length > 0;
  const hasLiveTests = liveTests && liveTests.length > 0;

  if (!hasDeadTests && !hasLiveTests) {
    return null;
  }

  return (
    <Card className="p-4 sm:p-6 bg-card border-elec-yellow/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-elec-yellow/10">
          <FlaskConical className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Testing & Commissioning Procedures</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow/80">
              BS 7671 Part 6
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Dead Tests Section */}
        {hasDeadTests && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-elec-yellow/20">
              <FlaskConical className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-base font-semibold text-foreground">Dead Tests</h4>
              <Badge variant="secondary" className="ml-auto">
                {deadTests.length} {deadTests.length === 1 ? 'Test' : 'Tests'}
              </Badge>
            </div>
            <MobileAccordion type="single" collapsible className="space-y-2">
              {deadTests.map((test, index) => (
                <TestingProcedureCard key={index} test={test} index={index} />
              ))}
            </MobileAccordion>
          </div>
        )}

        {/* Live Tests Section */}
        {hasLiveTests && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-elec-yellow/20">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-base font-semibold text-foreground">Live Tests</h4>
              <Badge variant="secondary" className="ml-auto">
                {liveTests.length} {liveTests.length === 1 ? 'Test' : 'Tests'}
              </Badge>
            </div>
            <MobileAccordion type="single" collapsible className="space-y-2">
              {liveTests.map((test, index) => (
                <TestingProcedureCard key={index} test={test} index={index} />
              ))}
            </MobileAccordion>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-elec-yellow/20">
        <p className="text-xs text-foreground/60 text-center">
          All testing procedures must comply with BS 7671:2018+A2:2022 regulations
        </p>
      </div>
    </Card>
  );
};
