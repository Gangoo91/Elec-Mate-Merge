
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SupportSection = () => {
  const { toast } = useToast();
  
  const handleContactSupport = () => {
    // This would ideally open a support modal or redirect to a support page
    // For now, we'll just show a toast with contact information
    toast({
      title: "Contact Support",
      description: "Please email support@elecmate.com for assistance with payments or subscription issues.",
    });
  };
  
  const handleViewFAQ = () => {
    // This would ideally scroll to the FAQ section or open a modal
    // For now, we'll just show a toast
    toast({
      title: "Billing FAQ",
      description: "Scroll down to view our frequently asked questions about billing and subscriptions.",
    });
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle size={20} />
          Need Help?
        </CardTitle>
        <CardDescription>Our support team is ready to assist you with any payment or subscription questions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleContactSupport}>
            <Mail size={16} />
            Contact Support
          </Button>
          <Button variant="outline" onClick={handleViewFAQ}>
            View Billing FAQ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
