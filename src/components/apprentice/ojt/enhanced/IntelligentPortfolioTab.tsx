
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, FileText, Award, Camera, Video, Lightbulb, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntelligentPortfolioTab = () => {
  const { toast } = useToast();
  
  const [portfolioEntry, setPortfolioEntry] = useState({
    title: "",
    description: "",
    skills: "",
    reflection: ""
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const aiSuggestions = [
    {
      category: "Circuit Installation",
      suggestions: [
        "Document the ring final circuit installation process",
        "Include RCD testing procedures and results",
        "Photograph cable routing and termination techniques"
      ]
    },
    {
      category: "Safety Compliance",
      suggestions: [
        "Record risk assessment methodology used",
        "Document PPE selection decision process",
        "Include near-miss incident learning outcomes"
      ]
    },
    {
      category: "Problem Solving",
      suggestions: [
        "Describe fault-finding approach and logical steps",
        "Include before/after measurements and analysis",
        "Reflect on alternative solutions considered"
      ]
    }
  ];

  const smartTemplates = [
    {
      title: "Electrical Installation Project",
      type: "installation",
      aiContent: "AI will generate detailed templates based on your specific installation type"
    },
    {
      title: "Fault Diagnosis Case Study",
      type: "troubleshooting",
      aiContent: "Structured approach to documenting diagnostic procedures and outcomes"
    },
    {
      title: "Safety Incident Analysis",
      type: "safety",
      aiContent: "Comprehensive framework for safety learning and improvement documentation"
    }
  ];

  const generateAiContent = async () => {
    setIsAiGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      setPortfolioEntry(prev => ({
        ...prev,
        description: `Based on your learning patterns, here's an AI-generated framework for your ${prev.title || 'portfolio entry'}:\n\n1. Context and Objectives\n2. Technical Approach\n3. Challenges Encountered\n4. Solutions Implemented\n5. Learning Outcomes\n6. Future Applications`,
        skills: "Electrical installation, Problem-solving, Safety compliance, Technical documentation",
        reflection: "This experience enhanced my understanding of practical electrical work while reinforcing theoretical knowledge. I particularly developed confidence in..."
      }));
      
      setIsAiGenerating(false);
      toast({
        title: "AI Content Generated",
        description: "Smart content framework created based on your learning profile."
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioEntry.title || !portfolioEntry.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and description.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Portfolio Entry Added",
      description: "Your intelligent portfolio entry has been saved successfully."
    });
    
    setPortfolioEntry({
      title: "",
      description: "",
      skills: "",
      reflection: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Portfolio Score</CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">92%</div>
            <p className="text-xs text-muted-foreground">
              Quality rating
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Generated</CardTitle>
            <Sparkles className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">67%</div>
            <p className="text-xs text-muted-foreground">
              AI-assisted entries
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-500/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completeness</CardTitle>
            <Award className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">89%</div>
            <p className="text-xs text-muted-foreground">
              Standards compliance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI-Powered Portfolio Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Entry Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Consumer Unit Installation"
                  value={portfolioEntry.title}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateAiContent}
                  disabled={isAiGenerating}
                  className="flex-1"
                >
                  {isAiGenerating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Generate Content
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did and what you learned..."
                  value={portfolioEntry.description}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="skills">Skills Demonstrated</Label>
                <Input
                  id="skills"
                  placeholder="e.g. Cable installation, Testing, Documentation"
                  value={portfolioEntry.skills}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, skills: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="reflection">Reflection & Learning</Label>
                <Textarea
                  id="reflection"
                  placeholder="What challenges did you face? What would you do differently?"
                  value={portfolioEntry.reflection}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, reflection: e.target.value }))}
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Add to AI Portfolio
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Content Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiSuggestions.map((category, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      {category.category}
                      <Badge variant="outline">AI</Badge>
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {category.suggestions.map((suggestion, sugIndex) => (
                        <li key={sugIndex} className="flex items-start gap-2">
                          <span className="text-elec-yellow">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Smart Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smartTemplates.map((template, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.title}</h4>
                      <Badge className="bg-purple-600 text-white">Smart</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.aiContent}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntelligentPortfolioTab;
