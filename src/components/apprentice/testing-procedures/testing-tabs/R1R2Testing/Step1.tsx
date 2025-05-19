
import { ScrollArea } from "@/components/ui/scroll-area";

const R1R2Step1 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 1: Prepare for Testing</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Isolate the circuit and ensure it's safe to test</li>
        <li>Verify the test instrument is functioning correctly using a calibration check</li>
        <li>Ensure all protective conductors are correctly identified</li>
        <li>Remove any electronic devices that might be damaged by testing</li>
        <li>Check that the installation complies with BS 7671 regulations</li>
        <li>Ensure that proper labels and documentation are available</li>
      </ul>
      <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
        <ScrollArea className="w-full max-w-full">
          <img src="/placeholder.svg" alt="R1+R2 Testing Equipment Setup" className="mx-auto max-h-64" />
        </ScrollArea>
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Proper test equipment connection diagram
        </p>
      </div>
      
      <div className="p-4 border border-amber-500/30 rounded-md bg-amber-900/20 mt-4">
        <h4 className="font-medium text-amber-300 mb-1">Safety Reminder</h4>
        <p className="text-sm text-amber-100/90">
          Always wear appropriate PPE and follow the required safe isolation procedure before commencing any testing. Keep unauthorised persons away from the testing area.
        </p>
      </div>
    </div>
  );
};

export default R1R2Step1;
