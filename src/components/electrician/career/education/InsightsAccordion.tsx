import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PoundSterling, 
  TrendingUp, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Lightbulb,
  Target
} from "lucide-react";
import { LiveEducationAnalytics } from "@/hooks/useLiveEducationData";

interface InsightsAccordionProps {
  analytics: LiveEducationAnalytics | null;
}

const InsightsAccordion = ({ analytics }: InsightsAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultAnalytics = {
    averageStartingSalary: "£28,000 - £35,000",
    fundingOptionsAvailable: 12,
    topCategories: ["Electrical Engineering", "Renewable Energy", "Building Services"],
    popularStudyModes: ["Part-time", "Online", "Evening"],
    averageCourseDuration: "18 months"
  };

  const data = analytics || defaultAnalytics;

  return (
    <Card className="border-elec-yellow/10 bg-elec-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Market Insights
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Salary Expectations</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                Starting salaries: {data.averageStartingSalary}<br />
                With qualifications: £35,000 - £55,000+<br />
                Senior roles: £55,000 - £85,000+
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Popular Categories</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                {data.topCategories?.map((category, index) => (
                  <div key={index}>• {category}</div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Study Trends</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                Most choose: {(data as any).popularStudyModes?.join(", ") || "Part-time, Online, Evening"}<br />
                Average duration: {(data as any).averageCourseDuration || "18 months"}<br />
                82% complete within planned timeframe
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium">Funding Support</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                {data.fundingOptionsAvailable}+ funding options available<br />
                Advanced Learner Loans for Level 3-6<br />
                Government grants up to £12,167
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default InsightsAccordion;