import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Camera,
} from 'lucide-react';
import BusinessPageLayout from '@/components/business-hub/BusinessPageLayout';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSnags, type Snag } from '@/hooks/useSnags';

const priorityConfig: Record<string, { label: string; bg: string; text: string }> = {
  urgent: { label: 'Urgent', bg: 'bg-red-500/20', text: 'text-red-400' },
  high: { label: 'High', bg: 'bg-orange-500/20', text: 'text-orange-400' },
  normal: { label: 'Normal', bg: 'bg-blue-500/20', text: 'text-blue-400' },
  low: { label: 'Low', bg: 'bg-white/10', text: 'text-white' },
};

const SnagCard = ({ snag, onResolve }: { snag: Snag; onResolve: (id: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const config = priorityConfig[snag.priority] || priorityConfig.normal;
  const isDone = snag.status === 'done';

  return (
    <div
      className={`rounded-xl border p-3 space-y-2 ${
        isDone ? 'border-white/5 opacity-60' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
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
          </div>
          <h3
            className={`text-sm font-medium mt-1 ${isDone ? 'line-through text-white' : 'text-white'}`}
          >
            {snag.title}
          </h3>
          {snag.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-white" />
              <span className="text-xs text-white">{snag.location}</span>
            </div>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-white flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white flex-shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="space-y-2 pt-1">
          {snag.details && <p className="text-sm text-white whitespace-pre-wrap">{snag.details}</p>}
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-white" />
            <span className="text-xs text-white">
              {new Date(snag.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          {snag.photos.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Camera className="h-3 w-3 text-white" />
                <span className="text-xs font-medium text-white">
                  {snag.photos.length} photo{snag.photos.length !== 1 ? 's' : ''}
                </span>
              </div>
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
            </div>
          )}
          {!isDone && (
            <Button
              onClick={() => onResolve(snag.id)}
              className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl touch-manipulation"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark as Resolved
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const SnaggingPage = () => {
  const { projects, isLoading, counts, resolveSnag } = useSnags();
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set(['__all__']));
  const canonical = `${window.location.origin}/electrician/snagging`;

  const toggleProject = (key: string) => {
    setOpenProjects((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <BusinessPageLayout
      title="Snagging"
      subtitle="Track & resolve snags"
      icon={AlertTriangle}
      backUrl="/electrician/business"
      accentColor="orange"
    >
      <Helmet>
        <title>Snagging | Elec-Mate Business Hub</title>
        <meta name="description" content="Track and resolve snagging items across your projects." />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
            <div className="text-2xl font-bold text-white">{counts.open}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide">Open</div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{counts.resolved}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide">
              Resolved
            </div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center">
            <div className="text-2xl font-bold text-red-400">{counts.critical}</div>
            <div className="text-[11px] font-medium text-white uppercase tracking-wide">
              Critical
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-12 space-y-3">
            <AlertTriangle className="h-12 w-12 text-white mx-auto" />
            <h3 className="text-lg font-semibold text-white">No snags yet</h3>
            <p className="text-sm text-white">
              Ask your AI assistant to create a snagging list or use the generate_snagging_list
              tool.
            </p>
          </div>
        )}

        {/* Grouped by project */}
        {projects.map((group) => {
          const key = group.projectId || '__unassigned__';
          const isOpen = openProjects.has(key) || openProjects.has('__all__');
          const openCount = group.snags.filter((s) => s.status === 'open').length;

          return (
            <Collapsible key={key} open={isOpen} onOpenChange={() => toggleProject(key)}>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 touch-manipulation h-14 active:bg-white/[0.06] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white truncate">
                      {group.projectTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium text-white">
                      {openCount} open / {group.snags.length} total
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
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
    </BusinessPageLayout>
  );
};

export default SnaggingPage;
