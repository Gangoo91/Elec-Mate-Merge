import { useState, useRef, useEffect } from 'react';
import { Drawer } from 'vaul';
import {
  X,
  CheckCircle2,
  RotateCcw,
  AlarmClock,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  Users,
  Tag,
  Camera,
  Images,
  ImagePlus,
  Loader2,
} from 'lucide-react';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Button } from '@/components/ui/button';
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
import type { SparkTask } from '@/hooks/useSparkTasks';
import { useTaskPhotos, type TaskPhoto } from '@/hooks/useTaskPhotos';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

interface TaskDetailSheetProps {
  task: SparkTask | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkDone: (id: string) => Promise<void>;
  onReopen: (id: string) => Promise<void>;
  onSnooze: (id: string, until: Date) => Promise<void>;
  onEdit: (task: SparkTask) => void;
  onDelete: (id: string) => Promise<void>;
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-green-500/20 text-green-400' },
  done: { label: 'Done', className: 'bg-emerald-500/20 text-emerald-400' },
  snoozed: { label: 'Snoozed', className: 'bg-blue-500/20 text-blue-400' },
  cancelled: { label: 'Cancelled', className: 'bg-red-500/20 text-red-400' },
};

const PRIORITY_DOT: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-400',
  normal: 'bg-yellow-400',
  low: 'bg-white/30',
};

function getSnoozeOptions(): { label: string; date: Date }[] {
  const now = new Date();
  const today6pm = new Date(now);
  today6pm.setHours(18, 0, 0, 0);
  if (today6pm <= now) today6pm.setDate(today6pm.getDate() + 1);

  const tomorrow9am = new Date(now);
  tomorrow9am.setDate(tomorrow9am.getDate() + 1);
  tomorrow9am.setHours(9, 0, 0, 0);

  const nextMonday9am = new Date(now);
  const day = nextMonday9am.getDay();
  const daysToMonday = day === 0 ? 1 : 8 - day;
  nextMonday9am.setDate(nextMonday9am.getDate() + daysToMonday);
  nextMonday9am.setHours(9, 0, 0, 0);

  return [
    { label: 'Later today (6pm)', date: today6pm },
    { label: 'Tomorrow (9am)', date: tomorrow9am },
    { label: 'Next week (Mon 9am)', date: nextMonday9am },
  ];
}

// Convert base64 data URL to File
function base64ToFile(base64: string, filename: string, mimeType: string): File {
  const byteString = atob(base64.replace(/^data:.+;base64,/, ''));
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File([ab], filename, { type: mimeType });
}

export function TaskDetailSheet({
  task,
  isOpen,
  onClose,
  onMarkDone,
  onReopen,
  onSnooze,
  onEdit,
  onDelete,
}: TaskDetailSheetProps) {
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<TaskPhoto | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const haptic = useHaptic();

  const { photos, isLoading: photosLoading, isUploading, fetchPhotos, uploadPhoto, deletePhoto } =
    useTaskPhotos(task?.id || '');

  // Fetch photos when sheet opens
  useEffect(() => {
    if (isOpen && task?.id) fetchPhotos();
  }, [isOpen, task?.id]);

  if (!task) return null;

  const status = STATUS_BADGE[task.status] || STATUS_BADGE.open;
  const priorityDot = PRIORITY_DOT[task.priority] || PRIORITY_DOT.normal;

  const dueDate = task.dueAt
    ? new Date(task.dueAt).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const isOverdue = task.dueAt && new Date(task.dueAt) < new Date() && task.status === 'open';

  async function handleAction(fn: () => Promise<void>) {
    setActionLoading(true);
    try {
      await fn();
      onClose();
    } finally {
      setActionLoading(false);
    }
  }

  // ── Photo handlers ────────────────────────────────────────────────────────
  async function handleNativePhoto(source: CameraSource) {
    setUploadError(null);
    try {
      const photo = await CapCamera.getPhoto({
        resultType: CameraResultType.Base64,
        source,
        quality: 85,
        allowEditing: false,
      });
      if (!photo.base64String) return;
      const mimeType = photo.format === 'png' ? 'image/png' : 'image/jpeg';
      const filename = `task-photo-${Date.now()}.${photo.format || 'jpg'}`;
      const file = base64ToFile(`data:${mimeType};base64,${photo.base64String}`, filename, mimeType);
      await uploadPhoto(file);
    } catch (err: unknown) {
      if (err instanceof Error && err.message?.includes('cancelled')) return;
      setUploadError('Failed to upload photo. Please try again.');
    }
  }

  async function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadPhoto(file);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      e.target.value = '';
    }
  }

  async function handleConfirmDeletePhoto() {
    if (!photoToDelete) return;
    await deletePhoto(photoToDelete);
    setPhotoToDelete(null);
  }

  return (
    <>
      <Drawer.Root shouldScaleBackground={false} noBodyStyles open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl bg-[#111114] max-h-[85dvh] outline-none">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="mx-auto flex w-full max-w-xl items-start justify-between border-b border-white/10 px-5 pb-3">
              <div className="min-w-0 flex-1 pr-3">
                {/* The task is the headline. Status was set above it as a
                    coloured pill, which made "OPEN" the first thing read on a
                    screen where everything is open. */}
                <h2 className="text-[19px] font-semibold leading-snug tracking-tight text-white">
                  {task.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', priorityDot)} />
                  <span className="text-[12px] text-white">{status.label}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 touch-manipulation shrink-0"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="mx-auto w-full max-w-xl flex-1 space-y-5 overflow-y-auto px-5 py-4">
              {/* Details */}
              {task.details && (
                <div className="space-y-1">
                  <p className="text-[13px] font-medium text-white">Details</p>
                  <p className="text-sm text-white whitespace-pre-wrap">{task.details}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2">
                {dueDate && (
                  <div className="flex items-center gap-2">
                    <Clock className={cn('h-4 w-4', isOverdue ? 'text-red-400' : 'text-white')} />
                    <span className={cn('text-sm', isOverdue ? 'text-red-400 font-medium' : 'text-white')}>
                      {isOverdue ? 'Overdue — ' : ''}{dueDate}
                    </span>
                  </div>
                )}
                {task.customerName && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white" />
                    <span className="text-sm text-white">{task.customerName}</span>
                  </div>
                )}
                {task.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-sm text-white">{task.location}</span>
                  </div>
                )}
                {task.tags.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-white mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ── PHOTOS SECTION ───────────────────────────────────────────── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-white">
                    Photos {photos.length > 0 && <span className="text-white font-normal">({photos.length})</span>}
                  </p>
                  {/* Upload buttons */}
                  <div className="flex items-center gap-2">
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <>
                        {Capacitor.isNativePlatform() ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleNativePhoto(CameraSource.Camera)}
                              className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 touch-manipulation active:scale-95"
                            >
                              <Camera className="h-4 w-4 text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleNativePhoto(CameraSource.Photos)}
                              className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 touch-manipulation active:scale-95"
                            >
                              <Images className="h-4 w-4 text-white" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 touch-manipulation active:scale-95"
                          >
                            <ImagePlus className="h-4 w-4 text-white" />
                          </button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileInput}
                        />
                      </>
                    )}
                  </div>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-400">{uploadError}</p>
                )}

                {photosLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                ) : photos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 group">
                        {photo.signedUrl ? (
                          <img
                            src={photo.signedUrl}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                            onClick={() => setLightboxUrl(photo.signedUrl!)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                        )}
                        {/* Delete overlay */}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPhotoToDelete(photo); }}
                          className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 touch-manipulation opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                    {/* Add more tile */}
                    {!isUploading && (
                      <button
                        type="button"
                        onClick={() => Capacitor.isNativePlatform()
                          ? handleNativePhoto(CameraSource.Camera)
                          : fileInputRef.current?.click()
                        }
                        className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-1 touch-manipulation active:scale-95"
                      >
                        <ImagePlus className="h-5 w-5 text-white" />
                        <span className="text-[10px] text-white">Add</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => Capacitor.isNativePlatform()
                      ? handleNativePhoto(CameraSource.Camera)
                      : fileInputRef.current?.click()
                    }
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.98]"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Attach a photo</span>
                  </button>
                )}
              </div>

              {/* Snooze options */}
              {showSnoozeOptions && (
                <div>
                  <p className="mb-2 text-[12px] font-medium text-white">Snooze until</p>
                  {/* Chips, not a stack of full-width blue bars — these are
                      short mutually-exclusive choices, and the blue panel was
                      the only blue on the page. */}
                  <div className="flex flex-wrap gap-2">
                    {getSnoozeOptions().map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleAction(() => onSnooze(task.id, opt.date))}
                        disabled={actionLoading}
                        className="h-11 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] disabled:opacity-50 touch-manipulation active:scale-[0.97]"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions — one primary, two secondary, one destructive.
                  Four full-width bars of equal weight made the reader choose
                  between them every time; only "done" is the common case, and
                  Delete had the same visual footprint as it. */}
              <div className="pt-1 pb-2">
                {task.status === 'open' ? (
                  <button
                    type="button"
                    onClick={() => { haptic.success(); handleAction(() => onMarkDone(task.id)); }}
                    disabled={actionLoading}
                    className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
                  >
                    Mark done
                  </button>
                ) : task.status === 'done' ? (
                  <button
                    type="button"
                    onClick={() => handleAction(() => onReopen(task.id))}
                    disabled={actionLoading}
                    className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
                  >
                    Reopen
                  </button>
                ) : null}

                <div className="mt-2 flex items-center gap-2">
                  {task.status === 'open' && (
                    <button
                      type="button"
                      onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
                      disabled={actionLoading}
                      className="h-11 flex-1 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.10] disabled:opacity-50 touch-manipulation active:scale-[0.98]"
                    >
                      {showSnoozeOptions ? 'Hide snooze' : 'Snooze'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { onEdit(task); onClose(); }}
                    className="h-11 flex-1 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.98]"
                  >
                    Edit
                  </button>
                </div>

                {/* Destructive, so it does not sit in the same visual rank as
                    the things you do daily. */}
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={actionLoading}
                  className="mx-auto mt-4 block text-[13px] font-medium text-red-300 underline underline-offset-4 transition-colors hover:text-red-200 disabled:opacity-50 touch-manipulation"
                >
                  Delete task
                </button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <img
            src={lightboxUrl}
            alt="Full size"
            className="max-w-full max-h-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Delete photo confirmation */}
      <AlertDialog open={!!photoToDelete} onOpenChange={(open) => !open && setPhotoToDelete(null)}>
        <AlertDialogContent className="bg-[#111114] border-white/[0.14]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete photo?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently remove the photo from this task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { haptic.heavy(); handleConfirmDeletePhoto(); }}
              className="h-11 bg-red-500 hover:bg-red-600 text-white touch-manipulation"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete task confirmation */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-[#111114] border-white/[0.14]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete task?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will remove "{task.title}" from your task list. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { haptic.heavy(); handleAction(async () => {
                await onDelete(task.id);
                setShowDeleteConfirm(false);
              }); }}
              className="h-11 bg-red-500 hover:bg-red-600 text-white touch-manipulation"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
