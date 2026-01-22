import { Button } from "@/components/ui/button";
import { Download, Loader2, Package, Wrench, Zap, FileText, User, Briefcase, Clock, PoundSterling, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Quote } from "@/types/quote";
import { useToast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "labour":
        return { icon: Wrench, color: "bg-elec-yellow" };
      case "materials":
        return { icon: Package, color: "bg-elec-yellow" };
      case "equipment":
        return { icon: Zap, color: "bg-elec-yellow" };
      default:
        return { icon: FileText, color: "bg-elec-yellow" };
    }
  };

  const categories = ["labour", "materials", "equipment", "manual"];

  return (
    <div className="space-y-4">
      {/* Total Summary Card */}
      <div className="rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] text-white/70 mb-1">Quote Total</p>
            <p className="text-4xl font-bold text-elec-yellow">£{(quote.total || 0).toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-elec-yellow flex items-center justify-center">
            <PoundSterling className="h-6 w-6 text-black" />
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="mt-4 pt-4 border-t border-white/[0.1] space-y-2">
          <div className="flex justify-between text-[14px]">
            <span className="text-white/60">Subtotal</span>
            <span className="text-white">£{(quote.subtotal || 0).toFixed(2)}</span>
          </div>
          {quote.settings?.vatRegistered && (
            <div className="flex justify-between text-[14px]">
              <span className="text-white/60">VAT ({quote.settings.vatRate}%)</span>
              <span className="text-white">£{(quote.vatAmount || 0).toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Client Summary */}
      <div>
        <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
          <User className="h-3.5 w-3.5" />
          Client
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-white">{quote.client?.name}</p>
              <p className="text-[13px] text-white/70">{quote.client?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details Summary */}
      {quote.jobDetails?.title && (
        <div>
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5" />
            Job Details
          </p>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
            <div className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-white">{quote.jobDetails.title}</p>
                  <p className="text-[13px] text-white/70 line-clamp-2 mt-0.5">{quote.jobDetails.description}</p>
                </div>
              </div>
            </div>
            {quote.jobDetails.estimatedDuration && (
              <div className="flex items-center gap-3 p-3.5">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-white/40">Duration</p>
                  <p className="text-[15px] font-medium text-white">{quote.jobDetails.estimatedDuration}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items Breakdown - Grouped by category */}
      <div>
        <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
          <FileText className="h-3.5 w-3.5" />
          Items Breakdown
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {categories.map((category) => {
            const categoryItems = quote.items?.filter((i) => i.category === category) || [];
            if (categoryItems.length === 0) return null;

            const categoryTotal = categoryItems.reduce((sum, i) => sum + i.totalPrice, 0);
            const { icon: Icon, color } = getCategoryConfig(category);

            return (
              <div key={category} className="p-3.5">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-white capitalize">{category}</p>
                    <p className="text-[12px] text-white/70">{categoryItems.length} item{categoryItems.length !== 1 && 's'}</p>
                  </div>
                  <p className="text-[15px] font-bold text-elec-yellow">£{categoryTotal.toFixed(2)}</p>
                </div>
                {/* Category Items */}
                <div className="ml-[52px] space-y-2">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="text-[13px] text-white/70 truncate flex-1 mr-3">{item.description}</span>
                      <span className="text-[13px] text-white/90 shrink-0">£{item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview PDF Button */}
      <button
        type="button"
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.05] transition-colors disabled:opacity-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center">
            {isDownloading ? (
              <Loader2 className="h-5 w-5 text-black animate-spin" />
            ) : (
              <Download className="h-5 w-5 text-black" />
            )}
          </div>
          <div className="text-left">
            <p className="text-[14px] font-medium text-white">
              {isDownloading ? "Generating PDF..." : "Preview & Download PDF"}
            </p>
            <p className="text-[12px] text-white/70">Generate a professional PDF document</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-white/30" />
      </button>
    </div>
  );
};
