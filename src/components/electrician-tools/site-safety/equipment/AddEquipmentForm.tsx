import React, { useState } from "react";
import { SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { MobileButton } from "@/components/ui/mobile-button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, X } from "lucide-react";

interface AddEquipmentFormProps { 
  initialData?: Partial<SafetyEquipment>; 
  onSubmit: (data: Partial<SafetyEquipment>) => void; 
  onCancel: () => void; 
}

const categories = ["PPE", "Test Equipment", "Power Tools", "Hand Tools", "Ladders & Access", "Fire Safety", "First Aid", "Other"];

export const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "PPE",
    serial_number: initialData?.serial_number || "",
    location: initialData?.location || "",
    assigned_to: initialData?.assigned_to || "",
    last_inspection: initialData?.last_inspection || "",
    next_inspection: initialData?.next_inspection || "",
    last_calibration: initialData?.last_calibration || "",
    calibration_due: initialData?.calibration_due || "",
    status: initialData?.status || "good" as SafetyEquipment['status'],
    condition_notes: initialData?.condition_notes || "",
    inspection_interval_days: initialData?.inspection_interval_days || 90,
    requires_calibration: initialData?.requires_calibration || false,
  });

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!formData.name?.trim()) return; 
    onSubmit(formData as Partial<SafetyEquipment>); 
  };

  const inputClass = "w-full h-14 px-4 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-foreground/50 text-base touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Name <span className="text-red-400">*</span></Label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Equipment name" className={inputClass} required />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Category</Label>
          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
            <SelectTrigger className="h-14 bg-card border-border/50 text-foreground text-base"><SelectValue /></SelectTrigger>
            <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Serial No.</Label>
            <input type="text" value={formData.serial_number} onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Location</Label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Van, Office..." className={inputClass} />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Assigned To</Label>
          <input type="text" value={formData.assigned_to} onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })} placeholder="Person or team" className={inputClass} />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Status</Label>
          <Select value={formData.status} onValueChange={(v: SafetyEquipment['status']) => setFormData({ ...formData, status: v })}>
            <SelectTrigger className="h-14 bg-card border-border/50 text-foreground text-base"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="good"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-green-500"/>Good</span></SelectItem>
              <SelectItem value="needs_attention"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-yellow-500"/>Needs Attention</span></SelectItem>
              <SelectItem value="overdue"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-500"/>Overdue</span></SelectItem>
              <SelectItem value="out_of_service"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gray-500"/>Out of Service</span></SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Last Inspection</Label>
          <input type="date" value={formData.last_inspection || ""} onChange={(e) => setFormData({ ...formData, last_inspection: e.target.value })} className={inputClass} />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Next Inspection</Label>
          <input type="date" value={formData.next_inspection || ""} onChange={(e) => setFormData({ ...formData, next_inspection: e.target.value })} className={inputClass} />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Last Calibration</Label>
          <input type="date" value={formData.last_calibration || ""} onChange={(e) => setFormData({ ...formData, last_calibration: e.target.value })} className={inputClass} />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Calibration Due</Label>
          <input type="date" value={formData.calibration_due || ""} onChange={(e) => setFormData({ ...formData, calibration_due: e.target.value })} className={inputClass} />
        </div>
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">Notes</Label>
          <textarea value={formData.condition_notes} onChange={(e) => setFormData({ ...formData, condition_notes: e.target.value })} placeholder="Condition notes..." rows={3} className="w-full px-4 py-3 rounded-xl bg-card border border-border/50 text-foreground placeholder:text-foreground/50 text-base touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow resize-none" />
        </div>
      </div>
      <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t border-border/50 space-y-3">
        <MobileButton type="submit" variant="elec" size="wide" className="h-14 text-base font-semibold shadow-lg shadow-elec-yellow/20" icon={<Save className="h-5 w-5" />}>{initialData?.id ? "Save" : "Add Equipment"}</MobileButton>
        <MobileButton type="button" variant="ghost" size="wide" className="h-12 text-foreground/70" onClick={onCancel} icon={<X className="h-5 w-5" />}>Cancel</MobileButton>
      </div>
    </form>
  );
};
