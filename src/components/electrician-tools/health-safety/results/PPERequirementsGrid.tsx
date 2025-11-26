import { HardHat, Eye, Hand, Shirt, Shield, AlertTriangle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface PPERequirementsGridProps {
  ppeItems: any[];
  isEditing?: boolean;
  onUpdate?: (index: number, field: string, value: any) => void;
  onDelete?: (index: number) => void;
  onAdd?: () => void;
}

// Map PPE types to icons
const getPPEIcon = (ppeType: string) => {
  const type = ppeType.toLowerCase();
  if (type.includes('helmet') || type.includes('hard hat') || type.includes('head')) return HardHat;
  if (type.includes('eye') || type.includes('goggle') || type.includes('face')) return Eye;
  if (type.includes('glove') || type.includes('hand')) return Hand;
  if (type.includes('vest') || type.includes('clothing') || type.includes('overall')) return Shirt;
  return Shield;
};

export const PPERequirementsGrid = ({ ppeItems, isEditing = false, onUpdate, onDelete, onAdd }: PPERequirementsGridProps) => {
  if (!ppeItems || ppeItems.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Required PPE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {ppeItems.map((item, idx) => {
            const IconComponent = getPPEIcon(item.ppeType);
            const isMandatory = item.mandatory;

            return (
              <div
                key={idx}
                className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 hover:bg-amber-500/10 transition-all relative"
              >
                {isEditing && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete?.(idx)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-2 flex items-start gap-2">
                      {isEditing ? (
                        <Input
                          value={item.ppeType}
                          onChange={(e) => onUpdate?.(idx, 'ppeType', e.target.value)}
                          className="flex-1"
                        />
                      ) : (
                        <span className="flex-1">{item.ppeType}</span>
                      )}
                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Checkbox
                            checked={isMandatory}
                            onCheckedChange={(checked) => onUpdate?.(idx, 'mandatory', checked)}
                          />
                          <span className="text-xs">Mandatory</span>
                        </div>
                      ) : (
                        <>
                          {isMandatory && (
                            <Badge className="bg-red-100 text-red-800 border-red-500/30 flex-shrink-0">
                              MANDATORY
                            </Badge>
                          )}
                          {!isMandatory && (
                            <Badge variant="outline" className="flex-shrink-0">
                              Recommended
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Input
                            value={item.standard}
                            onChange={(e) => onUpdate?.(idx, 'standard', e.target.value)}
                            placeholder="e.g., BS EN 397"
                            className="text-xs"
                          />
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {item.standard}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Purpose:</span>{' '}
                        {isEditing ? (
                          <Input
                            value={item.purpose}
                            onChange={(e) => onUpdate?.(idx, 'purpose', e.target.value)}
                            placeholder="Enter purpose..."
                            className="mt-1"
                          />
                        ) : (
                          item.purpose
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isEditing && (
          <Button 
            onClick={onAdd}
            variant="outline"
            className="w-full mt-3"
          >
            Add PPE Item
          </Button>
        )}

        {/* Safety Note */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Safety Note:</span> All mandatory PPE must be worn before commencing work. Ensure all equipment meets the specified standards and is in good condition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
