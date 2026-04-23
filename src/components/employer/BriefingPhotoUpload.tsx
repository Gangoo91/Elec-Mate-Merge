import { useState, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Camera, Image, Upload, Loader2, Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from './editorial';

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
        .from('briefings')
        .update({
          photo_evidence: photoUrls,
          updated_at: new Date().toISOString(),
        })
        .eq('id', briefingId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['briefings'] });
      queryClient.invalidateQueries({ queryKey: ['briefing', briefingId] });
      toast({
        title: 'Photos saved',
        description: 'Photo evidence has been updated.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Save failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Handle file selection
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: 'Invalid file',
            description: `${file.name} is not an image`,
            variant: 'destructive',
          });
          continue;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds 10MB limit`,
            variant: 'destructive',
          });
          continue;
        }

        // Compress image if needed
        const compressedFile = await compressImage(file);

        // Upload to Supabase Storage
        const fileName = `briefing-photos/${user.id}/${briefingId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

        const { data, error } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, compressedFile, {
            contentType: file.type,
            upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage.from('visual-uploads').getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      if (uploadedUrls.length > 0) {
        const newPhotos = [...photos, ...uploadedUrls];
        setPhotos(newPhotos);
        toast({
          title: 'Photos uploaded',
          description: `${uploadedUrls.length} photo(s) added successfully.`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Could not upload photos',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  // Compress image to reduce file size
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

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
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          0.85
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
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
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <SheetShell
          eyebrow="Photo evidence"
          title="Upload Photos"
          description="Capture attendance or site photos"
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={savePhotosMutation.isPending}
                fullWidth
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
              </PrimaryButton>
            </>
          }
        >
          {/* Upload buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={uploading}
              className="h-20 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white disabled:opacity-40"
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Camera className="h-6 w-6 text-blue-400" />
              )}
              <span className="text-xs">Take Photo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="h-20 flex flex-col items-center justify-center gap-1 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation text-white disabled:opacity-40"
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-purple-400" />
              )}
              <span className="text-xs">Upload Photo</span>
            </button>
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
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.08] group"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Delete overlay - desktop only */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-black/50 flex items-center justify-center',
                      'sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hidden sm:flex'
                    )}
                  >
                    <DestructiveButton onClick={() => handleRemovePhoto(index)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </DestructiveButton>
                  </div>
                  {/* Delete button - mobile only */}
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="sm:hidden absolute bottom-1.5 right-1.5 flex items-center justify-center w-9 h-9 rounded-full bg-red-500/80 backdrop-blur-sm text-white touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {/* Index badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-xs">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <FormCard>
              <div className="text-center py-8">
                <Image className="h-16 w-16 text-white mx-auto mb-4 opacity-50" />
                <p className="text-sm text-white">No photos added yet</p>
                <p className="text-xs text-white mt-1">
                  Take or upload photos to document attendance
                </p>
              </div>
            </FormCard>
          )}

          {/* Instructions */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h4 className="font-medium text-white mb-2 text-sm">Photo Tips</h4>
            <ul className="text-xs text-white space-y-1">
              <li>• Capture the group at the start of the briefing</li>
              <li>• Include any hazardous areas discussed</li>
              <li>• Document site conditions or equipment</li>
              <li>• Photos are attached to the PDF export</li>
            </ul>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
