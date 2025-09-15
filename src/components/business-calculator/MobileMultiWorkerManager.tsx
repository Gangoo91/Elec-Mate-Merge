import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash2, User, AlertCircle } from "lucide-react";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

export interface Worker {
  id: string;
  name: string;
  experienceLevel: keyof typeof MARKET_RATES_2025.hourlyRates;
  hourlyRate: number;
  hoursOnJob: number;
}

interface MobileMultiWorkerManagerProps {
  workers: Worker[];
  onWorkersChange: (workers: Worker[]) => void;
  className?: string;
}

const experienceLevelOptions = [
  { value: "apprentice", label: "Apprentice (£12-18/hr)" },
  { value: "improver", label: "Improver (£18-25/hr)" },
  { value: "qualified", label: "Qualified (£24-35/hr)" },
  { value: "experienced", label: "Experienced (£30-45/hr)" },
  { value: "specialist", label: "Specialist (£40-65/hr)" },
];

const MobileMultiWorkerManager: React.FC<MobileMultiWorkerManagerProps> = ({
  workers,
  onWorkersChange,
  className
}) => {
  const addWorker = () => {
    const newWorker: Worker = {
      id: Date.now().toString(),
      name: `Worker ${workers.length + 1}`,
      experienceLevel: "qualified",
      hourlyRate: MARKET_RATES_2025.hourlyRates.qualified.typical,
      hoursOnJob: 8,
    };
    onWorkersChange([...workers, newWorker]);
  };

  const updateWorker = (id: string, updates: Partial<Worker>) => {
    const updatedWorkers = workers.map(worker => {
      if (worker.id === id) {
        const updated = { ...worker, ...updates };
        // Update hourly rate when experience level changes
        if (updates.experienceLevel) {
          updated.hourlyRate = MARKET_RATES_2025.hourlyRates[updates.experienceLevel].typical;
        }
        return updated;
      }
      return worker;
    });
    onWorkersChange(updatedWorkers);
  };

  const removeWorker = (id: string) => {
    onWorkersChange(workers.filter(worker => worker.id !== id));
  };

  const getTotalLabourCost = () => {
    return workers.reduce((total, worker) => total + (worker.hourlyRate * worker.hoursOnJob), 0);
  };

  const getTotalHours = () => {
    return workers.reduce((total, worker) => total + worker.hoursOnJob, 0);
  };

  const getTeamEfficiencyFactor = () => {
    // Team efficiency decreases with more workers due to coordination overhead
    if (workers.length <= 1) return 1.0;
    if (workers.length === 2) return 0.95; // 5% efficiency loss
    if (workers.length === 3) return 0.90; // 10% efficiency loss
    return 0.85; // 15% efficiency loss for 4+ workers
  };

  return (
    <Card className={`mobile-card border-elec-yellow/20 bg-elec-card ${className}`}>
      <CardHeader className="mobile-card-spacing">
        <CardTitle className="mobile-subheading text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Team Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="mobile-card-spacing">
        {workers.length === 0 ? (
          <div className="text-center py-6">
            <User className="h-12 w-12 text-elec-yellow/50 mx-auto mb-3" />
            <p className="mobile-text text-white mb-4">No workers added yet</p>
            <Button 
              onClick={addWorker}
              className="mobile-button-primary bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-target"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Worker
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {workers.map((worker) => (
                <div key={worker.id} className="mobile-card bg-elec-dark/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <User className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                      <span className="mobile-text text-white font-medium truncate">{worker.name}</span>
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs flex-shrink-0">
                        {worker.experienceLevel}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWorker(worker.id)}
                      className="touch-target text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mobile-grid-responsive gap-3">
                    <MobileInput
                      label="Worker Name"
                      type="text"
                      value={worker.name}
                      onChange={(e) => updateWorker(worker.id, { name: e.target.value })}
                      className="text-sm"
                    />

                    <MobileSelectWrapper
                      label="Experience Level"
                      value={worker.experienceLevel}
                      onValueChange={(value) => updateWorker(worker.id, { 
                        experienceLevel: value as keyof typeof MARKET_RATES_2025.hourlyRates 
                      })}
                      options={experienceLevelOptions}
                    />

                    <MobileInput
                      label="Hours on Job"
                      type="number"
                      inputMode="decimal"
                      value={worker.hoursOnJob || ""}
                      onChange={(e) => updateWorker(worker.id, { hoursOnJob: parseFloat(e.target.value) || 0 })}
                      unit="hrs"
                      className="text-sm"
                    />
                  </div>

                  <div className="flex justify-between mobile-small-text">
                    <span className="text-elec-light">Rate: £{worker.hourlyRate}/hr</span>
                    <span className="text-elec-yellow font-medium">
                      Cost: £{(worker.hourlyRate * worker.hoursOnJob).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2">
              <Button 
                onClick={addWorker}
                variant="outline"
                size="sm"
                className="mobile-button-secondary border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-target"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Worker
              </Button>
              
              <div className="text-right">
                <p className="mobile-small-text text-elec-light">Team Efficiency: {(getTeamEfficiencyFactor() * 100).toFixed(0)}%</p>
                <p className="mobile-small-text text-elec-light">{getTotalHours()} total hours</p>
              </div>
            </div>

            {/* Team Summary */}
            <div className="mobile-card bg-elec-yellow/10 rounded-lg p-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="mobile-small-text text-white">Raw Labour Cost</p>
                  <p className="mobile-text font-semibold text-elec-yellow">
                    £{getTotalLabourCost().toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="mobile-small-text text-white">Adjusted Cost</p>
                  <p className="mobile-text font-semibold text-elec-yellow">
                    £{(getTotalLabourCost() / getTeamEfficiencyFactor()).toFixed(2)}
                  </p>
                </div>
              </div>
              {workers.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2">
                  <AlertCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                  <p className="mobile-small-text text-elec-light text-center leading-tight">
                    Team coordination overhead applied ({((1 - getTeamEfficiencyFactor()) * 100).toFixed(0)}% efficiency loss)
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MobileMultiWorkerManager;