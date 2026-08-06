import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SITE_NOTE_CATEGORY_LABELS,
  SiteNote,
  useCustomerPhotoProjects,
  useSiteNotes,
} from '@/hooks/useSiteNotes';
import { useCustomerProperties } from '@/hooks/inspection/useCustomerProperties';
import { SiteNoteSheet } from './SiteNoteSheet';
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

interface CustomerSiteNotesTabProps {
  customerId: string;
}

/** "3 days ago" beats a date for a running log — recency is what matters. */
const relativeDate = (iso: string) => {
  const then = new Date(iso).getTime();
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const CustomerSiteNotesTab = ({ customerId }: CustomerSiteNotesTabProps) => {
  const {
    notes,
    hasMore,
    pageSize,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
    detachPhoto,
    refetch,
  } = useSiteNotes(customerId);
  const { properties, isLoading: propertiesLoading } = useCustomerProperties(customerId);
  const { projects } = useCustomerPhotoProjects(customerId);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<SiteNote | null>(null);
  const [siteFilter, setSiteFilter] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  // Lightbox rather than target="_blank": inside the native app a new tab hands
  // the electrician to the system browser and out of Elec-Mate. Matches the
  // pattern already used in TaskDetailSheet.
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  // Escape is what a desktop user reaches for; tapping the backdrop covers touch.
  useEffect(() => {
    if (!lightboxUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxUrl(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxUrl]);

  const addressById = useMemo(
    () => new Map(properties.map((p) => [p.id, p.address])),
    [properties]
  );

  // `null` filter means every note; a property id narrows to that site plus the
  // customer-wide notes, which still apply when you are stood at that address.
  const visibleNotes = useMemo(() => {
    const bySite =
      siteFilter === null
        ? notes
        : notes.filter((n) => n.propertyId === siteFilter || n.propertyId === null);

    const term = search.trim().toLowerCase();
    if (!term) return bySite;
    // Body and category both — "access" should find the access notes even when
    // the word never appears in the text.
    return bySite.filter(
      (n) =>
        n.body.toLowerCase().includes(term) ||
        SITE_NOTE_CATEGORY_LABELS[n.category].toLowerCase().includes(term)
    );
  }, [notes, siteFilter, search]);

  const visibleProjects = useMemo(
    () =>
      siteFilter === null
        ? projects
        : projects.filter((p) => p.propertyId === siteFilter || p.propertyId === null),
    [projects, siteFilter]
  );

  const openNew = () => {
    setEditing(null);
    setSheetOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={openNew}
        className="h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation"
      >
        Add site note
      </button>

      {/* Search only earns its space once scanning stops being viable. */}
      {notes.length > 8 && (
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes"
          className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/25 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation"
        />
      )}

      {/* Site filter — only earns its space once there is more than one site. */}
      {properties.length > 1 && (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setSiteFilter(null)}
            className={cn(
              'h-9 shrink-0 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
              siteFilter === null
                ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                : 'border-white/[0.12] bg-white/[0.04] font-medium text-white'
            )}
          >
            All sites
          </button>
          {properties.map((p) => (
            <button
              key={p.id}
              onClick={() => setSiteFilter(p.id)}
              className={cn(
                'h-9 max-w-[200px] shrink-0 truncate rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
                siteFilter === p.id
                  ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                  : 'border-white/[0.12] bg-white/[0.04] font-medium text-white'
              )}
            >
              {p.address}
            </button>
          ))}
        </div>
      )}

      {/* Notes */}
      {visibleNotes.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-10 text-center">
          {search.trim() ? (
            <>
              <p className="text-[15px] font-semibold text-white">No notes match “{search.trim()}”</p>
              <button
                onClick={() => setSearch('')}
                className="mt-2 h-11 px-3 text-[12.5px] font-medium text-elec-yellow touch-manipulation"
              >
                Clear search
              </button>
            </>
          ) : (
            <>
              <p className="text-[15px] font-semibold text-white">No site notes yet</p>
              <p className="mt-1 text-[12.5px] text-white">
                Record the things you would otherwise have to ring and ask — key safe codes, where
                the meter is, which breaker is mislabelled.
              </p>
            </>
          )}
        </div>
      ) : (
        // Two columns from lg: up — a single column of short notes on a 1440px
        // screen is mostly empty space. items-start keeps cards at their natural
        // height rather than stretching to match the tallest in the row.
        <div className="grid items-start gap-3 lg:grid-cols-2">
          {visibleNotes.map((note) => (
            <div
              key={note.id}
              className={cn(
                'rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4',
                note.isPinned ? 'border-elec-yellow/60' : 'border-white/[0.12]'
              )}
            >
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                {note.isPinned && (
                  <span className="rounded bg-elec-yellow px-2 py-0.5 text-[10px] font-bold text-black">
                    Pinned
                  </span>
                )}
                <span className="rounded bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-white">
                  {SITE_NOTE_CATEGORY_LABELS[note.category]}
                </span>
                <span className="truncate text-[11px] text-white">
                  {/* Properties load on their own clock. Saying "Site removed"
                      before they arrive would alarm someone about a site that
                      is perfectly fine. */}
                  {!note.propertyId
                    ? 'All sites'
                    : (addressById.get(note.propertyId) ??
                      (propertiesLoading ? 'Site' : 'Site removed'))}
                </span>
              </div>

              <p className="whitespace-pre-wrap break-words text-[13.5px] leading-relaxed text-white">
                {note.body}
              </p>

              {note.photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {note.photos.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setLightboxUrl(p.url)}
                      className="touch-manipulation"
                    >
                      <img
                        src={p.thumbnailUrl || p.url}
                        alt={p.description || 'Site photo'}
                        loading="lazy"
                        className="aspect-square w-full rounded-xl border border-white/[0.1] object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                <span className="text-[11.5px] text-white">{relativeDate(note.createdAt)}</span>
                <div className="flex items-center gap-1">
                  {/* Pinning is the most-used action on a log — "this is the one
                      that matters". Going Edit → toggle → Save for it is three
                      taps too many. */}
                  <button
                    onClick={() =>
                      updateNote({ noteId: note.id, updates: { isPinned: !note.isPinned } })
                    }
                    aria-pressed={note.isPinned}
                    className={cn(
                      'flex h-11 items-center px-3 text-[12px] font-medium transition-colors touch-manipulation',
                      note.isPinned ? 'text-elec-yellow' : 'text-white hover:text-elec-yellow'
                    )}
                  >
                    {note.isPinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(note);
                      setSheetOpen(true);
                    }}
                    className="flex h-11 items-center px-3 text-[12px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(note.id)}
                    className="flex h-11 items-center px-3 text-[12px] font-medium text-white transition-colors hover:text-red-400 touch-manipulation"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <p className="px-1 text-[11.5px] text-white">
          Showing the {pageSize} most recent notes. Search covers these only.
        </p>
      )}

      {/* Job photo sets already tagged to this customer — previously only
          reachable from the Photo Docs tool. */}
      {visibleProjects.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-[13px] font-semibold tracking-tight text-white">Job photos</h3>
          <div className="grid items-start grid-cols-1 gap-3 lg:grid-cols-2">
            {visibleProjects.map((project) => {
              const isOpen = expandedProject === project.id;
              return (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]"
                >
                  {/* Expands in place. Sending the electrician to the Photo Docs
                      page would make them find the same set again by hand. */}
                  <button
                    onClick={() => setExpandedProject(isOpen ? null : project.id)}
                    disabled={project.photoCount === 0}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.03] disabled:opacity-60 touch-manipulation"
                  >
                    {project.coverUrl ? (
                      <img
                        src={project.coverUrl}
                        alt=""
                        loading="lazy"
                        className="h-14 w-14 shrink-0 rounded-xl border border-white/[0.1] object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-[11px] font-medium text-white">
                        None
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-white">{project.name}</p>
                      <p className="mt-0.5 truncate text-[11.5px] text-white">
                        {project.photoCount} photo{project.photoCount === 1 ? '' : 's'}
                        {project.address ? ` · ${project.address}` : ''}
                      </p>
                    </div>
                    {project.photoCount > 0 && (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-white/50 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] p-3 sm:grid-cols-4">
                      {project.photos.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setLightboxUrl(p.url)}
                          className="touch-manipulation"
                        >
                          <img
                            src={p.thumbnailUrl || p.url}
                            alt={p.description || 'Job photo'}
                            loading="lazy"
                            className="aspect-square w-full rounded-xl border border-white/[0.1] object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SiteNoteSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        note={editing}
        properties={properties}
        defaultPropertyId={siteFilter}
        onSave={(input) => addNote(input)}
        onUpdate={(noteId, updates) => updateNote({ noteId, updates })}
        onDetachPhoto={detachPhoto}
        onSaved={refetch}
      />

      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 touch-manipulation"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-h-full max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
              Any photos attached stay in your photo library — only the note text is removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) deleteNote(deleteId);
                setDeleteId(null);
              }}
              className="min-h-[44px] bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
