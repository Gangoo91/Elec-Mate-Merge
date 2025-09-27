import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  Eye, 
  Download, 
  RefreshCw,
  Sparkles,
  FileText,
  CheckCircle2,
  User,
  MapPin,
  Search,
  Calendar,
  AlertTriangle,
  Loader2,
  Send
} from "lucide-react";
import { ReviewGenerateStepProps } from "../types";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import GeneratedReportDisplay from "../../GeneratedReportDisplay";

const ReviewGenerateStep: React.FC<ReviewGenerateStepProps> = ({
  wizardData,
  onDataChange,
  onBack,
  onReset
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateReport = async () => {
    if (!wizardData.template) {
      toast({
        title: "Error",
        description: "No template selected",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating report with wizard data:', wizardData);

      const { data, error } = await supabase.functions.invoke('generate-electrical-report', {
        body: {
          template: wizardData.template.id,
          formData: {
            ...wizardData.clientDetails,
            ...wizardData.inspectionDetails
          },
          additionalNotes: wizardData.additionalNotes
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate report');
      }

      console.log('Report generation successful');
      setGeneratedReport(data.report);
      setShowPreview(true);
      
      toast({
        title: "Report Generated Successfully",
        description: "Your professional electrical report has been generated.",
        variant: "success"
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAndPreview = async () => {
    await handleGenerateReport();
  };

  const getSummaryData = () => {
    const clientData = wizardData.clientDetails;
    const inspectionData = wizardData.inspectionDetails;
    
    return {
      client: {
        name: clientData.clientName || 'Not specified',
        address: clientData.clientAddress || 'Not specified',
        phone: clientData.clientPhone || 'Not specified'
      },
      installation: {
        address: clientData.installationAddress || 'Not specified',
        description: clientData.installationDescription || 'Not specified',
        age: clientData.estimatedAge || 'Not specified'
      },
      inspection: {
        extent: inspectionData.extentOfInspection || 'Not specified',
        assessment: inspectionData.overallAssessment || 'Not specified',
        faultCount: inspectionData.faults?.length || 0,
        inspector: inspectionData.inspectorName || 'Not specified'
      }
    };
  };

  const summary = getSummaryData();

  if (showPreview && generatedReport) {
    return (
      <div className="space-y-6">
        {/* Header with back to wizard option */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Generated Report</h2>
              <p className="text-muted-foreground">
                Your {wizardData.template?.name} has been generated successfully
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(false)}
                className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Review
              </Button>
              <Button
                onClick={onReset}
                variant="outline"
                className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start New Report
              </Button>
            </div>
          </div>
        </Card>

        {/* Generated Report Display */}
        <GeneratedReportDisplay
          report={generatedReport}
          template={wizardData.template!.id}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-white">Review & Generate Report</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Review your information below and add any additional notes before generating your professional electrical report.
          </p>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Template Summary */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Report Template</h3>
              <p className="text-sm text-muted-foreground">Selected template and settings</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Template:</span>
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/50">
                {wizardData.template?.name}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-right">
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              <Badge variant="outline" className="text-xs text-right">
                {wizardData.template?.difficulty}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="text-sm text-white capitalize">{wizardData.template?.category}</span>
            </div>
          </div>
        </Card>

        {/* Client Summary */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-500/20 rounded">
              <User className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Client Info</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div>
                <span className="text-xs text-muted-foreground">Name:</span>
                <p className="text-xs text-white font-medium">{summary.client.name}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Phone:</span>
                <p className="text-xs text-white">{summary.client.phone}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-elec-yellow/10">
              <div>
                <span className="text-xs text-muted-foreground">Address:</span>
                <p className="text-xs text-white leading-relaxed">{summary.client.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Installation Summary */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-500/20 rounded">
              <MapPin className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Installation</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div>
                <span className="text-xs text-muted-foreground">Location:</span>
                <p className="text-xs text-white font-medium">{summary.installation.address}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Type:</span>
                <p className="text-xs text-white">{summary.installation.description}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-elec-yellow/10">
              <div>
                <span className="text-xs text-muted-foreground">Age:</span>
                <p className="text-xs text-white">{summary.installation.age}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Inspection Summary */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-500/20 rounded">
              <Search className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Inspection</h3>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Assessment:</span>
                <Badge 
                  className={`text-xs ${summary.inspection.assessment === 'satisfactory' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/50' 
                    : 'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}
                >
                  {summary.inspection.assessment}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Faults:</span>
                <span className="text-xs text-white font-medium">
                  {summary.inspection.faultCount}
                </span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-elec-yellow/10">
              <div>
                <span className="text-xs text-muted-foreground">Inspector:</span>
                <p className="text-xs text-white">{summary.inspection.inspector}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Notes */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-medium text-white">Additional Notes</h3>
        </div>
        
        <div className="space-y-3">
          <Textarea
            placeholder="Add any additional notes, special requirements, or instructions for the AI report generator..."
            className="min-h-[100px] bg-elec-dark border border-primary/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={wizardData.additionalNotes}
            onChange={(e) => onDataChange('additionalNotes', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            These notes will be included in the AI prompt to customize your report generation.
          </p>
        </div>
      </Card>

      {/* Generation Actions */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-white mb-2">Ready to Generate Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your report will be generated using AI technology following BS 7671:2018 standards.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGenerateAndPreview}
              disabled={isGenerating}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleGenerateAndPreview}
              disabled={isGenerating}
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Generate & Preview
            </Button>
          </div>

          <Separator className="bg-elec-yellow/20" />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Inspection Details
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step 4 of 4 • Review & Generate
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={onReset}
              className="text-muted-foreground hover:text-white w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewGenerateStep;