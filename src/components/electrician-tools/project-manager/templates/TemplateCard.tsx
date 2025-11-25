import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building2, Factory, Zap, ChefHat, ShoppingBag, Box, Lightbulb, Settings, Building } from 'lucide-react';

interface TemplateCardProps {
  templateName: string;
  description: string;
  estimatedDays: number;
  difficulty: 'simple' | 'moderate' | 'complex';
  icon: string;
  tags: string[];
  onUseTemplate: () => void;
}

const iconMap: Record<string, any> = {
  Home,
  Building2,
  Factory,
  Zap,
  ChefHat,
  ShoppingBag,
  Box,
  Lightbulb,
  Settings,
  Building,
};

const difficultyConfig = {
  simple: { label: 'Simple', color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  moderate: { label: 'Moderate', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  complex: { label: 'Complex', color: 'bg-red-500/10 text-red-600 border-red-500/20' },
};

export const TemplateCard = ({
  templateName,
  description,
  estimatedDays,
  difficulty,
  icon,
  tags,
  onUseTemplate,
}: TemplateCardProps) => {
  const Icon = iconMap[icon] || Home;
  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <Card className="hover:border-elec-yellow/40 transition-colors cursor-pointer h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-elec-yellow/10 rounded-lg">
              <Icon className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="space-y-1 flex-1">
              <CardTitle className="text-base leading-tight">{templateName}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyInfo.color}`}>
                  {difficultyInfo.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {estimatedDays} {estimatedDays === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <CardDescription className="text-sm mb-4">
          {description}
        </CardDescription>

        <div className="space-y-3">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <Button
            onClick={onUseTemplate}
            className="w-full mobile-button-primary"
            size="sm"
          >
            Use This Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
