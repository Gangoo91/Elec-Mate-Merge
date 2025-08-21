
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Download, Save, Wand2, Sparkles, Eye } from "lucide-react";
import { EnhancedCVForm } from "./EnhancedCVForm";
import { CVPreview } from "./CVPreview";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, defaultCVData } from "./types";
import { generateCVPDF } from "./pdfGenerator";
import { toast } from "@/hooks/use-toast";

const EnhancedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  // Load existing CV data if available
  useEffect(() => {
    const savedCV = localStorage.getItem('cvData');
    if (savedCV) {
      try {
        const parsedCV = JSON.parse(savedCV);
        setCVData(parsedCV);
      } catch (error) {
        console.error('Error loading saved CV:', error);
      }
    }
  }, []);

  const handleSave = () => {
    if (!cvData.personalInfo.fullName) {
      toast({
        title: "No CV Data",
        description: "Please create or edit a CV first before saving.",
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

  const handleLoad = () => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        const parsedCV = JSON.parse(saved);
        setCVData(parsedCV);
        toast({
          title: "CV Loaded",
          description: "Your saved CV has been loaded."
        });
      } catch (error) {
        toast({
          title: "Load Failed",
          description: "Error loading saved CV data.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "No Saved CV",
        description: "No saved CV found.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = async () => {
    if (!cvData.personalInfo.fullName) {
      toast({
        title: "No CV Data",
        description: "Please create or edit a CV first before downloading.",
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

  const handleWizardComplete = (generatedCV: CVData) => {
    setCVData(generatedCV);
    setShowWizard(false);
    
    // Save to localStorage
    localStorage.setItem('cvData', JSON.stringify(generatedCV));
    
    toast({
      title: "CV Generated Successfully",
      description: "Your professional CV is ready for preview and download."
    });
  };

  const isEmptyCV = () => {
    return !cvData.personalInfo.fullName && 
           cvData.experience.length === 0 && 
           cvData.education.length === 0 && 
           cvData.skills.length === 0;
  };

  // Preview Mode
  if (showPreview) {
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
                  <p className="text-elec-light/60 text-xs sm:text-sm">Your professional CV ready for download</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowPreview(false)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <Wand2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Back to Editor
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

          <CardContent className="flex-1 p-3 sm:p-6">
            <CVPreview cvData={cvData} />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Edit Mode
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
                <CardTitle className="text-elec-light text-lg sm:text-xl">CV Editor</CardTitle>
                <p className="text-elec-light/60 text-xs sm:text-sm">Edit and customise your professional CV</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
              {isEmptyCV() && (
                <Button
                  onClick={() => setShowWizard(true)}
                  size="sm"
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Smart CV Wizard
                </Button>
              )}
              {!isEmptyCV() && (
                <Button
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Preview
                </Button>
              )}
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Save
              </Button>
              <Button
                onClick={handleLoad}
                variant="outline"
                size="sm"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                Load
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

        <CardContent className="flex-1 p-0">
          <div className="p-3 sm:p-6">
            {!isEmptyCV() && (
              <div className="mb-4">
                <Button
                  onClick={() => setShowWizard(true)}
                  variant="outline"
                  size="sm"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Restart with AI Wizard
                </Button>
              </div>
            )}
            <EnhancedCVForm cvData={cvData} onChange={setCVData} />
          </div>
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
