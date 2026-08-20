import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Image as ImageIcon,
  X,
  Check,
  MapPin,
  Loader2,
  Zap,
  Stamp,
  Video,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSafetyPhotoUpload, UploadOptions } from '@/hooks/useSafetyPhotoUpload';
import { PHOTO_CATEGORIES, getCategoryColor } from '@/hooks/useSafetyPhotos';
import { PHOTO_TYPES, usePhotoProjects } from '@/hooks/usePhotoProjects';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { usePhotoAI } from '@/hooks/usePhotoAI';
import { useOfflinePhotoQueue } from '@/hooks/useOfflinePhotoQueue';
import { toast } from '@/hooks/use-toast';
import { safetyInputCn } from '../common/SafetyDocField';
import { cn } from '@/lib/utils';

interface CameraTabProps {
  onPhotoUploaded?: () => void;
  projectReference?: string;
  projectId?: string;
  defaultPhotoType?: string;
  onClose?: () => void;
}

type CaptureState = 'ready' | 'preview' | 'details';
type CaptureMode = 'single' | 'quick';

interface QueuedPhoto {
  file: File;
  preview: string;
}

/**
 * ELE-1582 — how many photos may sit in the queue at once.
 *
 * Each preview is a base64 data URL held in React state at roughly 1.33× the
 * source file, so the ceiling is memory, not taste: 50 × 4 MB photos is
 * already ~270 MB of string. Well above any realistic single visit, and low
 * enough that a phone survives someone selecting their whole camera roll.
 */
const MAX_QUEUE = 50;

/**
 * Identity for de-duplication. name + size + lastModified is what the File API
 * gives us — there is no path or hash — and it is enough to catch the real
 * case: the same photos picked or dropped twice.
 */
const fileKey = (f: File): string => `${f.name}:${f.size}:${f.lastModified}`;

export default function CameraTab({
  onPhotoUploaded,
  projectReference: initialProject,
  projectId: initialProjectId,
  defaultPhotoType,
  onClose,
}: CameraTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quickInputRef = useRef<HTMLInputElement>(null);
  const [captureState, setCaptureState] = useState<CaptureState>('ready');
  const [captureMode, setCaptureMode] = useState<CaptureMode>('single');
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('before_work');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [projectReference, setProjectReference] = useState(initialProject || '');
  const [addWatermark, setAddWatermark] = useState(false);

  // Quick capture queue
  const [quickQueue, setQuickQueue] = useState<QueuedPhoto[]>([]);
  /**
   * ELE-1582 — synchronous mirror of `quickQueue`.
   *
   * De-duplication and the queue cap have to be decided BEFORE the toasts that
   * report them, and a `setState` updater is the wrong place for that: React
   * may run it asynchronously, and runs it twice under StrictMode, so counts
   * read back after the call are unreliable and double. Deciding against a ref
   * keeps the accounting synchronous and exact. Assigned in the same tick as
   * the state update so two fast drops still see each other.
   */
  const queueRef = useRef<QueuedPhoto[]>([]);
  const [isUploadingQueue, setIsUploadingQueue] = useState(false);
  const [queueProgress, setQueueProgress] = useState(0);

  const isProjectLocked = Boolean(initialProject);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedPhotoType, setSelectedPhotoType] = useState<string>(defaultPhotoType || 'general');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId || '');
  const { projects } = usePhotoProjects('active');

  const { uploadPhoto, uploadProgress, isUploading, getCurrentLocation } = useSafetyPhotoUpload();
  const { classifyPhoto } = usePhotoAI();
  const { enqueue: enqueueOffline, pendingCount: offlinePendingCount } = useOfflinePhotoQueue();

  const [isReadingBatch, setIsReadingBatch] = useState(false);

  /**
   * ELE-1582 — one place that turns a batch of files into queued photos.
   * The gallery picker and the desktop drop zone both land here.
   *
   * Three things a naive version gets wrong on a real batch of site photos:
   *
   *  1. ORDER. FileReader is async, so pushing each result as it lands queues
   *     the photos in completion order, not the order they were chosen. Small
   *     files overtake large ones and a before/during/after sequence comes out
   *     shuffled. Read is awaited into an indexed array so order is the order
   *     you picked.
   *
   *  2. MEMORY. Every preview is a base64 data URL, roughly 1.33× the file it
   *     came from, held in React state. Fifty 4 MB photos is ~270 MB of string
   *     — enough to have mobile Safari kill the tab. Hence MAX_QUEUE.
   *
   *  3. DUPLICATES. Dropping the same folder twice, or dropping then picking
   *     the same photos from the gallery, silently queued them again and they
   *     uploaded twice.
   *
   * Dedupe and cap are decided synchronously against `queueRef`, never inside
   * a setState updater — React may run that asynchronously and runs it twice
   * under StrictMode, which would make the counts these toasts report both
   * unreliable and doubled.
   */
  const enqueueFiles = useCallback(
    async (files: FileList | File[], opts?: { dedupe?: boolean }) => {
    const dedupe = opts?.dedupe !== false;
    const all = Array.from(files);
    const accepted = all.filter(
      (f) => f.type.startsWith('image/') || f.type.startsWith('video/')
    );
    const rejected = all.length - accepted.length;
    if (rejected > 0) {
      toast({
        title: `${rejected} file${rejected === 1 ? '' : 's'} skipped`,
        description: 'Photos and videos only.',
        variant: 'destructive',
      });
    }
    if (accepted.length === 0) return 0;

    setIsReadingBatch(true);
    try {
      // Indexed read — resolves in selection order regardless of file size.
      const read = await Promise.all(
        accepted.map(
          (file) =>
            new Promise<QueuedPhoto | null>((resolve) => {
              const reader = new FileReader();
              reader.onload = (ev) =>
                resolve({ file, preview: ev.target?.result as string });
              // A read failure loses one photo, never the whole batch.
              reader.onerror = () => resolve(null);
              reader.readAsDataURL(file);
            })
        )
      );

      let addedCount = 0;
      let duplicateCount = 0;
      let overflowCount = 0;

      const seen = new Set(queueRef.current.map((p) => fileKey(p.file)));
      const next = [...queueRef.current];
      for (const item of read) {
        if (!item) continue;
        const key = fileKey(item.file);
        if (dedupe && seen.has(key)) {
          duplicateCount++;
          continue;
        }
        if (next.length >= MAX_QUEUE) {
          overflowCount++;
          continue;
        }
        seen.add(key);
        next.push(item);
        addedCount++;
      }
      queueRef.current = next;
      setQuickQueue(next);

      if (duplicateCount > 0) {
        toast({
          title: `${duplicateCount} already in the queue`,
          description: 'Skipped so they are not uploaded twice.',
        });
      }
      if (overflowCount > 0) {
        toast({
          title: `Queue full — ${overflowCount} not added`,
          description: `Upload the ${MAX_QUEUE} queued first, then add the rest.`,
          variant: 'destructive',
        });
      }
      return addedCount;
    } finally {
      setIsReadingBatch(false);
    }
    },
    []
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (captureMode === 'quick') {
          // ELE-1582 — the camera path goes through enqueueFiles too. It used
          // to push straight onto the queue, so it honoured neither the cap nor
          // the type check: quick-capture is the most-used control on this
          // screen, and sixty taps walked into exactly the memory problem the
          // cap exists to prevent.
          //
          // dedupe OFF here. Two shots of the same board seconds apart can
          // share a name and land on the same byte count, and refusing the
          // second as a "duplicate" would quietly lose a photo the electrician
          // deliberately took.
          void enqueueFiles([file], { dedupe: false });
          // Reset input for next capture
          if (quickInputRef.current) quickInputRef.current.value = '';
        } else {
          setCapturedImage(file);
          const reader = new FileReader();
          reader.onload = (ev) => {
            setImagePreview(ev.target?.result as string);
            setCaptureState('preview');
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [captureMode, enqueueFiles]
  );

  const handleCameraCapture = useCallback(() => {
    if (captureMode === 'quick') {
      quickInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  }, [captureMode]);

  /**
   * ELE-1582 — desktop drag and drop.
   *
   * Photo Docs was built camera-first, which is right on a phone but leaves a
   * desktop user with only a file picker. Dropping a batch of site photos
   * straight onto the page is the thing that was asked for, and it goes to the
   * same queue the gallery picker fills.
   *
   * Counter-based rather than a plain boolean: dragenter/dragleave also fire
   * for child elements, so a single flag flickers off as the pointer crosses
   * the overlay's own children.
   */
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    // Only react to an actual file drag — not text selection or a dragged link.
    if (!Array.from(e.dataTransfer?.types || []).includes('Files')) return;
    e.preventDefault();
    dragDepth.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer?.types || []).includes('Files')) return;
    // Without preventDefault the browser navigates to the dropped file.
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer?.types || []).includes('Files')) return;
    e.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (!Array.from(e.dataTransfer?.types || []).includes('Files')) return;
      e.preventDefault();
      dragDepth.current = 0;
      setIsDragging(false);

      const files = e.dataTransfer?.files;
      if (!files?.length) return;

      // Dropping is inherently a batch action, so it always fills the queue —
      // even from single-capture mode, where the alternative would be silently
      // throwing away every file but the first.
      if (captureMode !== 'quick') setCaptureMode('quick');
      void enqueueFiles(files).then((added) => {
        if (added > 0) {
          toast({
            title: `${added} photo${added === 1 ? '' : 's'} added`,
            description: "Add details and upload when you're ready.",
          });
        }
      });
    },
    [captureMode, enqueueFiles]
  );

  const handleGallerySelect = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = captureMode === 'quick';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      if (captureMode === 'quick') {
        // ELE-1582 — shares enqueueFiles with the drop zone so the two cannot
        // drift on ordering, de-duplication or the queue cap. Previously an
        // inline copy of the same loop, which had none of them.
        void enqueueFiles(files);
      } else {
        const file = files[0];
        if (file) {
          setCapturedImage(file);
          const reader = new FileReader();
          reader.onload = (ev) => {
            setImagePreview(ev.target?.result as string);
            setCaptureState('preview');
          };
          reader.readAsDataURL(file);
        }
      }
    };
    input.click();
  }, [captureMode, enqueueFiles]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setImagePreview(null);
    setCaptureState('ready');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleProceedToDetails = useCallback(() => {
    setCaptureState('details');
    // Auto-capture GPS when entering details (ELE-729)
    if (!location) {
      getCurrentLocation()
        .then((coords) => {
          if (coords) {
            setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
          }
        })
        .catch(() => {
          /* GPS unavailable — user can still add manually */
        });
    }
  }, [location, getCurrentLocation]);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, tags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleGetLocation = useCallback(async () => {
    const coords = await getCurrentLocation();
    if (coords) {
      setLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
    }
  }, [getCurrentLocation]);

  const handleUpload = useCallback(async () => {
    if (!capturedImage || !description.trim()) return;

    const options: UploadOptions = {
      description: description.trim(),
      category: selectedCategory,
      location: location || undefined,
      tags: tags.length > 0 ? tags : undefined,
      projectReference: projectReference || undefined,
      projectId: selectedProjectId || undefined,
      photoType: selectedPhotoType || 'general',
      addWatermark,
    };

    const result = await uploadPhoto(capturedImage, options);

    // If upload returned null due to offline, enqueue for later
    if (!result && uploadProgress.status === 'offline') {
      await enqueueOffline(capturedImage, options);
      setCapturedImage(null);
      setImagePreview(null);
      setDescription('');
      setLocation('');
      if (!isProjectLocked) setProjectReference('');
      setTags([]);
      setSelectedCategory('before_work');
      setSelectedPhotoType('general');
      setCaptureState('ready');
      return;
    }

    if (result) {
      // Fire-and-forget AI classification in background
      if (result.id) {
        classifyPhoto(result.id).catch(() => {});
      }

      setCapturedImage(null);
      setImagePreview(null);
      setDescription('');
      setLocation('');
      if (!isProjectLocked) {
        setProjectReference('');
      }
      setTags([]);
      setSelectedCategory('before_work');
      setSelectedPhotoType('general');
      setCaptureState('ready');
      onPhotoUploaded?.();
      onClose?.();
    }
  }, [
    capturedImage,
    description,
    selectedCategory,
    location,
    tags,
    projectReference,
    selectedProjectId,
    selectedPhotoType,
    uploadPhoto,
    uploadProgress.status,
    enqueueOffline,
    classifyPhoto,
    onPhotoUploaded,
    onClose,
    isProjectLocked,
    addWatermark,
  ]);

  // Quick capture - upload all queued photos
  const handleUploadQueue = useCallback(async () => {
    if (quickQueue.length === 0 || !description.trim()) return;

    setIsUploadingQueue(true);
    setQueueProgress(0);

    // ELE-1582 — snapshot what we are uploading.
    //
    // Photos can now arrive mid-upload (drop zone, gallery, camera). This loop
    // used to iterate the live queue and then clear it wholesale on success,
    // so anything added while the upload ran was deleted WITHOUT being
    // uploaded — silent loss of site photos someone had just taken. We upload
    // exactly this batch and, at the end, remove exactly this batch, leaving
    // later arrivals queued.
    const batch = [...queueRef.current];
    const uploadedKeys = new Set<string>();

    let uploaded = 0;
    for (let i = 0; i < batch.length; i++) {
      const photo = batch[i];
      const options: UploadOptions = {
        description:
          batch.length > 1
            ? `${description.trim()} (${i + 1}/${batch.length})`
            : description.trim(),
        category: selectedCategory,
        location: location || undefined,
        tags: tags.length > 0 ? tags : undefined,
        projectReference: projectReference || undefined,
        projectId: selectedProjectId || undefined,
        photoType: selectedPhotoType || 'general',
        addWatermark,
      };

      const result = await uploadPhoto(photo.file, options);
      // ELE-1582 — track WHICH succeeded, not just how many.
      //
      // The removal below used to clear every key in the batch regardless of
      // outcome, so a partial failure discarded the photos that failed: upload
      // 5 on a weak site connection, 2 succeed, and the other 3 disappeared
      // from the queue with only a "2 photos uploaded" toast. Failures now
      // stay queued so they can simply be sent again.
      if (result) {
        uploaded++;
        uploadedKeys.add(fileKey(photo.file));
      }
      setQueueProgress(Math.round(((i + 1) / batch.length) * 100));
    }

    setIsUploadingQueue(false);
    setQueueProgress(0);

    const failed = batch.length - uploaded;

    if (uploaded > 0) {
      toast({
        title: `${uploaded} photo${uploaded !== 1 ? 's' : ''} uploaded`,
        description: `Successfully uploaded to ${projectReference || 'Photo Docs'}`,
      });
      // Remove only what actually uploaded. Anything added mid-upload, and
      // anything that failed, stays in the queue.
      const remaining = queueRef.current.filter((p) => !uploadedKeys.has(fileKey(p.file)));
      queueRef.current = remaining;
      setQuickQueue(remaining);
    }

    if (failed > 0) {
      toast({
        title: `${failed} photo${failed !== 1 ? 's' : ''} didn't upload`,
        description: 'Still in the queue — tap upload again to retry.',
        variant: 'destructive',
      });
    }

    // Only clear the form and leave the screen once everything is away.
    // Closing on a partial success would strand the failures behind a sheet
    // the electrician has just been navigated out of.
    if (uploaded > 0 && failed === 0) {
      setDescription('');
      setLocation('');
      if (!isProjectLocked) setProjectReference('');
      setTags([]);
      setCaptureState('ready');
      onPhotoUploaded?.();
      onClose?.();
    } else if (uploaded > 0) {
      onPhotoUploaded?.();
    }
  }, [
    quickQueue,
    description,
    selectedCategory,
    location,
    tags,
    projectReference,
    selectedProjectId,
    selectedPhotoType,
    addWatermark,
    uploadPhoto,
    isProjectLocked,
    onPhotoUploaded,
    onClose,
  ]);

  const handleRemoveFromQueue = useCallback((index: number) => {
    setQuickQueue((prev) => {
      const next = prev.filter((_, i) => i !== index);
      queueRef.current = next;
      return next;
    });
  }, []);

  // Ready state - camera/gallery selection
  if (captureState === 'ready') {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={quickInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Offline queue indicator */}
        {offlinePendingCount > 0 && (
          <div className="px-4 py-2 bg-orange-500/10 border-b border-orange-500/20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs text-white font-medium">
              {offlinePendingCount} photo{offlinePendingCount !== 1 ? 's' : ''} queued for upload
            </span>
          </div>
        )}

        {/* Project header when capturing for specific project */}
        {isProjectLocked && (
          <div className="px-4 py-3 border-b border-elec-yellow/20">
            <p className="text-sm text-white">Adding photo to:</p>
            <p className="text-base font-semibold text-elec-yellow truncate">{initialProject}</p>
          </div>
        )}

        {/* Mode toggle */}
        <div className="flex-shrink-0 px-4 pt-3">
          <div className="flex items-center bg-[#1e1e1e] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setCaptureMode('single')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                captureMode === 'single'
                  ? 'bg-elec-yellow text-black'
                  : 'text-white active:text-white'
              }`}
            >
              <Camera className="h-4 w-4" />
              Single
            </button>
            <button
              onClick={() => setCaptureMode('quick')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all touch-manipulation ${
                captureMode === 'quick'
                  ? 'bg-elec-yellow text-black'
                  : 'text-white active:text-white'
              }`}
            >
              <Zap className="h-4 w-4" />
              Quick Capture
            </button>
          </div>
        </div>

        {/* Quick capture queue preview */}
        {captureMode === 'quick' && quickQueue.length > 0 && (
          <div className="flex-shrink-0 px-4 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white font-medium">
                {quickQueue.length} photo{quickQueue.length !== 1 ? 's' : ''} queued
              </span>
              <button
                onClick={() => setCaptureState('details')}
                className="text-xs text-elec-yellow font-semibold touch-manipulation px-2 py-1 rounded-lg active:bg-white/5"
              >
                Add Details & Upload
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {quickQueue.map((photo, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[#1e1e1e] border border-white/10"
                >
                  <img src={photo.preview} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveFromQueue(index)}
                    className="absolute -top-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white touch-manipulation active:bg-black/80"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full-screen capture area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {captureMode === 'quick' ? (
            <>
              {/* Quick capture - large button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCameraCapture}
                className="w-28 h-28 rounded-full bg-elec-yellow shadow-lg shadow-elec-yellow/30 flex items-center justify-center touch-manipulation"
              >
                <Zap className="h-12 w-12 text-black" />
              </motion.button>
              <p className="text-sm text-white mt-4 text-center">
                Tap to capture. Photos queue up.{'\n'}Add details when you're done.
              </p>
              <button
                onClick={handleGallerySelect}
                className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 text-sm text-white touch-manipulation active:bg-[#252525]"
              >
                <ImageIcon className="h-4 w-4" />
                Choose multiple from gallery
              </button>
            </>
          ) : (
            <>
              {/* Single capture - original UI */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCameraCapture}
                className="w-full max-w-xs aspect-square rounded-2xl bg-[#1e1e1e] border border-white/10 flex flex-col items-center justify-center gap-3 touch-manipulation hover:bg-[#252525] active:bg-[#252525] transition-colors"
              >
                <div className="w-16 h-16 rounded-full border border-elec-yellow/35 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-elec-yellow" />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-white">Take Photo</p>
                  <p className="text-xs text-white">Tap to open camera</p>
                </div>
              </motion.button>

              <button
                onClick={handleGallerySelect}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 text-sm text-white touch-manipulation hover:bg-[#252525] active:bg-[#252525] transition-colors"
              >
                <ImageIcon className="h-4 w-4" />
                Choose from gallery
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Preview state - review captured image/video (single mode only)
  const isVideoCapture = capturedImage?.type?.startsWith('video/');

  if (captureState === 'preview' && captureMode === 'single') {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
          {imagePreview &&
            (isVideoCapture ? (
              <video
                src={imagePreview}
                controls
                className="max-w-full max-h-full object-contain rounded-xl md:max-w-lg md:max-h-[60vh] border border-white/10"
              />
            ) : (
              <img
                src={imagePreview}
                alt="Captured"
                className="max-w-full max-h-full object-contain rounded-xl md:max-w-lg md:max-h-[60vh] border border-white/10"
              />
            ))}
          <button
            onClick={handleRetake}
            className="absolute top-4 left-4 md:top-8 md:left-8 p-2 rounded-full bg-black/60 text-white touch-manipulation hover:bg-black/80"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-elec-dark p-3 md:p-4 border-t border-white/10">
          <div className="flex gap-2 max-w-lg mx-auto">
            <button
              onClick={handleRetake}
              className="flex-1 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 text-white font-medium touch-manipulation hover:bg-[#252525] active:bg-[#252525] transition-colors"
            >
              Retake
            </button>
            <button
              onClick={handleProceedToDetails}
              className="flex-[2] h-12 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation hover:bg-yellow-400 active:bg-yellow-400 transition-colors"
            >
              {isVideoCapture ? 'Use Video' : 'Use Photo'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Details state - compact form (works for both single and quick capture)
  const isQuickMode = captureMode === 'quick' && quickQueue.length > 0;

  return (
    <div
      className="relative flex flex-col h-full bg-elec-dark"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* ELE-1582 — reading a big batch takes a moment (a 50-photo drop is
          50 base64 decodes). Without this the page looks frozen and people
          drop again, which is how duplicates got queued. */}
      {isReadingBatch && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-center gap-2 bg-elec-yellow px-4 py-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-black" />
          <span className="text-[12.5px] font-semibold text-black">Adding photos…</span>
        </div>
      )}

      {/* ELE-1582 — desktop drop target. Pointer-events-none so it never
          intercepts a tap on a phone; it only appears mid-drag, which cannot
          happen on touch. */}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-elec-dark/85 backdrop-blur-sm">
          <div className="mx-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-elec-yellow/70 bg-elec-yellow/[0.06] px-8 py-10 text-center">
            <ImageIcon className="h-10 w-10 text-elec-yellow" />
            <p className="text-[15px] font-semibold text-white">Drop photos to add them</p>
            <p className="text-[12.5px] text-white">
              They go straight to the queue — add details before uploading.
            </p>
          </div>
        </div>
      )}
      <div className="flex-1 momentum-scroll-y scrollbar-hide">
        <div className="p-3 md:p-6 space-y-4 max-w-2xl mx-auto">
          {/* Photo thumbnail(s) */}
          {isQuickMode ? (
            <div className="bg-[#1e1e1e] rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white uppercase tracking-wide">
                  {quickQueue.length} Photos Queued
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickQueue.map((photo, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden"
                  >
                    <img src={photo.preview} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveFromQueue(index)}
                      className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/60 text-white touch-manipulation"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full md:w-48 md:mx-auto h-24 md:h-32 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10">
              {imagePreview &&
                (isVideoCapture ? (
                  <div className="relative w-full h-full">
                    <video src={imagePreview} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                        <Video className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ))}
              <button
                onClick={handleRetake}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white touch-manipulation hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Project selector */}
          {!isProjectLocked && projects.length > 0 && (
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
              <label className="text-xs font-medium text-white uppercase tracking-wide text-center block mb-2">
                Project (optional)
              </label>
              <MobileSelectPicker
                value={selectedProjectId}
                onValueChange={(val) => {
                  setSelectedProjectId(val);
                  const proj = projects.find((p) => p.id === val);
                  if (proj) setProjectReference(proj.name);
                  else setProjectReference('');
                }}
                title="Select Project"
                placeholder="No project"
                options={[
                  { value: '', label: 'No Project' },
                  ...projects.map((p) => ({
                    value: p.id,
                    label: p.name,
                    description: p.customer_name || undefined,
                  })),
                ]}
                triggerClassName="bg-white/5 border-white/10"
              />
            </div>
          )}

          {/* Photo type grid */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Photo Type
            </label>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 mt-2">
              {PHOTO_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedPhotoType(type.value)}
                  className={`flex min-h-[52px] items-center justify-center rounded-xl border px-2 text-center transition-colors touch-manipulation ${
                    selectedPhotoType === type.value
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.14] bg-white/[0.06] font-medium text-white hover:border-white/[0.24]'
                  }`}
                >
                  <span className="text-[12px] leading-tight">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category grid */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Category
            </label>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 mt-2">
              {PHOTO_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex min-h-[52px] items-center justify-center rounded-xl border px-2 text-center transition-colors touch-manipulation ${
                    selectedCategory === cat.value
                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                      : 'border-white/[0.14] bg-white/[0.06] font-medium text-white hover:border-white/[0.24]'
                  }`}
                >
                  <span className="text-[12px] leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Description *
            </label>
            <Textarea
              placeholder={
                isQuickMode ? 'Description for all photos...' : 'What does this photo show?'
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-[80px] bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none"
            />
          </div>

          {/* Location + Project */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                Location
              </label>
              <div className="relative mt-2">
                <Input
                  placeholder="Site..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={safetyInputCn}
                />
                <button
                  onClick={handleGetLocation}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-white hover:text-elec-yellow touch-manipulation"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                Project {isProjectLocked && <span className="text-elec-yellow">(locked)</span>}
              </label>
              <Input
                placeholder="Job ref..."
                value={projectReference}
                onChange={(e) => setProjectReference(e.target.value)}
                disabled={isProjectLocked}
                className={cn(safetyInputCn, 'mt-2')}
              />
            </div>
          </div>

          {/* Watermark toggle */}
          <button
            onClick={() => setAddWatermark(!addWatermark)}
            className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-white/10 touch-manipulation active:bg-[#252525]"
          >
            <Stamp className={`h-5 w-5 ${addWatermark ? 'text-elec-yellow' : 'text-white'}`} />
            <div className="flex-1 text-left">
              <p className="text-sm text-white">Timestamp Watermark</p>
              <p className="text-[10px] text-white">Burns date, time & location onto the photo</p>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors ${addWatermark ? 'bg-elec-yellow' : 'bg-white/10'}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform mt-0.5 ${addWatermark ? 'ml-[18px]' : 'ml-0.5'}`}
              />
            </div>
          </button>

          {/* Tags */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Tags
            </label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                className={cn(safetyInputCn, 'flex-1')}
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.12] touch-manipulation disabled:opacity-40 touch-manipulation"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="w-6 h-6 flex items-center justify-center rounded-full text-white active:bg-white/10 touch-manipulation"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-elec-dark border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={isQuickMode ? handleUploadQueue : handleUpload}
            disabled={
              !description.trim() ||
              (isQuickMode ? isUploadingQueue : isUploading) ||
              (isQuickMode && quickQueue.length === 0)
            }
            className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 hover:bg-yellow-400 disabled:opacity-50 transition-colors"
          >
            {(isQuickMode ? isUploadingQueue : isUploading) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isQuickMode ? `Uploading ${queueProgress}%` : uploadProgress.message}</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>
                  {isQuickMode
                    ? `Upload ${quickQueue.length} Photo${quickQueue.length !== 1 ? 's' : ''}`
                    : isVideoCapture
                      ? 'Save Video'
                      : 'Save Photo'}
                </span>
              </>
            )}
          </button>
          {(isQuickMode ? isUploadingQueue : isUploading) && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-elec-yellow"
                initial={{ width: 0 }}
                animate={{ width: `${isQuickMode ? queueProgress : uploadProgress.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
