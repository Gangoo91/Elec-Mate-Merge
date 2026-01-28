import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles, Clock } from "lucide-react";

const CVBuilderBox = () => {

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-elec-card border border-elec-yellow/20 rounded-lg relative">
      {/* Coming Soon Badge */}
      <Badge className="absolute top-4 right-4 px-2 py-1 text-xs bg-amber-500 text-black border-0 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Coming Soon
      </Badge>

      {/* Top icons */}
      <div className="flex justify-between mb-4">
        <FileText className="h-6 w-6 text-elec-yellow/50" />
        <Sparkles className="h-4 w-4 text-elec-yellow/50 flex-shrink-0" />
      </div>

      {/* Main title */}
      <h1 className="text-[1.35rem] font-bold text-foreground/70 text-center mb-[5px]">
        AI-Powered CV Builder
      </h1>
      
      {/* Subtitle */}
      <p className="text-[1rem] text-muted-foreground text-center mb-8">
        Create professional electrical CVs with intelligent content generation
      </p>
      
      {/* Description paragraph */}
      <p className="text-base text-foreground text-center mb-4 max-w-3xl mx-auto leading-relaxed">
        Create a professional CV tailored to electrical job applications with our AI-powered tool. Get 
        intelligent content suggestions, industry-specific templates, and automated content 
        generation.
      </p>
      
      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 max-w-lg mx-auto">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-muted-foreground text-center">Smart CV Wizard</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-muted-foreground text-center">AI Content Generation</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-muted-foreground text-center">Industry Templates</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-muted-foreground text-center">PDF Export</span>
        </div>
      </div>
      
      {/* Action buttons - Disabled until templates ready */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          disabled
          className="bg-elec-yellow/50 text-black/50 cursor-not-allowed px-8 py-3 min-w-48"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Smart CV Wizard
        </Button>

        <Button
          disabled
          variant="outline"
          className="border-elec-yellow/20 bg-background text-foreground/50 cursor-not-allowed px-8 py-3 min-w-48"
        >
          <FileText className="h-4 w-4 mr-2" />
          Edit Existing CV
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        CV templates for electricians coming soon
      </p>
    </div>
  );
};

export default CVBuilderBox;
