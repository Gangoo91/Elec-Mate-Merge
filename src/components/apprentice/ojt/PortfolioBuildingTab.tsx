
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Award, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PortfolioBuildingTab = () => {
  const { toast } = useToast();
  
  const [portfolioEntry, setPortfolioEntry] = useState({
    title: "",
    description: "",
    skills: "",
    reflection: ""
  });

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
      description: "Your portfolio entry has been saved successfully."
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Items in portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Demonstrated</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Core competencies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              Portfolio complete
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Portfolio Entry
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
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did and what you learned..."
                  value={portfolioEntry.description}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
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
                <Label htmlFor="reflection">Reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder="What challenges did you face? What would you do differently?"
                  value={portfolioEntry.reflection}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, reflection: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Add to Portfolio
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">What to Include</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Practical work examples</li>
                  <li>• Problem-solving instances</li>
                  <li>• Safety considerations</li>
                  <li>• Technical drawings or photos</li>
                  <li>• Customer interactions</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Key Skills to Demonstrate</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Installation techniques</li>
                  <li>• Testing and inspection</li>
                  <li>• Health and safety awareness</li>
                  <li>• Regulatory compliance</li>
                  <li>• Communication skills</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Quality Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific and detailed</li>
                  <li>• Include measurable outcomes</li>
                  <li>• Reflect on learning</li>
                  <li>• Link to apprenticeship standards</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioBuildingTab;
