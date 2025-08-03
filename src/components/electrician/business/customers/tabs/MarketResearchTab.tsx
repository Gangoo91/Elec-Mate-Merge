import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, MapPin, TrendingUp, Search, PieChart } from "lucide-react";

const MarketResearchTab = () => {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Market Research & Targeting</CardTitle>
          </div>
          <CardDescription>
            Understanding your local market and identifying your ideal customers is the foundation of successful customer acquisition.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Key Research Areas</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                  Local competition analysis
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  Customer demographics
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  Geographic service areas
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  Market demand patterns
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-elec-yellow">Research Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>• Google My Business insights</li>
                <li>• Local council planning data</li>
                <li>• Census demographic data</li>
                <li>• Trade publication reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Customer Segments */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Target Customer Segments</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Residential Customers</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Homeowners</Badge>
                <Badge variant="secondary">Landlords</Badge>
                <Badge variant="secondary">New Build Buyers</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Focus on safety, reliability, and long-term value
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Commercial Clients</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Small Businesses</Badge>
                <Badge variant="secondary">Retail Shops</Badge>
                <Badge variant="secondary">Offices</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Emphasise compliance, efficiency, and minimal downtime
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Industrial Clients</h4>
              <div className="space-y-2">
                <Badge variant="secondary">Factories</Badge>
                <Badge variant="secondary">Warehouses</Badge>
                <Badge variant="secondary">Construction</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Highlight expertise, capacity, and project management
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis Framework */}
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <PieChart className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Market Analysis Framework</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">SWOT Analysis</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                  <h5 className="font-medium text-green-600">Strengths</h5>
                  <p className="text-xs">Your unique advantages</p>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                  <h5 className="font-medium text-red-600">Weaknesses</h5>
                  <p className="text-xs">Areas for improvement</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <h5 className="font-medium text-blue-600">Opportunities</h5>
                  <p className="text-xs">Market gaps to exploit</p>
                </div>
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                  <h5 className="font-medium text-orange-600">Threats</h5>
                  <p className="text-xs">External challenges</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-elec-yellow">Competitive Analysis</h4>
              <ul className="space-y-2 text-sm">
                <li>• Identify direct competitors in your area</li>
                <li>• Analyse their pricing strategies</li>
                <li>• Review their service offerings</li>
                <li>• Study their marketing approaches</li>
                <li>• Assess their online presence</li>
                <li>• Find gaps in their service</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketResearchTab;