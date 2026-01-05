import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookLabourBankDialog } from "@/components/employer/dialogs/BookLabourBankDialog";
import { SparkProfileSheet, type EnhancedElectrician, type VerificationTier } from "@/components/employer/SparkProfileSheet";
import { TalentMapView } from "@/components/employer/TalentMapView";
import { AvailabilityCalendar } from "@/components/employer/AvailabilityCalendar";
import { 
  Search, 
  MapPin, 
  Star, 
  Briefcase, 
  Heart,
  MessageSquare,
  Award,
  Zap,
  Calendar,
  Send,
  Map,
  List,
  CalendarDays,
  SlidersHorizontal,
  Shield,
  X,
  Check
} from "lucide-react";
import { availableElectricians } from "@/data/employerMockData";
import { toast } from "@/hooks/use-toast";
import { useEmployer } from "@/contexts/EmployerContext";
import { addDays, format } from "date-fns";

type ViewMode = 'list' | 'map' | 'calendar';
type AvailabilityFilter = 'all' | 'now' | 'week';
type TierFilter = 'all' | 'gold+' | 'platinum';

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
  // Convert miles to approximate degrees (1 mile ≈ 0.0145 degrees)
  const distanceInDegrees = distance * 0.0145;
  
  return {
    lat: BASE_LAT + Math.sin(angle) * distanceInDegrees,
    lng: BASE_LNG + Math.cos(angle) * distanceInDegrees * 1.6 // Adjust for latitude
  };
};

// Enhance electricians with additional data for the new design
const enhanceElectricians = (electricians: typeof availableElectricians): EnhancedElectrician[] => {
  const tierMap: Record<string, VerificationTier> = {
    'AE-001': 'gold',
    'AE-002': 'platinum',
    'AE-003': 'silver',
    'AE-004': 'platinum',
    'AE-005': 'bronze',
  };

  const reviewsMap: Record<string, EnhancedElectrician['reviews']> = {
    'AE-001': [
      { id: 'R1', employerName: 'Spark Solutions Ltd', rating: 5, comment: 'Excellent work on our commercial project. Very thorough testing and documentation.', date: 'Jan 2024', jobType: 'Commercial Rewire' },
      { id: 'R2', employerName: 'BuildRight Construction', rating: 4, comment: 'Good worker, reliable and professional. Would hire again.', date: 'Nov 2023', jobType: 'Industrial' },
    ],
    'AE-002': [
      { id: 'R3', employerName: 'Office Fit Ltd', rating: 5, comment: 'Chris did a fantastic job on our office lighting upgrade. Highly recommended!', date: 'Feb 2024', jobType: 'Commercial Lighting' },
      { id: 'R4', employerName: 'DataCentre UK', rating: 5, comment: 'Outstanding fire alarm installation. Expert knowledge.', date: 'Jan 2024', jobType: 'Fire Alarm' },
      { id: 'R5', employerName: 'Manufacturing Co', rating: 5, comment: 'Exceptional industrial experience. Very professional.', date: 'Dec 2023', jobType: 'Industrial' },
    ],
    'AE-003': [
      { id: 'R6', employerName: 'HomeServe', rating: 4, comment: 'Reliable domestic installer. Good attention to detail.', date: 'Dec 2023', jobType: 'Domestic Rewire' },
    ],
    'AE-004': [
      { id: 'R7', employerName: 'DataCentre Solutions', rating: 5, comment: 'Alex is our go-to for critical infrastructure work. Never disappoints.', date: 'Jan 2024', jobType: 'Data Centre' },
      { id: 'R8', employerName: 'NHS Trust', rating: 5, comment: 'Excellent testing and certification work. Very thorough.', date: 'Dec 2023', jobType: 'Healthcare' },
    ],
    'AE-005': [],
  };

  const responseTimeMap: Record<string, string> = {
    'AE-001': '< 1hr',
    'AE-002': '< 2hrs',
    'AE-003': '< 4hrs',
    'AE-004': '< 1hr',
    'AE-005': '< 30min',
  };

  // Seeded random for stable availability
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Generate stable availability slots for the next 2 weeks
  const generateAvailabilitySlots = (id: string) => {
    const slots: EnhancedElectrician['availabilitySlots'] = [];
    const today = new Date();
    const baseSeed = hashCode(id);
    
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      const daySeed = baseSeed + i * 1000;
      
      // Weekends - less availability
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        if (seededRandom(daySeed) > 0.7) {
          slots.push({ date: format(date, 'yyyy-MM-dd'), slots: ['morning'] });
        }
      } else {
        // Weekday availability based on seeded random
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

  return electricians.map(e => ({
    ...e,
    verificationTier: tierMap[e.id] || 'basic',
    responseTime: responseTimeMap[e.id] || '< 4hrs',
    reviews: reviewsMap[e.id] || [],
    availabilitySlots: generateAvailabilitySlots(e.id),
    coordinates: generateStableCoordinates(e.id, e.distance),
  }));
};

const tierConfig: Record<VerificationTier, { label: string; color: string; bg: string }> = {
  basic: { label: 'Basic', color: 'text-muted-foreground', bg: 'bg-muted' },
  bronze: { label: 'Bronze', color: 'text-amber-700', bg: 'bg-amber-100' },
  silver: { label: 'Silver', color: 'text-slate-500', bg: 'bg-slate-100' },
  gold: { label: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  platinum: { label: 'Platinum', color: 'text-purple-600', bg: 'bg-purple-100' },
};

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
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [selectedElectrician, setSelectedElectrician] = useState<EnhancedElectrician | null>(null);
  const [contactMessage, setContactMessage] = useState("");

  // Filter state
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [selectedSpecialisms, setSelectedSpecialisms] = useState<string[]>([]);
  const [labourBankOnly, setLabourBankOnly] = useState(false);

  // Enhanced electricians with all new data
  const enhancedElectricians = useMemo(() => enhanceElectricians(availableElectricians), []);

  // Get Labour Bank IDs
  const labourBankIds = labourBank.map(m => m.electricianId);

  // Count active filters
  const activeFilterCount = [
    availabilityFilter !== 'all',
    tierFilter !== 'all',
    selectedSpecialisms.length > 0,
    labourBankOnly,
  ].filter(Boolean).length;

  // Filter electricians
  const filteredElectricians = useMemo(() => {
    return enhancedElectricians.filter(e => {
      // Search filter
      const matchesSearch = !searchQuery || 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.specialisms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Availability filter
      let matchesAvailability = true;
      if (availabilityFilter === 'now') matchesAvailability = e.availability === 'Immediate';
      if (availabilityFilter === 'week') matchesAvailability = e.availability !== 'Limited';
      
      // Tier filter
      let matchesTier = true;
      if (tierFilter === 'gold+') matchesTier = e.verificationTier === 'gold' || e.verificationTier === 'platinum';
      if (tierFilter === 'platinum') matchesTier = e.verificationTier === 'platinum';
      
      // Specialism filter
      const matchesSpecialism = selectedSpecialisms.length === 0 || 
        selectedSpecialisms.some(s => e.specialisms.includes(s));
      
      // Labour Bank filter
      const matchesLabourBank = !labourBankOnly || labourBankIds.includes(e.id);
      
      return matchesSearch && matchesAvailability && matchesTier && matchesSpecialism && matchesLabourBank;
    });
  }, [enhancedElectricians, searchQuery, availabilityFilter, tierFilter, selectedSpecialisms, labourBankOnly, labourBankIds]);

  // Get Labour Bank rate if available
  const getLabourBankRate = (electricianId: string) => {
    return labourBank.find(r => r.electricianId === electricianId);
  };

  const clearFilters = () => {
    setAvailabilityFilter('all');
    setTierFilter('all');
    setSelectedSpecialisms([]);
    setLabourBankOnly(false);
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

  const handleContact = (electrician: EnhancedElectrician) => {
    setSelectedElectrician(electrician);
    setContactMessage("");
    setContactDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!selectedElectrician || !contactMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedElectrician.name}.`,
    });
    setContactDialogOpen(false);
    setContactMessage("");
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

  const availableNow = filteredElectricians.filter(e => e.availability === 'Immediate').length;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Talent Pool</h1>
          <Badge variant="secondary" className="font-medium">
            {availableNow} available
          </Badge>
        </div>
      </div>

      {/* Search Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search electricians..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-elec-gray border-border"
          />
        </div>
        
        {/* Filter Button */}
        <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 relative">
              <SlidersHorizontal className="h-5 w-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-elec-yellow text-elec-yellow-foreground text-xs rounded-full flex items-center justify-center">
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

              {/* Verification Tier */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Verification Tier</Label>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Any' },
                    { value: 'gold+', label: 'Gold+' },
                    { value: 'platinum', label: 'Platinum' },
                  ].map((opt) => (
                    <Button
                      key={opt.value}
                      variant={tierFilter === opt.value ? "default" : "outline"}
                      size="sm"
                      className="h-10"
                      onClick={() => setTierFilter(opt.value as TierFilter)}
                    >
                      {opt.value !== 'all' && <Award className="h-4 w-4 mr-1.5" />}
                      {opt.label}
                    </Button>
                  ))}
                </div>
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
                className="w-full h-12" 
                onClick={() => setFilterSheetOpen(false)}
              >
                Show {filteredElectricians.length} results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* View Toggle - Full Width Segmented Control */}
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
          {filteredElectricians.map((electrician) => {
            const isSaved = savedCandidates.includes(electrician.id);
            const labourBankRate = getLabourBankRate(electrician.id);
            const isInLabourBank = !!labourBankRate;
            const initials = electrician.name.split(' ').map(n => n[0]).join('');
            const tier = tierConfig[electrician.verificationTier];

            return (
              <Card 
                key={electrician.id} 
                className={`bg-elec-gray border-border overflow-hidden touch-feedback ${
                  isInLabourBank ? 'border-l-4 border-l-success' : ''
                }`}
                onClick={() => handleOpenProfile(electrician)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar with tier badge */}
                    <div className="relative shrink-0">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={electrician.avatar} alt={electrician.name} />
                        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      {electrician.verified && (
                        <div className={`absolute -bottom-0.5 -right-0.5 ${tier.bg} p-0.5 rounded-full`}>
                          {electrician.verificationTier === 'platinum' || electrician.verificationTier === 'gold' ? (
                            <Award className={`h-3 w-3 ${tier.color}`} />
                          ) : (
                            <Shield className={`h-3 w-3 ${tier.color}`} />
                          )}
                        </div>
                      )}
                      {/* Available now indicator */}
                      {electrician.availability === 'Immediate' && (
                        <div className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-background" />
                      )}
                    </div>

                    {/* Core Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{electrician.name}</h3>
                        {isInLabourBank && (
                          <Zap className="h-3.5 w-3.5 text-success shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning fill-warning" />
                          <span className="font-medium text-foreground">{electrician.rating}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{electrician.distance}mi</span>
                        </div>
                      </div>
                    </div>

                    {/* Rate */}
                    <div className="text-right shrink-0">
                      {labourBankRate ? (
                        <p className="font-bold text-success">£{labourBankRate.agreedDayRate}</p>
                      ) : (
                        <p className="font-bold text-foreground">£{electrician.dayRate}</p>
                      )}
                      <p className="text-xs text-muted-foreground">/day</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-9"
                      onClick={(e) => { e.stopPropagation(); handleSave(electrician); }}
                    >
                      <Heart className={`h-4 w-4 mr-1.5 ${isSaved ? 'fill-primary text-elec-yellow' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 h-9"
                      onClick={(e) => { e.stopPropagation(); handleContact(electrician); }}
                    >
                      <MessageSquare className="h-4 w-4 mr-1.5" />
                      Message
                    </Button>
                    {isInLabourBank ? (
                      <Button
                        size="sm"
                        className="flex-1 h-9 bg-success hover:bg-success/90"
                        onClick={(e) => { e.stopPropagation(); handleBook(electrician); }}
                      >
                        <Calendar className="h-4 w-4 mr-1.5" />
                        Book
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 h-9"
                        onClick={(e) => { e.stopPropagation(); handleBook(electrician); }}
                      >
                        <Briefcase className="h-4 w-4 mr-1.5" />
                        Hire
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredElectricians.length === 0 && (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No sparks found</h3>
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
        <TalentMapView
          electricians={filteredElectricians}
          savedCandidates={savedCandidates}
          labourBankIds={labourBankIds}
          onSelectElectrician={handleOpenProfile}
        />
      )}

      {viewMode === 'calendar' && (
        <AvailabilityCalendar
          electricians={filteredElectricians}
          labourBankIds={labourBankIds}
          onSelectElectrician={(electrician) => {
            setSelectedElectrician(electrician);
            setBookingDialogOpen(true);
          }}
        />
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
        onContact={() => selectedElectrician && handleContact(selectedElectrician)}
        onBook={() => selectedElectrician && handleBook(selectedElectrician)}
        onAddToLabourBank={() => selectedElectrician && handleAddToLabourBank(selectedElectrician)}
      />

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-elec-yellow" />
              Contact {selectedElectrician?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedElectrician && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedElectrician.avatar} alt={selectedElectrician.name} />
                  <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow font-bold">
                    {selectedElectrician.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedElectrician.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedElectrician.location}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Hi, I'm interested in discussing a potential project..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-12" onClick={() => setContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 h-12" onClick={handleSendMessage}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
