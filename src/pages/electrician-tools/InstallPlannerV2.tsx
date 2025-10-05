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
          <div className="relative">
            {/* Back button - floating top-left on mobile, inline on desktop */}
            <div className="absolute top-0 left-0 md:hidden">
              <Link to="/electrician">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
            </div>
            
            {/* Main content - centered on mobile, flex on desktop */}
            <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between pl-12 md:pl-0">
              <div className="text-center md:text-left md:flex md:items-center md:gap-3">
                {/* Back button - visible only on desktop */}
                <Link to="/electrician" className="hidden md:block">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                </Link>
                
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    Installation Designer
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base mt-1">BS 7671:2018 Compliant</p>
                </div>
              </div>
              
              {/* Save/Load - centered under title on mobile */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <SaveManager planData={planData} onLoad={setPlanData} />
              </div>
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
