import { useState, useMemo, useCallback } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookLabourBankDialog } from '@/components/employer/dialogs/BookLabourBankDialog';
import {
  SparkProfileSheet,
  type EnhancedElectrician,
} from '@/components/employer/SparkProfileSheet';
import { TalentMapView } from '@/components/employer/TalentMapView';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import { AvailabilityCalendar } from '@/components/employer/AvailabilityCalendar';
import { MessageDialog } from '@/components/employer/talent-pool/MessageDialog';
import { InviteToApplyDialog } from '@/components/employer/talent-pool/InviteToApplyDialog';
import { TalentFilterChips } from '@/components/employer/talent-pool/TalentFilterChips';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Divider,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  fieldLabelClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  SlidersHorizontal,
  Shield,
  Check,
  Award,
  RefreshCw,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useEmployer } from '@/contexts/EmployerContext';
import { useTalentPool, type TalentPoolWorker, type ExperienceLevel } from '@/hooks/useTalentPool';
import { addDays, format } from 'date-fns';
import { Slider } from '@/components/ui/slider';

type ViewMode = 'list' | 'map' | 'calendar';
type AvailabilityFilter = 'all' | 'now' | 'week';
type TierFilter = 'all' | 'verified' | 'premium';

const ECS_CARD_TYPES = ['Gold', 'Blue', 'Green', 'Apprentice'];

const COMMON_QUALIFICATIONS = [
  '18th Edition BS7671',
  'C&G 2391 Inspection & Testing',
  'C&G 2382 18th Edition',
  'EV Charging Installation',
  'Solar PV Installation',
  'Part P Competent Person',
];

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const BASE_LAT = 53.4808;
const BASE_LNG = -2.2426;

const generateStableCoordinates = (id: string, distance: number): { lat: number; lng: number } => {
  const hash = hashCode(id);
  const angle = (hash % 360) * (Math.PI / 180);
  const distanceInDegrees = distance * 0.0145;

  return {
    lat: BASE_LAT + Math.sin(angle) * distanceInDegrees,
    lng: BASE_LNG + Math.cos(angle) * distanceInDegrees * 1.6,
  };
};

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

const convertToEnhancedElectrician = (
  worker: TalentPoolWorker
): EnhancedElectrician & {
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
  bio:
    worker.bio ||
    `Experienced ${worker.role.toLowerCase()} with ${worker.totalYearsExperience || worker.experience} years in the industry.`,
  qualifications:
    worker.qualifications.length > 0 ? worker.qualifications : ['18th Edition BS7671'],
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
  skills: worker.skills,
  currentRole: worker.currentRole,
  totalYearsExperience: worker.totalYearsExperience,
});

const specialisms = [
  'Commercial',
  'Industrial',
  'Domestic',
  'EV Charging',
  'Solar PV',
  'Fire Alarm',
  'Smart Home',
  'Testing',
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const availabilityToneFor = (availability: string): Tone => {
  const a = availability.toLowerCase();
  if (a.includes('now') || a.includes('available')) return 'emerald';
  if (a.includes('week') || a.includes('soon')) return 'amber';
  if (a.includes('busy') || a.includes('booked')) return 'red';
  return 'blue';
};

const tierToneFor = (tier: string | undefined): Tone => {
  if (tier === 'premium') return 'yellow';
  if (tier === 'verified') return 'emerald';
  return 'blue';
};

export function TalentPoolSection() {
  const { savedCandidates, labourBank, toggleSaveCandidate, addToLabourBank } = useEmployer();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedElectrician, setSelectedElectrician] = useState<EnhancedElectrician | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [selectedSpecialisms, setSelectedSpecialisms] = useState<string[]>([]);
  const [labourBankOnly, setLabourBankOnly] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState<ExperienceLevel>('all');
  const [selectedEcsCards, setSelectedEcsCards] = useState<string[]>([]);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  const [rateRange, setRateRange] = useState<[number, number]>([150, 500]);

  const { workers, isLoading, error, availableNowCount, totalCount, refetch } = useTalentPool({
    searchQuery,
    tierFilter,
    availabilityFilter,
    specialismsFilter: selectedSpecialisms,
    experienceFilter,
    ecsCardFilter: selectedEcsCards,
    qualificationsFilter: selectedQualifications,
    minRate: rateRange[0],
    maxRate: rateRange[1] < 500 ? rateRange[1] : undefined,
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    toast({
      title: 'Refreshed',
      description: 'Talent pool updated with latest availability.',
    });
  }, [refetch]);

  const enhancedElectricians = useMemo(() => workers.map(convertToEnhancedElectrician), [workers]);

  const labourBankIds = labourBank.map((m) => m.electricianId);

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

  const filteredElectricians = useMemo(() => {
    if (!labourBankOnly) return enhancedElectricians;
    return enhancedElectricians.filter((e) => labourBankIds.includes(e.id));
  }, [enhancedElectricians, labourBankOnly, labourBankIds]);

  const getLabourBankRate = (electricianId: string) => {
    return labourBank.find((r) => r.electricianId === electricianId);
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
    setSelectedSpecialisms((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
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
      title: wasSaved ? 'Removed from Saved' : 'Candidate Saved',
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
    if (labourBank.some((m) => m.electricianId === electrician.id)) {
      toast({
        title: 'Already in Labour Bank',
        description: `${electrician.name} is already in your Labour Bank.`,
      });
      return;
    }
    addToLabourBank(electrician.id, electrician.name, electrician.dayRate, electrician.hourlyRate);
    toast({
      title: 'Added to Labour Bank',
      description: `${electrician.name} has been added at £${electrician.dayRate}/day.`,
    });
  };

  const skillTabs = useMemo(
    () => [
      { value: 'all', label: 'All' },
      { value: 'available', label: 'Available now', count: availableNowCount },
      { value: 'verified', label: 'Verified+' },
      { value: 'premium', label: 'Premium' },
      { value: 'ev', label: 'EV Charging' },
      { value: 'solar', label: 'Solar PV' },
      { value: 'senior', label: 'Senior 8+ yrs' },
      { value: 'list', label: 'List' },
      { value: 'map', label: 'Map' },
      { value: 'calendar', label: 'Calendar' },
    ],
    [availableNowCount]
  );

  const activeQuickTab: string = useMemo(() => {
    if (viewMode === 'map') return 'map';
    if (viewMode === 'calendar') return 'calendar';
    if (availabilityFilter === 'now') return 'available';
    if (tierFilter === 'verified') return 'verified';
    if (tierFilter === 'premium') return 'premium';
    if (selectedSpecialisms.includes('EV Charging')) return 'ev';
    if (selectedSpecialisms.includes('Solar PV')) return 'solar';
    if (experienceFilter === 'senior') return 'senior';
    return viewMode === 'list' ? 'list' : 'all';
  }, [viewMode, availabilityFilter, tierFilter, selectedSpecialisms, experienceFilter]);

  const handleQuickTab = (value: string) => {
    switch (value) {
      case 'all':
        clearFilters();
        setViewMode('list');
        return;
      case 'available':
        setAvailabilityFilter(availabilityFilter === 'now' ? 'all' : 'now');
        setViewMode('list');
        return;
      case 'verified':
        setTierFilter(tierFilter === 'verified' ? 'all' : 'verified');
        setViewMode('list');
        return;
      case 'premium':
        setTierFilter(tierFilter === 'premium' ? 'all' : 'premium');
        setViewMode('list');
        return;
      case 'ev':
        toggleSpecialism('EV Charging');
        setViewMode('list');
        return;
      case 'solar':
        toggleSpecialism('Solar PV');
        setViewMode('list');
        return;
      case 'senior':
        setExperienceFilter(experienceFilter === 'senior' ? 'all' : 'senior');
        setViewMode('list');
        return;
      case 'list':
        setViewMode('list');
        return;
      case 'map':
        setViewMode('map');
        return;
      case 'calendar':
        setViewMode('calendar');
        return;
    }
  };

  const shortlistedCount = savedCandidates.length;
  const labourBankCount = labourBank.length;
  const signedCount = labourBankCount;
  const invitedCount = shortlistedCount;

  return (
    <PageFrame>
      <PageHero
        eyebrow="Hiring"
        title="Talent Pool"
        description="Browse available electricians by skill, rate and location."
        tone="blue"
        actions={
          <IconButton onClick={handleRefresh} aria-label="Refresh talent pool">
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </IconButton>
        }
      />

      {error && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            <p className="text-[13px] text-white">{error}</p>
          </div>
        </div>
      )}

      <StatStrip
        columns={4}
        stats={[
          { label: 'Available', value: availableNowCount, tone: 'emerald' },
          { label: 'Shortlisted', value: shortlistedCount, tone: 'yellow' },
          { label: 'Invited', value: invitedCount, tone: 'blue' },
          { label: 'Signed', value: signedCount, accent: true },
        ]}
      />

      <FilterBar
        tabs={skillTabs}
        activeTab={activeQuickTab}
        onTabChange={handleQuickTab}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search sparkies by name, skill, location…"
        actions={
          <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="relative h-10 px-4 rounded-full bg-white/[0.06] border border-white/[0.1] text-[12.5px] font-medium text-white inline-flex items-center gap-2 hover:bg-white/[0.1] transition-colors touch-manipulation"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl p-0 overflow-hidden">
              <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
                <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                  <div className="h-1 w-10 rounded-full bg-white/20" />
                </div>
                <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <Eyebrow>Hiring</Eyebrow>
                      <div className="mt-1 text-[20px] font-semibold text-white leading-tight">Filters</div>
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Availability</label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'now', label: 'Available now' },
                        { value: 'week', label: 'This week' },
                      ].map((opt) => {
                        const isActive = availabilityFilter === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setAvailabilityFilter(opt.value as AvailabilityFilter)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Elec-ID verification</label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { value: 'all', label: 'Any', icon: null },
                        { value: 'verified', label: 'Verified+', icon: Shield },
                        { value: 'premium', label: 'Premium', icon: Award },
                      ].map((opt) => {
                        const Icon = opt.icon;
                        const isActive = tierFilter === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setTierFilter(opt.value as TierFilter)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11.5px] text-white">Verified = ECS + qualification. Premium = full credentials.</p>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Specialisms</label>
                    <div className="flex flex-wrap gap-2">
                      {specialisms.map((spec) => {
                        const isActive = selectedSpecialisms.includes(spec);
                        return (
                          <button
                            key={spec}
                            onClick={() => toggleSpecialism(spec)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {isActive && <Check className="h-3 w-3" />}
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Experience level</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'all', label: 'Any' },
                        { value: 'entry', label: 'Entry (0-2 yr)' },
                        { value: 'mid', label: 'Mid (3-7 yr)' },
                        { value: 'senior', label: 'Senior (8+ yr)' },
                      ].map((opt) => {
                        const isActive = experienceFilter === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => setExperienceFilter(opt.value as ExperienceLevel)}
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>ECS card type</label>
                    <div className="flex flex-wrap gap-2">
                      {ECS_CARD_TYPES.map((card) => {
                        const isActive = selectedEcsCards.includes(card);
                        return (
                          <button
                            key={card}
                            onClick={() =>
                              setSelectedEcsCards((prev) =>
                                prev.includes(card) ? prev.filter((c) => c !== card) : [...prev, card]
                              )
                            }
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {isActive && <Check className="h-3 w-3" />}
                            {card}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <label className={fieldLabelClass}>Qualifications</label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_QUALIFICATIONS.map((qual) => {
                        const isActive = selectedQualifications.includes(qual);
                        return (
                          <button
                            key={qual}
                            onClick={() =>
                              setSelectedQualifications((prev) =>
                                prev.includes(qual) ? prev.filter((q) => q !== qual) : [...prev, qual]
                              )
                            }
                            className={`h-11 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors inline-flex items-center gap-1.5 ${isActive ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08] hover:bg-white/[0.08]'}`}
                          >
                            {isActive && <Check className="h-3 w-3" />}
                            {qual}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Divider />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className={fieldLabelClass}>Day rate</label>
                      <span className="text-[12.5px] font-semibold text-white tabular-nums">
                        £{rateRange[0]} – £{rateRange[1]}{rateRange[1] >= 500 ? '+' : ''}
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
                    <div className="flex justify-between text-[11px] text-white">
                      <span>£150</span>
                      <span>£500+</span>
                    </div>
                  </div>

                  <Divider />

                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-white">Labour Bank only</p>
                      <p className="text-[11.5px] text-white">Pre-agreed rates</p>
                    </div>
                    <button
                      onClick={() => setLabourBankOnly(!labourBankOnly)}
                      className={`h-10 px-4 rounded-full text-[12.5px] font-medium border touch-manipulation transition-colors ${labourBankOnly ? 'bg-elec-yellow text-black border-elec-yellow' : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08]'}`}
                    >
                      {labourBankOnly ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 border-t border-white/[0.06] p-4 flex flex-row gap-2">
                  {activeFilterCount > 0 && (
                    <SecondaryButton onClick={clearFilters} fullWidth>
                      Clear
                    </SecondaryButton>
                  )}
                  <PrimaryButton onClick={() => setFilterSheetOpen(false)} fullWidth size="lg">
                    Done
                  </PrimaryButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

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
        onRemoveSpecialism={(spec) =>
          setSelectedSpecialisms((prev) => prev.filter((s) => s !== spec))
        }
        onRemoveLabourBank={() => setLabourBankOnly(false)}
        onRemoveExperience={() => setExperienceFilter('all')}
        onRemoveEcsCard={(card) => setSelectedEcsCards((prev) => prev.filter((c) => c !== card))}
        onRemoveQualification={(qual) =>
          setSelectedQualifications((prev) => prev.filter((q) => q !== qual))
        }
        onResetRateRange={() => setRateRange([150, 500])}
        onOpenFilters={() => setFilterSheetOpen(true)}
        totalResults={filteredElectricians.length}
      />

      {isLoading && <LoadingBlocks />}

      {!isLoading && viewMode === 'list' && (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Available talent"
            meta={
              <span className="inline-flex items-center gap-2">
                <Pill tone="blue">{filteredElectricians.length}</Pill>
                {availableNowCount > 0 && (
                  <Pill tone="emerald">{availableNowCount} now</Pill>
                )}
              </span>
            }
          />
          {filteredElectricians.length === 0 ? (
            <div className="px-5 py-10">
              <EmptyState
                title="No candidates match"
                description={activeFilterCount > 0 ? 'Try removing a filter or widening the rate range.' : 'No electricians match your search.'}
                action={activeFilterCount > 0 ? 'Clear filters' : undefined}
                onAction={activeFilterCount > 0 ? clearFilters : undefined}
              />
            </div>
          ) : (
            <ListBody>
              {filteredElectricians.map((electrician) => {
                const isSaved = savedCandidates.includes(electrician.id);
                const labourBankRate = getLabourBankRate(electrician.id);
                const isInLabourBank = !!labourBankRate;
                const availTone = availabilityToneFor(electrician.availability);
                const tierTone = tierToneFor(electrician.verificationTier as string | undefined);
                const role = (electrician as any).currentRole || 'Electrician';

                return (
                  <ListRow
                    key={electrician.id}
                    lead={<Avatar initials={getInitials(electrician.name)} />}
                    title={
                      <span className="inline-flex items-center gap-2">
                        <span className="text-white">{electrician.name}</span>
                        {isInLabourBank && <Pill tone="yellow">Labour Bank</Pill>}
                        {isSaved && <Pill tone="amber">Saved</Pill>}
                      </span>
                    }
                    subtitle={`${role} · ${electrician.location} · £${electrician.dayRate}/day · ${(electrician as any).totalYearsExperience ?? electrician.experience} yrs`}
                    trailing={
                      <>
                        <Pill tone={tierTone}>{electrician.verificationTier ?? 'verified'}</Pill>
                        <Pill tone={availTone}>{electrician.availability}</Pill>
                      </>
                    }
                    onClick={() => handleOpenProfile(electrician)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
      )}

      {!isLoading && viewMode === 'map' && (
        <ListCard>
          <ListCardHeader tone="cyan" title="Map view" meta={<Pill tone="cyan">{filteredElectricians.length}</Pill>} />
          <div className="p-4 sm:p-5">
            <GoogleMapsProvider>
              <TalentMapView
                electricians={filteredElectricians}
                savedCandidates={savedCandidates}
                labourBankIds={labourBankIds}
                onSelectElectrician={handleOpenProfile}
              />
            </GoogleMapsProvider>
          </div>
        </ListCard>
      )}

      {!isLoading && viewMode === 'calendar' && (
        <ListCard>
          <ListCardHeader tone="purple" title="Availability calendar" meta={<Pill tone="purple">{filteredElectricians.length}</Pill>} />
          <div className="p-4 sm:p-5">
            <AvailabilityCalendar
              electricians={filteredElectricians}
              labourBankIds={labourBankIds}
              onSelectElectrician={(electrician) => {
                setSelectedElectrician(electrician);
                setBookingDialogOpen(true);
              }}
            />
          </div>
        </ListCard>
      )}

      <SparkProfileSheet
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
        electrician={selectedElectrician}
        isSaved={selectedElectrician ? savedCandidates.includes(selectedElectrician.id) : false}
        isInLabourBank={
          selectedElectrician ? labourBankIds.includes(selectedElectrician.id) : false
        }
        labourBankRate={
          selectedElectrician ? getLabourBankRate(selectedElectrician.id)?.agreedDayRate : undefined
        }
        onSave={() => selectedElectrician && handleSave(selectedElectrician)}
        onContact={() => selectedElectrician && handleMessage(selectedElectrician)}
        onBook={() => selectedElectrician && handleBook(selectedElectrician)}
        onAddToLabourBank={() => selectedElectrician && handleAddToLabourBank(selectedElectrician)}
      />

      <MessageDialog
        open={messageDialogOpen}
        onOpenChange={setMessageDialogOpen}
        electrician={
          selectedElectrician
            ? {
                id: selectedElectrician.id,
                elecIdProfileId:
                  (selectedElectrician as any).elecIdProfileId || selectedElectrician.id,
                name: selectedElectrician.name,
                avatar: selectedElectrician.avatar,
                location: selectedElectrician.location,
                verificationTier: selectedElectrician.verificationTier,
              }
            : null
        }
      />

      <InviteToApplyDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
        electrician={
          selectedElectrician
            ? {
                id: selectedElectrician.id,
                elecIdProfileId:
                  (selectedElectrician as any).elecIdProfileId || selectedElectrician.id,
                name: selectedElectrician.name,
                avatar: selectedElectrician.avatar,
                location: selectedElectrician.location,
              }
            : null
        }
      />

      <BookLabourBankDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        electrician={
          selectedElectrician
            ? {
                id: selectedElectrician.id,
                name: selectedElectrician.name,
                ecsCardType: selectedElectrician.ecsCardType,
                dayRate: selectedElectrician.dayRate,
                hourlyRate: selectedElectrician.hourlyRate,
              }
            : null
        }
        preAgreedRate={
          selectedElectrician ? getLabourBankRate(selectedElectrician.id)?.agreedDayRate : undefined
        }
      />
    </PageFrame>
  );
}
