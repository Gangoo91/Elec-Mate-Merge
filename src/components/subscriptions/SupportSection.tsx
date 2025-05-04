
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, ExternalLink } from "lucide-react";
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

  const handleTryAgain = () => {
    toast({
      title: "Try Again",
      description: "If you're experiencing payment issues, try refreshing the page or using a different browser. This often resolves checkout problems.",
    });
    // Refresh the page after a short delay
    setTimeout(() => window.location.reload(), 2000);
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
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleContactSupport}>
              <Mail size={16} />
              Contact Support
            </Button>
            <Button variant="outline" onClick={handleViewFAQ}>
              View Billing FAQ
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleTryAgain}>
              <ExternalLink size={16} />
              Refresh Page
            </Button>
          </div>
          
          <div className="bg-amber-50/10 p-4 rounded-md border border-amber-200/20 mt-4">
            <h4 className="font-medium text-amber-200 mb-2">Having Trouble with Payments?</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Make sure your browser allows pop-ups from our site</li>
              <li>• Try using a different browser like Chrome or Edge</li>
              <li>• Check that your payment method is valid and not expired</li>
              <li>• If the issue persists, please contact our support team</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
