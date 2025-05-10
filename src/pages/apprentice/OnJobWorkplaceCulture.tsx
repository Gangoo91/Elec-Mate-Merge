
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CultureModule } from "@/components/apprentice/workplace-culture/types";
import { cultureModules } from "@/components/apprentice/workplace-culture/cultureModulesData";
import CultureModuleCard from "@/components/apprentice/workplace-culture/CultureModuleCard";
import LearningResourcesCard from "@/components/apprentice/workplace-culture/LearningResourcesCard";
import ModuleDetailView from "@/components/apprentice/workplace-culture/ModuleDetailView";

const OnJobWorkplaceCulture = () => {
  const [activeModule, setActiveModule] = useState<CultureModule | null>(null);

  const handleModuleSelect = (module: CultureModule) => {
    setActiveModule(module);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workplace Language & Culture</h1>
          <p className="text-muted-foreground">Navigate workplace communication and relationships effectively</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {!activeModule ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureModules.map(module => (
              <CultureModuleCard 
                key={module.id}
                module={module}
                onSelect={handleModuleSelect}
              />
            ))}
          </div>
          
          <LearningResourcesCard />
        </div>
      ) : (
        <ModuleDetailView 
          module={activeModule} 
          onBack={() => setActiveModule(null)}
        />
      )}
    </div>
  );
};

export default OnJobWorkplaceCulture;
