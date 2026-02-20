import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Megaphone,
  Users,
  Mail,
  Plus,
  Upload,
  Trash2,
  Send,
  Pause,
  Play,
  Eye,
  RefreshCw,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Loader2,
  BarChart3,
  MousePointerClick,
  Ban,
  Building2,
  FileText,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// ─── Types ──────────────────────────────────────────────────
interface OutreachContact {
  id: string;
  email: string;
  name: string | null;
  organisation: string | null;
  role: string | null;
  contact_type: string | null;
  tags: string[];
  source: string | null;
  is_suppressed: boolean;
  suppression_reason: string | null;
  notes: string | null;
  created_at: string;
}

interface OutreachCampaign {
  id: string;
  name: string;
  subject: string;
  html_body: string;
  from_name: string;
  from_email: string;
  segment_filter: Record<string, unknown>;
  status: string;
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  open_count: number;
  click_count: number;
  bounce_count: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

// ─── Edge function caller ───────────────────────────────────
async function callOutreach(action: string, payload: Record<string, unknown> = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-outreach-campaign`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ action, ...payload }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ─── Status badge styles ────────────────────────────────────
const CAMPAIGN_STATUS_STYLES: Record<string, string> = {
  draft: 'bg-slate-500/20 text-slate-400',
  sending: 'bg-blue-500/20 text-blue-400',
  paused: 'bg-amber-500/20 text-amber-400',
  completed: 'bg-green-500/20 text-green-400',
};

const CONTACT_TYPE_STYLES: Record<string, string> = {
  college: 'bg-blue-500/20 text-blue-400',
  employer: 'bg-green-500/20 text-green-400',
  supplier: 'bg-purple-500/20 text-purple-400',
  training_provider: 'bg-amber-500/20 text-amber-400',
  trade_body: 'bg-cyan-500/20 text-cyan-400',
  other: 'bg-slate-500/20 text-slate-400',
};

const CONTACT_TYPES = [
  'college',
  'employer',
  'supplier',
  'training_provider',
  'trade_body',
  'other',
] as const;

// ─── Main Component ─────────────────────────────────────────
export default function AdminOutreach() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'campaigns'>('contacts');

  return (
    <PullToRefresh onRefresh={async () => {}}>
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Outreach</h2>
            <p className="text-sm text-white">Cold email campaigns</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('contacts')}
            className={`h-11 gap-2 touch-manipulation ${
              activeTab === 'contacts'
                ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                : 'text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            Contacts
          </Button>
          <Button
            variant={activeTab === 'campaigns' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('campaigns')}
            className={`h-11 gap-2 touch-manipulation ${
              activeTab === 'campaigns'
                ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                : 'text-white'
            }`}
          >
            <Mail className="h-4 w-4" />
            Campaigns
          </Button>
        </div>

        {activeTab === 'contacts' ? <ContactsTab /> : <CampaignsTab />}
      </div>
    </PullToRefresh>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACTS TAB
// ═══════════════════════════════════════════════════════════════
function ContactsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showImportCSV, setShowImportCSV] = useState(false);
  const [selectedContact, setSelectedContact] = useState<OutreachContact | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['outreach-contacts', search, typeFilter],
    queryFn: () =>
      callOutreach('get_contacts', {
        search: search || undefined,
        contact_type: typeFilter,
        limit: 100,
      }),
    staleTime: 30_000,
  });

  const contacts: OutreachContact[] = data?.contacts || [];
  const total = data?.total || 0;
  const suppressedCount = contacts.filter((c) => c.is_suppressed).length;

  const deleteContactMutation = useMutation({
    mutationFn: (contactIds: string[]) => callOutreach('delete_contacts', { contactIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outreach-contacts'] });
      toast({ title: 'Contacts deleted' });
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-white">{total}</p>
          <p className="text-xs text-white">Total</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-white">{total - suppressedCount}</p>
          <p className="text-xs text-white">Active</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-white">{suppressedCount}</p>
          <p className="text-xs text-white">Suppressed</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-2">
        <div className="flex-1">
          <AdminSearchInput value={search} onChange={setSearch} placeholder="Search contacts..." />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36 h-12 touch-manipulation rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {CONTACT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          className="flex-1 h-11 gap-2 bg-purple-500 hover:bg-purple-600 text-white touch-manipulation rounded-xl"
          onClick={() => setShowAddContact(true)}
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-11 gap-2 border-purple-500/30 text-white hover:bg-purple-500/10 touch-manipulation rounded-xl"
          onClick={() => setShowImportCSV(true)}
        >
          <Upload className="h-4 w-4" />
          Import CSV
        </Button>
      </div>

      {/* Contact List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
        </div>
      ) : contacts.length === 0 ? (
        <AdminEmptyState
          icon={Users}
          title="No contacts yet"
          description="Add contacts manually or import from a CSV file"
        />
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <Card
              key={contact.id}
              className="border-border/30 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
              onClick={() => setSelectedContact(contact)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white truncate">
                        {contact.name || contact.email}
                      </p>
                      {contact.is_suppressed && (
                        <Badge className="bg-red-500/20 text-red-400 text-xs">Suppressed</Badge>
                      )}
                    </div>
                    <p className="text-sm text-white truncate">{contact.email}</p>
                    {contact.organisation && (
                      <p className="text-sm text-white flex items-center gap-1 mt-0.5">
                        <Building2 className="h-3 w-3" />
                        {contact.organisation}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      {contact.contact_type && (
                        <Badge
                          className={`text-xs ${CONTACT_TYPE_STYLES[contact.contact_type] || CONTACT_TYPE_STYLES.other}`}
                        >
                          {contact.contact_type.replace('_', ' ')}
                        </Badge>
                      )}
                      {contact.tags?.map((tag) => (
                        <Badge key={tag} className="bg-slate-500/20 text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Contact Sheet */}
      <AddContactSheet
        open={showAddContact}
        onOpenChange={setShowAddContact}
        onSuccess={() => {
          refetch();
          setShowAddContact(false);
        }}
      />

      {/* Import CSV Sheet */}
      <ImportCSVSheet
        open={showImportCSV}
        onOpenChange={setShowImportCSV}
        onSuccess={() => {
          refetch();
          setShowImportCSV(false);
        }}
      />

      {/* Contact Detail Sheet */}
      <Sheet open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <SheetContent
          side="bottom"
          className="h-[70vh] rounded-t-3xl p-0 border-t border-border/50"
        >
          {selectedContact && (
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
              </div>
              <SheetHeader className="px-6 pb-4 border-b border-border/50">
                <SheetTitle className="text-white">Contact Details</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <Label className="text-white text-xs">Email</Label>
                  <p className="text-white font-medium">{selectedContact.email}</p>
                </div>
                {selectedContact.name && (
                  <div>
                    <Label className="text-white text-xs">Name</Label>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                )}
                {selectedContact.organisation && (
                  <div>
                    <Label className="text-white text-xs">Organisation</Label>
                    <p className="text-white">{selectedContact.organisation}</p>
                  </div>
                )}
                {selectedContact.role && (
                  <div>
                    <Label className="text-white text-xs">Role</Label>
                    <p className="text-white">{selectedContact.role}</p>
                  </div>
                )}
                <div>
                  <Label className="text-white text-xs">Type</Label>
                  <p className="text-white">{selectedContact.contact_type || 'Not set'}</p>
                </div>
                {selectedContact.tags?.length > 0 && (
                  <div>
                    <Label className="text-white text-xs">Tags</Label>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {selectedContact.tags.map((t) => (
                        <Badge key={t} className="bg-slate-500/20 text-white">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <Label className="text-white text-xs">Added</Label>
                  <p className="text-white">
                    {format(new Date(selectedContact.created_at), 'dd MMM yyyy HH:mm')}
                  </p>
                </div>
                {selectedContact.is_suppressed && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <p className="text-red-400 font-semibold text-sm">Suppressed</p>
                    <p className="text-white text-sm">
                      Reason: {selectedContact.suppression_reason || 'Unknown'}
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation rounded-xl mt-4"
                  onClick={() => {
                    deleteContactMutation.mutate([selectedContact.id]);
                    setSelectedContact(null);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Contact
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ─── Add Contact Sheet ──────────────────────────────────────
function AddContactSheet({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: '',
    name: '',
    organisation: '',
    role: '',
    contact_type: 'other',
    tags: '',
  });

  const mutation = useMutation({
    mutationFn: () =>
      callOutreach('import_contacts', {
        contacts: [
          {
            email: form.email,
            name: form.name || undefined,
            organisation: form.organisation || undefined,
            role: form.role || undefined,
            contact_type: form.contact_type,
            tags: form.tags
              ? form.tags
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
              : [],
          },
        ],
      }),
    onSuccess: () => {
      toast({ title: 'Contact added' });
      setForm({ email: '', name: '', organisation: '', role: '', contact_type: 'other', tags: '' });
      onSuccess();
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Plus className="h-5 w-5 text-purple-400" />
              Add Contact
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <Label className="text-white">Email *</Label>
              <Input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="contact@company.com"
                className="h-11 touch-manipulation mt-1"
              />
            </div>
            <div>
              <Label className="text-white">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="John Smith"
                className="h-11 touch-manipulation mt-1"
              />
            </div>
            <div>
              <Label className="text-white">Organisation</Label>
              <Input
                value={form.organisation}
                onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
                placeholder="Company Ltd"
                className="h-11 touch-manipulation mt-1"
              />
            </div>
            <div>
              <Label className="text-white">Role</Label>
              <Input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Head of Electrical"
                className="h-11 touch-manipulation mt-1"
              />
            </div>
            <div>
              <Label className="text-white">Type</Label>
              <Select
                value={form.contact_type}
                onValueChange={(v) => setForm((f) => ({ ...f, contact_type: v }))}
              >
                <SelectTrigger className="h-11 touch-manipulation mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">Tags (comma-separated)</Label>
              <Input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="london, niceic"
                className="h-11 touch-manipulation mt-1"
              />
            </div>
            <Button
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
              onClick={() => mutation.mutate()}
              disabled={!form.email || mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Add Contact'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Import CSV Sheet ───────────────────────────────────────
function ImportCSVSheet({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const [csvText, setCsvText] = useState('');
  const [parsed, setParsed] = useState<Record<string, string>[]>([]);
  const [importing, setImporting] = useState(false);

  const handleParse = useCallback(() => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      toast({ title: 'Need header row + at least 1 data row', variant: 'destructive' });
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const emailIdx = headers.indexOf('email');
    if (emailIdx === -1) {
      toast({ title: 'CSV must have an "email" column', variant: 'destructive' });
      return;
    }

    const rows = lines.slice(1).map((line) => {
      const cols = line.split(',').map((c) => c.trim());
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        if (cols[i]) obj[h] = cols[i];
      });
      return obj;
    });

    setParsed(rows.filter((r) => r.email));
    toast({ title: `Parsed ${rows.filter((r) => r.email).length} contacts` });
  }, [csvText, toast]);

  const handleImport = async () => {
    if (parsed.length === 0) return;
    setImporting(true);
    try {
      const result = await callOutreach('import_contacts', { contacts: parsed });
      toast({
        title: `Imported ${result.imported} contacts`,
        description: result.skipped > 0 ? `${result.skipped} skipped` : undefined,
      });
      setCsvText('');
      setParsed([]);
      onSuccess();
    } catch (err: unknown) {
      toast({
        title: 'Import failed',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setImporting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCsvText(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Upload className="h-5 w-5 text-purple-400" />
              Import CSV
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">CSV Format</p>
              <p className="text-white text-xs font-mono">
                email, name, organisation, role, contact_type, tags
              </p>
            </div>

            <div>
              <Label className="text-white">Upload CSV file</Label>
              <Input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="h-11 touch-manipulation mt-1"
              />
            </div>

            <div>
              <Label className="text-white">Or paste CSV data</Label>
              <Textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="email,name,organisation,role,contact_type,tags&#10;john@company.com,John Smith,Company Ltd,Director,employer,london"
                className="min-h-[160px] font-mono text-sm touch-manipulation mt-1"
              />
            </div>

            {csvText && parsed.length === 0 && (
              <Button
                className="w-full h-11 bg-slate-600 hover:bg-slate-700 text-white touch-manipulation rounded-xl"
                onClick={handleParse}
              >
                Parse CSV
              </Button>
            )}

            {parsed.length > 0 && (
              <>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                  <p className="text-green-400 font-semibold text-sm">
                    {parsed.length} contacts ready to import
                  </p>
                  <div className="mt-2 max-h-32 overflow-y-auto space-y-1">
                    {parsed.slice(0, 5).map((c, i) => (
                      <p key={i} className="text-xs text-white truncate">
                        {c.email} {c.name ? `- ${c.name}` : ''}{' '}
                        {c.organisation ? `(${c.organisation})` : ''}
                      </p>
                    ))}
                    {parsed.length > 5 && (
                      <p className="text-xs text-white">...and {parsed.length - 5} more</p>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
                  onClick={handleImport}
                  disabled={importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Importing...
                    </>
                  ) : (
                    `Import ${parsed.length} Contacts`
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAMPAIGNS TAB
// ═══════════════════════════════════════════════════════════════
function CampaignsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showComposer, setShowComposer] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<OutreachCampaign | null>(null);
  const [activeSendingId, setActiveSendingId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['outreach-campaigns'],
    queryFn: () => callOutreach('get_campaigns'),
    staleTime: 15_000,
  });

  const campaigns: OutreachCampaign[] = data?.campaigns || [];

  // Auto-refresh while any campaign is sending
  useEffect(() => {
    const sendingCampaign = campaigns.find((c) => c.status === 'sending');
    if (sendingCampaign) {
      setActiveSendingId(sendingCampaign.id);
      const interval = setInterval(() => refetch(), 3000);
      return () => clearInterval(interval);
    } else {
      setActiveSendingId(null);
    }
  }, [campaigns, refetch]);

  return (
    <div className="space-y-4">
      {/* New Campaign Button */}
      <Button
        className="w-full h-12 gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
        onClick={() => setShowComposer(true)}
      >
        <Plus className="h-5 w-5" />
        New Campaign
      </Button>

      {/* Campaign List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
        </div>
      ) : campaigns.length === 0 ? (
        <AdminEmptyState
          icon={Mail}
          title="No campaigns yet"
          description="Create your first outreach campaign"
        />
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onSelect={() => setSelectedCampaign(campaign)}
              isSending={campaign.id === activeSendingId}
            />
          ))}
        </div>
      )}

      {/* Campaign Composer Sheet */}
      <CampaignComposerSheet
        open={showComposer}
        onOpenChange={setShowComposer}
        onSuccess={() => {
          refetch();
          setShowComposer(false);
        }}
      />

      {/* Campaign Detail Sheet */}
      {selectedCampaign && (
        <CampaignDetailSheet
          campaign={selectedCampaign}
          open={!!selectedCampaign}
          onOpenChange={(v) => !v && setSelectedCampaign(null)}
          onRefresh={() => {
            refetch();
          }}
        />
      )}
    </div>
  );
}

// ─── Campaign Card ──────────────────────────────────────────
function CampaignCard({
  campaign,
  onSelect,
  isSending,
}: {
  campaign: OutreachCampaign;
  onSelect: () => void;
  isSending: boolean;
}) {
  const progress =
    campaign.total_recipients > 0
      ? Math.round((campaign.sent_count / campaign.total_recipients) * 100)
      : 0;

  return (
    <Card
      className="border-border/30 cursor-pointer active:scale-[0.98] transition-transform touch-manipulation"
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white truncate flex-1">{campaign.name}</h3>
          <Badge className={`${CAMPAIGN_STATUS_STYLES[campaign.status] || ''} text-xs ml-2`}>
            {campaign.status}
          </Badge>
        </div>
        <p className="text-sm text-white truncate mb-2">{campaign.subject}</p>

        {(campaign.status === 'sending' || campaign.status === 'completed') && (
          <>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-sm font-bold text-white">{campaign.sent_count}</p>
                <p className="text-xs text-white">Sent</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{campaign.open_count}</p>
                <p className="text-xs text-white">Opened</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{campaign.click_count}</p>
                <p className="text-xs text-white">Clicked</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{campaign.bounce_count}</p>
                <p className="text-xs text-white">Bounced</p>
              </div>
            </div>
          </>
        )}

        {campaign.status === 'draft' && (
          <p className="text-xs text-white">
            Created {formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true })}
          </p>
        )}

        {isSending && (
          <div className="flex items-center gap-2 mt-2 text-blue-400 text-xs">
            <Loader2 className="h-3 w-3 animate-spin" />
            Sending...
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Campaign Composer Sheet ────────────────────────────────
function CampaignComposerSheet({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    subject: '',
    html_body: '',
    from_email: 'founder@elec-mate.com',
    segment_contact_types: [] as string[],
    segment_tags: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  const createMutation = useMutation({
    mutationFn: () =>
      callOutreach('create_campaign', {
        name: form.name,
        subject: form.subject,
        html_body: form.html_body,
        from_name:
          form.from_email === 'founder@elec-mate.com' ? 'Andrew from Elec-Mate' : 'Elec-Mate',
        from_email: form.from_email,
        segment_filter: {
          contact_type:
            form.segment_contact_types.length > 0 ? form.segment_contact_types : undefined,
          tags: form.segment_tags
            ? form.segment_tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            : undefined,
        },
      }),
    onSuccess: () => {
      toast({ title: 'Campaign created' });
      setForm({
        name: '',
        subject: '',
        html_body: '',
        from_email: 'founder@elec-mate.com',
        segment_contact_types: [],
        segment_tags: '',
      });
      onSuccess();
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const toggleType = (type: string) => {
    setForm((f) => ({
      ...f,
      segment_contact_types: f.segment_contact_types.includes(type)
        ? f.segment_contact_types.filter((t) => t !== type)
        : [...f.segment_contact_types, type],
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Mail className="h-5 w-5 text-purple-400" />
              New Campaign
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <Label className="text-white">Campaign Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. College Partnership Outreach Q1"
                className="h-11 touch-manipulation mt-1"
              />
            </div>

            <div>
              <Label className="text-white">From</Label>
              <Select
                value={form.from_email}
                onValueChange={(v) => setForm((f) => ({ ...f, from_email: v }))}
              >
                <SelectTrigger className="h-11 touch-manipulation mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="founder@elec-mate.com">
                    Andrew from Elec-Mate (founder@)
                  </SelectItem>
                  <SelectItem value="hello@elec-mate.com">Elec-Mate (hello@)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white">Subject Line *</Label>
              <Input
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="Partnership opportunity with Elec-Mate"
                className="h-11 touch-manipulation mt-1"
              />
            </div>

            <div>
              <Label className="text-white">Segment — Contact Types</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {CONTACT_TYPES.map((type) => (
                  <Button
                    key={type}
                    variant={form.segment_contact_types.includes(type) ? 'default' : 'outline'}
                    size="sm"
                    className={`h-9 touch-manipulation rounded-lg ${
                      form.segment_contact_types.includes(type)
                        ? 'bg-purple-500 text-white'
                        : 'text-white border-border/50'
                    }`}
                    onClick={() => toggleType(type)}
                  >
                    {type.replace('_', ' ')}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-white mt-1">Leave empty to send to all contact types</p>
            </div>

            <div>
              <Label className="text-white">Segment — Tags (comma-separated)</Label>
              <Input
                value={form.segment_tags}
                onChange={(e) => setForm((f) => ({ ...f, segment_tags: e.target.value }))}
                placeholder="london, niceic"
                className="h-11 touch-manipulation mt-1"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label className="text-white">HTML Body *</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-purple-400 touch-manipulation"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  {showPreview ? 'Edit' : 'Preview'}
                </Button>
              </div>
              {showPreview ? (
                <div
                  className="bg-white text-black rounded-xl p-4 mt-1 min-h-[200px] text-sm overflow-auto"
                  dangerouslySetInnerHTML={{ __html: form.html_body }}
                />
              ) : (
                <Textarea
                  value={form.html_body}
                  onChange={(e) => setForm((f) => ({ ...f, html_body: e.target.value }))}
                  placeholder="<h1>Hello!</h1><p>Your email content here...</p>"
                  className="min-h-[200px] font-mono text-sm touch-manipulation mt-1"
                />
              )}
            </div>

            <Button
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
              onClick={() => createMutation.mutate()}
              disabled={!form.name || !form.subject || !form.html_body || createMutation.isPending}
            >
              {createMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Create Campaign'
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Campaign Detail Sheet ──────────────────────────────────
function CampaignDetailSheet({
  campaign,
  open,
  onOpenChange,
  onRefresh,
}: {
  campaign: OutreachCampaign;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRefresh: () => void;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const batchRunningRef = useRef(false);
  const [confirmStart, setConfirmStart] = useState(false);
  const [confirmSendTest, setConfirmSendTest] = useState(false);
  const [lastBatchResult, setLastBatchResult] = useState<{
    sent: number;
    remaining: number;
    failed: number;
    completed?: boolean;
  } | null>(null);
  const [localCampaign, setLocalCampaign] = useState(campaign);

  // Keep localCampaign in sync
  useEffect(() => setLocalCampaign(campaign), [campaign]);

  // Fetch live campaign data
  const { data: liveData, refetch: refetchLive } = useQuery({
    queryKey: ['outreach-campaign-detail', campaign.id],
    queryFn: () => callOutreach('get_campaign', { campaignId: campaign.id }),
    staleTime: 5000,
    refetchInterval: localCampaign.status === 'sending' ? 3000 : false,
  });

  useEffect(() => {
    if (liveData?.campaign) setLocalCampaign(liveData.campaign);
  }, [liveData]);

  const prepareMutation = useMutation({
    mutationFn: () => callOutreach('prepare_send', { campaignId: campaign.id }),
    onSuccess: (data) => {
      toast({ title: `${data.recipients} recipients prepared` });
      if (data.recipients > 0) {
        startBatchLoop();
      }
      onRefresh();
      refetchLive();
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const sendTestMutation = useMutation({
    mutationFn: () =>
      callOutreach('send_test', {
        campaignId: campaign.id,
        testEmail: 'founder@elec-mate.com',
      }),
    onSuccess: () => toast({ title: 'Test email sent to founder@elec-mate.com' }),
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const pauseMutation = useMutation({
    mutationFn: () => callOutreach('pause_campaign', { campaignId: campaign.id }),
    onSuccess: () => {
      batchRunningRef.current = false;
      toast({ title: 'Campaign paused' });
      onRefresh();
      refetchLive();
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => callOutreach('delete_campaign', { campaignId: campaign.id }),
    onSuccess: () => {
      toast({ title: 'Campaign deleted' });
      onOpenChange(false);
      onRefresh();
    },
    onError: (err: Error) =>
      toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const startBatchLoop = useCallback(async () => {
    batchRunningRef.current = true;
    (window as unknown as Record<string, unknown>).__outreachBatchRunning = true;

    while (batchRunningRef.current) {
      try {
        const result = await callOutreach('send_batch', { campaignId: campaign.id });
        setLastBatchResult(result);
        refetchLive();

        if (result.completed || result.remaining === 0) {
          batchRunningRef.current = false;
          (window as unknown as Record<string, unknown>).__outreachBatchRunning = false;
          toast({ title: 'Campaign completed' });
          onRefresh();
          break;
        }

        // Wait 3s between batches
        await new Promise((r) => setTimeout(r, 3000));
      } catch (err: unknown) {
        console.error('Batch error:', err);
        batchRunningRef.current = false;
        (window as unknown as Record<string, unknown>).__outreachBatchRunning = false;
        toast({
          title: 'Batch error',
          description: err instanceof Error ? err.message : 'Unknown error',
          variant: 'destructive',
        });
        break;
      }
    }
  }, [campaign.id, refetchLive, onRefresh, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      batchRunningRef.current = false;
      (window as unknown as Record<string, unknown>).__outreachBatchRunning = false;
    };
  }, []);

  const progress =
    localCampaign.total_recipients > 0
      ? Math.round((localCampaign.sent_count / localCampaign.total_recipients) * 100)
      : 0;

  const openRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.open_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';
  const clickRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.click_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';
  const bounceRate =
    localCampaign.sent_count > 0
      ? ((localCampaign.bounce_count / localCampaign.sent_count) * 100).toFixed(1)
      : '0';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Mail className="h-5 w-5 text-purple-400" />
              {localCampaign.name}
              <Badge
                className={`${CAMPAIGN_STATUS_STYLES[localCampaign.status] || ''} text-xs ml-auto`}
              >
                {localCampaign.status}
              </Badge>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Campaign Info */}
            <Card className="border-border/30">
              <CardContent className="p-4 space-y-2">
                <div>
                  <p className="text-xs text-white">Subject</p>
                  <p className="font-medium text-white">{localCampaign.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-white">From</p>
                  <p className="text-white text-sm">
                    {localCampaign.from_name} &lt;{localCampaign.from_email}&gt;
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats (for sending/completed campaigns) */}
            {(localCampaign.status === 'sending' ||
              localCampaign.status === 'completed' ||
              localCampaign.status === 'paused') && (
              <>
                <div>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>Progress</span>
                    <span className="font-bold">
                      {localCampaign.sent_count} / {localCampaign.total_recipients} ({progress}%)
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                    <BarChart3 className="h-4 w-4 text-green-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{openRate}%</p>
                    <p className="text-xs text-white">Open Rate</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                    <MousePointerClick className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{clickRate}%</p>
                    <p className="text-xs text-white">Click Rate</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                    <Ban className="h-4 w-4 text-red-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{bounceRate}%</p>
                    <p className="text-xs text-white">Bounce Rate</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
                    <Send className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{localCampaign.sent_count}</p>
                    <p className="text-xs text-white">Delivered</p>
                  </div>
                </div>
              </>
            )}

            {/* Last Batch Result */}
            {lastBatchResult && localCampaign.status === 'sending' && (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-3">
                  <p className="text-sm text-white">
                    Last batch: {lastBatchResult.sent} sent, {lastBatchResult.remaining} remaining
                    {lastBatchResult.failed > 0 && `, ${lastBatchResult.failed} failed`}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            {localCampaign.status === 'draft' && (
              <div className="space-y-2">
                <Button
                  className="w-full h-12 gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
                  onClick={() => setConfirmStart(true)}
                  disabled={prepareMutation.isPending}
                >
                  {prepareMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Start Campaign
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 border-purple-500/30 text-white hover:bg-purple-500/10 touch-manipulation rounded-xl"
                  onClick={() => setConfirmSendTest(true)}
                  disabled={sendTestMutation.isPending}
                >
                  {sendTestMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  Send Test Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation rounded-xl"
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Campaign
                </Button>
              </div>
            )}

            {localCampaign.status === 'sending' && (
              <Button
                variant="outline"
                className="w-full h-12 gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-semibold touch-manipulation rounded-xl"
                onClick={() => pauseMutation.mutate()}
                disabled={pauseMutation.isPending}
              >
                <Pause className="h-5 w-5" />
                Pause Campaign
              </Button>
            )}

            {localCampaign.status === 'paused' && (
              <Button
                className="w-full h-12 gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold touch-manipulation rounded-xl"
                onClick={() => {
                  // Resume: re-prepare and send
                  prepareMutation.mutate();
                }}
                disabled={prepareMutation.isPending}
              >
                <Play className="h-5 w-5" />
                Resume Campaign
              </Button>
            )}

            {localCampaign.status === 'completed' && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-semibold">Campaign Complete</p>
                <p className="text-sm text-white">
                  {localCampaign.sent_count} emails sent
                  {localCampaign.completed_at &&
                    ` on ${format(new Date(localCampaign.completed_at), 'dd MMM yyyy HH:mm')}`}
                </p>
              </div>
            )}

            {/* Recipient List */}
            {liveData?.sends && liveData.sends.length > 0 && (
              <Card className="border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-400" />
                    Recipients ({liveData.sends.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-60 overflow-y-auto space-y-1">
                  {liveData.sends.map((send: { id: string; status: string; email: string }) => (
                    <div
                      key={send.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-sm"
                    >
                      {send.status === 'sent' || send.status === 'delivered' ? (
                        <Check className="h-3.5 w-3.5 text-green-400 shrink-0" />
                      ) : send.status === 'opened' || send.status === 'clicked' ? (
                        <Eye className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                      ) : send.status === 'bounced' || send.status === 'failed' ? (
                        <X className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      )}
                      <span className="text-white truncate flex-1">{send.email}</span>
                      <Badge
                        className={`text-xs ${
                          send.status === 'opened' || send.status === 'clicked'
                            ? 'bg-blue-500/20 text-blue-400'
                            : send.status === 'bounced' || send.status === 'failed'
                              ? 'bg-red-500/20 text-red-400'
                              : send.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {send.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Confirm Start Dialog */}
        <AlertDialog open={confirmStart} onOpenChange={setConfirmStart}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Send className="h-5 w-5 text-purple-400" />
                </div>
                Start Campaign?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will calculate recipients from your segment filter and start sending emails in
                batches. You can pause at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                onClick={() => prepareMutation.mutate()}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Sending
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Confirm Send Test Dialog */}
        <AlertDialog open={confirmSendTest} onOpenChange={setConfirmSendTest}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Send Test Email?</AlertDialogTitle>
              <AlertDialogDescription>
                This will send a test email to founder@elec-mate.com so you can preview how it
                looks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => sendTestMutation.mutate()}
                disabled={sendTestMutation.isPending}
              >
                {sendTestMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Send Test
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetContent>
    </Sheet>
  );
}
