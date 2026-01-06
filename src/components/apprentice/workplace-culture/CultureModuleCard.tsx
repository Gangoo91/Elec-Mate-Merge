
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CultureModule } from "./types";

interface CultureModuleCardProps {
  module: CultureModule;
  onSelect: (module: CultureModule) => void;
}

const CultureModuleCard = ({ module, onSelect }: CultureModuleCardProps) => {
  const ModuleIcon = module.icon;

  return (
    <Card
      className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 cursor-pointer transition-all overflow-hidden relative group"
      onClick={() => onSelect(module)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <ModuleIcon className="h-5 w-5 text-elec-yellow" />
          </div>
          <CardTitle className="text-lg text-white">{module.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <CardDescription className="text-white/70">
          {module.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="relative">
        <Button
          variant="outline"
          className="w-full h-11 border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 text-elec-yellow touch-manipulation active:scale-95 transition-all"
        >
          View Module
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CultureModuleCard;
