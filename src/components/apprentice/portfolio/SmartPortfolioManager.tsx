import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, FileText, Target, TrendingUp } from 'lucide-react';
import { PortfolioEntry } from '@/types/portfolio';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';
import QualificationCompliance from '@/components/apprentice/qualification/QualificationCompliance';
import PortfolioEntryForm from '@/components/apprentice/portfolio/PortfolioEntryForm';
import PortfolioEntriesList from '@/components/apprentice/portfolio/PortfolioEntriesList';
import { usePortfolioDataWithQualifications } from '@/hooks/portfolio/usePortfolioDataWithQualifications';
import { useQualifications } from '@/hooks/qualification/useQualifications';

const SmartPortfolioManager = () => {
  const { userSelection } = useQualifications();
  const { entries, categories, analytics, isLoading, addEntry, updateEntry, deleteEntry, hasQualificationSelected } = usePortfolioDataWithQualifications();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Portfolio...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!hasQualificationSelected) {
    return (
      <div className="space-y-6">
        <QualificationSelector />
        
        <Card>
          <CardHeader>
            <CardTitle>Smart Portfolio System</CardTitle>
            <CardDescription>
              Select your qualification above to unlock a personalized portfolio experience with:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Tailored Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  Portfolio categories specific to your qualification
                </p>
              </div>
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Pre-built Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Ready-to-use templates with assessment criteria
                </p>
              </div>
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Compliance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time progress tracking towards qualification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Qualification Display */}
      <QualificationSelector />

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          Add Portfolio Entry
        </Button>
      </div>

      {/* Quick Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Entries</p>
                  <p className="text-2xl font-bold">{analytics.totalEntries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{analytics.completedEntries}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Logged</p>
                  <p className="text-2xl font-bold">{Math.round(analytics.totalTimeSpent / 60)}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "entries" ? "default" : "outline"}
            onClick={() => setActiveTab("entries")}
          >
            Portfolio Entries
          </Button>
          <Button
            variant={activeTab === "compliance" ? "default" : "outline"}
            onClick={() => setActiveTab("compliance")}
          >
            Compliance Progress
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4">
              {categories.map((category) => {
                const categoryEntries = entries.filter(e => e.category.id === category.id);
                const completedEntries = categoryEntries.filter(e => e.status === 'completed').length;
                const progressPercentage = Math.round((completedEntries / category.requiredEntries) * 100);

                return (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <Badge variant={progressPercentage >= 100 ? "default" : "secondary"}>
                          {completedEntries}/{category.requiredEntries}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{progressPercentage}% complete</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "entries" && (
          <PortfolioEntriesList 
            entries={entries}
            onUpdateEntry={updateEntry}
            onDeleteEntry={deleteEntry}
          />
        )}

        {activeTab === "compliance" && (
          <QualificationCompliance />
        )}
      </div>

      {/* Add Entry Form Modal */}
      {showAddForm && (
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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

export default SmartPortfolioManager;