import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSafetyPhotoUpload } from '@/hooks/useSafetyPhotoUpload';
import {
  SITE_NOTE_CATEGORIES,
  SITE_NOTE_CATEGORY_LABELS,
  SiteNote,
  SiteNoteCategory,
  SiteNoteInput,
} from '@/hooks/useSiteNotes';
import { CustomerProperty } from '@/hooks/inspection/useCustomerProperties';

interface SiteNoteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: SiteNote | null;
  properties: CustomerProperty[];
  /** Pre-selects a site when the sheet is opened from inside one. */
  defaultPropertyId?: string | null;
  onSave: (input: SiteNoteInput) => Promise<string>;
  onUpdate: (noteId: string, input: SiteNoteInput) => Promise<void>;
  onDetachPhoto: (photoId: string) => Promise<void>;
  onSaved: () => void;
}

interface PendingPhoto {
  file: File;
  previewUrl: string;
}

export const SiteNoteSheet = ({
  open,
  onOpenChange,
  note,
  properties,
  defaultPropertyId,
  onSave,
  onUpdate,
  onDetachPhoto,
  onSaved,
}: SiteNoteSheetProps) => {
  const { toast } = useToast();
  const { uploadPhoto } = useSafetyPhotoUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [body, setBody] = useState('');
  const [category, setCategory] = useState<SiteNoteCategory>('general');
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [pending, setPending] = useState<PendingPhoto[]>([]);
  const [busy, setBusy] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  /** Ids removed this session — the note prop only refreshes after a refetch. */
  const [detached, setDetached] = useState<string[]>([]);

  const isEditing = !!note;
  const noteId = note?.id ?? null;

  // The note object is re-created on every react-query refetch. Depending on it
  // directly would reset the form — wiping what the user was mid-way through
  // typing — every time the list revalidated. Depend on the id, read the rest
  // through a ref.
  const noteRef = useRef(note);
  noteRef.current = note;

  // Object URLs are a real leak on a phone: a dozen site photos held open adds
  // up, and cancelling the sheet used to leave them all outstanding.
  const pendingRef = useRef<PendingPhoto[]>([]);
  pendingRef.current = pending;

  const clearPending = useCallback(() => {
    pendingRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    pendingRef.current = [];
    setPending([]);
  }, []);

  // Reset on open so a previous note's text never bleeds into a new one, and on
  // close so cancelling releases the previews.
  useEffect(() => {
    clearPending();
    setUploadedCount(0);
    setDetached([]);
    if (!open) return;
    const current = noteRef.current;
    setBody(current?.body ?? '');
    setCategory(current?.category ?? 'general');
    // defaultPropertyId pre-selects the filtered site for a NEW note only.
    // Applying it on edit would silently re-point an existing "All sites" note
    // (propertyId null) at whichever site happened to be filtered.
    setPropertyId(current ? current.propertyId : (defaultPropertyId ?? null));
    setIsPinned(current?.isPinned ?? false);
  }, [open, noteId, defaultPropertyId, clearPending]);

  useEffect(() => () => clearPending(), [clearPending]);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setPending((prev) => [
      ...prev,
      ...files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) })),
    ]);
    // Clear the input so picking the same file twice still fires onChange.
    event.target.value = '';
  };

  const removePending = (index: number) => {
    setPending((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSave = async () => {
    const trimmed = body.trim();
    if (!trimmed) return;

    setBusy(true);
    try {
      const { sanitizeTextInput } = await import('@/utils/inputSanitization');
      const cleanBody = sanitizeTextInput(trimmed);
      const input: SiteNoteInput = {
        body: cleanBody,
        category,
        propertyId,
        isPinned,
      };

      // The note is written first so photos have an id to hang off. If a photo
      // upload then fails the note still survives — losing the text because an
      // image failed on site WiFi would be the worse trade.
      const noteId = isEditing ? note!.id : await onSave(input);
      if (isEditing) await onUpdate(note!.id, input);

      let failed = 0;
      for (const photo of pending) {
        // Each upload is isolated: uploadPhoto returns null on some failures and
        // throws on others. Letting a throw escape would show "Could not save
        // note" for a note that is already safely written.
        try {
          const result = await uploadPhoto(photo.file, {
            // description is NOT NULL on safety_photos, and photo_type is bounded
            // by a CHECK to safety/job_progress/completion/snagging/before/after/
            // general — 'site_note' is NOT a legal value and would reject every
            // upload. site_note_id is what marks these apart, not photo_type.
            description: cleanBody.slice(0, 120),
            category: 'site_condition',
            photoType: 'general',
            siteNoteId: noteId,
          });
          if (result) setUploadedCount((c) => c + 1);
          else failed += 1;
        } catch {
          failed += 1;
        }
      }

      clearPending();

      if (failed > 0) {
        toast({
          title: `Note saved, ${failed} photo${failed === 1 ? '' : 's'} failed`,
          description: 'The note is safe. Reopen it to try the photos again.',
          variant: 'destructive',
        });
      } else {
        toast({ title: isEditing ? 'Note updated' : 'Note saved' });
      }

      onSaved();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Could not save note',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
    }
  };

  const chipCn = (active: boolean) =>
    cn(
      'flex h-11 items-center justify-center rounded-xl border px-3 text-[12.5px] transition-all touch-manipulation',
      active
        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.25]'
    );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.1] bg-[#111114] p-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-4">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">
              {isEditing ? 'Edit site note' : 'New site note'}
            </h2>
            <p className="mt-0.5 text-[12.5px] text-white">
              Things that are true about the site — access, meter position, quirks.
            </p>
          </div>

          {/* Body */}
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4">
            <div>
              <label className="mb-1 block text-[12px] font-medium text-white">Note</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                autoFocus={!isEditing}
                placeholder="Key safe code is 1234, round the side by the meter box."
                className="w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/25 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-medium text-white">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {SITE_NOTE_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={chipCn(category === c)}
                  >
                    <span className="truncate">{SITE_NOTE_CATEGORY_LABELS[c]}</span>
                  </button>
                ))}
              </div>
            </div>

            {properties.length > 0 && (
              <div>
                <label className="mb-2 block text-[12px] font-medium text-white">Site</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPropertyId(null)}
                    className={cn(
                      'flex min-h-[44px] w-full items-center rounded-xl border px-3 text-left text-[13px] transition-all touch-manipulation',
                      propertyId === null
                        ? 'border-elec-yellow bg-elec-yellow/10 font-semibold text-white'
                        : 'border-white/[0.12] bg-white/[0.04] font-medium text-white hover:border-white/[0.25]'
                    )}
                  >
                    All sites — applies to this customer generally
                  </button>
                  {properties.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPropertyId(p.id)}
                      className={cn(
                        'flex min-h-[44px] w-full items-center rounded-xl border px-3 text-left text-[13px] transition-all touch-manipulation',
                        propertyId === p.id
                          ? 'border-elec-yellow bg-elec-yellow/10 font-semibold text-white'
                          : 'border-white/[0.12] bg-white/[0.04] font-medium text-white hover:border-white/[0.25]'
                      )}
                    >
                      <span className="break-words">{p.address}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Photos */}
            <div>
              <label className="mb-2 block text-[12px] font-medium text-white">Photos</label>

              {isEditing && note!.photos.filter((p) => !detached.includes(p.id)).length > 0 && (
                <div className="mb-2 grid grid-cols-3 gap-2">
                  {note!.photos
                    .filter((p) => !detached.includes(p.id))
                    .map((p) => (
                      <div key={p.id} className="relative">
                        <img
                          src={p.thumbnailUrl || p.url}
                          alt={p.description || 'Site photo'}
                          loading="lazy"
                          className="aspect-square w-full rounded-xl border border-white/[0.1] object-cover"
                        />
                        <button
                          type="button"
                          disabled={busy}
                          onClick={async () => {
                            // Optimistic: the tile goes immediately, and only
                            // reappears if the write fails.
                            setDetached((prev) => [...prev, p.id]);
                            try {
                              await onDetachPhoto(p.id);
                            } catch {
                              setDetached((prev) => prev.filter((id) => id !== p.id));
                            }
                          }}
                          aria-label="Remove photo from this note"
                          className="absolute -right-2.5 -top-2.5 flex h-11 w-11 items-center justify-center disabled:opacity-50 touch-manipulation"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.15] bg-black/85">
                            <X className="h-3.5 w-3.5 text-white" />
                          </span>
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {pending.length > 0 && (
                <div className="mb-2 grid grid-cols-3 gap-2">
                  {pending.map((p, i) => (
                    <div key={p.previewUrl} className="relative">
                      <img
                        src={p.previewUrl}
                        alt="Selected"
                        className="aspect-square w-full rounded-xl border border-white/[0.1] object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePending(i)}
                        aria-label="Remove photo"
                        className="absolute -right-2.5 -top-2.5 flex h-11 w-11 items-center justify-center touch-manipulation"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.15] bg-black/85">
                          <X className="h-3.5 w-3.5 text-white" />
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={busy}
                className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] bg-white/[0.03] text-[13px] font-medium text-white transition-colors hover:border-white/[0.35] disabled:opacity-50 touch-manipulation"
              >
                Add photos
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsPinned((v) => !v)}
              className={cn(
                'flex h-11 w-full items-center justify-between rounded-xl border px-3 text-[13px] font-medium transition-all touch-manipulation',
                isPinned
                  ? 'border-elec-yellow bg-elec-yellow/10 text-white'
                  : 'border-white/[0.12] bg-white/[0.04] text-white'
              )}
            >
              <span>Pin to the top</span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                  isPinned ? 'bg-elec-yellow text-black' : 'bg-white/[0.1] text-white'
                )}
              >
                {isPinned ? 'Pinned' : 'Off'}
              </span>
            </button>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-white/[0.08] bg-[#111114] px-4 pb-6 pt-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={busy}
                className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white disabled:opacity-50 touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={busy || !body.trim()}
                className="flex h-12 flex-[1.6] items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all active:scale-[0.99] disabled:opacity-50 touch-manipulation"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {pending.length > 0
                      ? `Uploading ${Math.min(uploadedCount + 1, pending.length)} of ${pending.length}`
                      : 'Saving'}
                  </>
                ) : isEditing ? (
                  'Save changes'
                ) : (
                  'Save note'
                )}
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
