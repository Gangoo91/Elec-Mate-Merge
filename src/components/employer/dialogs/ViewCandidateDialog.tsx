import { useState } from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
} from '@/components/ui/responsive-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  Briefcase,
  CreditCard,
  MessageSquare,
  Video,
  Building,
  FileText,
} from 'lucide-react';
import { VacancyApplication } from '@/contexts/EmployerContext';
import { cn } from '@/lib/utils';
import {
  Eyebrow,
  Pill,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  TextAction,
  textareaClass,
} from '@/components/employer/editorial';

interface ViewCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: VacancyApplication | null;
  vacancyTitle?: string;
  onUpdateNotes?: (notes: string) => void;
  onUpdateRating?: (rating: number) => void;
  onScheduleInterview?: () => void;
  onShortlist?: () => void;
  onReject?: () => void;
  onMakeOffer?: () => void;
}

export function ViewCandidateDialog({
  open,
  onOpenChange,
  application,
  vacancyTitle,
  onUpdateNotes,
  onUpdateRating,
  onScheduleInterview,
  onShortlist,
  onReject,
  onMakeOffer,
}: ViewCandidateDialogProps) {
  const [notes, setNotes] = useState(application?.notes || '');
  const [rating, setRating] = useState(application?.rating || 0);

  if (!application) return null;

  const initials = application.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const getStatusTone = (status: string): 'blue' | 'amber' | 'purple' | 'cyan' | 'emerald' | 'red' | 'yellow' => {
    const map: Record<string, 'blue' | 'amber' | 'purple' | 'cyan' | 'emerald' | 'red' | 'yellow'> = {
      New: 'blue',
      Reviewing: 'amber',
      Shortlisted: 'purple',
      'Interview Scheduled': 'cyan',
      'Offer Made': 'emerald',
      Rejected: 'red',
    };
    return map[status] || 'yellow';
  };

  const getCardTone = (cardType?: string): 'yellow' | 'blue' | 'emerald' => {
    if (!cardType) return 'yellow';
    const map: Record<string, 'yellow' | 'blue' | 'emerald'> = {
      'Gold Card': 'yellow',
      'Blue Card': 'blue',
      Apprentice: 'emerald',
    };
    return map[cardType] || 'yellow';
  };

  const handleSaveNotes = () => {
    onUpdateNotes?.(notes);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    onUpdateRating?.(value);
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-lg">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="sr-only">Candidate profile</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border border-white/[0.08]">
              <AvatarImage src={application.avatar} alt={application.name} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Eyebrow>Candidate</Eyebrow>
              <h2 className="mt-1 text-[20px] font-semibold text-white">{application.name}</h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {application.ecsCardType && (
                  <Pill tone={getCardTone(application.ecsCardType)}>
                    <CreditCard className="h-3 w-3 mr-1" />
                    {application.ecsCardType}
                  </Pill>
                )}
                <Pill tone={getStatusTone(application.status)}>{application.status}</Pill>
              </div>
            </div>
          </div>

          {vacancyTitle && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl p-3">
              <div className="flex items-center gap-2 text-[12.5px]">
                <Briefcase className="h-4 w-4 text-elec-yellow" />
                <span className="text-white">Applied for:</span>
                <span className="text-white font-medium">{vacancyTitle}</span>
              </div>
            </div>
          )}

          <FormCard eyebrow="Contact">
            <div className="space-y-1.5">
              <a
                href={`tel:${application.phone}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-[13px] text-white">{application.phone}</span>
              </a>
              <a
                href={`mailto:${application.email}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-[13px] text-white truncate">{application.email}</span>
              </a>
            </div>
          </FormCard>

          <FormCard eyebrow="Details">
            <div className="grid grid-cols-2 gap-3">
              {application.currentLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white shrink-0" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-[0.14em]">Location</p>
                    <p className="text-[13px] font-medium text-white">
                      {application.currentLocation}
                    </p>
                  </div>
                </div>
              )}
              {application.yearsExperience !== undefined && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-white shrink-0" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-[0.14em]">Experience</p>
                    <p className="text-[13px] font-medium text-white">
                      {application.yearsExperience} years
                    </p>
                  </div>
                </div>
              )}
              {application.noticePeriod && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white shrink-0" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-[0.14em]">Notice</p>
                    <p className="text-[13px] font-medium text-white">{application.noticePeriod}</p>
                  </div>
                </div>
              )}
              {application.expectedSalary !== undefined && (
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-white shrink-0" />
                  <div>
                    <p className="text-[10px] text-white uppercase tracking-[0.14em]">Expected</p>
                    <p className="text-[13px] font-medium text-white">
                      £{application.expectedSalary.toLocaleString()}
                      {application.expectedSalary < 1000 ? '/day' : '/yr'}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white shrink-0" />
                <div>
                  <p className="text-[10px] text-white uppercase tracking-[0.14em]">Applied</p>
                  <p className="text-[13px] font-medium text-white">
                    {new Date(application.appliedDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </FormCard>

          {application.interviewDate && (
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-4">
              <h3 className="text-[12px] font-semibold text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-[0.14em]">
                <Calendar className="h-4 w-4" />
                Interview scheduled
              </h3>
              <div className="space-y-1.5 text-[12.5px] text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white" />
                  <span>
                    {new Date(application.interviewDate).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {application.interviewTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-white" />
                    <span>{application.interviewTime}</span>
                  </div>
                )}
                {application.interviewType && (
                  <div className="flex items-center gap-2">
                    {application.interviewType === 'Video' ? (
                      <Video className="h-4 w-4 text-white" />
                    ) : application.interviewType === 'Phone' ? (
                      <Phone className="h-4 w-4 text-white" />
                    ) : (
                      <Building className="h-4 w-4 text-white" />
                    )}
                    <span>{application.interviewType}</span>
                  </div>
                )}
                {application.interviewLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span>{application.interviewLocation}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <FormCard eyebrow="Your rating">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform touch-manipulation"
                >
                  <Star
                    className={cn(
                      'h-6 w-6',
                      star <= rating ? 'fill-elec-yellow text-elec-yellow' : 'text-white'
                    )}
                  />
                </button>
              ))}
              {rating > 0 && <span className="ml-2 text-[12px] text-white">{rating}/5</span>}
            </div>
          </FormCard>

          <FormCard eyebrow="Notes">
            <div className="flex items-center gap-2 text-[12px] text-white">
              <MessageSquare className="h-4 w-4 text-elec-yellow" />
              Private notes about this candidate
            </div>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes about this candidate..."
              className={`${textareaClass} min-h-[90px]`}
            />
            {notes !== application.notes && (
              <TextAction onClick={handleSaveNotes}>Save notes</TextAction>
            )}
          </FormCard>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter className="flex-col sm:flex-row gap-2">
          {application.status !== 'Interview Scheduled' &&
            application.status !== 'Offer Made' &&
            application.status !== 'Rejected' && (
              <SecondaryButton onClick={onScheduleInterview} fullWidth>
                <Calendar className="h-4 w-4 mr-1.5" />
                Schedule interview
              </SecondaryButton>
            )}
          {(application.status === 'New' || application.status === 'Reviewing') && (
            <SecondaryButton onClick={onShortlist} fullWidth>
              <Star className="h-4 w-4 mr-1.5" />
              Shortlist
            </SecondaryButton>
          )}
          {(application.status === 'Interview Scheduled' ||
            application.status === 'Shortlisted') && (
            <PrimaryButton onClick={onMakeOffer} fullWidth>
              Make offer
            </PrimaryButton>
          )}
          {application.status !== 'Rejected' && application.status !== 'Offer Made' && (
            <DestructiveButton onClick={onReject}>Reject</DestructiveButton>
          )}
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
