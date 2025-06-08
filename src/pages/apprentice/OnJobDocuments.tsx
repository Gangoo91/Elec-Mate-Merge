
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, Star, Archive } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TemplateLibraryTab from "@/components/apprentice/documents/TemplateLibraryTab";
import MyDocumentsTab from "@/components/apprentice/documents/MyDocumentsTab";
import FavouritesTab from "@/components/apprentice/documents/FavouritesTab";
import HistoryTab from "@/components/apprentice/documents/HistoryTab";

const OnJobDocuments = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Document Templates</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Access professional document templates, manage your files, and track your documentation history
        </p>
        <BackButton customUrl="/apprentice/on-job-tools" label="Back to On-Job Tools" />
      </div>

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Template Library
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            My Documents
          </TabsTrigger>
          <TabsTrigger value="favourites" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Favourites
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          <TemplateLibraryTab />
        </TabsContent>

        <TabsContent value="documents">
          <MyDocumentsTab />
        </TabsContent>

        <TabsContent value="favourites">
          <FavouritesTab />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Proper documentation is essential for electrical work. Always ensure certificates are completed accurately,
            keep copies for your records, and maintain organised files for easy access during inspections or future work.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnJobDocuments;
