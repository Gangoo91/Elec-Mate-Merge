
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

const TraditionalMarketingCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <BadgeCheck className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Traditional Marketing Approaches</CardTitle>
            <CardDescription>Offline strategies that still deliver strong results</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Design professional vehicle livery that serves as a mobile advertisement</li>
          <li>Create branded uniforms and PPE for enhanced professionalism and recognition</li>
          <li>Consider local newspaper advertorials about electrical safety or energy efficiency</li>
          <li>Distribute door drop leaflets in targeted neighbourhoods with relevant service offerings</li>
          <li>Partner with complementary trades (plumbers, builders, etc.) for mutual referrals</li>
          <li>Attend local home improvement shows and community events</li>
          <li>Offer free electrical safety checks to community organisations to build goodwill</li>
          <li>Create referral incentive programmes for existing customers</li>
          <li>Sponsor local sports teams or community events for increased visibility</li>
          <li>Develop relationships with local estate agents and letting agencies who need reliable electrical contractors</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TraditionalMarketingCard;
