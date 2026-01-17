import { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Camera, Upload, Loader2, MapPin, X, Image as ImageIcon } from 'lucide-react';
import { useUploadJobPhoto, type PhotoCategory } from '@/hooks/useJobPhotos';
import { useJobs } from '@/hooks/useJobs';

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
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const activeJobs = jobs.filter(j => j.status === 'Active' || j.status === 'Pending');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setUseLocation(true);
        setGettingLocation(false);
      },
      () => {
        setGettingLocation(false);
      },
      { enableHighAccuracy: true }
    );
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

    // Reset form
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
        className={cn(
          "flex flex-col p-0",
          isMobile ? "h-[90vh] rounded-t-2xl" : "w-[450px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-elec-yellow" />
            Upload Photo
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Photo</Label>
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
                  className="w-full aspect-video object-cover rounded-xl border border-border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleClearFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer hover:border-elec-yellow/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Tap to select a photo</p>
                <p className="text-xs text-muted-foreground/60">or use your camera</p>
              </div>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg border transition-all touch-manipulation",
                    category === cat.value
                      ? "border-elec-yellow bg-elec-yellow/10"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <div className={cn("h-3 w-3 rounded-full", cat.color)} />
                  <span className="text-[10px] font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Job Selection */}
          <div className="space-y-2">
            <Label>Job (optional)</Label>
            <Select value={jobId || "none"} onValueChange={(v) => setJobId(v === "none" ? "" : v)}>
              <SelectTrigger className="h-12 touch-manipulation">
                <SelectValue placeholder="Select a job..." />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value="none">No job selected</SelectItem>
                {activeJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} - {job.client}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this photo..."
              className="min-h-[80px] touch-manipulation"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label>Location</Label>
            {location ? (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <MapPin className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm flex-1">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLocation(null);
                    setUseLocation(false);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-12 touch-manipulation"
                onClick={handleGetLocation}
                disabled={gettingLocation}
              >
                {gettingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 mr-2" />
                    Add Current Location
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe space-y-3">
          <Button
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-12"
            onClick={handleUpload}
            disabled={!selectedFile || uploadPhoto.isPending}
          >
            {uploadPhoto.isPending ? (
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
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
