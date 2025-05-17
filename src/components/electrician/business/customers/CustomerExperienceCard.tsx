
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const CustomerExperienceCard = () => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Star className="h-6 w-6 text-elec-yellow" />
          <div>
            <CardTitle>Customer Experience Excellence</CardTitle>
            <CardDescription>Creating delighted customers who become advocates</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-200">
        <ul className="list-disc pl-6 space-y-2">
          <li>Implement a customer communication system with appointment reminders and updates</li>
          <li>Train technicians on customer service skills as well as technical ability</li>
          <li>Establish clear expectations about arrival times, project duration, and cleanup</li>
          <li>Use protective measures like floor coverings and dust sheets even for small jobs</li>
          <li>Provide detailed explanations of completed work with documentation and photos</li>
          <li>Follow up after service completion to ensure customer satisfaction</li>
          <li>Create maintenance reminder systems for regular service intervals</li>
          <li>Develop a customer portal for scheduling service and accessing documentation</li>
          <li>Implement a loyalty programme with discounts on future services</li>
          <li>Consider offering extended warranties on installations to build long-term relationships</li>
          <li>Add small touches like leaving behind promotional items (notepads, pens, etc.)</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CustomerExperienceCard;
