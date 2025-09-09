import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, FileText, Calculator, Package, Wrench, Zap, Download, Mail } from "lucide-react";
import { Quote } from "@/types/quote";
import { generateQuotePDF } from "../QuotePDFGenerator";
import { useToast } from "@/hooks/use-toast";

interface QuoteReviewStepProps {
  quote: Partial<Quote>;
}

export const QuoteReviewStep = ({ quote }: QuoteReviewStepProps) => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    generateQuotePDF(quote);
    toast({
      title: "PDF Generated",
      description: "Quote PDF has been downloaded successfully.",
    });
  };

  const handleEmailQuote = () => {
    const subject = `Electrical Quote - ${quote.quoteNumber}`;
    const body = `Dear ${quote.client?.name},

Please find attached your electrical quote for the work discussed.

Quote Number: ${quote.quoteNumber}
Total Amount: £${(quote.total || 0).toFixed(2)}

This quote is valid for 30 days from the date of issue.

Best regards,
Your Electrician`;

    const mailtoLink = `mailto:${quote.client?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    toast({
      title: "Email Client",
      description: "Opening email client to send quote.",
    });
  };
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-4 w-4" />;
      case 'materials': return <Package className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quote Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Client Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-semibold">{quote.client?.name}</p>
              <p className="text-sm text-muted-foreground">{quote.client?.email}</p>
              <p className="text-sm text-muted-foreground">{quote.client?.phone}</p>
            </div>
            <div>
              <p className="text-sm">{quote.client?.address}</p>
              <p className="text-sm">{quote.client?.postcode}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quote Information */}
        <Card className="bg-elec-gray/50 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Quote Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Quote Number:</span>
              <span className="font-medium">{quote.quoteNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Date:</span>
              <span className="font-medium">{quote.createdAt?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="font-medium capitalize">{quote.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Items:</span>
              <span className="font-medium">{quote.items?.length || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Items - Split by Category */}
      <div className="space-y-4">
        {/* Labour Items */}
        {quote.items?.filter(item => item.category === 'labour').sort((a, b) => b.totalPrice - a.totalPrice).length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Labour ({quote.items?.filter(item => item.category === 'labour').length})
                </div>
                <span className="text-primary font-semibold">
                  £{quote.items?.filter(item => item.category === 'labour').reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {quote.items?.filter(item => item.category === 'labour').sort((a, b) => b.totalPrice - a.totalPrice).map((item) => (
                  <div key={item.id} className="bg-background border border-border rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × £{item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">£{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Materials Items */}
        {quote.items?.filter(item => item.category === 'materials').sort((a, b) => b.totalPrice - a.totalPrice).length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Materials ({quote.items?.filter(item => item.category === 'materials').length})
                </div>
                <span className="text-primary font-semibold">
                  £{quote.items?.filter(item => item.category === 'materials').reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {quote.items?.filter(item => item.category === 'materials').sort((a, b) => b.totalPrice - a.totalPrice).map((item) => (
                  <div key={item.id} className="bg-background border border-border rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × £{item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">£{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Equipment Items */}
        {quote.items?.filter(item => item.category === 'equipment').sort((a, b) => b.totalPrice - a.totalPrice).length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Equipment ({quote.items?.filter(item => item.category === 'equipment').length})
                </div>
                <span className="text-primary font-semibold">
                  £{quote.items?.filter(item => item.category === 'equipment').reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {quote.items?.filter(item => item.category === 'equipment').sort((a, b) => b.totalPrice - a.totalPrice).map((item) => (
                  <div key={item.id} className="bg-background border border-border rounded-lg p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × £{item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">£{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quote Totals */}
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Quote Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>£{(quote.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Overhead ({quote.settings?.overheadPercentage}%)</span>
              <span>£{(quote.overhead || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Profit ({quote.settings?.profitMargin}%)</span>
              <span>£{(quote.profit || 0).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span>Net Amount</span>
              <span>£{((quote.subtotal || 0) + (quote.overhead || 0) + (quote.profit || 0)).toFixed(2)}</span>
            </div>
            {quote.settings?.vatRegistered && (
              <div className="flex justify-between">
                <span>VAT ({quote.settings.vatRate}%)</span>
                <span>£{(quote.vatAmount || 0).toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-elec-yellow">£{(quote.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quote Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleDownloadPDF} className="flex items-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        
        <Button onClick={handleEmailQuote} variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email to Client
        </Button>
      </div>
    </div>
  );
};