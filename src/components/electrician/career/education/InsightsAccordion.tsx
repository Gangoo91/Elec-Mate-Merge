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
        <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 pt-0 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Salary Expectations */}
            <div className="bg-gradient-to-br from-background/50 to-background/20 rounded-lg p-4 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                </div>
                <span className="font-semibold mobile-text text-foreground">Salary Expectations</span>
              </div>
              <div className="mobile-small-text text-text-subtle space-y-2 leading-relaxed">
                <div className="flex justify-between items-center">
                  <span>Starting salaries:</span>
                  <span className="font-medium text-elec-yellow">{data.averageStartingSalary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>With qualifications:</span>
                  <span className="font-medium">£35,000 - £55,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Senior roles:</span>
                  <span className="font-medium">£55,000 - £85,000+</span>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-gradient-to-br from-background/50 to-background/20 rounded-lg p-4 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <Target className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                </div>
                <span className="font-semibold mobile-text text-foreground">Popular Categories</span>
              </div>
              <div className="mobile-small-text text-text-subtle space-y-2">
                {data.topCategories?.map((category, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span>• {typeof category === 'string' ? category : category.name}</span>
                    {typeof category === 'object' && category.count && (
                      <span className="text-xs bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded-full">
                        {category.count} courses
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Study Trends */}
            <div className="bg-gradient-to-br from-background/50 to-background/20 rounded-lg p-4 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <TrendingUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                </div>
                <span className="font-semibold mobile-text text-foreground">Study Trends</span>
              </div>
              <div className="mobile-small-text text-text-subtle space-y-2 leading-relaxed">
                <div>
                  <span className="text-foreground font-medium">Most popular:</span> {(data as any).popularStudyModes?.join(", ") || "Part-time, Online, Evening"}
                </div>
                <div>
                  <span className="text-foreground font-medium">Average duration:</span> {(data as any).averageCourseDuration || "18 months"}
                </div>
                <div className="text-elec-yellow font-medium">
                  82% complete within planned timeframe
                </div>
              </div>
            </div>

            {/* Funding Support */}
            <div className="bg-gradient-to-br from-background/50 to-background/20 rounded-lg p-4 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <PoundSterling className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                </div>
                <span className="font-semibold mobile-text text-foreground">Funding Support</span>
              </div>
              <div className="mobile-small-text text-text-subtle space-y-2 leading-relaxed">
                <div>
                  <span className="text-elec-yellow font-bold">{data.fundingOptionsAvailable}+</span> funding options available
                </div>
                <div>Advanced Learner Loans for Level 3-6</div>
                <div className="text-elec-yellow font-medium">
                  Government grants up to £12,167
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default InsightsAccordion;