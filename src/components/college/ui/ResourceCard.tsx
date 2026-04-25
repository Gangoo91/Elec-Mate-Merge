import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { CollegeResource, ResourceKind } from '@/hooks/useCollegeResources';

/**
 * Grid card for a single college resource (file or link).
 * Editorial monochrome, yellow accents, no icons.
 */

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

const KIND_TONE: Record<ResourceKind, string> = {
  document: 'text-blue-300 border-blue-500/25 bg-blue-500/[0.06]',
  slide: 'text-purple-300 border-purple-500/25 bg-purple-500/[0.06]',
  sheet: 'text-emerald-300 border-emerald-500/25 bg-emerald-500/[0.06]',
  image: 'text-amber-300 border-amber-500/25 bg-amber-500/[0.06]',
  video: 'text-cyan-300 border-cyan-500/25 bg-cyan-500/[0.06]',
  audio: 'text-indigo-300 border-indigo-500/25 bg-indigo-500/[0.06]',
  link: 'text-elec-yellow border-elec-yellow/25 bg-elec-yellow/[0.06]',
  other: 'text-white border-white/[0.1] bg-white/[0.04]',
};

function prettyBytes(n: number | null): string {
  if (n === null || n === undefined) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v < 10 && i > 0 ? v.toFixed(1) : Math.round(v)} ${units[i]}`;
}

function prettyDuration(sec: number | null): string {
  if (!sec) return '';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function ResourceCard({
  resource,
  onOpen,
  onDelete,
}: {
  resource: CollegeResource;
  onOpen: () => void | Promise<void>;
  onDelete?: () => void;
}) {
  const kindTone = KIND_TONE[resource.kind];
  const kindLabel = KIND_LABEL[resource.kind];

  const sourceLabel =
    resource.kind === 'link'
      ? hostFromUrl(resource.external_url)
      : `${prettyBytes(resource.size_bytes)}${
          resource.duration_seconds
            ? ` · ${prettyDuration(resource.duration_seconds)}`
            : ''
        }`;

  const acCount = resource.ac_count ?? 0;
  const tagging = Boolean(resource.ai_tagging);

  return (
    <div className="group relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.14] transition-colors flex flex-col">
      {/* Preview block */}
      <button
        type="button"
        onClick={onOpen}
        className="relative aspect-[16/6] sm:aspect-[16/10] bg-[hsl(0_0%_10%)] border-b border-white/[0.06] flex items-center justify-center overflow-hidden touch-manipulation"
      >
        <ResourcePreview resource={resource} />
        <span
          className={cn(
            'absolute top-2 left-2 text-[10px] font-medium uppercase tracking-[0.14em] rounded-full border px-2 py-0.5',
            kindTone
          )}
        >
          {kindLabel}
        </span>

        {/* AC count badge + AI tagging indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          {tagging && (
            <span
              className="inline-flex items-center gap-1 text-[9.5px] font-medium uppercase tracking-[0.14em] text-elec-yellow bg-elec-yellow/[0.1] border border-elec-yellow/30 rounded-full px-2 py-0.5"
              title="AI is tagging this resource with curriculum ACs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow animate-pulse" />
              AI
            </span>
          )}
          {acCount > 0 && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono tabular-nums text-elec-yellow bg-elec-yellow/[0.1] border border-elec-yellow/30 rounded-full px-2 py-0.5"
              title={`Linked to ${acCount} assessment criter${acCount === 1 ? 'ion' : 'ia'}`}
            >
              {acCount} AC{acCount === 1 ? '' : 's'}
            </span>
          )}
        </div>
      </button>

      {/* Body */}
      <div className="flex-1 px-4 py-3 min-w-0 flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={onOpen}
          className="flex-1 min-w-0 text-left touch-manipulation"
        >
          <div className="text-[13.5px] font-medium text-white truncate">
            {resource.title}
          </div>
          <div className="mt-0.5 text-[11px] text-white truncate tabular-nums">
            {sourceLabel}
            {resource.uploader_name && (
              <>
                <span className="mx-1.5 text-white/25">·</span>
                {resource.uploader_name}
              </>
            )}
          </div>
          {resource.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-white bg-white/[0.04] border border-white/[0.06] rounded px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
              {resource.tags.length > 3 && (
                <span className="text-[10px] text-white">
                  +{resource.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </button>

        {/* Overflow menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
              aria-label="More actions"
            >
              <span className="text-[14px] font-semibold tracking-[0.12em]">⋯</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[hsl(0_0%_11%)] border border-white/[0.08] text-white min-w-[170px]"
          >
            <DropdownMenuItem
              onClick={() => onOpen()}
              className="text-[13px]"
            >
              {resource.kind === 'link' ? 'Open link' : 'Preview / download'}
            </DropdownMenuItem>
            {onDelete && (
              <>
                <DropdownMenuSeparator className="bg-white/[0.06]" />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-[13px] text-red-300 focus:text-red-200"
                >
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function ResourcePreview({ resource }: { resource: CollegeResource }) {
  // Simple editorial placeholder per kind — proper thumbnails land in a
  // follow-up slice (pdf.js first-page render, video first-frame grab, etc).
  const label = KIND_LABEL[resource.kind];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
      <div className="text-center">
        <div className="text-[32px] font-semibold tabular-nums tracking-tight text-white/25">
          {label}
        </div>
        {resource.mime_type && resource.kind !== 'link' && (
          <div className="mt-1 text-[10px] font-mono text-white/35">
            {resource.mime_type}
          </div>
        )}
        {resource.kind === 'link' && resource.external_url && (
          <div className="mt-1 text-[10px] font-mono text-elec-yellow/70 truncate max-w-[80%] mx-auto">
            {hostFromUrl(resource.external_url)}
          </div>
        )}
      </div>
    </div>
  );
}

function hostFromUrl(url: string | null): string {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.slice(0, 30);
  }
}
