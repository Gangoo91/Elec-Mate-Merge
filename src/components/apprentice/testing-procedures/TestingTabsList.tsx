
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, GitBranch, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const TestingTabsList = () => {
  return (
    <TabsList className="grid grid-cols-4 mb-6 p-1.5 gap-1 bg-elec-gray rounded-lg">
      <TabsTrigger 
        value="r1r2" 
        className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-yellow-500/90 data-[state=active]:text-black transition-all"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Zap className="h-4 w-4" />
          <span className="hidden md:block">R1+R2 Testing</span>
          <span className="block md:hidden">R1+R2</span>
        </div>
      </TabsTrigger>
      <TabsTrigger 
        value="ir" 
        className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-yellow-500/90 data-[state=active]:text-black transition-all"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>IR Testing</span>
        </div>
      </TabsTrigger>
      <TabsTrigger 
        value="zs" 
        className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-yellow-500/90 data-[state=active]:text-black transition-all"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <GitBranch className="h-4 w-4" />
          <span>Zs Testing</span>
        </div>
      </TabsTrigger>
      <TabsTrigger 
        value="polarity" 
        className="flex flex-col md:flex-row items-center gap-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-elec-yellow/90 data-[state=active]:to-yellow-500/90 data-[state=active]:text-black transition-all"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Polarity</span>
        </div>
      </TabsTrigger>
    </TabsList>
  );
};

export default TestingTabsList;
