import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, X, Check, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSafetyPhotoUpload, UploadOptions } from "@/hooks/useSafetyPhotoUpload";
import { PHOTO_CATEGORIES, getCategoryColor } from "@/hooks/useSafetyPhotos";

interface CameraTabProps {
  onPhotoUploaded?: () => void;
  projectReference?: string;  // Pre-fill project field when capturing for specific project
  onClose?: () => void;       // Close sheet after upload
}

type CaptureState = "ready" | "preview" | "details";

export default function CameraTab({ onPhotoUploaded, projectReference: initialProject, onClose }: CameraTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [captureState, setCaptureState] = useState<CaptureState>("ready");
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("before_work");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [projectReference, setProjectReference] = useState(initialProject || "");

  // Track if project is pre-filled (locked)
  const isProjectLocked = Boolean(initialProject);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { uploadPhoto, uploadProgress, isUploading, getCurrentLocation } = useSafetyPhotoUpload();

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapturedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
        setCaptureState("preview");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCameraCapture = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleGallerySelect = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setCapturedImage(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
          setImagePreview(ev.target?.result as string);
          setCaptureState("preview");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    setImagePreview(null);
    setCaptureState("ready");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleProceedToDetails = useCallback(() => {
    setCaptureState("details");
  }, []);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
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
    };

    const result = await uploadPhoto(capturedImage, options);

    if (result) {
      setCapturedImage(null);
      setImagePreview(null);
      setDescription("");
      setLocation("");
      // Only reset project if not locked
      if (!isProjectLocked) {
        setProjectReference("");
      }
      setTags([]);
      setSelectedCategory("before_work");
      setCaptureState("ready");
      onPhotoUploaded?.();
      // Close sheet if onClose callback provided
      onClose?.();
    }
  }, [capturedImage, description, selectedCategory, location, tags, projectReference, uploadPhoto, onPhotoUploaded, onClose, isProjectLocked]);

  // Ready state - camera/gallery selection
  if (captureState === "ready") {
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

        {/* Project header when capturing for specific project */}
        {isProjectLocked && (
          <div className="px-4 py-3 bg-elec-yellow/10 border-b border-elec-yellow/20">
            <p className="text-sm text-white/70">Adding photo to:</p>
            <p className="text-base font-semibold text-elec-yellow truncate">{initialProject}</p>
          </div>
        )}

        {/* Full-screen capture area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Large capture button */}
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

          {/* Gallery option */}
          <button
            onClick={handleGallerySelect}
            className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e1e1e] border border-white/10 text-sm text-white/70 touch-manipulation hover:bg-[#252525] active:bg-[#252525] transition-colors"
          >
            <ImageIcon className="h-4 w-4" />
            Choose from gallery
          </button>
        </div>
      </div>
    );
  }

  // Preview state - review captured image
  if (captureState === "preview") {
    return (
      <div className="flex flex-col h-full bg-elec-dark">
        {/* Full image preview - constrained on desktop */}
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

        {/* Bottom actions */}
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

  // Details state - compact form
  return (
    <div className="flex flex-col h-full bg-elec-dark">
      {/* Compact form with desktop max-width */}
      <div className="flex-1 momentum-scroll-y scrollbar-hide">
        <div className="p-3 md:p-6 space-y-4 max-w-2xl mx-auto">
          {/* Photo thumbnail - smaller on desktop */}
          <div className="relative w-full md:w-48 md:mx-auto h-24 md:h-32 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            )}
            <button
              onClick={handleRetake}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 touch-manipulation hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Category grid - compact 4x2 */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">Category</label>
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 mt-2">
              {PHOTO_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-lg transition-all touch-manipulation ${
                    selectedCategory === cat.value
                      ? "bg-elec-yellow/20 ring-1 ring-elec-yellow"
                      : "bg-white/5 hover:bg-white/10 active:bg-white/10"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-[10px] md:text-xs text-white/80 text-center leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">Description *</label>
            <Textarea
              placeholder="What does this photo show?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 min-h-[80px] bg-white/5 border border-white/10 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none"
            />
          </div>

          {/* Location + Project in row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">Location</label>
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
                  isProjectLocked ? "opacity-70 cursor-not-allowed bg-elec-yellow/5 border-elec-yellow/20" : ""
                }`}
              />
            </div>
          </div>

          {/* Tags - inline */}
          <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 border border-white/10">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-center block">Tags</label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
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
                  <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="text-white/40 hover:text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save button - fixed bottom */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-elec-dark border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleUpload}
            disabled={!description.trim() || isUploading}
            className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 hover:bg-yellow-400 disabled:opacity-50 transition-colors"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{uploadProgress.message}</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                <span>Save Photo</span>
              </>
            )}
          </button>
          {isUploading && (
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-elec-yellow"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
