
import { Button } from "@/components/ui/button";

const SidebarFooter = () => {
  return (
    <div className="p-4 border-t border-elec-yellow/20">
      <div className="rounded-md bg-elec-yellow/10 p-3">
        <h3 className="font-medium text-elec-yellow">Free Trial</h3>
        <p className="mt-1 text-xs">
          Enhance your electrical skills with premium features.
        </p>
        <Button 
          variant="default" 
          className="mt-2 w-full text-sm h-8"
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default SidebarFooter;
