import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, X, Check, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSafetyPhotoUpload, UploadOptions } from "@/hooks/useSafetyPhotoUpload";
import { PHOTO_CATEGORIES, getCategoryColor } from "@/hooks/useSafetyPhotos";

interface CameraTabProps {
  onPhotoUploaded?: () => void;
}

type CaptureState = "ready" | "preview" | "details";

export default function CameraTab({ onPhotoUploaded }: CameraTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [captureState, setCaptureState] = useState<CaptureState>("ready");
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("before_work");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [projectReference, setProjectReference] = useState("");
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
      setProjectReference("");
      setTags([]);
      setSelectedCategory("before_work");
      setCaptureState("ready");
      onPhotoUploaded?.();
    }
  }, [capturedImage, description, selectedCategory, location, tags, projectReference, uploadPhoto, onPhotoUploaded]);

  // Ready state - camera/gallery selection
  if (captureState === "ready") {
    return (
      <div className="flex flex-col h-full bg-black">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Full-screen capture area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Large capture button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCameraCapture}
            className="w-full max-w-xs aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 touch-manipulation active:bg-white/10"
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
            className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 text-sm text-white/70 touch-manipulation active:bg-white/10"
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
      <div className="flex flex-col h-full bg-black">
        {/* Full image preview */}
        <div className="flex-1 relative">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          )}
          <button
            onClick={handleRetake}
            className="absolute top-3 left-3 p-2 rounded-full bg-black/60 text-white/80 touch-manipulation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom actions */}
        <div className="bg-black p-3 flex gap-2">
          <button
            onClick={handleRetake}
            className="flex-1 h-12 rounded-xl bg-white/10 text-white font-medium touch-manipulation active:bg-white/15"
          >
            Retake
          </button>
          <button
            onClick={handleProceedToDetails}
            className="flex-[2] h-12 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:bg-yellow-400"
          >
            Use Photo
          </button>
        </div>
      </div>
    );
  }

  // Details state - compact form
  return (
    <div className="flex flex-col h-full bg-black">
      {/* Thumbnail strip */}
      <div className="relative h-24 bg-black flex-shrink-0">
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-60" />
        )}
        <button
          onClick={handleRetake}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white/80 touch-manipulation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Compact form */}
      <div className="flex-1 overflow-y-auto momentum-scroll-y scrollbar-hide">
        <div className="p-3 space-y-4">
          {/* Category grid - compact 4x2 */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Category</label>
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {PHOTO_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all touch-manipulation ${
                    selectedCategory === cat.value
                      ? "bg-elec-yellow/20 ring-1 ring-elec-yellow"
                      : "bg-white/5 active:bg-white/10"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span className="text-[10px] text-white/80 text-center leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Description *</label>
            <Textarea
              placeholder="What does this photo show?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 min-h-[70px] bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation resize-none"
            />
          </div>

          {/* Location + Project in row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Location</label>
              <div className="relative mt-1.5">
                <Input
                  placeholder="Site..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-10 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm pr-9 touch-manipulation"
                />
                <button
                  onClick={handleGetLocation}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-elec-yellow touch-manipulation"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Project</label>
              <Input
                placeholder="Job ref..."
                value={projectReference}
                onChange={(e) => setProjectReference(e.target.value)}
                className="mt-1.5 h-10 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation"
              />
            </div>
          </div>

          {/* Tags - inline */}
          <div>
            <label className="text-xs font-medium text-white/60 uppercase tracking-wide">Tags</label>
            <div className="flex gap-1.5 mt-1.5">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation"
              />
              <button
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                className="px-3 h-9 rounded-lg bg-white/5 text-xs font-medium text-white/70 disabled:opacity-40 touch-manipulation"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs">
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
      <div className="flex-shrink-0 p-3 bg-black border-t border-white/5">
        <button
          onClick={handleUpload}
          disabled={!description.trim() || isUploading}
          className="w-full h-11 rounded-xl bg-elec-yellow text-black font-semibold flex items-center justify-center gap-2 touch-manipulation active:bg-yellow-400 disabled:opacity-50"
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
  );
}
