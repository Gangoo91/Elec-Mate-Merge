
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, DollarSign, Wrench } from "lucide-react";
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
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
            UK Electrical Work Sectors
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Overview of different electrical work sectors in the UK, their pay rates, and growth prospects
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ukWorkSectors.map((sector) => (
              <Card key={sector.name} className="border-elec-yellow/10 bg-elec-dark/50 h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{sector.name}</CardTitle>
                    <Badge className={getGrowthColor(sector.growth_outlook)}>
                      {sector.growth_outlook}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{sector.description}</p>
                  
                  {/* Pay information */}
                  <div className="bg-elec-yellow/10 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-elec-yellow" />
                      <span className="text-sm font-medium text-elec-yellow">Typical Daily Rates</span>
                    </div>
                    <div className="text-lg font-bold text-green-400">{sector.typical_pay}</div>
                  </div>

                  {/* Key skills */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      Key Skills Required
                    </h4>
                    <div className="space-y-1">
                      {sector.key_skills.map((skill, idx) => (
                        <div key={idx} className="text-xs flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth indicator */}
                  <div className="pt-3 border-t border-elec-yellow/10">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-elec-yellow" />
                      <span className="text-xs text-muted-foreground">
                        Growth Outlook: <span className="text-elec-yellow">{sector.growth_outlook}</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKWorkSectors;
