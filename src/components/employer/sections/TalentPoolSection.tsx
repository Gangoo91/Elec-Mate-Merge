import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookLabourBankDialog } from "@/components/employer/dialogs/BookLabourBankDialog";
import { SparkProfileSheet, type EnhancedElectrician, type VerificationTier } from "@/components/employer/SparkProfileSheet";
import { TalentMapView } from "@/components/employer/TalentMapView";
import { GoogleMapsProvider } from "@/contexts/GoogleMapsContext";
import { AvailabilityCalendar } from "@/components/employer/AvailabilityCalendar";
import { PremiumTalentCard } from "@/components/employer/talent-pool/PremiumTalentCard";
import { TalentProfileCardSkeletonGrid } from "@/components/employer/talent-pool/TalentProfileCardSkeleton";
import { MessageDialog } from "@/components/employer/talent-pool/MessageDialog";
import { InviteToApplyDialog } from "@/components/employer/talent-pool/InviteToApplyDialog";
import { TalentFilterChips } from "@/components/employer/talent-pool/TalentFilterChips";
import {
  Search,
  Map,
  List,
  CalendarDays,
  SlidersHorizontal,
  Shield,
  X,
  Check,
  Zap,
  Award,
  Users,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEmployer } from "@/contexts/EmployerContext";
import { useTalentPool, type TalentPoolWorker, type ExperienceLevel } from "@/hooks/useTalentPool";
import { addDays, format } from "date-fns";
import { Slider } from "@/components/ui/slider";

type ViewMode = 'list' | 'map' | 'calendar';
type AvailabilityFilter = 'all' | 'now' | 'week';
type TierFilter = 'all' | 'verified' | 'premium';

// Common ECS card types
const ECS_CARD_TYPES = ['Gold', 'Blue', 'Green', 'Apprentice'];

// Common qualifications
const COMMON_QUALIFICATIONS = [
  '18th Edition BS7671',
  'C&G 2391 Inspection & Testing',
  'C&G 2382 18th Edition',
  'EV Charging Installation',
  'Solar PV Installation',
  'Part P Competent Person',
];

// Simple hash function for deterministic positioning
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Manchester city centre
const BASE_LAT = 53.4808;
const BASE_LNG = -2.2426;

// Generate stable coordinates based on electrician ID and distance
const generateStableCoordinates = (id: string, distance: number): { lat: number; lng: number } => {
  const hash = hashCode(id);
  const angle = (hash % 360) * (Math.PI / 180);
  const distanceInDegrees = distance * 0.0145;

  return {
    lat: BASE_LAT + Math.sin(angle) * distanceInDegrees,
    lng: BASE_LNG + Math.cos(angle) * distanceInDegrees * 1.6
  };
};

// Generate availability slots for calendar view
const generateAvailabilitySlots = (id: string) => {
  const slots: { date: string; slots: ('morning' | 'afternoon' | 'evening')[] }[] = [];
  const today = new Date();
  const baseSeed = hashCode(id);
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 14; i++) {
    const date = addDays(today, i);
    const dayOfWeek = date.getDay();
    const daySeed = baseSeed + i * 1000;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (seededRandom(daySeed) > 0.7) {
        slots.push({ date: format(date, 'yyyy-MM-dd'), slots: ['morning'] });
      }
    } else {
      const available = seededRandom(daySeed) > 0.3;
      if (available) {
        const daySlots: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon'];
        if (seededRandom(daySeed + 500) > 0.6) daySlots.push('evening');
        slots.push({ date: format(date, 'yyyy-MM-dd'), slots: daySlots });
      }
    }
  }
  return slots;
};

// Convert TalentPoolWorker to EnhancedElectrician for UI compatibility
const convertToEnhancedElectrician = (worker: TalentPoolWorker): EnhancedElectrician & {
  skills: string[];
  currentRole?: string;
  totalYearsExperience: number;
} => ({
  id: worker.id,
  name: worker.name,
  location: worker.location,
  distance: worker.distance,
  ecsCardType: worker.ecsCardType,
  ecsExpiry: worker.ecsExpiry || '',
  specialisms: worker.specialisms.length > 0 ? worker.specialisms : ['General Electrical'],
  experience: worker.experience,
  availability: worker.availability,
  dayRate: worker.dayRate,
  hourlyRate: worker.hourlyRate,
  rating: worker.rating,
  completedJobs: worker.completedJobs,
  verified: worker.isVerified,
  bio: worker.bio || `Experienced ${worker.role.toLowerCase()} with ${worker.totalYearsExperience || worker.experience} years in the industry.`,
  qualifications: worker.qualifications.length > 0 ? worker.qualifications : ['18th Edition BS7671'],
  status: 'Active',
  avatar: worker.avatar || '',
  verificationTier: worker.verificationTier,
  responseTime: worker.responseTime,
  reviews: [],
  availabilitySlots: generateAvailabilitySlots(worker.id),
  coordinates: generateStableCoordinates(worker.id, worker.distance),
  verifiedDocsCount: worker.verifiedDocsCount,
  elecIdNumber: worker.elecIdNumber,
  elecIdProfileId: worker.elecIdProfileId,
  // New enhanced fields
  skills: worker.skills,
  currentRole: worker.currentRole,
  totalYearsExperience: worker.totalYearsExperience,
});

const specialisms = ["Commercial", "Industrial", "Domestic", "EV Charging", "Solar PV", "Fire Alarm", "Smart Home", "Testing"];

export function TalentPoolSection() {
  const {
    savedCandidates,
    labourBank,
    toggleSaveCandidate,
    addToLabourBank,
  } = useEmployer();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState("");
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedElectrician, setSelectedElectrician] = useState<EnhancedElectrician | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter state
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [selectedSpecialisms, setSelectedSpecialisms] = useState<string[]>([]);
  const [labourBankOnly, setLabourBankOnly] = useState(false);
  // New enhanced filters
  const [experienceFilter, setExperienceFilter] = useState<ExperienceLevel>('all');
  const [selectedEcsCards, setSelectedEcsCards] = useState<string[]>([]);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  const [rateRange, setRateRange] = useState<[number, number]>([150, 500]);

  // Fetch real talent pool data from database
  const {
    workers,
    isLoading,
    error,
    availableNowCount,
    totalCount,
    refetch,
  } = useTalentPool({
    searchQuery,
    tierFilter,
    availabilityFilter,
    specialismsFilter: selectedSpecialisms,
    experienceFilter,
    ecsCardFilter: selectedEcsCards,
    qualificationsFilter: selectedQualifications,
    minRate: rateRange[0],
    maxRate: rateRange[1] < 500 ? rateRange[1] : undefined, // Only apply max if not at default max
  });

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Talent pool updated with latest availability.",
    });
  }, [refetch]);

  // Convert workers to EnhancedElectrician format for UI components
  const enhancedElectricians = useMemo(
    () => workers.map(convertToEnhancedElectrician),
    [workers]
  );

  // Get Labour Bank IDs
  const labourBankIds = labourBank.map(m => m.electricianId);

  // Count active filters
  const activeFilterCount = [
    availabilityFilter !== 'all',
    tierFilter !== 'all',
    selectedSpecialisms.length > 0,
    labourBankOnly,
    experienceFilter !== 'all',
    selectedEcsCards.length > 0,
    selectedQualifications.length > 0,
    rateRange[0] > 150 || rateRange[1] < 500,
  ].filter(Boolean).length;

  // Apply Labour Bank filter (client-side since it's local state)
  const filteredElectricians = useMemo(() => {
    if (!labourBankOnly) return enhancedElectricians;
    return enhancedElectricians.filter(e => labourBankIds.includes(e.id));
  }, [enhancedElectricians, labourBankOnly, labourBankIds]);

  // Get Labour Bank rate if available
  const getLabourBankRate = (electricianId: string) => {
    return labourBank.find(r => r.electricianId === electricianId);
  };

  const clearFilters = () => {
    setAvailabilityFilter('all');
    setTierFilter('all');
    setSelectedSpecialisms([]);
    setLabourBankOnly(false);
    setExperienceFilter('all');
    setSelectedEcsCards([]);
    setSelectedQualifications([]);
    setRateRange([150, 500]);
  };

  const toggleSpecialism = (spec: string) => {
    setSelectedSpecialisms(prev =>
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleOpenProfile = (electrician: EnhancedElectrician) => {
    setSelectedElectrician(electrician);
    setProfileSheetOpen(true);
  };

  const handleSave = (electrician: EnhancedElectrician) => {
    const wasSaved = savedCandidates.includes(electrician.id);
    toggleSaveCandidate(electrician.id);
    toast({
      title: wasSaved ? "Removed from Saved" : "Candidate Saved",
      description: wasSaved
        ? `${electrician.name} removed from your saved list.`
        : `${electrician.name} added to your saved list.`,
    });
  };

  const handleMessage = (electrician: EnhancedElectrician) => {
    setSelectedElectrician(electrician);
    setMessageDialogOpen(true);
  };

  const handleInvite = (electrician: EnhancedElectrician) => {
    setSelectedElectrician(electrician);
    setInviteDialogOpen(true);
  };

  const handleBook = (electrician: EnhancedElectrician) => {
    setSelectedElectrician(electrician);
    setBookingDialogOpen(true);
    setProfileSheetOpen(false);
  };

  const handleAddToLabourBank = (electrician: EnhancedElectrician) => {
    if (labourBank.some(m => m.electricianId === electrician.id)) {
      toast({
        title: "Already in Labour Bank",
        description: `${electrician.name} is already in your Labour Bank.`,
      });
      return;
    }
    addToLabourBank(electrician.id, electrician.name, electrician.dayRate, electrician.hourlyRate);
    toast({
      title: "Added to Labour Bank",
      description: `${electrician.name} has been added at £${electrician.dayRate}/day.`,
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-elec-yellow/10 rounded-lg">
            <Users className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Talent Pool</h1>
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {totalCount} electricians • {availableNowCount} available now
                </>
              )}
            </p>
          </div>
        </div>
        {!isLoading && availableNowCount > 0 && (
          <Badge className="bg-success/10 text-success border-success/30">
            <Sparkles className="h-3 w-3 mr-1" />
            {availableNowCount} ready to work
          </Badge>
        )}
      </div>

      {/* Error State */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 text-center">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Search Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sparkies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-elec-gray border-border touch-manipulation"
          />
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 touch-manipulation"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>

        {/* Filter Button */}
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 relative touch-manipulation">
              <SlidersHorizontal className="h-5 w-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-elec-yellow text-elec-yellow-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl flex flex-col">
            <SheetHeader className="pb-4 border-b border-border shrink-0">
              <div className="flex items-center justify-between">
                <SheetTitle>Filters</SheetTitle>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {/* Availability */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Availability</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'now', label: 'Available Now' },
                    { value: 'week', label: 'This Week' },
                  ].map((opt) => (
                    <Button
                      key={opt.value}
                      variant={availabilityFilter === opt.value ? "default" : "outline"}
                      size="sm"
                      className="h-10"
                      onClick={() => setAvailabilityFilter(opt.value as AvailabilityFilter)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Elec-ID Verification Tier */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Elec-ID Verification</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Any', icon: null },
                    { value: 'verified', label: 'Verified+', icon: Shield },
                    { value: 'premium', label: 'Premium', icon: Award },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <Button
                        key={opt.value}
                        variant={tierFilter === opt.value ? "default" : "outline"}
                        size="sm"
                        className="h-10"
                        onClick={() => setTierFilter(opt.value as TierFilter)}
                      >
                        {Icon && <Icon className="h-4 w-4 mr-1.5" />}
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Verified = ECS + qualification. Premium = full credentials.
                </p>
              </div>

              {/* Specialisms */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Specialisms</Label>
                <div className="flex flex-wrap gap-2">
                  {specialisms.map((spec) => (
                    <Badge
                      key={spec}
                      variant={selectedSpecialisms.includes(spec) ? "default" : "outline"}
                      className="cursor-pointer h-9 px-4 text-sm"
                      onClick={() => toggleSpecialism(spec)}
                    >
                      {selectedSpecialisms.includes(spec) && <Check className="h-3 w-3 mr-1" />}
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Experience Level</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Any' },
                    { value: 'entry', label: 'Entry (0-2yr)' },
                    { value: 'mid', label: 'Mid (3-7yr)' },
                    { value: 'senior', label: 'Senior (8+yr)' },
                  ].map((opt) => (
                    <Button
                      key={opt.value}
                      variant={experienceFilter === opt.value ? "default" : "outline"}
                      size="sm"
                      className="h-10 flex-1"
                      onClick={() => setExperienceFilter(opt.value as ExperienceLevel)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* ECS Card Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">ECS Card Type</Label>
                <div className="flex flex-wrap gap-2">
                  {ECS_CARD_TYPES.map((card) => (
                    <Badge
                      key={card}
                      variant={selectedEcsCards.includes(card) ? "default" : "outline"}
                      className={`cursor-pointer h-9 px-4 text-sm ${
                        selectedEcsCards.includes(card)
                          ? card === 'Gold' ? 'bg-amber-500' :
                            card === 'Blue' ? 'bg-blue-500' :
                            card === 'Green' ? 'bg-emerald-500' : 'bg-purple-500'
                          : ''
                      }`}
                      onClick={() => setSelectedEcsCards(prev =>
                        prev.includes(card) ? prev.filter(c => c !== card) : [...prev, card]
                      )}
                    >
                      {selectedEcsCards.includes(card) && <Check className="h-3 w-3 mr-1" />}
                      {card}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Qualifications</Label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_QUALIFICATIONS.map((qual) => (
                    <Badge
                      key={qual}
                      variant={selectedQualifications.includes(qual) ? "default" : "outline"}
                      className="cursor-pointer h-9 px-4 text-sm"
                      onClick={() => setSelectedQualifications(prev =>
                        prev.includes(qual) ? prev.filter(q => q !== qual) : [...prev, qual]
                      )}
                    >
                      {selectedQualifications.includes(qual) && <Check className="h-3 w-3 mr-1" />}
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Day Rate Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Day Rate</Label>
                  <span className="text-sm text-muted-foreground">
                    £{rateRange[0]} - £{rateRange[1]}{rateRange[1] >= 500 ? '+' : ''}
                  </span>
                </div>
                <div className="px-2">
                  <Slider
                    value={rateRange}
                    min={150}
                    max={500}
                    step={25}
                    onValueChange={(value) => setRateRange(value as [number, number])}
                    className="touch-manipulation"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>£150</span>
                  <span>£500+</span>
                </div>
              </div>

              {/* Labour Bank Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Labour Bank Only</p>
                    <p className="text-sm text-muted-foreground">Pre-agreed rates</p>
                  </div>
                </div>
                <Button
                  variant={labourBankOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLabourBankOnly(!labourBankOnly)}
                >
                  {labourBankOnly ? "On" : "Off"}
                </Button>
              </div>
            </div>

            <div className="shrink-0 pt-4 border-t border-border bg-background pb-safe">
              <Button
                className="w-full h-12 touch-manipulation"
                onClick={() => setFilterSheetOpen(false)}
              >
                Done
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Quick Filter Bar - Horizontal Scrollable Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        <Badge
          variant={availabilityFilter === 'now' ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation bg-success/10 border-success/30 hover:bg-success/20"
          onClick={() => setAvailabilityFilter(availabilityFilter === 'now' ? 'all' : 'now')}
        >
          {availabilityFilter === 'now' && <Check className="h-3 w-3 mr-1" />}
          <Sparkles className="h-3 w-3 mr-1" />
          Available Now
        </Badge>
        <Badge
          variant={tierFilter === 'verified' ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation"
          onClick={() => setTierFilter(tierFilter === 'verified' ? 'all' : 'verified')}
        >
          {tierFilter === 'verified' && <Check className="h-3 w-3 mr-1" />}
          <Shield className="h-3 w-3 mr-1" />
          Verified+
        </Badge>
        <Badge
          variant={tierFilter === 'premium' ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20"
          onClick={() => setTierFilter(tierFilter === 'premium' ? 'all' : 'premium')}
        >
          {tierFilter === 'premium' && <Check className="h-3 w-3 mr-1" />}
          <Award className="h-3 w-3 mr-1" />
          Premium
        </Badge>
        <Badge
          variant={selectedSpecialisms.includes('EV Charging') ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation"
          onClick={() => toggleSpecialism('EV Charging')}
        >
          {selectedSpecialisms.includes('EV Charging') && <Check className="h-3 w-3 mr-1" />}
          EV Specialists
        </Badge>
        <Badge
          variant={selectedSpecialisms.includes('Solar PV') ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation"
          onClick={() => toggleSpecialism('Solar PV')}
        >
          {selectedSpecialisms.includes('Solar PV') && <Check className="h-3 w-3 mr-1" />}
          Solar PV
        </Badge>
        <Badge
          variant={experienceFilter === 'senior' ? "default" : "outline"}
          className="cursor-pointer h-9 px-4 text-sm whitespace-nowrap flex-shrink-0 touch-manipulation"
          onClick={() => setExperienceFilter(experienceFilter === 'senior' ? 'all' : 'senior')}
        >
          {experienceFilter === 'senior' && <Check className="h-3 w-3 mr-1" />}
          8+ Years Exp
        </Badge>
      </div>

      {/* Inline Filter Chips */}
      <TalentFilterChips
        availabilityFilter={availabilityFilter}
        tierFilter={tierFilter}
        selectedSpecialisms={selectedSpecialisms}
        labourBankOnly={labourBankOnly}
        experienceFilter={experienceFilter}
        selectedEcsCards={selectedEcsCards}
        selectedQualifications={selectedQualifications}
        rateRange={rateRange}
        onRemoveAvailability={() => setAvailabilityFilter('all')}
        onRemoveTier={() => setTierFilter('all')}
        onRemoveSpecialism={(spec) => setSelectedSpecialisms(prev => prev.filter(s => s !== spec))}
        onRemoveLabourBank={() => setLabourBankOnly(false)}
        onRemoveExperience={() => setExperienceFilter('all')}
        onRemoveEcsCard={(card) => setSelectedEcsCards(prev => prev.filter(c => c !== card))}
        onRemoveQualification={(qual) => setSelectedQualifications(prev => prev.filter(q => q !== qual))}
        onResetRateRange={() => setRateRange([150, 500])}
        onOpenFilters={() => setFilterSheetOpen(true)}
        totalResults={filteredElectricians.length}
      />

      {/* View Toggle */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
        <TabsList className="w-full h-12 grid grid-cols-3">
          <TabsTrigger value="list" className="gap-2">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Map</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content based on view mode */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {/* Skeleton Loading State */}
          {isLoading && <TalentProfileCardSkeletonGrid count={5} />}

          {/* Results */}
          {!isLoading && filteredElectricians.map((electrician) => {
            const isSaved = savedCandidates.includes(electrician.id);
            const labourBankRate = getLabourBankRate(electrician.id);
            const isInLabourBank = !!labourBankRate;

            return (
              <PremiumTalentCard
                key={electrician.id}
                id={electrician.id}
                elecIdProfileId={(electrician as any).elecIdProfileId}
                name={electrician.name}
                avatar={electrician.avatar}
                verificationTier={electrician.verificationTier}
                ecsCardType={electrician.ecsCardType}
                rating={electrician.rating}
                distance={electrician.distance}
                location={electrician.location}
                dayRate={electrician.dayRate}
                availability={electrician.availability}
                verifiedDocsCount={(electrician as any).verifiedDocsCount || 0}
                specialisms={electrician.specialisms}
                qualifications={electrician.qualifications}
                skills={(electrician as any).skills || []}
                currentRole={(electrician as any).currentRole}
                totalYearsExperience={(electrician as any).totalYearsExperience}
                completedJobs={electrician.completedJobs}
                elecIdNumber={(electrician as any).elecIdNumber}
                isSaved={isSaved}
                isInLabourBank={isInLabourBank}
                labourBankRate={labourBankRate?.agreedDayRate}
                onClick={() => handleOpenProfile(electrician)}
                onSave={() => handleSave(electrician)}
                onMessage={() => handleMessage(electrician)}
                onBook={() => handleBook(electrician)}
              />
            );
          })}

          {/* Empty State */}
          {!isLoading && filteredElectricians.length === 0 && (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No sparkies found</h3>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
                {activeFilterCount > 0 && (
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {viewMode === 'map' && (
        <>
          {isLoading ? (
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </Card>
          ) : (
            <GoogleMapsProvider>
              <TalentMapView
                electricians={filteredElectricians}
                savedCandidates={savedCandidates}
                labourBankIds={labourBankIds}
                onSelectElectrician={handleOpenProfile}
              />
            </GoogleMapsProvider>
          )}
        </>
      )}

      {viewMode === 'calendar' && (
        <>
          {isLoading ? (
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-elec-yellow border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading calendar...</p>
              </div>
            </Card>
          ) : (
            <AvailabilityCalendar
              electricians={filteredElectricians}
              labourBankIds={labourBankIds}
              onSelectElectrician={(electrician) => {
                setSelectedElectrician(electrician);
                setBookingDialogOpen(true);
              }}
            />
          )}
        </>
      )}

      {/* Profile Sheet */}
      <SparkProfileSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        electrician={selectedElectrician}
        isSaved={selectedElectrician ? savedCandidates.includes(selectedElectrician.id) : false}
        isInLabourBank={selectedElectrician ? labourBankIds.includes(selectedElectrician.id) : false}
        labourBankRate={selectedElectrician ? getLabourBankRate(selectedElectrician.id)?.agreedDayRate : undefined}
        onSave={() => selectedElectrician && handleSave(selectedElectrician)}
        onContact={() => selectedElectrician && handleMessage(selectedElectrician)}
        onBook={() => selectedElectrician && handleBook(selectedElectrician)}
        onAddToLabourBank={() => selectedElectrician && handleAddToLabourBank(selectedElectrician)}
      />

      {/* Message Dialog - Real Messaging */}
      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        electrician={selectedElectrician ? {
          id: selectedElectrician.id,
          elecIdProfileId: (selectedElectrician as any).elecIdProfileId || selectedElectrician.id,
          name: selectedElectrician.name,
          avatar: selectedElectrician.avatar,
          location: selectedElectrician.location,
          verificationTier: selectedElectrician.verificationTier,
        } : null}
      />

      {/* Invite to Apply Dialog */}
      <InviteToApplyDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        electrician={selectedElectrician ? {
          id: selectedElectrician.id,
          elecIdProfileId: (selectedElectrician as any).elecIdProfileId || selectedElectrician.id,
          name: selectedElectrician.name,
          avatar: selectedElectrician.avatar,
          location: selectedElectrician.location,
        } : null}
      />

      {/* Booking Dialog */}
      <BookLabourBankDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        electrician={selectedElectrician ? {
          id: selectedElectrician.id,
          name: selectedElectrician.name,
          ecsCardType: selectedElectrician.ecsCardType,
          dayRate: selectedElectrician.dayRate,
          hourlyRate: selectedElectrician.hourlyRate,
        } : null}
        preAgreedRate={selectedElectrician ? getLabourBankRate(selectedElectrician.id)?.agreedDayRate : undefined}
      />
    </div>
  );
}
