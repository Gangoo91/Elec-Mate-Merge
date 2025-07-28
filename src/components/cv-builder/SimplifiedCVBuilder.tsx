import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Save, Wand2, Sparkles } from "lucide-react";
import { CVPreview } from "./CVPreview";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, defaultCVData } from "./types";
import { generateCVPDF } from "./pdfGenerator";
import { toast } from "@/hooks/use-toast";

const SimplifiedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedCV, setHasGeneratedCV] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleWizardComplete = (generatedCVData: CVData) => {
    setCVData(generatedCVData);
    setHasGeneratedCV(true);
    setShowPreview(true);
    
    // Save to localStorage
    localStorage.setItem('cvData', JSON.stringify(generatedCVData));
    
    toast({
      title: "CV Generated Successfully",
      description: "Your professional CV is ready for preview and download."
    });
  };

  const handleDownload = async () => {
    if (!cvData.personalInfo.fullName) {
      toast({
        title: "No CV Data",
        description: "Please generate a CV first before downloading.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateCVPDF(cvData);
      toast({
        title: "CV Downloaded",
        description: "Your professional CV has been downloaded as a PDF."
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your CV. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!cvData.personalInfo.fullName) {
      toast({
        title: "No CV Data",
        description: "Please generate a CV first before saving.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('cvData', JSON.stringify(cvData));
    toast({
      title: "CV Saved",
      description: "Your CV has been saved locally."
    });
  };

  const handleStartNew = () => {
    setCVData(defaultCVData);
    setHasGeneratedCV(false);
    setShowPreview(false);
    localStorage.removeItem('cvData');
  };

  // Load existing CV data if available
  React.useEffect(() => {
    const savedCV = localStorage.getItem('cvData');
    if (savedCV) {
      try {
        const parsedCV = JSON.parse(savedCV);
        setCVData(parsedCV);
        setHasGeneratedCV(true);
      } catch (error) {
        console.error('Error loading saved CV:', error);
      }
    }
  }, []);

  if (showPreview && hasGeneratedCV) {
    return (
      <div className="h-full bg-elec-gray">
        <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
          <CardHeader className="pb-4 border-b border-elec-gray/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FileText className="h-6 w-6 text-elec-yellow" />
                  <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1" />
                </div>
                <div>
                  <CardTitle className="text-elec-light text-xl">CV Preview</CardTitle>
                  <p className="text-elec-light/60 text-sm">Your AI-generated professional CV</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Back to Wizard
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save CV
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  size="sm"
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-6">
            <CVPreview cvData={cvData} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-elec-gray">
      <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
        <CardHeader className="pb-4 border-b border-elec-gray/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wand2 className="h-6 w-6 text-elec-yellow" />
                <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1" />
              </div>
              <div>
                <CardTitle className="text-elec-light text-xl">Smart CV Builder</CardTitle>
                <p className="text-elec-light/60 text-sm">AI-powered professional CV generation</p>
              </div>
            </div>
            
            {hasGeneratedCV && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View CV
                </Button>
                <Button
                  onClick={handleStartNew}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Start New
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <SmartCVWizard 
            onCVGenerated={handleWizardComplete}
            onClose={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplifiedCVBuilder;