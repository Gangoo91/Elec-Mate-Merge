import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  useMyTutorResources,
  resolveResourceUrl,
  type MyResource,
  type ResourceKind,
} from '@/hooks/useMyTutorResources';
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
  const [expanded, setExpanded] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);

  if (loading) return <Skeleton />;

  if (!hasCollegeLink) return null;

  const visible = expanded ? resources.slice(0, 20) : resources.slice(0, 4);

  const handleOpen = async (r: MyResource) => {
    if (opening) return;
    setOpening(r.id);
    try {
      const url = await resolveResourceUrl(r);
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } finally {
      setOpening(null);
    }
  };

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            Resources from your tutor
          </div>
          {resources.length > 0 && (
            <span className="text-[10.5px] tabular-nums text-white/85">
              {resources.length} {resources.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {resources.length === 0 ? (
          <p className="mt-3 text-[12.5px] text-white/85 leading-snug">
            Your tutor hasn't shared any materials yet. When they do — handouts, slides, videos —
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
                        <span className="text-[10px] uppercase tracking-[0.14em] text-purple-300/85 tabular-nums">
                          {KIND_LABEL[r.kind] ?? 'File'}
                        </span>
                        {r.ac_count > 0 && (
                          <span className="inline-flex h-4 px-1.5 items-center rounded-md border border-white/[0.10] text-[9.5px] font-medium text-white/95 tabular-nums">
                            {r.ac_count} ACs
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[13px] font-medium text-white leading-snug truncate">
                        {r.title}
                      </div>
                      {r.description && (
                        <div className="mt-0.5 text-[11.5px] text-white/85 leading-snug line-clamp-1">
                          {r.description}
                        </div>
                      )}
                      {r.uploader_name && (
                        <div className="mt-0.5 text-[10.5px] text-white/80">
                          {r.uploader_name} · {fmtRel(r.created_at)}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 text-[11.5px] font-medium text-white/85 group-hover:text-white">
                      {opening === r.id ? '…' : 'Open'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {resources.length > 4 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-2 px-1 text-[11.5px] font-medium text-purple-300 hover:text-purple-200 transition-colors touch-manipulation"
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
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
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
