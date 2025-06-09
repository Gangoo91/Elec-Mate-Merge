
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Upload, Star, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PortfolioBuildingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [portfolioItem, setPortfolioItem] = useState({
    title: "",
    description: "",
    category: "",
    skills_demonstrated: "",
    reflection_notes: "",
    supervisor_feedback: "",
    grade: ""
  });

  // Fetch portfolio items
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ['portfolio-items', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Add portfolio item mutation
  const addPortfolioItemMutation = useMutation({
    mutationFn: async (item: typeof portfolioItem) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          title: item.title,
          description: item.description,
          category: item.category,
          skills_demonstrated: item.skills_demonstrated ? item.skills_demonstrated.split(',').map(s => s.trim()) : [],
          reflection_notes: item.reflection_notes,
          supervisor_feedback: item.supervisor_feedback,
          grade: item.grade
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] });
      setPortfolioItem({
        title: "",
        description: "",
        category: "",
        skills_demonstrated: "",
        reflection_notes: "",
        supervisor_feedback: "",
        grade: ""
      });
      setDialogOpen(false);
      toast({
        title: "Portfolio Item Added",
        description: "Your portfolio item has been saved successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add portfolio item. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioItem.title || !portfolioItem.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and category.",
        variant: "destructive"
      });
      return;
    }
    addPortfolioItemMutation.mutate(portfolioItem);
  };

  const portfolioCategories = [
    "Technical Skills",
    "Health & Safety",
    "Installation Work",
    "Testing & Inspection",
    "Problem Solving",
    "Communication",
    "Professional Development"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Portfolio Management</h3>
          <p className="text-muted-foreground">
            Build and organise evidence of your skills and competencies
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Portfolio Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Consumer Unit Installation"
                    value={portfolioItem.title}
                    onChange={(e) => setPortfolioItem(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={portfolioItem.category} onValueChange={(value) => setPortfolioItem(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolioCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you did and what you learned..."
                  value={portfolioItem.description}
                  onChange={(e) => setPortfolioItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="skills">Skills Demonstrated (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="e.g. Cable management, Risk assessment, Team work"
                  value={portfolioItem.skills_demonstrated}
                  onChange={(e) => setPortfolioItem(prev => ({ ...prev, skills_demonstrated: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="reflection">Personal Reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder="What did you learn? How will this help you in future?"
                  value={portfolioItem.reflection_notes}
                  onChange={(e) => setPortfolioItem(prev => ({ ...prev, reflection_notes: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feedback">Supervisor Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Feedback from supervisor or mentor..."
                    value={portfolioItem.supervisor_feedback}
                    onChange={(e) => setPortfolioItem(prev => ({ ...prev, supervisor_feedback: e.target.value }))}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="grade">Grade/Assessment</Label>
                  <Input
                    id="grade"
                    placeholder="e.g. Pass, Merit, Distinction"
                    value={portfolioItem.grade}
                    onChange={(e) => setPortfolioItem(prev => ({ ...prev, grade: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={addPortfolioItemMutation.isPending} className="flex-1">
                  {addPortfolioItemMutation.isPending ? "Adding..." : "Add Portfolio Item"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioItems.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Portfolio Items Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start building your portfolio by adding evidence of your work and learning
              </p>
              <Button onClick={() => setDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  {item.grade && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{item.grade}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
                
                {item.skills_demonstrated && item.skills_demonstrated.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Skills Demonstrated:</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.skills_demonstrated.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  Added: {new Date(item.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioBuildingTab;
