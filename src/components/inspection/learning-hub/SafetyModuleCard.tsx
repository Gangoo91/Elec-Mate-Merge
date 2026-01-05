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
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <Card className={`bg-card border-2 ${module.color} hover:scale-105 transition-all duration-300 group cursor-pointer`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-foreground group-hover:text-elec-yellow transition-colors text-lg">
            {module.title}
          </CardTitle>
          {module.interactive && (
            <div className="flex items-center gap-1">
              <Play className="h-4 w-4 text-elec-yellow" />
              <span className="text-xs text-elec-yellow">Interactive</span>
            </div>
          )}
        </div>
        <CardDescription className="text-gray-300">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{module.duration}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(module.priority)}`}>
                {module.priority}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Modules Covered:</h4>
            <div className="grid grid-cols-2 gap-1">
              {module.modules.map((mod, index) => (
                <div key={index} className="text-xs text-gray-400 flex items-center gap-1">
                  <Star className="h-2 w-2 text-elec-yellow" />
                  {mod}
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => onModuleClick(module.title, module.interactive)}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {module.interactive ? 'Start Interactive Module' : 'Access Module'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyModuleCard;