import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Save, Wand2, Sparkles, Palette } from "lucide-react";
import { CVPreview } from "./CVPreview";
import { EnhancedCVPreview } from "./EnhancedCVPreview";
import { CVThemeSelector } from "./CVThemeSelector";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, defaultCVData } from "./types";
import { generateCVPDF } from "./pdfGenerator";
import { toast } from "@/hooks/use-toast";

const SimplifiedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedCV, setHasGeneratedCV] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'modern' | 'professional' | 'electrical'>('electrical');
  const [showThemeSelector, setShowThemeSelector] = useState(false);

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
      await generateCVPDF(cvData, selectedTheme);
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
    <div className="min-h-full bg-elec-gray">
      <Card className="border-elec-yellow/20 bg-elec-gray min-h-full flex flex-col border-none shadow-none">
        <CardHeader className="pb-3 sm:pb-4 border-b border-elec-gray/40 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-elec-yellow absolute -top-1 -right-1" />
              </div>
              <div>
                <CardTitle className="text-elec-light text-lg sm:text-xl">CV Preview</CardTitle>
                <p className="text-elec-light/60 text-xs sm:text-sm">Your AI-generated professional CV</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Theme
              </Button>
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Wand2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Wizard
              </Button>
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Save CV
              </Button>
              <Button
                onClick={handleDownload}
                disabled={isGenerating}
                size="sm"
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-3 sm:p-6 space-y-6">
          {showThemeSelector && (
            <CVThemeSelector 
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
            />
          )}
          <EnhancedCVPreview cvData={cvData} theme={selectedTheme} />
        </CardContent>
      </Card>
    </div>
  );
  }

  return (
    <div className="min-h-full bg-elec-gray">
      <Card className="border-elec-yellow/20 bg-elec-gray min-h-full flex flex-col border-none shadow-none">
        <CardHeader className="pb-3 sm:pb-4 border-b border-elec-gray/40 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Wand2 className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-elec-yellow absolute -top-1 -right-1" />
              </div>
              <div>
                <CardTitle className="text-elec-light text-lg sm:text-xl">Smart CV Builder</CardTitle>
                <p className="text-elec-light/60 text-xs sm:text-sm">AI-powered professional CV generation</p>
              </div>
            </div>
            
            {hasGeneratedCV && (
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  View CV
                </Button>
                <Button
                  onClick={handleStartNew}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <Wand2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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