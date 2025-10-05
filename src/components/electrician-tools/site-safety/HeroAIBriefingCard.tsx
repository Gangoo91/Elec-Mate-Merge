import React from 'react';
import { Sparkles, Zap, Clock } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';

interface HeroAIBriefingCardProps {
  onCreateBriefing: () => void;
}

export function HeroAIBriefingCard({ onCreateBriefing }: HeroAIBriefingCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-yellow via-elec-yellow/90 to-elec-yellow/80 p-6 md:p-8 shadow-xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl" />
      
      <div className="relative z-10">
        {/* Icon badge */}
        <div className="inline-flex items-center gap-2 bg-elec-dark/10 text-elec-dark px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold">AI-Powered</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-elec-dark mb-3">
          Create Professional Briefings
        </h2>
        
        {/* Description */}
        <p className="text-elec-dark/80 text-base md:text-lg mb-6 max-w-xl">
          Generate BS 7671 compliant safety briefings in minutes with AI assistance
        </p>

        {/* Features list */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-elec-dark/90">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">AI Generated</span>
          </div>
          <div className="flex items-center gap-2 text-elec-dark/90">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">2 Min Setup</span>
          </div>
        </div>

        {/* CTA Button */}
        <MobileButton
          onClick={onCreateBriefing}
          variant="default"
          size="wide"
          icon={<Sparkles className="h-5 w-5" />}
          className="bg-elec-dark text-elec-yellow hover:bg-elec-dark/90 shadow-lg hover:shadow-xl transition-all"
        >
          Create AI Briefing
        </MobileButton>
      </div>
    </div>
  );
}
