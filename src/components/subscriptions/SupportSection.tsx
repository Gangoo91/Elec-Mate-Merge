
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, ExternalLink, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SupportSection = () => {
  const { toast } = useToast();
  
  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Please email support@elecmate.com for assistance with payments or subscription issues.",
    });
  };
  
  const handleViewFAQ = () => {
    toast({
      title: "Billing FAQ",
      description: "Scroll down to view our frequently asked questions about billing and subscriptions.",
    });
  };

  const handleTryAgain = () => {
    toast({
      title: "Refreshing Page",
      description: "The page will refresh in a moment to resolve potential loading issues.",
    });
    // Refresh the page after a short delay
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleOpenInNewWindow = () => {
    toast({
      title: "Opening Checkout",
      description: "Trying to open checkout in a new window which may resolve popup blocking issues.",
    });
    
    // Attempt to open a checkout directly in a new window
    const checkoutUrl = window.location.href;
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleContactSupport}>
              <Mail size={16} />
              Contact Support
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleTryAgain}>
              <RefreshCw size={16} />
              Refresh Page
            </Button>
            <Button variant="outline" onClick={handleViewFAQ}>
              View Billing FAQ
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleOpenInNewWindow}>
              <ExternalLink size={16} />
              Open in New Window
            </Button>
          </div>
          
          <div className="bg-amber-50/10 p-4 rounded-md border border-amber-200/20 mt-4">
            <h4 className="font-medium text-amber-200 mb-2">Having Trouble with Stripe Checkout?</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Make sure your browser allows pop-ups from our site</li>
              <li>• Try using a different browser like Chrome or Edge</li>
              <li>• Check that cookies are enabled in your browser settings</li>
              <li>• Try clicking the "Open in New Window" button above</li>
              <li>• If Stripe shows a blank page, try refreshing the checkout page</li>
              <li>• If the issue persists, please contact our support team</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
