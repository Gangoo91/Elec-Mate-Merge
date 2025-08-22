
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
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-gray/95 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-full relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-elec-yellow/3 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
      
      <CardHeader className="pb-6 relative z-10">
        <div className="relative mb-3">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
              <FileText className="h-6 w-6 text-elec-yellow" />
              <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl text-white font-semibold">
                AI-Powered CV Builder
              </CardTitle>
              <CardDescription className="text-muted-foreground/80 mt-1">
                Create professional electrical CVs with intelligent content generation
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 pt-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          <div className="flex-1 w-full lg:w-auto">
            <p className="text-sm mb-6 leading-relaxed text-gray-300 max-w-md">
              Create a professional CV tailored to electrical job applications with our AI-powered tool. Get intelligent content suggestions, industry-specific templates, and automated content generation.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="p-1.5 bg-elec-yellow/20 rounded-md">
                  <Wand2 className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-gray-300 font-medium">Smart CV Wizard</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="p-1.5 bg-elec-yellow/20 rounded-md">
                  <Sparkles className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-gray-300 font-medium">AI Content Generation</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="p-1.5 bg-elec-yellow/20 rounded-md">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-gray-300 font-medium">Industry Templates</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10 hover:bg-elec-yellow/10 transition-colors duration-200">
                <div className="p-1.5 bg-elec-yellow/20 rounded-md">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-gray-300 font-medium">PDF Export</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:min-w-fit lg:w-64">
            <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-elec-yellow via-yellow-400 to-elec-yellow text-black hover:from-elec-yellow/90 hover:via-yellow-400/90 hover:to-elec-yellow/90 shadow-lg hover:shadow-xl transition-all duration-300 justify-center min-h-12 font-semibold group"
                >
                  <Sparkles className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" /> 
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
                className="border-elec-yellow/40 bg-elec-yellow/5 hover:bg-elec-yellow/15 text-white hover:text-white border-2 shadow-md hover:shadow-lg transition-all duration-300 justify-center min-h-12 font-medium group"
                onClick={() => setIsEditOpen(true)}
              >
                <FileText className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" /> 
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
