
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
    <div className="w-full max-w-4xl mx-auto p-8 bg-elec-card border border-elec-yellow/20 rounded-lg">
      {/* Top left icon */}
      <div className="flex justify-start mb-8">
        <FileText className="h-6 w-6 text-elec-yellow" />
      </div>
      
      {/* Main title */}
      <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
        AI-Powered CV Builder
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-muted-foreground text-center mb-8">
        Create professional electrical CVs with intelligent content generation
      </p>
      
      {/* Description paragraph */}
      <p className="text-base text-foreground text-center mb-12 max-w-3xl mx-auto leading-relaxed">
        Create a professional CV tailored to electrical job applications with our AI-powered tool. Get 
        intelligent content suggestions, industry-specific templates, and automated content 
        generation.
      </p>
      
      {/* Features grid */}
      <div className="grid grid-cols-2 gap-6 mb-12 max-w-lg mx-auto">
        <div className="flex items-center space-x-3">
          <Wand2 className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <span className="text-sm text-muted-foreground">Smart CV Wizard</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <span className="text-sm text-muted-foreground">AI Content Generation</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <span className="text-sm text-muted-foreground">Industry Templates</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <span className="text-sm text-muted-foreground">PDF Export</span>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-8 py-3 min-w-48"
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
            className="border-border bg-background text-foreground hover:bg-muted px-8 py-3 min-w-48"
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
  );
};

export default CVBuilderBox;
