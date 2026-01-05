import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Workflow, CheckCircle2 } from 'lucide-react';

export const BMSModule7Section3ContentPart3 = () => {
  const workflowSteps = [
    {
      step: "1",
      title: "Assign addresses",
      description: "Each device is configured with a unique ID"
    },
    {
      step: "2", 
      title: "Wire devices correctly",
      description: "Ensure polarity and bus terminations are correct"
    },
    {
      step: "3",
      title: "Map I/O points in software", 
      description: "Link each signal to the correct controller channel"
    },
    {
      step: "4",
      title: "Test communication",
      description: "Confirm data appears in the BMS and outputs respond correctly"
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Workflow className="h-5 w-5 text-elec-yellow" />
          Addressing and Mapping Workflow
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid gap-4">
          {workflowSteps.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-gradient-to-r from-elec-yellow/5 to-transparent border border-elec-yellow/20 rounded-lg p-4">
              <div className="bg-elec-yellow text-elec-dark rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-foreground text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Example</h4>
          <p className="text-foreground">
            An AHU fan status wired into Digital Input 5 must show up on the BMS dashboard as "AHU-1 Fan Running" — not as a random spare input.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4">
          <h4 className="text-cyan-300 font-semibold mb-2">💡 Inline Check</h4>
          <p className="text-foreground font-medium">
            At what stage is communication testing carried out: before or after device mapping?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};