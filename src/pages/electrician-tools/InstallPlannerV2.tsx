import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EntrySelector } from "@/components/install-planner-v2/EntrySelector";
import { ExpressMode } from "@/components/install-planner-v2/ExpressMode";
import { ProfessionalMode } from "@/components/install-planner-v2/ProfessionalMode";
import { MultiCircuitMode } from "@/components/install-planner-v2/MultiCircuitMode";
import { InstallPlanDataV2 } from "@/components/install-planner-v2/types";
import { SaveManager } from "@/components/install-planner-v2/SaveManager";

export type PlanMode = 'entry' | 'express' | 'professional' | 'multi';

const InstallPlannerV2 = () => {
  const [mode, setMode] = useState<PlanMode>('entry');
  const [planData, setPlanData] = useState<InstallPlanDataV2>({
    mode: 'express',
    installationType: 'domestic',
    loadType: '',
    totalLoad: 0,
    voltage: 230,
    phases: 'single',
    cableLength: 0,
    cableType: 'pvc-twin-earth',
    installationMethod: 'clipped-direct',
    environmentalProfile: {
      autoDetected: {
        ambientTemp: 30,
        conditions: 'Indoor dry locations',
        earthing: 'TN-S',
        ze: 0.35,
        grouping: 1
      },
      userOverrides: {},
      finalApplied: {
        ambientTemp: 30,
        conditions: 'Indoor dry locations',
        earthing: 'TN-S',
        ze: 0.35,
        grouping: 1
      }
    }
  });

  const handleModeSelect = (selectedMode: 'express' | 'professional' | 'multi', presetData?: Partial<InstallPlanDataV2>) => {
    setMode(selectedMode);
    if (presetData) {
      setPlanData(prev => ({ ...prev, ...presetData, mode: selectedMode }));
    } else {
      setPlanData(prev => ({ ...prev, mode: selectedMode }));
    }
  };

  const handleReset = () => {
    setMode('entry');
    setPlanData({
      mode: 'express',
      installationType: 'domestic',
      loadType: '',
      totalLoad: 0,
      voltage: 230,
      phases: 'single',
      cableLength: 0,
      cableType: 'pvc-twin-earth',
      installationMethod: 'clipped-direct',
      environmentalProfile: {
        autoDetected: {
          ambientTemp: 30,
          conditions: 'Indoor dry locations',
          earthing: 'TN-S',
          ze: 0.35,
          grouping: 1
        },
        userOverrides: {},
        finalApplied: {
          ambientTemp: 30,
          conditions: 'Indoor dry locations',
          earthing: 'TN-S',
          ze: 0.35,
          grouping: 1
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Installation Designer
              </h1>
              <p className="text-muted-foreground mt-1">BS 7671:2018 Compliant</p>
            </div>
            <div className="flex items-center gap-3">
              <SaveManager planData={planData} onLoad={setPlanData} />
              <Link to="/electrician">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
            </div>
          </div>

          {/* Content */}
          {mode === 'entry' && (
            <EntrySelector onModeSelect={handleModeSelect} />
          )}

          {mode === 'express' && (
            <ExpressMode 
              planData={planData} 
              updatePlanData={setPlanData}
              onReset={handleReset}
            />
          )}

          {mode === 'professional' && (
            <ProfessionalMode 
              planData={planData}
              updatePlanData={setPlanData}
              onReset={handleReset}
            />
          )}

          {mode === 'multi' && (
            <MultiCircuitMode 
              planData={planData}
              updatePlanData={setPlanData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPlannerV2;
