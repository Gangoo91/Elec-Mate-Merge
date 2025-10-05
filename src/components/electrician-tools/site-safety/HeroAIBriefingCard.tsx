import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';

interface HeroAIBriefingCardProps {
  onCreateBriefing: () => void;
}

export function HeroAIBriefingCard({ onCreateBriefing }: HeroAIBriefingCardProps) {
  return (
    <div className="bg-card border border-elec-yellow/30 rounded-xl p-6 hover:border-elec-yellow/50 transition-all">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="h-16 w-16 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
          <FileText className="h-8 w-8 text-elec-yellow" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-elec-light">
            AI-Powered Team Briefing
          </h2>
          
          <p className="text-sm text-elec-light/70 max-w-md">
            Generate BS 7671 compliant safety briefings with AI assistance. Complete setup in minutes with intelligent content generation.
          </p>
        </div>

        <MobileButton
          onClick={onCreateBriefing}
          variant="elec"
          size="wide"
          icon={<Sparkles className="h-5 w-5" />}
          className="mt-2"
        >
          Create New Briefing
        </MobileButton>
      </div>
    </div>
  );
}
