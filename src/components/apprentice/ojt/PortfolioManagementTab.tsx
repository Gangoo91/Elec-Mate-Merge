
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  FileDown, 
  Search, 
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  Calendar,
  Tag,
  BookOpen,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PortfolioEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'practical' | 'theoretical' | 'project' | 'assessment';
  dateCompleted: string;
  tags: string[];
  evidence?: string;
  reflection: string;
  learningOutcomes: string[];
  skillsApplied: string[];
}

const PortfolioManagementTab = () => {
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // New entry form state
  const [newEntry, setNewEntry] = useState<Partial<PortfolioEntry>>({
    title: "",
    description: "",
    category: "",
    type: 'practical',
    dateCompleted: new Date().toISOString().split('T')[0],
    tags: [],
    reflection: "",
    learningOutcomes: [],
    skillsApplied: []
  });

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('portfolio_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (updatedEntries: PortfolioEntry[]) => {
    localStorage.setItem('portfolio_entries', JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  // Filter entries based on search and filters
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || entry.category === filterCategory;
    const matchesType = !filterType || entry.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique categories and types for filters
  const categories = [...new Set(entries.map(entry => entry.category))].filter(Boolean);
  const types = ['practical', 'theoretical', 'project', 'assessment'];

  // Calculate stats
  const stats = {
    total: entries.length,
    thisMonth: entries.filter(entry => {
      const entryDate = new Date(entry.dateCompleted);
      const now = new Date();
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }).length,
    categories: categories.length,
    byType: types.reduce((acc, type) => {
      acc[type] = entries.filter(entry => entry.type === type).length;
      return acc;
    }, {} as Record<string, number>)
  };

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.description || !newEntry.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title, description, category).",
        variant: "destructive",
      });
      return;
    }

    const entry: PortfolioEntry = {
      id: Date.now().toString(),
      title: newEntry.title!,
      description: newEntry.description!,
      category: newEntry.category!,
      type: newEntry.type!,
      dateCompleted: newEntry.dateCompleted!,
      tags: newEntry.tags || [],
      reflection: newEntry.reflection || "",
      learningOutcomes: newEntry.learningOutcomes || [],
      skillsApplied: newEntry.skillsApplied || []
    };

    const updatedEntries = [entry, ...entries];
    saveEntries(updatedEntries);

    // Reset form
    setNewEntry({
      title: "",
      description: "",
      category: "",
      type: 'practical',
      dateCompleted: new Date().toISOString().split('T')[0],
      tags: [],
      reflection: "",
      learningOutcomes: [],
      skillsApplied: []
    });

    setIsAddFormOpen(false);

    toast({
      title: "Portfolio Entry Added",
      description: "Your portfolio entry has been successfully added.",
    });
  };

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const exportData = {
        exportInfo: {
          exportDate: new Date().toISOString(),
          exportType: "portfolio",
          totalEntries: entries.length
        },
        summary: {
          totalEntries: stats.total,
          categoriesCount: stats.categories,
          typeBreakdown: stats.byType,
          dateRange: {
            earliest: entries.length > 0 ? entries.reduce((earliest, entry) => 
              entry.dateCompleted < earliest ? entry.dateCompleted : earliest, entries[0].dateCompleted) : null,
            latest: entries.length > 0 ? entries.reduce((latest, entry) => 
              entry.dateCompleted > latest ? entry.dateCompleted : latest, entries[0].dateCompleted) : null
          }
        },
        portfolioEntries: entries
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Exported ${entries.length} portfolio entries successfully.`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your portfolio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !newEntry.tags?.includes(tag.trim())) {
      setNewEntry(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats and Export */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Portfolio Management</h2>
          <p className="text-muted-foreground">
            Build, manage, and export your professional development portfolio
          </p>
        </div>
        <Button 
          onClick={handleExport}
          disabled={isExporting || entries.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <FileDown className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export Portfolio'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-300">Total Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-100">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/50 bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-300">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-100">{stats.thisMonth}</div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-300">Categories</CardTitle>
            <Tag className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-100">{stats.categories}</div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-300">Projects</CardTitle>
            <Target className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-100">{stats.byType.project || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry Form (Collapsible) */}
      <Card>
        <Collapsible open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-elec-yellow flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Portfolio Entry
                </CardTitle>
                {isAddFormOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title *</label>
                  <Input
                    value={newEntry.title || ""}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter portfolio entry title"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category *</label>
                  <Input
                    value={newEntry.category || ""}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Electrical Installation, Safety Training"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <textarea
                  value={newEntry.description || ""}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you learned or accomplished"
                  className="w-full min-h-[100px] rounded-md border border-elec-yellow/20 bg-elec-dark px-3 py-2 text-sm resize-y"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full rounded-md border border-elec-yellow/20 bg-elec-dark px-3 py-2 text-sm"
                  >
                    <option value="practical">Practical Work</option>
                    <option value="theoretical">Theoretical Learning</option>
                    <option value="project">Project Work</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date Completed</label>
                  <Input
                    type="date"
                    value={newEntry.dateCompleted}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, dateCompleted: e.target.value }))}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Reflection</label>
                <textarea
                  value={newEntry.reflection || ""}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, reflection: e.target.value }))}
                  placeholder="Reflect on what you learned and how you can apply it"
                  className="w-full min-h-[80px] rounded-md border border-elec-yellow/20 bg-elec-dark px-3 py-2 text-sm resize-y"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newEntry.tags?.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Add tags (press Enter to add)"
                  className="bg-elec-dark border-elec-yellow/20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddEntry} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  Add Entry
                </Button>
                <Button variant="outline" onClick={() => setIsAddFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Portfolio Entries ({filteredEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-md border border-elec-yellow/20 bg-elec-dark text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 rounded-md border border-elec-yellow/20 bg-elec-dark text-sm"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {entries.length === 0 ? (
                  <div>
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No portfolio entries yet</p>
                    <p>Click "Add New Portfolio Entry" to get started building your professional portfolio.</p>
                  </div>
                ) : (
                  <div>
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No entries match your search criteria.</p>
                  </div>
                )}
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <Card key={entry.id} className="border-elec-yellow/20">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-elec-yellow">{entry.title}</h3>
                        <p className="text-sm text-muted-foreground">{entry.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{entry.type}</Badge>
                        <Badge variant="secondary">{new Date(entry.dateCompleted).toLocaleDateString()}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4">{entry.description}</p>
                    
                    {entry.reflection && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Reflection:</h4>
                        <p className="text-sm text-muted-foreground italic">{entry.reflection}</p>
                      </div>
                    )}
                    
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManagementTab;
