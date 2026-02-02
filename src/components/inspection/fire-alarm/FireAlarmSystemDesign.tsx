import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Flame, Volume2, Bell, Plus, Trash2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface FireAlarmSystemDesignProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const FireAlarmSystemDesign: React.FC<FireAlarmSystemDesignProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    detectors: true,
    sounders: true,
    zones: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateDetectorCount = (type: string, value: string) => {
    const currentCounts = formData.detectorCount || {};
    // Allow empty string or convert to number
    const numValue = value === '' ? '' : parseInt(value) || 0;
    onUpdate('detectorCount', {
      ...currentCounts,
      [type]: numValue,
    });
  };

  const addZone = () => {
    const zones = formData.zones || [];
    const newZone = {
      id: `zone-${Date.now()}`,
      zoneNumber: zones.length + 1,
      zoneName: '',
      location: '',
      detectorCount: 0,
      callPointCount: 0,
      sounderCount: 0,
    };
    onUpdate('zones', [...zones, newZone]);
  };

  const updateZone = (id: string, field: string, value: any) => {
    const zones = formData.zones || [];
    const updatedZones = zones.map((zone: any) =>
      zone.id === id ? { ...zone, [field]: value } : zone
    );
    onUpdate('zones', updatedZones);
  };

  const removeZone = (id: string) => {
    const zones = formData.zones || [];
    onUpdate('zones', zones.filter((z: any) => z.id !== id));
  };

  const detectorCount = formData.detectorCount || {};

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Detection Equipment */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.detectors} onOpenChange={() => toggleSection('detectors')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Flame className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Detection Equipment</h3>
                  <span className="text-xs text-muted-foreground">Smoke, heat & specialist detectors</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.detectors && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Flame className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Detection Equipment</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.detectors && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-6",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Smoke Detectors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-elec-yellow flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                  Smoke Detectors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opticalSmoke" className="text-sm">Optical Smoke</Label>
                    <Input
                      id="opticalSmoke"
                      type="number"
                      min="0"
                      value={detectorCount.opticalSmoke ?? ''}
                      onChange={(e) => updateDetectorCount('opticalSmoke', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ionisationSmoke" className="text-sm">Ionisation Smoke</Label>
                    <Input
                      id="ionisationSmoke"
                      type="number"
                      min="0"
                      value={detectorCount.ionisationSmoke ?? ''}
                      onChange={(e) => updateDetectorCount('ionisationSmoke', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="multiSensor" className="text-sm">Multi-Sensor</Label>
                    <Input
                      id="multiSensor"
                      type="number"
                      min="0"
                      value={detectorCount.multiSensor ?? ''}
                      onChange={(e) => updateDetectorCount('multiSensor', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              </div>

              {/* Heat Detectors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-orange-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  Heat Detectors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="heatFixed" className="text-sm">Fixed Temperature</Label>
                    <Input
                      id="heatFixed"
                      type="number"
                      min="0"
                      value={detectorCount.heatFixed ?? ''}
                      onChange={(e) => updateDetectorCount('heatFixed', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heatRor" className="text-sm">Rate of Rise</Label>
                    <Input
                      id="heatRor"
                      type="number"
                      min="0"
                      value={detectorCount.heatRor ?? ''}
                      onChange={(e) => updateDetectorCount('heatRor', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              </div>

              {/* Specialist Detectors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-purple-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  Specialist Detectors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beam" className="text-sm">Beam Detectors</Label>
                    <Input
                      id="beam"
                      type="number"
                      min="0"
                      value={detectorCount.beam ?? ''}
                      onChange={(e) => updateDetectorCount('beam', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aspirating" className="text-sm">Aspirating</Label>
                    <Input
                      id="aspirating"
                      type="number"
                      min="0"
                      value={detectorCount.aspirating ?? ''}
                      onChange={(e) => updateDetectorCount('aspirating', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flame" className="text-sm">Flame Detectors</Label>
                    <Input
                      id="flame"
                      type="number"
                      min="0"
                      value={detectorCount.flame ?? ''}
                      onChange={(e) => updateDetectorCount('flame', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="co" className="text-sm">CO Detectors</Label>
                    <Input
                      id="co"
                      type="number"
                      min="0"
                      value={detectorCount.co ?? ''}
                      onChange={(e) => updateDetectorCount('co', e.target.value)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Sounders & Call Points */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.sounders} onOpenChange={() => toggleSection('sounders')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Volume2 className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Sounders & Call Points</h3>
                  <span className="text-xs text-muted-foreground">Alarm devices count</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.sounders && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-white font-semibold">Sounders & Call Points</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.sounders && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callPointCount" className="text-sm">Manual Call Points</Label>
                  <Input
                    id="callPointCount"
                    type="number"
                    min="0"
                    value={formData.callPointCount ?? ''}
                    onChange={(e) => onUpdate('callPointCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sounderCount" className="text-sm">Sounders</Label>
                  <Input
                    id="sounderCount"
                    type="number"
                    min="0"
                    value={formData.sounderCount ?? ''}
                    onChange={(e) => onUpdate('sounderCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visualAlarmCount" className="text-sm">Visual Alarm Devices</Label>
                  <Input
                    id="visualAlarmCount"
                    type="number"
                    min="0"
                    value={formData.visualAlarmCount ?? ''}
                    onChange={(e) => onUpdate('visualAlarmCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              {/* Total Equipment Summary */}
              <div className="bg-black/40 rounded-xl p-4 mt-4">
                <h4 className="font-medium mb-3 text-sm text-elec-yellow">Equipment Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-red-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">
                      {Object.values(detectorCount).reduce((sum: number, val: any) => sum + (parseInt(val) || 0), 0)}
                    </p>
                    <p className="text-white/60 text-xs">Detectors</p>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{formData.callPointCount || 0}</p>
                    <p className="text-white/60 text-xs">Call Points</p>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-orange-400">
                      {(formData.sounderCount || 0) + (formData.visualAlarmCount || 0)}
                    </p>
                    <p className="text-white/60 text-xs">Alarm Devices</p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Zone Schedule */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.zones} onOpenChange={() => toggleSection('zones')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Zone Schedule</h3>
                  <span className="text-xs text-muted-foreground">{(formData.zones || []).length} zones configured</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.zones && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Zone Schedule</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.zones && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Zone list */}
              {(formData.zones || []).map((zone: any) => (
                <div key={zone.id} className="bg-black/40 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4 text-red-400" />
                      Zone {zone.zoneNumber}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeZone(zone.id)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Zone Name</Label>
                      <Input
                        placeholder="e.g., Ground Floor Corridor"
                        value={zone.zoneName || ''}
                        onChange={(e) => updateZone(zone.id, 'zoneName', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Location/Area</Label>
                      <Input
                        placeholder="e.g., Main building"
                        value={zone.location || ''}
                        onChange={(e) => updateZone(zone.id, 'location', e.target.value)}
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Detectors</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.detectorCount ?? ''}
                        onChange={(e) => updateZone(zone.id, 'detectorCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Call Points</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.callPointCount ?? ''}
                        onChange={(e) => updateZone(zone.id, 'callPointCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Sounders</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.sounderCount ?? ''}
                        onChange={(e) => updateZone(zone.id, 'sounderCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-10 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                onClick={addZone}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Zone
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FireAlarmSystemDesign;
