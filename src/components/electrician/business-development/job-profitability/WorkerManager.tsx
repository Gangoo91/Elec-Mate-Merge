import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Plus, Trash2, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Worker {
  id: string;
  role: string;
  hours: number;
  hourlyRate: number;
  skillLevel: 'apprentice-1st' | 'apprentice-2nd' | 'apprentice-3rd' | 'apprentice-4th' | 'qualified' | 'senior' | 'supervisor' | 'specialist';
}

const workerRoleOptions = [
  { value: "apprentice-1st", label: "Apprentice (1st Year) - £15/hour", rate: 15 },
  { value: "apprentice-2nd", label: "Apprentice (2nd Year) - £18/hour", rate: 18 },
  { value: "apprentice-3rd", label: "Apprentice (3rd Year) - £22/hour", rate: 22 },
  { value: "apprentice-4th", label: "Apprentice (4th Year) - £25/hour", rate: 25 },
  { value: "qualified", label: "Qualified Electrician - £45/hour", rate: 45 },
  { value: "senior", label: "Senior Electrician - £55/hour", rate: 55 },
  { value: "supervisor", label: "Supervisor/Foreman - £65/hour", rate: 65 },
  { value: "specialist", label: "Specialist/Consultant - £75/hour", rate: 75 },
];

interface WorkerManagerProps {
  workers: Worker[];
  onWorkersChange: (workers: Worker[]) => void;
  totalLabourHours: number;
  totalLabourCost: number;
  isVisible: boolean;
}

export const WorkerManager = ({ 
  workers, 
  onWorkersChange, 
  totalLabourHours, 
  totalLabourCost,
  isVisible 
}: WorkerManagerProps) => {
  const { toast } = useToast();

  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      role: "Qualified Electrician",
      hours: 8,
      hourlyRate: 45,
      skillLevel: 'qualified'
    };
    
    onWorkersChange([...workers, newWorker]);
    toast({
      title: "Worker Added",
      description: "New worker added to the team.",
      variant: "success"
    });
  };

  const removeWorker = (workerId: string) => {
    if (workers.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one worker is required for the job.",
        variant: "destructive"
      });
      return;
    }
    
    onWorkersChange(workers.filter(w => w.id !== workerId));
    toast({
      title: "Worker Removed",
      description: "Worker removed from the team.",
      variant: "default"
    });
  };

  const updateWorker = (workerId: string, field: keyof Worker, value: any) => {
    onWorkersChange(workers.map(worker => {
      if (worker.id === workerId) {
        if (field === 'skillLevel') {
          const roleOption = workerRoleOptions.find(opt => opt.value === value);
          return {
            ...worker,
            [field]: value,
            role: roleOption?.label.split(' - ')[0] || worker.role,
            hourlyRate: roleOption?.rate || worker.hourlyRate
          };
        }
        return { ...worker, [field]: value };
      }
      return worker;
    }));
  };

  const blendedHourlyRate = totalLabourHours > 0 ? totalLabourCost / totalLabourHours : 0;

  if (!isVisible) return null;

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Team Management ({workers.length} worker{workers.length !== 1 ? 's' : ''})
          </div>
          <Button
            onClick={addWorker}
            size="sm"
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
          >
            <Plus className="h-4 w-4" />
            Add Worker
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Team Summary */}
        <div className="bg-elec-dark/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Labour Hours:</span>
            <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              <Clock className="h-3 w-3 mr-1" />
              {totalLabourHours.toFixed(1)}h
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Blended Hourly Rate:</span>
            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
              £{blendedHourlyRate.toFixed(2)}/hour
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Labour Cost:</span>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              £{totalLabourCost.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Worker Cards */}
        {workers.map((worker, index) => (
          <Card key={worker.id} className="bg-elec-dark/30 border-elec-yellow/10">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                  Worker {index + 1}
                </Badge>
                {workers.length > 1 && (
                  <Button
                    onClick={() => removeWorker(worker.id)}
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <MobileSelectWrapper
                label="Worker Role & Rate"
                value={worker.skillLevel}
                onValueChange={(value) => updateWorker(worker.id, 'skillLevel', value as Worker['skillLevel'])}
                options={workerRoleOptions}
                placeholder="Select worker role..."
              />

              <div className="grid grid-cols-2 gap-4">
                <MobileInput
                  label="Hours"
                  type="number"
                  value={worker.hours || ""}
                  onChange={(e) => updateWorker(worker.id, 'hours', parseFloat(e.target.value) || 0)}
                  unit="hrs"
                  min={0}
                  step={0.5}
                />
                <MobileInput
                  label="Hourly Rate"
                  type="number"
                  value={worker.hourlyRate || ""}
                  onChange={(e) => updateWorker(worker.id, 'hourlyRate', parseFloat(e.target.value) || 0)}
                  unit="£"
                  min={0}
                  step={1}
                />
              </div>

              <div className="bg-elec-yellow/5 rounded p-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Worker Cost:</span>
                  <span className="text-elec-yellow font-medium">
                    £{(worker.hours * worker.hourlyRate).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};