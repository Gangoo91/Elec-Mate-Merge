
import { ScrollArea } from "@/components/ui/scroll-area";

const R1R2Step2 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 2: Perform the Test</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Set test metre to continuity/resistance mode</li>
        <li>Null the test leads to remove their resistance from the measurement</li>
        <li>Connect one lead to the main earth terminal</li>
        <li>Connect the other lead to each point being tested</li>
        <li>Record all readings in a systematic manner</li>
        <li>Ensure measurements are taken between all required points</li>
        <li>For ring final circuits, measure between live conductors and between live and CPC</li>
      </ul>
      
      <div className="p-4 border border-blue-500/30 rounded-md bg-blue-900/20 mt-4">
        <h4 className="font-medium text-blue-300 mb-1">Measurement Technique</h4>
        <p className="text-sm text-blue-100/90">
          Apply firm pressure when connecting test probes to ensure good contact. For larger conductors or terminals, use proper test leads with appropriate connectors rather than hand-held probes.
        </p>
      </div>
      
      <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
        <ScrollArea className="w-full max-w-full">
          <img src="/placeholder.svg" alt="R1+R2 Testing Process" className="mx-auto max-h-64" />
        </ScrollArea>
        <p className="text-xs text-center mt-2 text-muted-foreground">
          Testing process diagram showing proper testing technique
        </p>
      </div>
    </div>
  );
};

export default R1R2Step2;
