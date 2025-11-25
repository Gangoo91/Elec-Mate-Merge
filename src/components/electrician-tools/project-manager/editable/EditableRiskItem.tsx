import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { ProjectRisk } from '@/types/projectPlan';

interface EditableRiskItemProps {
  risk: ProjectRisk;
  onUpdate: (updates: Partial<ProjectRisk>) => void;
  onDelete: () => void;
}

export const EditableRiskItem = ({
  risk,
  onUpdate,
  onDelete,
}: EditableRiskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(risk.description);
  const [editedMitigation, setEditedMitigation] = useState(risk.mitigation);
  const [editedSeverity, setEditedSeverity] = useState(risk.severity);

  const handleSave = () => {
    onUpdate({
      description: editedDescription,
      mitigation: editedMitigation,
      severity: editedSeverity,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(risk.description);
    setEditedMitigation(risk.mitigation);
    setEditedSeverity(risk.severity);
    setIsEditing(false);
  };

  const severityColors = {
    low: 'bg-green-500/10 border-green-500/20 text-green-600',
    medium: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600',
    high: 'bg-red-500/10 border-red-500/20 text-red-600',
  };

  const statusColors = {
    open: 'bg-red-500/10 border-red-500/20 text-red-600',
    mitigated: 'bg-green-500/10 border-green-500/20 text-green-600',
    accepted: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
  };

  if (isEditing) {
    return (
      <div className="space-y-3 p-4 border border-border/40 rounded-lg bg-card">
        <MobileInput
          label="Risk Description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <MobileInput
          label="Mitigation"
          value={editedMitigation}
          onChange={(e) => setEditedMitigation(e.target.value)}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium">Severity</label>
          <Select value={editedSeverity} onValueChange={(value: any) => setEditedSeverity(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border border-border/40 rounded-lg group hover:border-border/60 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded-full ${severityColors[risk.severity]}`}>
              {risk.severity.toUpperCase()}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[risk.status]}`}>
              {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
            </span>
          </div>
          
          <p className="text-sm font-medium">{risk.description}</p>
          <p className="text-sm text-muted-foreground">
            <strong>Mitigation:</strong> {risk.mitigation}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Select
              value={risk.status}
              onValueChange={(value: any) => onUpdate({ status: value })}
            >
              <SelectTrigger className="h-9 w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="mitigated">Mitigated</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
