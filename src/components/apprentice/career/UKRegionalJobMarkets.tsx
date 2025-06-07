
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Building, Users } from "lucide-react";
import { regionalJobMarkets } from "./ukCareerProgressionData";

const UKRegionalJobMarkets = () => {
  const getAvailabilityColor = (level: string) => {
    switch (level) {
      case "High": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Good": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Moderate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCostColor = (level: string) => {
    switch (level) {
      case "Very High": return "text-red-400";
      case "High": return "text-orange-400";
      case "Medium": return "text-yellow-400";
      case "Low-Medium": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            UK Regional Job Markets for Electricians
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Regional analysis of job opportunities, pay rates, and growth sectors across the UK
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regionalJobMarkets.map((region) => (
              <Card key={region.region} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{region.region}</CardTitle>
                    <Badge className={getAvailabilityColor(region.job_availability)}>
                      {region.job_availability} Demand
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Average Daily Rates</div>
                      <div className="text-sm font-semibold text-green-400">{region.average_rates}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Cost of Living</div>
                      <div className={`text-sm font-semibold ${getCostColor(region.cost_of_living)}`}>
                        {region.cost_of_living}
                      </div>
                    </div>
                  </div>

                  {/* Key sectors */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Key Sectors
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {region.key_sectors.map((sector, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Growth areas */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Growth Areas
                    </h4>
                    <div className="space-y-1">
                      {region.growth_areas.map((area, idx) => (
                        <div key={idx} className="text-xs flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-400" />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Major employers */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Major Employers
                    </h4>
                    <div className="text-xs space-y-1">
                      {region.major_employers.slice(0, 3).map((employer, idx) => (
                        <div key={idx} className="text-muted-foreground">{employer}</div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-elec-yellow/10">
                    <div className="text-xs text-muted-foreground">
                      Transport Links: <span className="text-blue-300">{region.transport_links}</span>
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

export default UKRegionalJobMarkets;
