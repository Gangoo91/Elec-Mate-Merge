
import { Card, CardContent } from "@/components/ui/card";

const IRTestingTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold">Insulation Resistance (IR) Testing</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Tests the insulation resistance between live conductors and between live conductors and earth.
          </p>
          
          <ul className="list-disc pl-6 space-y-3 text-sm">
            <li>Ensure all circuit protection devices are ON and electronic devices are disconnected</li>
            <li>Select appropriate test voltage (typically 500V for most installations)</li>
            <li>Test between: Line-Neutral, Line-Earth, and Neutral-Earth</li>
            <li>Minimum acceptable values for new installations: 1MΩ for ≤ 500V installations</li>
            <li>Record all readings and note any unusually low values for investigation</li>
          </ul>
          
          <div className="mt-6 bg-gray-800/30 p-4 rounded-md">
            <img src="/placeholder.svg" alt="IR Testing Connections" className="mx-auto max-h-64" />
            <p className="text-xs text-center mt-2 text-muted-foreground">
              IR Test connection points diagram
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IRTestingTab;
