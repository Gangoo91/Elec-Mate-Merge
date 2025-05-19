
import { Button } from "@/components/ui/button";

const TestingResources = () => {
  return (
    <div className="bg-amber-950/20 border border-amber-600/30 rounded-md p-6">
      <h3 className="text-lg font-semibold text-elec-yellow mb-2">Testing Resources</h3>
      <p className="text-sm text-amber-200/90 mb-4">
        These testing procedures are derived from the 18th Edition Wiring Regulations (BS 7671) and 
        the Guidance Note 3: Inspection and Testing. Always refer to the latest regulations for 
        definitive guidance.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="border-amber-600/30 hover:bg-amber-950/30">
          Download Full Testing Guide
        </Button>
        <Button variant="outline" className="border-amber-600/30 hover:bg-amber-950/30">
          Print Checklist PDF
        </Button>
      </div>
    </div>
  );
};

export default TestingResources;
