import React, { useState } from "react";
import { ChevronDown, MapPin, Clock, Edit2, Trash2, CheckCircle, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SafetyEquipment } from "@/hooks/useSafetyEquipment";
import { format } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface EquipmentCardProps {
  equipment: SafetyEquipment;
  onEdit: (equipment: SafetyEquipment) => void;
  onDelete: (id: string) => void;
  onMarkInspected: (equipment: SafetyEquipment) => void;
  onMarkCalibrated: (equipment: SafetyEquipment) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, onEdit, onDelete, onMarkInspected, onMarkCalibrated }) => {
  const [expanded, setExpanded] = useState(false);
  const statusConfig = { good: { color: "bg-green-500", label: "Good", textColor: "text-green-500" }, needs_attention: { color: "bg-yellow-500", label: "Attention", textColor: "text-yellow-500" }, overdue: { color: "bg-red-500", label: "Overdue", textColor: "text-red-500" }, out_of_service: { color: "bg-gray-500", label: "Out of Service", textColor: "text-gray-500" } };
  const status = statusConfig[equipment.status] || statusConfig.good;
  const formatDate = (d: string | null) => { if (!d) return "Not set"; try { return format(new Date(d), "d MMM yyyy"); } catch { return "Invalid"; } };

  return (
    <Card className={`bg-card border-border/50 overflow-hidden transition-all ${expanded ? 'ring-2 ring-elec-yellow/50' : ''}`}>
      <div className={`h-1 ${status.color}`} />
      <CardContent className="p-0">
        <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center gap-4 text-left touch-manipulation active:bg-muted/50">
          <div className={`h-3 w-3 rounded-full ${status.color} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base">{equipment.name}</h3>
            {equipment.location && <div className="flex items-center gap-1.5 mt-1"><MapPin className="h-3.5 w-3.5 text-foreground/60" /><span className="text-sm text-foreground/70 truncate">{equipment.location}</span></div>}
            {equipment.next_inspection && <div className="flex items-center gap-1.5 mt-1"><Clock className="h-3.5 w-3.5 text-foreground/60" /><span className={`text-sm ${equipment.status === 'overdue' ? 'text-red-400 font-medium' : 'text-foreground/70'}`}>Due: {formatDate(equipment.next_inspection)}</span></div>}
          </div>
          <ChevronDown className={`h-5 w-5 text-foreground/50 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && (
          <div className="px-4 pb-4 space-y-4 animate-fade-in">
            <div className="h-px bg-border/50" />
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-xs text-foreground/60 uppercase">Category</p><p className="text-sm text-foreground font-medium">{equipment.category}</p></div>
              <div><p className="text-xs text-foreground/60 uppercase">Status</p><p className={`text-sm font-medium ${status.textColor}`}>{status.label}</p></div>
              {equipment.serial_number && <div><p className="text-xs text-foreground/60 uppercase">Serial</p><p className="text-sm text-foreground font-medium">{equipment.serial_number}</p></div>}
              {equipment.assigned_to && <div><p className="text-xs text-foreground/60 uppercase">Assigned To</p><p className="text-sm text-foreground font-medium">{equipment.assigned_to}</p></div>}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between py-2 px-3 rounded-lg bg-muted/50"><span className="text-sm text-foreground/70">Last Inspection</span><span className="text-sm text-foreground font-medium">{formatDate(equipment.last_inspection)}</span></div>
              <div className="flex justify-between py-2 px-3 rounded-lg bg-muted/50"><span className="text-sm text-foreground/70">Last Calibration</span><span className="text-sm text-foreground font-medium">{formatDate(equipment.last_calibration)}</span></div>
            </div>
            {equipment.condition_notes && <div><p className="text-xs text-foreground/60 uppercase mb-1">Notes</p><p className="text-sm text-foreground/80 bg-muted/50 p-3 rounded-lg">{equipment.condition_notes}</p></div>}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => onMarkInspected(equipment)} className="h-12 flex items-center justify-center gap-2 rounded-xl bg-green-500/20 text-green-400 font-medium text-sm touch-manipulation active:scale-95"><CheckCircle className="h-4 w-4" />Inspected</button>
                <button onClick={() => onMarkCalibrated(equipment)} className="h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-500/20 text-blue-400 font-medium text-sm touch-manipulation active:scale-95"><Settings className="h-4 w-4" />Calibrated</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => onEdit(equipment)} className="h-12 flex items-center justify-center gap-2 rounded-xl bg-muted text-foreground font-medium text-sm touch-manipulation active:scale-95"><Edit2 className="h-4 w-4" />Edit</button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><button className="h-12 flex items-center justify-center gap-2 rounded-xl bg-red-500/20 text-red-400 font-medium text-sm touch-manipulation active:scale-95"><Trash2 className="h-4 w-4" />Delete</button></AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[90vw] rounded-2xl"><AlertDialogHeader><AlertDialogTitle className="text-foreground">Delete?</AlertDialogTitle><AlertDialogDescription>Delete "{equipment.name}"?</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter className="flex-col gap-2"><AlertDialogCancel className="h-12 w-full">Cancel</AlertDialogCancel><AlertDialogAction onClick={() => onDelete(equipment.id)} className="h-12 w-full bg-red-500 hover:bg-red-600">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
