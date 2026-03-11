import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const CVBuilderBox = () => {
  const handleWizard = () => {
    toast.info('CV Wizard is being prepared — check back shortly.');
  };

  const handleEdit = () => {
    toast.info('No CVs saved yet — use the wizard to create your first one.');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-elec-card border border-elec-yellow/20 rounded-lg relative">
      {/* Top icons */}
      <div className="flex justify-between mb-4">
        <FileText className="h-6 w-6 text-elec-yellow/50" />
        <Sparkles className="h-4 w-4 text-elec-yellow/50 flex-shrink-0" />
      </div>

      {/* Main title */}
      <h1 className="text-[1.35rem] font-bold text-white text-center mb-[5px]">
        AI-Powered CV Builder
      </h1>

      {/* Subtitle */}
      <p className="text-[1rem] text-white text-center mb-8">
        Create professional electrical CVs with intelligent content generation
      </p>

      {/* Description paragraph */}
      <p className="text-base text-white text-center mb-4 max-w-3xl mx-auto leading-relaxed">
        Create a professional CV tailored to electrical job applications with our AI-powered tool.
        Get intelligent content suggestions, industry-specific templates, and automated content
        generation.
      </p>

      {/* Features grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 max-w-lg mx-auto">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-white text-center">Smart CV Wizard</span>
        </div>

        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-white text-center">AI Content Generation</span>
        </div>

        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-white text-center">Industry Templates</span>
        </div>

        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <span className="text-xs text-white text-center">PDF Export</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleWizard}
          className="bg-elec-yellow text-black px-8 py-3 min-w-48 h-11 touch-manipulation"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Smart CV Wizard
        </Button>

        <Button
          onClick={handleEdit}
          variant="outline"
          className="border-elec-yellow/20 bg-background text-white px-8 py-3 min-w-48 h-11 touch-manipulation"
        >
          <FileText className="h-4 w-4 mr-2" />
          Edit Existing CV
        </Button>
      </div>
    </div>
  );
};

export default CVBuilderBox;
