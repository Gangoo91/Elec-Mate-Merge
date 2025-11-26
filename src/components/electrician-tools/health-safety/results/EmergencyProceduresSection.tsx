import { AlertCircle, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
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
  if (!procedures || procedures.length === 0) return null;

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
              className="flex items-start gap-3 p-4 bg-white/50 dark:bg-elec-card/50 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all relative"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                {idx + 1}
              </div>
              {isEditing ? (
                <div className="flex-1 space-y-2">
                  <Textarea
                    value={procedure}
                    onChange={(e) => onUpdate?.(idx, e.target.value)}
                    className="min-h-[60px]"
                  />
                  <div className="flex gap-2">
                    {idx > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMove?.(idx, 'up')}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    )}
                    {idx < procedures.length - 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onMove?.(idx, 'down')}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete?.(idx)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="flex-1 text-sm leading-relaxed pt-1">{procedure}</p>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <Button 
            onClick={onAdd}
            variant="outline"
            className="w-full mt-3"
          >
            Add Procedure
          </Button>
        )}

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
