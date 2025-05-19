
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, GitBranch, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const TestingTabsList = () => {
  return (
    <ScrollArea className="w-full">
      <TabsList className="grid grid-cols-4 mb-6 p-1.5 gap-1.5 bg-elec-gray rounded-lg shadow-inner min-w-full">
        <TabsTrigger 
          value="r1r2" 
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
            "data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-yellow-600/90",
            "data-[state=active]:text-black data-[state=active]:shadow-md",
            "transition-all duration-200 hover:bg-elec-gray/70"
          )}
        >
          <Zap className="h-4 w-4" />
          <span className="block text-[10px] sm:text-sm whitespace-nowrap">R1+R2</span>
        </TabsTrigger>
        <TabsTrigger 
          value="ir" 
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
            "data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-yellow-600/90",
            "data-[state=active]:text-black data-[state=active]:shadow-md",
            "transition-all duration-200 hover:bg-elec-gray/70"
          )}
        >
          <Activity className="h-4 w-4" />
          <span className="block text-[10px] sm:text-sm whitespace-nowrap">IR Test</span>
        </TabsTrigger>
        <TabsTrigger 
          value="zs" 
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
            "data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-yellow-600/90",
            "data-[state=active]:text-black data-[state=active]:shadow-md",
            "transition-all duration-200 hover:bg-elec-gray/70"
          )}
        >
          <GitBranch className="h-4 w-4" />
          <span className="block text-[10px] sm:text-sm whitespace-nowrap">Zs Test</span>
        </TabsTrigger>
        <TabsTrigger 
          value="polarity" 
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-1.5 py-3",
            "data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-yellow-600/90",
            "data-[state=active]:text-black data-[state=active]:shadow-md",
            "transition-all duration-200 hover:bg-elec-gray/70"
          )}
        >
          <Check className="h-4 w-4" />
          <span className="block text-[10px] sm:text-sm whitespace-nowrap">Polarity</span>
        </TabsTrigger>
      </TabsList>
    </ScrollArea>
  );
};

export default TestingTabsList;
