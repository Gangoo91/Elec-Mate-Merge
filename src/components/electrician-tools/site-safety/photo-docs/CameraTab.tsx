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
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSafetyPhotoUpload, UploadOptions } from '@/hooks/useSafetyPhotoUpload';
import { PHOTO_CATEGORIES, getCategoryColor } from '@/hooks/useSafetyPhotos';
import { toast } from '@/hooks/use-toast';

interface CameraTabProps {
  onPhotoUploaded?: () => void;
  projectReference?: string;
  onClose?: () => void;
}

type CaptureState = 'ready' | 'preview' | 'details';
type CaptureMode = 'single' | 'quick';

interface QueuedPhoto {
  file: File;
  preview: string;
}

export default function CameraTab({
  onPhotoUploaded,
  projectReference: initialProject,
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
  const [isUploadingQueue, setIsUploadingQueue] = useState(false);
  const [queueProgress, setQueueProgress] = useState(0);

  const isProjectLocked = Boolean(initialProject);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const { uploadPhoto, uploadProgress, isUploading, getCurrentLocation } = useSafetyPhotoUpload();

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (captureMode === 'quick') {
          // Add to queue
          const reader = new FileReader();
          reader.onload = (ev) => {
            setQuickQueue((prev) => [...prev, { file, preview: ev.target?.result as string }]);
          };
          reader.readAsDataURL(file);
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
    [captureMode]
  );

  const handleCameraCapture = useCallback(() => {
    if (captureMode === 'quick') {
      quickInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  }, [captureMode]);

  const handleGallerySelect = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = captureMode === 'quick';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      if (captureMode === 'quick') {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setQuickQueue((prev) => [...prev, { file, preview: ev.target?.result as string }]);
          };
          reader.readAsDataURL(file);
        });
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
  }, [captureMode]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setImagePreview(null);
    setCaptureState('ready');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleProceedToDetails = useCallback(() => {
    setCaptureState('details');
  }, []);

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
      addWatermark,
    };

    const result = await uploadPhoto(capturedImage, options);

    if (result) {
      setCapturedImage(null);
      setImagePreview(null);
      setDescription('');
      setLocation('');
      if (!isProjectLocked) {
        setProjectReference('');
      }
      setTags([]);
      setSelectedCategory('before_work');
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
    uploadPhoto,
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

    let uploaded = 0;
    for (let i = 0; i < quickQueue.length; i++) {
      const photo = quickQueue[i];
      const options: UploadOptions = {
        description:
          quickQueue.length > 1
            ? `${description.trim()} (${i + 1}/${quickQueue.length})`
            : description.trim(),
        category: selectedCategory,
        location: location || undefined,
        tags: tags.length > 0 ? tags : undefined,
        projectReference: projectReference || undefined,
        addWatermark,
      };

      const result = await uploadPhoto(photo.file, options);
      if (result) uploaded++;
      setQueueProgress(Math.round(((i + 1) / quickQueue.length) * 100));
    }

    setIsUploadingQueue(false);
    setQueueProgress(0);

    if (uploaded > 0) {
      toast({
        title: `${uploaded} photo${uploaded !== 1 ? 's' : ''} uploaded`,
        description: `Successfully uploaded to ${projectReference || 'Photo Docs'}`,
      });
      setQuickQueue([]);
      setDescription('');
      setLocation('');
      if (!isProjectLocked) setProjectReference('');
      setTags([]);
      setCaptureState('ready');
      onPhotoUploaded?.();
      onClose?.();
    }
  }, [
    quickQueue,
    description,
    selectedCategory,
    location,
    tags,
    projectReference,
    addWatermark,
    uploadPhoto,
    isProjectLocked,
    onPhotoUploaded,
    onClose,
  ]);

  const handleRemoveFromQueue = useCallback((index: number) => {
    setQuickQueue((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Ready state - camera/gallery selection
  if (captureState === 'ready') {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />
        <input
          ref={quickInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Project header when capturing for specific project */}
        {isProjectLocked && (
          <div className="px-4 py-3 bg-elec-yellow/10 border-b border-elec-yellow/20">
            <p className="text-sm text-white/70">Adding photo to:</p>
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
                  : 'text-white/50 active:text-white/80'
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
                  : 'text-white/50 active:text-white/80'
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
              <span className="text-xs text-white/60 font-medium">
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
                    className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/60 text-white/80 touch-manipulation"
                  >
                    <X className="h-3 w-3" />
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
              <p className="text-sm text-white/50 mt-4 text-center">
                Tap to capture. Photos queue up.{'\n'}Add details when you're done.
              </p>
              <button
                onClick={handleGallerySelect}
                className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 text-sm text-white/70 touch-manipulation active:bg-[#252525]"
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
                <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-elec-yellow" />
                </div>
                <div className="text-center">
                  <p className="text-base font-medium text-white">Take Photo</p>
                  <p className="text-xs text-white/50">Tap to open camera</p>
                </div>
              </motion.button>

              <button
                onClick={handleGallerySelect}
                className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 text-sm text-white/70 touch-manipulation hover:bg-[#252525] active:bg-[#252525] transition-colors"
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

  // Preview state - review captured image (single mode only)
  if (captureState === 'preview' && captureMode === 'single') {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Captured"
              className="max-w-full max-h-full object-contain rounded-xl md:max-w-lg md:max-h-[60vh] border border-white/10"
            />
          )}
          <button
            onClick={handleRetake}
            className="absolute top-4 left-4 md:top-8 md:left-8 p-2 rounded-full bg-black/60 text-white/80 touch-manipulation hover:bg-black/80"
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
              Use Photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Details state - compact form (works for both single and quick capture)
  const isQuickMode = captureMode === 'quick' && quickQueue.length > 0;

  return (
    <div className="flex flex-col h-full bg-elec-dark">
      <div className="flex-1 momentum-scroll-y scrollbar-hide">
        <div className="p-3 md:p-6 space-y-4 max-w-2xl mx-auto">
          {/* Photo thumbnail(s) */}
          {isQuickMode ? (
            <div className="bg-[#1e1e1e] rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
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
                      className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-black/60 text-white/80 touch-manipulation"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full md:w-48 md:mx-auto h-24 md:h-32 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <button
                onClick={handleRetake}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 touch-manipulation hover:bg-black/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Category grid */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">
              Category
            </label>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 mt-2">
              {PHOTO_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-lg transition-all touch-manipulation ${
                    selectedCategory === cat.value
                      ? 'bg-elec-yellow/20 ring-1 ring-elec-yellow'
                      : 'bg-white/5 hover:bg-white/10 active:bg-white/10'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-[10px] md:text-xs text-white/80 text-center leading-tight">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">
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
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">
                Location
              </label>
              <div className="relative mt-2">
                <Input
                  placeholder="Site..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-10 bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm pr-9 touch-manipulation"
                />
                <button
                  onClick={handleGetLocation}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-elec-yellow touch-manipulation"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">
                Project {isProjectLocked && <span className="text-elec-yellow">(locked)</span>}
              </label>
              <Input
                placeholder="Job ref..."
                value={projectReference}
                onChange={(e) => setProjectReference(e.target.value)}
                disabled={isProjectLocked}
                className={`mt-2 h-10 bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation ${
                  isProjectLocked
                    ? 'opacity-70 cursor-not-allowed bg-elec-yellow/5 border-elec-yellow/20'
                    : ''
                }`}
              />
            </div>
          </div>

          {/* Watermark toggle */}
          <button
            onClick={() => setAddWatermark(!addWatermark)}
            className="w-full flex items-center gap-3 p-3 bg-[#1e1e1e] rounded-xl border border-white/10 touch-manipulation active:bg-[#252525]"
          >
            <Stamp className={`h-5 w-5 ${addWatermark ? 'text-elec-yellow' : 'text-white/40'}`} />
            <div className="flex-1 text-left">
              <p className="text-sm text-white">Timestamp Watermark</p>
              <p className="text-[10px] text-white/40">
                Burns date, time & location onto the photo
              </p>
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
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">
              Tags
            </label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1 h-10 bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation"
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="px-4 h-10 rounded-lg bg-white/10 text-sm font-medium text-white/70 hover:bg-white/15 disabled:opacity-40 touch-manipulation"
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
                      className="text-white/40 hover:text-white"
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
