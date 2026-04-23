import { useState, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Upload, Loader2, MapPin, X, Image as ImageIcon } from 'lucide-react';
import { useUploadJobPhoto, type PhotoCategory } from '@/hooks/useJobPhotos';
import { useJobs } from '@/hooks/useJobs';
import { getCurrentPosition } from '@/utils/geolocation';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

const CATEGORIES: { value: PhotoCategory; label: string; color: string }[] = [
  { value: 'Before', label: 'Before', color: 'bg-blue-500' },
  { value: 'During', label: 'During', color: 'bg-amber-500' },
  { value: 'After', label: 'After', color: 'bg-emerald-500' },
  { value: 'Completion', label: 'Completion', color: 'bg-purple-500' },
  { value: 'Issue', label: 'Issue', color: 'bg-red-500' },
];

interface UploadPhotoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadPhotoSheet({ open, onOpenChange }: UploadPhotoSheetProps) {
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadPhoto = useUploadJobPhoto();
  const { data: jobs = [] } = useJobs();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [category, setCategory] = useState<PhotoCategory>('Before');
  const [jobId, setJobId] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(
    null
  );
  const [gettingLocation, setGettingLocation] = useState(false);

  const activeJobs = jobs.filter((j) => j.status === 'Active' || j.status === 'Pending');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGetLocation = async () => {
    setGettingLocation(true);
    try {
      const position = await getCurrentPosition({ enableHighAccuracy: true });
      setLocation({ lat: position.latitude, lng: position.longitude });
      setUseLocation(true);
    } catch {
      // Location unavailable — silently continue
    } finally {
      setGettingLocation(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadPhoto.mutateAsync({
      file: selectedFile,
      jobId: jobId || undefined,
      category,
      notes: notes || undefined,
      location: useLocation && location ? location : undefined,
    });

    setSelectedFile(null);
    setPreview(null);
    setCategory('Before');
    setJobId('');
    setNotes('');
    setLocation(null);
    setUseLocation(false);
    onOpenChange(false);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn('p-0 overflow-hidden', isMobile ? 'h-[90vh]' : 'w-[480px]')}
      >
        <SheetShell
          eyebrow="Job photos"
          title="Upload photo"
          description="Attach a photo to a job with category, location, and notes."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleUpload}
                disabled={!selectedFile || uploadPhoto.isPending}
                fullWidth
              >
                {uploadPhoto.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-1.5" />
                    Upload photo
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Photo">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full aspect-video object-cover rounded-xl border border-white/[0.06]"
                />
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className="border border-dashed border-white/[0.12] rounded-xl bg-[hsl(0_0%_9%)] p-8 text-center cursor-pointer hover:border-elec-yellow/50 hover:bg-[hsl(0_0%_11%)] active:bg-[hsl(0_0%_13%)] transition-all touch-manipulation"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-12 w-12 text-white mx-auto mb-3" />
                <p className="text-[13px] text-white mb-1">Tap to select a photo</p>
                <p className="text-[11px] text-white">or use your camera</p>
              </div>
            )}
          </FormCard>

          <FormCard eyebrow="Category">
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-2 rounded-xl border transition-all touch-manipulation',
                    category === cat.value
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-white/[0.08] bg-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_11%)]'
                  )}
                >
                  <div className={cn('h-2.5 w-2.5 rounded-full', cat.color)} />
                  <span className="text-[10px] font-medium text-white">{cat.label}</span>
                </button>
              ))}
            </div>
          </FormCard>

          <FormCard eyebrow="Metadata">
            <Field label="Job (optional)">
              <Select
                value={jobId || 'none'}
                onValueChange={(v) => setJobId(v === 'none' ? '' : v)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select a job..." />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">No job selected</SelectItem>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Notes (optional)">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about this photo..."
                className={`${textareaClass} min-h-[80px]`}
              />
            </Field>
            <div className="space-y-1.5">
              <label className={fieldLabelClass}>Location</label>
              {location ? (
                <div className="flex items-center gap-2 p-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  <span className="text-[12px] text-white flex-1 tabular-nums">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLocation(null);
                      setUseLocation(false);
                    }}
                    className="text-[11px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <SecondaryButton
                  onClick={handleGetLocation}
                  disabled={gettingLocation}
                  fullWidth
                >
                  {gettingLocation ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Getting location...
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-1.5" />
                      Add current location
                    </>
                  )}
                </SecondaryButton>
              )}
            </div>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
