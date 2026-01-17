import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, CheckCircle, X, FileSignature, Loader2, Calendar, MapPin, Clock, Briefcase } from "lucide-react";
import { Quote, QuoteItem } from "@/types/quote";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SignaturePad from "@/components/forms/SignaturePad";

const PublicQuoteView = () => {
  const { token } = useParams<{ token: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [signatureData, setSignatureData] = useState<string>("");
  const signaturePadRef = useRef<any>(null);

  useEffect(() => {
    if (token) {
      loadQuote();
    }
  }, [token]);

  // Auto-scroll to acceptance section when URL has #accept or #reject anchor
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#accept' || hash === '#reject') {
      setTimeout(() => {
        const acceptSection = document.getElementById('acceptance-section');
        if (acceptSection) {
          acceptSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          acceptSection.style.boxShadow = '0 0 0 3px rgba(250, 204, 21, 0.4)';
          setTimeout(() => {
            acceptSection.style.boxShadow = '';
          }, 2000);
        }
      }, 300);
    }
  }, [quote]);

  const loadQuote = async () => {
    if (!token) return;

    try {
      setLoading(true);

      // Query quotes table directly by public_token (more reliable than quote_views)
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .select("*")
        .eq("public_token", token)
        .single();

      if (quoteError || !quoteData) {
        console.error("Quote fetch error:", quoteError);
        throw new Error("Quote not found or expired");
      }

      const convertedQuote: Quote = {
        id: quoteData.id,
        quoteNumber: quoteData.quote_number,
        client: quoteData.client_data as any,
        items: quoteData.items as any,
        settings: quoteData.settings as any,
        jobDetails: (quoteData as any).job_details || undefined,
        subtotal: quoteData.subtotal,
        overhead: quoteData.overhead,
        profit: quoteData.profit,
        vatAmount: quoteData.vat_amount,
        total: quoteData.total,
        status: quoteData.status as Quote['status'],
        tags: quoteData.tags as any,
        notes: quoteData.notes,
        createdAt: new Date(quoteData.created_at),
        updatedAt: new Date(quoteData.updated_at),
        expiryDate: new Date(quoteData.expiry_date),
        lastReminderSentAt: quoteData.last_reminder_sent_at ? new Date(quoteData.last_reminder_sent_at) : undefined,
        acceptance_status: quoteData.acceptance_status as any,
        acceptance_method: quoteData.acceptance_method as any,
        accepted_at: quoteData.accepted_at ? new Date(quoteData.accepted_at) : undefined,
        accepted_by_name: quoteData.accepted_by_name,
        accepted_by_email: quoteData.accepted_by_email,
        accepted_ip: quoteData.accepted_ip,
        accepted_user_agent: quoteData.accepted_user_agent,
        signature_url: quoteData.signature_url,
        docusign_envelope_id: quoteData.docusign_envelope_id,
        docusign_status: quoteData.docusign_status,
        public_token: quoteData.public_token
      };

      setQuote(convertedQuote);
      setClientName(convertedQuote.client?.name || "");
      setClientEmail(convertedQuote.client?.email || "");

      // Update view tracking (non-blocking)
      supabase
        .from("quote_views")
        .upsert({
          quote_id: quoteData.id,
          public_token: token,
          is_active: true,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          last_viewed_at: new Date().toISOString()
        }, { onConflict: 'public_token' })
        .then(() => {})
        .catch(err => console.warn("View tracking failed:", err));

    } catch (error) {
      console.error("Error loading quote:", error);
      toast({
        title: "Error",
        description: "Quote not found or has expired",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptQuote = async () => {
    if (!quote || !clientName || !clientEmail || !signatureData) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide your signature",
        variant: "destructive"
      });
      return;
    }

    setAccepting(true);
    try {
      // Store signature as base64 data URL directly (no storage upload needed for anon users)
      const { error: updateError } = await supabase
        .from("quotes")
        .update({
          acceptance_status: "accepted",
          acceptance_method: "in_app_signature",
          accepted_at: new Date().toISOString(),
          accepted_by_name: clientName,
          accepted_by_email: clientEmail,
          accepted_ip: await getUserIP(),
          accepted_user_agent: navigator.userAgent,
          signature_url: signatureData, // Store base64 directly
          status: "approved"
        })
        .eq("id", quote.id)
        .eq("public_token", quote.public_token); // Ensure we match by token too

      if (updateError) {
        console.error("Update error:", updateError);
        throw updateError;
      }

      // Try to notify electrician (non-blocking)
      const { data: quoteData } = await supabase
        .from("quotes")
        .select("user_id")
        .eq("id", quote.id)
        .single();

      if (quoteData?.user_id) {
        try {
          const { data: userData } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", quoteData.user_id)
            .single();

          if (userData?.email) {
            await supabase.functions.invoke("send-invoice-smart", {
              body: {
                documentType: "quote-acceptance-notification",
                quoteId: quote.id,
                electricianEmail: userData.email,
                electricianName: userData.full_name || "Electrician",
                clientName: clientName,
                quoteNumber: quote.quoteNumber,
                total: quote.total
              }
            });
          }
        } catch (notifyError) {
          console.warn("Could not send acceptance notification:", notifyError);
        }
      }

      // Send confirmation email to client (non-blocking)
      if (clientEmail) {
        try {
          await supabase.functions.invoke("quote-acceptance-confirmation", {
            body: {
              quoteId: quote.id,
              quoteNumber: quote.quoteNumber,
              clientEmail: clientEmail,
              clientName: clientName,
              total: quote.total
            }
          });
        } catch (clientEmailError) {
          console.warn("Could not send client confirmation email:", clientEmailError);
        }
      }

      toast({
        title: "Quote Accepted!",
        description: "We've sent you a confirmation email. We'll be in touch soon to schedule the work.",
        variant: "success"
      });

      loadQuote();

    } catch (error) {
      console.error("Error accepting quote:", error);
      toast({
        title: "Error",
        description: "Failed to accept quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAccepting(false);
    }
  };

  const handleRejectQuote = async () => {
    if (!quote) return;

    setRejecting(true);
    try {
      const { error } = await supabase
        .from("quotes")
        .update({
          acceptance_status: "rejected",
          accepted_at: new Date().toISOString(),
          accepted_by_name: clientName || "Client",
          accepted_by_email: clientEmail,
          accepted_ip: await getUserIP(),
          accepted_user_agent: navigator.userAgent,
          status: "rejected"
        })
        .eq("id", quote.id);

      if (error) throw error;

      toast({
        title: "Quote Declined",
        description: "Thank you for letting us know.",
        variant: "default"
      });

      loadQuote();

    } catch (error) {
      console.error("Error rejecting quote:", error);
      toast({
        title: "Error",
        description: "Failed to decline quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setRejecting(false);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const groupItemsByCategory = (items: QuoteItem[]) => {
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, QuoteItem[]>);

    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => b.totalPrice - a.totalPrice);
    });

    return grouped;
  };

  // Loading State - Native app feel
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-elec-navy via-elec-navy to-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
          </div>
          <p className="text-elec-light text-lg font-medium">Loading quote...</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!quote) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-elec-navy via-elec-navy to-black flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Quote Not Found</h1>
          <p className="text-elec-light/70">This quote may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  const isAccepted = quote.acceptance_status === "accepted";
  const isRejected = quote.acceptance_status === "rejected";
  const isPending = !isAccepted && !isRejected;
  const groupedItems = groupItemsByCategory(quote.items || []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-navy via-elec-navy to-black">
      {/* Header - Sticky on mobile */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-elec-blue to-elec-blue/90 backdrop-blur-lg border-b border-white/10 safe-area-top">
        <div className="px-4 py-4 sm:py-5 max-w-2xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                Quote #{quote.quoteNumber}
              </h1>
              <p className="text-blue-200 text-sm flex items-center gap-1.5 mt-0.5">
                <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                Valid until {quote.expiryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="flex-shrink-0">
              {isAccepted && (
                <Badge className="bg-green-500/90 text-white border-0 h-8 px-3 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1.5" />Accepted
                </Badge>
              )}
              {isRejected && (
                <Badge className="bg-red-500/90 text-white border-0 h-8 px-3 text-sm">
                  <X className="h-4 w-4 mr-1.5" />Declined
                </Badge>
              )}
              {isPending && (
                <Badge className="bg-amber-500/90 text-white border-0 h-8 px-3 text-sm">
                  Pending
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 sm:py-6 max-w-2xl mx-auto space-y-4 pb-8 safe-area-bottom">

        {/* Total Amount - Hero Card */}
        <div className="bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 rounded-2xl p-5 sm:p-6 border border-elec-yellow/30">
          <div className="text-center">
            <p className="text-elec-light/70 text-sm mb-1">Quote Total</p>
            <p className="text-4xl sm:text-5xl font-bold text-elec-yellow">
              {formatCurrency(quote.total)}
            </p>
            {quote.settings?.vatRegistered && quote.vatAmount > 0 && (
              <p className="text-elec-light/60 text-sm mt-1">
                Inc. VAT ({formatCurrency(quote.vatAmount)})
              </p>
            )}
          </div>
        </div>

        {/* Job Details Card */}
        {quote.jobDetails && (
          <div className="bg-elec-card/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-elec-yellow" />
                Job Details
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {quote.jobDetails.title && (
                <div>
                  <p className="text-xs text-elec-light/60 uppercase tracking-wide">Project</p>
                  <p className="text-white font-medium">{quote.jobDetails.title}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {quote.jobDetails.location && (
                  <div>
                    <p className="text-xs text-elec-light/60 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />Location
                    </p>
                    <p className="text-white text-sm">{quote.jobDetails.location}</p>
                  </div>
                )}
                {quote.jobDetails.estimatedDuration && (
                  <div>
                    <p className="text-xs text-elec-light/60 flex items-center gap-1">
                      <Clock className="h-3 w-3" />Duration
                    </p>
                    <p className="text-white text-sm">{quote.jobDetails.estimatedDuration}</p>
                  </div>
                )}
              </div>
              {quote.jobDetails.description && (
                <div>
                  <p className="text-xs text-elec-light/60 uppercase tracking-wide">Description</p>
                  <p className="text-elec-light/80 text-sm mt-1">{quote.jobDetails.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quote Breakdown Card */}
        <div className="bg-elec-card/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <h2 className="text-base font-semibold text-white">Quote Breakdown</h2>
          </div>
          <div className="p-4 space-y-5">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-elec-yellow capitalize mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {category} ({items.length})
                </h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-2 px-3 bg-white/5 rounded-xl">
                      <div className="flex-1 min-w-0 pr-3">
                        <p className="text-white text-sm font-medium truncate">{item.description}</p>
                        <p className="text-elec-light/60 text-xs">
                          {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                        </p>
                      </div>
                      <p className="text-white font-semibold text-sm flex-shrink-0">
                        {formatCurrency(item.totalPrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Separator className="bg-white/10" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-elec-light/70">
                <span>Subtotal</span>
                <span>{formatCurrency(quote.subtotal)}</span>
              </div>
              {quote.overhead > 0 && (
                <div className="flex justify-between text-elec-light/70">
                  <span>Overhead ({quote.settings?.overheadPercentage || 0}%)</span>
                  <span>{formatCurrency(quote.overhead)}</span>
                </div>
              )}
              {quote.profit > 0 && (
                <div className="flex justify-between text-elec-light/70">
                  <span>Profit ({quote.settings?.profitMargin || 0}%)</span>
                  <span>{formatCurrency(quote.profit)}</span>
                </div>
              )}
              {quote.settings?.vatRegistered && quote.vatAmount > 0 && (
                <div className="flex justify-between text-elec-light/70">
                  <span>VAT ({quote.settings?.vatRate || 20}%)</span>
                  <span>{formatCurrency(quote.vatAmount)}</span>
                </div>
              )}
              <Separator className="bg-white/10" />
              <div className="flex justify-between text-lg font-bold text-white pt-1">
                <span>Total</span>
                <span className="text-elec-yellow">{formatCurrency(quote.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        {isPending && (
          <div id="acceptance-section" className="bg-elec-card/80 backdrop-blur-sm rounded-2xl border border-elec-yellow/30 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 bg-elec-yellow/10">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <FileSignature className="h-4 w-4 text-elec-yellow" />
                Accept or Decline Quote
              </h2>
              <p className="text-elec-light/70 text-xs mt-0.5">
                Please review the details above and provide your response
              </p>
            </div>
            <div className="p-4 space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="clientName" className="text-elec-light/80 text-sm">
                    Full Name *
                  </Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 mt-1.5 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow touch-manipulation text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail" className="text-elec-light/80 text-sm">
                    Email Address *
                  </Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 mt-1.5 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow touch-manipulation text-base"
                  />
                </div>
              </div>

              {/* Signature Pad */}
              <div>
                <Label className="text-elec-light/80 text-sm">
                  Digital Signature *
                </Label>
                <p className="text-elec-light/50 text-xs mb-2">
                  Sign below to accept this quote
                </p>
                <SignaturePad
                  ref={signaturePadRef}
                  onSignatureChange={setSignatureData}
                  className="w-full"
                />
              </div>

              {/* Action Buttons - Large touch targets */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleAcceptQuote}
                  disabled={accepting || rejecting || !clientName || !clientEmail || !signatureData}
                  className="h-14 bg-green-600 hover:bg-green-700 text-white font-semibold text-base rounded-xl touch-manipulation disabled:opacity-50"
                >
                  {accepting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Accept
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleRejectQuote}
                  disabled={accepting || rejecting}
                  variant="outline"
                  className="h-14 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-semibold text-base rounded-xl touch-manipulation"
                >
                  {rejecting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <X className="h-5 w-5 mr-2" />
                      Decline
                    </>
                  )}
                </Button>
              </div>

              {/* Legal Notice */}
              <p className="text-elec-light/50 text-xs text-center pt-2">
                By accepting, you agree to the quoted amount and terms. Your signature will be stored securely.
              </p>
            </div>
          </div>
        )}

        {/* Accepted/Rejected Confirmation */}
        {(isAccepted || isRejected) && (
          <div className={`rounded-2xl p-6 text-center ${
            isAccepted
              ? 'bg-green-500/10 border border-green-500/30'
              : 'bg-red-500/10 border border-red-500/30'
          }`}>
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              isAccepted ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              {isAccepted ? (
                <CheckCircle className="h-8 w-8 text-green-400" />
              ) : (
                <X className="h-8 w-8 text-red-400" />
              )}
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isAccepted ? 'text-green-400' : 'text-red-400'
            }`}>
              {isAccepted ? 'Quote Accepted' : 'Quote Declined'}
            </h3>
            <p className="text-elec-light/70 text-sm">
              {isAccepted
                ? `Thank you! Accepted by ${quote.accepted_by_name} on ${quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString('en-GB') : 'N/A'}`
                : `Declined by ${quote.accepted_by_name || 'Client'} on ${quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString('en-GB') : 'N/A'}`
              }
            </p>
            {isAccepted && quote.signature_url && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-elec-light/50 text-xs mb-2">Signature on file</p>
                <img
                  src={quote.signature_url}
                  alt="Client signature"
                  className="max-h-16 mx-auto rounded border border-white/10"
                />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-elec-light/40 text-xs">
            Powered by ElecMate Professional Suite
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicQuoteView;
