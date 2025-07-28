
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
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="relative">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <Sparkles className="h-3 w-3 text-elec-yellow absolute -top-1 -right-1" />
          </div>
          AI-Powered CV Builder
        </CardTitle>
        <CardDescription className="text-muted-foreground/70">
          Create professional electrical CVs with intelligent content generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm mb-3">
              Create a professional CV tailored to electrical job applications with our AI-powered tool. Get intelligent content suggestions, industry-specific templates, and automated content generation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Wand2 className="h-3 w-3 text-elec-yellow" />
                Smart CV Wizard
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                AI Content Generation
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-elec-yellow" />
                Industry Templates
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3 text-elec-yellow" />
                PDF Export
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90 justify-start"
                >
                  <Sparkles className="h-4 w-4 mr-2" /> 
                  Smart CV Wizard
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-4xl h-[90vh] max-h-[90vh] overflow-hidden p-0">
                <div className="h-full">
                  <SimplifiedCVBuilder />
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 justify-start"
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
