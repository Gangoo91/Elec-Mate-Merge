
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  BarChart3, 
  Download, 
  Filter,
  Search,
  Calendar,
  Award
} from "lucide-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import PortfolioEntryForm from "./PortfolioEntryForm";
import PortfolioEntriesList from "./PortfolioEntriesList";
import PortfolioAnalyticsDashboard from "./PortfolioAnalyticsDashboard";
import PortfolioExportDialog from "./PortfolioExportDialog";
import PortfolioCategoriesOverview from "./PortfolioCategoriesOverview";
import { Input } from "@/components/ui/input";

const PortfolioManager = () => {
  const { entries, categories, analytics, isLoading, addEntry, updateEntry, deleteEntry } = usePortfolioData();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || entry.category.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Manager</h2>
          <p className="text-muted-foreground">
            Build and manage your comprehensive apprenticeship portfolio
          </p>
        </div>
        <div className="flex gap-2">
          <PortfolioExportDialog entries={entries} />
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-2xl font-bold">{analytics?.totalEntries || 0}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{analytics?.completedEntries || 0}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{Math.floor((analytics?.totalTimeSpent || 0) / 60)}h</p>
                <p className="text-xs text-muted-foreground">Time Invested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{analytics?.averageRating.toFixed(1) || "0.0"}</p>
                <p className="text-xs text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entries">Entries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PortfolioCategoriesOverview categories={categories} entries={entries} />
        </TabsContent>

        <TabsContent value="entries" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries by title, description, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <PortfolioEntriesList 
            entries={filteredEntries}
            onUpdateEntry={updateEntry}
            onDeleteEntry={deleteEntry}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <PortfolioAnalyticsDashboard analytics={analytics} categories={categories} />
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Awarding Body Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track your progress against different awarding body standards and requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map(category => (
                  <Card key={category.id} className="border-elec-yellow/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{category.name}</h4>
                        <Badge variant={category.completedEntries >= category.requiredEntries ? "success" : "outline"}>
                          {category.completedEntries}/{category.requiredEntries}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((category.completedEntries / category.requiredEntries) * 100, 100)}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Entry Form Dialog */}
      {showAddForm && (
        <PortfolioEntryForm
          categories={categories}
          onSubmit={(entryData) => {
            addEntry(entryData);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default PortfolioManager;
