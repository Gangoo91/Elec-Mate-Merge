import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Save, Trash2, Zap, TestTube, Shield, Check, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestResult } from '@/types/testResult';
import { useHaptics } from '@/hooks/useHaptics';
import TestValueGrid from './TestValueGrid';

interface CircuitEditSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuit: TestResult | null;
  onSave: (circuit: TestResult) => void;
  onDelete?: () => void;
}

/**
 * CircuitEditSheet - Full bottom sheet editor for circuit test data
 * Height: 85vh for maximum editing space while keeping context
 */
const CircuitEditSheet: React.FC<CircuitEditSheetProps> = ({
  open,
  onOpenChange,
  circuit,
  onSave,
  onDelete,
}) => {
  const haptics = useHaptics();
  const [editedCircuit, setEditedCircuit] = useState<TestResult | null>(null);
  const [activeTab, setActiveTab] = useState('tests');

  useEffect(() => {
    if (circuit) {
      setEditedCircuit({ ...circuit });
    }
  }, [circuit]);

  if (!editedCircuit) return null;

  const updateField = (field: keyof TestResult, value: string) => {
    setEditedCircuit(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = () => {
    if (editedCircuit) {
      haptics.success();
      onSave(editedCircuit);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      haptics.impact();
      onDelete();
      onOpenChange(false);
    }
  };

  // Check if circuit has essential test data
  const hasEssentialTests = editedCircuit.zs && editedCircuit.polarity &&
    (editedCircuit.insulationLiveEarth || editedCircuit.insulationResistance);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-white/10 bg-card/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center font-bold",
                  hasEssentialTests ? "bg-green-500/20 text-green-400" : "bg-elec-yellow/20 text-elec-yellow"
                )}>
                  {editedCircuit.circuitDesignation || `C${editedCircuit.circuitNumber}`}
                </div>
                <div>
                  <SheetTitle className="text-left text-base">
                    {editedCircuit.circuitDescription || 'New Circuit'}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    {editedCircuit.circuitType || 'Tap to configure'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasEssentialTests && (
                  <Check className="h-5 w-5 text-green-400" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full justify-start rounded-none border-b border-white/10 bg-transparent h-12 px-4 gap-1">
              <TabsTrigger
                value="tests"
                className="h-10 px-4 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow touch-manipulation"
              >
                <TestTube className="h-4 w-4 mr-2" />
                Tests
              </TabsTrigger>
              <TabsTrigger
                value="circuit"
                className="h-10 px-4 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow touch-manipulation"
              >
                <Zap className="h-4 w-4 mr-2" />
                Circuit
              </TabsTrigger>
              <TabsTrigger
                value="protection"
                className="h-10 px-4 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow touch-manipulation"
              >
                <Shield className="h-4 w-4 mr-2" />
                Protection
              </TabsTrigger>
            </TabsList>

            {/* Tests Tab - Quick entry grid */}
            <TabsContent value="tests" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <TestValueGrid
                circuit={editedCircuit}
                onUpdate={updateField}
              />

              {/* Ring final tests (if applicable) */}
              {editedCircuit.circuitType?.toLowerCase().includes('ring') && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-white/60">Ring Final Tests</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50">Ring R1</Label>
                      <Input
                        value={editedCircuit.ringR1 || ''}
                        onChange={(e) => updateField('ringR1', e.target.value)}
                        placeholder="Ω"
                        className="h-11 text-base text-center touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50">Ring Rn</Label>
                      <Input
                        value={editedCircuit.ringRn || ''}
                        onChange={(e) => updateField('ringRn', e.target.value)}
                        placeholder="Ω"
                        className="h-11 text-base text-center touch-manipulation"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50">Ring R2</Label>
                      <Input
                        value={editedCircuit.ringR2 || ''}
                        onChange={(e) => updateField('ringR2', e.target.value)}
                        placeholder="Ω"
                        className="h-11 text-base text-center touch-manipulation"
                      />
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Circuit Tab */}
            <TabsContent value="circuit" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Description</Label>
                <Input
                  value={editedCircuit.circuitDescription || ''}
                  onChange={(e) => updateField('circuitDescription', e.target.value)}
                  placeholder="e.g. Kitchen Sockets"
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Circuit Type</Label>
                <Select
                  value={editedCircuit.circuitType || ''}
                  onValueChange={(v) => updateField('circuitType', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ring Final">Ring Final</SelectItem>
                    <SelectItem value="Radial">Radial</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                    <SelectItem value="Cooker">Cooker</SelectItem>
                    <SelectItem value="Shower">Shower</SelectItem>
                    <SelectItem value="Immersion">Immersion</SelectItem>
                    <SelectItem value="EV Charger">EV Charger</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Live Size (mm²)</Label>
                  <Select
                    value={editedCircuit.liveSize || ''}
                    onValueChange={(v) => updateField('liveSize', v)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="4.0">4.0</SelectItem>
                      <SelectItem value="6.0">6.0</SelectItem>
                      <SelectItem value="10.0">10.0</SelectItem>
                      <SelectItem value="16.0">16.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">CPC Size (mm²)</Label>
                  <Select
                    value={editedCircuit.cpcSize || ''}
                    onValueChange={(v) => updateField('cpcSize', v)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="4.0">4.0</SelectItem>
                      <SelectItem value="6.0">6.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Wiring Type</Label>
                <Select
                  value={editedCircuit.typeOfWiring || ''}
                  onValueChange={(v) => updateField('typeOfWiring', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select wiring" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Twin & CPC">Twin & CPC</SelectItem>
                    <SelectItem value="Singles in Conduit">Singles in Conduit</SelectItem>
                    <SelectItem value="SWA">SWA</SelectItem>
                    <SelectItem value="MICC">MICC</SelectItem>
                    <SelectItem value="Flex">Flex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Points Served</Label>
                <Input
                  value={editedCircuit.pointsServed || ''}
                  onChange={(e) => updateField('pointsServed', e.target.value)}
                  placeholder="Number of points"
                  type="number"
                  className="h-11 text-base touch-manipulation"
                />
              </div>
            </TabsContent>

            {/* Protection Tab */}
            <TabsContent value="protection" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-white/50">Protective Device Type</Label>
                <Select
                  value={editedCircuit.protectiveDeviceType || ''}
                  onValueChange={(v) => updateField('protectiveDeviceType', v)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MCB">MCB</SelectItem>
                    <SelectItem value="RCBO">RCBO</SelectItem>
                    <SelectItem value="RCD">RCD</SelectItem>
                    <SelectItem value="Fuse">Fuse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Rating (A)</Label>
                  <Select
                    value={editedCircuit.protectiveDeviceRating || ''}
                    onValueChange={(v) => updateField('protectiveDeviceRating', v)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Amps" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6A</SelectItem>
                      <SelectItem value="10">10A</SelectItem>
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                      <SelectItem value="40">40A</SelectItem>
                      <SelectItem value="50">50A</SelectItem>
                      <SelectItem value="63">63A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Curve</Label>
                  <Select
                    value={editedCircuit.protectiveDeviceCurve || ''}
                    onValueChange={(v) => updateField('protectiveDeviceCurve', v)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Curve" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">Max Zs (Ω)</Label>
                  <Input
                    value={editedCircuit.maxZs || ''}
                    onChange={(e) => updateField('maxZs', e.target.value)}
                    placeholder="From tables"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-white/50">kA Rating</Label>
                  <Input
                    value={editedCircuit.protectiveDeviceKaRating || ''}
                    onChange={(e) => updateField('protectiveDeviceKaRating', e.target.value)}
                    placeholder="kA"
                    className="h-11 text-base touch-manipulation"
                  />
                </div>
              </div>

              {/* RCD Section */}
              {(editedCircuit.protectiveDeviceType === 'RCBO' || editedCircuit.protectiveDeviceType === 'RCD') && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-medium text-white/60">RCD Details</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50">RCD Type</Label>
                      <Select
                        value={editedCircuit.rcdType || ''}
                        onValueChange={(v) => updateField('rcdType', v)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Type AC">Type AC</SelectItem>
                          <SelectItem value="Type A">Type A</SelectItem>
                          <SelectItem value="Type F">Type F</SelectItem>
                          <SelectItem value="Type B">Type B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-white/50">RCD Rating (mA)</Label>
                      <Select
                        value={editedCircuit.rcdRating || ''}
                        onValueChange={(v) => updateField('rcdRating', v)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="mA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30mA</SelectItem>
                          <SelectItem value="100">100mA</SelectItem>
                          <SelectItem value="300">300mA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Bottom Action Bar */}
          <div className="px-4 py-3 border-t border-white/10 bg-card/50 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-3">
              {onDelete && (
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="h-14 px-4 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation active:scale-95 transition-transform"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              )}
              <Button
                onClick={handleSave}
                className="flex-1 h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-95 transition-transform"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CircuitEditSheet;
