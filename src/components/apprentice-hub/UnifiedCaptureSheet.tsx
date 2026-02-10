/**
 * UnifiedCaptureSheet
 *
 * Quick capture bottom sheet for adding evidence.
 * Wraps capture flow with option to link to Portfolio, OJT Hours, or Both.
 * AI analysis is manual — user taps "Analyse Evidence" after uploading.
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
  X,
  Sparkles,
  Loader2,
  Check,
  Briefcase,
  Clock,
  CheckSquare,
  Square,
  ListChecks,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import {
  useAIEvidenceTagger,
  getStrengthColor,
} from '@/hooks/portfolio/useAIEvidenceTagger';
import type { MatchedCriterion } from '@/hooks/portfolio/useAIEvidenceTagger';
import type { PortfolioCategory } from '@/types/portfolio';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { useQualificationACs } from '@/hooks/qualification/useQualificationACs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useHaptics } from '@/hooks/useHaptics';

interface UnifiedCaptureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

type LinkTo = 'portfolio' | 'ojt' | 'both';
type CaptureStep = 'capture' | 'details';

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
  const haptics = useHaptics();
  const { addEntry } = usePortfolioData();
  const { addTimeEntry } = useTimeEntries();
  const { analyze, isAnalyzing, result: aiResult } = useAIEvidenceTagger();
  const { qualificationCode } = useStudentQualification();
  const { tree } = useQualificationACs(qualificationCode);

  // Dynamic categories from qualification units
  const categories =
    tree.units.length > 0
      ? tree.units.map((u) => `Unit ${u.unitCode}: ${u.unitTitle}`)
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

  // AI matched criteria selection
  const [selectedACs, setSelectedACs] = useState<string[]>([]);

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
    setSelectedACs([]);
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
  const getEvidenceType = (
    fileType: string
  ): 'image' | 'document' | 'video' => {
    if (fileType.startsWith('image/')) return 'image';
    if (fileType.startsWith('video/')) return 'video';
    return 'document';
  };

  // Handle file selection — upload only, no auto-analysis
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

    // Upload file to storage (but don't auto-analyse)
    const storageUrl = await uploadFile(selectedFile);
    if (storageUrl) {
      setUploadedUrl(storageUrl);
    }
  };

  // Manual AI analysis trigger
  const handleAnalyse = async () => {
    const evidenceUrl = uploadedUrl || previewUrl;
    if (!evidenceUrl || !file) return;

    const analysis = await analyze({
      evidenceUrl,
      evidenceType: getEvidenceType(file.type),
      title: title || undefined,
      description: description || undefined,
      qualificationCode,
    });

    if (analysis) {
      // Auto-select high-confidence ACs
      const autoSelected =
        analysis.matchedCriteria
          ?.filter((ac) => ac.confidence >= 80 && ac.unitCode && ac.acCode)
          .map((ac) => `${ac.unitCode} AC ${ac.acCode}`) ?? [];
      setSelectedACs(autoSelected);

      // Auto-fill title if empty
      if (!title && analysis.suggestedTitle) {
        setTitle(analysis.suggestedTitle.slice(0, 100));
      }
    }
  };

  // Toggle AC selection
  const toggleAC = (acCode: string) => {
    haptics.tap();
    setSelectedACs((prev) =>
      prev.includes(acCode)
        ? prev.filter((c) => c !== acCode)
        : [...prev, acCode]
    );
  };

  // Bulk AC selection helpers
  const selectAllACs = () => {
    haptics.tap();
    const allCodes =
      aiResult?.matchedCriteria
        ?.filter((ac) => ac.unitCode && ac.acCode)
        .map((ac) => `${ac.unitCode} AC ${ac.acCode}`) ?? [];
    setSelectedACs(allCodes);
  };

  const selectRecommendedACs = () => {
    haptics.tap();
    const recommended =
      aiResult?.matchedCriteria
        ?.filter((ac) => ac.confidence >= 80 && ac.unitCode && ac.acCode)
        .map((ac) => `${ac.unitCode} AC ${ac.acCode}`) ?? [];
    setSelectedACs(recommended);
  };

  const deselectAllACs = () => {
    haptics.tap();
    setSelectedACs([]);
  };

  // Handle save — optimistic: close immediately, save in background
  const handleSave = async () => {
    if (!title.trim()) {
      haptics.warning();
      toast({
        title: 'Title required',
        description: 'Please enter a title for this evidence',
        variant: 'destructive',
      });
      return;
    }

    // Haptic success immediately
    haptics.success();

    // Snapshot form values before closing
    const snap = {
      title,
      description,
      category,
      linkTo,
      ojtDuration,
      selectedACs: [...selectedACs],
      file,
      uploadedUrl,
      previewUrl,
    };

    // Optimistic: close sheet + show success toast immediately
    const toastMsg =
      snap.linkTo === 'both'
        ? 'Added to portfolio and logged as training time'
        : snap.linkTo === 'ojt'
          ? 'Logged as training time'
          : 'Added to portfolio';

    toast({ title: 'Evidence saved', description: toastMsg });
    resetForm();
    onComplete();

    // Background save
    try {
      let finalUrl = snap.uploadedUrl;
      if (snap.file && !finalUrl) {
        finalUrl = (await uploadFile(snap.file)) || snap.previewUrl;
      }

      const evidenceFile = snap.file
        ? {
            name: snap.file.name,
            type: snap.file.type,
            url: finalUrl || snap.previewUrl,
          }
        : null;

      if (snap.linkTo === 'portfolio' || snap.linkTo === 'both') {
        const categoryName = snap.category || 'Practical Skills';
        const categoryObj: PortfolioCategory = {
          id: categoryName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
          name: categoryName,
          description: '',
          icon: 'folder',
          color: 'gray',
          requiredEntries: 0,
          completedEntries: 0,
        };

        await addEntry({
          title: snap.title,
          description: snap.description,
          category: categoryObj,
          skills: snap.selectedACs,
          evidenceFiles: evidenceFile ? [evidenceFile] : [],
          assessmentCriteria: snap.selectedACs,
          status: 'draft',
          dateCreated: new Date().toISOString(),
        });
      }

      if (
        (snap.linkTo === 'ojt' || snap.linkTo === 'both') &&
        snap.ojtDuration
      ) {
        await addTimeEntry({
          date: new Date().toISOString().split('T')[0],
          duration: parseFloat(snap.ojtDuration) * 60,
          activity: snap.title,
          notes: snap.description,
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      haptics.error();
      toast({
        title: 'Error saving evidence',
        description: 'Something went wrong — please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pb-4">
            <SheetTitle>Add Evidence</SheetTitle>
            <SheetDescription>
              {step === 'capture' &&
                'Capture or upload evidence for your portfolio'}
              {step === 'details' && 'Add details about this evidence'}
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
                    <span className="text-sm font-medium text-foreground">
                      Camera
                    </span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-blue-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-blue-500/20">
                      <Upload className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Upload
                    </span>
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
                    <span className="text-sm font-medium text-foreground">
                      Link
                    </span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-purple-500/10 border-2 border-purple-500/20 hover:border-purple-500/40 active:scale-95 transition-all touch-manipulation"
                  >
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Video className="h-6 w-6 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Video
                    </span>
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
                  Max file size: 10MB. Supported: Images, Videos, PDFs,
                  Documents
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

                {/* Upload indicator */}
                {isUploading && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                    <span className="text-sm text-elec-yellow">
                      Uploading file...
                    </span>
                  </div>
                )}

                {/* Analyse Evidence button — manual trigger */}
                {file && !isUploading && !aiResult && (
                  <Button
                    variant="outline"
                    onClick={handleAnalyse}
                    disabled={isAnalyzing || isUploading}
                    className="w-full h-11 touch-manipulation border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 active:scale-95"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analysing evidence...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyse Evidence
                      </>
                    )}
                  </Button>
                )}

                {/* Analysing indicator (shown when running) */}
                {isAnalyzing && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
                    <span className="text-sm text-elec-yellow">
                      AI analysing evidence...
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
                      <Briefcase
                        className={cn(
                          'h-5 w-5',
                          linkTo === 'portfolio'
                            ? 'text-elec-yellow'
                            : 'text-white/80'
                        )}
                      />
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
                      <Clock
                        className={cn(
                          'h-5 w-5',
                          linkTo === 'ojt'
                            ? 'text-elec-yellow'
                            : 'text-white/80'
                        )}
                      />
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
                      <Check
                        className={cn(
                          'h-5 w-5',
                          linkTo === 'both'
                            ? 'text-elec-yellow'
                            : 'text-white/80'
                        )}
                      />
                      <span className="text-xs font-medium">Both</span>
                    </button>
                  </div>
                </div>

                {/* OJT Duration (if linking to OJT) */}
                {(linkTo === 'ojt' || linkTo === 'both') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Time Spent (hours)
                    </label>
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

                {/* AI Matched Assessment Criteria */}
                {aiResult && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-elec-yellow" />
                      <label className="text-sm font-medium">
                        Matched Assessment Criteria
                      </label>
                    </div>

                    {/* Evidence Strength Badge */}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs capitalize',
                          getStrengthColor(aiResult.evidenceStrength)
                        )}
                      >
                        {aiResult.evidenceStrength} evidence
                      </Badge>
                    </div>

                    {/* Why good evidence */}
                    {aiResult.whyGoodEvidence && (
                      <p className="text-xs text-white/90 leading-relaxed">
                        {aiResult.whyGoodEvidence}
                      </p>
                    )}

                    {/* Matched ACs grouped by unit */}
                    {aiResult.matchedCriteria &&
                    aiResult.matchedCriteria.length > 0 ? (
                      <div className="space-y-3">
                        {/* Bulk selection buttons */}
                        <div className="flex gap-2">
                          {selectedACs.length ===
                          aiResult.matchedCriteria.length ? (
                            <button
                              onClick={deselectAllACs}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.06] text-white/70 touch-manipulation active:scale-95 transition-transform"
                            >
                              <Square className="h-3 w-3" />
                              Deselect All
                            </button>
                          ) : (
                            <button
                              onClick={selectAllACs}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.06] text-white/70 touch-manipulation active:scale-95 transition-transform"
                            >
                              <ListChecks className="h-3 w-3" />
                              Select All
                            </button>
                          )}
                          {aiResult.matchedCriteria.some(
                            (ac) => ac.confidence >= 80
                          ) && (
                            <button
                              onClick={selectRecommendedACs}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 touch-manipulation active:scale-95 transition-transform"
                            >
                              <Star className="h-3 w-3" />
                              Recommended
                            </button>
                          )}
                        </div>

                        {(() => {
                          // Group ACs by unit
                          const grouped = new Map<
                            string,
                            { unitTitle: string; criteria: MatchedCriterion[] }
                          >();
                          for (const ac of aiResult.matchedCriteria) {
                            const key = ac.unitCode || 'other';
                            if (!grouped.has(key)) {
                              grouped.set(key, {
                                unitTitle: ac.unitTitle || 'Other',
                                criteria: [],
                              });
                            }
                            grouped.get(key)!.criteria.push(ac);
                          }

                          let acIndex = 0;
                          return Array.from(grouped.entries()).map(
                            ([unitCode, group]) => (
                              <div key={unitCode} className="space-y-2">
                                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                                  Unit {unitCode}
                                  {group.unitTitle !== 'Other' &&
                                    ` — ${group.unitTitle}`}
                                </p>
                                {group.criteria.map((ac) => {
                                  const canonicalRef = `${unitCode} AC ${ac.acCode}`;
                                  const isSelected = selectedACs.includes(canonicalRef);
                                  const idx = acIndex++;
                                  return (
                                    <motion.button
                                      key={canonicalRef}
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: idx * 0.05,
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 25,
                                      }}
                                      onClick={() => toggleAC(canonicalRef)}
                                      className={cn(
                                        'w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors touch-manipulation',
                                        isSelected
                                          ? 'border-elec-yellow/50 bg-elec-yellow/10'
                                          : 'border-border hover:border-muted-foreground/50'
                                      )}
                                    >
                                      <motion.div
                                        animate={{
                                          scale: isSelected ? [1, 1.2, 1] : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        {isSelected ? (
                                          <CheckSquare className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                                        ) : (
                                          <Square className="h-5 w-5 text-white/40 shrink-0 mt-0.5" />
                                        )}
                                      </motion.div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground leading-snug">
                                          {ac.acCode} {ac.acText}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                          <p className="text-xs text-white/60">
                                            {ac.confidence}% match
                                          </p>
                                          {ac.confidence >= 80 && (
                                            <Badge
                                              variant="outline"
                                              className="text-[9px] px-1 py-0 border-green-500/30 text-green-400"
                                            >
                                              Recommended
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            )
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-xs text-white/60">
                        No matching criteria found. Try adding a more specific
                        title and description.
                      </p>
                    )}

                    {/* Quality Tips */}
                    {aiResult.qualityTips &&
                      aiResult.qualityTips.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <p className="text-xs font-medium text-white/70">
                            Tips to strengthen evidence:
                          </p>
                          {aiResult.qualityTips.map(
                            (tip: string, i: number) => (
                              <p
                                key={i}
                                className="text-xs text-white/60 pl-3"
                              >
                                &bull; {tip}
                              </p>
                            )
                          )}
                        </div>
                      )}
                  </div>
                )}
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
                  disabled={
                    !title.trim() ||
                    ((linkTo === 'ojt' || linkTo === 'both') && !ojtDuration)
                  }
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
