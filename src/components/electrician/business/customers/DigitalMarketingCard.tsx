
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const DigitalMarketingCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Digital Marketing for Electricians</CardTitle>
            <CardDescription>Building your online presence to attract local customers</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Develop a mobile-responsive website with clear service descriptions and easy contact options</li>
          <li>Optimise for local SEO with relevant keywords like "emergency electrician in [your town]" or "EICR testing [your county]"</li>
          <li>Create Google Business Profile and ensure all information is complete and accurate</li>
          <li>Implement a review generation strategy to build Google and Trustpilot reviews</li>
          <li>Set up targeted local Facebook and Instagram ad campaigns with precise geographic targeting</li>
          <li>Develop educational content like "how to spot dangerous wiring" or "preparing your home for an electrical inspection"</li>
          <li>Consider Google Local Service Ads which appear at the top of search results</li>
          <li>Use remarketing campaigns to reach potential customers who've visited your website</li>
          <li>List your business on industry-specific directories such as Checkatrade, MyBuilder, and Rated People</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default DigitalMarketingCard;
