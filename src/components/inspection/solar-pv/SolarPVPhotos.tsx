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
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CertificatePhoto, PVArray, Inverter } from '@/types/solar-pv';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface SolarPVPhotosProps {
  photos: CertificatePhoto[];
  arrays: PVArray[];
  inverters: Inverter[];
  onPhotosChange: (photos: CertificatePhoto[]) => void;
  certificateId?: string;
}

const PHOTO_CATEGORIES = [
  { value: 'array', label: 'PV Array' },
  { value: 'inverter', label: 'Inverter' },
  { value: 'meter', label: 'Meter' },
  { value: 'isolator', label: 'Isolator' },
  { value: 'label', label: 'Labels & Signage' },
  { value: 'general', label: 'General' },
] as const;

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const selectTriggerCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none data-[state=open]:border-elec-yellow data-[state=open]:ring-0 touch-manipulation';

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
      const {
        data: { publicUrl },
      } = supabase.storage.from('inspection-photos').getPublicUrl(filePath);

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

  const getCategoryLabel = (category: CertificatePhoto['category']): string => {
    return PHOTO_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  const photosByCategory = PHOTO_CATEGORIES.map((cat) => ({
    ...cat,
    photos: photos.filter((p) => p.category === cat.value),
  })).filter((cat) => cat.photos.length > 0);

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
    <div className="space-y-4">
      {/* Upload Section */}
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Add Photo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Photo Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(v) => setSelectedCategory(v as CertificatePhoto['category'])}
            >
              <SelectTrigger className={selectTriggerCn}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-elec-gray border-white/[0.12] text-white">
                {PHOTO_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {linkOptions.length > 0 && (
            <div>
              <Label className={labelCn}>
                Link to {selectedCategory === 'array' ? 'Array' : 'Inverter'} (Optional)
              </Label>
              <Select value={selectedLinkedId} onValueChange={setSelectedLinkedId}>
                <SelectTrigger className={selectTriggerCn}>
                  <SelectValue placeholder={`Select ${selectedCategory}...`} />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-elec-gray border-white/[0.12] text-white">
                  <SelectItem value="">No link</SelectItem>
                  {linkOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div>
          <Label className={labelCn}>Caption (Optional)</Label>
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. South-facing array on main roof"
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

        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-12 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation disabled:bg-elec-yellow disabled:text-black disabled:opacity-100"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin text-black" />
              Uploading...
            </>
          ) : (
            'Upload Photo'
          )}
        </Button>

        {/* Photo Requirements Info */}
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-[12px] font-semibold text-elec-yellow mb-1">MCS photo requirements</p>
          <ul className="space-y-0.5 list-disc list-inside text-[12px] text-white/90">
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
        <div className={cardCn}>
          {photosByCategory.map((category) => (
            <div key={category.value} className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                {category.label} ({category.photos.length})
              </h3>
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
                      <DialogContent className="max-w-3xl p-2 bg-elec-gray border-white/[0.12]">
                        <img
                          src={photo.url}
                          alt={photo.caption || getCategoryLabel(photo.category)}
                          className="w-full h-auto rounded-xl"
                        />
                        {photo.caption && (
                          <p className="text-center text-sm text-white mt-2">{photo.caption}</p>
                        )}
                      </DialogContent>
                    </Dialog>

                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={() => deletePhoto(photo.id)}
                      className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90 text-white text-base leading-none"
                    >
                      &times;
                    </button>

                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-[11px] text-white truncate rounded-b-xl">
                        {photo.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={cardCn}>
          <div className="rounded-xl border border-dashed border-white/[0.2] p-6 text-center">
            <p className="text-sm text-white">No photos added yet</p>
            <p className="text-[12px] text-white/80 mt-0.5">Upload photos to document the installation</p>
          </div>
        </div>
      )}

      {/* Photo Count Summary */}
      {photos.length > 0 && (
        <div className={cardCn}>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Total Photos</span>
            <span className="font-semibold text-elec-yellow">{photos.length}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {PHOTO_CATEGORIES.map((cat) => {
              const count = photos.filter((p) => p.category === cat.value).length;
              if (count === 0) return null;
              return (
                <span key={cat.value} className="text-[12px] text-white/90">
                  {cat.label}: <span className="font-semibold text-white">{count}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarPVPhotos;
