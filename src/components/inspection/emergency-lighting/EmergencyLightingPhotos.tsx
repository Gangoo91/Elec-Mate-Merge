import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useHaptic } from '@/hooks/useHaptic';
import { CertificatePhoto, Luminaire } from '@/types/emergency-lighting';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface EmergencyLightingPhotosProps {
  photos: CertificatePhoto[];
  luminaires: Luminaire[];
  defects: { id: string; description: string }[];
  onPhotosChange: (photos: CertificatePhoto[]) => void;
  certificateId?: string;
}

const PHOTO_CATEGORIES = [
  { value: 'installation', label: 'Installation overview' },
  { value: 'luminaire', label: 'Luminaire' },
  { value: 'central-battery', label: 'Central battery' },
  { value: 'exit-sign', label: 'Exit sign' },
] as const;

// Gallery grouping includes 'defect' — defect photos are captured from defect
// rows in Test Results (not via the upload picker) but must still show here.
const GALLERY_CATEGORIES = [
  ...PHOTO_CATEGORIES,
  { value: 'defect', label: 'Defect evidence' },
] as const;

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

// Sub-heading inside the photo card — rule above, plain type. No hairlines.
const GroupHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{children}</h3>
  </div>
);

export const EmergencyLightingPhotos: React.FC<EmergencyLightingPhotosProps> = ({
  photos,
  luminaires,
  defects,
  onPhotosChange,
  certificateId,
}) => {
  const haptic = useHaptic();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CertificatePhoto['category']>('installation');
  const [selectedLinkedId, setSelectedLinkedId] = useState<string>('');
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1600;
          const maxHeight = 1200;

          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            0.8
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const uploadPhoto = async (file: File) => {
    setIsUploading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Compress the image
      const compressedBlob = await compressImage(file);

      // Generate file path
      const photoId = uuidv4();
      const fileName = `${photoId}.jpg`;
      const folderPath = certificateId || 'temp';
      const filePath = `emergency-lighting/${user.id}/${folderPath}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('inspection-photos')
        .upload(filePath, compressedBlob, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(filePath);

      // Create photo object
      const newPhoto: CertificatePhoto = {
        id: photoId,
        url: publicUrl,
        caption: caption || undefined,
        uploadedAt: new Date().toISOString(),
        category: selectedCategory,
        linkedItemId: selectedLinkedId && selectedLinkedId !== 'none' ? selectedLinkedId : undefined,
      };

      onPhotosChange([...photos, newPhoto]);

      // Reset form
      setCaption('');
      setSelectedLinkedId('');

      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload photo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        await uploadPhoto(file);
      }
    }
  };

  const deletePhoto = async (photoId: string) => {
    const photo = photos.find((p) => p.id === photoId);
    if (!photo) return;

    try {
      // Extract file path from URL and delete from storage
      const urlParts = photo.url.split('/inspection-photos/');
      if (urlParts.length > 1) {
        const filePath = decodeURIComponent(urlParts[1]);
        await supabase.storage.from('inspection-photos').remove([filePath]);
      }
    } catch (error) {
      console.error('Error deleting from storage:', error);
    }

    onPhotosChange(photos.filter((p) => p.id !== photoId));
    toast.success('Photo deleted');
  };

  const getLinkedItemName = (photo: CertificatePhoto): string => {
    if (!photo.linkedItemId) return '';

    if (photo.category === 'luminaire') {
      const luminaire = luminaires.find((l) => l.id === photo.linkedItemId);
      return luminaire ? `#${luminaires.indexOf(luminaire) + 1} - ${luminaire.location}` : '';
    }

    if (photo.category === 'defect') {
      const defect = defects.find((d) => d.id === photo.linkedItemId);
      return defect ? defect.description.substring(0, 30) + '...' : '';
    }

    return '';
  };

  const getCategoryLabel = (category: CertificatePhoto['category']): string => {
    return GALLERY_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const photosByCategory = GALLERY_CATEGORIES.map((cat) => ({
    ...cat,
    photos: photos.filter((p) => p.category === cat.value),
  })).filter((cat) => cat.photos.length > 0);

  return (
    <div
      className="space-y-4"
      // Delegated press haptic — every chip/button tap here buzzes without
      // wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Upload section */}
      <div className="space-y-4">
        <GroupHeading>Add photo</GroupHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Photo category</Label>
            <MobileSelectPicker
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v as CertificatePhoto['category'])}
              options={PHOTO_CATEGORIES.map((cat) => ({ value: cat.value, label: cat.label }))}
              placeholder="Select..."
              title="Photo category"
              triggerClassName={pickerTrigger}
            />
          </div>

          {selectedCategory === 'luminaire' && luminaires.length > 0 && (
            <div>
              <Label className={labelCn}>Link to luminaire (optional)</Label>
              <MobileSelectPicker
                value={selectedLinkedId}
                onValueChange={setSelectedLinkedId}
                options={[
                  { value: 'none', label: 'No link' },
                  ...luminaires.map((lum, idx) => ({
                    value: lum.id,
                    label: `#${idx + 1} — ${lum.location || 'Unnamed'}`,
                  })),
                ]}
                placeholder="Select luminaire..."
                title="Link to luminaire"
                triggerClassName={pickerTrigger}
              />
            </div>
          )}
        </div>

        <div>
          <Label className={labelCn}>Caption (optional)</Label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g., Ground floor corridor exit sign"
            className={inputCn}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-black" />
              Uploading…
            </>
          ) : (
            'Upload photo'
          )}
        </button>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="space-y-4">
          {photosByCategory.map((category) => (
            <div key={category.value} className="space-y-2">
              <GroupHeading>
                {category.label} <span className="text-white/85">({category.photos.length})</span>
              </GroupHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {category.photos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-xl overflow-hidden border border-white/[0.12] cursor-pointer touch-manipulation">
                          <img
                            src={photo.url}
                            alt={photo.caption || getCategoryLabel(photo.category)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-2">
                        <img
                          src={photo.url}
                          alt={photo.caption || getCategoryLabel(photo.category)}
                          className="w-full h-auto rounded-lg"
                        />
                        {photo.caption && (
                          <p className="text-center text-sm text-white mt-2">{photo.caption}</p>
                        )}
                      </DialogContent>
                    </Dialog>

                    <button
                      type="button"
                      className="absolute top-1.5 right-1.5 h-9 rounded-lg bg-black/70 px-2.5 text-xs font-medium text-white touch-manipulation"
                      onClick={() => deletePhoto(photo.id)}
                    >
                      Remove
                    </button>

                    {(photo.caption || photo.linkedItemId) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-xs text-white truncate">
                        {photo.caption || getLinkedItemName(photo)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm font-medium text-white">No photos added yet</p>
          <p className="text-xs text-white/80 mt-1">Upload photos to document the installation</p>
        </div>
      )}
    </div>
  );
};
