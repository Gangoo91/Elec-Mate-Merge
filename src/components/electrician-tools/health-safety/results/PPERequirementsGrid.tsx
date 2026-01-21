import { HardHat, Eye, Hand, Shirt, Shield, AlertTriangle, Trash2, Edit2, Save, X, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

interface PPERequirementsGridProps {
  ppeItems: any[];
  onUpdate?: (updatedPPE: any[]) => void;
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

export const PPERequirementsGrid = ({ ppeItems, onUpdate }: PPERequirementsGridProps) => {
  const { isMobile } = useMobileEnhanced();
  const [isEditing, setIsEditing] = useState(false);
  const [localPPE, setLocalPPE] = useState(ppeItems);

  if (!ppeItems || ppeItems.length === 0) return null;

  const handleSave = () => {
    onUpdate?.(localPPE);
    setIsEditing(false);
    toast.success("PPE changes saved");
  };

  const handleCancel = () => {
    setLocalPPE(ppeItems);
    setIsEditing(false);
  };

  const handlePPEUpdate = (index: number, field: string, value: any) => {
    const updated = [...localPPE];
    updated[index] = { ...updated[index], [field]: value };
    setLocalPPE(updated);
  };

  const handlePPEDelete = (index: number) => {
    setLocalPPE(localPPE.filter((_, idx) => idx !== index));
  };

  const handleAddPPE = () => {
    setLocalPPE([...localPPE, {
      ppeType: "New PPE Item",
      standard: "BS EN",
      purpose: "Enter purpose",
      mandatory: false
    }]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Required PPE
          </CardTitle>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className={cn(
                  "bg-green-600 hover:bg-green-700 text-foreground touch-manipulation active:scale-[0.98]",
                  isMobile && "min-h-[44px] px-4"
                )}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className={cn(
                  "touch-manipulation active:scale-[0.98]",
                  isMobile && "min-h-[44px] px-4"
                )}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className={cn(
                "touch-manipulation active:scale-[0.98]",
                isMobile && "min-h-[44px] px-4"
              )}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {localPPE.map((item, idx) => {
            const IconComponent = getPPEIcon(item.ppeType);
            const isMandatory = item.mandatory;

            return (
              <div
                key={idx}
                className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 hover:bg-amber-500/10 transition-all relative"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handlePPEDelete(idx)}
                  className={cn(
                    "absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-100 touch-manipulation active:scale-[0.95]",
                    isMobile ? "h-11 w-11" : "h-8 w-8"
                  )}
                >
                  <Trash2 className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                    <div className="font-semibold text-sm mb-2 flex flex-col items-center gap-2 sm:flex-row sm:items-start">
                      {isEditing ? (
                        <Input
                          value={item.ppeType}
                          onChange={(e) => handlePPEUpdate(idx, 'ppeType', e.target.value)}
                          className={cn(
                            "flex-1 w-full touch-manipulation",
                            isMobile && "min-h-[48px] text-base"
                          )}
                        />
                      ) : (
                        <span className="flex-1">{item.ppeType}</span>
                      )}
                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Checkbox
                            checked={isMandatory}
                            onCheckedChange={(checked) => handlePPEUpdate(idx, 'mandatory', checked)}
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
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        {isEditing ? (
                          <Input
                            value={item.standard}
                            onChange={(e) => handlePPEUpdate(idx, 'standard', e.target.value)}
                            placeholder="e.g., BS EN 397"
                            className={cn(
                              "touch-manipulation",
                              isMobile ? "min-h-[48px] text-base" : "text-xs"
                            )}
                          />
                        ) : (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {item.standard}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-foreground">
                        <span className="font-medium">Purpose:</span>{' '}
                        {isEditing ? (
                          <Input
                            value={item.purpose}
                            onChange={(e) => handlePPEUpdate(idx, 'purpose', e.target.value)}
                            placeholder="Enter purpose..."
                            className={cn(
                              "mt-1 touch-manipulation",
                              isMobile && "min-h-[48px] text-base"
                            )}
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
            onClick={handleAddPPE}
            variant="outline"
            className={cn(
              "w-full mt-3 touch-manipulation active:scale-[0.98]",
              isMobile && "min-h-[48px]"
            )}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add PPE Item
          </Button>
        )}

        {/* Safety Note */}
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              <span className="font-semibold text-foreground">Safety Note:</span> All mandatory PPE must be worn before commencing work. Ensure all equipment meets the specified standards and is in good condition.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
