import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Video, BookOpen, Download } from 'lucide-react';

const SafetyResources = () => {
  const resources = [
    {
      title: 'BS 7671 Safety Regulations',
      description: 'Complete safety requirements and procedures',
      type: 'PDF Guide',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Safe Isolation Video Guide',
      description: 'Step-by-step visual demonstration',
      type: 'Video Tutorial',
      icon: Video,
      color: 'text-green-400'
    },
    {
      title: 'PPE Selection Chart',
      description: 'Quick reference for protective equipment',
      type: 'Reference',
      icon: BookOpen,
      color: 'text-orange-400'
    },
    {
      title: 'Emergency Response Checklist',
      description: 'Downloadable emergency procedures',
      type: 'Checklist',
      icon: Download,
      color: 'text-red-400'
    }
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Safety Resources
        </CardTitle>
        <CardDescription className="text-gray-300">
          Essential safety documentation and reference materials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-accent`}>
                    <IconComponent className={`h-4 w-4 ${resource.color}`} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{resource.title}</h4>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">{resource.description}</p>
                    <span className={`text-xs ${resource.color} bg-accent px-2 py-0.5 rounded`}>
                      {resource.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Download className="h-4 w-4 mr-2" />
            Download Safety Resource Pack
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyResources;