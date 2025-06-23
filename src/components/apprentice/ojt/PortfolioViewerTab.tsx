
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Calendar, Award, FileText, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  skills_demonstrated: string[];
  reflection_notes: string;
  supervisor_feedback: string;
  grade: string;
  created_at: string;
  updated_at: string;
}

const PortfolioViewerTab = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const { toast } = useToast();

  const fetchPortfolioItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setPortfolioItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    let filtered = portfolioItems;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills_demonstrated?.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Apply grade filter
    if (gradeFilter !== "all") {
      filtered = filtered.filter(item => item.grade === gradeFilter);
    }

    setFilteredItems(filtered);
  }, [portfolioItems, searchTerm, categoryFilter, gradeFilter]);

  const exportPortfolio = () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        totalEntries: portfolioItems.length,
        categories: [...new Set(portfolioItems.map(item => item.category))],
        items: portfolioItems.map(item => ({
          ...item,
          skills_demonstrated: item.skills_demonstrated?.join(', ') || '',
          created_date: format(new Date(item.created_at), 'dd/MM/yyyy'),
          updated_date: format(new Date(item.updated_at), 'dd/MM/yyyy')
        }))
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-export-${format(new Date(), 'yyyy-MM-dd')}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Portfolio Exported",
        description: "Your portfolio has been exported successfully"
      });
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export portfolio",
        variant: "destructive"
      });
    }
  };

  const deletePortfolioItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setPortfolioItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "Item Deleted",
        description: "Portfolio item deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete portfolio item",
        variant: "destructive"
      });
    }
  };

  const categories = [...new Set(portfolioItems.map(item => item.category))];
  const grades = [...new Set(portfolioItems.map(item => item.grade).filter(Boolean))];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with export button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Portfolio Viewer</h3>
        <Button 
          onClick={exportPortfolio}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Portfolio
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search portfolio items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map(grade => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Items */}
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== "all" || gradeFilter !== "all" 
                  ? "No portfolio items match your current filters" 
                  : "No portfolio items yet. Start building your portfolio by adding entries."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-elec-yellow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{item.category}</Badge>
                      {item.grade && <Badge variant="secondary">{item.grade}</Badge>}
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(item.created_at), 'dd/MM/yyyy')}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePortfolioItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>

                  {item.skills_demonstrated && item.skills_demonstrated.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-1">Skills Demonstrated</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.skills_demonstrated.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.reflection_notes && (
                    <div>
                      <h4 className="font-medium mb-1">Reflection</h4>
                      <p className="text-sm text-muted-foreground">{item.reflection_notes}</p>
                    </div>
                  )}

                  {item.supervisor_feedback && (
                    <div>
                      <h4 className="font-medium mb-1">Supervisor Feedback</h4>
                      <p className="text-sm text-muted-foreground">{item.supervisor_feedback}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {portfolioItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Portfolio Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{portfolioItems.length}</div>
                <div className="text-sm text-muted-foreground">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">
                  {portfolioItems.filter(item => item.grade).length}
                </div>
                <div className="text-sm text-muted-foreground">Graded Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">
                  {portfolioItems.filter(item => item.supervisor_feedback).length}
                </div>
                <div className="text-sm text-muted-foreground">With Feedback</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PortfolioViewerTab;
