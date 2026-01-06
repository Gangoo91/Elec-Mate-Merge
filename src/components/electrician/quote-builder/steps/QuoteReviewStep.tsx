import { Button } from "@/components/ui/button";
import { FileCheck, Download, Loader2, Package, Wrench, Zap, FileText } from "lucide-react";
import { useState } from "react";
import { Quote } from "@/types/quote";
import { useToast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { supabase } from "@/integrations/supabase/client";
import { QuoteSendDropdown } from "@/components/electrician/quote-builder/QuoteSendDropdown";

interface QuoteReviewStepProps {
  quote: Partial<Quote>;
}

export const QuoteReviewStep = ({ quote }: QuoteReviewStepProps) => {
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const effectiveCompanyProfile = companyProfile || {
        id: "default",
        user_id: "default",
        company_name: "Your Electrical Company",
        company_email: "contact@yourcompany.com",
        company_phone: "0123 456 7890",
        company_address: "123 Business Street, London",
        primary_color: "#1e40af",
        secondary_color: "#3b82f6",
        currency: "GBP",
        locale: "en-GB",
        vat_number: "GB123456789",
        payment_terms: "Payment due within 30 days",
        created_at: new Date(),
        updated_at: new Date(),
      };

      const effectiveQuote = {
        ...quote,
        quoteNumber: quote.quoteNumber || `Q${Date.now()}`,
        createdAt: quote.createdAt || new Date(),
        expiryDate: quote.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: quote.status || "draft",
        subtotal: quote.subtotal || 0,
        total: quote.total || 0,
        vatAmount: quote.vatAmount || 0,
        client: quote.client || {
          name: "Client Name",
          email: "client@example.com",
          phone: "0123 456 7890",
          address: "Client Address",
          postcode: "AB1 2CD",
        },
      };

      const { data, error } = await supabase.functions.invoke("generate-pdf-monkey", {
        body: { quote: effectiveQuote, companyProfile: effectiveCompanyProfile },
      });

      if (error) throw error;

      let downloadUrl = data.downloadUrl;
      const documentId = data.documentId;

      if (!downloadUrl && documentId) {
        const maxAttempts = 18;
        for (let i = 0; i < maxAttempts; i++) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          const { data: statusData } = await supabase.functions.invoke("generate-pdf-monkey", {
            body: { mode: "status", documentId },
          });
          if (statusData?.downloadUrl) {
            downloadUrl = statusData.downloadUrl;
            break;
          }
        }
      }

      if (downloadUrl && quote.id) {
        await supabase
          .from("quotes")
          .update({
            pdf_document_id: documentId,
            pdf_url: downloadUrl,
            pdf_generated_at: new Date().toISOString(),
            pdf_version: (quote.pdf_version || 0) + 1,
          })
          .eq("id", quote.id);

        window.open(downloadUrl, "_blank");
        toast({ title: "PDF ready", variant: "success" });
      } else if (documentId) {
        toast({ title: "PDF in progress", description: "Check back in a moment" });
      } else {
        throw new Error(data.error || "Failed to generate PDF");
      }
    } catch (error: any) {
      console.error("PDF generation error:", error);
      toast({
        title: "PDF generation failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "labour":
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case "materials":
        return <Package className="h-4 w-4 text-green-500" />;
      case "equipment":
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const categories = ["labour", "materials", "equipment", "manual"];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <FileCheck className="h-5 w-5 text-elec-yellow" />
        <h2 className="text-lg font-semibold">Review Quote</h2>
      </div>

      {/* Quote Summary Card */}
      <div className="p-5 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Quote for</p>
            <p className="font-semibold text-lg">{quote.client?.name}</p>
            <p className="text-sm text-muted-foreground">{quote.client?.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-bold text-elec-yellow">£{(quote.total || 0).toFixed(2)}</p>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>£{(quote.subtotal || 0).toFixed(2)}</span>
          </div>
          {quote.settings?.vatRegistered && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT ({quote.settings.vatRate}%)</span>
              <span>£{(quote.vatAmount || 0).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-border/50">
            <span>Total</span>
            <span className="text-elec-yellow">£{(quote.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Job Details Summary */}
      {quote.jobDetails?.title && (
        <div className="p-4 bg-elec-gray/30 rounded-lg">
          <h3 className="font-semibold mb-1">{quote.jobDetails.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{quote.jobDetails.description}</p>
          {quote.jobDetails.estimatedDuration && (
            <p className="text-xs text-muted-foreground mt-2">
              Duration: {quote.jobDetails.estimatedDuration}
            </p>
          )}
        </div>
      )}

      {/* Items Breakdown - Grouped by category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = quote.items?.filter((i) => i.category === category) || [];
          if (categoryItems.length === 0) return null;

          const categoryTotal = categoryItems.reduce((sum, i) => sum + i.totalPrice, 0);

          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium capitalize flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category} ({categoryItems.length})
                </p>
                <p className="text-sm font-semibold">£{categoryTotal.toFixed(2)}</p>
              </div>
              <div className="space-y-1 pl-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-muted-foreground">
                    <span className="truncate flex-1 mr-2">{item.description}</span>
                    <span className="shrink-0">£{item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-border/50">
        <Button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="w-full h-14 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold"
        >
          {isDownloading ? (
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <Download className="h-5 w-5 mr-2" />
          )}
          {isDownloading ? "Generating PDF..." : "Download PDF"}
        </Button>

        <QuoteSendDropdown
          quote={quote as Quote}
          onSuccess={() => toast({ title: "Quote sent", variant: "success" })}
          disabled={!quote.client?.email || !quote.id}
          className="w-full h-14"
        />
      </div>
    </div>
  );
};
