import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Cable, ChevronDown } from 'lucide-react';
import { cableSizeOptions } from '@/types/cableTypes';
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import { DistributionBoard, createMainBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EICElectricalInstallationSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICElectricalInstallationSection = ({ formData, onUpdate, isOpen, onToggle }: EICElectricalInstallationSectionProps) => {
  const isMobile = useIsMobile();
  const hasRCDProtection = formData.rcdMainSwitch === 'yes' || formData.rcdMainSwitch === 'rcbo';
  const showRCDFields = formData.rcdMainSwitch && formData.rcdMainSwitch !== 'no';

  const handleRCDMainSwitchChange = (value: string) => {
    const actualValue = value === '__clear__' ? '' : value;
    onUpdate('rcdMainSwitch', actualValue);

    // Clear RCD fields when "No" or cleared
    if (actualValue === 'no' || actualValue === '') {
      onUpdate('rcdRating', '');
      onUpdate('rcdType', '');
    }
  };

  // Migrate legacy single-board data to multi-board format
  const boards: DistributionBoard[] = useMemo(() => {
    // If we already have distributionBoards, use them
    if (formData.distributionBoards && formData.distributionBoards.length > 0) {
      return formData.distributionBoards;
    }

    // Otherwise, create main board from legacy fields
    const mainBoard = createMainBoard();
    if (formData.boardLocation) mainBoard.location = formData.boardLocation;
    if (formData.boardType) mainBoard.type = formData.boardType as any;
    if (formData.boardSize) {
      mainBoard.totalWays = parseInt(formData.boardSize) || 0;
    }
    return [mainBoard];
  }, [formData.distributionBoards, formData.boardLocation, formData.boardType, formData.boardSize]);

  // Handle board changes - sync to both new and legacy fields for backward compatibility
  const handleBoardsChange = (newBoards: DistributionBoard[]) => {
    onUpdate('distributionBoards', newBoards as any);

    // Also update legacy fields from main board for backward compatibility
    const mainBoard = newBoards.find(b => b.id === MAIN_BOARD_ID) || newBoards[0];
    if (mainBoard) {
      if (mainBoard.location) onUpdate('boardLocation', mainBoard.location);
      if (mainBoard.type) onUpdate('boardType', mainBoard.type);
      if (mainBoard.totalWays) onUpdate('boardSize', String(mainBoard.totalWays));
    }
  };

  return (
    <div className={cn(isMobile ? "" : "border border-border bg-card overflow-hidden rounded-lg")}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        {isMobile ? (
          <button onClick={onToggle} className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20 w-full text-left">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
              <Cable className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Electrical Installation Details</h3>
            </div>
            <ChevronDown className={cn(
              "h-5 w-5 text-muted-foreground transition-transform shrink-0",
              isOpen && "rotate-180"
            )} />
          </button>
        ) : (
          <SectionHeader
            title="Electrical Installation Details"
            icon={Cable}
            isOpen={isOpen}
            color="amber-500"
          />
        )}
        <CollapsibleContent>
          <div className={cn(
            "space-y-6",
            isMobile ? "px-4 py-4" : "p-4 sm:p-6"
          )}>
        {/* Main Switch / Switch-fuse / Circuit-breaker / RCD (IET Form) */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            Main Switch / Switch-fuse / Circuit-breaker / RCD
          </h3>

          {/* Location (IET Form) */}
          <div className="space-y-2">
            <Label htmlFor="mainSwitchLocation" className="font-medium text-sm">Location</Label>
            <Input
              id="mainSwitchLocation"
              value={formData.mainSwitchLocation || ''}
              onChange={(e) => onUpdate('mainSwitchLocation', e.target.value)}
              placeholder="e.g., Under stairs cupboard, Garage"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainProtectiveDevice" className="font-medium text-sm">Device Type *</Label>
              <Select value={formData.mainProtectiveDevice || ''} onValueChange={(value) => onUpdate('mainProtectiveDevice', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="main-switch">Main Switch</SelectItem>
                  <SelectItem value="switch-fuse">Switch Fuse</SelectItem>
                  <SelectItem value="circuit-breaker">Circuit-breaker</SelectItem>
                  <SelectItem value="rcd">RCD</SelectItem>
                  <SelectItem value="mcb">MCB</SelectItem>
                  <SelectItem value="mccb">MCCB</SelectItem>
                  <SelectItem value="fuse">Fuse</SelectItem>
                  <SelectItem value="isolator">Isolator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mainSwitchBsEn" className="font-medium text-sm">BS (EN)</Label>
              <Select value={formData.mainSwitchBsEn || ''} onValueChange={(value) => onUpdate('mainSwitchBsEn', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select BS standard" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="BS EN 60898-1">BS EN 60898-1 (MCBs)</SelectItem>
                  <SelectItem value="BS EN 60898-2">BS EN 60898-2 (MCBs AC/DC)</SelectItem>
                  <SelectItem value="BS EN 60947-2">BS EN 60947-2 (MCCBs)</SelectItem>
                  <SelectItem value="BS EN 60947-3">BS EN 60947-3 (Switch-disconnectors)</SelectItem>
                  <SelectItem value="BS EN 61008-1">BS EN 61008-1 (RCCBs)</SelectItem>
                  <SelectItem value="BS EN 61009-1">BS EN 61009-1 (RCBOs)</SelectItem>
                  <SelectItem value="BS 88-2">BS 88-2 (HRC Fuses)</SelectItem>
                  <SelectItem value="BS 88-3">BS 88-3 (HRC Fuses)</SelectItem>
                  <SelectItem value="BS 1361">BS 1361 (Cartridge Fuses)</SelectItem>
                  <SelectItem value="BS 1362">BS 1362 (Plug Fuses)</SelectItem>
                  <SelectItem value="BS 3036">BS 3036 (Semi-enclosed Fuses)</SelectItem>
                  <SelectItem value="BS 7671">BS 7671 (Wiring Regs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mainSwitchPoles" className="font-medium text-sm">No. of Poles</Label>
              <Select value={formData.mainSwitchPoles || ''} onValueChange={(value) => onUpdate('mainSwitchPoles', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select poles" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="1">1 Pole</SelectItem>
                  <SelectItem value="2">2 Pole</SelectItem>
                  <SelectItem value="3">3 Pole</SelectItem>
                  <SelectItem value="4">4 Pole</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="mainSwitchRating" className="font-medium text-sm">Current Rating (A) *</Label>
              <Select value={formData.mainSwitchRating || ''} onValueChange={(value) => onUpdate('mainSwitchRating', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50 max-h-[300px]">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  {/* BS 3036 Semi-enclosed fuse ratings */}
                  <SelectItem value="5">5A</SelectItem>
                  <SelectItem value="15">15A</SelectItem>
                  {/* MCB/MCCB standard ratings */}
                  <SelectItem value="6">6A</SelectItem>
                  <SelectItem value="10">10A</SelectItem>
                  <SelectItem value="16">16A</SelectItem>
                  <SelectItem value="20">20A</SelectItem>
                  <SelectItem value="25">25A</SelectItem>
                  <SelectItem value="30">30A</SelectItem>
                  <SelectItem value="32">32A</SelectItem>
                  <SelectItem value="40">40A</SelectItem>
                  <SelectItem value="45">45A</SelectItem>
                  <SelectItem value="50">50A</SelectItem>
                  <SelectItem value="60">60A</SelectItem>
                  <SelectItem value="63">63A</SelectItem>
                  <SelectItem value="80">80A</SelectItem>
                  <SelectItem value="100">100A</SelectItem>
                  <SelectItem value="125">125A</SelectItem>
                  <SelectItem value="160">160A</SelectItem>
                  <SelectItem value="200">200A</SelectItem>
                  <SelectItem value="250">250A</SelectItem>
                  <SelectItem value="315">315A</SelectItem>
                  <SelectItem value="400">400A</SelectItem>
                  <SelectItem value="500">500A</SelectItem>
                  <SelectItem value="630">630A</SelectItem>
                  <SelectItem value="800">800A</SelectItem>
                  <SelectItem value="1000">1000A</SelectItem>
                  <SelectItem value="1250">1250A</SelectItem>
                  <SelectItem value="1600">1600A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mainSwitchFuseRating" className="font-medium text-sm">Fuse/Device Setting (A)</Label>
              <Select value={formData.mainSwitchFuseRating || ''} onValueChange={(value) => onUpdate('mainSwitchFuseRating', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select setting" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50 max-h-[300px]">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  {/* BS 1362 plug fuse ratings */}
                  <SelectItem value="3">3A</SelectItem>
                  {/* BS 3036 Semi-enclosed fuse ratings */}
                  <SelectItem value="5">5A</SelectItem>
                  <SelectItem value="15">15A</SelectItem>
                  <SelectItem value="20">20A</SelectItem>
                  <SelectItem value="30">30A</SelectItem>
                  <SelectItem value="45">45A</SelectItem>
                  {/* MCB/MCCB/BS 88 standard ratings */}
                  <SelectItem value="6">6A</SelectItem>
                  <SelectItem value="10">10A</SelectItem>
                  <SelectItem value="13">13A</SelectItem>
                  <SelectItem value="16">16A</SelectItem>
                  <SelectItem value="25">25A</SelectItem>
                  <SelectItem value="32">32A</SelectItem>
                  <SelectItem value="40">40A</SelectItem>
                  <SelectItem value="50">50A</SelectItem>
                  <SelectItem value="60">60A</SelectItem>
                  <SelectItem value="63">63A</SelectItem>
                  <SelectItem value="80">80A</SelectItem>
                  <SelectItem value="100">100A</SelectItem>
                  <SelectItem value="125">125A</SelectItem>
                  <SelectItem value="160">160A</SelectItem>
                  <SelectItem value="200">200A</SelectItem>
                  <SelectItem value="250">250A</SelectItem>
                  <SelectItem value="315">315A</SelectItem>
                  <SelectItem value="400">400A</SelectItem>
                  <SelectItem value="500">500A</SelectItem>
                  <SelectItem value="630">630A</SelectItem>
                  <SelectItem value="800">800A</SelectItem>
                  <SelectItem value="1000">1000A</SelectItem>
                  <SelectItem value="1250">1250A</SelectItem>
                  <SelectItem value="1600">1600A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mainSwitchVoltageRating" className="font-medium text-sm">Voltage Rating (V)</Label>
              <Select value={formData.mainSwitchVoltageRating || ''} onValueChange={(value) => onUpdate('mainSwitchVoltageRating', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select voltage" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="230">230V</SelectItem>
                  <SelectItem value="400">400V</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breakingCapacity" className="font-medium text-sm">Breaking Capacity (kA)</Label>
              <Select value={formData.breakingCapacity || ''} onValueChange={(value) => onUpdate('breakingCapacity', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="1">1kA</SelectItem>
                  <SelectItem value="1.5">1.5kA</SelectItem>
                  <SelectItem value="3">3kA</SelectItem>
                  <SelectItem value="4.5">4.5kA</SelectItem>
                  <SelectItem value="6">6kA</SelectItem>
                  <SelectItem value="10">10kA</SelectItem>
                  <SelectItem value="15">15kA</SelectItem>
                  <SelectItem value="16">16kA</SelectItem>
                  <SelectItem value="20">20kA</SelectItem>
                  <SelectItem value="25">25kA</SelectItem>
                  <SelectItem value="35">35kA</SelectItem>
                  <SelectItem value="50">50kA</SelectItem>
                  <SelectItem value="70">70kA</SelectItem>
                  <SelectItem value="100">100kA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* RCD Protection */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            RCD Protection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rcdMainSwitch" className="font-medium text-sm">RCD Main Switch</Label>
              <Select value={formData.rcdMainSwitch || ''} onValueChange={handleRCDMainSwitchChange}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select RCD type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="rcbo">RCBO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showRCDFields ? (
              <>
                <div>
                  <Label htmlFor="rcdRating" className="font-medium text-sm">I<sub>Δn</sub> Rating (mA)</Label>
                  <Select value={formData.rcdRating || ''} onValueChange={(value) => onUpdate('rcdRating', value === '__clear__' ? '' : value)}>
                    <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border text-foreground z-50">
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      <SelectItem value="30">30mA</SelectItem>
                      <SelectItem value="100">100mA</SelectItem>
                      <SelectItem value="300">300mA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rcdType" className="font-medium text-sm">RCD Type</Label>
                  <Select value={formData.rcdType || ''} onValueChange={(value) => onUpdate('rcdType', value === '__clear__' ? '' : value)}>
                    <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border text-foreground z-50">
                      <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                      <SelectItem value="ac">AC Type</SelectItem>
                      <SelectItem value="a">A Type</SelectItem>
                      <SelectItem value="b">B Type</SelectItem>
                      <SelectItem value="f">F Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              formData.rcdMainSwitch === 'no' && (
                <div className="md:col-span-2 flex items-center justify-center p-4 bg-white/[0.03] border border-white/[0.08] rounded-md">
                  <p className="text-sm text-white/50 text-center">
                    RCD rating and type fields are not applicable when no RCD protection is installed
                  </p>
                </div>
              )
            )}
          </div>

          {/* RCD Time Fields (IET Form) */}
          {showRCDFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div>
                <Label htmlFor="rcdTimeDelay" className="font-medium text-sm">Rated Time Delay (ms)</Label>
                <Select value={formData.rcdTimeDelay || ''} onValueChange={(value) => onUpdate('rcdTimeDelay', value === '__clear__' ? '' : value)}>
                  <SelectTrigger className="bg-background border-border focus:border-blue-500 focus:ring-blue-500 h-11">
                    <SelectValue placeholder="Select delay" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border text-foreground z-50">
                    <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                    <SelectItem value="0">0ms (No delay)</SelectItem>
                    <SelectItem value="40">40ms</SelectItem>
                    <SelectItem value="150">150ms</SelectItem>
                    <SelectItem value="200">200ms</SelectItem>
                    <SelectItem value="300">300ms</SelectItem>
                    <SelectItem value="500">500ms (S Type)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rcdMeasuredTime" className="font-medium text-sm">Measured Operating Time (ms)</Label>
                <Input
                  id="rcdMeasuredTime"
                  type="number"
                  step="1"
                  value={formData.rcdMeasuredTime || ''}
                  onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                  placeholder="e.g., 28"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-white/50 mt-1">Trip time at IΔn</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Distribution Boards - Multi-board support */}
        <MultiboardSetup
          boards={boards}
          onBoardsChange={handleBoardsChange}
        />

        <Separator />

        {/* Supply Cables */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            Supply Cables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intakeCableSize" className="font-medium text-sm">Intake Cable Size</Label>
              <Select value={formData.intakeCableSize || ''} onValueChange={(value) => onUpdate('intakeCableSize', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  {cableSizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Other/Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="intakeCableType" className="font-medium text-sm">Intake Cable Type</Label>
              <Select value={formData.intakeCableType || ''} onValueChange={(value) => onUpdate('intakeCableType', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="pvc">PVC</SelectItem>
                  <SelectItem value="xlpe">XLPE</SelectItem>
                  <SelectItem value="paper">Paper Insulated</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tailsSize" className="font-medium text-sm">Meter Tails Size</Label>
              <Select value={formData.tailsSize || ''} onValueChange={(value) => onUpdate('tailsSize', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select tails size" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="16mm">16mm²</SelectItem>
                  <SelectItem value="25mm">25mm²</SelectItem>
                  <SelectItem value="35mm">35mm²</SelectItem>
                  <SelectItem value="50mm">50mm²</SelectItem>
                  <SelectItem value="custom">Other/Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tailsLength" className="font-medium text-sm">Meter Tails Length</Label>
              <Select value={formData.tailsLength || ''} onValueChange={(value) => onUpdate('tailsLength', value === '__clear__' ? '' : value)}>
                <SelectTrigger className="bg-background border-border focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border text-foreground z-50">
                  <SelectItem value="__clear__"><span className="text-muted-foreground">Clear selection</span></SelectItem>
                  <SelectItem value="1m">1m</SelectItem>
                  <SelectItem value="1.5m">1.5m</SelectItem>
                  <SelectItem value="2m">2m</SelectItem>
                  <SelectItem value="2.5m">2.5m</SelectItem>
                  <SelectItem value="3m">3m</SelectItem>
                  <SelectItem value="4m">4m</SelectItem>
                  <SelectItem value="5m">5m</SelectItem>
                  <SelectItem value="custom">Custom Length</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EICElectricalInstallationSection;