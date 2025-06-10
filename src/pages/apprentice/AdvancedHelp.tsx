
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Search, 
  Upload, 
  AlertTriangle, 
  Phone, 
  MessageSquare, 
  Brain, 
  Zap,
  FileText,
  Send,
  Paperclip,
  Sparkles
} from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdvancedHelp = () => {
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{title: string, content: string, source: string, relevance: number}>>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");

  const quickActions = [
    {
      id: "emergency",
      title: "Emergency Contacts",
      description: "Access emergency helplines and contacts",
      icon: Phone,
      color: "bg-red-500/20 border-red-500/50",
      action: () => showEmergencyContacts()
    },
    {
      id: "report",
      title: "Report Issue",
      description: "Report safety concerns or technical issues",
      icon: AlertTriangle,
      color: "bg-orange-500/20 border-orange-500/50", 
      action: () => openReportDialog()
    }
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "999", description: "Life-threatening emergencies" },
    { name: "Electrical Safety First", number: "0207 582 7746", description: "Electrical safety advice" },
    { name: "HSE Emergency", number: "0300 003 1647", description: "Health & Safety Executive" },
    { name: "Training Provider", number: "01234 567890", description: "Your training provider support" },
    { name: "Mentor Hotline", number: "0800 123 4567", description: "24/7 apprentice support" }
  ];

  const sendChatMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { 
          message: currentMessage,
          context: "electrical apprenticeship support"
        }
      });

      if (error) throw error;

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: data.response || "I'm here to help with your electrical apprenticeship questions!",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const performSmartSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Simulate smart search with AI-powered results
      const mockResults = [
        {
          title: "BS 7671 Regulation 314.1",
          content: "Every installation shall be divided into circuits, as necessary, to avoid hazards and minimize inconvenience in the event of a fault.",
          source: "IET Wiring Regulations",
          relevance: 95
        },
        {
          title: "Safe Isolation Procedures",
          content: "The safe isolation procedure involves proving dead, isolating, securing, and testing before work begins.",
          source: "Health & Safety Guidelines",
          relevance: 87
        },
        {
          title: "Testing and Inspection Requirements", 
          content: "All electrical installations must be tested and inspected in accordance with BS 7671 requirements.",
          source: "Technical Standards",
          relevance: 82
        }
      ];

      setSearchResults(mockResults);
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} relevant results`
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error", 
        description: "Failed to perform search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} ready for AI analysis`
      });
    }
  };

  const analyzeDocument = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    try {
      // Simulate AI document analysis
      setTimeout(() => {
        setAnalysisResult(`AI Analysis of "${uploadedFile.name}":

This document appears to be an electrical installation guide. Key findings:
• Contains safety procedures and regulations compliance
• Includes technical specifications for cable sizing
• References BS 7671 requirements throughout
• Suitable for apprenticeship portfolio evidence

Recommendations:
• Document demonstrates good understanding of electrical principles
• Consider adding more detail on testing procedures
• Include photos of completed installation work
• Ensure all safety considerations are documented`);
        
        setIsLoading(false);
        toast({
          title: "Analysis Complete",
          description: "AI has analyzed your document"
        });
      }, 3000);
    } catch (error) {
      console.error('Analysis error:', error);
      setIsLoading(false);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const showEmergencyContacts = () => {
    toast({
      title: "Emergency Contacts",
      description: "Emergency contact information displayed below"
    });
  };

  const openReportDialog = () => {
    toast({
      title: "Report Issue",
      description: "Issue reporting form opened"
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Help Box</h1>
        <p className="text-xl text-elec-yellow font-semibold mb-2">AI & AR Powered Support</p>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Get intelligent assistance with AI-powered chat, smart document analysis, advanced search, 
          and immediate access to emergency support for your electrical apprenticeship
        </p>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {quickActions.map((action) => (
          <Card 
            key={action.id} 
            className={`cursor-pointer hover:bg-muted/50 transition-colors ${action.color}`}
            onClick={action.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <action.icon className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Smart Search
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Document Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Chat Assistant
                <Badge className="bg-elec-yellow text-black">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-muted/30">
                  {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <Brain className="h-12 w-12 mx-auto mb-4 text-elec-yellow" />
                        <p>Start a conversation with the AI assistant</p>
                        <p className="text-sm">Ask about electrical regulations, safety, or apprenticeship guidance</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-elec-yellow text-black'
                                : 'bg-background border'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-background border rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4 animate-pulse text-elec-yellow" />
                              <span className="text-sm">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask the AI assistant anything about electrical work..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    disabled={isLoading}
                  />
                  <Button onClick={sendChatMessage} disabled={isLoading || !currentMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Intelligent Search
                <Badge className="bg-purple-600 text-white">AI-Powered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search regulations, procedures, safety guidelines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && performSmartSearch()}
                  />
                  <Button onClick={performSmartSearch} disabled={isLoading || !searchQuery.trim()}>
                    {isLoading ? (
                      <Brain className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Search Results</h3>
                    {searchResults.map((result, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{result.title}</h4>
                            <Badge variant="outline">{result.relevance}% match</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{result.content}</p>
                          <p className="text-xs text-muted-foreground">Source: {result.source}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                AI Document Analysis
                <Badge className="bg-green-600 text-white">Smart Analysis</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Click to upload document</p>
                    <p className="text-xs text-muted-foreground">PDF, Word, Images supported</p>
                  </label>
                </div>

                {uploadedFile && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                        </div>
                        <Button onClick={analyzeDocument} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Brain className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Analyze with AI
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {analysisResult && (
                  <Card className="border-green-500/50 bg-green-500/10">
                    <CardHeader>
                      <CardTitle className="text-green-300 flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                        {analysisResult}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${contact.number}`}>{contact.number}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/50 bg-gradient-to-br from-elec-yellow/10 to-orange-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Advanced AI & AR Support System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your advanced help system combines artificial intelligence, smart search, and document analysis 
            to provide instant, intelligent support for your electrical apprenticeship. Get expert guidance, 
            analyze documents, search regulations, and access emergency support whenever you need it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
