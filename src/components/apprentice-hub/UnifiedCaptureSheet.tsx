/**
 * UnifiedCaptureSheet
 *
 * Quick capture bottom sheet for adding evidence.
 * Wraps capture flow with option to link to Portfolio, OJT Hours, or Both.
 */

import { useState, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Camera,
  Upload,
  Link2,
  Video,
  FileText,
  X,
  Sparkles,
  Loader2,
  Check,
  Briefcase,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useAIEvidenceTagger } from '@/hooks/portfolio/useAIEvidenceTagger';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface UnifiedCaptureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

type LinkTo = 'portfolio' | 'ojt' | 'both';
type CaptureStep = 'capture' | 'details' | 'saving';

const FALLBACK_CATEGORIES = [
  'Practical Skills',
  'Health & Safety',
  'Testing & Inspection',
  'Technical Knowledge',
  'Workplace Practice',
];

export function UnifiedCaptureSheet({
  open,
  onOpenChange,
  onComplete,
}: UnifiedCaptureSheetProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { addEntry } = usePortfolioData();
  const { addTimeEntry } = useTimeEntries();
  const { analyze, isAnalyzing } = useAIEvidenceTagger();
  const { requirementCode } = useStudentQualification();
  const { tree } = useQualificationACs(requirementCode);

  // Dynamic categories from qualification units
  const categories = tree.units.length > 0
    ? tree.units.map(u => `Unit ${u.unitCode}: ${u.unitTitle}`)
    : FALLBACK_CATEGORIES;

  // Form state
  const [step, setStep] = useState<CaptureStep>('capture');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [linkTo, setLinkTo] = useState<LinkTo>('portfolio');
  const [ojtDuration, setOjtDuration] = useState('');

  // AI suggestions
  const [suggestions, setSuggestions] = useState<any>(null);
  const [selectedKsbs, setSelectedKsbs] = useState<string[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Reset form
  const resetForm = () => {
    setStep('capture');
    setFile(null);
    setPreviewUrl('');
    setUploadedUrl('');
    setIsUploading(false);
    setTitle('');
    setDescription('');
    setCategory('');
    setLinkTo('portfolio');
    setOjtDuration('');
    setSuggestions(null);
    setSelectedKsbs([]);
  };

  // Upload file to Supabase Storage
  const uploadFile = async (fileToUpload: File): Promise<string | null> => {
    if (!user?.id) {
      toast({
        title: 'Not authenticated',
        description: 'Please sign in to upload files',
        variant: 'destructive',
      });
      return null;
    }

    setIsUploading(true);
    try {
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('portfolio-evidence')
        .upload(fileName, fileToUpload, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        // If bucket doesn't exist, fall back to preview URL
        console.warn('Storage upload failed:', error.message);
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-evidence')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Get evidence type from file
  const getEvidenceType = (fileType: string): 'image' | 'document' | 'video' => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    return 'document';
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }

    // Move to details step
    setStep('details');

    // Upload file to storage
    const storageUrl = await uploadFile(selectedFile);
    if (storageUrl) {
      setUploadedUrl(storageUrl);

      // Auto-analyze with AI using uploaded URL
      try {
        const analysis = await analyze({
          evidenceUrl: storageUrl,
          evidenceType: getEvidenceType(selectedFile.type),
          title: title || undefined,
          description: description || undefined,
        });
        if (analysis) {
          setSuggestions(analysis);
          // Auto-select high-confidence KSBs
          const autoSelected = analysis.ksb_suggestions
            ?.filter((k: any) => k.confidence >= 0.8)
            .map((k: any) => k.code) || [];
          setSelectedKsbs(autoSelected);

          // Auto-fill title if empty and detected
          if (!title && analysis.detected_content?.description) {
            // Use first sentence of description as title
            const firstSentence = analysis.detected_content.description.split('.')[0];
            setTitle(firstSentence.slice(0, 100));
          }
        }
      } catch (error) {
        console.error('AI analysis error:', error);
      }
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for this evidence',
        variant: 'destructive',
      });
      return;
    }

    setStep('saving');

    try {
      // Use uploaded URL, or upload now if not done yet
      let finalUrl = uploadedUrl;
      if (file && !finalUrl) {
        finalUrl = await uploadFile(file) || previewUrl;
      }

      const evidenceFile = file ? {
        name: file.name,
        type: file.type,
        url: finalUrl || previewUrl,
      } : null;

      // Add to portfolio
      if (linkTo === 'portfolio' || linkTo === 'both') {
        await addEntry({
          title,
          description,
          category: category || 'Practical Skills',
          skills: selectedKsbs,
          evidenceFiles: evidenceFile ? [evidenceFile] : [],
          status: 'draft',
          dateCreated: new Date().toISOString(),
        });
      }

      // Add to OJT time
      if ((linkTo === 'ojt' || linkTo === 'both') && ojtDuration) {
        await addTimeEntry({
          date: new Date().toISOString().split('T')[0],
          duration: parseFloat(ojtDuration) * 60, // Convert hours to minutes
          activity: title,
          notes: description,
        });
      }

      toast({
        title: 'Evidence saved',
        description: linkTo === 'both'
          ? 'Added to portfolio and logged as training time'
          : linkTo === 'ojt'
          ? 'Logged as training time'
          : 'Added to portfolio',
      });

      resetForm();
      onComplete();
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Error saving',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setStep('details');
    }
  };

  // Toggle KSB selection
  const toggleKsb = (code: string) => {
    setSelectedKsbs((prev) =>
      prev.includes(code) ? prev.filter((k) => k !== code) : [...prev, code]
    );
  };

  return (
    <Sheet open={open} onOpenChange={(v) => {
      if (!v) resetForm();
      onOpenChange(v);
    }}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pb-4">
            <SheetTitle>Add Evidence</SheetTitle>
            <SheetDescription>
              {step === 'capture' && 'Capture or upload evidence for your portfolio'}
              {step === 'details' && 'Add details about this evidence'}
              {step === 'saving' && 'Saving your evidence...'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4">
            {/* Step 1: Capture */}
            {step === 'capture' && (
              <div className="space-y-6 py-4">
                {/* Capture Options */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-elec-yellow/10 border-2 border-elec-yellow/20 hover:border-elec-yellow/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-elec-yellow/20">
                      <Camera className="h-6 w-6 text-elec-yellow" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Camera</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-blue-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-blue-500/20">
                      <Upload className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Upload</span>
                  </button>

                  <button
                    onClick={() => {
                      setStep('details');
                    }}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-green-500/10 border-2 border-green-500/20 hover:border-green-500/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-green-500/20">
                      <Link2 className="h-6 w-6 text-green-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Link</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-purple-500/10 border-2 border-purple-500/20 hover:border-purple-500/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Video className="h-6 w-6 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Video</span>
                  </button>
                </div>

                {/* Hidden inputs */}
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
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Info */}
                <p className="text-xs text-white/80 text-center">
                  Max file size: 10MB. Supported: Images, Videos, PDFs, Documents
                </p>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && (
              <div className="space-y-5 py-4">
                {/* Preview */}
                {previewUrl && (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl('');
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Upload/Analyzing indicator */}
                {(isUploading || isAnalyzing) && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                    <span className="text-sm text-elec-yellow">
                      {isUploading ? 'Uploading file...' : 'AI analysing evidence...'}
                    </span>
                  </div>
                )}

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    placeholder="What is this evidence?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Add details about this evidence..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="touch-manipulation"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Link To Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Link to</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setLinkTo('portfolio')}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors touch-manipulation min-h-[60px]',
                        linkTo === 'portfolio'
                          ? 'border-elec-yellow bg-elec-yellow/10'
                          : 'border-border hover:border-muted-foreground/50'
                      )}
                    >
                      <Briefcase className={cn('h-5 w-5', linkTo === 'portfolio' ? 'text-elec-yellow' : 'text-white/80')} />
                      <span className="text-xs font-medium">Portfolio</span>
                    </button>
                    <button
                      onClick={() => setLinkTo('ojt')}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors touch-manipulation min-h-[60px]',
                        linkTo === 'ojt'
                          ? 'border-elec-yellow bg-elec-yellow/10'
                          : 'border-border hover:border-muted-foreground/50'
                      )}
                    >
                      <Clock className={cn('h-5 w-5', linkTo === 'ojt' ? 'text-elec-yellow' : 'text-white/80')} />
                      <span className="text-xs font-medium">OJT Hours</span>
                    </button>
                    <button
                      onClick={() => setLinkTo('both')}
                      className={cn(
                        'flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-colors touch-manipulation min-h-[60px]',
                        linkTo === 'both'
                          ? 'border-elec-yellow bg-elec-yellow/10'
                          : 'border-border hover:border-muted-foreground/50'
                      )}
                    >
                      <Check className={cn('h-5 w-5', linkTo === 'both' ? 'text-elec-yellow' : 'text-white/80')} />
                      <span className="text-xs font-medium">Both</span>
                    </button>
                  </div>
                </div>

                {/* OJT Duration (if linking to OJT) */}
                {(linkTo === 'ojt' || linkTo === 'both') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Spent (hours)</label>
                    <Input
                      type="number"
                      step="0.5"
                      min="0.5"
                      placeholder="e.g., 2.5"
                      value={ojtDuration}
                      onChange={(e) => setOjtDuration(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                )}

                {/* AI Suggestions */}
                {suggestions?.ksb_suggestions && suggestions.ksb_suggestions.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-elec-yellow" />
                      <label className="text-sm font-medium">AI Suggested KSBs</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.ksb_suggestions.map((ksb: any) => (
                        <button
                          key={ksb.code}
                          onClick={() => toggleKsb(ksb.code)}
                          className={cn(
                            'px-3 h-9 rounded-full text-xs font-medium border transition-colors touch-manipulation',
                            selectedKsbs.includes(ksb.code)
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-muted border-border text-white/80 hover:border-muted-foreground'
                          )}
                        >
                          {ksb.code}
                          {ksb.confidence >= 0.8 && (
                            <span className="ml-1 opacity-60">*</span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-white/80">
                      * High confidence suggestions auto-selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Saving */}
            {step === 'saving' && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-10 w-10 text-elec-yellow animate-spin" />
                <p className="text-sm text-white/80">Saving your evidence...</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {step === 'details' && (
            <div className="p-4 border-t border-border shrink-0 bg-background pb-20 sm:pb-4">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    onOpenChange(false);
                  }}
                  className="flex-1 h-12 touch-manipulation active:scale-95"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!title.trim() || ((linkTo === 'ojt' || linkTo === 'both') && !ojtDuration)}
                  className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
                >
                  Save Evidence
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UnifiedCaptureSheet;
