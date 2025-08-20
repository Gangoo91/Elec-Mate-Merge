
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Sparkles, Wand2 } from "lucide-react";
import SimplifiedCVBuilder from "@/components/cv-builder/SimplifiedCVBuilder";

const CVBuilderBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray w-full">
      <CardHeader className="pb-4">
        <div className="relative mb-2">
          <FileText className="h-6 w-6 text-elec-yellow" />
          <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1" />
        </div>
        <CardTitle className="text-xl">
          AI-Powered CV Builder
        </CardTitle>
        <CardDescription className="text-muted-foreground/70">
          Create professional electrical CVs with intelligent content generation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 w-full lg:w-auto">
            <p className="text-xs sm:text-sm mb-3 leading-relaxed">
              Create a professional CV tailored to electrical job applications with our AI-powered tool. Get intelligent content suggestions, industry-specific templates, and automated content generation.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-1 sm:gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Wand2 className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                <span className="truncate">Smart CV Wizard</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                <span className="truncate">AI Content Generation</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                <span className="truncate">Industry Templates</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                <span className="truncate">PDF Export</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 w-full lg:min-w-fit">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            
            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 justify-start flex-1 min-h-10"
              onClick={() => {
                const saved = localStorage.getItem('cvData');
                if (saved) {
                  setIsOpen(true);
                } else {
                  setIsOpen(true);
                }
              }}
            >
              <FileText className="h-4 w-4 mr-2" /> 
              Edit Existing CV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVBuilderBox;
