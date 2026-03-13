import { useState } from 'react';
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
} from 'lucide-react';
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
import { useSnags, type Snag, type CreateSnagInput } from '@/hooks/useSnags';

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
    { value: 'normal', label: 'Normal', activeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 'high', label: 'High', activeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { value: 'urgent', label: 'Urgent', activeClass: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ];

const priorityAccent: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  normal: 'bg-blue-500',
  low: 'bg-white/20',
};

const SnagCard = ({ snag, onResolve }: { snag: Snag; onResolve: (id: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const config = priorityConfig[snag.priority] || priorityConfig.normal;
  const accent = priorityAccent[snag.priority] || priorityAccent.normal;
  const isDone = snag.status === 'done';
  const dateStr = new Date(snag.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div
      className={`rounded-xl border overflow-hidden flex ${
        isDone ? 'border-white/5 opacity-50' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {/* Priority accent strip */}
      <div className={`w-1 flex-shrink-0 ${accent}`} />

      <div className="flex-1 p-3 space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left flex items-start gap-3 touch-manipulation"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${config.bg} ${config.text}`}
              >
                {config.label}
              </span>
              {isDone && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-500/20 text-green-400">
                  Resolved
                </span>
              )}
              {snag.photos.length > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-white">
                  <Camera className="h-2.5 w-2.5" />
                  {snag.photos.length}
                </span>
              )}
            </div>
            <h3
              className={`text-sm font-semibold mt-1.5 ${isDone ? 'line-through text-white' : 'text-white'}`}
            >
              {snag.title}
            </h3>
            {/* Always-visible meta row */}
            <div className="flex items-center gap-3 mt-1">
              {snag.location && (
                <span className="flex items-center gap-1 text-[11px] text-white">
                  <MapPin className="h-3 w-3" />
                  {snag.location}
                </span>
              )}
              <span className="flex items-center gap-1 text-[11px] text-white">
                <Calendar className="h-3 w-3" />
                {dateStr}
              </span>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-white flex-shrink-0 mt-1" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white flex-shrink-0 mt-1" />
          )}
        </button>

        {expanded && (
          <div className="space-y-3 pt-1">
            {snag.details && (
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                {snag.details}
              </p>
            )}
            {snag.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5">
                {snag.photos.slice(0, 6).map((photo) => (
                  <a
                    key={photo.id}
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden bg-white/[0.04] touch-manipulation active:opacity-80"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Snag photo'}
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
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl touch-manipulation"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SnaggingPage = () => {
  const { snags, projectList, isLoading, counts, createSnag, resolveSnag } = useSnags();
  const navigate = useNavigate();
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set(['__all__']));
  const [filter, setFilter] = useState<FilterKey>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formPriority, setFormPriority] = useState<CreateSnagInput['priority']>('normal');
  const [formLocation, setFormLocation] = useState('');
  const [formProjectId, setFormProjectId] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
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
    const grouped: Record<string, { projectId: string | null; projectTitle: string; snags: Snag[] }> = {};
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

      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/electrician/business')}
              className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.06] touch-manipulation active:bg-white/[0.1] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <h1 className="text-lg font-bold text-white">Snagging</h1>
              {snags.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-white">
                  {snags.length}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-orange-500 touch-manipulation active:bg-orange-600 transition-colors"
          >
            <Plus className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Filter pills */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 px-3 h-11 rounded-full text-xs font-semibold touch-manipulation transition-colors flex items-center gap-1.5 ${
                filter === f.key
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'bg-white/[0.06] text-white border border-transparent active:bg-white/[0.1]'
              }`}
            >
              {f.label}
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  filter === f.key ? 'bg-orange-500/30 text-orange-300' : 'bg-white/[0.08] text-white'
                }`}
              >
                {filterCounts[f.key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/[0.03] border border-orange-500/20 p-3 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500" />
            <div className="text-2xl font-bold text-orange-400">{counts.open}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide mt-0.5">Open</div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-green-500/20 p-3 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-green-500" />
            <div className="text-2xl font-bold text-green-400">{counts.resolved}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide mt-0.5">
              Resolved
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-red-500/20 p-3 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500" />
            <div className="text-2xl font-bold text-red-400">{counts.critical}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide mt-0.5">
              Critical
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-orange-400 border-t-transparent rounded-full mx-auto" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredSnags.length === 0 && snags.length === 0 && (
          <div className="text-center py-12 space-y-4">
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
          <div className="text-center py-12 space-y-3">
            <Check className="h-10 w-10 text-white mx-auto" />
            <p className="text-sm text-white">No snags match this filter.</p>
          </div>
        )}

        {/* Grouped by project */}
        {filteredProjects.map((group) => {
          const key = group.projectId || '__unassigned__';
          const isOpen = openProjects.has(key) || openProjects.has('__all__');
          const openCount = group.snags.filter((s) => s.status !== 'done').length;
          const resolvedCount = group.snags.length - openCount;
          const progressPct = group.snags.length > 0 ? (resolvedCount / group.snags.length) * 100 : 0;

          return (
            <Collapsible key={key} open={isOpen} onOpenChange={() => toggleProject(key)}>
              <CollapsibleTrigger asChild>
                <button className="w-full rounded-xl bg-white/[0.03] border border-white/10 touch-manipulation active:bg-white/[0.06] transition-colors overflow-hidden">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-4 w-4 text-orange-400" />
                      </div>
                      <div className="min-w-0 text-left">
                        <span className="text-sm font-semibold text-white truncate block">
                          {group.projectTitle}
                        </span>
                        <span className="text-[11px] text-white">
                          {openCount} open · {resolvedCount} resolved
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {group.snags.length > 0 && (
                        <span className="text-[11px] font-bold text-white">
                          {Math.round(progressPct)}%
                        </span>
                      )}
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-white" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 bg-white/[0.06]">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                {group.snags.map((snag) => (
                  <SnagCard key={snag.id} snag={snag} onResolve={resolveSnag} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {/* Add Snag Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="text-white text-lg">Add Snag</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 space-y-4 overflow-y-auto flex-1">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white uppercase tracking-wide">
                What's the snag? *
              </label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Damaged socket faceplate in lounge"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white uppercase tracking-wide">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {priorityPills.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setFormPriority(p.value)}
                    className={`h-11 rounded-xl text-xs font-semibold border touch-manipulation transition-colors ${
                      formPriority === p.value
                        ? p.activeClass
                        : 'bg-white/[0.04] text-white border-white/10 active:bg-white/[0.08]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white uppercase tracking-wide">
                Location
              </label>
              <Input
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Kitchen, 1st floor"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Project */}
            {projectList.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white uppercase tracking-wide">
                  Project
                </label>
                <Select value={formProjectId} onValueChange={setFormProjectId}>
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="None (unassigned)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">None (unassigned)</SelectItem>
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
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white uppercase tracking-wide">
                Details
              </label>
              <Textarea
                value={formDetails}
                onChange={(e) => setFormDetails(e.target.value)}
                placeholder="Any extra details..."
                rows={3}
                className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-orange-500/20 border-white/30 focus:border-orange-500"
              />
            </div>
          </div>

          <DrawerFooter>
            <Button
              onClick={handleSubmit}
              disabled={!formTitle.trim() || submitting}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl touch-manipulation disabled:opacity-40"
            >
              {submitting ? 'Adding...' : 'Add Snag'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SnaggingPage;
