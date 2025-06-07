
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, PoundSterling, Wrench, Users, Clock, Target } from "lucide-react";
import { ukWorkSectors } from "./ukCareerProgressionData";

const UKWorkSectors = () => {
  const getGrowthColor = (outlook: string) => {
    switch (outlook) {
      case "Rapid growth": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Strong": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Growing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Stable": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Cyclical": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            UK Electrical Work Sectors
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground">
            Comprehensive overview of electrical work sectors in the UK, including pay rates, growth prospects, and career opportunities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {ukWorkSectors.map((sector) => (
              <Card key={sector.name} className="border-elec-yellow/10 bg-elec-dark/50 h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-lg text-white text-center sm:text-left">{sector.name}</CardTitle>
                    <Badge className={`${getGrowthColor(sector.growth_outlook)} mx-auto sm:mx-0 flex-shrink-0`}>
                      {sector.growth_outlook}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">{sector.description}</p>
                  
                  {/* Enhanced pay information */}
                  <Card className="bg-elec-yellow/10 border-elec-yellow/20">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <PoundSterling className="h-4 w-4 text-elec-yellow" />
                        <span className="text-sm font-medium text-elec-yellow">Typical Daily Rates</span>
                      </div>
                      <div className="text-lg font-bold text-green-400 mb-2">{sector.typical_pay}</div>
                      <div className="text-xs text-muted-foreground">
                        {sector.growth_outlook === "Rapid growth" && "Premium rates due to high demand"}
                        {sector.growth_outlook === "Strong" && "Competitive rates with good progression"}
                        {sector.growth_outlook === "Growing" && "Steady rates with growth potential"}
                        {sector.growth_outlook === "Stable" && "Consistent rates across the sector"}
                        {sector.growth_outlook === "Cyclical" && "Rates vary with market conditions"}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key skills enhanced */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      Essential Skills Required
                    </h4>
                    <div className="space-y-2">
                      {sector.key_skills.map((skill, idx) => (
                        <div key={idx} className="text-xs flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                          <span className="flex-1">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career opportunities */}
                  <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardContent className="p-3">
                      <h4 className="text-sm font-medium mb-2 text-blue-400 flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        Career Opportunities
                      </h4>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-blue-400" />
                          <span>
                            {sector.name.includes("Renewable") ? "Emerging field with rapid expansion" :
                             sector.name.includes("Industrial") ? "Large-scale projects and maintenance" :
                             sector.name.includes("Commercial") ? "Diverse business environments" :
                             sector.name.includes("Domestic") ? "Direct customer interaction, flexible work" :
                             sector.name.includes("Data") ? "High-tech, precision work environment" :
                             sector.name.includes("Rail") ? "Infrastructure projects, strict safety standards" :
                             sector.name.includes("Emergency") ? "Critical response, high responsibility" :
                             "Specialized technical expertise required"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-blue-400" />
                          <span>
                            {sector.growth_outlook === "Rapid growth" ? "Excellent long-term prospects" :
                             sector.growth_outlook === "Strong" ? "Good career advancement opportunities" :
                             sector.growth_outlook === "Growing" ? "Steady progression available" :
                             sector.growth_outlook === "Stable" ? "Reliable, consistent work" :
                             "Variable demand cycles"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Growth indicator enhanced */}
                  <div className="pt-3 border-t border-elec-yellow/10 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-elec-yellow" />
                        <span className="text-xs text-muted-foreground">
                          Growth: <span className="text-elec-yellow font-medium">{sector.growth_outlook}</span>
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sector.growth_outlook === "Rapid growth" && "🚀 High demand"}
                        {sector.growth_outlook === "Strong" && "📈 Growing market"}
                        {sector.growth_outlook === "Growing" && "🔄 Expanding sector"}
                        {sector.growth_outlook === "Stable" && "🏗️ Established field"}
                        {sector.growth_outlook === "Cyclical" && "🌊 Market dependent"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Additional sector insights */}
          <Card className="mt-6 border-elec-yellow/10 bg-elec-dark/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-elec-yellow mb-4">Sector Analysis & Career Guidance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-3 text-green-400">Highest Growth Sectors:</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>Renewable Energy & EV Charging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>Data Centres & Smart Buildings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>Healthcare & Life Sciences</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-blue-400">Best for New Electricians:</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Domestic - Learn customer skills</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Commercial - Varied experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Maintenance - Diagnostic skills</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-orange-400">Specialization Tips:</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span>Choose growth sectors for future-proofing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span>Combine sectors for diverse skill set</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      <span>Consider regional sector strengths</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKWorkSectors;
