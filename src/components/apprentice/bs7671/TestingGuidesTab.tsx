
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Zap, Shield, TestTube, PlayCircle, FileText } from "lucide-react";

const TestingGuidesTab = () => {
  const testingCategories = [
    {
      id: "continuity",
      title: "Continuity Testing",
      icon: Zap,
      description: "R1+R2 and protective conductor continuity",
      tests: [
        { name: "Protective Conductor Continuity", time: "10-15 mins", difficulty: "Beginner" },
        { name: "Ring Final Circuit Continuity", time: "15-20 mins", difficulty: "Intermediate" },
        { name: "R1+R2 Values", time: "20-30 mins", difficulty: "Intermediate" }
      ]
    },
    {
      id: "insulation",
      title: "Insulation Resistance",
      icon: Shield,
      description: "IR testing between conductors and earth",
      tests: [
        { name: "Phase to Neutral IR", time: "5-10 mins", difficulty: "Beginner" },
        { name: "Phase to Earth IR", time: "5-10 mins", difficulty: "Beginner" },
        { name: "Neutral to Earth IR", time: "5-10 mins", difficulty: "Beginner" }
      ]
    },
    {
      id: "earth-loop",
      title: "Earth Fault Loop",
      icon: Activity,
      description: "Zs testing and protective device operation",
      tests: [
        { name: "Earth Fault Loop Impedance", time: "10-15 mins", difficulty: "Intermediate" },
        { name: "Prospective Fault Current", time: "10-15 mins", difficulty: "Advanced" },
        { name: "Maximum Zs Values Check", time: "5-10 mins", difficulty: "Intermediate" }
      ]
    },
    {
      id: "rcd",
      title: "RCD Testing",
      icon: TestTube,
      description: "RCD operation and trip times",
      tests: [
        { name: "RCD Trip Time Test", time: "10-15 mins", difficulty: "Intermediate" },
        { name: "RCD Ramp Test", time: "15-20 mins", difficulty: "Advanced" },
        { name: "RCD Push Button Test", time: "2-5 mins", difficulty: "Beginner" }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400';
      case 'Advanced': return 'bg-red-500/10 text-red-400';
      default: return 'bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Testing Overview */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Testing Sequence Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">BS 7671 Testing Order</h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">1</span>
                  Continuity of protective conductors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">2</span>
                  Continuity of ring final circuits
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">3</span>
                  Insulation resistance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">4</span>
                  Polarity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">5</span>
                  Earth fault loop impedance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs flex items-center justify-center font-bold">6</span>
                  RCD operation
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Essential Equipment</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multifunction Tester (MFT)</li>
                <li>• RCD Tester</li>
                <li>• Voltage Indicator</li>
                <li>• Proving Unit</li>
                <li>• Test Leads and Probes</li>
                <li>• Lock-off Devices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Categories */}
      <Tabs defaultValue="continuity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {testingCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden md:inline">{category.title}</span>
              <span className="md:hidden">{category.title.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {testingCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.title}
                </CardTitle>
                <p className="text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.tests.map((test, index) => (
                    <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{test.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                            {test.time}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Start Guide
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Reference
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TestingGuidesTab;
