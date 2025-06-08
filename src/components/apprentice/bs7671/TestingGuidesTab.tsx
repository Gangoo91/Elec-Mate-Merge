
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Zap, Shield, TestTube, PlayCircle, FileText, ArrowLeft } from "lucide-react";
import { testingGuides, getTestGuideById, TestGuide } from "@/data/bs7671-testing/testingGuidesData";
import InteractiveTestingGuide from "./InteractiveTestingGuide";

const TestingGuidesTab = () => {
  const [activeGuide, setActiveGuide] = useState<TestGuide | null>(null);

  const testingCategories = [
    {
      id: "continuity",
      title: "Continuity Testing",
      icon: Zap,
      description: "R1+R2 and protective conductor continuity",
      guides: testingGuides.filter(guide => guide.id.includes("continuity"))
    },
    {
      id: "insulation",
      title: "Insulation Resistance",
      icon: Shield,
      description: "IR testing between conductors and earth",
      guides: testingGuides.filter(guide => guide.id.includes("insulation"))
    },
    {
      id: "earth-loop",
      title: "Earth Fault Loop",
      icon: Activity,
      description: "Zs testing and protective device operation",
      guides: []
    },
    {
      id: "rcd",
      title: "RCD Testing",
      icon: TestTube,
      description: "RCD operation and trip times",
      guides: testingGuides.filter(guide => guide.id.includes("rcd"))
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

  const handleStartGuide = (guideId: string) => {
    const guide = getTestGuideById(guideId);
    if (guide) {
      setActiveGuide(guide);
    }
  };

  const handleCompleteGuide = () => {
    // Here you could track completion, update progress, etc.
    setActiveGuide(null);
  };

  const handleBackToGuides = () => {
    setActiveGuide(null);
  };

  if (activeGuide) {
    return (
      <InteractiveTestingGuide
        guide={activeGuide}
        onComplete={handleCompleteGuide}
        onBack={handleBackToGuides}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Testing Overview */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Interactive Testing Guides
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
              <h4 className="font-semibold mb-3">Available Guides</h4>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-green-400">{testingGuides.filter(g => g.difficulty === 'Beginner').length}</span> Beginner guides
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-yellow-400">{testingGuides.filter(g => g.difficulty === 'Intermediate').length}</span> Intermediate guides
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-red-400">{testingGuides.filter(g => g.difficulty === 'Advanced').length}</span> Advanced guides
                </div>
              </div>
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
                  {category.guides.length > 0 ? (
                    category.guides.map((guide, index) => (
                      <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-white">{guide.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                              {guide.duration}
                            </Badge>
                            <Badge variant="outline" className={getDifficultyColor(guide.difficulty)}>
                              {guide.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleStartGuide(guide.id)}
                          >
                            <PlayCircle className="h-3 w-3 mr-1" />
                            Start Interactive Guide
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3 mr-1" />
                            Reference
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border border-elec-yellow/20 rounded-lg">
                      <TestTube className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h4 className="font-medium text-white mb-2">Guides Coming Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        Interactive guides for {category.title.toLowerCase()} are being developed.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Reference Card */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Testing Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Before Testing</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Ensure safe isolation is complete</li>
                <li>• Check test equipment is calibrated</li>
                <li>• Remove or isolate electronic devices</li>
                <li>• Have appropriate test certificates ready</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">During Testing</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Follow the correct test sequence</li>
                <li>• Record all readings accurately</li>
                <li>• Compare results with acceptable limits</li>
                <li>• Note any unusual readings or observations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingGuidesTab;
