import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Star, Play } from 'lucide-react';

interface SafetyModule {
  title: string;
  description: string;
  priority: string;
  duration: string;
  modules: string[];
  color: string;
  interactive?: boolean;
}

interface SafetyModuleCardProps {
  module: SafetyModule;
  onModuleClick: (title: string, interactive?: boolean) => void;
}

const SafetyModuleCard = ({ module, onModuleClick }: SafetyModuleCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Essential': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Required': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-white/80 bg-white/5 border-white/20';
    }
  };

  return (
    <Card
      onClick={() => onModuleClick(module.title, module.interactive)}
      className={`bg-card border-2 ${module.color} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer touch-manipulation rounded-xl sm:rounded-2xl`}
    >
      <CardHeader className="p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between mb-1.5 sm:mb-2 gap-2">
          <CardTitle className="text-foreground group-hover:text-elec-yellow transition-colors text-sm sm:text-base md:text-lg leading-tight">
            {module.title}
          </CardTitle>
          {module.interactive && (
            <div className="flex items-center gap-1 shrink-0">
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-elec-yellow" />
              <span className="text-[10px] sm:text-xs text-elec-yellow hidden sm:inline">Interactive</span>
            </div>
          )}
        </div>
        <CardDescription className="text-white text-xs sm:text-sm line-clamp-2">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/80 flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{module.duration}</span>
            </div>
            <span className={`text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full border ${getPriorityColor(module.priority)}`}>
              {module.priority}
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2 hidden sm:block">
            <h4 className="text-xs sm:text-sm font-medium text-foreground">Modules Covered:</h4>
            <div className="grid grid-cols-2 gap-1">
              {module.modules.map((mod, index) => (
                <div key={index} className="text-[10px] sm:text-xs text-white/80 flex items-center gap-1">
                  <Star className="h-2 w-2 text-elec-yellow shrink-0" />
                  <span className="truncate">{mod}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onModuleClick(module.title, module.interactive);
            }}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] text-xs sm:text-sm touch-manipulation active:scale-[0.98]"
          >
            {module.interactive ? 'Start Interactive Module' : 'Access Module'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyModuleCard;