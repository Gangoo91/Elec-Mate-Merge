import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, AlertCircle, ExternalLink, Loader2, Unplug, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  getStripeConnectStatus, 
  createStripeConnectAccount, 
  getStripeOnboardingLink,
  disconnectStripeConnect,
  type StripeConnectStatus 
} from "@/services/financeService";
import { getCompanySettings } from "@/services/settingsService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function StripeConnectCard() {
  const [status, setStatus] = useState<StripeConnectStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const data = await getStripeConnectStatus();
      setStatus(data);
    } catch (error) {
      console.error("Error fetching Stripe status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Check URL params for Stripe redirect status
    const urlParams = new URLSearchParams(window.location.search);
    const stripeStatus = urlParams.get('stripe');
    
    if (stripeStatus === 'success') {
      toast({ title: "Stripe Setup", description: "Stripe account setup updated. Refreshing status..." });
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
      fetchStatus();
    } else if (stripeStatus === 'refresh') {
      toast({ title: "Setup Incomplete", description: "Please complete your Stripe account setup.", variant: "destructive" });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleConnect = async () => {
    setActionLoading(true);
    try {
      const companySettings = await getCompanySettings();
      const result = await createStripeConnectAccount(
        companySettings.company_name || 'My Company',
        companySettings.company_email || null
      );
      
      // Redirect to Stripe onboarding
      window.location.href = result.onboardingUrl;
    } catch (error: any) {
      console.error("Error creating Stripe account:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to start Stripe setup", 
        variant: "destructive" 
      });
      setActionLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('onboarding');
      window.location.href = result.url;
    } catch (error: any) {
      console.error("Error getting onboarding link:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to get setup link", 
        variant: "destructive" 
      });
      setActionLoading(false);
    }
  };

  const handleManageAccount = async () => {
    setActionLoading(true);
    try {
      const result = await getStripeOnboardingLink('dashboard');
      window.open(result.url, '_blank');
    } catch (error: any) {
      console.error("Error getting dashboard link:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to open Stripe dashboard", 
        variant: "destructive" 
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setActionLoading(true);
    try {
      await disconnectStripeConnect();
      toast({ title: "Disconnected", description: "Stripe account has been disconnected." });
      fetchStatus();
    } catch (error: any) {
      console.error("Error disconnecting:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to disconnect", 
        variant: "destructive" 
      });
    } finally {
      setActionLoading(false);
      setShowDisconnectDialog(false);
    }
  };

  if (loading) {
    return (
      <Card className="overflow-hidden border-purple-500/20">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-500" />
            Stripe Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isConnected = status?.connected && status?.account?.chargesEnabled;
  const isPending = status?.connected && !status?.account?.chargesEnabled;

  return (
    <>
      <Card className="overflow-hidden border-purple-500/20">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-500" />
                Stripe Payments
              </CardTitle>
              <CardDescription>Accept card payments on invoices</CardDescription>
            </div>
            {isConnected && (
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            )}
            {isPending && (
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                <AlertCircle className="h-3 w-3 mr-1" />
                Setup Incomplete
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {!status?.stripeConfigured ? (
            // Stripe not configured at platform level
            <div className="text-center py-4">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Stripe payments are not configured for this platform.</p>
            </div>
          ) : !status?.connected ? (
            // Not connected - show connect button
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium">Accept online payments</p>
                <p className="text-sm text-muted-foreground">
                  Connect your Stripe account to receive payments directly from clients when they view invoices online.
                </p>
              </div>
              
              <Button 
                onClick={handleConnect} 
                disabled={actionLoading}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4 mr-2" />
                )}
                Connect Stripe Account
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                1.6% platform fee + Stripe processing fees apply to each transaction
              </p>
            </div>
          ) : isPending ? (
            // Connected but setup incomplete
            <div className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <p className="text-sm font-medium text-amber-400">Complete your Stripe setup</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your Stripe account needs additional information before you can accept payments.
                </p>
              </div>
              
              <Button 
                onClick={handleCompleteSetup} 
                disabled={actionLoading}
                className="w-full h-12 bg-amber-600 hover:bg-amber-700"
              >
                {actionLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Complete Setup
              </Button>
            </div>
          ) : (
            // Fully connected
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Business</span>
                  <span className="text-sm font-medium">
                    {status.account?.businessName || 'Your Business'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-emerald-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payments</span>
                  <span className="text-sm font-medium">
                    {status.account?.chargesEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payouts</span>
                  <span className="text-sm font-medium">
                    {status.account?.payoutsEnabled ? 'Enabled' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleManageAccount} 
                  disabled={actionLoading}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  {actionLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-2" />
                  )}
                  Manage Account
                </Button>
                <Button
                  onClick={fetchStatus}
                  variant="outline"
                  size="icon"
                  className="h-11 w-11"
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              
              <Button 
                onClick={() => setShowDisconnectDialog(true)} 
                variant="ghost"
                className="w-full h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Unplug className="h-4 w-4 mr-2" />
                Disconnect Stripe
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                1.6% platform fee + Stripe processing fees apply to each transaction
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDisconnectDialog} onOpenChange={setShowDisconnectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect Stripe Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the connection to your Stripe account. You won't be able to accept card payments on invoices until you reconnect. Your Stripe account itself will not be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisconnect}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {actionLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
