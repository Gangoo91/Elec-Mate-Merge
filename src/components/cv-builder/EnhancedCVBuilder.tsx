
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Download, Eye, Save, Wand2, Sparkles } from "lucide-react";
import { CVForm } from "./CVForm";
import { CVPreview } from "./CVPreview";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, defaultCVData } from "./types";
import { generateCVPDF } from "./pdfGenerator";
import { AIService } from "./ai/AIService";
import { toast } from "@/hooks/use-toast";

const EnhancedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isGeneratingFromRaw, setIsGeneratingFromRaw] = useState(false);

  const handleSave = () => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast({
      title: "CV Saved",
      description: "Your CV has been saved locally."
    });
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      setCVData(JSON.parse(saved));
      toast({
        title: "CV Loaded",
        description: "Your saved CV has been loaded."
      });
    } else {
      toast({
        title: "No Saved CV",
        description: "No saved CV found.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateCVPDF(cvData);
      toast({
        title: "CV Downloaded",
        description: "Your CV has been generated and downloaded as PDF."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your CV PDF.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWizardComplete = (generatedCV: CVData) => {
    setCVData(generatedCV);
    setShowWizard(false);
    setActiveTab("edit");
    toast({
      title: "Smart CV Created",
      description: "Your AI-powered CV is ready for review and customisation."
    });
  };

  const isEmptyCV = () => {
    return !cvData.personalInfo.fullName && 
           cvData.experience.length === 0 && 
           cvData.education.length === 0 && 
           cvData.skills.length === 0;
  };

  const hasContentForGeneration = () => {
    return cvData.personalInfo.fullName || 
           cvData.personalInfo.professionalSummary ||
           cvData.experience.length > 0 || 
           cvData.education.length > 0 || 
           cvData.skills.length > 0 ||
           cvData.certifications.length > 0;
  };

  const handleGenerateFromRaw = async () => {
    if (!hasContentForGeneration()) {
      toast({
        title: "Insufficient Content",
        description: "Please add some personal information, skills, or experience before generating your professional resume.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingFromRaw(true);
    
    try {
      console.log('Starting CV generation with data:', cvData);
      
      const enhancedCV = await AIService.generateFromRawContent(cvData);
      console.log('Generated CV:', enhancedCV);
      
      if (enhancedCV.error) {
        toast({
          title: "Generation Warning",
          description: enhancedCV.error || "CV was generated but may need manual review.",
          variant: "default"
        });
        return;
      }
      
      // Validate that we have meaningful content
      if (!enhancedCV.personalInfo?.professionalSummary && 
          enhancedCV.experience?.length === 0 && 
          enhancedCV.skills?.length === 0) {
        toast({
          title: "Generation Issue",
          description: "The AI couldn't generate sufficient content. Please add more detailed information and try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Update CV data with enhanced content
      setCVData(enhancedCV);
      setActiveTab("preview");
      
      toast({
        title: "Professional Resume Generated",
        description: "Your content has been enhanced and structured into a professional resume format."
      });
      
    } catch (error: any) {
      console.error('CV Generation Error:', error);
      
      let errorMessage = "Failed to generate professional resume. Please try again.";
      
      if (error.message) {
        if (error.message.includes('invalid response format')) {
          errorMessage = "AI service returned an invalid format. Please try again or contact support.";
        } else if (error.message.includes('temporarily unavailable')) {
          errorMessage = "AI service is currently busy. Please wait a moment and try again.";
        } else if (error.message.includes('insufficient content')) {
          errorMessage = "Please add more detailed information about your experience and skills.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGeneratingFromRaw(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-dark">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <div>
                <CardTitle className="text-xl text-white">AI-Powered CV Builder</CardTitle>
                <p className="text-sm text-gray-400">Create professional electrical CVs with intelligent content generation</p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEmptyCV() && (
                <Button
                  onClick={() => setShowWizard(true)}
                  className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Smart CV Wizard
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoad}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                Load
              </Button>
              <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">
                <Wand2 className="h-4 w-4 mr-2" />
                Edit CV
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-6 mt-6">
              <div className="flex flex-wrap gap-3 mb-4">
                {!isEmptyCV() && (
                  <Button
                    onClick={() => setShowWizard(true)}
                    variant="outline"
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Restart with AI Wizard
                  </Button>
                )}
                {hasContentForGeneration() && (
                  <Button
                    onClick={handleGenerateFromRaw}
                    disabled={isGeneratingFromRaw}
                    className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90"
                  >
                    <Wand2 className="h-4 w-4 mr-2" />
                    {isGeneratingFromRaw ? "Generating..." : "Generate Professional Resume"}
                  </Button>
                )}
              </div>
              <CVForm cvData={cvData} onChange={setCVData} />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-6">
              <CVPreview cvData={cvData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
          <SmartCVWizard 
            onCVGenerated={handleWizardComplete}
            onClose={() => setShowWizard(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedCVBuilder;
