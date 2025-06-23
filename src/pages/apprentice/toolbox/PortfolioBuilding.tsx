
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Plus, 
  BookOpen, 
  Wrench,
  Building
} from "lucide-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import PortfolioDocumentationContent from "@/components/apprentice/portfolio/PortfolioDocumentationContent";
import DigitalToolsIntegration from "@/components/apprentice/portfolio/DigitalToolsIntegration";
import IndustrySpecificSections from "@/components/apprentice/portfolio/IndustrySpecificSections";
import PortfolioEntryForm from "@/components/apprentice/portfolio/PortfolioEntryForm";

const PortfolioBuilding = () => {
  const { entries, categories, isLoading, addEntry } = usePortfolioData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("documentation");

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
                <BookOpen className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documentation</p>
                <p className="text-2xl font-bold">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/10 rounded-lg">
                <Wrench className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tools Ready</p>
                <p className="text-2xl font-bold">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documentation" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Industry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="mt-6">
          <PortfolioDocumentationContent />
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <DigitalToolsIntegration />
        </TabsContent>

        <TabsContent value="industry" className="mt-6">
          <IndustrySpecificSections />
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

export default PortfolioBuilding;
