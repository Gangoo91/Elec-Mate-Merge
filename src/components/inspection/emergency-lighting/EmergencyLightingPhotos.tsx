import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Image, Loader2, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CertificatePhoto, Luminaire } from '@/types/emergency-lighting';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EmergencyLightingPhotosProps {
  photos: CertificatePhoto[];
  luminaires: Luminaire[];
  defects: { id: string; description: string }[];
  onPhotosChange: (photos: CertificatePhoto[]) => void;
  certificateId?: string;
}

const PHOTO_CATEGORIES = [
  { value: 'installation', label: 'Installation Overview' },
  { value: 'luminaire', label: 'Luminaire' },
  { value: 'central-battery', label: 'Central Battery' },
  { value: 'exit-sign', label: 'Exit Sign' },
] as const;

export const EmergencyLightingPhotos: React.FC<EmergencyLightingPhotosProps> = ({
  photos,
  luminaires,
  defects,
  onPhotosChange,
  certificateId,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CertificatePhoto['category']>('installation');
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
      const { data: { user } } = await supabase.auth.getUser();
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
      const { data: { publicUrl } } = supabase.storage
        .from('inspection-photos')
        .getPublicUrl(filePath);

      // Create photo object
      const newPhoto: CertificatePhoto = {
        id: photoId,
        url: publicUrl,
        caption: caption || undefined,
        uploadedAt: new Date().toISOString(),
        category: selectedCategory,
        linkedItemId: selectedLinkedId || undefined,
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
    const photo = photos.find(p => p.id === photoId);
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

    onPhotosChange(photos.filter(p => p.id !== photoId));
    toast.success('Photo deleted');
  };

  const getLinkedItemName = (photo: CertificatePhoto): string => {
    if (!photo.linkedItemId) return '';

    if (photo.category === 'luminaire') {
      const luminaire = luminaires.find(l => l.id === photo.linkedItemId);
      return luminaire ? `#${luminaires.indexOf(luminaire) + 1} - ${luminaire.location}` : '';
    }

    if (photo.category === 'defect') {
      const defect = defects.find(d => d.id === photo.linkedItemId);
      return defect ? defect.description.substring(0, 30) + '...' : '';
    }

    return '';
  };

  const getCategoryLabel = (category: CertificatePhoto['category']): string => {
    return PHOTO_CATEGORIES.find(c => c.value === category)?.label || category;
  };

  const photosByCategory = PHOTO_CATEGORIES.map(cat => ({
    ...cat,
    photos: photos.filter(p => p.category === cat.value),
  })).filter(cat => cat.photos.length > 0);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-card/50 border border-white/10 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Camera className="h-4 w-4 text-amber-400" />
          Add Photo
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Photo Category</Label>
            <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as CertificatePhoto['category'])}>
              <SelectTrigger className="h-11 touch-manipulation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PHOTO_CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory === 'luminaire' && luminaires.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Link to Luminaire (Optional)</Label>
              <Select value={selectedLinkedId} onValueChange={setSelectedLinkedId}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select luminaire..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No link</SelectItem>
                  {luminaires.map((lum, idx) => (
                    <SelectItem key={lum.id} value={lum.id}>
                      #{idx + 1} - {lum.location || 'Unnamed'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

                  </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Caption (Optional)</Label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g., Ground floor corridor exit sign"
            className="h-11 touch-manipulation"
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

        <div className="flex gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex-1 h-11 touch-manipulation bg-amber-600 hover:bg-amber-700"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="space-y-4">
          {photosByCategory.map(category => (
            <div key={category.value} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Image className="h-4 w-4" />
                {category.label} ({category.photos.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {category.photos.map(photo => (
                  <div key={photo.id} className="relative group">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="aspect-square rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-amber-500/50 transition-colors">
                          <img
                            src={photo.url}
                            alt={photo.caption || getCategoryLabel(photo.category)}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-2">
                        <img
                          src={photo.url}
                          alt={photo.caption || getCategoryLabel(photo.category)}
                          className="w-full h-auto rounded-lg"
                        />
                        {photo.caption && (
                          <p className="text-center text-sm text-muted-foreground mt-2">{photo.caption}</p>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deletePhoto(photo.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

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
        <div className="text-center py-8 text-muted-foreground">
          <Image className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No photos added yet</p>
          <p className="text-xs">Upload photos to document the installation</p>
        </div>
      )}
    </div>
  );
};
