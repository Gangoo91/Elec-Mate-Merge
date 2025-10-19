import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Building2, Factory } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstallationTypeDetectionProps {
  detectedType: 'domestic' | 'commercial' | 'industrial';
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onTypeChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
  confidence?: number;
}

export const InstallationTypeDetection = ({
  detectedType,
  selectedType,
  onTypeChange,
  confidence = 0
}: InstallationTypeDetectionProps) => {
  const types = [
    { value: 'domestic' as const, label: 'Domestic', icon: Home },
    { value: 'commercial' as const, label: 'Commercial', icon: Building2 },
    { value: 'industrial' as const, label: 'Industrial', icon: Factory }
  ];

  const isDetected = confidence > 0;

  return (
    <div className="space-y-2 sm:space-y-3">
      {isDetected && (
        <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
          <span className="text-muted-foreground">AI detected:</span>
          <Badge variant="secondary" className="gap-1 text-xs">
            {types.find(t => t.value === detectedType)?.label}
            <span className="text-xs opacity-70">({confidence}%)</span>
          </Badge>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {types.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            variant={selectedType === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onTypeChange(value)}
            className={cn(
              'min-w-[100px] sm:min-w-[120px] h-10 gap-2 touch-manipulation',
              selectedType === value && 'shadow-sm'
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
