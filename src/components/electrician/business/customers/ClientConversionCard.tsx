
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const ClientConversionCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Award className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Client Conversion Techniques</CardTitle>
            <CardDescription>Turning enquiries into paying customers</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Develop a standardised enquiry handling process with rapid response times</li>
          <li>Create professional quotation templates that clearly explain the value proposition</li>
          <li>Offer tiered service packages to accommodate different budgets</li>
          <li>Provide detailed explanations of technical requirements in simple terms</li>
          <li>Include testimonials and case studies from similar projects in your proposals</li>
          <li>Implement clear follow-up schedules for quotes (48 hours, 1 week, etc.)</li>
          <li>Consider financing options for larger electrical installations</li>
          <li>Offer booking incentives such as priority scheduling for quote acceptance within X days</li>
          <li>Prepare for common customer objections with clear, value-focused responses</li>
          <li>Train staff on consultative selling techniques rather than pressure tactics</li>
          <li>Highlight your certifications, insurance and professional memberships in all communications</li>
          <li>Create a sense of urgency by highlighting limited availability or seasonal demand</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ClientConversionCard;
