import { useState } from 'react';
import { AlertCircle, Trash2, ChevronUp, ChevronDown, Edit2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface EmergencyProceduresSectionProps {
  procedures: string[];
  isEditing?: boolean;
  onUpdate?: (index: number, value: string) => void;
  onDelete?: (index: number) => void;
  onMove?: (index: number, direction: 'up' | 'down') => void;
  onAdd?: () => void;
}

export const EmergencyProceduresSection = ({ 
  procedures, 
  isEditing = false, 
  onUpdate, 
  onDelete, 
  onMove, 
  onAdd 
}: EmergencyProceduresSectionProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!procedures || procedures.length === 0) return null;

  const handleStartEdit = (idx: number, value: string) => {
    setEditingIndex(idx);
    setEditValue(value);
  };

  const handleSaveEdit = (idx: number) => {
    onUpdate?.(idx, editValue);
    setEditingIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  return (
    <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          Emergency Procedures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {procedures.map((procedure, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-4 bg-white/50 dark:bg-elec-card/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all relative sm:flex-row sm:items-start"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                {idx + 1}
              </div>
              
              {editingIndex === idx ? (
                <div className="flex-1 w-full space-y-2">
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEdit(idx)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="flex-1 w-full text-sm leading-relaxed pt-1 text-center sm:text-left">{procedure}</p>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleStartEdit(idx, procedure)}
                      className="h-8 w-8 touch-manipulation"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete?.(idx)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <Button 
          onClick={onAdd}
          variant="outline"
          className="w-full mt-3"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Procedure
        </Button>

        {/* Emergency Contact Reminder */}
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              <span className="font-semibold text-foreground">Important:</span> Ensure all team members are familiar with emergency procedures and know the location of first aid equipment and emergency exits.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
