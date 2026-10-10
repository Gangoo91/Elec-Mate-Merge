import { LC_FRAME } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  useMyTutorResources,
  resolveResourceUrl,
  recordResourceOpen,
  type MyResource,
  type ResourceKind,
} from '@/hooks/useMyTutorResources';
import { useToast } from '@/hooks/use-toast';
import { fmtRel } from '@/lib/format';

/* ==========================================================================
   MyTutorResourcesCard — apprentice-side digest of materials shared by the
   tutor team. Lists 4 most recent by default (expandable), each tappable
   to open the file in a new tab. AC count chip surfaces the auto-tag from
   the tutor side so the apprentice sees relevance.
   ========================================================================== */

const KIND_LABEL: Record<ResourceKind, string> = {
  document: 'Doc',
  slide: 'Slides',
  sheet: 'Sheet',
  image: 'Image',
  video: 'Video',
  audio: 'Audio',
  link: 'Link',
  other: 'File',
};

export function MyTutorResourcesCard() {
  const { resources, loading, hasCollegeLink } = useMyTutorResources();
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);
  // Resources opened this session — local only; the durable record is the
  // college_resource_views row written in handleOpen.
  const [openedIds, setOpenedIds] = useState<Set<string>>(() => new Set());

  if (loading) return <Skeleton />;

  if (!hasCollegeLink) return null;

  const visible = expanded ? resources.slice(0, 20) : resources.slice(0, 4);

  const handleOpen = async (r: MyResource) => {
    if (opening) return;
    setOpening(r.id);
    try {
      const url = await resolveResourceUrl(r);
      if (!url) {
        toast({
          title: 'Could not open this file',
          description: 'Ask your tutor to re-share it.',
          variant: 'destructive',
        });
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      setOpenedIds((prev) => {
        const next = new Set(prev);
        next.add(r.id);
        return next;
      });
      void recordResourceOpen(r.id, r.college_id);
    } finally {
      setOpening(null);
    }
  };

  return (
    <section className={LC_FRAME}>
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[15px] font-semibold tracking-tight text-white">
            Resources from your tutor
          </div>
          {resources.length > 0 && (
            <span className="text-[12px] tabular-nums text-white">
              {resources.length} {resources.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {resources.length === 0 ? (
          <p className="mt-3 text-[12.5px] text-white leading-snug">
            Your tutor hasn't shared any materials yet. When they do (handouts, slides, videos)
            they'll show up here.
          </p>
        ) : (
          <>
            <ul className="mt-3 -mx-1 divide-y divide-white/[0.05]">
              {visible.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => handleOpen(r)}
                    disabled={opening === r.id}
                    className={cn(
                      'w-full px-1 py-2.5 flex items-baseline justify-between gap-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation',
                      opening === r.id && 'opacity-60'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-[13px] text-white tabular-nums">
                          {KIND_LABEL[r.kind] ?? 'File'}
                        </span>
                        {r.ac_count > 0 && (
                          <span className="inline-flex h-4 px-1.5 items-center rounded-md border border-white/[0.10] text-[9.5px] font-medium text-white tabular-nums">
                            {r.ac_count} ACs
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[13px] font-medium text-white leading-snug truncate">
                        {r.title}
                      </div>
                      {r.description && (
                        <div className="mt-0.5 text-[12px] text-white leading-snug line-clamp-1">
                          {r.description}
                        </div>
                      )}
                      {r.uploader_name && (
                        <div className="mt-0.5 text-[12px] text-white">
                          {r.uploader_name} · {fmtRel(r.created_at)}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-[12px] font-medium text-white group-hover:text-white">
                      {opening === r.id ? '…' : openedIds.has(r.id) ? '✓ Opened' : 'Open'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {resources.length > 4 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 px-1 text-[12px] font-medium text-white hover:text-white transition-colors touch-manipulation"
              >
                {expanded ? 'Show less' : `Show ${Math.min(16, resources.length - 4)} more`}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <section className={LC_FRAME}>
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        <div className="h-3 w-44 rounded-full bg-white/[0.05]" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2.5 w-16 rounded-full bg-white/[0.05]" />
            <div className="h-3.5 w-3/4 rounded-md bg-white/[0.05]" />
          </div>
        ))}
      </div>
    </section>
  );
}
