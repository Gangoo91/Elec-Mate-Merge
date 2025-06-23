
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Award, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PortfolioBuildingTab = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({
    totalItems: 0,
    categoriesCount: 0,
    gradedItems: 0
  });
  
  const [portfolioEntry, setPortfolioEntry] = useState({
    title: "",
    description: "",
    category: "",
    skills_demonstrated: "",
    reflection_notes: "",
    supervisor_feedback: "",
    grade: ""
  });

  const categories = [
    "Installation Work",
    "Testing & Inspection", 
    "Health & Safety",
    "Customer Service",
    "Technical Learning",
    "Problem Solving",
    "Teamwork",
    "Communication"
  ];

  const grades = ["Pass", "Merit", "Distinction", "Refer"];

  useEffect(() => {
    fetchPortfolioStats();
  }, []);

  const fetchPortfolioStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('portfolio_items')
        .select('category, grade')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalItems = data?.length || 0;
      const categories = new Set(data?.map(item => item.category) || []);
      const gradedItems = data?.filter(item => item.grade)?.length || 0;

      setPortfolioStats({
        totalItems,
        categoriesCount: categories.size,
        gradedItems
      });
    } catch (error) {
      console.error('Error fetching portfolio stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!portfolioEntry.title || !portfolioEntry.description || !portfolioEntry.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, description, and category.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to save portfolio entries");
      }

      // Convert skills to array
      const skillsArray = portfolioEntry.skills_demonstrated
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const { error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: portfolioEntry.title,
          description: portfolioEntry.description,
          category: portfolioEntry.category,
          skills_demonstrated: skillsArray,
          reflection_notes: portfolioEntry.reflection_notes,
          supervisor_feedback: portfolioEntry.supervisor_feedback,
          grade: portfolioEntry.grade || null
        });

      if (error) throw error;
      
      toast({
        title: "Portfolio Entry Added",
        description: "Your portfolio entry has been saved successfully."
      });
      
      // Reset form
      setPortfolioEntry({
        title: "",
        description: "",
        category: "",
        skills_demonstrated: "",
        reflection_notes: "",
        supervisor_feedback: "",
        grade: ""
      });

      // Refresh stats
      fetchPortfolioStats();
      
    } catch (error) {
      console.error('Error saving portfolio entry:', error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save portfolio entry",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const completionPercentage = Math.min((portfolioStats.totalItems / 20) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.totalItems}</div>
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
            <div className="text-2xl font-bold">{portfolioStats.categoriesCount}</div>
            <p className="text-xs text-muted-foreground">
              Different categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(completionPercentage)}%</div>
            <p className="text-xs text-muted-foreground">
              Portfolio progress
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
                <Select
                  value={portfolioEntry.category}
                  onValueChange={(value) => setPortfolioEntry(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
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
                  placeholder="e.g. Cable installation, Testing, Documentation (comma-separated)"
                  value={portfolioEntry.skills_demonstrated}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, skills_demonstrated: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="reflection">Reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder="What challenges did you face? What would you do differently?"
                  value={portfolioEntry.reflection_notes}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, reflection_notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="feedback">Supervisor Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Feedback from your supervisor or mentor..."
                  value={portfolioEntry.supervisor_feedback}
                  onChange={(e) => setPortfolioEntry(prev => ({ ...prev, supervisor_feedback: e.target.value }))}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="grade">Grade</Label>
                <Select
                  value={portfolioEntry.grade}
                  onValueChange={(value) => setPortfolioEntry(prev => ({ ...prev, grade: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map(grade => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Add to Portfolio"}
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
