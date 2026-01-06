
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight, 
  Search,
  Filter,
  Zap,
  Shield,
  Activity,
  GitBranch,
  Eye,
  RotateCcw,
  TestTube
} from "lucide-react";
import InteractiveTestingGuide from "./InteractiveTestingGuide";
import { allBS7671Tests, BS7671Test } from "@/data/bs7671-testing/allBS7671Tests";

const RunThroughStepsTab = () => {
  const [selectedTest, setSelectedTest] = useState<BS7671Test | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");

  const handleTestSelect = (test: BS7671Test) => {
    setSelectedTest(test);
  };

  const handleTestComplete = () => {
    console.log("Test completed!");
    setSelectedTest(null);
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getTestIcon = (testId: string) => {
    switch (testId) {
      case 'continuity-protective-conductor':
        return <Shield className="h-5 w-5" />;
      case 'ring-circuit-continuity':
        return <RotateCcw className="h-5 w-5" />;
      case 'insulation-resistance-testing':
        return <Activity className="h-5 w-5" />;
      case 'polarity-testing':
        return <GitBranch className="h-5 w-5" />;
      case 'earth-fault-loop-impedance':
        return <Zap className="h-5 w-5" />;
      case 'rcd-testing':
        return <Shield className="h-5 w-5" />;
      case 'prospective-fault-current':
        return <AlertTriangle className="h-5 w-5" />;
      case 'phase-sequence':
        return <RotateCcw className="h-5 w-5" />;
      case 'functional-testing':
        return <TestTube className="h-5 w-5" />;
      default:
        return <Eye className="h-5 w-5" />;
    }
  };

  const filteredTests = allBS7671Tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "All" || test.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  if (selectedTest) {
    return (
      <InteractiveTestingGuide
        guide={selectedTest}
        onComplete={handleTestComplete}
        onBack={handleBackToTests}
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
              <BookOpen className="h-5 w-5 text-cyan-400" />
            </div>
            Complete BS7671 Testing Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <p className="text-white/70">
            Comprehensive step-by-step testing procedures covering all required BS 7671 (18th Edition)
            inspection and testing requirements. Each test includes detailed instructions, safety warnings,
            regulation references, and troubleshooting guidance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-green-500/20 inline-block mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">{allBS7671Tests.length}</div>
              <div className="text-xs text-white/60">Complete Tests</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-blue-500/20 inline-block mb-2">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {allBS7671Tests.reduce((total, test) => total + test.steps.length, 0)}+
              </div>
              <div className="text-xs text-white/60">Detailed Steps</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-purple-500/20 inline-block mb-2">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">BS 7671</div>
              <div className="text-xs text-white/60">18th Edition</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-center">
              <div className="p-2 rounded-lg bg-elec-yellow/20 inline-block mb-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
              </div>
              <div className="text-2xl font-bold text-elec-yellow">100%</div>
              <div className="text-xs text-white/60">Compliant</div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/70 focus:border-cyan-500/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <Filter className="h-4 w-4 text-white/60" />
              </div>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="h-11 bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500/50 transition-colors"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTests.map((test) => (
          <Card key={test.id} className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 hover:border-elec-yellow/30 transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 flex-shrink-0">
                      {getTestIcon(test.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-white text-lg leading-tight">{test.title}</CardTitle>
                      <p className="text-sm text-white/60 mt-1">{test.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${getDifficultyColor(test.difficulty)} border`}>
                      {test.difficulty}
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      {test.duration}
                    </Badge>
                    <span className="text-xs text-cyan-400 font-mono">{test.regulationClause}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 relative">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2 text-sm">Purpose</h4>
                <p className="text-sm text-white/70">{test.purpose}</p>
              </div>

              {test.testLimits.length > 0 && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-2 text-sm">Test Limits</h4>
                  <div className="space-y-1">
                    {test.testLimits.slice(0, 2).map((limit, index) => (
                      <div key={index} className="text-sm text-white/70 flex justify-between">
                        <span>{limit.parameter}:</span>
                        <span className="font-mono text-green-300">{limit.limit} {limit.unit}</span>
                      </div>
                    ))}
                    {test.testLimits.length > 2 && (
                      <div className="text-xs text-white/80 italic">
                        +{test.testLimits.length - 2} more limits...
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <h4 className="font-medium text-orange-400 mb-2 text-sm flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Common Issues
                </h4>
                <ul className="space-y-1">
                  {test.commonIssues.slice(0, 2).map((issue, index) => (
                    <li key={index} className="text-xs text-white/70 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2 text-sm">Test Features</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    {test.steps.length} detailed steps
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Safety warnings
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Equipment lists
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    Regulation refs
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleTestSelect(test)}
                className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
              >
                Start Test Procedure
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <Card className="bg-gradient-to-br from-white/5 to-elec-card border-orange-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="text-center py-12 relative">
            <div className="p-4 rounded-xl bg-orange-500/10 inline-block mb-4">
              <Search className="h-10 w-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Tests Found</h3>
            <p className="text-white/60 max-w-md mx-auto">
              No tests match your current search criteria. Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Best Practices Card */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
            </div>
            Testing Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <h4 className="font-semibold text-white">Before Testing</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Complete safe isolation procedure and prove dead",
                  "Verify test equipment calibration and functionality",
                  "Have circuit diagrams and schedules available",
                  "Plan testing sequence to minimise re-isolation",
                  "Ensure adequate lighting and access"
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
                <h4 className="font-semibold text-white">During Testing</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Record all readings, even satisfactory ones",
                  "Take photographs of test setups for records",
                  "Double-check unusual or borderline readings",
                  "Follow the prescribed testing sequence",
                  "Document any deviations or observations"
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

export default RunThroughStepsTab;
