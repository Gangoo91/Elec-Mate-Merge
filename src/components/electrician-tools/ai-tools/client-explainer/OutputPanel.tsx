import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Mail, MessageSquare, FileText, Printer, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface OutputPanelProps {
  content: string;
  settings: {
    tone: string;
    readingLevel: string;
    clientType: string;
    includeAnalogy: boolean;
    emphasizeSafety: boolean;
    includeCostInfo: boolean;
  };
}

const OutputPanel = ({ content, settings }: OutputPanelProps) => {
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Process content for better mobile rendering
  const processContentForDisplay = (text: string) => {
    if (!text) return text;
    
    // Clean and structure the text properly
    let processedText = text
      // Remove extra whitespace and normalize line breaks
      .replace(/\s+/g, ' ')
      .trim();

    // Split into sections and process each
    const sections = processedText.split(/(?=\n\n|\. [A-Z])/);
    
    return sections.map(section => {
      let formattedSection = section.trim();
      
      // Format headings (lines ending with colon)
      formattedSection = formattedSection.replace(/^(.*?):\s*/gm, '<h3 class="text-lg font-semibold text-foreground mb-3 mt-6 first:mt-0">$1:</h3>');
      
      // Format bold text
      formattedSection = formattedSection.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
      
      // Format italic text
      formattedSection = formattedSection.replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>');
      
      // Highlight BS 7671 references
      formattedSection = formattedSection.replace(/BS 7671/g, '<span class="text-elec-yellow font-medium bg-elec-yellow/10 px-1 py-0.5 rounded">BS 7671</span>');
      
      // Highlight regulation numbers
      formattedSection = formattedSection.replace(/(\d{3}\.\d+\.\d+)/g, '<span class="text-blue-400 font-mono text-sm bg-blue-400/10 px-1 py-0.5 rounded">$1</span>');
      
      // Highlight classification codes
      formattedSection = formattedSection.replace(/(C[123]|FI)/g, '<span class="px-2 py-1 rounded-md text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">$1</span>');
      
      // Convert sentences to bullet points for better readability
      if (!formattedSection.includes('<h3>') && formattedSection.length > 50) {
        const sentences = formattedSection.split(/\. (?=[A-Z])/);
        if (sentences.length > 1) {
          formattedSection = '<ul class="list-disc list-inside space-y-2 mb-4">' + 
            sentences.map(sentence => {
              const cleanSentence = sentence.trim();
              if (cleanSentence && !cleanSentence.endsWith('.')) {
                return `<li class="text-foreground leading-relaxed">${cleanSentence}.</li>`;
              }
              return `<li class="text-foreground leading-relaxed">${cleanSentence}</li>`;
            }).join('') + '</ul>';
        } else {
          formattedSection = `<p class="mb-4 leading-relaxed text-foreground">${formattedSection}</p>`;
        }
      } else if (!formattedSection.includes('<h3>')) {
        formattedSection = `<p class="mb-4 leading-relaxed text-foreground">${formattedSection}</p>`;
      }
      
      return formattedSection;
    }).join('');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied",
        description: "Explanation copied to clipboard",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'client-explanation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(255, 193, 7); // elec-yellow
      pdf.text('Client Explanation', 20, 30);
      
      // Settings info
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Tone: ${settings.tone} | Reading Level: ${settings.readingLevel} | Client: ${settings.clientType}`, 20, 45);
      
      // Content
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const lines = pdf.splitTextToSize(content, 170);
      pdf.text(lines, 20, 60);
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Generated by AI Client Explainer Tool', 20, 280);
      pdf.text(new Date().toLocaleDateString(), 170, 280);
      
      pdf.save('client-explanation.pdf');
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailTemplate = () => {
    const subject = encodeURIComponent("Electrical Work Explanation");
    const body = encodeURIComponent(`Dear Client,\n\nPlease find below the explanation of the electrical work findings:\n\n${content}\n\nBest regards,\nYour Electrician`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleSMSTemplate = () => {
    const smsContent = content.length > 160 ? content.substring(0, 157) + "..." : content;
    const smsBody = encodeURIComponent(`Hi, regarding your electrical work: ${smsContent}`);
    window.open(`sms:?body=${smsBody}`);
  };

  const formatForEmail = (content: string) => {
    return `Dear Client,

Please find below the explanation of our electrical findings:

${content}

If you have any questions about this explanation, please don't hesitate to contact me.

Best regards,
Your Electrician`;
  };

  const formatForSMS = (content: string) => {
    // SMS version - much shorter
    const shortContent = content.split('.')[0] + '.';
    return `Hi! Quick update on your electrical work: ${shortContent} Call me for more details.`;
  };

  const formatForQuote = (content: string) => {
    return `ELECTRICAL WORK EXPLANATION

${content}

This explanation accompanies our quotation and outlines the work required to address the findings detailed above.

Next Steps:
1. Review this explanation
2. Contact us with any questions
3. Approve the quotation to proceed

Thank you for choosing our electrical services.`;
  };

  return (
    <Card className="mobile-card border-border/50 bg-card/50">
      <CardHeader className="mobile-padding pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="mobile-heading text-foreground">Client Explanation</CardTitle>
          </div>
          {content && (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="mobile-button-secondary flex-1 sm:flex-none touch-target border-border/50 hover:bg-card text-foreground"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="mobile-button-secondary flex-1 sm:flex-none touch-target border-border/50 hover:bg-card text-foreground"
              >
                <Download className="h-4 w-4 mr-1" />
                {isGeneratingPDF ? "Creating..." : "PDF"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="mobile-padding space-y-4">
        {content ? (
          <>
            {/* Output formats */}
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="mobile-grid-responsive grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="standard" className="mobile-tap-highlight touch-target text-xs sm:text-sm">
                  Explanation
                </TabsTrigger>
                <TabsTrigger value="email" className="mobile-tap-highlight touch-target text-xs sm:text-sm">
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms" className="mobile-tap-highlight touch-target text-xs sm:text-sm">
                  Text/SMS
                </TabsTrigger>
                <TabsTrigger value="quote" className="mobile-tap-highlight touch-target text-xs sm:text-sm">
                  Quote
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="standard" className="mt-4">
                <div className="mobile-card bg-muted/30 border border-border/50 rounded-lg p-6">
                  <div 
                    className="text-left max-w-none text-foreground"
                    style={{ 
                      fontSize: '15px',
                      lineHeight: '1.7',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: processContentForDisplay(content)
                    }}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="mt-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h4 className="mobile-small-text font-medium text-foreground">Email Template</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEmailTemplate}
                      className="mobile-button-secondary touch-target w-full sm:w-auto"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Open in Email App
                    </Button>
                  </div>
                  <div className="mobile-card bg-muted/30 border border-border/50 rounded-lg p-6">
                    <div 
                      className="text-left max-w-none text-foreground"
                      style={{ 
                        fontSize: '15px',
                        lineHeight: '1.7',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: processContentForDisplay(formatForEmail(content))
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="sms" className="mt-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h4 className="mobile-small-text font-medium text-foreground">Text Message Version</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSMSTemplate}
                      className="mobile-button-secondary touch-target w-full sm:w-auto"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Send Text Message
                    </Button>
                  </div>
                  <div className="mobile-card bg-muted/30 border border-border/50 rounded-lg p-6">
                    <div 
                      className="text-foreground leading-7"
                      style={{ 
                        fontSize: '15px',
                        lineHeight: '1.7',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                    >
                      {formatForSMS(content)}
                    </div>
                    <div className="mt-3 text-xs text-foreground bg-muted/20 rounded px-2 py-1">
                      Characters: {formatForSMS(content).length}/160
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="quote" className="mt-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h4 className="mobile-small-text font-medium text-foreground">Quotation Format</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadTxt}
                      className="mobile-button-secondary touch-target w-full sm:w-auto"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Download Document
                    </Button>
                  </div>
                  <div className="mobile-card bg-muted/30 border border-border/50 rounded-lg p-6">
                    <div 
                      className="text-left max-w-none text-foreground"
                      style={{ 
                        fontSize: '15px',
                        lineHeight: '1.7',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: processContentForDisplay(formatForQuote(content))
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="mobile-card bg-muted/30 border border-border/50 rounded-lg p-8 text-center">
            <MessageSquare className="h-12 w-12 text-foreground/50 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="mobile-text text-foreground">
                Your client-friendly explanation will appear here
              </p>
              <p className="mobile-small-text text-foreground/70">
                Available in multiple formats: standard explanation, email template, text message, and quotation format
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutputPanel;