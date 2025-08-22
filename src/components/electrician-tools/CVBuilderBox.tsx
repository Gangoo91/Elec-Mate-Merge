
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Sparkles, Wand2 } from "lucide-react";
import SimplifiedCVBuilder from "@/components/cv-builder/SimplifiedCVBuilder";
import EnhancedCVBuilder from "@/components/cv-builder/EnhancedCVBuilder";

const CVBuilderBox = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray to-elec-gray/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-full relative overflow-hidden group">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 via-transparent to-elec-yellow/10 opacity-50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
      <CardHeader className="pb-4 relative z-10">
        <div className="relative mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/30">
          <FileText className="h-6 w-6 text-elec-yellow" />
          <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1 animate-pulse" />
        </div>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-elec-yellow to-yellow-300 bg-clip-text text-transparent">
          AI-Powered CV Builder
        </CardTitle>
        <CardDescription className="text-muted-foreground/80 font-medium">
          Create professional electrical CVs with intelligent content generation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 w-full lg:w-auto">
            <p className="text-xs sm:text-sm mb-4 leading-relaxed text-muted-foreground/90">
              Create a professional CV tailored to electrical job applications with our AI-powered tool. Get intelligent content suggestions, industry-specific templates, and automated content generation.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="group flex items-center gap-2 p-2 rounded-lg bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors">
                  <Wand2 className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Smart CV Wizard</span>
              </div>
              <div className="group flex items-center gap-2 p-2 rounded-lg bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors">
                  <Sparkles className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">AI Content Generation</span>
              </div>
              <div className="group flex items-center gap-2 p-2 rounded-lg bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Industry Templates</span>
              </div>
              <div className="group flex items-center gap-2 p-2 rounded-lg bg-elec-yellow/5 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/20 group-hover:bg-elec-yellow/30 transition-colors">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">PDF Export</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:min-w-fit">
            <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90 justify-start flex-1 min-h-10"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> 
                  Smart CV Wizard
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[100vw] h-[100vh] max-w-none max-h-none overflow-hidden p-0 m-0 sm:w-[95vw] sm:max-w-4xl sm:h-[90vh] sm:max-h-[90vh] sm:m-6 sm:rounded-lg">
                <div className="h-full overflow-y-auto">
                  <SimplifiedCVBuilder />
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <Button 
                variant="outline" 
                className="hover:bg-elec-yellow/10 justify-start flex-1 min-h-10"
                onClick={() => setIsEditOpen(true)}
              >
                <FileText className="h-4 w-4 mr-2" /> 
                Edit Existing CV
              </Button>
              <DialogContent className="w-[100vw] h-[100vh] max-w-none max-h-none overflow-hidden p-0 m-0 sm:w-[95vw] sm:max-w-4xl sm:h-[90vh] sm:max-h-[90vh] sm:m-6 sm:rounded-lg">
                <div className="h-full overflow-y-auto">
                  <EnhancedCVBuilder />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVBuilderBox;
