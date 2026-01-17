import { useState, useEffect } from 'react';
import { Quote } from '@/types/quote';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Mail, MessageCircle, Loader2, CreditCard, Zap, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface InvoiceSendDropdownProps {
  invoice: Quote;
  onSuccess?: () => void;
  disabled?: boolean;
  className?: string;
  refreshKey?: number;
}

export const InvoiceSendDropdown = ({
  invoice,
  onSuccess,
  disabled = false,
  className = '',
  refreshKey = 0,
}: InvoiceSendDropdownProps) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSharingWhatsApp, setIsSharingWhatsApp] = useState(false);
  const [isConnectingStripe, setIsConnectingStripe] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<'loading' | 'not_connected' | 'pending' | 'active'>('loading');

  // Check if user has Stripe connected - refreshes on mount, focus, or refreshKey change
  // Calls edge function to sync with Stripe API and update database
  useEffect(() => {
    const checkStripeStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setStripeStatus('not_connected');
          return;
        }

        // Call edge function to check actual Stripe status and sync database
        const { data, error } = await supabase.functions.invoke('get-stripe-connect-status', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          console.error('Error checking Stripe status:', error);
          // Fallback to database read
          const { data: profile } = await supabase
            .from('company_profiles')
            .select('stripe_account_id, stripe_account_status')
            .eq('user_id', session.user.id)
            .single();

          if (profile?.stripe_account_status === 'active') {
            setStripeStatus('active');
          } else if (profile?.stripe_account_id) {
            setStripeStatus('pending');
          } else {
            setStripeStatus('not_connected');
          }
          return;
        }

        // Edge function returns actual Stripe status and updates DB
        if (data?.status === 'active') {
          setStripeStatus('active');
        } else if (data?.connected) {
          setStripeStatus('pending');
        } else {
          setStripeStatus('not_connected');
        }
      } catch (error) {
        console.error('Error checking Stripe status:', error);
        setStripeStatus('not_connected');
      }
    };

    checkStripeStatus();

    // Re-check when window regains focus (after returning from Stripe)
    const handleFocus = () => checkStripeStatus();
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshKey]);

  // Poll PDF Monkey status via edge function until downloadUrl is ready (max ~90s)
  const pollPdfDownloadUrl = async (documentId: string, accessToken: string): Promise<string | null> => {
    for (let i = 0; i < 45; i++) {
      const { data } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: { documentId, mode: 'status' },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (data?.downloadUrl) return data.downloadUrl;
      await new Promise((res) => setTimeout(res, 2000));
    }
    return null;
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const handleSendEmail = async () => {
    try {
      setIsSendingEmail(true);

      // Validate client email
      const cleanTo = invoice.client?.email?.trim();
      if (!cleanTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanTo)) {
        toast({
          title: "Invalid Client Email",
          description: "Client email address is invalid. Please correct it in the invoice and try again.",
          variant: "destructive",
        });
        setIsSendingEmail(false);
        return;
      }

      // Get current session
      let { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError || !refreshData.session) {
          throw new Error('Please log in again to send invoices.');
        }
        session = refreshData.session;
      }

      // Send via Resend - use fetch directly to get full error details
      console.log('📧 Calling send-invoice-resend with invoiceId:', invoice.id);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co'}/functions/v1/send-invoice-resend`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ invoiceId: invoice.id }),
        }
      );

      const data = await response.json();
      console.log('📧 Response status:', response.status);
      console.log('📧 Response data:', data);

      if (!response.ok) {
        console.error('📧 Function error:', data);
        throw new Error(data.error || data.message || `Server error: ${response.status}`);
      }

      if (data?.error) {
        console.error('📧 Function returned error in data:', data);
        throw new Error(data.error + (data.hint ? ` (${data.hint})` : ''));
      }

      if (!data?.success) {
        console.error('📧 Function did not return success:', data);
        throw new Error(data?.message || 'Unknown error sending invoice');
      }

      // Show success message with payment link status
      const payNowIncluded = data?.payNowIncluded;
      toast({
        title: 'Invoice sent',
        description: payNowIncluded
          ? `Invoice ${invoice.invoice_number} sent to ${cleanTo} with Pay Now button`
          : `Invoice ${invoice.invoice_number} sent to ${cleanTo}`,
        variant: 'success',
        duration: 4000,
      });

      // Prompt to connect Stripe if not connected
      if (!payNowIncluded && stripeStatus === 'not_connected') {
        setTimeout(() => {
          toast({
            title: 'Get paid faster with card payments',
            description: 'Connect Stripe to add a "Pay Now" button to invoices',
            action: (
              <Button
                size="sm"
                variant="outline"
                className="border-indigo-500/30 hover:bg-indigo-500/10"
                onClick={() => window.location.href = '/electrician/settings?tab=billing'}
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Set up
              </Button>
            ),
            duration: 8000,
          });
        }, 1000);
      }

      // Update status to sent with timestamp
      await supabase
        .from('quotes')
        .update({
          invoice_status: 'sent',
          invoice_sent_at: new Date().toISOString()
        })
        .eq('id', invoice.id);

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sending invoice:', error);

      toast({
        title: 'Error sending invoice',
        description: error.message || 'Failed to send invoice. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };


  const handleShareWhatsApp = async () => {
    try {
      setIsSharingWhatsApp(true);

      // ALWAYS regenerate PDF for guaranteed freshness - fetch latest data first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Step 1: Fetch FRESH invoice data from database
      const { data: freshInvoice, error: fetchError } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', invoice.id)
        .eq('user_id', user.id)
        .single();

      if (fetchError || !freshInvoice) {
        throw new Error('Failed to fetch latest invoice data');
      }

      const { data: companyData, error: companyError } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (companyError) {
        console.error('Company profile error:', companyError);
      }

      // Step 2: Generate fresh PDF with latest data (silently)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke('generate-pdf-monkey', {
        body: {
          quote: freshInvoice, // Use fresh data from database
          companyProfile: companyData,
          invoice_mode: true,
          force_regenerate: true
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      let pdfUrl = pdfData?.downloadUrl;
      const documentId = pdfData?.documentId;

      if (!pdfUrl && documentId) {
        pdfUrl = await pollPdfDownloadUrl(documentId, session.access_token) || undefined;
      }

      if (pdfError || !pdfUrl) {
        console.error('PDF Monkey error:', pdfError);
        throw new Error('Failed to generate professional PDF');
      }

      // Step 3: Store PDF metadata in database (NO URL - it expires)
      if (documentId) {
        const newVersion = (freshInvoice.pdf_version || 0) + 1;
        await supabase
          .from('quotes')
          .update({
            pdf_document_id: documentId,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: newVersion
          })
          .eq('id', invoice.id);
      }

      // Step 4: Use fresh PDF URL directly (don't store - it expires)
      const cacheBustedPdfUrl = `${pdfUrl}?t=${Date.now()}`;

      // Step 5: Create professional WhatsApp message with cache-busted URL
      const clientData = typeof freshInvoice.client_data === 'string' 
        ? JSON.parse(freshInvoice.client_data) 
        : freshInvoice.client_data;
      const clientName = clientData?.name || 'Valued Client';
      const companyName = companyData?.company_name || 'Your Company';
      const totalAmount = freshInvoice.total || 0;
      const dueDate = freshInvoice.invoice_due_date 
        ? format(new Date(freshInvoice.invoice_due_date), 'dd MMMM yyyy')
        : format(new Date(), 'dd MMMM yyyy');
      
      const message = `📄 *Invoice ${freshInvoice.invoice_number}*

Dear ${clientName},

Please find your invoice for ${formatCurrency(totalAmount)}
Due date: ${dueDate}

📥 Download Invoice (PDF):
${cacheBustedPdfUrl}

Payment details are included in the invoice.

If you have any questions, please don't hesitate to contact me.

Best regards,
${companyName}`;

      // Step 6: Open WhatsApp with message and fresh PDF link
      const clientPhone = clientData?.phone;
      
      let whatsappUrl: string;
      if (clientPhone && (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))) {
        // UK number - direct to client
        const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
        whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      } else {
        // No number or international - share URL only
        whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      }

      window.open(whatsappUrl, '_blank');

      toast({
        title: 'Sent via WhatsApp',
        variant: 'success',
        duration: 3000,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error sharing via WhatsApp:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to prepare invoice for WhatsApp',
        variant: 'destructive',
      });
    } finally {
      setIsSharingWhatsApp(false);
    }
  };

  // Connect existing Stripe account via OAuth (instant!)
  const handleConnectStripeOAuth = async () => {
    try {
      setIsConnectingStripe(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        sonnerToast.error('Please log in to connect Stripe');
        return;
      }

      const response = await supabase.functions.invoke('stripe-connect-oauth', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: {
          action: 'get_oauth_url',
          returnUrl: window.location.href,
        },
      });

      if (response.error) throw response.error;

      if (response.data?.error) {
        sonnerToast.error(response.data.error);
        return;
      }

      const { url } = response.data || {};
      if (url) {
        // Redirect to Stripe OAuth - user logs into their existing account
        window.location.href = url;
      } else {
        sonnerToast.error('Could not start Stripe connection');
      }
    } catch (error: any) {
      console.error('Error connecting Stripe OAuth:', error);
      sonnerToast.error(error?.message || 'Failed to connect Stripe');
    } finally {
      setIsConnectingStripe(false);
    }
  };

  // Create new Stripe Express account (for users without Stripe)
  const handleConnectStripeExpress = async () => {
    try {
      setIsConnectingStripe(true);
      const { data: session } = await supabase.auth.getSession();

      if (!session.session) {
        sonnerToast.error('Please log in to connect Stripe');
        return;
      }

      // Pass current URL so Stripe redirects back here after onboarding
      const response = await supabase.functions.invoke('create-stripe-connect-account', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
        body: { returnUrl: window.location.href },
      });

      if (response.error) throw response.error;

      // Check for error in response data
      if (response.data?.error) {
        sonnerToast.error(response.data.error, {
          description: response.data.action || undefined,
          duration: 6000,
        });
        return;
      }

      const { url, type } = response.data || {};

      if (url) {
        if (type === 'dashboard') {
          sonnerToast.success('Opening Stripe Dashboard');
          window.open(url, '_blank');
        } else {
          // Redirect to Stripe onboarding - will return to same page with ?stripe=success
          window.location.href = url;
        }
      } else {
        sonnerToast.error('Could not start Stripe setup', {
          description: 'Please try again or contact support.',
        });
      }
    } catch (error: any) {
      console.error('Error connecting Stripe:', error);
      const errorMessage = error?.message || error?.error ||
        (typeof error === 'string' ? error : 'Failed to connect Stripe');
      sonnerToast.error(errorMessage);
    } finally {
      setIsConnectingStripe(false);
    }
  };

  const isLoading = isSendingEmail || isSharingWhatsApp || isConnectingStripe;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          disabled={disabled || isLoading}
          className={`h-11 touch-manipulation rounded-xl bg-blue-600 hover:bg-blue-700 text-white ${className}`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin sm:mr-2" />
          ) : (
            <Mail className="h-4 w-4 sm:mr-2" />
          )}
          <span className="hidden sm:inline">{isLoading ? (isSendingEmail ? 'Sending...' : 'Loading...') : 'Send'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-64 bg-card/95 backdrop-blur-lg border border-border/50 shadow-2xl rounded-2xl z-50 p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
          Send Invoice
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleSendEmail}
          disabled={isSendingEmail}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-blue-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSendingEmail ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : (
              <Mail className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Send via Email</span>
            <span className="text-xs text-muted-foreground">Sends with PDF attachment</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleShareWhatsApp}
          disabled={isSharingWhatsApp}
          className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-green-500/10 touch-manipulation"
        >
          <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center mr-3 flex-shrink-0">
            {isSharingWhatsApp ? (
              <Loader2 className="h-5 w-5 text-green-500 animate-spin" />
            ) : (
              <MessageCircle className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Share via WhatsApp</span>
            <span className="text-xs text-muted-foreground">Send with PDF link</span>
          </div>
        </DropdownMenuItem>

        {/* Stripe Connect - show connect options, pending status, or connected status */}
        {stripeStatus === 'not_connected' && (
          <>
            <DropdownMenuSeparator className="my-2 bg-border/30" />
            <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground px-3 py-1 uppercase tracking-wider">
              Accept Card Payments
            </DropdownMenuLabel>
            {/* Primary: Connect existing Stripe via OAuth (INSTANT!) */}
            <DropdownMenuItem
              onClick={handleConnectStripeOAuth}
              disabled={isConnectingStripe}
              className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-indigo-500/10 touch-manipulation bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-500/30"
            >
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                {isConnectingStripe ? (
                  <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />
                ) : (
                  <Zap className="h-5 w-5 text-indigo-400" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-foreground">Connect Stripe</span>
                <span className="text-[10px] text-green-400 font-medium">Instant - just log in</span>
              </div>
            </DropdownMenuItem>
            {/* Secondary: Small link for users without Stripe */}
            <div className="px-3 py-2">
              <button
                onClick={handleConnectStripeExpress}
                disabled={isConnectingStripe}
                className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 touch-manipulation"
              >
                Don't have Stripe? Create free account
              </button>
            </div>
          </>
        )}
        {stripeStatus === 'pending' && (
          <>
            <DropdownMenuSeparator className="my-2 bg-border/30" />
            <DropdownMenuItem
              onClick={handleConnectStripeExpress}
              disabled={isConnectingStripe}
              className="cursor-pointer rounded-xl h-16 px-3 my-1 focus:bg-amber-500/10 touch-manipulation bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                {isConnectingStripe ? (
                  <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />
                ) : (
                  <CreditCard className="h-5 w-5 text-amber-400" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm flex items-center gap-1">
                  {isConnectingStripe ? 'Loading...' : 'Finish Stripe Setup'}
                </span>
                <span className="text-xs text-muted-foreground">Complete verification to accept payments</span>
              </div>
            </DropdownMenuItem>
          </>
        )}
        {stripeStatus === 'active' && (
          <>
            <DropdownMenuSeparator className="my-2 bg-border/30" />
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">Card payments enabled</span>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};