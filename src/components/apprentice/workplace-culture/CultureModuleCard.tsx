
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CultureModule } from "./types";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CultureModuleCardProps {
  module: CultureModule;
  onSelect: (module: CultureModule) => void;
  progress?: number;
  isCompleted?: boolean;
}

const CultureModuleCard = ({ module, onSelect, progress = 0, isCompleted = false }: CultureModuleCardProps) => {
  const ModuleIcon = module.icon;

  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-elec-gray to-elec-card cursor-pointer transition-all overflow-hidden relative group",
        isCompleted
          ? "border-green-500/30 hover:border-green-500/50"
          : "border-elec-yellow/20 hover:border-elec-yellow/40"
      )}
      onClick={() => onSelect(module)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2.5 rounded-xl border",
              isCompleted
                ? "bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30"
                : "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30"
            )}>
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <ModuleIcon className="h-5 w-5 text-elec-yellow" />
              )}
            </div>
            <CardTitle className="text-lg text-white">{module.title}</CardTitle>
          </div>
          {isCompleted && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3">
        <CardDescription className="text-white/70">
          {module.description}
        </CardDescription>
        {progress > 0 && !isCompleted && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Progress</span>
              <span className="text-elec-yellow font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </CardContent>
      <CardFooter className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full h-11 touch-manipulation active:scale-95 transition-all",
            isCompleted
              ? "border-green-500/30 hover:border-green-500 hover:bg-green-500/10 text-green-400"
              : "border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/10 text-elec-yellow"
          )}
        >
          {isCompleted ? "Review Module" : progress > 0 ? "Continue" : "Start Module"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CultureModuleCard;
