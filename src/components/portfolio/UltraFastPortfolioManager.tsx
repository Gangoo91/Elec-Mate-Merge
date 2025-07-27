import { useState, memo, Suspense, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, FileText, Target, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { PortfolioEntry } from '@/types/portfolio';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import QualificationChangeSelector from '@/components/apprentice/qualification/QualificationChangeSelector';
import QualificationCompliance from '@/components/apprentice/qualification/QualificationCompliance';
import PortfolioEntryForm from '@/components/apprentice/portfolio/PortfolioEntryForm';
import PortfolioEntriesList from '@/components/apprentice/portfolio/PortfolioEntriesList';
import { useUltraFastPortfolio } from '@/hooks/portfolio/useUltraFastPortfolio';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { UltraFastLoadingState } from '@/components/portfolio/UltraFastLoadingState';

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

const UltraFastPortfolioManager = () => {
  const { clearQualificationSelection } = useQualifications();
  const { 
    entries, 
    categories, 
    analytics, 
    isLoading, 
    hasQualificationSelected,
    addEntry,
    updateEntry,
    deleteEntry,
    isAddingEntry,
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

  // Show ultra-fast loading only if we have no data and are loading
  if (isLoading) {
    return <UltraFastLoadingState showSkeleton={true} message="Preparing your portfolio..." />;
  }

  if (!hasQualificationSelected) {
    return (
      <div className="space-y-6">
        <QualificationSelector />
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>Ultra-Fast Portfolio System</CardTitle>
            <CardDescription>
              Select your qualification above to unlock lightning-fast portfolio management with:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Instant Loading</h3>
                <p className="text-sm text-muted-foreground">
                  Cached data for immediate access to your portfolio
                </p>
              </div>
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Optimistic Updates</h3>
                <p className="text-sm text-muted-foreground">
                  See changes instantly while they sync in the background
                </p>
              </div>
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-elec-yellow" />
                <h3 className="font-semibold">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Live progress tracking with smart caching
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

      {/* Quick Stats - Memoized for performance */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MemoizedStatsCard
            icon={FileText}
            label="Total Entries"
            value={analytics.totalEntries}
            color="text-elec-yellow"
          />
          <MemoizedStatsCard
            icon={Target}
            label="Completed"
            value={analytics.completedEntries}
            color="text-green-400"
          />
          <MemoizedStatsCard
            icon={TrendingUp}
            label="Time Logged"
            value={`${Math.round(analytics.totalTimeSpent / 60)}h`}
            color="text-purple-400"
          />
        </div>
      )}

      {/* Main Content Tabs */}
      <DropdownTabs
        placeholder="Select portfolio section"
        defaultValue="overview"
        onValueChange={setActiveTab}
        tabs={[
          {
            value: "overview",
            label: "Overview",
            icon: Target,
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

export default memo(UltraFastPortfolioManager);