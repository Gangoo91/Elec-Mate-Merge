import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  FileText, 
  Send, 
  Copy, 
  Trash2, 
  Check, 
  X, 
  Phone, 
  Mail,
  Calendar,
  Clock,
  Loader2,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Signature,
  Download,
  Package
} from "lucide-react";
import { useSendQuote, useUpdateQuote, useDeleteQuote } from "@/hooks/useFinance";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Quote } from "@/services/financeService";
import { format } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ViewQuoteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
  onConvertToInvoice?: (quote: Quote) => void;
}

interface QuoteAcceptance {
  id: string;
  status: string;
  client_name: string;
  client_notes: string | null;
  signature_data: string | null;
  responded_at: string | null;
  access_token: string;
  expires_at: string;
}

export function ViewQuoteSheet({ open, onOpenChange, quote, onConvertToInvoice }: ViewQuoteSheetProps) {
  const sendQuoteMutation = useSendQuote();
  const updateQuoteMutation = useUpdateQuote();
  const deleteQuoteMutation = useDeleteQuote();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [acceptLink, setAcceptLink] = useState<string | null>(null);
  const [acceptance, setAcceptance] = useState<QuoteAcceptance | null>(null);
  const [loadingAcceptance, setLoadingAcceptance] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Pre-fill email from quote
  useEffect(() => {
    if (quote) {
      setRecipientEmail((quote as any).client_email || "");
    }
  }, [quote]);

  // Load acceptance data when quote opens
  useEffect(() => {
    if (open && quote) {
      loadAcceptanceData();
    }
  }, [open, quote?.id]);

  const loadAcceptanceData = async () => {
    if (!quote) return;
    
    setLoadingAcceptance(true);
    try {
      const { data, error } = await supabase
        .from("quote_acceptances")
        .select("*")
        .eq("quote_id", quote.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setAcceptance(data);
      
      if (data?.access_token) {
        setAcceptLink(`${window.location.origin}/quote/${data.access_token}`);
      }
    } catch (err) {
      console.error("Error loading acceptance:", err);
    } finally {
      setLoadingAcceptance(false);
    }
  };

  if (!quote) return null;

  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];
  const subtotal = lineItems.reduce((sum: number, item: any) => sum + (item.total || 0), 0);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "Draft": "bg-muted text-muted-foreground",
      "Sent": "bg-warning/20 text-warning",
      "Approved": "bg-success/20 text-success",
      "Client Accepted": "bg-success/20 text-success",
      "Rejected": "bg-destructive/20 text-destructive",
      "Client Declined": "bg-destructive/20 text-destructive"
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  const handleApprove = () => {
    updateQuoteMutation.mutate({ id: quote.id, updates: { status: "Approved" } });
  };

  const handleReject = () => {
    updateQuoteMutation.mutate({ id: quote.id, updates: { status: "Rejected" } });
  };

  const handleGenerateAcceptLink = async () => {
    setIsGeneratingLink(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-quote-accept-link", {
        body: {
          quoteId: quote.id,
          clientEmail: (quote as any).client_email,
          clientName: quote.client,
          expiryDays: 30,
          baseUrl: window.location.origin,
        },
      });

      if (error) throw error;

      if (data.portalUrl) {
        setAcceptLink(data.portalUrl);
        setShowLinkDialog(true);
        toast.success("Accept link generated");
        loadAcceptanceData();
      }
    } catch (err: any) {
      console.error("Error generating link:", err);
      toast.error(err.message || "Failed to generate link");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopyLink = () => {
    if (acceptLink) {
      navigator.clipboard.writeText(acceptLink);
      toast.success("Link copied to clipboard");
    }
  };

  const handleSendEmail = async (email?: string) => {
    const targetEmail = email || recipientEmail || (quote as any).client_email;
    
    if (!targetEmail) {
      setShowEmailDialog(true);
      return;
    }

    setIsSending(true);
    
    try {
      // First generate the accept link if not already generated
      let linkToInclude = acceptLink;
      if (!linkToInclude) {
        const { data: linkData, error: linkError } = await supabase.functions.invoke("generate-quote-accept-link", {
          body: {
            quoteId: quote.id,
            clientEmail: targetEmail,
            clientName: quote.client,
            expiryDays: 30,
            baseUrl: window.location.origin,
          },
        });

        if (linkError) throw linkError;
        linkToInclude = linkData.portalUrl;
        setAcceptLink(linkToInclude);
      }

      const { data, error } = await supabase.functions.invoke('send-finance-document', {
        body: {
          type: 'quote',
          documentId: quote.id,
          recipientEmail: targetEmail,
          recipientName: quote.client,
          acceptLink: linkToInclude,
        }
      });

      if (error) throw error;

      // Update quote with client email if not already set
      if (!(quote as any).client_email && targetEmail) {
        await supabase.from('quotes').update({ client_email: targetEmail }).eq('id', quote.id);
      }

      toast.success(`Quote sent to ${targetEmail}`);
      setShowEmailDialog(false);
      setRecipientEmail("");
      
      // Refresh the quote mutation
      sendQuoteMutation.mutate(quote.id);
      loadAcceptanceData();
    } catch (error: any) {
      console.error('Error sending quote:', error);
      toast.error(error.message || "Failed to send quote");
    } finally {
      setIsSending(false);
    }
  };

  const handleSend = () => {
    const clientEmail = (quote as any).client_email;
    if (clientEmail) {
      handleSendEmail(clientEmail);
    } else {
      setShowEmailDialog(true);
    }
  };

  const handleConvert = () => {
    if (onConvertToInvoice) {
      onConvertToInvoice(quote);
      onOpenChange(false);
    }
  };

  const isClientAccepted = quote.status === "Client Accepted";
  const isClientDeclined = quote.status === "Client Declined";

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-lg">{quote.quote_number}</SheetTitle>
                  <p className="text-sm text-muted-foreground">{quote.client}</p>
                </div>
              </div>
              {getStatusBadge(quote.status)}
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {/* Client Acceptance Banner */}
              {isClientAccepted && acceptance && (
                <Card className="bg-success/10 border-success/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="font-semibold text-success">Client Accepted</p>
                          <p className="text-sm text-muted-foreground">
                            {acceptance.client_name} accepted on {acceptance.responded_at && format(new Date(acceptance.responded_at), "d MMM yyyy 'at' HH:mm")}
                          </p>
                        </div>
                        {acceptance.client_notes && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Notes: </span>
                            {acceptance.client_notes}
                          </div>
                        )}
                        {acceptance.signature_data && (
                          <div className="space-y-1">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Signature className="h-3 w-3" /> Client Signature
                            </span>
                            <img 
                              src={acceptance.signature_data} 
                              alt="Client signature" 
                              className="h-12 bg-background rounded border border-border p-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {isClientDeclined && acceptance && (
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-destructive">Client Declined</p>
                        <p className="text-sm text-muted-foreground">
                          {acceptance.client_name} declined on {acceptance.responded_at && format(new Date(acceptance.responded_at), "d MMM yyyy 'at' HH:mm")}
                        </p>
                        {acceptance.client_notes && (
                          <div className="text-sm mt-2">
                            <span className="text-muted-foreground">Reason: </span>
                            {acceptance.client_notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status Timeline */}
              <div className="flex items-center justify-between py-2">
                {["Draft", "Sent", isClientAccepted ? "Accepted" : "Approved"].map((step, idx) => {
                  const isComplete = 
                    (step === "Draft") ||
                    (step === "Sent" && ["Sent", "Approved", "Client Accepted", "Client Declined"].includes(quote.status)) ||
                    ((step === "Approved" || step === "Accepted") && (quote.status === "Approved" || isClientAccepted));
                  const isCurrent = step === quote.status || (step === "Accepted" && isClientAccepted);
                  
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                        ${isComplete ? 'bg-success text-success-foreground' : 
                          isCurrent ? 'bg-elec-yellow text-elec-yellow-foreground' : 'bg-muted text-muted-foreground'}`}
                      >
                        {isComplete ? <Check className="h-4 w-4" /> : idx + 1}
                      </div>
                      {idx < 2 && (
                        <div className={`w-12 h-0.5 ${isComplete ? 'bg-success' : 'bg-muted'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Accept Link Section (for Sent quotes) */}
              {quote.status === "Sent" && (
                <Card className="bg-elec-yellow/5 border-elec-yellow/20">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium text-sm">Client Accept Link</span>
                    </div>
                    {acceptLink ? (
                      <div className="flex gap-2">
                        <Input 
                          value={acceptLink} 
                          readOnly 
                          className="text-xs h-9 bg-background"
                        />
                        <Button size="sm" variant="outline" onClick={handleCopyLink} className="h-9 px-3">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => window.open(acceptLink, "_blank")}
                          className="h-9 px-3"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleGenerateAcceptLink}
                        disabled={isGeneratingLink}
                        className="w-full"
                      >
                        {isGeneratingLink ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <LinkIcon className="h-4 w-4 mr-2" />
                        )}
                        Generate Accept Link
                      </Button>
                    )}
                    {acceptance && acceptance.status === "pending" && (
                      <p className="text-xs text-muted-foreground">
                        Awaiting client response. Expires {format(new Date(acceptance.expires_at), "d MMM yyyy")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Details */}
              <Card className="bg-elec-gray">
                <CardContent className="p-4 space-y-3">
                  {/* Job Title Banner */}
                  {(quote as any).job_title && (
                    <div className="bg-elec-yellow/10 rounded-lg p-3 -m-1 mb-2">
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">Project</span>
                      <p className="font-semibold text-elec-yellow text-lg">{(quote as any).job_title}</p>
                    </div>
                  )}
                  
                  {/* Client Address */}
                  {(quote as any).client_address && (
                    <div>
                      <span className="text-sm text-muted-foreground">Client Address</span>
                      <p className="font-medium whitespace-pre-line">{(quote as any).client_address}</p>
                    </div>
                  )}
                  
                  {quote.description && (
                    <div>
                      <span className="text-sm text-muted-foreground">Description</span>
                      <p className="font-medium">{quote.description}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="text-muted-foreground">Created</span>
                        <p className="font-medium">{new Date(quote.created_at).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                    {quote.sent_date && (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Sent</span>
                          <p className="font-medium">{new Date(quote.sent_date).toLocaleDateString('en-GB')}</p>
                        </div>
                      </div>
                    )}
                    {quote.valid_until && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="text-muted-foreground">Valid Until</span>
                          <p className="font-medium">{new Date(quote.valid_until).toLocaleDateString('en-GB')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Labour Items */}
              {lineItems.filter((item: any) => item.type === 'labour').length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Labour
                  </h3>
                  <Card className="bg-elec-gray">
                    <CardContent className="p-0">
                      {lineItems.filter((item: any) => item.type === 'labour').map((item: any, idx: number) => (
                        <div 
                          key={item.id || idx} 
                          className="flex justify-between items-center p-3 border-b border-border last:border-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{item.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} hrs × £{Number(item.unitPrice || 0).toFixed(2)}/hr
                            </p>
                          </div>
                          <span className="font-bold shrink-0">£{Number(item.total || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Material Items */}
              {lineItems.filter((item: any) => item.type !== 'labour').length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Package className="h-4 w-4" /> Materials
                  </h3>
                  <Card className="bg-elec-gray">
                    <CardContent className="p-0">
                      {lineItems.filter((item: any) => item.type !== 'labour').map((item: any, idx: number) => (
                        <div 
                          key={item.id || idx} 
                          className="flex justify-between items-center p-3 border-b border-border last:border-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{item.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.quantity} {item.unit} × £{Number(item.unitPrice || 0).toFixed(2)}
                            </p>
                          </div>
                          <span className="font-bold shrink-0">£{Number(item.total || 0).toFixed(2)}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Totals */}
              <Card className="bg-elec-yellow/10 border-elec-yellow/20">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">VAT @ 20%</span>
                    <span className="font-medium">£{(subtotal * 0.2).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total inc. VAT</span>
                    <span className="text-2xl font-bold text-elec-yellow">
                      £{Number(quote.value).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {quote.notes && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Notes</h3>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quote.notes}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Quick Contact & PDF */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    const phone = (quote as any).client_phone;
                    if (phone) {
                      window.location.href = `tel:${phone}`;
                    } else {
                      toast.info("No phone number on file for this client");
                    }
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowEmailDialog(true)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={isGeneratingPdf}
                  onClick={async () => {
                    setIsGeneratingPdf(true);
                    try {
                      const { data, error } = await supabase.functions.invoke('generate-quote-pdf', {
                        body: { quoteId: quote.id }
                      });
                      if (error) throw error;
                      
                      // Open HTML in new window for viewing (no auto-print)
                      const viewWindow = window.open('', '_blank');
                      if (viewWindow) {
                        viewWindow.document.write(data.html);
                        viewWindow.document.close();
                        viewWindow.focus();
                      }
                      toast.success("Quote opened - use the button to print/save as PDF");
                    } catch (err: any) {
                      toast.error(err.message || "Failed to generate quote");
                    } finally {
                      setIsGeneratingPdf(false);
                    }
                  }}
                >
                  {isGeneratingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                  Download PDF
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <SheetFooter className="px-4 py-3 border-t border-border pb-safe">
            <div className="flex flex-col gap-2 w-full">
              {quote.status === "Draft" && (
                <Button onClick={handleSend} disabled={isSending}>
                  {isSending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                  Send Quote to Client
                </Button>
              )}
              {quote.status === "Sent" && (
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={handleReject}
                    disabled={updateQuoteMutation.isPending}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleApprove}
                    disabled={updateQuoteMutation.isPending}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              )}
              {(quote.status === "Approved" || isClientAccepted) && (
                <Button onClick={handleConvert} className="bg-success hover:bg-success/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Convert to Invoice
                </Button>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Quote?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete quote {quote.quote_number} for {quote.client}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={() => {
                          deleteQuoteMutation.mutate(quote.id, {
                            onSuccess: () => onOpenChange(false)
                          });
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>

    {/* Email Dialog */}
    <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Quote to Client</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Client Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="client@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            This will send quote {quote.quote_number} for £{Number(quote.value).toLocaleString()} to the client with an accept/decline link.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowEmailDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => handleSendEmail()} 
            disabled={!recipientEmail || isSending}
          >
            {isSending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Send Quote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Link Dialog */}
    <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quote Accept Link Generated</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Share this link with your client so they can review and accept the quote online.
          </p>
          <div className="flex gap-2">
            <Input 
              value={acceptLink || ""} 
              readOnly 
              className="text-sm"
            />
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowLinkDialog(false)}>Close</Button>
          <Button onClick={() => window.open(acceptLink || "", "_blank")}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Portal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}