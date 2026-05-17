import { useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Camera,
  Plus,
  Pencil,
  FileText,
  Flame,
  Send,
  Sparkles,
} from 'lucide-react';
import { Assistant } from '@/components/business-hub/Assistant';
import { useSparkTasks } from '@/hooks/useSparkTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { useSnags, type Snag, type CreateSnagInput, type SnagPhotoUpload } from '@/hooks/useSnags';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const priorityConfig: Record<string, { label: string; bg: string; text: string }> = {
  urgent: { label: 'Urgent', bg: 'bg-red-500/20', text: 'text-red-400' },
  high: { label: 'High', bg: 'bg-orange-500/20', text: 'text-orange-400' },
  normal: { label: 'Normal', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  low: { label: 'Low', bg: 'bg-white/10', text: 'text-white' },
};

type FilterKey = 'all' | 'open' | 'resolved' | 'critical';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'critical', label: 'Critical' },
];

const priorityPills: { value: CreateSnagInput['priority']; label: string; activeClass: string }[] =
  [
    { value: 'low', label: 'Low', activeClass: 'bg-white/20 text-white border-white/30' },
    {
      value: 'normal',
      label: 'Normal',
      activeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      value: 'high',
      label: 'High',
      activeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    },
    {
      value: 'urgent',
      label: 'Urgent',
      activeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
  ];

const priorityAccent: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-white/20',
};

const SnagRow = ({
  snag,
  onResolve,
  selectMode,
  isSelected,
  onToggleSelect,
}: {
  snag: Snag;
  onResolve: (id: string) => void;
  selectMode: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const dotColour = priorityAccent[snag.priority] || priorityAccent.normal;
  const isDone = snag.status === 'done';
  const dateStr = new Date(snag.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  const isCritical = snag.priority === 'urgent' || snag.priority === 'high';
  const firstPhoto = snag.photos[0];

  return (
    <div className={isDone && !selectMode ? 'opacity-50' : ''}>
      <button
        onClick={() => {
          if (selectMode) {
            onToggleSelect(snag.id);
            return;
          }
          setExpanded(!expanded);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation ${
          isSelected
            ? 'bg-elec-yellow/[0.08] hover:bg-elec-yellow/[0.12]'
            : 'hover:bg-white/[0.04] active:bg-white/[0.07]'
        }`}
      >
        {selectMode && (
          <span
            aria-hidden="true"
            className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-elec-yellow border border-elec-yellow'
                : 'bg-transparent border-2 border-white/25'
            }`}
          >
            {isSelected && <Check className="h-3.5 w-3.5 text-black" strokeWidth={2.6} />}
          </span>
        )}
        {/* Leading: photo thumb if any, else priority dot */}
        {firstPhoto ? (
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/[0.04]">
              <img
                src={firstPhoto.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span
              aria-hidden="true"
              className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${dotColour} ring-2 ring-background`}
            />
          </div>
        ) : (
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full shrink-0 ml-1.5 ${dotColour}`}
          />
        )}

        {/* Body */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-[14px] font-medium leading-snug truncate ${
              isDone ? 'line-through text-white/60' : 'text-white'
            }`}
          >
            {snag.title}
          </p>
          <p className="mt-0.5 text-[11.5px] text-white/50 truncate leading-snug flex items-center gap-2">
            {snag.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {snag.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dateStr}
            </span>
            {isCritical && !isDone && (
              <span className="inline-flex items-center gap-0.5 text-orange-400 font-semibold uppercase tracking-wide text-[10px]">
                <Flame className="h-2.5 w-2.5" />
                {snag.priority}
              </span>
            )}
          </p>
        </div>

        {/* Right meta — photo count + chevron */}
        <div className="flex items-center gap-2 shrink-0">
          {snag.photos.length > 1 && (
            <span className="flex items-center gap-0.5 text-[11px] text-white/40 tabular-nums">
              <Camera className="h-3 w-3" />
              {snag.photos.length}
            </span>
          )}
          {isDone ? (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400/80 px-1.5">
              Resolved
            </span>
          ) : null}
          {!selectMode &&
            (expanded ? (
              <ChevronUp className="h-3.5 w-3.5 text-white/35" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-white/35" />
            ))}
        </div>
      </button>

      {expanded && !selectMode && (
        <div className="px-4 pb-3 pl-12 space-y-3">
          {snag.details && (
            <p className="text-[13px] text-white/70 whitespace-pre-wrap leading-relaxed">
              {snag.details}
            </p>
          )}

          {/* Mate's analysis — surfaced when a photo had a RAG-grounded suggestion */}
          {(() => {
            const aiPhoto = snag.photos.find((p) => p.analysis && (
              (p.analysis.citations && p.analysis.citations.length > 0) ||
              p.analysis.details ||
              p.analysis.grounded
            ));
            if (!aiPhoto?.analysis) return null;
            const a = aiPhoto.analysis;
            const cites = a.citations || [];
            // Don't repeat the snag's own details if Mate's text is identical
            const showDetails = a.details && a.details.trim() !== (snag.details || '').trim();
            return (
              <div className="rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.04] px-3 py-2.5 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-elec-yellow" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow/90">
                    Mate's read
                  </span>
                  {a.grounded && cites.length > 0 && (
                    <span className="ml-auto text-[10px] font-semibold text-emerald-400/80 flex items-center gap-1">
                      <Check className="h-2.5 w-2.5" />
                      BS 7671 grounded
                    </span>
                  )}
                </div>
                {showDetails && (
                  <p className="text-[12.5px] text-white/75 leading-relaxed">{a.details}</p>
                )}
                {cites.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {cites.map((c, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10.5px] font-medium px-1.5 py-0.5 rounded bg-elec-yellow/[0.10] text-elec-yellow/90 ring-1 ring-elec-yellow/20"
                        title={c.topic || undefined}
                      >
                        {c.ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {snag.photos.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
              {snag.photos.slice(0, 12).map((photo) => (
                <a
                  key={photo.id}
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-lg overflow-hidden bg-white/[0.04] touch-manipulation hover:opacity-90 active:opacity-80"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          )}
          {!isDone && (
            <Button
              onClick={() => onResolve(snag.id)}
              className="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-white text-[13px] font-semibold rounded-lg touch-manipulation active:scale-[0.98]"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark resolved
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const SnaggingPage = () => {
  const { snags, projectList, isLoading, counts, createSnag, resolveSnag } = useSnags();
  const navigate = useNavigate();
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set(['__all__']));
  const [filter, setFilter] = useState<FilterKey>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mate AI — used by "Send to client" / "Send selected" actions.
  // (No FAB here; Mate lives on the Business Hub.)
  const {
    tasks: assistantTasks,
    saveTask,
    updateTask,
    markDone,
    deleteTask,
  } = useSparkTasks('all');
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string | undefined>(undefined);

  // Multi-select mode for bulk resolve / send
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  // Send-report sheet — collects recipient + message + fires send-snag-report
  const [sendSheetOpen, setSendSheetOpen] = useState(false);
  const [sendIds, setSendIds] = useState<string[]>([]);
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [sendSubject, setSendSubject] = useState('');
  const [sendBusy, setSendBusy] = useState(false);

  const openSendSheet = (ids: string[]) => {
    setSendIds(ids);
    setSendRecipient('');
    setSendMessage('');
    setSendSubject('');
    setSendSheetOpen(true);
  };

  const handleSendReport = async () => {
    if (sendBusy || sendIds.length === 0) return;
    const recipient = sendRecipient.trim();
    if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      toast({ title: 'Enter a valid recipient email', variant: 'destructive' });
      return;
    }
    setSendBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-snag-report', {
        body: {
          snag_ids: sendIds,
          recipient_email: recipient,
          customSubject: sendSubject.trim() || undefined,
          customMessage: sendMessage.trim() || undefined,
        },
      });
      if (error) throw error;
      if (data?.success === false) throw new Error(data?.error || 'Send failed');
      toast({
        title: `Sent ${sendIds.length} snag${sendIds.length === 1 ? '' : 's'} to ${recipient}`,
        description: 'PDF attached.',
        variant: 'success',
      });
      setSendSheetOpen(false);
      exitSelectMode();
    } catch (err) {
      console.error('[send-snag-report] error', err);
      toast({
        title: 'Failed to send report',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSendBusy(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exitSelectMode = () => {
    setSelectMode(false);
    setSelectedIds(new Set());
  };
  const [formTitle, setFormTitle] = useState('');
  const [formPriority, setFormPriority] = useState<CreateSnagInput['priority']>('normal');
  const [formLocation, setFormLocation] = useState('');
  const [formProjectId, setFormProjectId] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Photo capture state
  const [formPhotos, setFormPhotos] = useState<SnagPhotoUpload[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [aiSuggesting, setAiSuggesting] = useState(false);

  // Convert File → SnagPhotoUpload (base64 + mime).
  // Reads as data URL, strips the prefix to keep raw base64.
  const fileToPhoto = (file: File): Promise<SnagPhotoUpload> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        const result = reader.result as string;
        const commaIdx = result.indexOf(',');
        const base64 = commaIdx >= 0 ? result.slice(commaIdx + 1) : result;
        resolve({ base64, type: file.type || 'image/jpeg' });
      };
      reader.readAsDataURL(file);
    });

  const handlePhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      const converted = await Promise.all(files.map(fileToPhoto));
      setFormPhotos((prev) => [...prev, ...converted].slice(0, 6));
    } catch {
      /* silent */
    }
    // Reset so selecting the same file again still fires onChange
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePhoto = (idx: number) => {
    setFormPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const suggestFromPhoto = async () => {
    if (formPhotos.length === 0 || aiSuggesting) return;
    setAiSuggesting(true);
    try {
      const photo = formPhotos[0];
      const { data, error } = await supabase.functions.invoke('parse-snag-photo', {
        body: { image_base64: photo.base64, image_type: photo.type },
      });
      if (error) throw error;
      if (data?.success) {
        if (data.title && !formTitle.trim()) setFormTitle(data.title);
        if (data.priority) setFormPriority(data.priority);
        if (data.details && !formDetails.trim()) setFormDetails(data.details);
        if (data.location_hint && !formLocation.trim()) setFormLocation(data.location_hint);
        // Persist the full response onto the first photo so it lands on
        // photo_analyses.analysis_result when the snag is saved.
        setFormPhotos((prev) => {
          if (prev.length === 0) return prev;
          const next = [...prev];
          next[0] = { ...next[0], analysis: data };
          return next;
        });
      }
    } catch (err) {
      console.error('AI suggest failed', err);
    } finally {
      setAiSuggesting(false);
    }
  };
  const canonical = `${window.location.origin}/electrician/snagging`;

  const toggleProject = (key: string) => {
    setOpenProjects((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const resetForm = () => {
    setFormTitle('');
    setFormPriority('normal');
    setFormLocation('');
    setFormProjectId('');
    setFormDetails('');
    setFormPhotos([]);
  };

  const handleSubmit = async () => {
    if (!formTitle.trim() || submitting) return;
    setSubmitting(true);
    await createSnag({
      title: formTitle.trim(),
      priority: formPriority,
      details: formDetails.trim() || undefined,
      location: formLocation.trim() || undefined,
      projectId: formProjectId && formProjectId !== '__none__' ? formProjectId : undefined,
      photos: formPhotos.length > 0 ? formPhotos : undefined,
    });
    setSubmitting(false);
    setDrawerOpen(false);
    resetForm();
  };

  // Apply filter to flat snags list, then re-derive filtered project groups
  const filteredSnags = snags.filter((s) => {
    switch (filter) {
      case 'open':
        return s.status !== 'done';
      case 'resolved':
        return s.status === 'done';
      case 'critical':
        return s.status !== 'done' && (s.priority === 'urgent' || s.priority === 'high');
      default:
        return true;
    }
  });

  // Re-group filtered snags by project
  const filteredProjects = (() => {
    const grouped: Record<
      string,
      { projectId: string | null; projectTitle: string; snags: Snag[] }
    > = {};
    for (const snag of filteredSnags) {
      const key = snag.projectId || '__unassigned__';
      if (!grouped[key]) {
        grouped[key] = {
          projectId: snag.projectId || null,
          projectTitle: snag.projectTitle || 'Unassigned',
          snags: [],
        };
      }
      grouped[key].snags.push(snag);
    }
    return Object.values(grouped);
  })();

  const filterCounts: Record<FilterKey, number> = {
    all: snags.length,
    open: counts.open,
    resolved: counts.resolved,
    critical: counts.critical,
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24 min-h-screen">
      <Helmet>
        <title>Snagging | Elec-Mate Business Hub</title>
        <meta name="description" content="Track and resolve snagging items across your projects." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Sticky compact header — matches the rest of the app */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 lg:px-8 py-2 lg:max-w-[1200px] lg:mx-auto">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/electrician/business')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-bold text-white">Snagging</h1>
              {snags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/[0.08] text-white/70">
                  {snags.length}
                </span>
              )}
              {counts.critical > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-red-500/15 text-red-400 ring-1 ring-red-500/20 flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {counts.critical} critical
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDrawerOpen(true)}
              aria-label="New snag"
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slim filter chips */}
      <div className="px-4 lg:px-8 pt-3 lg:max-w-[1200px] lg:mx-auto">
        <div className="flex items-center gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-2.5 h-7 rounded-full text-[12px] font-medium transition-colors touch-manipulation ${
                filter === f.key
                  ? f.key === 'critical'
                    ? 'bg-red-500/[0.15] text-red-300 ring-1 ring-red-500/30'
                    : 'bg-white/[0.10] text-white'
                  : 'text-white/45 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] font-semibold tabular-nums ${
                  filter === f.key ? 'opacity-80' : 'text-white/35'
                }`}
              >
                {filterCounts[f.key]}
              </span>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            {filteredSnags.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (selectMode) exitSelectMode();
                  else setSelectMode(true);
                }}
                className={`inline-flex items-center h-7 px-2.5 rounded-full text-[12px] font-medium touch-manipulation transition-colors ${
                  selectMode
                    ? 'bg-white/[0.10] text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {selectMode ? 'Cancel' : 'Select'}
              </button>
            )}
            {!selectMode && counts.open > 0 && (
              <button
                type="button"
                onClick={() => {
                  const openIds = snags
                    .filter((s) => s.status !== 'done')
                    .map((s) => s.id);
                  openSendSheet(openIds);
                }}
                className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-medium text-elec-yellow hover:text-yellow-300 hover:bg-elec-yellow/[0.08] touch-manipulation"
              >
                <Send className="h-3 w-3" />
                Send report
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 lg:px-8 pt-3 lg:max-w-[1200px] lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">

        {/* Loading */}
        {isLoading && (
          <div className="md:col-span-2 text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredSnags.length === 0 && snags.length === 0 && (
          <div className="md:col-span-2 text-center py-12 space-y-4">
            <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No snags yet</h3>
            <p className="text-sm text-white max-w-xs mx-auto">
              Add snags manually or ask Mate to generate a snagging list from your certificates.
            </p>
            <Button
              onClick={() => setDrawerOpen(true)}
              className="h-11 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl touch-manipulation"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Snag
            </Button>
          </div>
        )}

        {/* Filter empty state (snags exist but filter returns nothing) */}
        {!isLoading && filteredSnags.length === 0 && snags.length > 0 && (
          <div className="md:col-span-2 text-center py-12 space-y-3">
            <Check className="h-10 w-10 text-white mx-auto" />
            <p className="text-sm text-white">No snags match this filter.</p>
          </div>
        )}

        {/* Grouped by project — slim header + hairline snag rows */}
        {filteredProjects.map((group) => {
          const key = group.projectId || '__unassigned__';
          const isOpen = openProjects.has(key) || openProjects.has('__all__');
          const openCount = group.snags.filter((s) => s.status !== 'done').length;
          const resolvedCount = group.snags.length - openCount;
          const progressPct =
            group.snags.length > 0 ? (resolvedCount / group.snags.length) * 100 : 0;
          const allResolved = group.snags.length > 0 && openCount === 0;

          return (
            <div
              key={key}
              className="rounded-xl bg-white/[0.05] border border-white/[0.10] overflow-hidden shadow-sm shadow-black/20"
            >
              <Collapsible open={isOpen} onOpenChange={() => toggleProject(key)}>
                <CollapsibleTrigger asChild>
                  <button className="w-full touch-manipulation hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors text-left">
                    <div className="flex items-center justify-between px-4 pt-3 pb-2">
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-[0.18em] truncate ${
                            allResolved ? 'text-emerald-400/70' : 'text-white/55'
                          }`}
                        >
                          {group.projectTitle}
                        </span>
                        <span className="text-[11px] font-medium text-white/35 tabular-nums shrink-0">
                          {openCount > 0 ? `${openCount} open` : 'all resolved'}
                          {resolvedCount > 0 && openCount > 0 && ` · ${resolvedCount} done`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {group.snags.length > 0 && (
                          <span className="text-[11px] font-semibold text-white/45 tabular-nums">
                            {Math.round(progressPct)}%
                          </span>
                        )}
                        {isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5 text-white/35" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-white/35" />
                        )}
                      </div>
                    </div>
                    {/* Hairline progress under header */}
                    <div className="h-0.5 mx-4 mb-1 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          allResolved ? 'bg-emerald-400/70' : 'bg-elec-yellow/80'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
                    {group.snags.map((snag) => (
                      <SnagRow
                        key={snag.id}
                        snag={snag}
                        onResolve={resolveSnag}
                        selectMode={selectMode}
                        isSelected={selectedIds.has(snag.id)}
                        onToggleSelect={toggleSelect}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        })}
      </div>

      {/* Floating bulk action bar — only when sessions are selected */}
      {selectMode && selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 bg-gradient-to-t from-background via-background/95 to-background/0 pointer-events-none">
          <div className="max-w-[1200px] mx-auto pointer-events-auto">
            <div className="flex items-center gap-2 rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl shadow-black/40 px-3 py-2">
              <div className="flex-1 min-w-0 px-1">
                <p className="text-[13px] font-semibold text-white leading-tight tabular-nums">
                  {selectedIds.size} selected
                </p>
                <p className="text-[11.5px] text-white/50 leading-tight">
                  {(() => {
                    const openSelected = snags.filter(
                      (s) => selectedIds.has(s.id) && s.status !== 'done'
                    ).length;
                    return openSelected === selectedIds.size
                      ? 'all open'
                      : `${openSelected} open · ${selectedIds.size - openSelected} resolved`;
                  })()}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => openSendSheet(Array.from(selectedIds))}
                className="h-10 px-3 text-[13px] text-white/80 hover:text-white hover:bg-white/[0.06] touch-manipulation"
              >
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Send
              </Button>
              <Button
                onClick={async () => {
                  if (bulkBusy) return;
                  const openSelected = snags.filter(
                    (s) => selectedIds.has(s.id) && s.status !== 'done'
                  );
                  if (openSelected.length === 0) return;
                  setBulkBusy(true);
                  try {
                    for (const s of openSelected) {
                      try {
                        await resolveSnag(s.id);
                      } catch {
                        /* non-blocking */
                      }
                    }
                  } finally {
                    setBulkBusy(false);
                    exitSelectMode();
                  }
                }}
                disabled={
                  bulkBusy ||
                  snags.filter((s) => selectedIds.has(s.id) && s.status !== 'done').length === 0
                }
                className="h-10 px-4 text-[13.5px] font-semibold bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {bulkBusy ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                    Resolving…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1.5" />
                    Resolve all
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Send-report sheet — generates PDF + emails it */}
      <Drawer
        open={sendSheetOpen}
        onOpenChange={(o) => {
          if (!sendBusy) setSendSheetOpen(o);
        }}
        shouldScaleBackground={false}
        noBodyStyles
      >
        <DrawerContent className="max-h-[82vh] flex flex-col">
          <DrawerHeader className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-white/[0.06]">
            <DrawerTitle className="text-white text-[17px] font-semibold tracking-tight">
              Send snagging report
            </DrawerTitle>
            <p className="text-[12.5px] text-white/55 mt-1">
              {sendIds.length} snag{sendIds.length === 1 ? '' : 's'} · PDF with photos +
              BS 7671 refs will be attached
            </p>
          </DrawerHeader>

          <div className="px-4 pt-4 pb-4 space-y-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Recipient email
              </label>
              <Input
                type="email"
                value={sendRecipient}
                onChange={(e) => setSendRecipient(e.target.value)}
                placeholder="client@example.com"
                autoCapitalize="none"
                autoComplete="email"
                className="h-11 text-[15px] touch-manipulation border-white/[0.10] bg-white/[0.04] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Subject{' '}
                <span className="text-white/30 normal-case tracking-normal">(optional)</span>
              </label>
              <Input
                value={sendSubject}
                onChange={(e) => setSendSubject(e.target.value)}
                placeholder={`Snagging report — ${sendIds.length} item${sendIds.length === 1 ? '' : 's'}`}
                className="h-11 text-[15px] touch-manipulation border-white/[0.10] bg-white/[0.04] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Message{' '}
                <span className="text-white/30 normal-case tracking-normal">(optional)</span>
              </label>
              <Textarea
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                placeholder="Add a short personal note — leave blank for a friendly default."
                rows={4}
                className="touch-manipulation text-[15px] min-h-[100px] bg-white/[0.04] border-white/[0.10] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white resize-none"
              />
            </div>
          </div>

          <DrawerFooter className="px-4 py-3 flex-shrink-0 border-t border-white/[0.06]">
            <Button
              onClick={handleSendReport}
              disabled={sendBusy || !sendRecipient.trim() || sendIds.length === 0}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-[14px] rounded-xl touch-manipulation disabled:opacity-40 active:scale-[0.98] transition-all"
            >
              {sendBusy ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Generating &amp; sending…
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Send className="h-4 w-4" strokeWidth={2.4} />
                  Send report
                </span>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Mate assistant (no FAB on this page — entry lives in the Business Hub) */}
      <Assistant
        isOpen={aiOpen}
        onClose={() => {
          setAiOpen(false);
          setAiPrompt(undefined);
        }}
        initialPrompt={aiPrompt}
        currentTasks={assistantTasks}
        onSave={saveTask}
        onUpdate={(id, input) => updateTask(id, input)}
        onMarkDone={markDone}
        onDelete={deleteTask}
      />

      {/* Add Snag Drawer — shouldScaleBackground+noBodyStyles prevents vaul scroll-jump on iOS */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        shouldScaleBackground={false}
        noBodyStyles
      >
        <DrawerContent className="max-h-[82vh] flex flex-col">
          <DrawerHeader className="px-4 pt-4 pb-3 flex-shrink-0 border-b border-white/[0.06]">
            <DrawerTitle className="text-white text-[17px] font-semibold tracking-tight">
              New snag
            </DrawerTitle>
          </DrawerHeader>

          {/* Scrollable form body */}
          <div className="px-4 pt-4 pb-4 space-y-4 overflow-y-auto flex-1">
            {/* Hidden file input — driven by the photo + AI buttons */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoSelected}
              className="hidden"
            />

            {/* Photo strip — thumbnails when present, capture buttons always */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Evidence
                  {formPhotos.length > 0 && (
                    <span className="ml-2 text-white/30 normal-case tracking-normal">
                      ({formPhotos.length}/6)
                    </span>
                  )}
                </label>
                {formPhotos.length > 0 && (
                  <button
                    type="button"
                    onClick={suggestFromPhoto}
                    disabled={aiSuggesting}
                    className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-medium text-elec-yellow hover:text-yellow-300 hover:bg-elec-yellow/[0.08] disabled:opacity-50 touch-manipulation"
                  >
                    {aiSuggesting ? (
                      <>
                        <div className="w-3 h-3 border-2 border-elec-yellow/30 border-t-elec-yellow rounded-full animate-spin" />
                        Thinking…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3" />
                        {formPhotos[0]?.analysis ? 'Re-suggest' : 'Suggest from photo'}
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Grounded indicator — shows BS 7671 citations the AI used */}
              {(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const analysis = formPhotos[0]?.analysis as any;
                if (!analysis) return null;
                const citations: Array<{ ref: string; topic?: string }> = Array.isArray(
                  analysis.citations
                )
                  ? analysis.citations
                  : [];
                if (analysis.grounded && citations.length > 0) {
                  return (
                    <p className="text-[11px] text-emerald-400/80 flex items-center gap-1.5">
                      <Check className="h-3 w-3" />
                      Grounded · {citations.map((c) => c.ref).join(', ')}
                    </p>
                  );
                }
                return (
                  <p className="text-[11px] text-white/40">
                    Vision-only — no matching reg in BS 7671 facets.
                  </p>
                );
              })()}

              {formPhotos.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {formPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-lg overflow-hidden bg-white/[0.04] group"
                    >
                      <img
                        src={`data:${photo.type};base64,${photo.base64}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        aria-label="Remove photo"
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 touch-manipulation"
                      >
                        <Plus className="h-3 w-3 rotate-45" />
                      </button>
                    </div>
                  ))}
                  {formPhotos.length < 6 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-lg border border-dashed border-white/15 hover:border-white/30 hover:bg-white/[0.03] flex items-center justify-center touch-manipulation transition-colors"
                    >
                      <Camera className="h-5 w-5 text-white/45" />
                    </button>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-white/15 hover:border-white/30 hover:bg-white/[0.03] text-[13px] text-white/55 hover:text-white touch-manipulation transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  Add a photo — Mate will draft the snag for you
                </button>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                What's the snag?
              </label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Damaged socket faceplate in lounge"
                autoCapitalize="sentences"
                className="h-11 text-[15px] touch-manipulation border-white/[0.10] bg-white/[0.04] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white"
              />
            </div>

            {/* Priority — proper segmented control with priority dots */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {priorityPills.map((p) => {
                  const isActive = formPriority === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setFormPriority(p.value)}
                      className={`h-10 rounded-lg text-[12.5px] font-semibold touch-manipulation transition-colors flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-white/[0.10] text-white ring-1 ring-white/20'
                          : 'bg-white/[0.04] text-white/55 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 rounded-full ${
                          priorityAccent[p.value] || priorityAccent.normal
                        }`}
                      />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Location
              </label>
              <Input
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Kitchen, 1st floor"
                autoCapitalize="sentences"
                className="h-11 text-[15px] touch-manipulation border-white/[0.10] bg-white/[0.04] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white"
              />
            </div>

            {/* Project */}
            {projectList.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                  Project
                </label>
                <Select value={formProjectId} onValueChange={setFormProjectId}>
                  <SelectTrigger className="h-11 text-[15px] touch-manipulation bg-white/[0.04] border-white/[0.10] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl text-white">
                    <SelectValue placeholder="None — unassigned" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 border-white/10">
                    <SelectItem value="__none__">None — unassigned</SelectItem>
                    {projectList.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Details */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 block">
                Details <span className="text-white/30 normal-case tracking-normal">(optional)</span>
              </label>
              <Textarea
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                placeholder="Any extra notes — what's wrong, what to do, parts needed…"
                autoCapitalize="sentences"
                rows={3}
                className="touch-manipulation text-[15px] min-h-[88px] bg-white/[0.04] border-white/[0.10] focus:border-elec-yellow focus:ring-elec-yellow rounded-xl placeholder:text-white/35 text-white resize-none"
              />
            </div>
          </div>

          <DrawerFooter className="px-4 py-3 flex-shrink-0 border-t border-white/[0.06]">
            <Button
              onClick={handleSubmit}
              disabled={!formTitle.trim() || submitting}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-[14px] rounded-xl touch-manipulation disabled:opacity-40 active:scale-[0.98] transition-all"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Adding...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Plus className="h-4 w-4" strokeWidth={2.4} />
                  Add snag
                </span>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SnaggingPage;
