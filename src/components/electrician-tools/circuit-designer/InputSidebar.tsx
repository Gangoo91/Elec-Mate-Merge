import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DesignInputSummary } from './DesignInputSummary';
import { CircuitInput } from '@/types/installation-design';
import { Sparkles, Zap, Home, Building2, Factory, FlaskConical } from 'lucide-react';

interface InputSidebarProps {
  promptDescription: string;
  installationType: 'domestic' | 'commercial' | 'industrial';
  circuits: CircuitInput[];
  detectionConfidence: number;
}

const TEMPLATE_LIBRARY = [
  { 
    id: 'domestic-3bed',
    name: '3-Bed House',
    icon: Home,
    type: 'domestic' as const,
    circuits: 8,
    description: 'Standard 3-bedroom domestic installation'
  },
  { 
    id: 'commercial-office',
    name: 'Small Office',
    icon: Building2,
    type: 'commercial' as const,
    circuits: 12,
    description: 'Office with workstations and amenities'
  },
  { 
    id: 'industrial-workshop',
    name: 'Workshop',
    icon: Factory,
    type: 'industrial' as const,
    circuits: 10,
    description: '3-phase workshop with machinery'
  },
];

export const InputSidebar = ({
  promptDescription,
  installationType,
  circuits,
  detectionConfidence
}: InputSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* Live Design Preview */}
      <Card className="lg:sticky lg:top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Design Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DesignInputSummary
            promptDescription={promptDescription}
            installationType={installationType}
            circuits={circuits}
            detectionConfidence={detectionConfidence}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <FlaskConical className="h-4 w-4 mr-2" />
            Load Example Project
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Home className="h-4 w-4 mr-2" />
            Use Template
          </Button>
        </CardContent>
      </Card>

      {/* Template Library */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Popular Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {TEMPLATE_LIBRARY.map((template) => {
            const Icon = template.icon;
            return (
              <Button
                key={template.id}
                variant="ghost"
                size="sm"
                className="w-full justify-start h-auto py-2 px-3"
              >
                <div className="flex items-start gap-3 w-full text-left">
                  <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{template.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {template.circuits}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {template.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
