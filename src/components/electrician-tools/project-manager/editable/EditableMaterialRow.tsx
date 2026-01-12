import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { ProjectMaterial } from '@/types/projectPlan';

interface EditableMaterialRowProps {
  material: ProjectMaterial;
  onUpdate: (updates: Partial<ProjectMaterial>) => void;
  onDelete: () => void;
}

export const EditableMaterialRow = ({
  material,
  onUpdate,
  onDelete,
}: EditableMaterialRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(material.name);
  const [editedQuantity, setEditedQuantity] = useState(material.quantity);

  const handleSave = () => {
    onUpdate({ name: editedName, quantity: editedQuantity });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(material.name);
    setEditedQuantity(material.quantity);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center p-2 bg-muted/20 rounded-md">
        <MobileInput
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="flex-1"
        />
        <MobileInput
          type="number"
          value={editedQuantity}
          onChange={(e) => setEditedQuantity(Number(e.target.value))}
          className="w-20"
        />
        <Button size="sm" onClick={handleSave} className="h-12 w-12 shrink-0">
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCancel} className="h-12 w-12 shrink-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-2 hover:bg-muted/10 rounded-md group">
      <Checkbox
        checked={material.ordered}
        onCheckedChange={(checked) => 
          onUpdate({ 
            ordered: checked as boolean,
            orderedDate: checked ? new Date().toISOString() : undefined
          })
        }
        className="mt-0.5"
      />
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${material.ordered ? 'line-through text-muted-foreground' : ''}`}>
            {material.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {material.quantity}{material.unit || ''}
          </span>
        </div>
        
        {material.orderBy && (
          <p className="text-xs text-orange-500">
            Order by: {material.orderBy}
          </p>
        )}
        
        {material.ordered && material.orderedDate && (
          <p className="text-xs text-green-600">
            Ordered: {new Date(material.orderedDate).toLocaleDateString('en-GB')}
          </p>
        )}
      </div>
      
      <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
  );
};
