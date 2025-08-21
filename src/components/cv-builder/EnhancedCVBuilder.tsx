
import React, { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";

const EnhancedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  // Auto-load saved CV data on mount
  useEffect(() => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        setCVData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved CV data:', error);
      }
    }
  }, []);

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
                <CardTitle className="text-elec-light text-lg sm:text-xl">AI-Powered CV Builder</CardTitle>
                <p className="text-elec-light/60 text-xs sm:text-sm">Create professional electrical CVs with intelligent content generation</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
              {isEmptyCV() && (
                <Button
                  onClick={() => setShowWizard(true)}
                  size="sm"
                  className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Smart CV Wizard
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoad}
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

        <CardContent className="flex-1 p-3 sm:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
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
