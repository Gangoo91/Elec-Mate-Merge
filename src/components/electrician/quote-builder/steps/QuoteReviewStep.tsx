import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, FileText, Calculator, Package, Wrench, Zap, Download, Mail, Briefcase, Loader2 } from "lucide-react";
import { useState } from "react";
import { Quote } from "@/types/quote";
import { generateProfessionalQuotePDF } from "@/utils/quote-pdf-professional";
import { generateAIEnhancedQuotePDF } from "@/utils/ai-enhanced-quote-pdf";
import { useToast } from "@/hooks/use-toast";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";

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
      // Create a default company profile if none exists
      const effectiveCompanyProfile = companyProfile || {
        id: 'default',
        user_id: 'default',
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
        updated_at: new Date()
      };

      // Ensure quote has basic required data
      const effectiveQuote = {
        ...quote,
        quoteNumber: quote.quoteNumber || `Q${Date.now()}`,
        createdAt: quote.createdAt || new Date(),
        expiryDate: quote.expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: quote.status || 'draft',
        subtotal: quote.subtotal || 0,
        total: quote.total || 0,
        vatAmount: quote.vatAmount || 0,
        client: quote.client || {
          name: "Client Name",
          email: "client@example.com",
          phone: "0123 456 7890",
          address: "Client Address",
          postcode: "AB1 2CD"
        }
      };

      let success = false;
      
      if (effectiveQuote.settings?.aiEnhancedPDF) {
        toast({
          title: "Generating AI-Enhanced PDF",
          description: "Please wait while we create your professional quote...",
        });
        
        success = await generateAIEnhancedQuotePDF({
          quote: effectiveQuote,
          companyProfile: effectiveCompanyProfile,
          aiEnhancements: {
            enhancedDescriptions: true,
            executiveSummary: true,
            smartTerms: true,
            recommendations: true
          }
        });
      } else {
        success = generateProfessionalQuotePDF({
          quote: effectiveQuote,
          companyProfile: effectiveCompanyProfile
        });
      }

      if (success) {
        toast({
          title: "Success",
          description: effectiveQuote.settings?.aiEnhancedPDF ? 
            "AI-Enhanced Quote PDF downloaded successfully" : 
            "Quote PDF downloaded successfully",
        });
      } else {
        toast({
          title: "Error", 
          description: "Failed to generate PDF",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
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
        <Card className="bg-card/50 border-border/20">
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
        <Card className="bg-card/50 border-border/20">
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

      {/* Job Details */}
      {quote.jobDetails && (
        <Card className="bg-card/50 border-border/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5" />
              Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-lg">{quote.jobDetails.title}</h4>
              <p className="text-muted-foreground mt-1">{quote.jobDetails.description}</p>
            </div>
            {(quote.jobDetails.location || quote.jobDetails.estimatedDuration || quote.jobDetails.workStartDate) && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t">
                {quote.jobDetails.location && (
                  <div>
                    <span className="text-sm font-medium">Location:</span>
                    <p className="text-sm text-muted-foreground">{quote.jobDetails.location}</p>
                  </div>
                )}
                {quote.jobDetails.estimatedDuration && (
                  <div>
                    <span className="text-sm font-medium">Duration:</span>
                    <p className="text-sm text-muted-foreground">{quote.jobDetails.estimatedDuration}</p>
                  </div>
                )}
                {quote.jobDetails.workStartDate && (
                  <div>
                    <span className="text-sm font-medium">Start Date:</span>
                    <p className="text-sm text-muted-foreground">
                      {new Date(quote.jobDetails.workStartDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}
            {quote.jobDetails.specialRequirements && (
              <div className="pt-2 border-t">
                <span className="text-sm font-medium">Special Requirements:</span>
                <p className="text-sm text-muted-foreground mt-1">{quote.jobDetails.specialRequirements}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
          <Card className="bg-card border-green-200 dark:border-green-800">{/* Updated border color for materials */}
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
                  <div key={item.id} className="bg-background border border-green-200 dark:border-green-800 rounded-lg p-3">{/* Updated border color for individual material items */}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button 
          onClick={handleDownloadPDF} 
          disabled={isDownloading}
          className="flex items-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isDownloading ? "Generating..." : "Download PDF"}
        </Button>
        
        <Button onClick={handleEmailQuote} variant="outline" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email to Client
        </Button>
        
        <Button 
          onClick={() => {
            toast({
              title: "Amendment Feature",
              description: "Amendment functionality coming soon - edit items above to modify quote.",
              variant: "default"
            });
          }} 
          variant="outline" 
          className="flex items-center gap-2 border-elec-blue text-elec-blue hover:bg-elec-blue/10"
        >
          <FileText className="h-4 w-4" />
          Amend Quote
        </Button>
      </div>
    </div>
  );
};