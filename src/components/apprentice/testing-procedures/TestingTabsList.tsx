
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Check, GitBranch, Zap } from "lucide-react";

const TestingTabsList = () => {
  return (
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger value="r1r2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Zap className="h-4 w-4" />
          <span className="hidden md:block">R1+R2 Testing</span>
          <span className="block md:hidden">R1+R2</span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="ir">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Activity className="h-4 w-4" />
          <span>IR Testing</span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="zs">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <GitBranch className="h-4 w-4" />
          <span>Zs Testing</span>
        </div>
      </TabsTrigger>
      <TabsTrigger value="polarity">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Polarity</span>
        </div>
      </TabsTrigger>
    </TabsList>
  );
};

export default TestingTabsList;
