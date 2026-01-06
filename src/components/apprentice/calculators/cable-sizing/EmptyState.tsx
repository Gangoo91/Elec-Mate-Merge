
import { Sigma } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center text-white">
      <Sigma className="h-12 w-12 mx-auto mb-2 opacity-50" />
      <p>Enter values to calculate recommended cable size</p>
    </div>
  );
};

export default EmptyState;
