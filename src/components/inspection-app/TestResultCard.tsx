
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Trash2 } from 'lucide-react';

interface TestResult {
  id: string;
  circuitDesignation: string;
  type: string;
  liveNeutral: string;
  liveEarth: string;
  neutralEarth: string;
  r1r2: string;
  zs: string;
  rcdRating: string;
  rcdOperatingTime: string;
  insulationResistance: string;
  polarity: string;
  earthFaultLoop: string;
  functionalTesting: string;
}

interface TestResultCardProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  circuitTypes: string[];
}

const TestResultCard = ({ result, onUpdate, onRemove, circuitTypes }: TestResultCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle className="text-base">
                {result.circuitDesignation || 'New Circuit'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {result.type || 'Circuit Type'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(result.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Basic Circuit Info */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`circuit-${result.id}`}>Circuit Designation</Label>
                <Input
                  id={`circuit-${result.id}`}
                  value={result.circuitDesignation}
                  onChange={(e) => onUpdate(result.id, 'circuitDesignation', e.target.value)}
                  placeholder="DB1-C1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-${result.id}`}>Type of Circuit</Label>
                <MobileSelectPicker
                  value={result.type}
                  onValueChange={(value) => onUpdate(result.id, 'type', value)}
                  options={circuitTypes.map((type) => ({ value: type, label: type }))}
                  placeholder="Select circuit type"
                  title="Type of Circuit"
                />
              </div>
            </div>

            {/* Continuity Tests */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground border-b pb-1">
                Continuity of Protective Conductors
              </h4>
              <div className="space-y-2">
                <Label htmlFor={`r1r2-${result.id}`}>R1+R2 (Ω)</Label>
                <Input
                  id={`r1r2-${result.id}`}
                  value={result.r1r2}
                  onChange={(e) => onUpdate(result.id, 'r1r2', e.target.value)}
                  placeholder="0.52"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`earthFaultLoop-${result.id}`}>r1+r2 (Ω)</Label>
                <Input
                  id={`earthFaultLoop-${result.id}`}
                  value={result.earthFaultLoop}
                  onChange={(e) => onUpdate(result.id, 'earthFaultLoop', e.target.value)}
                  placeholder="0.65"
                />
              </div>
            </div>

            {/* Insulation Resistance */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground border-b pb-1">
                Insulation Resistance
              </h4>
              <div className="space-y-2">
                <Label htmlFor={`insulation-${result.id}`}>L-N | L-E | N-E (MΩ)</Label>
                <Input
                  id={`insulation-${result.id}`}
                  value={result.insulationResistance}
                  onChange={(e) => onUpdate(result.id, 'insulationResistance', e.target.value)}
                  placeholder=">999"
                />
              </div>
            </div>

            {/* Other Tests */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`polarity-${result.id}`}>Polarity</Label>
                <Input
                  id={`polarity-${result.id}`}
                  value={result.polarity}
                  onChange={(e) => onUpdate(result.id, 'polarity', e.target.value)}
                  placeholder="✓"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`zs-${result.id}`}>Zs (Ω)</Label>
                <Input
                  id={`zs-${result.id}`}
                  value={result.zs}
                  onChange={(e) => onUpdate(result.id, 'zs', e.target.value)}
                  placeholder="0.65"
                />
              </div>
            </div>

            {/* RCD and Functional Tests */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`rcdTime-${result.id}`}>RCD Time (ms)</Label>
                <Input
                  id={`rcdTime-${result.id}`}
                  value={result.rcdOperatingTime}
                  onChange={(e) => onUpdate(result.id, 'rcdOperatingTime', e.target.value)}
                  placeholder="18ms"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`functional-${result.id}`}>Functional Testing</Label>
                <Input
                  id={`functional-${result.id}`}
                  value={result.functionalTesting}
                  onChange={(e) => onUpdate(result.id, 'functionalTesting', e.target.value)}
                  placeholder="✓"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TestResultCard;
