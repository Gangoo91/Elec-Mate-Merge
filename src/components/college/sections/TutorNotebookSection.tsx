import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  ListCard,
  HubGrid,
  EmptyState,
  FilterBar,
  Pill,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';

interface Notebook {
  id: string;
  name: string;
  description?: string;
  sourceCount: number;
  lastUpdated: string;
  tone: Tone;
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

const mockNotebooks: Notebook[] = [
  {
    id: '1',
    name: 'Electrical Installation Theory',
    description: 'Notes and resources for EAL Level 2',
    sourceCount: 12,
    lastUpdated: '2024-01-15',
    tone: 'blue',
  },
  {
    id: '2',
    name: 'Health & Safety Training',
    description: 'H&S regulations and procedures',
    sourceCount: 8,
    lastUpdated: '2024-01-10',
    tone: 'emerald',
  },
  {
    id: '3',
    name: 'Assessment Criteria Guide',
    description: 'Unit assessment criteria and mapping',
    sourceCount: 15,
    lastUpdated: '2024-01-08',
    tone: 'purple',
  },
];

const mockSources: Source[] = [
  {
    id: '1',
    name: 'BS7671 18th Edition Summary.pdf',
    type: 'document',
    addedAt: '2024-01-15',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Circuit Protection Notes.docx',
    type: 'document',
    addedAt: '2024-01-14',
    size: '156 KB',
  },
  { id: '3', name: 'https://electricalregs.co.uk/guide', type: 'link', addedAt: '2024-01-12' },
  { id: '4', name: 'Earthing Diagram.png', type: 'image', addedAt: '2024-01-10', size: '890 KB' },
  { id: '5', name: 'Lesson observation notes', type: 'note', addedAt: '2024-01-08' },
];

const tones: Tone[] = ['blue', 'emerald', 'purple', 'amber', 'yellow', 'cyan'];

export function TutorNotebookSection() {
  const [notebooks, setNotebooks] = useState<Notebook[]>(mockNotebooks);
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(null);
  const [sources] = useState<Source[]>(mockSources);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddSourceDialogOpen, setIsAddSourceDialogOpen] = useState(false);
  const [newNotebookName, setNewNotebookName] = useState('');
  const [newNotebookDesc, setNewNotebookDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on the sources in "${selectedNotebook?.name}", here's what I found:\n\nThe BS7671 18th Edition establishes the requirements for electrical installations. Key points include:\n\n• Earthing requirements — all installations must have effective earthing\n• Circuit protection — overcurrent protection for all circuits\n• Testing — installations must be verified before energisation\n\nWould you like me to elaborate or generate study materials?`,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleCreateNotebook = () => {
    if (!newNotebookName.trim()) return;
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name: newNotebookName,
      description: newNotebookDesc,
      sourceCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      tone: tones[Math.floor(Math.random() * tones.length)],
    };
    setNotebooks((prev) => [...prev, newNotebook]);
    setNewNotebookName('');
    setNewNotebookDesc('');
    setIsCreateDialogOpen(false);
  };

  const filteredNotebooks = notebooks.filter(
    (nb) =>
      nb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nb.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ─────────── LIST VIEW ─────────── */
  if (!selectedNotebook) {
    return (
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Curriculum · Notebook"
            title="Teaching notebook"
            description="AI-powered notes, lesson summaries and quiz generation from your own source materials."
            tone="yellow"
            actions={
              <button
                onClick={() => setIsCreateDialogOpen(true)}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                New notebook →
              </button>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FilterBar
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search notebooks…"
          />
        </motion.div>

        {/* AI feature strip */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              AI-Powered
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Teaching assistant
            </h3>
            <p className="mt-2 text-[13px] text-white/55 max-w-2xl leading-relaxed">
              Upload lesson notes, plans and resources. Ask questions, generate summaries, create
              quizzes and get insights from your own materials.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <Pill tone="yellow">Summarise</Pill>
              <Pill tone="yellow">Quizzes</Pill>
              <Pill tone="yellow">Study guides</Pill>
              <Pill tone="yellow">Q&A chat</Pill>
            </div>
          </div>
        </motion.div>

        {/* NOTEBOOKS */}
        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader eyebrow="Your Notebooks" title={`${notebooks.length} notebooks`} />
          {filteredNotebooks.length === 0 ? (
            <EmptyState
              title="No notebooks found"
              description="Create your first notebook to start organising teaching materials."
              action="New notebook"
              onAction={() => setIsCreateDialogOpen(true)}
            />
          ) : (
            <HubGrid columns={3}>
              {filteredNotebooks.map((notebook, i) => (
                <button
                  key={notebook.id}
                  onClick={() => setSelectedNotebook(notebook)}
                  className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 text-left touch-manipulation flex flex-col min-h-[180px]"
                >
                  <div
                    className={cn(
                      'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                      toneDot[notebook.tone]
                    )}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                      {String(i + 1).padStart(2, '0')} · Notebook
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                          aria-label="Options"
                        >
                          ⋯
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400"
                          onClick={() => setNotebooks((prev) => prev.filter((n) => n.id !== notebook.id))}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white tracking-tight leading-snug">
                    {notebook.name}
                  </h3>
                  {notebook.description && (
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white/55 line-clamp-2">
                      {notebook.description}
                    </p>
                  )}
                  <div className="flex-grow" />
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11.5px] text-white/50">
                    <span className="tabular-nums">{notebook.sourceCount} sources</span>
                    <span className="tabular-nums">
                      {new Date(notebook.lastUpdated).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </HubGrid>
          )}
        </motion.section>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
            <DialogHeader>
              <DialogTitle>New notebook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Electrical theory notes"
                  value={newNotebookName}
                  onChange={(e) => setNewNotebookName(e.target.value)}
                  className="h-11 touch-manipulation bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What's this notebook about?"
                  value={newNotebookDesc}
                  onChange={(e) => setNewNotebookDesc(e.target.value)}
                  className="touch-manipulation bg-[hsl(0_0%_9%)] border-white/[0.08] focus:border-elec-yellow"
                />
              </div>
            </div>
            <DialogFooter className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotebook}
                disabled={!newNotebookName.trim()}
                className="text-[12.5px] font-medium text-elec-yellow hover:opacity-90 disabled:opacity-40 transition-colors touch-manipulation"
              >
                Create notebook →
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageFrame>
    );
  }

  /* ─────────── DETAIL VIEW ─────────── */
  return (
    <PageFrame>
      <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button
            onClick={() => setSelectedNotebook(null)}
            className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="h-4 w-px bg-white/10" aria-hidden />
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Notebook
            </div>
            <h1 className="mt-0.5 text-xl sm:text-2xl font-semibold text-white tracking-tight truncate">
              {selectedNotebook.name}
            </h1>
          </div>
        </div>
        <button
          onClick={() => setIsAddSourceDialogOpen(true)}
          className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap shrink-0"
        >
          Add source →
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: sources + ai actions */}
        <div className="lg:col-span-1 space-y-5">
          <div>
            <SectionHeader eyebrow="Sources" title={`${sources.length} items`} />
            <div className="mt-4">
              <ListCard>
                {sources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center gap-3 px-5 sm:px-6 py-3 hover:bg-[hsl(0_0%_15%)] transition-colors"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'h-1.5 w-1.5 rounded-full shrink-0',
                        source.type === 'document'
                          ? 'bg-blue-400'
                          : source.type === 'link'
                            ? 'bg-purple-400'
                            : source.type === 'image'
                              ? 'bg-emerald-400'
                              : source.type === 'video'
                                ? 'bg-red-400'
                                : source.type === 'audio'
                                  ? 'bg-amber-400'
                                  : 'bg-white/40'
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-white truncate">
                        {source.name}
                      </div>
                      <div className="mt-0.5 text-[11px] text-white/50 tabular-nums">
                        {source.size || new Date(source.addedAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsAddSourceDialogOpen(true)}
                  className="w-full px-5 sm:px-6 py-3 text-left text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  Add source →
                </button>
              </ListCard>
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="AI Actions" title="Quick prompts" />
            <div className="mt-4">
              <ListCard>
                {[
                  { label: 'Generate summary', prompt: 'Generate a summary of all content' },
                  { label: 'Create quiz', prompt: 'Create a 5-question quiz on this topic' },
                  { label: 'Study guide', prompt: 'Create a study guide from these sources' },
                  { label: 'Lesson outline', prompt: 'Create a lesson outline from these sources' },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      setChatInput(action.prompt);
                      setTimeout(handleSendMessage, 0);
                    }}
                    className="group w-full px-5 sm:px-6 py-4 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation flex items-center justify-between"
                  >
                    <span className="text-[13.5px] font-medium text-white group-hover:text-elec-yellow transition-colors">
                      {action.label}
                    </span>
                    <span className="text-elec-yellow/70 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                      →
                    </span>
                  </button>
                ))}
              </ListCard>
            </div>
          </div>
        </div>

        {/* RIGHT: chat */}
        <div className="lg:col-span-2">
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                AI Assistant
              </div>
              <h3 className="mt-1 text-base font-semibold text-white">
                Ask anything about your sources
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <h3 className="text-base font-semibold text-white">Start a conversation</h3>
                  <p className="mt-2 text-[13px] text-white/55 max-w-md leading-relaxed">
                    The AI has read all your sources. Ask questions, request summaries, generate
                    quizzes.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 justify-center">
                    {[
                      'What are the key points from my notes?',
                      'Create a 5-question quiz on this topic',
                      'Explain the main concepts in simple terms',
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => setChatInput(prompt)}
                        className="text-[11.5px] font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-full px-3 py-1.5 transition-colors touch-manipulation"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed',
                        message.role === 'user'
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.04] border border-white/[0.06] text-white'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40 mb-1.5">
                          AI Assistant
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask about your sources…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="h-11 px-4 bg-elec-yellow text-black rounded-full text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={isAddSourceDialogOpen} onOpenChange={setIsAddSourceDialogOpen}>
        <DialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
          <DialogHeader>
            <DialogTitle>Add source</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { label: 'Upload file', desc: 'PDF, Word, slides' },
              { label: 'Add link', desc: 'URL or web page' },
              { label: 'Write note', desc: 'Quick text note' },
              { label: 'Video link', desc: 'YouTube or video URL' },
            ].map((opt) => (
              <button
                key={opt.label}
                className="group bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 text-left touch-manipulation flex flex-col min-h-[100px]"
              >
                <span className="text-[14px] font-semibold text-white group-hover:text-elec-yellow transition-colors">
                  {opt.label}
                </span>
                <span className="mt-1 text-[11.5px] text-white/50">{opt.desc}</span>
              </button>
            ))}
          </div>
          <p className="text-[11.5px] text-white/40 text-center">
            Supported · PDF · Word · PowerPoint · Images · YouTube · Web links
          </p>
        </DialogContent>
      </Dialog>
    </PageFrame>
  );
}
