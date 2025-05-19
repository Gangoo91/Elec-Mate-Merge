
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, GitBranch, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const TestingTabsList = () => {
  return (
    <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 p-1.5 gap-1.5 bg-elec-gray rounded-lg shadow-inner">
      <TabsTrigger 
        value="r1r2" 
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
          "data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-amber-500/90",
          "data-[state=active]:text-black data-[state=active]:shadow-md",
          "transition-all duration-200 hover:bg-elec-gray/70"
        )}
      >
        <Zap className="h-4 w-4" />
        <span className="hidden sm:block">R1+R2 Testing</span>
        <span className="block sm:hidden">R1+R2</span>
      </TabsTrigger>
      <TabsTrigger 
        value="ir" 
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
          "data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-amber-500/90",
          "data-[state=active]:text-black data-[state=active]:shadow-md",
          "transition-all duration-200 hover:bg-elec-gray/70"
        )}
      >
        <Activity className="h-4 w-4" />
        <span className="hidden sm:block">Insulation Resistance</span>
        <span className="block sm:hidden">IR Test</span>
      </TabsTrigger>
      <TabsTrigger 
        value="zs" 
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
          "data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-amber-500/90",
          "data-[state=active]:text-black data-[state=active]:shadow-md",
          "transition-all duration-200 hover:bg-elec-gray/70"
        )}
      >
        <GitBranch className="h-4 w-4" />
        <span className="hidden sm:block">Earth Fault Loop</span>
        <span className="block sm:hidden">Zs Test</span>
      </TabsTrigger>
      <TabsTrigger 
        value="polarity" 
        className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
          "data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-amber-500/90",
          "data-[state=active]:text-black data-[state=active]:shadow-md",
          "transition-all duration-200 hover:bg-elec-gray/70"
        )}
      >
        <Check className="h-4 w-4" />
        <span className="hidden sm:block">Polarity Testing</span>
        <span className="block sm:hidden">Polarity</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default TestingTabsList;
