
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
    <Card className="bg-elec-card border border-elec-yellow/20 shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-full">
      <CardContent className="p-8 text-center">
        {/* Centered Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-elec-yellow/20">
            <FileText className="h-8 w-8 text-elec-yellow" />
          </div>
        </div>
        
        {/* Centered Title */}
        <CardTitle className="text-3xl font-bold text-foreground mb-3">
          AI-Powered CV Builder
        </CardTitle>
        
        {/* Centered Description */}
        <CardDescription className="text-muted-foreground text-base mb-8 max-w-2xl mx-auto">
          Create professional electrical CVs with intelligent content generation
        </CardDescription>
        
        {/* Horizontal Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex flex-col items-center text-center min-w-32">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-2">
              <Wand2 className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Smart CV Wizard</span>
          </div>
          
          <div className="flex flex-col items-center text-center min-w-32">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-2">
              <Sparkles className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">AI Content Generation</span>
          </div>
          
          <div className="flex flex-col items-center text-center min-w-32">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Industry Templates</span>
          </div>
          
          <div className="flex flex-col items-center text-center min-w-32">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/20 mb-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">PDF Export</span>
          </div>
        </div>
        
        {/* Centered Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-black hover:from-elec-yellow/90 hover:to-yellow-400/90 px-8 py-3"
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
              className="border-elec-yellow/30 hover:bg-elec-yellow/10 px-8 py-3"
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
      </CardContent>
    </Card>
  );
};

export default CVBuilderBox;
