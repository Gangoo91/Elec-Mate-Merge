import { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
  ResponsiveDialogFooter,
} from "@/components/ui/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
  FileText
} from "lucide-react";
import { VacancyApplication } from "@/contexts/EmployerContext";

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
  const [notes, setNotes] = useState(application?.notes || "");
  const [rating, setRating] = useState(application?.rating || 0);

  if (!application) return null;

  const initials = application.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Reviewing": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      "Shortlisted": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Interview Scheduled": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      "Offer Made": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  const getCardBadge = (cardType?: string) => {
    if (!cardType) return null;
    const variants: Record<string, string> = {
      "Gold Card": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      "Blue Card": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Apprentice": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return variants[cardType] || "bg-muted text-muted-foreground";
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
          <ResponsiveDialogTitle className="sr-only">Candidate Profile</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="space-y-4">
        {/* Header with Avatar */}
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-border">
            <AvatarImage src={application.avatar} alt={application.name} />
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-foreground">{application.name}</h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {application.ecsCardType && (
                <Badge variant="outline" className={getCardBadge(application.ecsCardType)}>
                  <CreditCard className="h-3 w-3 mr-1" />
                  {application.ecsCardType}
                </Badge>
              )}
              <Badge variant="outline" className={getStatusBadge(application.status)}>
                {application.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Applied For */}
        {vacancyTitle && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Applied for:</span>
              <span className="font-medium text-foreground">{vacancyTitle}</span>
            </div>
          </div>
        )}

        <Separator />

        {/* Contact Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact</h3>
          <div className="space-y-2">
            <a href={`tel:${application.phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-foreground">{application.phone}</span>
            </a>
            <a href={`mailto:${application.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="text-foreground truncate">{application.email}</span>
            </a>
          </div>
        </div>

        <Separator />

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {application.currentLocation && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">{application.currentLocation}</p>
              </div>
            </div>
          )}
          {application.yearsExperience !== undefined && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-sm font-medium">{application.yearsExperience} years</p>
              </div>
            </div>
          )}
          {application.noticePeriod && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Notice Period</p>
                <p className="text-sm font-medium">{application.noticePeriod}</p>
              </div>
            </div>
          )}
          {application.expectedSalary !== undefined && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Expected</p>
                <p className="text-sm font-medium">
                  £{application.expectedSalary.toLocaleString()}
                  {application.expectedSalary < 1000 ? '/day' : '/yr'}
                </p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Applied</p>
              <p className="text-sm font-medium">
                {new Date(application.appliedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Interview Details */}
        {application.interviewDate && (
          <>
            <Separator />
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
              <h3 className="text-sm font-medium text-cyan-600 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Interview Scheduled
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(application.interviewDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                {application.interviewTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{application.interviewTime}</span>
                  </div>
                )}
                {application.interviewType && (
                  <div className="flex items-center gap-2">
                    {application.interviewType === 'Video' ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : application.interviewType === 'Phone' ? (
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Building className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{application.interviewType}</span>
                  </div>
                )}
                {application.interviewLocation && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{application.interviewLocation}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Rating */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Rating</h3>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Notes
          </h3>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes about this candidate..."
            className="min-h-[80px] resize-none"
          />
          {notes !== application.notes && (
            <Button size="sm" onClick={handleSaveNotes}>
              Save Notes
            </Button>
          )}
        </div>

        </ResponsiveDialogBody>

        <ResponsiveDialogFooter className="flex-col sm:flex-row gap-2">
          {application.status !== 'Interview Scheduled' && application.status !== 'Offer Made' && application.status !== 'Rejected' && (
            <Button onClick={onScheduleInterview} variant="outline" className="flex-1 h-11 touch-manipulation min-w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          )}
          {application.status === 'New' || application.status === 'Reviewing' ? (
            <Button onClick={onShortlist} variant="outline" className="flex-1 h-11 touch-manipulation min-w-[100px]">
              <Star className="h-4 w-4 mr-2" />
              Shortlist
            </Button>
          ) : null}
          {application.status === 'Interview Scheduled' || application.status === 'Shortlisted' ? (
            <Button onClick={onMakeOffer} className="flex-1 h-11 touch-manipulation min-w-[100px]">
              Make Offer
            </Button>
          ) : null}
          {application.status !== 'Rejected' && application.status !== 'Offer Made' && (
            <Button onClick={onReject} variant="ghost" className="h-11 touch-manipulation text-destructive hover:text-destructive hover:bg-destructive/10">
              Reject
            </Button>
          )}
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
