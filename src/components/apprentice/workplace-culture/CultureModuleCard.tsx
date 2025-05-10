
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
      className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors"
      onClick={() => onSelect(module)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow/10">
            <ModuleIcon className="h-5 w-5 text-elec-yellow" />
          </div>
          <CardTitle className="text-lg">{module.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-elec-light/80">
          {module.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Module</Button>
      </CardFooter>
    </Card>
  );
};

export default CultureModuleCard;
