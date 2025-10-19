import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FullCircuitDesign } from "../types";
import { useState } from "react";

interface CircuitFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuit?: FullCircuitDesign;
  onSave: (circuit: Partial<FullCircuitDesign>) => void;
}

export const CircuitFormDialog = ({ open, onOpenChange, circuit, onSave }: CircuitFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: circuit?.name || "",
    loadType: circuit?.loadType || "socket",
    loadPower: circuit?.loadPower || 0,
    phases: circuit?.phases || "single",
    cableLength: circuit?.cableLength || 0,
    cpcSize: circuit?.cpcSize || 1.5,
    rcdProtected: circuit?.rcdProtected || false,
    protectionDevice: circuit?.protectionDevice || { type: "MCB", curve: "B", rating: 0, kaRating: 6 }
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-2xl">
            {circuit ? "Edit Circuit" : "Add New Circuit"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6 py-4">
          {/* Section 1: Circuit Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Circuit Details
            </h3>
            
            <MobileInput
              label="Circuit Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Kitchen Sockets"
              hint="Descriptive name for this circuit"
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Load Type</Label>
              <Select value={formData.loadType} onValueChange={(v) => setFormData({...formData, loadType: v})}>
                <SelectTrigger className="h-12 bg-card border-primary/30 focus:ring-2 focus:ring-elec-yellow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socket">Socket Outlets</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="cooker">Cooker</SelectItem>
                  <SelectItem value="shower">Electric Shower</SelectItem>
                  <SelectItem value="immersion">Immersion Heater</SelectItem>
                  <SelectItem value="heating">Heating</SelectItem>
                  <SelectItem value="ev-charger">EV Charger</SelectItem>
                  <SelectItem value="motor">Motor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Load Specifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Load Specifications
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <MobileInput
                label="Total Load"
                type="number"
                inputMode="decimal"
                value={formData.loadPower}
                onChange={(e) => setFormData({...formData, loadPower: Number(e.target.value)})}
                unit="W"
                hint="Total wattage of all connected loads"
                placeholder="e.g. 3000"
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Phases</Label>
                <Select value={formData.phases} onValueChange={(v) => setFormData({...formData, phases: v as any})}>
                  <SelectTrigger className="h-12 bg-card border-primary/30 focus:ring-2 focus:ring-elec-yellow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Phase</SelectItem>
                    <SelectItem value="three">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MobileInput
              label="Cable Length"
              type="number"
              inputMode="decimal"
              value={formData.cableLength}
              onChange={(e) => setFormData({...formData, cableLength: Number(e.target.value)})}
              unit="m"
              hint="Distance from consumer unit to load"
              placeholder="e.g. 15"
            />
          </div>

          {/* Section 3: Protection Device */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Protection Device
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Protection Type</Label>
                <Select 
                  value={formData.protectionDevice.type} 
                  onValueChange={(v) => setFormData({...formData, protectionDevice: {...formData.protectionDevice, type: v}})}
                >
                  <SelectTrigger className="h-12 bg-card border-primary/30 focus:ring-2 focus:ring-elec-yellow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MCB">MCB (Miniature Circuit Breaker)</SelectItem>
                    <SelectItem value="RCBO">RCBO (RCD + MCB Combined)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">MCB Curve Type</Label>
                <Select 
                  value={formData.protectionDevice.curve} 
                  onValueChange={(v) => setFormData({...formData, protectionDevice: {...formData.protectionDevice, curve: v}})}
                >
                  <SelectTrigger className="h-12 bg-card border-primary/30 focus:ring-2 focus:ring-elec-yellow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B">Type B (3-5 × In) - General Use</SelectItem>
                    <SelectItem value="C">Type C (5-10 × In) - Motors</SelectItem>
                    <SelectItem value="D">Type D (10-20 × In) - High Inrush</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>

        {/* Sticky footer buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border sticky bottom-0 bg-background">
          <Button 
            type="button"
            variant="outline" 
            size="lg" 
            className="flex-1 h-12" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            size="lg" 
            className="flex-1 h-12" 
            onClick={handleSave}
          >
            Save Circuit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
