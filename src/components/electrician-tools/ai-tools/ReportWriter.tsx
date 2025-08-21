
import { useState, useRef } from "react";
import { FileText, Loader, Download, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const reportTemplates = [
  { id: "eicr-domestic", label: "EICR - Domestic", prompt: "Create an EICR report for a domestic property. Include installation details, circuit testing results, and any observations found during inspection." },
  { id: "minor-works", label: "Minor Works", prompt: "Generate a Minor Electrical Installation Works Certificate for recent electrical work completed." },
  { id: "periodic", label: "Periodic Inspection", prompt: "Create a periodic inspection report for an existing electrical installation, documenting current condition and compliance." },
  { id: "ev-charger", label: "EV Charger", prompt: "Generate an installation certificate for electric vehicle charging point installation, including earthing and RCD testing." },
  { id: "consumer-unit", label: "Consumer Unit", prompt: "Create a consumer unit replacement certificate with circuit testing and RCD verification results." },
  { id: "rcd-test", label: "RCD Test", prompt: "Generate an RCD testing summary with operating times and trip characteristics for all protective devices." }
];

const ReportWriter = () => {
  const [reportPrompt, setReportPrompt] = useState("");
  const [reportResult, setReportResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTemplateSelect = (template: typeof reportTemplates[0]) => {
    setReportPrompt(template.prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleGenerateReport = async () => {
    if (reportPrompt.trim() === "") {
      toast({
        title: "Empty Prompt",
        description: "Please enter report details first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setReportResult("");

    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: reportPrompt,
          type: "report_writer"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Report Writer service');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setReportResult(data.response || "");
      
      toast({
        title: "Report Generated",
        description: "Your electrical report has been generated.",
      });
    } catch (error) {
      console.error('Report Generation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportResult);
    toast({
      title: "Copied",
      description: "Report copied to clipboard",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export feature coming soon",
    });
  };

  const handleExportWord = () => {
    toast({
      title: "Word Export", 
      description: "Word export feature coming soon",
    });
  };

  const parseReportSections = (text: string) => {
    const lines = text.split('\n');
    const sections: { id: string; title: string; content: string; isHeading: boolean }[] = [];
    let currentSection = { id: '', title: '', content: '', isHeading: false };
    let sectionId = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Check if line is a main heading (ALL CAPS or ends with colon)
      const isMainHeading = (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 0) || 
                           (trimmedLine.endsWith(':') && !trimmedLine.includes('.'));
      
      if (isMainHeading && trimmedLine.length > 0) {
        // Save previous section if it has content
        if (currentSection.content.trim() || currentSection.title) {
          sections.push({ ...currentSection });
        }
        
        // Start new section
        currentSection = {
          id: `section-${sectionId++}`,
          title: trimmedLine.replace(':', ''),
          content: '',
          isHeading: true
        };
      } else {
        // Add to current section content
        currentSection.content += line + '\n';
      }
    });

    // Add the last section
    if (currentSection.content.trim() || currentSection.title) {
      sections.push(currentSection);
    }

    return sections.length > 1 ? sections : [{ id: 'full-report', title: 'Report', content: text, isHeading: false }];
  };

  const reportSections = reportResult ? parseReportSections(reportResult) : [];

  return (
    <div className="min-h-screen bg-elec-dark pb-32">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <h1 className="text-2xl font-bold text-white">AI Report Writer</h1>
            </div>
            <p className="text-muted-foreground">
              Generate professional electrical reports and certificates
            </p>
          </div>

          {/* Quick Templates */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">Quick Templates:</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {reportTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 flex-shrink-0"
                  onClick={() => handleTemplateSelect(template)}
                >
                  {template.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Display */}
          {reportResult && !isGenerating && (
            <div className="mb-6">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" onClick={handleCopyReport} className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportPDF} className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportWord} className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
                  <Download className="h-4 w-4 mr-2" />
                  Word
                </Button>
              </div>

              {/* Report Content */}
              <div className="space-y-4">
                {reportSections.map((section) => (
                  <Card key={section.id} className="border-elec-yellow/20 bg-elec-gray">
                    {section.isHeading ? (
                      <div>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-elec-yellow/5 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-elec-yellow">{section.title}</h3>
                          {expandedSections[section.id] ? (
                            <ChevronUp className="h-5 w-5 text-elec-yellow" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-elec-yellow" />
                          )}
                        </button>
                        {expandedSections[section.id] && (
                          <div className="px-4 pb-4">
                            <div className="whitespace-pre-wrap text-white leading-relaxed max-w-none">
                              {section.content.split('\n').map((line, index) => (
                                <p 
                                  key={index} 
                                  className={
                                    line.trim().endsWith(":") && !line.includes('.') ? 
                                    "font-semibold mt-3 mb-1 text-elec-yellow" : 
                                    line.trim().startsWith("•") || line.trim().startsWith("-") ?
                                    "ml-4 my-1" :
                                    "my-1"
                                  }
                                >
                                  {line || '\u00A0'}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <CardContent className="p-4">
                        <div className="whitespace-pre-wrap text-white leading-relaxed max-w-none">
                          {section.content.split('\n').map((line, index) => (
                            <p 
                              key={index} 
                              className={
                                line.toUpperCase() === line && line.trim() !== "" ? 
                                "text-elec-yellow font-semibold my-3 text-lg" : 
                                line.trim().endsWith(":") && !line.includes('.') ? 
                                "font-semibold mt-3 mb-1 text-elec-yellow" : 
                                line.trim().startsWith("•") || line.trim().startsWith("-") ?
                                "ml-4 my-1" :
                                "my-1"
                              }
                            >
                              {line || '\u00A0'}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="mb-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-3">
                    <Skeleton className="h-6 w-48 bg-elec-yellow/20" />
                    <Skeleton className="h-4 w-full bg-elec-yellow/10" />
                    <Skeleton className="h-4 w-full bg-elec-yellow/10" />
                    <Skeleton className="h-4 w-3/4 bg-elec-yellow/10" />
                    <Skeleton className="h-4 w-5/6 bg-elec-yellow/10" />
                    <Skeleton className="h-4 w-full bg-elec-yellow/10" />
                    <Skeleton className="h-4 w-4/5 bg-elec-yellow/10" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Composer */}
      <div className="fixed bottom-0 left-0 right-0 bg-elec-dark border-t border-elec-yellow/20 p-4 safe-area-pb">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            <Textarea
              ref={textareaRef}
              placeholder="Describe the electrical work or inspection you need a report for..."
              className="min-h-[80px] max-h-32 resize-none bg-elec-gray border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
              value={reportPrompt}
              onChange={(e) => setReportPrompt(e.target.value)}
            />
            <Button 
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12 text-base font-semibold" 
              onClick={handleGenerateReport} 
              disabled={isGenerating || !reportPrompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Generating...
                </>
              ) : (
                'Generate Report'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportWriter;
