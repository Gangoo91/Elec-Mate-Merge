
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Plus, 
  BarChart3, 
  Download,
  Target,
  BookOpen,
  Wrench,
  Building
} from "lucide-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import PortfolioCategoriesOverview from "./PortfolioCategoriesOverview";
import PortfolioEntriesList from "./PortfolioEntriesList";
import PortfolioEntryForm from "./PortfolioEntryForm";
import PortfolioDocumentationContent from "./PortfolioDocumentationContent";
import DigitalToolsIntegration from "./DigitalToolsIntegration";
import IndustrySpecificSections from "./IndustrySpecificSections";
import GroupedPortfolioOverview from "../../portfolio/GroupedPortfolioOverview";
import CompetencyLevelView from "../../portfolio/CompetencyLevelView";
import GroupedEntriesList from "../../portfolio/GroupedEntriesList";
import { PortfolioEntry } from "@/types/portfolio";

const PortfolioManager = () => {
  const { 
    entries, 
    categories, 
    groups, 
    analytics, 
    isLoading, 
    addEntry, 
    updateEntry, 
    deleteEntry,
    getEntriesByGroup,
    getEntriesByCompetencyLevel
  } = usePortfolioData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewingEntry, setViewingEntry] = useState<PortfolioEntry | null>(null);
  const [editingEntry, setEditingEntry] = useState<PortfolioEntry | null>(null);

  const handleAddEntry = (entryData: any) => {
    addEntry(entryData);
    setShowAddForm(false);
  };

  const handleViewEntry = (entry: PortfolioEntry) => {
    setViewingEntry(entry);
  };

  const handleEditEntry = (entry: PortfolioEntry) => {
    setEditingEntry(entry);
  };

  const handleUpdateEntry = (entryId: string, updates: Partial<PortfolioEntry>) => {
    updateEntry(entryId, updates);
    setEditingEntry(null);
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
        <Button onClick={() => setShowAddForm(true)} className="bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Portfolio Entry
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-elec-yellow/20">
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

        <Card className="bg-elec-gray border-elec-yellow/20">
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

        <Card className="bg-elec-gray border-elec-yellow/20">
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
      <DropdownTabs
        placeholder="Select portfolio section"
        defaultValue="overview"
        onValueChange={setActiveTab}
        tabs={[
          {
            value: "overview",
            label: "Grouped Overview",
            icon: BarChart3,
            content: (
              <GroupedPortfolioOverview 
                groups={groups}
                getEntriesByGroup={getEntriesByGroup}
              />
            )
          },
          {
            value: "competency",
            label: "Competency Levels",
            icon: Target,
            content: (
              <CompetencyLevelView 
                categories={categories}
                getEntriesByCompetencyLevel={getEntriesByCompetencyLevel}
              />
            )
          },
          {
            value: "entries",
            label: `Grouped Entries (${entries.length})`,
            icon: FileText,
            content: (
              <GroupedEntriesList 
                groups={groups}
                getEntriesByGroup={getEntriesByGroup}
                onViewEntry={handleViewEntry}
                onEditEntry={handleEditEntry}
                onDeleteEntry={deleteEntry}
              />
            )
          },
          {
            value: "classic-entries",
            label: "Classic View",
            icon: FileText,
            content: (
              <PortfolioEntriesList 
                entries={entries}
                onUpdateEntry={updateEntry}
                onDeleteEntry={deleteEntry}
              />
            )
          },
          {
            value: "documentation",
            label: "Documentation",
            icon: BookOpen,
            content: <PortfolioDocumentationContent />
          },
          {
            value: "tools",
            label: "Tools",
            icon: Wrench,
            content: <DigitalToolsIntegration />
          },
          {
            value: "industry",
            label: "Industry",
            icon: Building,
            content: <IndustrySpecificSections />
          }
        ]}
      />

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
