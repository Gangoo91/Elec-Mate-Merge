import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, Flame, Volume2, Bell, Plus, Trash2, MapPin, Cpu, Wind, Grid3X3, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFireAlarmRecentValues } from '@/hooks/inspection/useFireAlarmRecentValues';

interface FireAlarmSystemDesignProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const FireAlarmSystemDesign: React.FC<FireAlarmSystemDesignProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const { recentValues } = useFireAlarmRecentValues();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    detectors: true,
    sounders: true,
    zones: true,
    loopDetails: false,
    aspirating: false,
    detectorSpacing: false,
  });

  // B2: Auto-sum device totals
  const detectorCount = formData.detectorCount || {};
  const totalDetectors = useMemo(() => {
    return Object.values(detectorCount).reduce(
      (sum: number, val: any) => sum + (parseInt(val) || 0),
      0
    );
  }, [detectorCount]);

  const totalDevices = useMemo(() => {
    return totalDetectors + (parseInt(formData.callPointCount) || 0) + (parseInt(formData.sounderCount) || 0) + (parseInt(formData.visualAlarmCount) || 0);
  }, [totalDetectors, formData.callPointCount, formData.sounderCount, formData.visualAlarmCount]);

  // For periodic certs, auto-set devicesTotalCount
  useEffect(() => {
    if (formData.certificateType === 'periodic' && totalDevices > 0 && totalDevices !== formData.devicesTotalCount) {
      onUpdate('devicesTotalCount', totalDevices);
    }
  }, [formData.certificateType, totalDevices, formData.devicesTotalCount, onUpdate]);

  // B3: Cross-validate zone counts
  const zonesArray = formData.zones || [];
  const zoneCountWarning = useMemo(() => {
    if (zonesArray.length > 0 && formData.zonesCount > 0 && zonesArray.length !== formData.zonesCount) {
      return `Zone schedule has ${zonesArray.length} zones but zone count is set to ${formData.zonesCount}`;
    }
    return null;
  }, [zonesArray.length, formData.zonesCount]);

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
    onUpdate(
      'zones',
      zones.filter((z: any) => z.id !== id)
    );
  };

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-6')}>
      {/* Detection Equipment */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.detectors} onOpenChange={() => toggleSection('detectors')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Flame className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Detection Equipment</h3>
                  <span className="text-xs text-white">
                    Smoke, heat & specialist detectors
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.detectors && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Flame className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Detection Equipment</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.detectors && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-6', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Smoke Detectors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-elec-yellow flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                  Smoke Detectors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opticalSmoke" className="text-sm">
                      Optical Smoke
                    </Label>
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
                    <Label htmlFor="ionisationSmoke" className="text-sm">
                      Ionisation Smoke
                    </Label>
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
                    <Label htmlFor="multiSensor" className="text-sm">
                      Multi-Sensor
                    </Label>
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
                    <Label htmlFor="heatFixed" className="text-sm">
                      Fixed Temperature
                    </Label>
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
                    <Label htmlFor="heatRor" className="text-sm">
                      Rate of Rise
                    </Label>
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
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beam" className="text-sm">
                      Beam Detectors
                    </Label>
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
                    <Label htmlFor="aspirating" className="text-sm">
                      Aspirating
                    </Label>
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
                    <Label htmlFor="flame" className="text-sm">
                      Flame Detectors
                    </Label>
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
                    <Label htmlFor="co" className="text-sm">
                      CO Detectors
                    </Label>
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
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.sounders} onOpenChange={() => toggleSection('sounders')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <Volume2 className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Sounders & Call Points</h3>
                  <span className="text-xs text-white">Alarm devices count</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.sounders && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-white font-semibold">Sounders & Call Points</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.sounders && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callPointCount" className="text-sm">
                    Manual Call Points
                  </Label>
                  <Input
                    id="callPointCount"
                    type="number"
                    min="0"
                    value={formData.callPointCount ?? ''}
                    onChange={(e) =>
                      onUpdate(
                        'callPointCount',
                        e.target.value === '' ? '' : parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sounderCount" className="text-sm">
                    Sounders
                  </Label>
                  <Input
                    id="sounderCount"
                    type="number"
                    min="0"
                    value={formData.sounderCount ?? ''}
                    onChange={(e) =>
                      onUpdate(
                        'sounderCount',
                        e.target.value === '' ? '' : parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visualAlarmCount" className="text-sm">
                    Visual Alarm Devices
                  </Label>
                  <Input
                    id="visualAlarmCount"
                    type="number"
                    min="0"
                    value={formData.visualAlarmCount ?? ''}
                    onChange={(e) =>
                      onUpdate(
                        'visualAlarmCount',
                        e.target.value === '' ? '' : parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              {/* Total Equipment Summary */}
              <div className="bg-black/40 rounded-xl p-4 mt-4">
                <h4 className="font-medium mb-3 text-sm text-elec-yellow">Equipment Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="flex sm:flex-col sm:text-center items-center sm:items-stretch gap-3 sm:gap-0 p-3 bg-red-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">{totalDetectors}</p>
                    <p className="text-white text-sm sm:text-xs">Detectors</p>
                  </div>
                  <div className="flex sm:flex-col sm:text-center items-center sm:items-stretch gap-3 sm:gap-0 p-3 bg-green-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{parseInt(formData.callPointCount) || 0}</p>
                    <p className="text-white text-sm sm:text-xs">Call Points</p>
                  </div>
                  <div className="flex sm:flex-col sm:text-center items-center sm:items-stretch gap-3 sm:gap-0 p-3 bg-orange-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-orange-400">{(parseInt(formData.sounderCount) || 0) + (parseInt(formData.visualAlarmCount) || 0)}</p>
                    <p className="text-white text-sm sm:text-xs">Alarm Devices</p>
                  </div>
                  <div className="flex sm:flex-col sm:text-center items-center sm:items-stretch gap-3 sm:gap-0 p-3 bg-elec-yellow/10 rounded-lg">
                    <p className="text-2xl font-bold text-elec-yellow">{totalDevices}</p>
                    <p className="text-white text-sm sm:text-xs">Total</p>
                  </div>
                </div>
                {formData.certificateType === 'periodic' && totalDevices > 0 && (
                  <p className="text-xs text-green-400 mt-2">Total devices auto-set for periodic testing</p>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Zone Schedule */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.zones} onOpenChange={() => toggleSection('zones')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Zone Schedule</h3>
                  <span className="text-xs text-white">
                    {(formData.zones || []).length} zones configured
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.zones && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Zone Schedule</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.zones && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* B3: Zone count mismatch warning */}
              {zoneCountWarning && (
                <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-300">{zoneCountWarning}</p>
                </div>
              )}
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
                      className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-transform"
                      aria-label="Remove zone"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Zone Name</Label>
                      <Input
                        list="recentZoneNames"
                        placeholder="e.g., Ground Floor Corridor"
                        value={zone.zoneName || ''}
                        onChange={(e) => updateZone(zone.id, 'zoneName', e.target.value)}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                      {recentValues.zoneNames.length > 0 && (
                        <datalist id="recentZoneNames">
                          {recentValues.zoneNames.map((v) => <option key={v} value={v} />)}
                        </datalist>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Location/Area</Label>
                      <Input
                        placeholder="e.g., Main building"
                        value={zone.location || ''}
                        onChange={(e) => updateZone(zone.id, 'location', e.target.value)}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Detectors</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.detectorCount ?? ''}
                        onChange={(e) =>
                          updateZone(
                            zone.id,
                            'detectorCount',
                            e.target.value === '' ? '' : parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Call Points</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.callPointCount ?? ''}
                        onChange={(e) =>
                          updateZone(
                            zone.id,
                            'callPointCount',
                            e.target.value === '' ? '' : parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Sounders</Label>
                      <Input
                        type="number"
                        min="0"
                        value={zone.sounderCount ?? ''}
                        onChange={(e) =>
                          updateZone(
                            zone.id,
                            'sounderCount',
                            e.target.value === '' ? '' : parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="0"
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
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

              {/* Zone Plan Reference */}
              <div className="space-y-3 pt-2">
                <h4 className="font-medium text-sm text-blue-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  Zone Plan Reference
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Zone Plan Reference</Label>
                    <Input
                      placeholder="e.g., ZP-001"
                      value={formData.zonePlanRef || ''}
                      onChange={(e) => onUpdate('zonePlanRef', e.target.value)}
                      className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Zone Plan Date</Label>
                    <Input
                      type="date"
                      value={formData.zonePlanDate || ''}
                      onChange={(e) => onUpdate('zonePlanDate', e.target.value)}
                      className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Loop/Addressable Device Count - conditional on addressable/analogue */}
      {['addressable', 'analogue', 'networked'].includes(formData.networkType) && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.loopDetails} onOpenChange={() => toggleSection('loopDetails')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Loop Details</h3>
                    <span className="text-xs text-white">Addressable device counts</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.loopDetails && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                      <Cpu className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-white font-semibold">Loop/Addressable Details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.loopDetails && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Loop Count</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.loopCount || ''}
                      onChange={(e) => onUpdate('loopCount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Devices Per Loop</Label>
                    <Input
                      placeholder="e.g., 126"
                      value={formData.devicesPerLoop || ''}
                      onChange={(e) => onUpdate('devicesPerLoop', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Total Addressable</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.totalAddressableDevices || ''}
                      onChange={(e) => onUpdate('totalAddressableDevices', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Max Loop Capacity</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.maxLoopCapacity || ''}
                      onChange={(e) => onUpdate('maxLoopCapacity', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    {formData.maxLoopCapacity > 0 && formData.systemMake && (
                      <p className="text-xs text-green-400 mt-1">Auto-filled from {formData.systemMake} {formData.systemModel}</p>
                    )}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Aspirating System Details - conditional on aspirating count > 0 */}
      {(detectorCount.aspirating || 0) > 0 && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.aspirating} onOpenChange={() => toggleSection('aspirating')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Wind className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Aspirating System</h3>
                    <span className="text-xs text-white">BS EN 54-20 details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.aspirating && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                      <Wind className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white font-semibold">Aspirating System Details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.aspirating && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                {(formData.aspiratingUnits || []).map((unit: any, index: number) => (
                  <div key={unit.id} className="bg-black/40 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-sm">Unit {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const units = formData.aspiratingUnits || [];
                          onUpdate('aspiratingUnits', units.filter((u: any) => u.id !== unit.id));
                        }}
                        className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
                        aria-label="Remove unit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm">Make</Label>
                        <Input
                          placeholder="Manufacturer"
                          value={unit.make || ''}
                          onChange={(e) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], make: e.target.value }; onUpdate('aspiratingUnits', units); }
                          }}
                          className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Model</Label>
                        <Input
                          placeholder="Model"
                          value={unit.model || ''}
                          onChange={(e) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], model: e.target.value }; onUpdate('aspiratingUnits', units); }
                          }}
                          className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Sampling Points</Label>
                        <Input
                          type="number"
                          min="0"
                          value={unit.samplingPoints || ''}
                          onChange={(e) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], samplingPoints: parseInt(e.target.value) || 0 }; onUpdate('aspiratingUnits', units); }
                          }}
                          placeholder="0"
                          className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Pipe Length (m)</Label>
                        <Input
                          placeholder="e.g., 100m"
                          value={unit.pipeLength || ''}
                          onChange={(e) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], pipeLength: e.target.value }; onUpdate('aspiratingUnits', units); }
                          }}
                          className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Transport Time</Label>
                        <Input
                          placeholder="e.g., 60s"
                          value={unit.transportTime || ''}
                          onChange={(e) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], transportTime: e.target.value }; onUpdate('aspiratingUnits', units); }
                          }}
                          className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Sensitivity (EN 54-20)</Label>
                        <Select
                          value={unit.sensitivityLevel || ''}
                          onValueChange={(v) => {
                            const units = [...(formData.aspiratingUnits || [])];
                            const idx = units.findIndex((u: any) => u.id === unit.id);
                            if (idx >= 0) { units[idx] = { ...units[idx], sensitivityLevel: v }; onUpdate('aspiratingUnits', units); }
                          }}
                        >
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-background border-border text-foreground">
                            <SelectItem value="class-a">Class A</SelectItem>
                            <SelectItem value="class-b">Class B</SelectItem>
                            <SelectItem value="class-c">Class C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-purple-500 hover:bg-purple-500/10"
                  onClick={() => {
                    const units = formData.aspiratingUnits || [];
                    onUpdate('aspiratingUnits', [...units, {
                      id: `asp-${Date.now()}`,
                      make: '',
                      model: '',
                      samplingPoints: 0,
                      pipeLength: '',
                      transportTime: '',
                      sensitivityLevel: '',
                    }]);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Aspirating Unit
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Detector Spacing/Siting Compliance */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.detectorSpacing} onOpenChange={() => toggleSection('detectorSpacing')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Grid3X3 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Detector Spacing</h3>
                  <span className="text-xs text-white">Siting compliance</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.detectorSpacing && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Grid3X3 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Detector Spacing/Siting</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.detectorSpacing && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div
                className={cn(
                  'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors touch-manipulation',
                  formData.detectorSpacingCompliant
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-black/30 border border-white/10 hover:border-white/20'
                )}
                onClick={() => onUpdate('detectorSpacingCompliant', !formData.detectorSpacingCompliant)}
              >
                <Checkbox
                  checked={formData.detectorSpacingCompliant || false}
                  onCheckedChange={(checked) => onUpdate('detectorSpacingCompliant', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label className="cursor-pointer text-sm font-medium text-foreground">
                  Detector spacing compliant with BS 5839-1
                </Label>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Spacing Notes</Label>
                <Textarea
                  placeholder="Any notes on detector spacing or siting..."
                  value={formData.spacingNotes || ''}
                  onChange={(e) => onUpdate('spacingNotes', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FireAlarmSystemDesign;
