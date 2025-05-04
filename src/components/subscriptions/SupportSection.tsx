
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SupportSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
        <CardDescription>Our support team is ready to assist you with any questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline">Contact Support</Button>
          <Button variant="outline">View Billing FAQ</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
