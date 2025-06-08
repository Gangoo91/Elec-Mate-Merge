
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Clock, AlertTriangle, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import InteractiveTestingGuide from "./InteractiveTestingGuide";
import { comprehensiveTestingGuides, EnhancedTestGuide } from "@/data/bs7671-testing/comprehensiveTestingGuides";

const ComprehensiveTestingGuidesTab = () => {
  const [selectedGuide, setSelectedGuide] = useState<EnhancedTestGuide | null>(null);

  const handleGuideSelect = (guide: EnhancedTestGuide) => {
    setSelectedGuide(guide);
  };

  const handleGuideComplete = () => {
    console.log("Guide completed!");
    setSelectedGuide(null);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  if (selectedGuide) {
    return (
      <InteractiveTestingGuide
        guide={selectedGuide}
        onComplete={handleGuideComplete}
        onBack={handleBackToGuides}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Book className="h-5 w-5" />
            Comprehensive Testing Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Detailed, step-by-step testing procedures with technical specifications, safety warnings, 
            and troubleshooting guidance. Each guide includes regulation references and practical tips 
            from industry professionals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{comprehensiveTestingGuides.length}</div>
              <div className="text-sm text-muted-foreground">Available Guides</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">100+</div>
              <div className="text-sm text-muted-foreground">Detailed Steps</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {comprehensiveTestingGuides.map((guide) => (
          <Card key={guide.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-white text-lg">{guide.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.duration}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{guide.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                  <h4 className="font-medium text-blue-300 mb-2">Purpose</h4>
                  <p className="text-sm text-muted-foreground">{guide.purpose}</p>
                </div>

                {guide.testLimits.length > 0 && (
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <h4 className="font-medium text-green-300 mb-2">Test Limits</h4>
                    <div className="space-y-1">
                      {guide.testLimits.map((limit, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex justify-between">
                          <span>{limit.parameter}:</span>
                          <span className="font-mono">{limit.limit} {limit.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                  <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Issues
                  </h4>
                  <ul className="space-y-1">
                    {guide.commonIssues.slice(0, 2).map((issue, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="font-medium text-purple-300 mb-2">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {guide.steps.length} detailed steps
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Safety warnings
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Troubleshooting tips
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Regulation refs
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={() => handleGuideSelect(guide)}
                    className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    Start Interactive Guide
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Professional Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Before You Start</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always complete safe isolation procedure first</li>
                <li>• Ensure test equipment is calibrated and functioning</li>
                <li>• Have circuit diagrams and schedules available</li>
                <li>• Plan your testing sequence to avoid repeated isolation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Record all readings, even if they're within limits</li>
                <li>• Take photos of test setups for documentation</li>
                <li>• Double-check readings that seem unusual</li>
                <li>• Keep detailed notes for future reference</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveTestingGuidesTab;
