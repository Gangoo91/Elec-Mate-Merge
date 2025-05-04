
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCancelled?: () => Promise<void>;
  onDiscountAccepted?: () => void;
}

const CancelSubscriptionDialog = ({
  isOpen,
  setIsOpen,
  onCancelled,
  onDiscountAccepted
}: CancelSubscriptionDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDiscountConfirmation, setShowDiscountConfirmation] = useState(false);
  const { toast } = useToast();

  const handleCancel = async () => {
    try {
      setIsProcessing(true);
      
      // First, get subscription info from customer portal function
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error('Cancellation error:', error);
        throw new Error(error.message);
      }
      
      if (data?.error) {
        console.error('Cancellation function error:', data.error);
        throw new Error(data.error);
      }
      
      if (data?.directManagement && data?.subscriptionId) {
        // Create a new edge function call to cancel the subscription directly
        const { data: cancelData, error: cancelError } = await supabase.functions.invoke('cancel-subscription', {
          body: { subscriptionId: data.subscriptionId }
        });
        
        if (cancelError) {
          throw new Error(cancelError.message);
        }
        
        if (cancelData?.success) {
          toast({
            title: "Subscription Cancelled",
            description: "Your subscription has been successfully cancelled.",
            variant: "default",
          });
          
          // Run the onCancelled callback if provided
          if (onCancelled) {
            await onCancelled();
          }
          setIsOpen(false);
        } else {
          throw new Error(cancelData?.message || 'Unknown error during cancellation');
        }
      } else if (data?.url) {
        // If customer portal is available, use it
        window.open(data.url, '_blank') || window.location.assign(data.url);
        setIsOpen(false);
      } else {
        throw new Error('Unable to process cancellation');
      }
    } catch (error) {
      console.error('Cancellation error:', error);
      toast({
        title: "Cancellation Error",
        description: error instanceof Error ? error.message : "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDiscountOffer = () => {
    // Handle the discount acceptance logic
    if (onDiscountAccepted) {
      onDiscountAccepted();
    }
    
    toast({
      title: "Discount Applied!",
      description: "Your 25% permanent discount has been applied to your subscription. Thank you for staying with us!",
    });
    
    setIsOpen(false);
    setShowDiscountConfirmation(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {!showDiscountConfirmation ? (
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Wait! Before you go...</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              <div className="space-y-4 py-2">
                <p>Would you like to keep your subscription with <strong>25% off</strong> permanently?</p>
                
                <div className="bg-amber-50/10 p-4 rounded-md border border-amber-200/20 mt-2">
                  <h4 className="font-medium text-amber-200 mb-2">Special Offer Just For You</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>25% discount on your subscription permanently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Continue with full access to all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>You can still cancel anytime</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
            <Button 
              onClick={handleDiscountOffer}
              className="w-full sm:w-auto"
              variant="default"
            >
              Yes, Give Me 25% Off
            </Button>
            <Button 
              onClick={() => setShowDiscountConfirmation(true)} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              No, Continue Cancellation
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You're about to cancel your subscription. You'll still have access until the end of your billing period.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDiscountConfirmation(false)}>
              Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Cancel Subscription
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default CancelSubscriptionDialog;
