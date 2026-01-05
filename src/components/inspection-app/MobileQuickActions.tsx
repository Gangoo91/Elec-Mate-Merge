
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Zap } from 'lucide-react';

interface MobileQuickActionsProps {
  typicalValues: string[];
  onValueSelect: (value: string) => void;
  onApplyToAll: () => void;
  testType: any;
}

const MobileQuickActions = ({ typicalValues, onValueSelect, onApplyToAll, testType }: MobileQuickActionsProps) => {
  return (
    <div className="space-y-3">
      {/* Typical Values */}
      {typicalValues.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Quick Select</p>
          <div className="flex flex-wrap gap-2">
            {typicalValues.map((val, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onValueSelect(val)}
                className="text-xs"
              >
                {val}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Circuit Type Templates */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Circuit Templates</p>
        <div className="flex flex-wrap gap-2">
          {testType.id === 'continuity' && (
            <>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('0.05')}
              >
                Lighting (0.05Ω)
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('0.10')}
              >
                Ring Final (0.10Ω)
              </Badge>
            </>
          )}
          {testType.id === 'insulation' && (
            <>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('>500')}
              >
                New Installation ({'>'}500MΩ)
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('>200')}
              >
                Existing ({'>'}200MΩ)
              </Badge>
            </>
          )}
          {testType.id === 'zs' && (
            <>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('0.35')}
              >
                32A MCB (0.35Ω)
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted text-xs"
                onClick={() => onValueSelect('0.80')}
              >
                16A MCB (0.80Ω)
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Apply to All Button */}
      <Button
        variant="outline"
        onClick={onApplyToAll}
        className="w-full text-sm"
      >
        <Copy className="h-4 w-4 mr-2" />
        Apply to All Circuits
      </Button>
    </div>
  );
};

export default MobileQuickActions;
