
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, PlusCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuoteTemplateList from "@/components/admin/quotes/QuoteTemplateList";
import QuoteGenerator from "@/components/admin/quotes/QuoteGenerator";
import QuotePreview from "@/components/admin/quotes/QuotePreview";
import AIQuoteBuilder from "@/components/admin/quotes/AIQuoteBuilder";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const QuoteLibrary = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("ai-builder");
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
  };
  
  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        {/* Header */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Quote Library</h1>
                <p className="text-muted-foreground mt-1">
                  Generate professional quotes for electrical jobs with AI assistance.
                </p>
              </div>
              <Link to="/electrician-tools/admin">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4" /> 
                  <span className="sm:inline">Back to Admin Tools</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* AI Quote Builder Section */}
        <AIQuoteBuilder onQuoteGenerated={handleGenerateQuote} />

        {/* Main Quote Tools */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Responsive Tab Navigation */}
              <div className="border-b border-elec-yellow/20 p-4">
                <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} w-full bg-elec-dark/50 p-1 rounded-lg`}>
                  <TabsTrigger 
                    value="ai-builder" 
                    className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-xs sm:text-sm px-2 py-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">AI Builder</span>
                    <span className="sm:hidden">AI</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="templates" 
                    className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-xs sm:text-sm px-2 py-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Templates</span>
                    <span className="sm:hidden">Templates</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="generate" 
                    className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-xs sm:text-sm px-2 py-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Generate</span>
                    <span className="sm:hidden">Generate</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview" 
                    className="flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-xs sm:text-sm px-2 py-2"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                    <span className="sm:hidden">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content with proper mobile spacing */}
              <div className="p-4 sm:p-6">
                <TabsContent value="ai-builder" className="m-0">
                  <Card className="border-elec-yellow/20 bg-elec-dark/20">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-semibold mb-2 text-white">AI Quote Builder Active</h3>
                      <p className="text-muted-foreground mb-4">
                        Use the AI Quote Builder above to instantly generate quotes, or browse templates below for traditional quote creation.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab("templates")}
                        className="w-full sm:w-auto"
                      >
                        Browse Quote Templates
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

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
                      <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("generate")}
                          className="w-full sm:w-auto order-2 sm:order-1"
                        >
                          Edit Quote
                        </Button>
                        <Button 
                          onClick={handleDownloadQuote}
                          className="w-full sm:w-auto order-1 sm:order-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Quote
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Card className="border-elec-yellow/20 bg-elec-dark/20">
                      <CardContent className="pt-6 text-center">
                        <h3 className="text-lg font-semibold mb-2 text-white">No Quote Generated</h3>
                        <p className="text-muted-foreground mb-4">
                          Generate a quote using the AI Builder or select a template to get started.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab("ai-builder")}
                            className="w-full sm:w-auto"
                          >
                            Use AI Builder
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab("templates")}
                            className="w-full sm:w-auto"
                          >
                            Browse Templates
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteLibrary;
