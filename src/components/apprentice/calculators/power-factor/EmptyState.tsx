
import { PlugZap } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center text-muted-foreground">
      <PlugZap className="h-12 w-12 mx-auto mb-2 opacity-50" />
      <p>Enter values to calculate power factor</p>
    </div>
  );
};

export default EmptyState;
