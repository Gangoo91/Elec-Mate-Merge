
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  LayoutDashboard,
  FolderOpen,
  TrendingUp,
  MoreHorizontal,
  BookOpen,
  Wrench,
  Building,
  Target,
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import PortfolioEntriesList from "./PortfolioEntriesList";
import PortfolioEntryForm from "./PortfolioEntryForm";
import PortfolioDocumentationContent from "./PortfolioDocumentationContent";
import DigitalToolsIntegration from "./DigitalToolsIntegration";
import IndustrySpecificSections from "./IndustrySpecificSections";
import GroupedPortfolioOverview from "../../portfolio/GroupedPortfolioOverview";
import CompetencyLevelView from "../../portfolio/CompetencyLevelView";
import { PortfolioEntry } from "@/types/portfolio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Quick Stats Component
const QuickStats = ({ entries }: { entries: PortfolioEntry[] }) => {
  const completed = entries.filter(e => e.status === 'completed').length;
  const totalHours = Math.floor(entries.reduce((total, entry) => total + entry.timeSpent, 0) / 60);
  const inProgress = entries.filter(e => e.status === 'in-progress').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Card className="bg-white/5 border-elec-yellow/20">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg shrink-0">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white truncate">Total</p>
              <p className="text-lg sm:text-2xl font-bold">{entries.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-elec-yellow/20">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-green-500/10 rounded-lg shrink-0">
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white truncate">Complete</p>
              <p className="text-lg sm:text-2xl font-bold">{completed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-elec-yellow/20">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-amber-500/10 rounded-lg shrink-0">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white truncate">In Progress</p>
              <p className="text-lg sm:text-2xl font-bold">{inProgress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-elec-yellow/20">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-elec-yellow/10 rounded-lg shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white truncate">Hours</p>
              <p className="text-lg sm:text-2xl font-bold">{totalHours}h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Combined Progress View
const ProgressView = ({
  groups,
  categories,
  getEntriesByGroup,
  getEntriesByCompetencyLevel
}: {
  groups: any[];
  categories: any[];
  getEntriesByGroup: (groupId: string) => PortfolioEntry[];
  getEntriesByCompetencyLevel: (level: 'foundation' | 'intermediate' | 'advanced') => PortfolioEntry[];
}) => {
  const [view, setView] = useState<'groups' | 'competency'>('groups');

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-lg w-fit">
        <button
          onClick={() => setView('groups')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'groups'
              ? 'bg-elec-yellow text-elec-dark'
              : 'text-white hover:text-white'
          }`}
        >
          By Group
        </button>
        <button
          onClick={() => setView('competency')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            view === 'competency'
              ? 'bg-elec-yellow text-elec-dark'
              : 'text-white hover:text-white'
          }`}
        >
          By Level
        </button>
      </div>

      {/* Content */}
      {view === 'groups' ? (
        <GroupedPortfolioOverview
          groups={groups}
          getEntriesByGroup={getEntriesByGroup}
        />
      ) : (
        <CompetencyLevelView
          categories={categories}
          getEntriesByCompetencyLevel={getEntriesByCompetencyLevel}
        />
      )}
    </div>
  );
};

// Resources Dialog
const ResourcesDialog = ({
  open,
  onOpenChange,
  activeResource,
  setActiveResource
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeResource: string | null;
  setActiveResource: (resource: string | null) => void;
}) => {
  const resources = [
    { id: 'documentation', label: 'Documentation', icon: BookOpen, component: PortfolioDocumentationContent },
    { id: 'tools', label: 'Digital Tools', icon: Wrench, component: DigitalToolsIntegration },
    { id: 'industry', label: 'Industry Resources', icon: Building, component: IndustrySpecificSections }
  ];

  const ActiveComponent = activeResource
    ? resources.find(r => r.id === activeResource)?.component
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-white/5 border-elec-gray/40">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activeResource ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveResource(null)}
                  className="mr-2"
                >
                  Back
                </Button>
                {resources.find(r => r.id === activeResource)?.label}
              </>
            ) : (
              'Resources'
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {activeResource && ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="grid gap-3 p-4">
              {resources.map(resource => {
                const Icon = resource.icon;
                return (
                  <button
                    key={resource.id}
                    onClick={() => setActiveResource(resource.id)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-elec-card border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors text-left"
                  >
                    <div className="p-3 rounded-lg bg-elec-yellow/10">
                      <Icon className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{resource.label}</p>
                      <p className="text-sm text-white">
                        {resource.id === 'documentation' && 'Guides and best practices'}
                        {resource.id === 'tools' && 'Integration with digital platforms'}
                        {resource.id === 'industry' && 'Sector-specific content'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PortfolioManager = () => {
  const {
    entries,
    categories,
    groups,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByGroup,
    getEntriesByCompetencyLevel
  } = usePortfolioData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<PortfolioEntry | null>(null);

  const handleAddEntry = async (entryData: any) => {
    await addEntry(entryData);
    setShowAddForm(false);
  };

  const handleEditEntry = (entry: PortfolioEntry) => {
    setEditingEntry(entry);
  };

  const handleUpdateEntry = async (entryId: string, updates: Partial<PortfolioEntry>) => {
    await updateEntry(entryId, updates);
    setEditingEntry(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mx-auto mb-4" />
          <p className="text-white">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2 flex-1 sm:flex-initial"
          >
            <Plus className="h-4 w-4" />
            <span className="sm:inline">Add Entry</span>
          </Button>

          {/* More Menu for Resources */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-elec-yellow/30">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/5 border-elec-yellow/20">
              <DropdownMenuItem
                onClick={() => {
                  setActiveResource('documentation');
                  setShowResources(true);
                }}
                className="cursor-pointer"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setActiveResource('tools');
                  setShowResources(true);
                }}
                className="cursor-pointer"
              >
                <Wrench className="h-4 w-4 mr-2" />
                Digital Tools
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setActiveResource('industry');
                  setShowResources(true);
                }}
                className="cursor-pointer"
              >
                <Building className="h-4 w-4 mr-2" />
                Industry Resources
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats entries={entries} />

      {/* Main Content - 4 Primary Tabs */}
      <DropdownTabs
        placeholder="Select view"
        defaultValue="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            icon: LayoutDashboard,
            content: (
              <GroupedPortfolioOverview
                groups={groups}
                getEntriesByGroup={getEntriesByGroup}
              />
            )
          },
          {
            value: "entries",
            label: `My Entries (${entries.length})`,
            icon: FolderOpen,
            content: (
              <PortfolioEntriesList
                entries={entries}
                onUpdateEntry={updateEntry}
                onDeleteEntry={deleteEntry}
              />
            )
          },
          {
            value: "progress",
            label: "Progress",
            icon: TrendingUp,
            content: (
              <ProgressView
                groups={groups}
                categories={categories}
                getEntriesByGroup={getEntriesByGroup}
                getEntriesByCompetencyLevel={getEntriesByCompetencyLevel}
              />
            )
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

      {/* Edit Entry Form Dialog */}
      {editingEntry && (
        <PortfolioEntryForm
          categories={categories}
          initialData={editingEntry}
          onSubmit={(updates) => handleUpdateEntry(editingEntry.id, updates)}
          onCancel={() => setEditingEntry(null)}
        />
      )}

      {/* Resources Dialog */}
      <ResourcesDialog
        open={showResources}
        onOpenChange={setShowResources}
        activeResource={activeResource}
        setActiveResource={setActiveResource}
      />
    </div>
  );
};

export default PortfolioManager;
