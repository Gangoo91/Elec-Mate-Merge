
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

const MarketResearchCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Market Research & Customer Targeting</CardTitle>
            <CardDescription>Understanding your ideal customers and market positioning</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <p>Effective customer acquisition begins with identifying precisely who your ideal clients are:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Conduct local market research to identify underserved niches (e.g., smart home installations, rapid response emergency services, etc.)</li>
          <li>Analyse demographic data from your local council to identify areas with higher concentrations of your target customers</li>
          <li>Create customer personas for different market segments (homeowners, landlords, commercial property managers, etc.)</li>
          <li>Research typical customer journey for electrical services in your region</li>
          <li>Evaluate competitors' strengths and weaknesses through Google reviews and local reputation</li>
          <li>Consider seasonal demand patterns specific to your area to plan marketing efforts accordingly</li>
          <li>Identify client pain points through surveys with existing customers</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default MarketResearchCard;
