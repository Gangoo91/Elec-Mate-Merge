/**
 * SolarPVPhotos.tsx
 * Photo documentation for Solar PV Installation Certificate
 *
 * Categories specific to solar PV installations:
 * - Array photos (panels on roof)
 * - Inverter installation
 * - Meter setup
 * - Isolator positions
 * - Labels and signage
 * - General installation
 */

import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Image, Loader2, ZoomIn, Sun, Zap, Gauge, Power, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CertificatePhoto, PVArray, Inverter } from '@/types/solar-pv';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SolarPVPhotosProps {
  photos: CertificatePhoto[];
  arrays: PVArray[];
  inverters: Inverter[];
  onPhotosChange: (photos: CertificatePhoto[]) => void;
  certificateId?: string;
}

const PHOTO_CATEGORIES = [
  { value: 'array', label: 'PV Array', icon: Sun, color: 'text-amber-400' },
  { value: 'inverter', label: 'Inverter', icon: Zap, color: 'text-blue-400' },
  { value: 'meter', label: 'Meter', icon: Gauge, color: 'text-green-400' },
  { value: 'isolator', label: 'Isolator', icon: Power, color: 'text-red-400' },
  { value: 'label', label: 'Labels & Signage', icon: Tag, color: 'text-purple-400' },
  { value: 'general', label: 'General', icon: Image, color: 'text-gray-400' },
] as const;

export const SolarPVPhotos: React.FC<SolarPVPhotosProps> = ({
  photos,
  arrays,
  inverters,
  onPhotosChange,
  certificateId,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CertificatePhoto['category']>('array');
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
      const filePath = `solar-pv/${user.id}/${folderPath}/${fileName}`;

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
        caption: caption || '',
        category: selectedCategory,
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

  const getCategoryIcon = (category: CertificatePhoto['category']) => {
    const cat = PHOTO_CATEGORIES.find(c => c.value === category);
    return cat ? cat.icon : Image;
  };

  const getCategoryColor = (category: CertificatePhoto['category']) => {
    const cat = PHOTO_CATEGORIES.find(c => c.value === category);
    return cat ? cat.color : 'text-gray-400';
  };

  const getCategoryLabel = (category: CertificatePhoto['category']): string => {
    return PHOTO_CATEGORIES.find(c => c.value === category)?.label || category;
  };

  const photosByCategory = PHOTO_CATEGORIES.map(cat => ({
    ...cat,
    photos: photos.filter(p => p.category === cat.value),
  })).filter(cat => cat.photos.length > 0);

  // Get link options based on selected category
  const getLinkOptions = () => {
    if (selectedCategory === 'array' && arrays.length > 0) {
      return arrays.map((arr, idx) => ({
        id: arr.id,
        label: `Array ${idx + 1} - ${arr.panelMake} ${arr.panelModel}`,
      }));
    }
    if (selectedCategory === 'inverter' && inverters.length > 0) {
      return inverters.map((inv, idx) => ({
        id: inv.id,
        label: `Inverter ${idx + 1} - ${inv.make} ${inv.model}`,
      }));
    }
    return [];
  };

  const linkOptions = getLinkOptions();

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
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/20">
                {PHOTO_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${cat.color}`} />
                        {cat.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {linkOptions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Link to {selectedCategory === 'array' ? 'Array' : 'Inverter'} (Optional)
              </Label>
              <Select value={selectedLinkedId} onValueChange={setSelectedLinkedId}>
                <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                  <SelectValue placeholder={`Select ${selectedCategory}...`} />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/20">
                  <SelectItem value="">No link</SelectItem>
                  {linkOptions.map(opt => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label}
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
            placeholder="e.g., South-facing array on main roof"
            className="h-11 touch-manipulation bg-elec-gray border-white/30"
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

        {/* Photo Requirements Info */}
        <div className="text-xs text-muted-foreground bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <p className="font-medium text-amber-400 mb-1">MCS Photo Requirements:</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>At least one photo of each PV array</li>
            <li>Inverter installation showing labels</li>
            <li>AC and DC isolator positions</li>
            <li>Generation meter reading</li>
            <li>Warning labels at main switchboard</li>
          </ul>
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="space-y-4">
          {photosByCategory.map(category => {
            const Icon = category.icon;
            return (
              <div key={category.value} className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${category.color}`} />
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
                        <DialogContent className="max-w-3xl p-2 bg-elec-gray border-white/20">
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

                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-xs text-white truncate">
                          {photo.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <Sun className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No photos added yet</p>
          <p className="text-xs">Upload photos to document the installation</p>
        </div>
      )}

      {/* Photo Count Summary */}
      {photos.length > 0 && (
        <div className="bg-card/50 border border-white/10 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Photos</span>
            <span className="font-semibold text-amber-400">{photos.length}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {PHOTO_CATEGORIES.map(cat => {
              const count = photos.filter(p => p.category === cat.value).length;
              if (count === 0) return null;
              const Icon = cat.icon;
              return (
                <div key={cat.value} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon className={`h-3 w-3 ${cat.color}`} />
                  {count}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarPVPhotos;
