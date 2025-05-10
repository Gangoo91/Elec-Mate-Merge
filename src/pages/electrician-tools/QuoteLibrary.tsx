
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, PlusCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteTemplateList from "@/components/admin/quotes/QuoteTemplateList";
import QuoteGenerator from "@/components/admin/quotes/QuoteGenerator";
import QuotePreview from "@/components/admin/quotes/QuotePreview";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const QuoteLibrary = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("templates");
  const [previewQuote, setPreviewQuote] = useState<any>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("rewire");
  
  const handleGenerateQuote = (quoteData: any) => {
    setPreviewQuote(quoteData);
    setActiveTab("preview");
    toast({
      title: "Quote Generated",
      description: "Your customized quote has been generated successfully."
    });
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActiveTab("generate");
  };
  
  const handleDownloadQuote = () => {
    toast({
      title: "Quote Downloaded",
      description: "Your quote has been downloaded as a PDF file."
    });
    // In a production environment, this would trigger the actual PDF generation and download
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote Library</h1>
          <p className="text-muted-foreground">
            Generate professional quotes for common electrical jobs.
          </p>
        </div>
        <Link to="/electrician-tools/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Admin Tools
          </Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-elec-yellow/20">
              <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
                <TabsTrigger 
                  value="templates" 
                  className="rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="generate" 
                  className="rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Generate
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="rounded-none border-b-2 border-transparent px-3 py-2 data-[state=active]:border-elec-yellow data-[state=active]:bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-4">
              <TabsContent value="templates" className="m-0">
                <QuoteTemplateList onSelectTemplate={handleSelectTemplate} />
              </TabsContent>

              <TabsContent value="generate" className="m-0">
                <QuoteGenerator 
                  onGenerateQuote={handleGenerateQuote} 
                  initialJobType={selectedTemplateId} 
                />
              </TabsContent>

              <TabsContent value="preview" className="m-0">
                {previewQuote ? (
                  <div className="space-y-4">
                    <QuotePreview quoteData={previewQuote} />
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("generate")}
                        className="w-full sm:w-auto"
                      >
                        Edit Quote
                      </Button>
                      <Button 
                        onClick={handleDownloadQuote}
                        className="w-full sm:w-auto"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Quote
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No quote has been generated yet. Start by selecting a template.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("templates")}
                    >
                      Browse Templates
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteLibrary;
