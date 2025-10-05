import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';

interface HeroAIBriefingCardProps {
  onCreateBriefing: () => void;
}

export function HeroAIBriefingCard({ onCreateBriefing }: HeroAIBriefingCardProps) {
  return (
    <div className="bg-card border border-elec-yellow/30 rounded-xl p-6 hover:border-elec-yellow/50 transition-all">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
          <FileText className="h-6 w-6 text-elec-yellow" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-elec-light mb-2">
            AI-Powered Team Briefing
          </h2>
          
          <p className="text-sm text-elec-light/70 mb-4">
            Generate BS 7671 compliant safety briefings with AI assistance. Complete setup in minutes with intelligent content generation.
          </p>

          <MobileButton
            onClick={onCreateBriefing}
            variant="outline"
            size="default"
            icon={<Sparkles className="h-4 w-4" />}
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            Create New Briefing
          </MobileButton>
        </div>
      </div>
    </div>
  );
}
