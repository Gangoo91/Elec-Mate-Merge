import { useState } from 'react';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { Button } from '@/components/ui/button';
import {
  Plus,
  LayoutDashboard,
  FolderOpen,
  TrendingUp,
  MoreHorizontal,
  BookOpen,
  Wrench,
  Building,
  Loader2,
} from 'lucide-react';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import PortfolioEntriesList from './PortfolioEntriesList';
import PortfolioEntryForm from './PortfolioEntryForm';
import PortfolioDocumentationContent from './PortfolioDocumentationContent';
import DigitalToolsIntegration from './DigitalToolsIntegration';
import IndustrySpecificSections from './IndustrySpecificSections';
import GroupedPortfolioOverview from '../../portfolio/GroupedPortfolioOverview';
import CompetencyLevelView from '../../portfolio/CompetencyLevelView';
import { PortfolioEntry } from '@/types/portfolio';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const QuickStats = ({ entries }: { entries: PortfolioEntry[] }) => {
  const completed = entries.filter((e) => e.status === 'completed').length;
  const totalHours = Math.floor(entries.reduce((total, entry) => total + entry.timeSpent, 0) / 60);
  const inProgress = entries.filter((e) => e.status === 'in-progress').length;

  const stats = [
    { label: 'Total', value: String(entries.length) },
    { label: 'Complete', value: String(completed) },
    { label: 'In progress', value: String(inProgress) },
    { label: 'Hours', value: `${totalHours}h` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
        >
          <div className="text-2xl font-mono text-white">{s.value}</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Combined Progress View
const ProgressView = ({
  groups,
  categories,
  getEntriesByGroup,
  getEntriesByCompetencyLevel,
}: {
  groups: any[];
  categories: any[];
  getEntriesByGroup: (groupId: string) => PortfolioEntry[];
  getEntriesByCompetencyLevel: (
    level: 'foundation' | 'intermediate' | 'advanced'
  ) => PortfolioEntry[];
}) => {
  const [view, setView] = useState<'groups' | 'competency'>('groups');

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-lg border border-white/[0.06] bg-white/[0.02] w-fit">
        <button
          onClick={() => setView('groups')}
          className={`px-3 h-9 rounded-md text-[12px] font-medium transition-colors touch-manipulation ${
            view === 'groups' ? 'bg-elec-yellow text-black' : 'text-white/55 hover:text-white'
          }`}
        >
          By group
        </button>
        <button
          onClick={() => setView('competency')}
          className={`px-3 h-9 rounded-md text-[12px] font-medium transition-colors touch-manipulation ${
            view === 'competency' ? 'bg-elec-yellow text-black' : 'text-white/55 hover:text-white'
          }`}
        >
          By level
        </button>
      </div>

      {/* Content */}
      {view === 'groups' ? (
        <GroupedPortfolioOverview groups={groups} getEntriesByGroup={getEntriesByGroup} />
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
  setActiveResource,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeResource: string | null;
  setActiveResource: (resource: string | null) => void;
}) => {
  const resources = [
    {
      id: 'documentation',
      label: 'Documentation',
      icon: BookOpen,
      component: PortfolioDocumentationContent,
    },
    { id: 'tools', label: 'Digital Tools', icon: Wrench, component: DigitalToolsIntegration },
    {
      id: 'industry',
      label: 'Industry Resources',
      icon: Building,
      component: IndustrySpecificSections,
    },
  ];

  const ActiveComponent = activeResource
    ? resources.find((r) => r.id === activeResource)?.component
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-background border-white/[0.06]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            {activeResource ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveResource(null)}
                  className="mr-2 text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  Back
                </Button>
                {resources.find((r) => r.id === activeResource)?.label}
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
            <div className="grid gap-2 p-4">
              {resources.map((resource) => {
                return (
                  <button
                    key={resource.id}
                    onClick={() => setActiveResource(resource.id)}
                    className="flex items-center justify-between gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left touch-manipulation min-h-[44px]"
                  >
                    <div>
                      <p className="text-[14px] text-white font-medium">{resource.label}</p>
                      <p className="text-[12px] text-white/55 mt-0.5 leading-relaxed">
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
    getEntriesByCompetencyLevel,
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
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow mx-auto mb-3" />
          <p className="text-[13px] text-white/55">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold gap-2 flex-1 sm:flex-initial h-11 touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            <span className="sm:inline">Add entry</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-white/[0.06]">
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
                Digital tools
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setActiveResource('industry');
                  setShowResources(true);
                }}
                className="cursor-pointer"
              >
                <Building className="h-4 w-4 mr-2" />
                Industry resources
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
            value: 'overview',
            label: 'Overview',
            icon: LayoutDashboard,
            content: (
              <GroupedPortfolioOverview groups={groups} getEntriesByGroup={getEntriesByGroup} />
            ),
          },
          {
            value: 'entries',
            label: `My Entries (${entries.length})`,
            icon: FolderOpen,
            content: (
              <PortfolioEntriesList
                entries={entries}
                onUpdateEntry={updateEntry}
                onDeleteEntry={deleteEntry}
              />
            ),
          },
          {
            value: 'progress',
            label: 'Progress',
            icon: TrendingUp,
            content: (
              <ProgressView
                groups={groups}
                categories={categories}
                getEntriesByGroup={getEntriesByGroup}
                getEntriesByCompetencyLevel={getEntriesByCompetencyLevel}
              />
            ),
          },
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
