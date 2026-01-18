
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Download, Eye, Save, Wand2, Sparkles, ChevronDown, FileCode, File } from "lucide-react";
import { EnhancedCVForm } from "./EnhancedCVForm";
import { CVPreview } from "./CVPreview";
import { SmartCVWizard } from "./ai/SmartCVWizard";
import { CVData, CVFormat, defaultCVData } from "./types";
import { generateCVPDFByFormat } from "./pdfGenerators";
import { CVTemplateShowcase, CVTemplateId } from "./premium/CVTemplateShowcase";
import { toast } from "@/hooks/use-toast";

const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [activeTab, setActiveTab] = useState("edit");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplateId>("classic");

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

  const handleDownload = async (format: CVFormat = 'full') => {
    setIsGenerating(true);
    try {
      await generateCVPDFByFormat(cvData, selectedTemplate, format);
      const formatLabel = format === 'ats' ? 'ATS-Friendly' : format === 'summary' ? '1-Page Summary' : 'Full';
      toast({
        title: "CV Downloaded",
        description: `Your ${formatLabel} CV has been generated and downloaded.`
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
    <div className="h-full flex flex-col">
      <Card className="border-elec-yellow/20 bg-elec-dark flex-1 flex flex-col">
        <CardHeader className="pb-4 px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow flex-shrink-0" />
              <div className="min-w-0">
                <CardTitle className="text-lg md:text-xl text-foreground truncate">AI-Powered CV Builder</CardTitle>
                <p className="text-xs md:text-sm text-gray-400 hidden md:block">Create professional electrical CVs with intelligent content generation</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {isEmptyCV() && (
                <Button
                  onClick={() => setShowWizard(true)}
                  size="sm"
                  className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90 text-xs md:text-sm"
                >
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Smart Wizard
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs md:text-sm"
              >
                <Save className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoad}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs md:text-sm"
              >
                Load
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={isGenerating}
                    size="sm"
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs md:text-sm"
                  >
                    <Download className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    {isGenerating ? "Generating..." : "Download"}
                    <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-elec-gray border-elec-gray text-foreground">
                  <DropdownMenuItem onClick={() => handleDownload('full')} className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Full CV (Recommended)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDownload('summary')} className="cursor-pointer">
                    <File className="h-4 w-4 mr-2" />
                    1-Page Summary
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => handleDownload('ats')} className="cursor-pointer">
                    <FileCode className="h-4 w-4 mr-2" />
                    ATS-Friendly (Plain Text)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="edit" className="text-xs md:text-sm">
                <Wand2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="template" className="text-xs md:text-sm">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Template
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-xs md:text-sm">
                <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="flex-1 mt-0">
              <div className="h-full overflow-y-auto space-y-4">
                {!isEmptyCV() && (
                  <div>
                    <Button
                      onClick={() => setShowWizard(true)}
                      variant="outline"
                      size="sm"
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs md:text-sm"
                    >
                      <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Restart with AI Wizard
                    </Button>
                  </div>
                )}
                <EnhancedCVForm cvData={cvData} onChange={setCVData} />
              </div>
            </TabsContent>

            <TabsContent value="template" className="flex-1 mt-0">
              <div className="h-full overflow-y-auto space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Choose Your CV Template</h3>
                  <p className="text-sm text-muted-foreground">Select a design that matches your style</p>
                </div>
                <CVTemplateShowcase
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 mt-0">
              <div className="h-full overflow-y-auto">
                <CVPreview cvData={cvData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="w-[95vw] max-w-2xl h-[90vh] max-h-[90vh] overflow-hidden p-0">
          <div className="h-full overflow-y-auto">
            <SmartCVWizard 
              onCVGenerated={handleWizardComplete}
              onClose={() => setShowWizard(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CVBuilder;
