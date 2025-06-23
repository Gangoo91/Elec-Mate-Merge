
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Plus, 
  BarChart3, 
  Download,
  Target,
  BookOpen
} from "lucide-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import PortfolioCategoriesOverview from "./PortfolioCategoriesOverview";
import PortfolioEntriesList from "./PortfolioEntriesList";
import PortfolioEntryForm from "./PortfolioEntryForm";

const PortfolioManager = () => {
  const { entries, categories, analytics, isLoading, addEntry, updateEntry, deleteEntry } = usePortfolioData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleAddEntry = (entryData: any) => {
    addEntry(entryData);
    setShowAddForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Builder</h2>
          <p className="text-muted-foreground">
            Document your learning journey and build evidence for your apprenticeship portfolio
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Portfolio Entry
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold">{entries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {entries.filter(e => e.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Logged</p>
                <p className="text-2xl font-bold">
                  {Math.floor(entries.reduce((total, entry) => total + entry.timeSpent, 0) / 60)}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Entries ({entries.length})
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <PortfolioCategoriesOverview categories={categories} entries={entries} />
        </TabsContent>

        <TabsContent value="entries" className="mt-6">
          <PortfolioEntriesList 
            entries={entries}
            onUpdateEntry={updateEntry}
            onDeleteEntry={deleteEntry}
          />
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Portfolio</CardTitle>
              <p className="text-muted-foreground">
                Export your portfolio for submission to tutors, employers, or awarding bodies
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Download className="h-6 w-6" />
                  Export as PDF
                  <span className="text-xs text-muted-foreground">Complete portfolio report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  Export as Word
                  <span className="text-xs text-muted-foreground">Editable document format</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Export functionality will generate a comprehensive report including all your portfolio entries, 
                evidence files, and progress summaries formatted for professional submission.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Entry Form Dialog */}
      {showAddForm && (
        <PortfolioEntryForm
          categories={categories}
          onSubmit={handleAddEntry}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default PortfolioManager;
