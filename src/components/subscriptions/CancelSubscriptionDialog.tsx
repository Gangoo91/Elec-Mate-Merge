
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCancelled?: () => Promise<void>;
}

const CancelSubscriptionDialog = ({
  isOpen,
  setIsOpen,
  onCancelled
}: CancelSubscriptionDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Are you sure you want to cancel?</AlertDialogTitle>
          <AlertDialogDescription className="text-base space-y-4">
            <p>
              You're about to cancel your subscription. You'll still have access until the end of your billing period.
            </p>
            
            <div className="bg-slate-800/50 p-4 rounded-md border border-slate-700 mt-2">
              <h4 className="font-medium text-slate-200 mb-2">Coming Soon</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span>• Advanced project management tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>• Enhanced learning materials and certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>• Expanded calculator suite with new features</span>
                </li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>
            Keep My Subscription
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
                Yes, Cancel Subscription
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubscriptionDialog;
