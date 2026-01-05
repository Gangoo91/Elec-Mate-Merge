
import React from 'react';
import { Zap, Settings, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

const DashboardHeader = ({ onSettingsClick, onHelpClick }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full">
      {/* Back button - top left */}
      <div className="absolute top-0 left-0">
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="hover:bg-accent/10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Customers, Help and Settings buttons - top right */}
      <div className="absolute top-0 right-0 flex items-center gap-2">
        {onHelpClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onHelpClick}
            aria-label="Help and Documentation"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-500/50 hover:from-blue-500/30 hover:to-cyan-500/20 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 p-0"
          >
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
          </Button>
        )}
        {onSettingsClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSettingsClick}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        )}
      </div>
      
      {/* Main content - centered */}
      <div className="flex flex-col items-center gap-4 w-full pt-8 sm:pt-0">
        <div className="text-center w-full max-w-2xl mx-auto px-4">
          <div className="flex justify-center mb-2">
            <Zap className="h-7 w-7 sm:h-9 sm:w-9 text-elec-yellow" />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
            Inspection & Testing
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            BS7671 compliant electrical certification management
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
