import type { Mapper, Section } from '../contract.ts';
import { fmtDate, fmtDateTime, refFrom, str, type Row } from '../common.ts';

/**
 * Photo report for a photo project (photo_projects + its safety_photos).
 *
 * The function attaches the photos as `__photos` (already filtered to the
 * category the user picked, in time order) and the options as `__options`.
 * Photos are the content here, not an appendix: grouped by stage (before →
 * progress → … → after), each printed WHOLE (a photo is evidence; the old
 * report cropped nothing but squeezed two to a narrow row), with its
 * annotation pins drawn where the user put them and a numbered key beneath.
 */

const STAGES: [string, string][] = [
  ['before', 'Before'],
  ['job_progress', 'Job progress'],
  ['safety', 'Safety'],
  ['snagging', 'Snagging'],
  ['completion', 'Completion'],
  ['after', 'After'],
  ['general', 'General'],
];
const stageLabel = (v: string) =>
  STAGES.find(([k]) => k === v)?.[1] ?? (v ? v.charAt(0).toUpperCase() + v.slice(1).replace(/_/g, ' ') : 'General');

const pct = (v: unknown) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  // Stored as 0–1 fractions of the image; tolerate 0–100 too.
  const p = n <= 1 ? n * 100 : n;
  return Math.min(100, Math.max(0, Math.round(p * 10) / 10));
};

export const photoProjectMapper: Mapper = (r: Row, ctx) => {
  const photos: Row[] = Array.isArray(r.__photos) ? r.__photos : [];
  const opts: Row = r.__options ?? {};
  const withDetails = opts.includeMetadata !== false;
  const filterLabel = str(opts.category) && opts.category !== 'all' ? stageLabel(str(opts.category)) : '';

  const groups = new Map<string, Row[]>();
  for (const p of photos) {
    const k = str(p.photo_type) || str(p.category) || 'general';
    groups.set(k, [...(groups.get(k) ?? []), p]);
  }
  const order = (k: string) => {
    const i = STAGES.findIndex(([s]) => s === k);
    return i === -1 ? STAGES.length : i;
  };

  // Stages get their own heading only when they are big enough to fill a
  // row; a handful of single photos under separate headings left half of
  // every row empty. Otherwise one grid in stage order, stage named on each.
  const sorted = [...groups.entries()].sort((a, b) => order(a[0]) - order(b[0]));
  const grouped = sorted.length > 1 && sorted.every(([, l]) => l.length >= 2) && photos.length > 6;
  let n = 0;
  const card = (k: string, p: Row, tagStage: boolean) => {
    n += 1;
    const notes = (Array.isArray(p.annotations) ? p.annotations : []).filter(
      (a: Row) => a && pct(a.x) != null && pct(a.y) != null && str(a.text)
    );
    const desc = str(p.description);
    const short = withDetails && desc && desc.length <= 90 ? desc : '';
    const lines = withDetails
      ? [desc.length > 90 ? desc : '', str(p.notes), [str(p.location), fmtDateTime(p.created_at)].filter(Boolean).join(' · ')].filter(Boolean)
      : [];
    return {
      url: ctx.photoUrl(str(p.file_url)),
      title: `${n}. ${[tagStage ? stageLabel(k) : '', short].filter(Boolean).join(' · ') || stageLabel(k)}`,
      lines,
      pins: notes.map((a: Row, i: number) => ({ n: i + 1, x: pct(a.x)!, y: pct(a.y)! })),
      legend: notes.map((a: Row) => str(a.text)),
    };
  };
  const sections: Section[] = grouped
    ? sorted.map(([k, list]) => ({
        heading: `${stageLabel(k)} · ${list.length} photos`,
        kind: 'gallery' as const,
        photos: list.map((p) => card(k, p, false)),
      }))
    : photos.length
      ? [
          {
            heading: `Photographs · ${photos.length}`,
            kind: 'gallery' as const,
            photos: sorted.flatMap(([k, list]) => list.map((p) => card(k, p, sorted.length > 1))),
          },
        ]
      : [];

  if (!photos.length)
    sections.push({ heading: 'Photographs', kind: 'text', paragraphs: ['No photos in this selection.'] });

  if (str(r.description))
    sections.unshift({ heading: 'About this project', kind: 'text', paragraphs: [str(r.description)] });

  const times = photos.map((p) => Date.parse(str(p.created_at))).filter((t) => !Number.isNaN(t));
  const first = times.length ? new Date(Math.min(...times)).toISOString() : '';
  const last = times.length ? new Date(Math.max(...times)).toISOString() : '';
  const span = first && fmtDate(first) !== fmtDate(last) ? `${fmtDate(first)} to ${fmtDate(last)}` : fmtDate(first);
  const annotated = photos.filter((p) => Array.isArray(p.annotations) && p.annotations.length).length;

  return {
    meta: {
      kind: 'Photo report',
      title: str(r.name) || 'Photo report',
      subtitle: filterLabel ? `${filterLabel} photos from this project.` : 'Photographic record of the work on this project.',
      reference: str(r.job_reference) || refFrom('PHO', r.id),
      issued: fmtDate(new Date().toISOString()),
    },
    job: {
      title: ctx.job.title || str(r.name),
      site: str(r.address) || ctx.job.site,
      client: ctx.job.client,
    },
    prepared_by: ctx.preparedBy,
    prepared_by_label: 'Prepared by',
    cover_facts: [
      { label: 'Photos taken', value: span },
      { label: 'Showing', value: filterLabel || 'All photos' },
    ].filter((f) => f.value),
    headline: [
      { label: 'Photos', value: String(photos.length) },
      ...(groups.size > 1 ? [{ label: 'Stages', value: String(groups.size) }] : []),
      ...(annotated ? [{ label: 'Annotated', value: String(annotated) }] : []),
    ],
    sections,
    disclaimer:
      'Photographs as taken and captioned by the person named. Dates are when each photo was added to the project; numbered pins and their notes were added by the user.',
  };
};
