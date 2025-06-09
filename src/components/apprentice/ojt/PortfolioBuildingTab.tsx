
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Award, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PortfolioBuildingTab = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [portfolioItem, setPortfolioItem] = useState({
    title: "",
    description: "",
    category: "",
    skills_demonstrated: [],
    reflection_notes: ""
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
  const addPortfolioMutation = useMutation({
    mutationFn: async (item: typeof portfolioItem) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          user_id: user.id,
          ...item
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
        skills_demonstrated: [],
        reflection_notes: ""
      });
      toast({
        title: "Portfolio Item Added",
        description: "Your portfolio item has been added successfully."
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
    addPortfolioMutation.mutate(portfolioItem);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioItems.length}</div>
            <p className="text-xs text-muted-foreground">
              Portfolio entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(portfolioItems.map(item => item.category)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioItems.filter(item => {
                const itemDate = new Date(item.created_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return itemDate >= weekAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Portfolio Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Domestic Consumer Unit Installation"
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
                    <SelectItem value="installation">Installation Work</SelectItem>
                    <SelectItem value="testing">Testing & Inspection</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="fault-finding">Fault Finding</SelectItem>
                    <SelectItem value="design">Design Work</SelectItem>
                    <SelectItem value="health-safety">Health & Safety</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the work carried out..."
                  value={portfolioItem.description}
                  onChange={(e) => setPortfolioItem(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="reflection">Reflection Notes</Label>
                <Textarea
                  id="reflection"
                  placeholder="What did you learn? What would you do differently?"
                  value={portfolioItem.reflection_notes}
                  onChange={(e) => setPortfolioItem(prev => ({ ...prev, reflection_notes: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={addPortfolioMutation.isPending}>
                {addPortfolioMutation.isPending ? "Adding..." : "Add Portfolio Item"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Portfolio Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {portfolioItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No portfolio items added yet
                </p>
              ) : (
                portfolioItems.slice(0, 10).map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <span className="text-sm text-muted-foreground px-2 py-1 bg-secondary rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioBuildingTab;
