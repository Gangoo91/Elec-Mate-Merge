
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
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Complete BS7671 Testing Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Comprehensive step-by-step testing procedures covering all required BS 7671 (18th Edition) 
            inspection and testing requirements. Each test includes detailed instructions, safety warnings, 
            regulation references, and troubleshooting guidance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{allBS7671Tests.length}</div>
              <div className="text-sm text-muted-foreground">Complete Tests</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {allBS7671Tests.reduce((total, test) => total + test.steps.length, 0)}+
              </div>
              <div className="text-sm text-muted-foreground">Detailed Steps</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">BS 7671</div>
              <div className="text-sm text-muted-foreground">18th Edition</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">100%</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-elec-dark border border-elec-yellow/20 rounded-md px-3 py-2 text-white"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <Card key={test.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    {getTestIcon(test.id)}
                    {test.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(test.difficulty)}>
                      {test.difficulty}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {test.duration}
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{test.description}</p>
              <div className="text-xs text-cyan-400">{test.regulationClause}</div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                  <h4 className="font-medium text-blue-300 mb-2">Purpose</h4>
                  <p className="text-sm text-muted-foreground">{test.purpose}</p>
                </div>

                {test.testLimits.length > 0 && (
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <h4 className="font-medium text-green-300 mb-2">Test Limits</h4>
                    <div className="space-y-1">
                      {test.testLimits.slice(0, 2).map((limit, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex justify-between">
                          <span>{limit.parameter}:</span>
                          <span className="font-mono">{limit.limit} {limit.unit}</span>
                        </div>
                      ))}
                      {test.testLimits.length > 2 && (
                        <div className="text-xs text-muted-foreground italic">
                          +{test.testLimits.length - 2} more limits...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
                  <h4 className="font-medium text-amber-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Common Issues
                  </h4>
                  <ul className="space-y-1">
                    {test.commonIssues.slice(0, 2).map((issue, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                  <h4 className="font-medium text-purple-300 mb-2">Test Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {test.steps.length} detailed steps
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Safety warnings
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Equipment lists
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Regulation refs
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={() => handleTestSelect(test)}
                    className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    Start Test Procedure
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-300 mb-2">No Tests Found</h3>
            <p className="text-muted-foreground">
              No tests match your current search criteria. Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Testing Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">Before Testing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete safe isolation procedure and prove dead</li>
                <li>• Verify test equipment calibration and functionality</li>
                <li>• Have circuit diagrams and schedules available</li>
                <li>• Plan testing sequence to minimise re-isolation</li>
                <li>• Ensure adequate lighting and access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-amber-300">During Testing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Record all readings, even satisfactory ones</li>
                <li>• Take photographs of test setups for records</li>
                <li>• Double-check unusual or borderline readings</li>
                <li>• Follow the prescribed testing sequence</li>
                <li>• Document any deviations or observations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunThroughStepsTab;
