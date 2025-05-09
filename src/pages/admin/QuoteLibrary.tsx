
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Settings, Download, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteTemplateList from "@/components/admin/quotes/QuoteTemplateList";
import QuoteGenerator from "@/components/admin/quotes/QuoteGenerator";
import QuotePreview from "@/components/admin/quotes/QuotePreview";
import { toast } from "@/hooks/use-toast";

const QuoteLibrary = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [previewQuote, setPreviewQuote] = useState<any>(null);
  
  const handleGenerateQuote = (quoteData: any) => {
    setPreviewQuote(quoteData);
    setActiveTab("preview");
    toast({
      title: "Quote Generated",
      description: "Your customized quote has been generated successfully."
    });
  };
  
  const handleDownloadQuote = () => {
    toast({
      title: "Quote Downloaded",
      description: "Your quote has been downloaded as a PDF file."
    });
    // In a production environment, this would trigger the actual PDF generation and download
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Library</h1>
          <p className="text-muted-foreground">
            Generate professional quotes for common electrical jobs.
          </p>
        </div>
        <Link to="/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Generate</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Preview</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <QuoteTemplateList onSelectTemplate={() => setActiveTab("generate")} />
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <QuoteGenerator onGenerateQuote={handleGenerateQuote} />
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          {previewQuote ? (
            <div className="space-y-4">
              <QuotePreview quoteData={previewQuote} />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Edit Quote</Button>
                <Button onClick={handleDownloadQuote}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Quote
                </Button>
              </div>
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No quote has been generated yet. Start by selecting a template.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab("templates")}
                >
                  Browse Templates
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuoteLibrary;
