
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, ExternalLink, RefreshCw, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SupportSection = () => {
  const { toast } = useToast();
  const { checkSubscriptionStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleTryAgain = async () => {
    toast({
      title: "Refreshing Subscription Status",
      description: "Checking your current subscription status...",
    });
    
    // First check subscription status
    await checkSubscriptionStatus();
    
    // Then refresh the page after a short delay
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleOpenInNewWindow = () => {
    toast({
      title: "Opening Checkout",
      description: "Opening checkout in a new window which may resolve popup blocking issues.",
    });
    
    // Show direct Stripe checkout URL for support
    const stripePublicCheckoutUrl = "https://checkout.stripe.com";
    window.open(stripePublicCheckoutUrl, '_blank', 'noopener,noreferrer');
  };
  
  const handleOpenDirectStripe = () => {
    toast({
      title: "Opening Stripe Direct",
      description: "Redirecting to Stripe checkout directly.",
    });
    
    // This is a fallback for last-resort troubleshooting
    window.location.href = "https://buy.stripe.com/test_6oEcP74bc25oclG000";
  };
  
  // Handle opening customer portal
  const handleOpenCustomerPortal = async () => {
    try {
      setIsLoading(true);
      
      toast({
        title: "Opening Customer Portal",
        description: "Redirecting to Stripe customer portal...",
      });
      
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.url) {
        // Try to open in a new tab first
        const newWindow = window.open(data.url, '_blank');
        
        // If opening in a new window fails, redirect the current window
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          window.location.href = data.url;
        }
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open subscription management",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              Refresh Status
            </Button>
            <Button variant="outline" onClick={handleViewFAQ}>
              View Billing FAQ
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleOpenCustomerPortal}>
              <ExternalLink size={16} />
              Manage Subscription
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

          <div className="text-center pt-4">
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleOpenDirectStripe}
            >
              <AlertTriangle size={16} />
              Emergency Bypass - Direct Stripe Link
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Use this only if normal checkout isn't working
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
