
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const ClientRetentionCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Long-Term Client Retention</CardTitle>
            <CardDescription>Nurturing relationships for repeat business and referrals</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Create a CRM system to track customer touchpoints and service history</li>
          <li>Develop an email newsletter with electrical safety tips and seasonal service reminders</li>
          <li>Establish a structured feedback collection system after each job</li>
          <li>Implement a service maintenance programme with scheduled check-ups</li>
          <li>Consider annual electrical safety inspections for regular clients</li>
          <li>Develop trade account systems for business customers with preferential rates</li>
          <li>Create a formal referral programme with incentives (discounts or gift cards)</li>
          <li>Send personalised communications for important milestones (service anniversaries)</li>
          <li>Offer complementary minor services (e.g., visual inspections) with major work</li>
          <li>Develop case studies featuring successful projects (with customer permission)</li>
          <li>Hold customer appreciation events or workshops on electrical safety</li>
          <li>Train staff to identify additional service opportunities during routine visits</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ClientRetentionCard;
