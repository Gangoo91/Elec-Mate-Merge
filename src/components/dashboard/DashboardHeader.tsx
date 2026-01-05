import React from 'react';
import { Zap, Settings, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onBackClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

const DashboardHeader = ({ onBackClick, onSettingsClick, onHelpClick }: DashboardHeaderProps) => {
  return (
    <div className="w-full space-y-6">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackClick}
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <div className="flex items-center gap-2">
          {onHelpClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onHelpClick}
              aria-label="Help"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          )}
          {onSettingsClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="p-3 sm:p-4 bg-primary/10 rounded-2xl border border-primary/20">
          <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Inspection & Testing
          </h1>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground">
            BS7671 compliant electrical certification management
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
