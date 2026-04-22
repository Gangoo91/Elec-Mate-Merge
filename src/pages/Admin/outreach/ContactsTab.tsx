import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Plus,
  Upload,
  Trash2,
  Building2,
  ChevronRight,
  Loader2,
  Check,
  Tag,
  UserMinus,
  X,
  Flame,
  Database,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  callOutreach,
  CONTACT_TYPE_STYLES,
  CONTACT_TYPES,
  SMART_SEGMENTS,
  type OutreachContact,
  type SmartSegment,
} from './shared';

export default function ContactsTab() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState<SmartSegment>(SMART_SEGMENTS[0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'engagement'>('created_at');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showImportCSV, setShowImportCSV] = useState(false);
  const [selectedContact, setSelectedContact] = useState<OutreachContact | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const effectiveFilter = useMemo(() => {
    const f: Record<string, unknown> = {
      search: search || undefined,
      contact_type: segment.filter.contact_type || (typeFilter !== 'all' ? typeFilter : 'all'),
      tag: segment.filter.tag,
      suppressed_only: segment.filter.suppressed_only,
      engaged_only: segment.filter.engaged_only,
      never_opened: segment.filter.never_opened,
      order_by: sortBy,
      limit: 2000,
    };
    return f;
  }, [search, segment, typeFilter, sortBy]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['outreach-contacts', effectiveFilter],
    queryFn: () => callOutreach('get_contacts', effectiveFilter),
    staleTime: 20_000,
  });

  const { data: statData } = useQuery({
    queryKey: ['outreach-contact-stats'],
    queryFn: () => callOutreach('get_contact_stats'),
    staleTime: 30_000,
  });

  const contacts: OutreachContact[] = useMemo(
    () => data?.contacts || [],
    [data]
  );
  const total = data?.total || 0;

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(contacts.map((c) => c.id)));
  }, [contacts]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['outreach-contacts'] });
    queryClient.invalidateQueries({ queryKey: ['outreach-contact-stats'] });
  };

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => callOutreach('delete_contacts', { contactIds: ids }),
    onSuccess: (res) => {
      toast({ title: `${res.deleted} contact${res.deleted === 1 ? '' : 's'} deleted` });
      clearSelection();
      invalidateAll();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const suppressMutation = useMutation({
    mutationFn: (ids: string[]) => callOutreach('bulk_suppress', { contactIds: ids }),
    onSuccess: (res) => {
      toast({ title: `${res.suppressed} contact${res.suppressed === 1 ? '' : 's'} suppressed` });
      clearSelection();
      invalidateAll();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const unsuppressMutation = useMutation({
    mutationFn: (ids: string[]) => callOutreach('bulk_unsuppress', { contactIds: ids }),
    onSuccess: (res) => {
      toast({ title: `${res.unsuppressed} contact${res.unsuppressed === 1 ? '' : 's'} un-suppressed` });
      clearSelection();
      invalidateAll();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const tagMutation = useMutation({
    mutationFn: ({ ids, tags }: { ids: string[]; tags: string[] }) =>
      callOutreach('bulk_tag', { contactIds: ids, addTags: tags }),
    onSuccess: (res) => {
      toast({ title: `Tagged ${res.updated} contact${res.updated === 1 ? '' : 's'}` });
      clearSelection();
      setTagDialogOpen(false);
      setTagInput('');
      invalidateAll();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const platformImportMutation = useMutation({
    mutationFn: () => callOutreach('import_platform_employers'),
    onSuccess: (res) => {
      toast({
        title: `Imported ${res.imported} platform employers`,
        description: res.skipped ? `${res.skipped} skipped (already exist / no email)` : undefined,
      });
      invalidateAll();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const selectedCount = selectedIds.size;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <StatPill label="Total" value={statData?.total || 0} accent="text-white" />
        <StatPill
          label="Active"
          value={(statData?.total || 0) - (statData?.suppressed || 0)}
          accent="text-green-400"
        />
        <StatPill
          label="Engaged"
          value={statData?.engaged || 0}
          accent="text-elec-yellow"
          icon={<Flame className="h-3 w-3 inline mr-0.5" />}
        />
        <StatPill
          label="Suppressed"
          value={statData?.suppressed || 0}
          accent="text-red-400"
        />
      </div>

      {/* Smart segments */}
      <div className="-mx-1 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-1 pb-1">
          {SMART_SEGMENTS.map((s) => {
            const active = s.id === segment.id;
            return (
              <button
                key={s.id}
                onClick={() => setSegment(s)}
                className={`shrink-0 h-10 px-3.5 rounded-full border text-sm font-medium touch-manipulation transition-colors ${
                  active
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-white/[0.03] text-white border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + sort */}
      <div className="flex gap-2">
        <div className="flex-1">
          <AdminSearchInput value={search} onChange={setSearch} placeholder="Search contacts…" />
        </div>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-40 h-12 touch-manipulation rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Newest first</SelectItem>
            <SelectItem value="engagement">Most engaged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          className="h-11 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
          onClick={() => setShowAddContact(true)}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
        <Button
          variant="outline"
          className="h-11 gap-2 border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.08] touch-manipulation rounded-xl"
          onClick={() => setShowImportCSV(true)}
        >
          <Upload className="h-4 w-4" />
          Import CSV
        </Button>
        <Button
          variant="outline"
          className="h-11 gap-2 border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 touch-manipulation rounded-xl"
          onClick={() => platformImportMutation.mutate()}
          disabled={platformImportMutation.isPending}
        >
          {platformImportMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          Platform
        </Button>
      </div>

      {/* Bulk actions bar */}
      {selectedCount > 0 && (
        <Card className="border-elec-yellow/40 bg-elec-yellow/5 sticky top-2 z-10">
          <CardContent className="p-3 flex items-center gap-2">
            <Badge className="bg-elec-yellow text-black font-bold">{selectedCount}</Badge>
            <span className="text-sm text-white">selected</span>
            <div className="ml-auto flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 text-white hover:bg-white/10 touch-manipulation"
                onClick={() => setTagDialogOpen(true)}
              >
                <Tag className="h-4 w-4 mr-1" />
                Tag
              </Button>
              {segment.filter.suppressed_only ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 text-green-300 hover:bg-green-500/10 touch-manipulation"
                  onClick={() => unsuppressMutation.mutate(Array.from(selectedIds))}
                  disabled={unsuppressMutation.isPending}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Restore
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 text-amber-300 hover:bg-amber-500/10 touch-manipulation"
                  onClick={() => suppressMutation.mutate(Array.from(selectedIds))}
                  disabled={suppressMutation.isPending}
                >
                  <UserMinus className="h-4 w-4 mr-1" />
                  Suppress
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="h-9 text-red-300 hover:bg-red-500/10 touch-manipulation"
                onClick={() => {
                  if (confirm(`Delete ${selectedCount} contact${selectedCount === 1 ? '' : 's'}?`)) {
                    deleteMutation.mutate(Array.from(selectedIds));
                  }
                }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 w-9 p-0 text-white hover:bg-white/10 touch-manipulation"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List */}
      {isLoading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <AdminEmptyState
          icon={Users}
          title="No contacts match"
          description="Try a different segment, clear the search, or import more contacts."
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-white">
              Showing {contacts.length} of {total}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-white hover:bg-white/5 touch-manipulation"
              onClick={selectAll}
            >
              Select all
            </Button>
          </div>
          <div className="space-y-2">
            {contacts.map((c) => (
              <ContactRow
                key={c.id}
                contact={c}
                selected={selectedIds.has(c.id)}
                onToggleSelect={() => toggleSelect(c.id)}
                onOpen={() => setSelectedContact(c)}
              />
            ))}
          </div>
        </>
      )}

      {/* Dialogs */}
      <AddContactSheet
        open={showAddContact}
        onOpenChange={setShowAddContact}
        onSuccess={() => {
          refetch();
          invalidateAll();
          setShowAddContact(false);
        }}
      />
      <ImportCSVSheet
        open={showImportCSV}
        onOpenChange={setShowImportCSV}
        onSuccess={() => {
          refetch();
          invalidateAll();
          setShowImportCSV(false);
        }}
      />
      <ContactDetailSheet
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onDelete={(id) => {
          deleteMutation.mutate([id]);
          setSelectedContact(null);
        }}
      />
      <TagDialog
        open={tagDialogOpen}
        onOpenChange={setTagDialogOpen}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onConfirm={() =>
          tagMutation.mutate({
            ids: Array.from(selectedIds),
            tags: tagInput
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
          })
        }
        loading={tagMutation.isPending}
      />
    </div>
  );
}

// ─── Row ────────────────────────────────────────────────────────
function ContactRow({
  contact,
  selected,
  onToggleSelect,
  onOpen,
}: {
  contact: OutreachContact;
  selected: boolean;
  onToggleSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <Card
      className={`border-border/30 transition-colors touch-manipulation ${
        selected ? 'bg-elec-yellow/5 border-elec-yellow/40' : ''
      }`}
    >
      <CardContent className="p-3.5 flex items-center gap-3">
        <button
          aria-label="Select"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
          className={`w-7 h-7 rounded-lg border-2 shrink-0 flex items-center justify-center touch-manipulation transition-colors ${
            selected
              ? 'bg-elec-yellow border-elec-yellow'
              : 'border-white/30 hover:border-white/50'
          }`}
        >
          {selected && <Check className="h-4 w-4 text-black" strokeWidth={3} />}
        </button>
        <button
          className="flex-1 min-w-0 text-left active:scale-[0.99] transition-transform"
          onClick={onOpen}
        >
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white truncate text-sm">
              {contact.name || contact.email}
            </p>
            {contact.is_suppressed && (
              <Badge className="bg-red-500/20 text-red-300 text-[10px] shrink-0">
                Suppressed
              </Badge>
            )}
            {(contact.engagement_score || 0) > 0 && (
              <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px] shrink-0">
                <Flame className="h-2.5 w-2.5 mr-0.5 inline" />
                {contact.engagement_score}
              </Badge>
            )}
          </div>
          <p className="text-xs text-white truncate">{contact.email}</p>
          {contact.organisation && (
            <p className="text-xs text-white flex items-center gap-1 mt-0.5 truncate">
              <Building2 className="h-3 w-3 shrink-0" />
              <span className="truncate">{contact.organisation}</span>
            </p>
          )}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {contact.contact_type && (
              <Badge
                className={`text-[10px] ${
                  CONTACT_TYPE_STYLES[contact.contact_type] || CONTACT_TYPE_STYLES.other
                }`}
              >
                {contact.contact_type.replace('_', ' ')}
              </Badge>
            )}
            {(contact.tags || []).slice(0, 3).map((tag) => (
              <Badge key={tag} className="bg-white/[0.06] text-white text-[10px]">
                {tag}
              </Badge>
            ))}
            {(contact.tags || []).length > 3 && (
              <span className="text-[10px] text-white">
                +{(contact.tags || []).length - 3}
              </span>
            )}
          </div>
        </button>
        <ChevronRight className="h-4 w-4 text-white shrink-0" />
      </CardContent>
    </Card>
  );
}

function StatPill({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: number;
  accent: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-center">
      <p className={`text-xl font-bold ${accent}`}>
        {icon}
        {value.toLocaleString()}
      </p>
      <p className="text-[10px] text-white uppercase tracking-wider font-semibold">{label}</p>
    </div>
  );
}

// ─── Detail sheet ───────────────────────────────────────────────
function ContactDetailSheet({
  contact,
  onClose,
  onDelete,
}: {
  contact: OutreachContact | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Sheet open={!!contact} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[75vh] rounded-t-3xl p-0 border-t border-border/50"
      >
        {contact && (
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-6 pb-4 border-b border-border/50">
              <SheetTitle className="text-white">Contact</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <Field label="Email" value={contact.email} />
              {contact.name && <Field label="Name" value={contact.name} />}
              {contact.organisation && <Field label="Organisation" value={contact.organisation} />}
              {contact.role && <Field label="Role" value={contact.role} />}
              <Field
                label="Type"
                value={contact.contact_type?.replace('_', ' ') || 'Not set'}
              />

              {/* Engagement panel */}
              <div className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-3">
                <p className="text-xs text-elec-yellow uppercase tracking-wider font-semibold mb-2">
                  Engagement
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Stat label="Sends" value={contact.total_sends || 0} />
                  <Stat label="Opens" value={contact.total_opens || 0} />
                  <Stat label="Clicks" value={contact.total_clicks || 0} />
                </div>
              </div>

              {(contact.tags || []).length > 0 && (
                <div>
                  <Label className="text-white text-xs uppercase tracking-wider">Tags</Label>
                  <div className="flex gap-1 flex-wrap mt-1.5">
                    {contact.tags.map((t) => (
                      <Badge key={t} className="bg-white/[0.06] text-white">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Field
                label="Added"
                value={format(new Date(contact.created_at), 'dd MMM yyyy HH:mm')}
              />

              {contact.is_suppressed && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-300 font-semibold text-sm">Suppressed</p>
                  <p className="text-white text-sm mt-1">
                    Reason: {contact.suppression_reason || 'Unknown'}
                  </p>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full h-11 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation rounded-xl mt-2"
                onClick={() => onDelete(contact.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete contact
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label className="text-white text-xs uppercase tracking-wider">{label}</Label>
      <p className="text-white font-medium mt-0.5">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-white uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ─── Add contact ────────────────────────────────────────────────
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
    contact_type: 'college',
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
              ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
              : [],
            source: 'manual_add',
          },
        ],
      }),
    onSuccess: () => {
      toast({ title: 'Contact added' });
      setForm({ email: '', name: '', organisation: '', role: '', contact_type: 'college', tags: '' });
      onSuccess();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
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
              <Plus className="h-5 w-5 text-elec-yellow" />
              Add contact
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <FormRow label="Email *">
              <Input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="contact@company.com"
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <FormRow label="Name">
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="John Smith"
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <FormRow label="Organisation">
              <Input
                value={form.organisation}
                onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
                placeholder="Barnet College"
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <FormRow label="Role">
              <Input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Head of Electrical"
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <FormRow label="Type">
              <Select
                value={form.contact_type}
                onValueChange={(v) => setForm((f) => ({ ...f, contact_type: v }))}
              >
                <SelectTrigger className="h-11 touch-manipulation">
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
            </FormRow>
            <FormRow label="Tags (comma-separated)">
              <Input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="london, niceic"
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <Button
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
              onClick={() => mutation.mutate()}
              disabled={!form.email || mutation.isPending}
            >
              {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Add contact'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Import CSV ─────────────────────────────────────────────────
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
    reader.onload = (ev) => setCsvText(ev.target?.result as string);
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
              <Upload className="h-5 w-5 text-elec-yellow" />
              Import CSV
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-3">
              <p className="text-white text-sm font-medium mb-1">CSV format</p>
              <p className="text-white text-xs font-mono">
                email, name, organisation, role, contact_type, tags
              </p>
            </div>
            <FormRow label="Upload CSV file">
              <Input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="h-11 touch-manipulation"
              />
            </FormRow>
            <FormRow label="Or paste CSV data">
              <Textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                placeholder="email,name,organisation,role,contact_type,tags"
                className="min-h-[160px] font-mono text-sm touch-manipulation"
              />
            </FormRow>

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
                  <p className="text-green-300 font-semibold text-sm">
                    {parsed.length} contacts ready to import
                  </p>
                  <div className="mt-2 max-h-32 overflow-y-auto space-y-1">
                    {parsed.slice(0, 5).map((c, i) => (
                      <p key={i} className="text-xs text-white truncate">
                        {c.email} {c.name ? `— ${c.name}` : ''}{' '}
                        {c.organisation ? `(${c.organisation})` : ''}
                      </p>
                    ))}
                    {parsed.length > 5 && (
                      <p className="text-xs text-white">…and {parsed.length - 5} more</p>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
                  onClick={handleImport}
                  disabled={importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Importing…
                    </>
                  ) : (
                    `Import ${parsed.length} contacts`
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

function TagDialog({
  open,
  onOpenChange,
  tagInput,
  setTagInput,
  onConfirm,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tagInput: string;
  setTagInput: (v: string) => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[60vh] rounded-t-3xl p-0 border-t border-border/50">
        <div className="flex flex-col bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-6 pb-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2 text-white">
              <Tag className="h-5 w-5 text-elec-yellow" />
              Add tags
            </SheetTitle>
          </SheetHeader>
          <div className="p-6 space-y-4">
            <FormRow label="Tags (comma-separated)">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="london, priority, q1-2026"
                className="h-11 touch-manipulation"
                autoFocus
              />
            </FormRow>
            <Button
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
              onClick={onConfirm}
              disabled={!tagInput.trim() || loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Add tags'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-white text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
