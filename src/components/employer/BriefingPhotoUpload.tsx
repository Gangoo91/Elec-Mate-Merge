import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Camera, Image, X, Upload, Loader2, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface BriefingPhotoUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefingId: string;
  existingPhotos?: string[];
}

export function BriefingPhotoUpload({
  open,
  onOpenChange,
  briefingId,
  existingPhotos = [],
}: BriefingPhotoUploadProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<string[]>(existingPhotos);
  const [uploading, setUploading] = useState(false);

  // Mutation to save photos to the briefing
  const savePhotosMutation = useMutation({
    mutationFn: async (photoUrls: string[]) => {
      const { error } = await supabase
        .from("briefings")
        .update({
          photo_evidence: photoUrls,
          updated_at: new Date().toISOString(),
        })
        .eq("id", briefingId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefings"] });
      queryClient.invalidateQueries({ queryKey: ["briefing", briefingId] });
      toast({
        title: "Photos saved",
        description: "Photo evidence has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle file selection
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid file",
            description: `${file.name} is not an image`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 10MB limit`,
            variant: "destructive",
          });
          continue;
        }

        // Compress image if needed
        const compressedFile = await compressImage(file);

        // Upload to Supabase Storage
        const fileName = `briefing-photos/${user.id}/${briefingId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

        const { data, error } = await supabase.storage
          .from("visual-uploads")
          .upload(fileName, compressedFile, {
            contentType: file.type,
            upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("visual-uploads")
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      if (uploadedUrls.length > 0) {
        const newPhotos = [...photos, ...uploadedUrls];
        setPhotos(newPhotos);
        toast({
          title: "Photos uploaded",
          description: `${uploadedUrls.length} photo(s) added successfully.`,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Could not upload photos",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (cameraInputRef.current) cameraInputRef.current.value = "";
    }
  };

  // Compress image to reduce file size
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        // Calculate new dimensions (max 1920px)
        const maxDimension = 1920;
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          0.85
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  // Remove a photo
  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  // Save all photos
  const handleSave = () => {
    savePhotosMutation.mutate(photos);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10">
                  <Image className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Photo Evidence</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Capture attendance or site photos
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Upload buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button
                variant="outline"
                onClick={() => cameraInputRef.current?.click()}
                disabled={uploading}
                className="h-16 flex flex-col items-center justify-center gap-1"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-blue-400" />
                )}
                <span className="text-xs">Take Photo</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="h-16 flex flex-col items-center justify-center gap-1"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6 text-purple-400" />
                )}
                <span className="text-xs">Upload Photo</span>
              </Button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Photo grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border border-border group"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Delete overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-black/50 flex items-center justify-center",
                        "opacity-0 group-hover:opacity-100 transition-opacity"
                      )}
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemovePhoto(index)}
                        className="h-8"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    {/* Index badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  No photos added yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Take or upload photos to document attendance
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 mt-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-medium text-foreground mb-2 text-sm">Photo Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Capture the group at the start of the briefing</li>
                <li>• Include any hazardous areas discussed</li>
                <li>• Document site conditions or equipment</li>
                <li>• Photos are attached to the PDF export</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border shrink-0">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={savePhotosMutation.isPending}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700"
              >
                {savePhotosMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Save Photos ({photos.length})
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
