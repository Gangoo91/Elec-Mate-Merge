
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Brain, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const IntelligentPortfolioTab = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const portfolioItems = [
    {
      id: 1,
      title: "Consumer Unit Installation",
      type: "practical",
      aiScore: 92,
      completeness: 85,
      suggestions: ["Add more detail about testing procedures", "Include photos of completed work"],
      status: "excellent"
    },
    {
      id: 2,
      title: "Ring Circuit Testing",
      type: "technical",
      aiScore: 78,
      completeness: 70,
      suggestions: ["Expand on safety considerations", "Include calculation examples"],
      status: "good"
    },
    {
      id: 3,
      title: "Emergency Lighting Install",
      type: "commercial",
      aiScore: 65,
      completeness: 55,
      suggestions: ["Add compliance documentation", "Include circuit diagrams"],
      status: "needs-improvement"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "Files Uploaded",
      description: `${files.length} file(s) added for AI analysis`
    });
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis("AI Analysis: Your portfolio demonstrates strong practical skills. Consider adding more theoretical explanations and ensuring all safety procedures are documented. The evidence quality is good, but could benefit from clearer documentation of learning outcomes.");
      setIsAnalyzing(false);
      toast({
        title: "AI Analysis Complete",
        description: "Your portfolio has been analyzed with intelligent suggestions"
      });
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-600 text-white">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-600 text-white">Good</Badge>;
      case "needs-improvement":
        return <Badge className="bg-orange-600 text-white">Needs Work</Badge>;
      default:
        return <Badge>Average</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "good":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Portfolio Score</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">78%</div>
            <p className="text-xs text-muted-foreground">
              Above average quality
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completeness</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">70%</div>
            <p className="text-xs text-muted-foreground">
              7/10 sections complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Suggestions</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-elec-yellow">12</div>
            <p className="text-xs text-muted-foreground">
              Improvement recommendations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              AI Document Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Upload Evidence Files</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  PDF, Word documents, and images supported
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({uploadedFiles.length})</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={analyzeWithAI} 
                disabled={uploadedFiles.length === 0 || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>

              {aiAnalysis && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <Label className="text-sm font-medium">AI Analysis Results</Label>
                  <p className="text-sm text-muted-foreground mt-2">{aiAnalysis}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Intelligent Portfolio Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Score: {item.aiScore}%</span>
                      <span>Completeness: {item.completeness}%</span>
                    </div>
                    <Progress value={item.aiScore} className="h-2" />
                  </div>

                  <div className="mt-3">
                    <Label className="text-xs font-medium">AI Suggestions:</Label>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {item.suggestions.map((suggestion, index) => (
                        <li key={index}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI-Powered Portfolio Enhancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your intelligent portfolio system continuously analyzes your evidence, provides quality scores, 
            and suggests improvements. The AI identifies gaps in your learning documentation and recommends 
            specific actions to enhance your apprenticeship portfolio for successful completion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentPortfolioTab;
