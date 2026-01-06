
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Clock, AlertTriangle, Lightbulb, CheckCircle, ArrowRight, Shield, Activity } from "lucide-react";
import InteractiveTestingGuide from "./InteractiveTestingGuide";
import { allBS7671Tests, BS7671Test } from "@/data/bs7671-testing/allBS7671Tests";

const ComprehensiveTestingGuidesTab = () => {
  const [selectedGuide, setSelectedGuide] = useState<BS7671Test | null>(null);

  const handleGuideSelect = (guide: BS7671Test) => {
    setSelectedGuide(guide);
  };

  const handleGuideComplete = () => {
    console.log("Guide completed!");
    setSelectedGuide(null);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
      case 'Intermediate': return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30' };
      case 'Advanced': return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
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
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
              <Book className="h-5 w-5 text-cyan-400" />
            </div>
            Comprehensive Testing Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <p className="text-white/70">
            Detailed, step-by-step testing procedures with technical specifications, safety warnings,
            and troubleshooting guidance. Each guide includes regulation references and practical tips
            from industry professionals.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-green-500/20 inline-block mb-2">
                <Book className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">{allBS7671Tests.length}</div>
              <div className="text-xs text-white/60">Available Guides</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-blue-500/20 inline-block mb-2">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">100+</div>
              <div className="text-xs text-white/60">Detailed Steps</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-purple-500/20 inline-block mb-2">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">BS 7671</div>
              <div className="text-xs text-white/60">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {allBS7671Tests.map((guide) => {
          const difficultyConfig = getDifficultyConfig(guide.difficulty);
          return (
            <Card key={guide.id} className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-elec-yellow/30 transition-all duration-300 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="space-y-3">
                  <CardTitle className="text-white text-lg leading-tight">{guide.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${difficultyConfig.bg} ${difficultyConfig.text} border ${difficultyConfig.border}`}>
                      {guide.difficulty}
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.steps.length} steps
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60">{guide.description}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 relative">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-2 text-sm">Purpose</h4>
                  <p className="text-sm text-white/70">{guide.purpose}</p>
                </div>

                {guide.testLimits && guide.testLimits.length > 0 && (
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2 text-sm">Test Limits</h4>
                    <div className="space-y-1">
                      {guide.testLimits.map((limit, index) => (
                        <div key={index} className="text-sm text-white/70 flex justify-between">
                          <span>{limit.parameter}:</span>
                          <span className="font-mono text-green-300">{limit.limit} {limit.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <h4 className="font-medium text-orange-400 mb-2 text-sm flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Common Issues
                  </h4>
                  <ul className="space-y-1">
                    {guide.commonIssues.slice(0, 2).map((issue, index) => (
                      <li key={index} className="text-xs text-white/70 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-medium text-purple-400 mb-2 text-sm">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {guide.steps.length} detailed steps
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Safety warnings
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Troubleshooting tips
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Regulation refs
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleGuideSelect(guide)}
                  className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
                >
                  Start Interactive Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Tips Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
            </div>
            Professional Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">Before You Start</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Always complete safe isolation procedure first",
                  "Ensure test equipment is calibrated and functioning",
                  "Have circuit diagrams and schedules available",
                  "Plan your testing sequence to avoid repeated isolation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Activity className="h-4 w-4 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white">Best Practices</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Record all readings, even if they're within limits",
                  "Take photos of test setups for documentation",
                  "Double-check readings that seem unusual",
                  "Keep detailed notes for future reference"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveTestingGuidesTab;
