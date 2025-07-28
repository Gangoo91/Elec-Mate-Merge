import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, Save, Wand2, Sparkles } from "lucide-react";
import { CVPreview } from "./CVPreview";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, defaultCVData } from "./types";
import { generateCVPDF } from "./pdfGenerator";
import { toast } from "@/hooks/use-toast";

const SimplifiedCVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState("wizard");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedCV, setHasGeneratedCV] = useState(false);

  const handleWizardComplete = (generatedCVData: CVData) => {
    setCVData(generatedCVData);
    setHasGeneratedCV(true);
    setActiveTab("preview");
    
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
    setActiveTab("wizard");
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
                <CardTitle className="text-elec-light text-xl">Smart CV Builder</CardTitle>
                <p className="text-elec-light/60 text-sm">AI-powered professional CV generation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {hasGeneratedCV && (
                <>
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
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 bg-elec-card border-b border-elec-gray/40 rounded-none h-auto">
              <TabsTrigger 
                value="wizard" 
                className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-elec-light py-3"
              >
                <Wand2 className="h-4 w-4" />
                <span className="hidden sm:inline">Smart CV Wizard</span>
                <span className="sm:hidden">Wizard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                disabled={!hasGeneratedCV}
                className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-elec-light py-3 disabled:opacity-50"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">CV Preview</span>
                <span className="sm:hidden">Preview</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wizard" className="flex-1 m-0">
              <div className="h-full">
                <SmartCVWizard 
                  onCVGenerated={handleWizardComplete}
                  onClose={() => {}} // No close needed in this simplified version
                />
                
                {hasGeneratedCV && (
                  <div className="p-6 border-t border-elec-gray/40 bg-elec-card/50">
                    <div className="text-center">
                      <p className="text-elec-light/70 text-sm mb-4">
                        CV already generated. Want to start fresh?
                      </p>
                      <Button
                        onClick={handleStartNew}
                        variant="outline"
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      >
                        <Wand2 className="h-4 w-4 mr-2" />
                        Start New CV
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0 p-6">
              {hasGeneratedCV ? (
                <div className="h-full">
                  <CVPreview cvData={cvData} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-elec-yellow/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-elec-light mb-2">No CV Generated Yet</h3>
                    <p className="text-elec-light/60 mb-4">
                      Use the Smart CV Wizard to generate your professional CV
                    </p>
                    <Button
                      onClick={() => setActiveTab("wizard")}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Start CV Wizard
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplifiedCVBuilder;