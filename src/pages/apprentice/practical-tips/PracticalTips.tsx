import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { FileText, Lightbulb, Hammer, Clock, Wrench, AlertTriangle } from "lucide-react";

const PracticalTips = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Practical Tips</h1>
          <p className="text-muted-foreground">
            Real-world advice from experienced electricians for apprentices
          </p>
        </div>
        <Link to="/apprentice/toolbox">
          <Button variant="outline">Back to Toolbox</Button>
        </Link>
      </div>

      <Tabs defaultValue="worksite">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="worksite">Worksite Tips</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="worksite" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Hammer className="h-5 w-5 text-elec-yellow" />
                Daily Worksite Practices
              </CardTitle>
              <CardDescription>General advice for common site situations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4" />
                    Working Efficiently with Limited Tools
                  </h3>
                  <p className="text-sm mb-3">
                    As an apprentice, you might not have a full set of tools yet. Here are some tips for working effectively with a basic toolkit:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Focus on quality rather than quantity - invest in fewer but better tools</li>
                    <li>Learn to properly maintain your tools so they last longer</li>
                    <li>Understand which tools are absolutely essential vs. nice-to-have</li>
                    <li>Ask to borrow specialized tools for specific tasks rather than buying everything at once</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    Time Management on Site
                  </h3>
                  <p className="text-sm mb-3">
                    Managing your time effectively is crucial for completing tasks efficiently and safely:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Plan your work sequence before starting to minimize back-and-forth movement</li>
                    <li>Group similar tasks together to maintain workflow momentum</li>
                    <li>Always factor in testing time when estimating how long a job will take</li>
                    <li>Set up your work area at the start of the day with all materials you'll need</li>
                    <li>Use downtime (waiting for other trades) to organize or plan next tasks</li>
                  </ul>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Apprentice Mistakes to Avoid
                  </h3>
                  <p className="text-sm mb-3">
                    Learn from others' experiences by avoiding these common pitfalls:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Not clearly marking cables before disconnecting them</li>
                    <li>Rushing measurements and having to redo work</li>
                    <li>Over-tightening terminal screws and damaging connections</li>
                    <li>Not checking for buried cables or pipes before drilling</li>
                    <li>Being afraid to ask questions when unsure about a task</li>
                  </ul>
                </div>
                
                <Button className="w-full">Read More Worksite Tips</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="troubleshooting" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Wrench className="h-5 w-5 text-elec-yellow" />
                Troubleshooting Common Issues
              </CardTitle>
              <CardDescription>Problem-solving approaches for common electrical issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-3">
                    RCD Tripping Issues
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Problem:</p>
                      <p className="text-sm text-muted-foreground">RCD trips immediately or intermittently when circuit is energized.</p>
                    </div>
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Potential Causes:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Earth leakage in a connected appliance</li>
                        <li>Moisture ingress in outdoor equipment</li>
                        <li>Damaged cable insulation</li>
                        <li>Cross-connection between neutral and earth</li>
                      </ul>
                    </div>
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Systematic Approach:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Disconnect all loads from the circuit</li>
                        <li>Test circuit with no loads connected</li>
                        <li>Reconnect loads one by one until tripping occurs</li>
                        <li>Check installation for damaged cables or incorrect connections</li>
                        <li>Use insulation resistance testing to identify faults</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="bg-elec-dark p-4 rounded-md">
                  <h3 className="font-medium text-elec-yellow mb-3">
                    Lighting Circuit Issues
                  </h3>
                  <div className="space-y-2">
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Problem:</p>
                      <p className="text-sm text-muted-foreground">LED lights flicker or don't switch off properly.</p>
                    </div>
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Potential Causes:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Incompatible dimmer switch</li>
                        <li>Minimum load requirements not met</li>
                        <li>Poor neutral connection</li>
                        <li>LED driver issues</li>
                      </ul>
                    </div>
                    <div className="bg-elec-gray/20 p-3 rounded">
                      <p className="text-sm font-medium mb-1">Systematic Approach:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Check if dimmer is LED-compatible</li>
                        <li>Verify voltage levels at switch and fixture</li>
                        <li>Check for loose connections at switch and fittings</li>
                        <li>Try a different brand of LED lamp</li>
                        <li>Install a load resistor if needed</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">View More Troubleshooting Guides</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-xl">Work Organization & Planning</CardTitle>
              <CardDescription>Tips for staying organized and efficient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-elec-yellow mb-3">Daily Organization</h3>
                  <div className="bg-elec-dark p-4 rounded-md space-y-3">
                    <p className="text-sm">Developing good organizational habits will save time and prevent mistakes:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Prepare a daily task list in order of priority</li>
                      <li>Gather all materials and tools needed before starting work</li>
                      <li>Take photos of existing installations before disassembly</li>
                      <li>Label wires and components when removing for future reference</li>
                      <li>Keep a small notebook for measurements and important information</li>
                      <li>Clean up your work area as you go rather than all at the end</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-elec-yellow mb-3">Tool Organization</h3>
                  <div className="bg-elec-dark p-4 rounded-md space-y-3">
                    <p className="text-sm">An organized toolkit improves efficiency and extends tool life:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Use tool pouches or belts for frequently used tools</li>
                      <li>Group similar tools together in your toolbox</li>
                      <li>Use foam tool organizers to quickly spot missing tools</li>
                      <li>Keep a small container for screws and fittings you remove</li>
                      <li>Clean tools after use, especially in dusty environments</li>
                      <li>Regular inventory checks to identify what needs replacement</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-elec-yellow mb-3">Documentation</h3>
                  <div className="bg-elec-dark p-4 rounded-md space-y-3">
                    <p className="text-sm">Good documentation practices are essential for professional work:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Keep digital copies of certificates and qualifications</li>
                      <li>Take before and after photos of all installations</li>
                      <li>Document any deviations from original plans</li>
                      <li>Create simple circuit diagrams for future reference</li>
                      <li>Keep a record of parts used for each job</li>
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full">Download Organization Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticalTips;
