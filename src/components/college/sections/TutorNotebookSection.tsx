import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Plus,
  Upload,
  FileText,
  MessageSquare,
  Sparkles,
  Search,
  MoreVertical,
  FolderPlus,
  Trash2,
  Share2,
  Clock,
  Bot,
  Send,
  FileUp,
  Link,
  File,
  Image,
  Video,
  Mic,
  X,
  ChevronRight,
  Lightbulb,
  ListChecks,
  FileQuestion,
  Presentation,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Notebook {
  id: string;
  name: string;
  description?: string;
  sourceCount: number;
  lastUpdated: string;
  color: string;
}

interface Source {
  id: string;
  name: string;
  type: 'document' | 'link' | 'image' | 'video' | 'audio' | 'note';
  addedAt: string;
  size?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Mock data for notebooks
const mockNotebooks: Notebook[] = [
  {
    id: '1',
    name: 'Electrical Installation Theory',
    description: 'Notes and resources for EAL Level 2',
    sourceCount: 12,
    lastUpdated: '2024-01-15',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Health & Safety Training',
    description: 'H&S regulations and procedures',
    sourceCount: 8,
    lastUpdated: '2024-01-10',
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Assessment Criteria Guide',
    description: 'Unit assessment criteria and mapping',
    sourceCount: 15,
    lastUpdated: '2024-01-08',
    color: 'bg-purple-500',
  },
];

const mockSources: Source[] = [
  { id: '1', name: 'BS7671 18th Edition Summary.pdf', type: 'document', addedAt: '2024-01-15', size: '2.4 MB' },
  { id: '2', name: 'Circuit Protection Notes.docx', type: 'document', addedAt: '2024-01-14', size: '156 KB' },
  { id: '3', name: 'https://electricalregs.co.uk/guide', type: 'link', addedAt: '2024-01-12' },
  { id: '4', name: 'Earthing Diagram.png', type: 'image', addedAt: '2024-01-10', size: '890 KB' },
  { id: '5', name: 'Lesson observation notes', type: 'note', addedAt: '2024-01-08' },
];

export function TutorNotebookSection() {
  const [notebooks, setNotebooks] = useState<Notebook[]>(mockNotebooks);
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
  const [sources, setSources] = useState<Source[]>(mockSources);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddSourceDialogOpen, setIsAddSourceDialogOpen] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [newNotebookDesc, setNewNotebookDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getSourceIcon = (type: Source['type']) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Mic className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on the sources in "${selectedNotebook?.name}", here's what I found:\n\nThe BS7671 18th Edition establishes the requirements for electrical installations. Key points include:\n\n1. **Earthing Requirements** - All installations must have effective earthing arrangements\n2. **Circuit Protection** - Overcurrent protection must be provided for all circuits\n3. **Testing Requirements** - Installations must be tested and verified before energisation\n\nWould you like me to elaborate on any of these points or generate study materials?`,
        timestamp: new Date().toISOString(),
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleCreateNotebook = () => {
    if (!newNotebookName.trim()) return;

    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-cyan-500'];
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name: newNotebookName,
      description: newNotebookDesc,
      sourceCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setNotebooks(prev => [...prev, newNotebook]);
    setNewNotebookName('');
    setNewNotebookDesc('');
    setIsCreateDialogOpen(false);
  };

  const filteredNotebooks = notebooks.filter(nb =>
    nb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    nb.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Notebook list view
  if (!selectedNotebook) {
    return (
      <div className="space-y-6 animate-fade-in">
        <CollegeSectionHeader
          title="Teaching Notebook"
          description="AI-powered notes and resource organization"
          icon={BookOpen}
          actions={
            <Button
              className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              New Notebook
            </Button>
          }
        />

        {/* Search */}
        <div className="relative">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search notebooks..."
            className={cn("bg-elec-gray border-elec-yellow/20", !searchQuery && "pl-10")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* AI Feature Highlight */}
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">AI-Powered Teaching Assistant</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload your notes, lesson plans, and resources. Ask questions, generate summaries,
                  create quizzes, and get AI-powered insights from your teaching materials.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full">Summarize content</span>
                  <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full">Generate quizzes</span>
                  <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full">Create study guides</span>
                  <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full">Q&A chat</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notebooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotebooks.map((notebook) => (
            <Card
              key={notebook.id}
              className="group cursor-pointer border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedNotebook(notebook)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg ${notebook.color} flex items-center justify-center`}>
                    <BookOpen className="h-5 w-5 text-foreground" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{notebook.name}</h3>
                {notebook.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{notebook.description}</p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {notebook.sourceCount} sources
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(notebook.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Card */}
          <Card
            className="cursor-pointer border-dashed border-2 border-elec-yellow/30 bg-transparent hover:bg-elec-yellow/5 hover:border-elec-yellow/50 transition-all duration-300"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <CardContent className="p-5 h-full flex flex-col items-center justify-center min-h-[180px]">
              <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center mb-3">
                <FolderPlus className="h-6 w-6 text-elec-yellow" />
              </div>
              <p className="text-sm text-muted-foreground">Create new notebook</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Notebook Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="bg-elec-dark border-elec-yellow/20">
            <DialogHeader>
              <DialogTitle>Create New Notebook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Notebook Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Electrical Theory Notes"
                  value={newNotebookName}
                  onChange={(e) => setNewNotebookName(e.target.value)}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What's this notebook about?"
                  value={newNotebookDesc}
                  onChange={(e) => setNewNotebookDesc(e.target.value)}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                onClick={handleCreateNotebook}
                disabled={!newNotebookName.trim()}
              >
                Create Notebook
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Notebook detail view with AI chat
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedNotebook(null)}
          className="gap-1 text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back
        </Button>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-3 flex-1">
          <div className={`h-8 w-8 rounded-lg ${selectedNotebook.color} flex items-center justify-center`}>
            <BookOpen className="h-4 w-4 text-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">{selectedNotebook.name}</h1>
            <p className="text-xs text-muted-foreground">{sources.length} sources</p>
          </div>
        </div>
        <Button
          className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
          onClick={() => setIsAddSourceDialogOpen(true)}
        >
          <Upload className="h-4 w-4" />
          Add Source
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sources Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sources.map((source) => (
                <div
                  key={source.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 cursor-pointer transition-colors group"
                >
                  <div className="h-8 w-8 rounded bg-elec-yellow/10 flex items-center justify-center text-elec-yellow">
                    {getSourceIcon(source.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{source.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {source.size || new Date(source.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full mt-3 border-dashed border-elec-yellow/30 hover:bg-elec-yellow/10"
                onClick={() => setIsAddSourceDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add source
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                AI Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
                onClick={() => {
                  setChatInput('Generate a summary of all the content in this notebook');
                  handleSendMessage();
                }}
              >
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
                Generate Summary
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                <ListChecks className="h-4 w-4 text-elec-yellow" />
                Create Quiz
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                <FileQuestion className="h-4 w-4 text-elec-yellow" />
                Study Guide
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                <Presentation className="h-4 w-4 text-elec-yellow" />
                Lesson Outline
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Panel */}
        <div className="lg:col-span-2">
          <Card className="border-elec-yellow/20 bg-elec-gray h-[600px] flex flex-col">
            <CardHeader className="pb-3 border-b border-elec-yellow/10">
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-4 w-4 text-elec-yellow" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="h-16 w-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-elec-yellow" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Ask anything about your sources</h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-4">
                      The AI has read all your uploaded documents and can answer questions,
                      create summaries, generate quizzes, and more.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setChatInput('What are the key points from my notes?')}
                      >
                        Key points from notes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setChatInput('Create a 5-question quiz on this topic')}
                      >
                        Create a quiz
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setChatInput('Explain the main concepts in simple terms')}
                      >
                        Simplify concepts
                      </Button>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-elec-yellow text-black'
                            : 'bg-background border border-elec-yellow/20'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4 text-elec-yellow" />
                            <span className="text-xs text-muted-foreground">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-elec-yellow/10">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your sources..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-background border-elec-yellow/20"
                  />
                  <Button
                    className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Source Dialog */}
      <Dialog open={isAddSourceDialogOpen} onOpenChange={setIsAddSourceDialogOpen}>
        <DialogContent className="bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>Add Source</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              <FileUp className="h-6 w-6 text-elec-yellow" />
              <span className="text-sm">Upload File</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              <Link className="h-6 w-6 text-elec-yellow" />
              <span className="text-sm">Add Link</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              <FileText className="h-6 w-6 text-elec-yellow" />
              <span className="text-sm">Write Note</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              <Video className="h-6 w-6 text-elec-yellow" />
              <span className="text-sm">YouTube Link</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Supported: PDF, Word, PowerPoint, Images, YouTube, Web links
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
