import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, CheckCircle, X, FileSignature } from "lucide-react";
import { Quote, QuoteItem } from "@/types/quote";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SignaturePad from "@/components/forms/SignaturePad";

const PublicQuoteView = () => {
  const { token } = useParams<{ token: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [signatureData, setSignatureData] = useState<string>("");
  const signaturePadRef = useRef<any>(null);

  useEffect(() => {
    if (token) {
      loadQuote();
    }
  }, [token]);

  const loadQuote = async () => {
    if (!token) return;

    try {
      setLoading(true);

      // First, get the quote view to validate the token
      const { data: quoteView, error: viewError } = await supabase
        .from("quote_views")
        .select("quote_id")
        .eq("public_token", token)
        .eq("is_active", true)
        .single();

      if (viewError || !quoteView) {
        throw new Error("Quote not found or expired");
      }

      // Get the quote data
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .select("*")
        .eq("id", quoteView.quote_id)
        .single();

      if (quoteError) throw quoteError;

      // Convert database format back to Quote type
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
      setClientName(convertedQuote.client.name);
      setClientEmail(convertedQuote.client.email);

      // Update view count
      await supabase
        .from("quote_views")
        .update({ 
          view_count: ((quoteView as any).view_count || 0) + 1,
          last_viewed_at: new Date().toISOString()
        })
        .eq("public_token", token);

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
      // Upload signature to storage
      const signatureBlob = dataURLtoBlob(signatureData);
      const signatureFileName = `signature-${quote.id}-${Date.now()}.png`;
      
      const { data: signatureUpload, error: uploadError } = await supabase.storage
        .from("company-branding")
        .upload(signatureFileName, signatureBlob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("company-branding")
        .getPublicUrl(signatureFileName);

      // Update quote with acceptance
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
          signature_url: publicUrl,
          status: "completed"
        })
        .eq("id", quote.id);

      if (updateError) throw updateError;

      toast({
        title: "Quote Accepted",
        description: "Thank you! Your acceptance has been recorded.",
        variant: "success"
      });

      // Reload to show accepted state
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

    setAccepting(true);
    try {
      const { error } = await supabase
        .from("quotes")
        .update({
          acceptance_status: "rejected",
          accepted_at: new Date().toISOString(),
          accepted_by_name: clientName,
          accepted_by_email: clientEmail,
          accepted_ip: await getUserIP(),
          accepted_user_agent: navigator.userAgent
        })
        .eq("id", quote.id);

      if (error) throw error;

      toast({
        title: "Quote Rejected",
        description: "Your response has been recorded.",
        variant: "success"
      });

      loadQuote();

    } catch (error) {
      console.error("Error rejecting quote:", error);
      toast({
        title: "Error",
        description: "Failed to reject quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setAccepting(false);
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

    // Sort each category by total price (highest first)
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => b.totalPrice - a.totalPrice);
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center">
        <div className="text-center text-elec-light">
          <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading quote...</p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center">
        <div className="text-center text-elec-light">
          <FileText className="h-16 w-16 text-elec-yellow mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Quote Not Found</h1>
          <p>This quote may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  const isAccepted = quote.acceptance_status === "accepted";
  const isRejected = quote.acceptance_status === "rejected";
  const isPending = !isAccepted && !isRejected;
  const groupedItems = groupItemsByCategory(quote.items);

  return (
    <div className="min-h-screen bg-elec-navy">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-elec-gray/95 backdrop-blur-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-elec-blue to-elec-blue/80 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Quote #{quote.quoteNumber}</h1>
                <p className="text-blue-100">Valid until {quote.expiryDate.toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                {isAccepted && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />Accepted
                  </Badge>
                )}
                {isRejected && (
                  <Badge variant="destructive">
                    <X className="h-4 w-4 mr-1" />Rejected
                  </Badge>
                )}
                {isPending && (
                  <Badge variant="outline" className="border-blue-200 text-blue-100">
                    Awaiting Response
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Job Details */}
            {quote.jobDetails && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Project:</strong> {quote.jobDetails.title}
                    </div>
                    {quote.jobDetails.location && (
                      <div>
                        <strong>Location:</strong> {quote.jobDetails.location}
                      </div>
                    )}
                    {quote.jobDetails.estimatedDuration && (
                      <div>
                        <strong>Duration:</strong> {quote.jobDetails.estimatedDuration}
                      </div>
                    )}
                    {quote.jobDetails.workStartDate && (
                      <div>
                        <strong>Start Date:</strong> {quote.jobDetails.workStartDate}
                      </div>
                    )}
                  </div>
                  {quote.jobDetails.description && (
                    <div className="mt-4">
                      <strong>Description:</strong>
                      <p className="text-muted-foreground mt-1">{quote.jobDetails.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quote Items by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Quote Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-medium text-base mb-3 capitalize text-elec-yellow">
                        {category} ({items.length} item{items.length !== 1 ? 's' : ''})
                      </h4>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-start p-3 bg-elec-gray/50 rounded-lg">
                            <div className="flex-1">
                              <h5 className="font-medium">{item.description}</h5>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(item.totalPrice)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(quote.subtotal)}</span>
                  </div>
                  {quote.overhead > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Overhead ({quote.settings.overheadPercentage}%):</span>
                      <span>{formatCurrency(quote.overhead)}</span>
                    </div>
                  )}
                  {quote.profit > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Profit ({quote.settings.profitMargin}%):</span>
                      <span>{formatCurrency(quote.profit)}</span>
                    </div>
                  )}
                  {quote.settings.vatRegistered && quote.vatAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>VAT ({quote.settings.vatRate}%):</span>
                      <span>{formatCurrency(quote.vatAmount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceptance Section */}
            {isPending && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileSignature className="h-5 w-5 mr-2" />
                    Accept or Reject Quote
                  </CardTitle>
                  <CardDescription>
                    Please review the quote details and provide your response
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Full Name</Label>
                      <Input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email Address</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Digital Signature</Label>
                    <div className="mt-2">
                      <SignaturePad
                        ref={signaturePadRef}
                        onSignatureChange={setSignatureData}
                        className="w-full h-32 border border-input rounded-md"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Please sign above to accept this quote
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleAcceptQuote}
                      disabled={accepting || !clientName || !clientEmail || !signatureData}
                      className="flex-1 bg-elec-green hover:bg-elec-green/90"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Quote
                    </Button>
                    <Button
                      onClick={handleRejectQuote}
                      disabled={accepting}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Accepted/Rejected Status */}
            {(isAccepted || isRejected) && (
              <Card className={isAccepted ? "border-green-500" : "border-red-500"}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    {isAccepted ? (
                      <>
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-green-700 mb-2">Quote Accepted</h3>
                        <p className="text-sm text-muted-foreground">
                          Accepted by {quote.accepted_by_name} on {quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </>
                    ) : (
                      <>
                        <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-red-700 mb-2">Quote Rejected</h3>
                        <p className="text-sm text-muted-foreground">
                          Rejected by {quote.accepted_by_name} on {quote.accepted_at ? new Date(quote.accepted_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicQuoteView;