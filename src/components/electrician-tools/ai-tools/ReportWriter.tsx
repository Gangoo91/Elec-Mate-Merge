
import { useState } from "react";
import { FileText, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const ReportWriter = () => {
  const [reportPrompt, setReportPrompt] = useState("");
  const [reportResult, setReportResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Electrical Report Writer
        </CardTitle>
        <CardDescription>
          Generate professional electrical reports, certificates, and documentation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Describe what type of report you need and provide the relevant details about the installation, inspection, or work carried out. Our AI will generate a formatted report following UK electrical standards.
        </p>
        
        <Textarea
          placeholder="e.g., Create an EICR report for a 3-bedroom residential property with 8 circuits. The inspection found two C2 issues: damaged socket in kitchen and inadequate earthing for shower circuit."
          className="min-h-[120px]"
          value={reportPrompt}
          onChange={(e) => setReportPrompt(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleGenerateReport} 
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Generating Report...
            </>
          ) : (
            'Generate Report'
          )}
        </Button>

        {isGenerating && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md animate-pulse">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}

        {reportResult && !isGenerating && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-elec-yellow">Generated Report:</h3>
              <Button variant="outline" size="sm" onClick={handleCopyReport}>Copy</Button>
            </div>
            <div className="p-4 bg-elec-dark rounded-md">
              <div className="text-sm whitespace-pre-wrap">
                {reportResult.split('\n').map((line, index) => (
                  <p 
                    key={index} 
                    className={
                      line.toUpperCase() === line && line.trim() !== "" ? 
                      "text-elec-yellow font-semibold my-2" : 
                      line.trim().endsWith(":") ? 
                      "font-semibold mt-3 mb-1" : 
                      "my-1"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportWriter;
