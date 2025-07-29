import { useState, memo, Suspense, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, FileText, Target, TrendingUp, AlertTriangle, RefreshCw, Grid, List, BarChart3 } from 'lucide-react';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { PortfolioEntry } from '@/types/portfolio';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import QualificationChangeSelector from '@/components/apprentice/qualification/QualificationChangeSelector';
import QualificationCompliance from '@/components/apprentice/qualification/QualificationCompliance';
import PortfolioEntryForm from '@/components/apprentice/portfolio/PortfolioEntryForm';
import PortfolioEntriesList from '@/components/apprentice/portfolio/PortfolioEntriesList';
import GroupedPortfolioOverview from '@/components/portfolio/GroupedPortfolioOverview';
import CompetencyLevelView from '@/components/portfolio/CompetencyLevelView';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { UltraFastLoadingState } from '@/components/portfolio/UltraFastLoadingState';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import PortfolioExportDialog from '@/components/apprentice/portfolio/PortfolioExportDialog';

// Memoized components for performance
const MemoizedStatsCard = memo(({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
}) => (
  <Card className="border-elec-yellow/20 bg-elec-dark">
    <CardContent className="p-4">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
));

const MemoizedCategoryCard = memo(({ 
  category, 
  entries 
}: { 
  category: any; 
  entries: PortfolioEntry[];
}) => {
  const categoryEntries = useMemo(
    () => entries.filter(e => e.category.id === category.id),
    [entries, category.id]
  );
  
  const completedEntries = useMemo(
    () => categoryEntries.filter(e => e.status === 'completed').length,
    [categoryEntries]
  );
  
  const progressPercentage = useMemo(
    () => Math.round((completedEntries / category.requiredEntries) * 100),
    [completedEntries, category.requiredEntries]
  );

  return (
    <Card className="border-elec-yellow/20 bg-elec-dark">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{category.name}</h3>
          <Badge 
            variant={progressPercentage >= 100 ? "default" : "secondary"} 
            className={progressPercentage >= 100 ? "bg-elec-yellow text-elec-dark" : "border-elec-yellow/50 bg-elec-yellow/20 text-elec-yellow"}
          >
            {completedEntries}/{category.requiredEntries}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
        <div className="w-full bg-elec-gray rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{progressPercentage}% complete</p>
      </CardContent>
    </Card>
  );
});

const PortfolioManager = () => {
  const { clearQualificationSelection } = useQualifications();
  const { 
    entries, 
    categories, 
    groups,
    analytics, 
    isLoading, 
    hasQualificationSelected,
    addEntry,
    updateEntry,
    deleteEntry,
    isAddingEntry,
    getEntriesByGroup,
    getCategoriesByCompetencyLevel,
    refresh
  } = useUltraFastPortfolio();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleChangeCourse = async () => {
    const success = await clearQualificationSelection();
    if (success) {
      // Refresh the portfolio data to reflect the cleared state
      refresh();
    }
  };

  // Show loading state if we have no data and are loading
  if (isLoading) {
    return <UltraFastLoadingState showSkeleton={true} message="Preparing your portfolio..." />;
  }

  if (!hasQualificationSelected) {
    return (
      <div className="space-y-6">
        <QualificationSelector />
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Portfolio Management</CardTitle>
            <CardDescription>
              Select your qualification above to access your portfolio management system with:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Quick Access</h3>
                <p className="text-sm text-muted-foreground">
                  Efficient access to your portfolio data
                </p>
              </div>
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Easy Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Add and edit your portfolio entries seamlessly
                </p>
              </div>
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your portfolio completion progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-elec-gray min-h-screen p-4 sm:p-6">
      {/* Current Qualification Display */}
      <QualificationSelector />

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setShowAddForm(true)}
          disabled={isAddingEntry}
          className="flex items-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          {isAddingEntry ? 'Adding...' : 'Add Portfolio Entry'}
        </Button>
        <Button 
          onClick={handleChangeCourse}
          variant="outline"
          className="flex items-center gap-2 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
          size="lg"
        >
          <RefreshCw className="h-4 w-4" />
          Clear Course Selection
        </Button>
        <PortfolioExportDialog entries={entries} />
        <Button 
          onClick={refresh}
          variant="outline"
          className="flex items-center gap-2 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
          size="sm"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>


      {/* Main Content Tabs */}
      <DropdownTabs
        placeholder="Select portfolio section"
        defaultValue="grouped"
        onValueChange={setActiveTab}
        tabs={[
          {
            value: "grouped",
            label: "Grouped Overview",
            icon: Grid,
            content: (
              <div className="space-y-6 mt-4">
                <Suspense fallback={<UltraFastLoadingState showSkeleton={false} message="Loading grouped view..." />}>
                  <GroupedPortfolioOverview 
                    groups={groups}
                    getEntriesByGroup={getEntriesByGroup}
                  />
                </Suspense>
              </div>
            )
          },
          {
            value: "competency",
            label: "Competency Levels",
            icon: BarChart3,
            content: (
              <div className="space-y-6 mt-4">
                <Suspense fallback={<UltraFastLoadingState showSkeleton={false} message="Loading competency view..." />}>
                  <CompetencyLevelView 
                    categories={categories}
                    getEntriesByCompetencyLevel={(level) => {
                      const levelCategories = getCategoriesByCompetencyLevel(level);
                      const levelCategoryIds = levelCategories.map(cat => cat.id);
                      return entries.filter(entry => levelCategoryIds.includes(entry.category.id));
                    }}
                  />
                </Suspense>
              </div>
            )
          },
          {
            value: "categories",
            label: "Individual Categories",
            icon: List,
            content: (
              <div className="space-y-6 mt-4">
                <div className="grid gap-4">
                  {categories.map((category) => (
                    <MemoizedCategoryCard
                      key={category.id}
                      category={category}
                      entries={entries}
                    />
                  ))}
                </div>
              </div>
            )
          },
          {
            value: "entries",
            label: "Portfolio Entries",
            icon: FileText,
            content: (
              <div className="mt-4">
                <Suspense fallback={<UltraFastLoadingState showSkeleton={false} message="Loading entries..." />}>
                  <PortfolioEntriesList 
                    entries={entries}
                    onUpdateEntry={updateEntry}
                    onDeleteEntry={deleteEntry}
                  />
                </Suspense>
              </div>
            )
          },
          {
            value: "compliance",
            label: "Compliance Progress",
            icon: TrendingUp,
            content: (
              <div className="mt-4">
                <Suspense fallback={<UltraFastLoadingState showSkeleton={false} message="Loading compliance data..." />}>
                  <QualificationCompliance />
                </Suspense>
              </div>
            )
          }
        ]}
      />

      {/* Add Entry Form Modal */}
      {showAddForm && (
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-elec-gray border-elec-yellow/20">
            <DialogHeader>
              <DialogTitle>Add Portfolio Entry</DialogTitle>
            </DialogHeader>
            <PortfolioEntryForm
              categories={categories}
              onSubmit={async (data) => {
                await addEntry(data as Omit<PortfolioEntry, 'id' | 'dateCreated'>);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default memo(PortfolioManager);