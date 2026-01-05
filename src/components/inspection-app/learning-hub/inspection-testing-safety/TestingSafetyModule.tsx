import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ChevronRight, Zap, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TestingSafetyModule {
  id: string;
  title: string;
  description: string;
  priority: string;
  duration: string;
  topics: string[];
  color: string;
  icon: LucideIcon;
  interactive?: boolean;
}

interface TestingSafetyModuleProps {
  module: TestingSafetyModule;
  onModuleClick: (moduleId: string) => void;
}

const TestingSafetyModule = ({ module, onModuleClick }: TestingSafetyModuleProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'essential': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'required': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-white border-gray-500/30';
    }
  };

  const IconComponent = module.icon;

  return (
    <Card className={`border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${module.color}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <IconComponent className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{module.title}</h3>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 ${getPriorityColor(module.priority)}`}>
                  {module.priority}
                </Badge>
                {module.interactive && (
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs px-2 py-1">
                    <Zap className="h-3 w-3 mr-1" />
                    Interactive
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-white/80">
            <Clock className="h-4 w-4" />
            {module.duration}
          </div>
        </div>

        <p className="text-white text-sm mb-4 leading-relaxed">
          {module.description}
        </p>

        <div className="mb-6">
          <p className="text-xs text-white/80 mb-2 font-medium">Key Topics Covered:</p>
          <div className="flex flex-wrap gap-2">
            {module.topics.map((topic, index) => (
              <span
                key={index}
                className="text-xs bg-white/10 text-white px-2 py-1 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={() => onModuleClick(module.id)}
          className="w-full bg-white/10 hover:bg-white/20 text-foreground border-0"
        >
          {module.interactive ? 'Start Interactive Learning' : 'Begin Module'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestingSafetyModule;