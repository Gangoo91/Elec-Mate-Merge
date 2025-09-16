
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Building, Users, PoundSterling, Home, Briefcase } from "lucide-react";
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
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            UK Regional Job Markets for Electricians
          </CardTitle>
          <p className="text-sm sm:text-base text-white">
            Comprehensive 2025 regional analysis of job opportunities, pay rates, and growth sectors across the UK
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {regionalJobMarkets.map((region) => (
              <Card key={region.region} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-lg text-white text-center sm:text-left">{region.region}</CardTitle>
                    <Badge className={`${getAvailabilityColor(region.job_availability)} mx-auto sm:mx-0`}>
                      {region.job_availability} Demand
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Enhanced key metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center sm:text-left space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <PoundSterling className="h-3 w-3 text-green-400" />
                        <div className="text-xs text-white">Daily Rates</div>
                      </div>
                      <div className="text-sm font-semibold text-green-400">{region.average_rates}</div>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <Home className="h-3 w-3" />
                        <div className="text-xs text-white">Cost of Living</div>
                      </div>
                      <div className={`text-sm font-semibold ${getCostColor(region.cost_of_living)}`}>
                        {region.cost_of_living}
                      </div>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <Briefcase className="h-3 w-3 text-blue-400" />
                        <div className="text-xs text-white">Job Market</div>
                      </div>
                      <div className="text-sm font-semibold text-blue-400">{region.job_availability}</div>
                    </div>
                  </div>

                  {/* Key sectors */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Key Employment Sectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {region.key_sectors.map((sector, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Growth areas */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      High Growth Areas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {region.growth_areas.map((area, idx) => (
                        <div key={idx} className="text-xs flex items-center gap-2 text-white">
                          <div className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Major employers */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Major Employers & Opportunities
                    </h4>
                    <div className="space-y-2">
                      {region.major_employers.slice(0, 4).map((employer, idx) => (
                        <div key={idx} className="text-xs text-white flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                          {employer}
                        </div>
                      ))}
                      {region.major_employers.length > 4 && (
                        <div className="text-xs text-white italic">
                          +{region.major_employers.length - 4} more major employers
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced regional info */}
                  <Card className="bg-elec-yellow/5 border-elec-yellow/20">
                    <CardContent className="p-3 space-y-2">
                      <div className="text-xs">
                        <span className="text-elec-yellow font-medium">Transport Links:</span>
                        <span className="text-blue-300 ml-1">{region.transport_links}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-elec-yellow font-medium">Best For:</span>
                        <span className="text-white ml-1">
                          {region.job_availability === "High" ? "High job security, diverse opportunities" :
                           region.job_availability === "Good" ? "Steady work, good prospects" :
                           "Specialized roles, competitive market"}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-elec-yellow font-medium">Career Tip:</span>
                        <span className="text-white ml-1">
                          {region.cost_of_living === "Very High" ? "Consider contractor rates to offset living costs" :
                           region.cost_of_living === "High" ? "Good balance of rates and opportunities" :
                           "Lower costs can mean higher disposable income"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Additional market insights */}
          <Card className="mt-6 border-elec-yellow/10 bg-elec-dark/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-elec-yellow mb-4">2025 UK Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2 text-blue-400">2025 Market Trends:</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• Net Zero targets accelerating demand</li>
                    <li>• Heat pump installations ramping up</li>
                    <li>• EV charging reaching 50,000+ new points</li>
                    <li>• AI-driven data centres expanding rapidly</li>
                    <li>• Grid modernisation creating specialist roles</li>
                    <li>• Building automation becoming standard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-green-400">Best Regions for (2025):</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• New starters: Midlands, North (lower cost)</li>
                    <li>• High earners: London, South East (£300+/day)</li>
                    <li>• Work-life balance: Scotland, Wales</li>
                    <li>• Contractors: Major cities, infrastructure projects</li>
                    <li>• Specialists: EV/Solar anywhere, data centres</li>
                    <li>• Nuclear: Cumbria, Suffolk, Somerset</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-orange-400">2025-2030 Outlook:</h4>
                  <ul className="space-y-1 text-xs text-white">
                    <li>• Critical skills shortage pushing rates up 15%</li>
                    <li>• Green tech creating £10k+ salary premiums</li>
                    <li>• Regional levelling up: Northern investments</li>
                    <li>• Automation requiring continuous upskilling</li>
                    <li>• Brexit impact stabilising, EU mobility limited</li>
                    <li>• Apprenticeship levy driving training investment</li>
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

export default UKRegionalJobMarkets;
