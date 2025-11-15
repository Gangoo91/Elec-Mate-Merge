import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DesignInputs, CircuitInput } from '@/types/installation-design';
import { Sparkles } from 'lucide-react';
import { InputSidebar } from './InputSidebar';

interface DesignInputFormDesktopProps {
  promptDescription: string;
  setPromptDescription: (value: string) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  circuits: CircuitInput[];
  detectionConfidence: number;
  onGenerate: () => void;
  isProcessing: boolean;
  children: React.ReactNode; // The full form content
}

export const DesignInputFormDesktop = ({
  promptDescription,
  setPromptDescription,
  installationType,
  circuits,
  detectionConfidence,
  onGenerate,
  isProcessing,
  children
}: DesignInputFormDesktopProps) => {
  return (
    <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6">
      {/* Left Column - Main Form (60%) */}
      <div className="space-y-4">
        {children}
        
        {/* Sticky Generate Button */}
        <Card className="lg:sticky lg:bottom-4 bg-card border-2 shadow-lg">
          <div className="p-4">
            <Button
              onClick={onGenerate}
              disabled={isProcessing || !promptDescription.trim()}
              size="lg"
              className="w-full h-12 text-base"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {isProcessing ? 'Generating...' : 'Generate AI Design'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column - Sidebar (40%) */}
      <div className="hidden lg:block">
        <InputSidebar
          promptDescription={promptDescription}
          installationType={installationType}
          circuits={circuits}
          detectionConfidence={detectionConfidence}
        />
      </div>
    </div>
  );
};
