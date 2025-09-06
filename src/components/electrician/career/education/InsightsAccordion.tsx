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
    topCategories: [
      { name: "Electrical Engineering", count: 156 },
      { name: "Renewable Energy", count: 89 },
      { name: "Building Services", count: 67 }
    ],
    popularStudyModes: ["Part-time", "Online", "Evening"],
    averageCourseDuration: "18 months"
  };

  const data = analytics || defaultAnalytics;

  return (
    <Card className="mobile-card">
      <CardHeader className="mobile-padding pb-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-3 mobile-subheading">
            <Lightbulb className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <span>Market Insights</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="touch-target p-2 hover:bg-accent/10"
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
        <CardContent className="mobile-padding pt-0 mobile-card-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="font-medium mobile-text">Salary Expectations</span>
              </div>
              <div className="mobile-small-text text-text-subtle ml-7 space-y-1 leading-relaxed">
                <div>Starting salaries: {data.averageStartingSalary}</div>
                <div>With qualifications: £35,000 - £55,000+</div>
                <div>Senior roles: £55,000 - £85,000+</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="font-medium mobile-text">Popular Categories</span>
              </div>
              <div className="mobile-small-text text-text-subtle ml-7 space-y-1">
                {data.topCategories?.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>• {typeof category === 'string' ? category : category.name}</span>
                    {typeof category === 'object' && category.count && (
                      <span className="text-xs text-text-subtle">({category.count} courses)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="font-medium mobile-text">Study Trends</span>
              </div>
              <div className="mobile-small-text text-text-subtle ml-7 space-y-1 leading-relaxed">
                <div>Most choose: {(data as any).popularStudyModes?.join(", ") || "Part-time, Online, Evening"}</div>
                <div>Average duration: {(data as any).averageCourseDuration || "18 months"}</div>
                <div>82% complete within planned timeframe</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="font-medium mobile-text">Funding Support</span>
              </div>
              <div className="mobile-small-text text-text-subtle ml-7 space-y-1 leading-relaxed">
                <div>{data.fundingOptionsAvailable}+ funding options available</div>
                <div>Advanced Learner Loans for Level 3-6</div>
                <div>Government grants up to £12,167</div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default InsightsAccordion;