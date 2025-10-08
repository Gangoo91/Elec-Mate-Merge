import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{circuit ? "Edit Circuit" : "Add New Circuit"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label>Circuit Name</Label>
            <Input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Kitchen Sockets"
            />
          </div>

          <div>
            <Label>Load Type</Label>
            <Select value={formData.loadType} onValueChange={(v) => setFormData({...formData, loadType: v})}>
              <SelectTrigger>
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

          <div>
            <Label>Total Load (W)</Label>
            <Input 
              type="number"
              value={formData.loadPower}
              onChange={(e) => setFormData({...formData, loadPower: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label>Phases</Label>
            <Select value={formData.phases} onValueChange={(v) => setFormData({...formData, phases: v as any})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Phase</SelectItem>
                <SelectItem value="three">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Cable Length (m)</Label>
            <Input 
              type="number"
              value={formData.cableLength}
              onChange={(e) => setFormData({...formData, cableLength: Number(e.target.value)})}
            />
          </div>

          <div>
            <Label>Protection Type</Label>
            <Select value={formData.protectionDevice.type} onValueChange={(v) => setFormData({...formData, protectionDevice: {...formData.protectionDevice, type: v}})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCB">MCB</SelectItem>
                <SelectItem value="RCBO">RCBO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>MCB Curve</Label>
            <Select value={formData.protectionDevice.curve} onValueChange={(v) => setFormData({...formData, protectionDevice: {...formData.protectionDevice, curve: v}})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B">Type B (3-5 × In)</SelectItem>
                <SelectItem value="C">Type C (5-10 × In)</SelectItem>
                <SelectItem value="D">Type D (10-20 × In)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Circuit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
