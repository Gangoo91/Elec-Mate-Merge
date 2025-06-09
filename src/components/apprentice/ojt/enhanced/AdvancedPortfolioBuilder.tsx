
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  BookOpen,
  Award,
  Target,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdvancedPortfolioBuilder = () => {
  const { toast } = useToast();
  
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [portfolioEntry, setPortfolioEntry] = useState({
    title: "",
    description: "",
    category: "",
    unit: "",
    skillsArea: "",
    evidence: "",
    reflection: "",
    learningOutcomes: "",
    witnesses: "",
    dateCompleted: "",
    timeSpent: ""
  });

  // Mock portfolio templates
  const templates = [
    {
      id: "installation",
      name: "Installation Portfolio",
      description: "For electrical installation work",
      sections: ["Health & Safety", "Planning", "Installation", "Testing", "Completion"],
      icon: "🔧"
    },
    {
      id: "maintenance",
      name: "Maintenance Portfolio",
      description: "For maintenance and repair tasks",
      sections: ["Fault Finding", "Diagnosis", "Repair", "Testing", "Documentation"],
      icon: "⚡"
    },
    {
      id: "assessment",
      name: "Assessment Portfolio",
      description: "For formal assessments",
      sections: ["Preparation", "Execution", "Results", "Reflection", "Action Plan"],
      icon: "📋"
    }
  ];

  // Mock portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "Consumer Unit Installation",
      category: "Practical Installation",
      unit: "Unit 301",
      status: "Approved",
      rating: 5,
      date: "2024-01-15",
      tutor: "John Smith"
    },
    {
      id: 2,
      title: "Cable Sizing Calculations",
      category: "Electrical Theory",
      unit: "Unit 202",
      status: "Under Review",
      rating: null,
      date: "2024-01-10",
      tutor: "Sarah Jones"
    },
    {
      id: 3,
      title: "Risk Assessment Documentation",
      category: "Health & Safety",
      unit: "Unit 101",
      status: "Feedback Required",
      rating: 3,
      date: "2024-01-08",
      tutor: "Mike Wilson"
    }
  ];

  const portfolioStats = {
    totalItems: 15,
    approved: 8,
    underReview: 4,
    needsWork: 3,
    averageRating: 4.2,
    completion: 75
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolioEntry.title || !portfolioEntry.description || !portfolioEntry.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Portfolio Entry Created",
      description: "Your portfolio entry has been saved and submitted for review."
    });

    // Reset form
    setPortfolioEntry({
      title: "",
      description: "",
      category: "",
      unit: "",
      skillsArea: "",
      evidence: "",
      reflection: "",
      learningOutcomes: "",
      witnesses: "",
      dateCompleted: "",
      timeSpent: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "Under Review":
        return <Badge className="bg-blue-500">Under Review</Badge>;
      case "Feedback Required":
        return <Badge className="bg-orange-500">Feedback Required</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const TemplateSelector = () => (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Portfolio Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">{template.icon}</div>
                <h3 className="font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="text-xs">
                  {template.sections.length} sections included
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const PortfolioForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create New Portfolio Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Entry Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Consumer Unit Installation"
                value={portfolioEntry.title}
                onChange={(e) => setPortfolioEntry(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={portfolioEntry.category} onValueChange={(value) => setPortfolioEntry(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practical-installation">Practical Installation</SelectItem>
                  <SelectItem value="electrical-theory">Electrical Theory</SelectItem>
                  <SelectItem value="health-safety">Health & Safety</SelectItem>
                  <SelectItem value="testing-inspection">Testing & Inspection</SelectItem>
                  <SelectItem value="fault-finding">Fault Finding</SelectItem>
                  <SelectItem value="project-work">Project Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unit">Unit Reference</Label>
              <Select value={portfolioEntry.unit} onValueChange={(value) => setPortfolioEntry(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit-301">Unit 301 - Understanding electrical installation</SelectItem>
                  <SelectItem value="unit-302">Unit 302 - Understanding electrical science</SelectItem>
                  <SelectItem value="unit-303">Unit 303 - Understanding electrical safety</SelectItem>
                  <SelectItem value="unit-304">Unit 304 - Understanding electrical systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="skillsArea">Skills Area</Label>
              <Select value={portfolioEntry.skillsArea} onValueChange={(value) => setPortfolioEntry(prev => ({ ...prev, skillsArea: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skills area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="installation">Installation Techniques</SelectItem>
                  <SelectItem value="testing">Testing & Inspection</SelectItem>
                  <SelectItem value="fault-finding">Fault Finding</SelectItem>
                  <SelectItem value="health-safety">Health & Safety</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="problem-solving">Problem Solving</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the task, your role, and what you accomplished..."
              value={portfolioEntry.description}
              onChange={(e) => setPortfolioEntry(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
            <Textarea
              id="learningOutcomes"
              placeholder="What knowledge and skills did you gain?"
              value={portfolioEntry.learningOutcomes}
              onChange={(e) => setPortfolioEntry(prev => ({ ...prev, learningOutcomes: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="reflection">Reflection</Label>
            <Textarea
              id="reflection"
              placeholder="What went well? What challenges did you face? What would you do differently?"
              value={portfolioEntry.reflection}
              onChange={(e) => setPortfolioEntry(prev => ({ ...prev, reflection: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="dateCompleted">Date Completed</Label>
              <Input
                id="dateCompleted"
                type="date"
                value={portfolioEntry.dateCompleted}
                onChange={(e) => setPortfolioEntry(prev => ({ ...prev, dateCompleted: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="timeSpent">Time Spent (hours)</Label>
              <Input
                id="timeSpent"
                type="number"
                step="0.5"
                placeholder="2.5"
                value={portfolioEntry.timeSpent}
                onChange={(e) => setPortfolioEntry(prev => ({ ...prev, timeSpent: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="witnesses">Witnesses/Supervisors</Label>
              <Input
                id="witnesses"
                placeholder="John Smith, Sarah Jones"
                value={portfolioEntry.witnesses}
                onChange={(e) => setPortfolioEntry(prev => ({ ...prev, witnesses: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="evidence">Evidence Links/References</Label>
            <Input
              id="evidence"
              placeholder="Link to photos, documents, test results, etc."
              value={portfolioEntry.evidence}
              onChange={(e) => setPortfolioEntry(prev => ({ ...prev, evidence: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Create Portfolio Entry
            </Button>
            <Button type="button" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Attach Files
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const PortfolioOverview = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{portfolioStats.totalItems}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{portfolioStats.approved}</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{portfolioStats.underReview}</div>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{portfolioStats.averageRating}</div>
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Portfolio Builder</h2>
          <p className="text-muted-foreground">Build comprehensive portfolio entries with guided templates</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Portfolio
        </Button>
      </div>

      <PortfolioOverview />

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="create" className="flex-1">Create Entry</TabsTrigger>
          <TabsTrigger value="manage" className="flex-1">Manage Portfolio</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <TemplateSelector />
          <PortfolioForm />
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>Category: {item.category}</div>
                      <div>Unit: {item.unit}</div>
                      <div>Date: {item.date}</div>
                      <div>Tutor: {item.tutor}</div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose from pre-built templates to ensure your portfolio meets qualification standards
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="relative">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{template.icon}</div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">Sections included:</p>
                        {template.sections.map((section, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {section}
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPortfolioBuilder;
