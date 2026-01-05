import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  ChevronRight
} from "lucide-react";

export type VerificationTier = 'basic' | 'bronze' | 'silver' | 'gold' | 'platinum';

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

const tierConfig: Record<VerificationTier, { label: string; color: string; icon: typeof Shield; bg: string }> = {
  basic: { label: 'Basic', color: 'text-muted-foreground', icon: Shield, bg: 'bg-muted' },
  bronze: { label: 'Bronze', color: 'text-amber-700', icon: Shield, bg: 'bg-amber-100' },
  silver: { label: 'Silver', color: 'text-slate-500', icon: Award, bg: 'bg-slate-100' },
  gold: { label: 'Gold', color: 'text-yellow-600', icon: Award, bg: 'bg-yellow-100' },
  platinum: { label: 'Platinum', color: 'text-purple-600', icon: Award, bg: 'bg-purple-100' },
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
  if (!electrician) return null;

  const tier = tierConfig[electrician.verificationTier];
  const TierIcon = tier.icon;
  const initials = electrician.name.split(' ').map(n => n[0]).join('');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-3xl">
        <ScrollArea className="h-full">
          <div className="pb-32">
            {/* Header with Avatar */}
            <div className="relative bg-gradient-to-b from-primary/10 to-background px-4 pt-6 pb-4">
              <SheetHeader className="text-left">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-background shadow-lg">
                      <AvatarImage src={electrician.avatar} alt={electrician.name} />
                      <AvatarFallback className="bg-elec-yellow text-elec-dark text-xl font-bold">
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
                      <SheetTitle className="text-xl truncate">{electrician.name}</SheetTitle>
                      {electrician.verified && (
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{electrician.ecsCardType}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span className="font-semibold">{electrician.rating}</span>
                        <span className="text-muted-foreground">({electrician.completedJobs})</span>
                      </span>
                      <Badge variant="outline" className={`${tier.bg} ${tier.color} border-0`}>
                        {tier.label} Verified
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={onSave}
                  >
                    <Heart className={`h-6 w-6 ${isSaved ? 'fill-primary text-elec-yellow' : ''}`} />
                  </Button>
                </div>
              </SheetHeader>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-muted/50">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{electrician.experience}</p>
                <p className="text-xs text-muted-foreground">Years Exp</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{electrician.distance}mi</p>
                <p className="text-xs text-muted-foreground">Distance</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{electrician.responseTime}</p>
                <p className="text-xs text-muted-foreground">Response</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-success">
                  £{isInLabourBank && labourBankRate ? labourBankRate : electrician.dayRate}
                </p>
                <p className="text-xs text-muted-foreground">/day</p>
              </div>
            </div>

            {/* Labour Bank Badge */}
            {isInLabourBank && (
              <div className="mx-4 mt-4 p-3 bg-success/10 rounded-xl border border-success/20 flex items-center gap-3">
                <Zap className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium text-success">Labour Bank Member</p>
                  <p className="text-xs text-muted-foreground">Pre-agreed rate: £{labourBankRate}/day</p>
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between p-3 bg-elec-gray rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    electrician.availability === 'Immediate' ? 'bg-success animate-pulse' : 
                    electrician.availability === '1 week notice' ? 'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <span className="font-medium">{electrician.availability}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {electrician.location}
                </div>
              </div>
            </div>

            <Separator />

            {/* Bio */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{electrician.bio}</p>
            </div>

            <Separator />

            {/* Specialisms */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-3">Specialisms</h3>
              <div className="flex flex-wrap gap-2">
                {electrician.specialisms.map((spec) => (
                  <Badge key={spec} variant="secondary" className="px-3 py-1">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Qualifications */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-3">Qualifications</h3>
              <div className="space-y-2">
                {electrician.qualifications.map((qual, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{qual}</span>
                    {electrician.verified && <CheckCircle className="h-3.5 w-3.5 text-success" />}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Reviews</h3>
                <button className="text-sm text-elec-yellow flex items-center gap-1">
                  See all <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              {electrician.reviews.length > 0 ? (
                <div className="space-y-3">
                  {electrician.reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{review.employerName}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                          <span className="text-sm font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{review.jobType} • {review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet</p>
              )}
            </div>

            {/* Verification Details */}
            <div className="px-4 py-4">
              <h3 className="font-semibold mb-3">Verification Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ECS Card</span>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Identity</span>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Qualifications</span>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    {electrician.qualifications.length} Verified
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Right to Work</span>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Sticky Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-pb">
          <div className="flex gap-2">
            <Button variant="outline" size="lg" className="flex-1 h-14" onClick={onContact}>
              <MessageSquare className="h-5 w-5 mr-2" />
              Message
            </Button>
            {isInLabourBank ? (
              <Button size="lg" className="flex-1 h-14 bg-success hover:bg-success/90" onClick={onBook}>
                <Calendar className="h-5 w-5 mr-2" />
                Book Now
              </Button>
            ) : (
              <>
                <Button variant="outline" size="lg" className="h-14" onClick={onAddToLabourBank}>
                  <Zap className="h-5 w-5" />
                </Button>
                <Button size="lg" className="flex-1 h-14" onClick={onBook}>
                  <Calendar className="h-5 w-5 mr-2" />
                  Hire
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
