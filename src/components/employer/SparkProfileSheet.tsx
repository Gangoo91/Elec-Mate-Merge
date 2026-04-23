import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AddTrainingRequestDialog } from './dialogs/AddTrainingRequestDialog';
import { PrimaryButton, SecondaryButton } from './editorial';
import {
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  MessageSquare,
  Calendar,
  Award,
  Shield,
  ThumbsUp,
  Zap,
  Phone,
  TrendingUp,
  FileText,
  ChevronRight,
  GraduationCap,
  Plus,
} from 'lucide-react';

// Elec-ID verification tiers aligned with database schema
export type VerificationTier = 'basic' | 'verified' | 'premium';

export interface SparkReview {
  id: string;
  employerName: string;
  rating: number;
  comment: string;
  date: string;
  jobType: string;
}

export interface AvailabilitySlot {
  date: string;
  slots: ('morning' | 'afternoon' | 'evening')[];
}

export interface VerifiedDocument {
  type: 'ecs_card' | 'qualification' | 'training' | 'cscs' | 'driving_licence' | 'insurance';
  name: string;
  verified: boolean;
  expiryDate?: string;
}

export interface EnhancedElectrician {
  id: string;
  name: string;
  location: string;
  distance: number;
  ecsCardType: string;
  ecsExpiry: string;
  specialisms: string[];
  experience: number;
  availability: string;
  dayRate: number;
  hourlyRate: number;
  rating: number;
  completedJobs: number;
  verified: boolean;
  bio: string;
  qualifications: string[];
  status: string;
  avatar: string;
  verificationTier: VerificationTier;
  responseTime: string;
  reviews: SparkReview[];
  availabilitySlots: AvailabilitySlot[];
  coordinates?: { lat: number; lng: number };
  verifiedDocuments?: VerifiedDocument[];
  elecIdNumber?: string;
  verifiedDocsCount?: number;
  elecIdProfileId?: string; // For hire tracking
}

interface SparkProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  electrician: EnhancedElectrician | null;
  isSaved: boolean;
  isInLabourBank: boolean;
  labourBankRate?: number;
  onSave: () => void;
  onContact: () => void;
  onBook: () => void;
  onAddToLabourBank: () => void;
}

// Elec-ID verification tier configuration
const tierConfig: Record<
  VerificationTier,
  { label: string; color: string; icon: typeof Shield; bg: string; description: string }
> = {
  basic: {
    label: 'Basic',
    color: 'text-white',
    icon: Shield,
    bg: 'bg-white/[0.06]',
    description: 'Profile created',
  },
  verified: {
    label: 'Verified',
    color: 'text-blue-400',
    icon: Shield,
    bg: 'bg-blue-500/20',
    description: 'ECS Card + qualification verified',
  },
  premium: {
    label: 'Premium',
    color: 'text-elec-yellow',
    icon: Award,
    bg: 'bg-elec-yellow/20',
    description: 'Fully verified profile',
  },
};

export function SparkProfileSheet({
  open,
  onOpenChange,
  electrician,
  isSaved,
  isInLabourBank,
  labourBankRate,
  onSave,
  onContact,
  onBook,
  onAddToLabourBank,
}: SparkProfileSheetProps) {
  const [trainingDialogOpen, setTrainingDialogOpen] = useState(false);

  if (!electrician) return null;

  const tier = tierConfig[electrician.verificationTier];
  const TierIcon = tier.icon;
  const initials = electrician.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
      >
        <ScrollArea className="h-full">
          <div className="pb-32">
            {/* Header with Avatar */}
            <div className="relative bg-gradient-to-b from-elec-yellow/5 to-transparent px-4 pt-6 pb-4">
              <SheetHeader className="text-left">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-[hsl(0_0%_8%)] shadow-lg">
                      <AvatarImage src={electrician.avatar} alt={electrician.name} />
                      <AvatarFallback className="bg-elec-yellow text-black text-xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    {/* Verification Badge */}
                    <div className={`absolute -bottom-1 -right-1 ${tier.bg} p-1.5 rounded-full`}>
                      <TierIcon className={`h-4 w-4 ${tier.color}`} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <SheetTitle className="text-xl truncate text-white">
                        {electrician.name}
                      </SheetTitle>
                      {electrician.verified && (
                        <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-white">{electrician.ecsCardType}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-white">{electrician.rating}</span>
                        <span className="text-white">({electrician.completedJobs})</span>
                      </span>
                      <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
                        {tier.label} Verified
                      </Badge>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="button"
                    className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                    onClick={onSave}
                  >
                    <Heart
                      className={`h-6 w-6 ${isSaved ? 'fill-elec-yellow text-elec-yellow' : ''}`}
                    />
                  </button>
                </div>
              </SheetHeader>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-white/[0.04]">
              <div className="text-center">
                <p className="text-lg font-bold text-white">{electrician.experience}</p>
                <p className="text-xs text-white">Years Exp</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{electrician.distance}mi</p>
                <p className="text-xs text-white">Distance</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-white">{electrician.responseTime}</p>
                <p className="text-xs text-white">Response</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">
                  £{isInLabourBank && labourBankRate ? labourBankRate : electrician.dayRate}
                </p>
                <p className="text-xs text-white">/day</p>
              </div>
            </div>

            {/* Labour Bank Badge */}
            {isInLabourBank && (
              <div className="mx-4 mt-4 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center gap-3">
                <Zap className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-emerald-400">Labour Bank Member</p>
                  <p className="text-xs text-white">
                    Pre-agreed rate: £{labourBankRate}/day
                  </p>
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between p-3 bg-[hsl(0_0%_12%)] rounded-xl border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      electrician.availability === 'Immediate'
                        ? 'bg-emerald-400 animate-pulse'
                        : electrician.availability === '1 week notice'
                          ? 'bg-amber-400'
                          : 'bg-white/20'
                    }`}
                  />
                  <span className="font-medium text-white">{electrician.availability}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-white">
                  <MapPin className="h-4 w-4" />
                  {electrician.location}
                </div>
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Bio */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-2 text-white">About</h3>
              <p className="text-white">{electrician.bio}</p>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Specialisms */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-3 text-white">Specialisms</h3>
              <div className="flex flex-wrap gap-2">
                {electrician.specialisms.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="px-3 py-1 bg-white/[0.06] text-white"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Qualifications */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Qualifications & Training</h3>
                {electrician.elecIdProfileId && (
                  <button
                    type="button"
                    className="h-8 text-elec-yellow flex items-center gap-1 text-[12.5px] font-medium px-3 rounded-full hover:bg-white/[0.06] touch-manipulation"
                    onClick={() => setTrainingDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Training
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {electrician.qualifications.map((qual, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white">
                    <FileText className="h-4 w-4 text-white" />
                    <span>{qual}</span>
                    {electrician.verified && <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-white/[0.06]" />

            {/* Reviews */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Reviews</h3>
                <button className="text-sm text-elec-yellow flex items-center gap-1">
                  See all <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {electrician.reviews.length > 0 ? (
                <div className="space-y-3">
                  {electrician.reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-white">{review.employerName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium text-white">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-white line-clamp-2">{review.comment}</p>
                      <p className="text-xs text-white mt-1">
                        {review.jobType} • {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white">No reviews yet</p>
              )}
            </div>

            {/* Verification Details - Elec-ID */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white">Elec-ID Verification</h3>
                <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
                  {tier.label}
                </Badge>
              </div>
              {electrician.elecIdNumber && (
                <p className="text-xs text-white mb-3">
                  Elec-ID: {electrician.elecIdNumber}
                </p>
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">ECS Card</span>
                  <div className="flex items-center gap-1 text-sm text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Identity</span>
                  <div className="flex items-center gap-1 text-sm text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Qualifications</span>
                  <div className="flex items-center gap-1 text-sm text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    {electrician.verifiedDocsCount || electrician.qualifications.length} Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">Right to Work</span>
                  <div className="flex items-center gap-1 text-sm text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
              </div>
              {/* Tier Description */}
              <p className="text-xs text-white mt-3 pt-3 border-t border-white/[0.06]">
                {tier.description}
              </p>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[hsl(0_0%_8%)] border-t border-white/[0.06] safe-area-pb">
          <div className="flex gap-2">
            <SecondaryButton size="lg" className="flex-1 h-14" onClick={onContact}>
              <MessageSquare className="h-5 w-5 mr-2" />
              Message
            </SecondaryButton>
            {isInLabourBank ? (
              <PrimaryButton size="lg" className="flex-1 h-14" onClick={onBook}>
                <Calendar className="h-5 w-5 mr-2" />
                Book Now
              </PrimaryButton>
            ) : (
              <>
                <SecondaryButton size="lg" className="h-14 w-14 px-0" onClick={onAddToLabourBank}>
                  <Zap className="h-5 w-5" />
                </SecondaryButton>
                <PrimaryButton size="lg" className="flex-1 h-14" onClick={onBook}>
                  <Calendar className="h-5 w-5 mr-2" />
                  Hire
                </PrimaryButton>
              </>
            )}
          </div>
        </div>

        {/* Add Training Request Dialog */}
        <AddTrainingRequestDialog
          open={trainingDialogOpen}
          onOpenChange={setTrainingDialogOpen}
          worker={
            electrician.elecIdProfileId
              ? {
                  id: electrician.id,
                  name: electrician.name,
                  elecIdProfileId: electrician.elecIdProfileId,
                }
              : null
          }
        />
      </SheetContent>
    </Sheet>
  );
}
