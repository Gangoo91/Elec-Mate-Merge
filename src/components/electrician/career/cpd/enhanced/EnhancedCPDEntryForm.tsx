import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import FileUpload from '@/components/shared/FileUpload';
import { CalendarIcon, Plus, Save, AlertCircle, X, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUnifiedCPD } from '@/hooks/cpd/useUnifiedCPD';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface EvidenceFile {
  id: string;
  file: File;
  uploading: boolean;
  url?: string;
  type: string;
}

interface EnhancedCPDEntryFormProps {
  onSuccess?: () => void;
}

const EnhancedCPDEntryForm = ({ onSuccess }: EnhancedCPDEntryFormProps = {}) => {
  const { addEntry, activeMembership, memberships, loading } = useUnifiedCPD();
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const { toast } = useToast();
  const haptic = useHaptic();

  const [formData, setFormData] = useState({
    title: '',
    hours: '',
    category: '',
    type: '',
    description: '',
    learningOutcomes: '',
  });

  const categories = [
    { id: 'technical-skills', name: 'Technical Skills' },
    { id: 'regulations-standards', name: 'Regulations & Standards' },
    { id: 'safety-health', name: 'Safety & Health' },
    { id: 'business-commercial', name: 'Business & Commercial' },
    { id: 'professional-ethics', name: 'Professional Ethics' },
    { id: 'environmental-sustainability', name: 'Environmental Sustainability' },
    { id: 'digital-technology', name: 'Digital Technology' },
    { id: 'customer-service', name: 'Customer Service' },
  ];

  const activityTypes = [
    { id: 'formal-training', name: 'Formal Training' },
    { id: 'work-based-learning', name: 'Work-based Learning' },
    { id: 'self-directed-study', name: 'Self-directed Study' },
    { id: 'professional-activities', name: 'Professional Activities' },
    { id: 'conferences-seminars', name: 'Conferences & Seminars' },
    { id: 'mentoring', name: 'Mentoring' },
    { id: 'assessment-preparation', name: 'Assessment Preparation' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (files: File[]) => {
    const newFiles: EvidenceFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      uploading: false,
      type: getFileType(file),
    }));
    setEvidenceFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setEvidenceFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const getFileType = (file: File) => {
    if (file.type.includes('pdf')) return 'certificate';
    if (file.type.includes('image')) return 'photo';
    if (file.type.includes('document')) return 'document';
    return 'other';
  };

  const uploadEvidenceFiles = async (userId: string, entryId: string) => {
    const uploadedFiles = [];

    for (const evidenceFile of evidenceFiles) {
      try {
        setEvidenceFiles((prev) =>
          prev.map((f) => (f.id === evidenceFile.id ? { ...f, uploading: true } : f))
        );

        const fileName = `${userId}/${entryId}/${evidenceFile.id}-${evidenceFile.file.name}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cpd-evidence')
          .upload(fileName, evidenceFile.file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('cpd-evidence').getPublicUrl(fileName);

        uploadedFiles.push({
          id: evidenceFile.id,
          fileName: evidenceFile.file.name,
          fileUrl: urlData.publicUrl,
          fileSize: evidenceFile.file.size,
          fileType: evidenceFile.type,
          uploadedAt: new Date().toISOString(),
        });

        setEvidenceFiles((prev) =>
          prev.map((f) =>
            f.id === evidenceFile.id ? { ...f, uploading: false, url: urlData.publicUrl } : f
          )
        );
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: 'Upload failed',
          description: `Failed to upload ${evidenceFile.file.name}`,
          variant: 'destructive',
        });
        setEvidenceFiles((prev) =>
          prev.map((f) => (f.id === evidenceFile.id ? { ...f, uploading: false } : f))
        );
      }
    }

    return uploadedFiles;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !formData.title || !formData.hours || !formData.category || !formData.type) {
      haptic.warning();
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const entryData = {
        title: formData.title,
        description: formData.description,
        activity_type: formData.type,
        category: formData.category,
        hours: parseFloat(formData.hours),
        date_completed: date.toISOString().split('T')[0],
        learning_outcomes: formData.learningOutcomes ? [formData.learningOutcomes] : undefined,
      };

      const result = await addEntry(entryData);

      if (result) {
        // Upload evidence files if any
        if (evidenceFiles.length > 0) {
          const uploadedFiles = await uploadEvidenceFiles(user.id, result.id);

          // Update the CPD entry with evidence file references
          if (uploadedFiles.length > 0) {
            const { error: updateError } = await supabase
              .from('cpd_entries')
              .update({ evidence_files: uploadedFiles })
              .eq('id', result.id);

            if (updateError) {
              console.error('Error updating entry with evidence files:', updateError);
            }
          }
        }

        // Reset form
        setFormData({
          title: '',
          hours: '',
          category: '',
          type: '',
          description: '',
          learningOutcomes: '',
        });
        setDate(undefined);
        setEvidenceFiles([]);

        haptic.success();
        toast({
          title: 'CPD Entry saved',
          description:
            evidenceFiles.length > 0
              ? `Entry saved with ${evidenceFiles.length} evidence file(s)`
              : 'Entry saved successfully',
        });

        onSuccess?.();
      }
    } catch (error) {
      console.error('Error submitting CPD entry:', error);
      haptic.error();
      toast({
        title: 'Error saving entry',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-8 text-center">
        <div className="text-[13px] text-white/85">Loading CPD system…</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Body status */}
      {(!activeMembership || memberships.length === 0) && (
        <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-amber-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-amber-300 shrink-0 self-center" aria-hidden />
            <p className="text-[12.5px] leading-relaxed text-white">
              {memberships.length === 0
                ? 'Set up your professional body membership in settings to enable compliance tracking.'
                : 'No active body selected — entries will save but may not count towards compliance.'}
            </p>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
        <div className="flex items-baseline gap-2 mb-4">
          <Plus className="h-3.5 w-3.5 text-elec-yellow self-center" aria-hidden />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            LOG ACTIVITY
          </span>
        </div>
        {activeMembership && (
          <p className="text-[11.5px] text-white/85 mb-5 -mt-3">
            Recording for{' '}
            <span className="text-white font-semibold">
              {activeMembership.professional_body?.name}
            </span>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Activity Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Activity Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. BS 7671 A4:2026 Amendment Update"
                  className="h-11 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal bg-elec-dark border-elec-yellow/20',
                        !date && 'text-white'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <Label htmlFor="hours">Hours *</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  placeholder="e.g., 3.5"
                  className="h-11 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-white/65 focus-visible:border-elec-yellow/50"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                  required
                >
                  <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.10] text-white focus-visible:border-elec-yellow/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="text-white hover:bg-white/10"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Activity Type */}
              <div className="space-y-2 md:col-span-1">
                <Label>Activity Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                  required
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-foreground">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
                    {activityTypes.map((type) => (
                      <SelectItem
                        key={type.id}
                        value={type.id}
                        className="text-white hover:bg-white/10"
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the activity and what was covered..."
                className="bg-elec-dark border-elec-yellow/20 text-foreground"
                rows={3}
              />
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2">
              <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
              <Textarea
                id="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={(e) => handleInputChange('learningOutcomes', e.target.value)}
                placeholder="What did you learn? How will this benefit your professional development?"
                className="bg-elec-dark border-elec-yellow/20 text-foreground"
                rows={3}
              />
            </div>

            {/* Evidence Upload */}
            <div className="space-y-2">
              <Label>Evidence Files</Label>
              <p className="text-sm text-white">
                Upload certificates, photos, or other evidence to support this CPD activity
              </p>

              <FileUpload
                onFileSelect={handleFileSelect}
                maxSize={20 * 1024 * 1024} // 20MB
                acceptedTypes=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                multiple
              />

              {evidenceFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                    Attached
                  </span>
                  <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.10] bg-white/[0.02]">
                    {evidenceFiles.map((evidenceFile) => (
                      <li
                        key={evidenceFile.id}
                        className="flex items-center justify-between gap-3 p-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="h-4 w-4 text-elec-yellow shrink-0" aria-hidden />
                          <div className="min-w-0">
                            <div className="text-[13px] font-semibold text-white truncate">
                              {evidenceFile.file.name}
                            </div>
                            <div className="text-[11px] tabular-nums text-white/65">
                              {(evidenceFile.file.size / 1024 / 1024).toFixed(2)}MB · {evidenceFile.type}
                              {evidenceFile.uploading && ' · uploading…'}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(evidenceFile.id)}
                          aria-label="Remove"
                          className="text-white/65 hover:text-red-300 inline-flex items-center justify-center h-7 w-7 rounded-md border border-white/15 hover:border-red-500/40 transition-colors touch-manipulation shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !date ||
                !formData.title ||
                !formData.hours ||
                !formData.category ||
                !formData.type
              }
              className="w-full inline-flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-3 min-h-[44px] touch-manipulation transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving…' : 'Save CPD entry'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default EnhancedCPDEntryForm;
