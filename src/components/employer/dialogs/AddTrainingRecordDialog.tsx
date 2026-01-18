import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  GraduationCap, 
  Building2, 
  Calendar, 
  FileText, 
  PoundSterling, 
  Bell, 
  Upload,
  CheckCircle2,
  Sparkles,
  Award,
  Clock,
  FileCheck,
  ChevronDown,
  Check,
  Shield,
  Zap,
  HardHat,
  AlertTriangle,
  Wrench,
  Heart,
  X,
  Search,
  PenLine
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAddElecIdTraining } from "@/hooks/useElecId";

const EXPIRY_OPTIONS = [
  { value: 1, label: "1 year" },
  { value: 3, label: "3 years" },
  { value: 5, label: "5 years" },
  { value: null, label: "No expiry" },
] as const;

const COMMON_PROVIDERS = [
  "CITB", "City & Guilds", "IOSH", "NEBOSH", "In-house", 
  "St John Ambulance", "British Red Cross", "PASMA", "IPAF"
];

// Training course data with categories, providers, and expiry periods
const TRAINING_COURSES = {
  "Health & Safety": [
    { name: "First Aid at Work", providers: ["St John Ambulance", "British Red Cross", "CITB"], expiryYears: 3, mandatory: true },
    { name: "Emergency First Aid", providers: ["St John Ambulance", "British Red Cross"], expiryYears: 3, mandatory: false },
    { name: "Mental Health First Aider", providers: ["MHFA England", "Mental Health at Work"], expiryYears: 3, mandatory: false },
    { name: "Fire Marshal / Warden", providers: ["CITB", "IOSH", "In-house"], expiryYears: 3, mandatory: true },
    { name: "Manual Handling", providers: ["CITB", "IOSH", "In-house"], expiryYears: 3, mandatory: true },
    { name: "COSHH Awareness", providers: ["CITB", "IOSH", "In-house"], expiryYears: 3, mandatory: false },
    { name: "DSE Assessment", providers: ["IOSH", "In-house"], expiryYears: null, mandatory: false },
  ],
  "Working at Height": [
    { name: "PASMA (Scaffold Towers)", providers: ["PASMA", "CITB"], expiryYears: 5, mandatory: true },
    { name: "MEWP Operator", providers: ["IPAF", "CITB"], expiryYears: 5, mandatory: true },
    { name: "Harness & Fall Arrest", providers: ["CITB", "Heightec", "Lyon Equipment"], expiryYears: 3, mandatory: true },
    { name: "Roof Work Safety", providers: ["CITB", "IOSH"], expiryYears: 3, mandatory: false },
    { name: "Working at Height General", providers: ["CITB", "IOSH", "In-house"], expiryYears: 3, mandatory: true },
    { name: "Ladder Safety", providers: ["CITB", "In-house"], expiryYears: 3, mandatory: false },
  ],
  "Hazardous Environments": [
    { name: "Asbestos Awareness", providers: ["CITB", "UKATA", "IOSH"], expiryYears: 1, mandatory: true },
    { name: "Confined Spaces", providers: ["CITB", "SafeContractor"], expiryYears: 3, mandatory: true },
    { name: "Respirator Fit Test", providers: ["Fit2Fit", "HSL"], expiryYears: 1, mandatory: true },
    { name: "Control of Substances Hazardous to Health", providers: ["CITB", "IOSH"], expiryYears: 3, mandatory: false },
    { name: "Lead Awareness", providers: ["CITB", "IOSH"], expiryYears: 3, mandatory: false },
    { name: "Legionella Awareness", providers: ["CITB", "Water Hygiene Centre"], expiryYears: 3, mandatory: false },
  ],
  "Electrical": [
    { name: "18th Edition Wiring Regulations", providers: ["City & Guilds", "NICEIC", "ECA"], expiryYears: null, mandatory: true },
    { name: "PAT Testing", providers: ["City & Guilds", "ECA", "JIB"], expiryYears: 3, mandatory: false },
    { name: "EV Charger Installation", providers: ["City & Guilds", "IMI", "ECA"], expiryYears: null, mandatory: false },
    { name: "Solar PV Installation", providers: ["City & Guilds", "MCS", "ECA"], expiryYears: null, mandatory: false },
    { name: "Inspection & Testing (2391)", providers: ["City & Guilds", "EAL", "NICEIC"], expiryYears: 5, mandatory: true },
    { name: "Initial Verification (2392)", providers: ["City & Guilds", "EAL"], expiryYears: 5, mandatory: false },
    { name: "Electrical Safety Awareness", providers: ["In-house", "ECA", "JIB"], expiryYears: 3, mandatory: false },
  ],
  "Equipment & Plant": [
    { name: "CSCS Card Renewal", providers: ["CSCS", "CITB"], expiryYears: 5, mandatory: true },
    { name: "Forklift / Telehandler", providers: ["RTITB", "ITSSAR", "AITT"], expiryYears: 3, mandatory: true },
    { name: "Abrasive Wheels", providers: ["CITB", "In-house"], expiryYears: 3, mandatory: true },
    { name: "Excavator / Plant Operator", providers: ["CPCS", "CITB"], expiryYears: 5, mandatory: true },
    { name: "Slinger / Signaller", providers: ["CPCS", "CITB"], expiryYears: 5, mandatory: false },
    { name: "Crane Operator", providers: ["CPCS", "ALLMI"], expiryYears: 5, mandatory: true },
    { name: "Powered Access (Boom)", providers: ["IPAF", "CITB"], expiryYears: 5, mandatory: false },
  ],
  "Construction & Trade": [
    { name: "Site Management Safety Training Scheme (SMSTS)", providers: ["CITB"], expiryYears: 5, mandatory: true },
    { name: "Site Supervisor Safety Training Scheme (SSSTS)", providers: ["CITB"], expiryYears: 5, mandatory: true },
    { name: "Health & Safety Awareness", providers: ["CITB", "IOSH"], expiryYears: 5, mandatory: true },
    { name: "IOSH Managing Safely", providers: ["IOSH"], expiryYears: 3, mandatory: false },
    { name: "NEBOSH General Certificate", providers: ["NEBOSH"], expiryYears: null, mandatory: false },
    { name: "Temporary Works Coordinator", providers: ["CITB", "TWforum"], expiryYears: 5, mandatory: false },
  ],
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Health & Safety": <Heart className="h-4 w-4" />,
  "Working at Height": <HardHat className="h-4 w-4" />,
  "Hazardous Environments": <AlertTriangle className="h-4 w-4" />,
  "Electrical": <Zap className="h-4 w-4" />,
  "Equipment & Plant": <Wrench className="h-4 w-4" />,
  "Construction & Trade": <Shield className="h-4 w-4" />,
};

interface AddTrainingRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workerName: string;
  profileId?: string;
}

export const AddTrainingRecordDialog = ({
  open,
  onOpenChange,
  workerName,
  profileId,
}: AddTrainingRecordDialogProps) => {
  const addTraining = useAddElecIdTraining();
  const [courseOpen, setCourseOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);
  const [customExpiryYears, setCustomExpiryYears] = useState<number | null>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    courseName: "",
    provider: "",
    completionDate: "",
    expiryDate: "",
    certificateNumber: "",
    fundingSource: "employer",
    cost: "",
    notes: "",
  });
  const [selectedCourse, setSelectedCourse] = useState<{
    name: string;
    providers: string[];
    expiryYears: number | null;
    mandatory: boolean;
  } | null>(null);

  // Get all courses flattened for searching
  const allCourses = useMemo(() => {
    return Object.entries(TRAINING_COURSES).flatMap(([category, courses]) =>
      courses.map(course => ({ ...course, category }))
    );
  }, []);

  // Get filtered courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory) {
      return { [selectedCategory]: TRAINING_COURSES[selectedCategory as keyof typeof TRAINING_COURSES] };
    }
    return TRAINING_COURSES;
  }, [selectedCategory]);

  // Calculate expiry date based on completion date and course expiry years
  const calculateExpiryDate = (completionDate: string, expiryYears: number | null) => {
    if (!completionDate || expiryYears === null) return "";
    const date = new Date(completionDate);
    date.setFullYear(date.getFullYear() + expiryYears);
    return date.toISOString().split('T')[0];
  };

  // Handle course selection
  const handleCourseSelect = (course: typeof allCourses[0]) => {
    setSelectedCourse(course);
    setFormData(prev => ({
      ...prev,
      courseName: course.name,
      provider: course.providers[0], // Auto-select first provider
      expiryDate: calculateExpiryDate(prev.completionDate, course.expiryYears),
    }));
    setCourseOpen(false);
  };

  // Handle completion date change - recalculate expiry
  const handleCompletionDateChange = (date: string) => {
    const expiryYears = selectedCourse?.expiryYears ?? (isManualMode ? customExpiryYears : null);
    setFormData(prev => ({
      ...prev,
      completionDate: date,
      expiryDate: calculateExpiryDate(date, expiryYears),
    }));
  };

  // Handle custom expiry years change for manual mode
  const handleCustomExpiryChange = (years: number | null) => {
    setCustomExpiryYears(years);
    if (formData.completionDate) {
      setFormData(prev => ({
        ...prev,
        expiryDate: calculateExpiryDate(prev.completionDate, years),
      }));
    }
  };

  // Handle adding custom course from search
  const handleAddCustomCourse = () => {
    if (searchQuery.trim()) {
      setFormData(prev => ({ ...prev, courseName: searchQuery.trim() }));
      setSelectedCourse(null);
      setCourseOpen(false);
      setSearchQuery("");
    }
  };

  const handleSubmit = async () => {
    if (!formData.courseName || !formData.completionDate) {
      toast({
        title: "Required fields missing",
        description: "Please fill in the course name and completion date.",
        variant: "destructive",
      });
      return;
    }

    // If profileId is provided, save to Supabase
    if (profileId) {
      try {
        await addTraining.mutateAsync({
          profile_id: profileId,
          training_name: formData.courseName,
          provider: formData.provider || null,
          completed_date: formData.completionDate || null,
          expiry_date: formData.expiryDate || null,
          certificate_id: formData.certificateNumber || null,
          funded_by: formData.fundingSource || null,
          status: 'valid',
        });
        
        toast({
          title: "Training record added",
          description: `${formData.courseName} has been added to ${workerName}'s Elec-ID.`,
        });
        onOpenChange(false);
        resetForm();
      } catch (error) {
        console.error("Error adding training:", error);
        toast({
          title: "Error",
          description: "Could not add training record. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Fallback for when no profileId (mock behavior)
      toast({
        title: "Training record added",
        description: `${formData.courseName} has been added to ${workerName}'s Elec-ID.`,
      });
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      courseName: "",
      provider: "",
      completionDate: "",
      expiryDate: "",
      certificateNumber: "",
      fundingSource: "employer",
      cost: "",
      notes: "",
    });
    setSelectedCourse(null);
    setSelectedCategory(null);
    setIsManualMode(false);
    setCustomExpiryYears(3);
    setSearchQuery("");
  };

  const completedFields = [
    formData.courseName,
    formData.provider,
    formData.completionDate,
    formData.certificateNumber,
  ].filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap className="h-6 w-6 text-elec-yellow-foreground" />
              </div>
              <div>
                <DialogTitle className="text-xl">Add Training Record</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Adding to <span className="font-medium text-foreground">{workerName}</span>'s Elec-ID
                </DialogDescription>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div 
                    key={step} 
                    className={`h-1.5 w-8 rounded-full transition-colors ${
                      step <= completedFields ? 'bg-elec-yellow' : 'bg-muted'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{completedFields}/4 fields completed</span>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit">
            <Button
              type="button"
              variant={!isManualMode ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsManualMode(false)}
              className="h-9 gap-2"
            >
              <Search className="h-4 w-4" />
              Quick Select
            </Button>
            <Button
              type="button"
              variant={isManualMode ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsManualMode(true)}
              className="h-9 gap-2"
            >
              <PenLine className="h-4 w-4" />
              Manual Entry
            </Button>
          </div>

          {/* Category Quick Filter - only show in quick select mode */}
          {!isManualMode && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">Quick Filter by Category</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="h-8"
                >
                  All
                </Button>
                {Object.keys(TRAINING_COURSES).map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="h-8 gap-1.5"
                  >
                    {CATEGORY_ICONS[category]}
                    <span className="hidden sm:inline">{category}</span>
                    <span className="sm:hidden">{category.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Section 1: Course Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Award className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Course Details</h3>
            </div>
            
            <div className="grid gap-4">
              {/* Manual Mode - Simple Text Inputs */}
              {isManualMode ? (
                <>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      Course / Qualification Name
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g. Manual Handling, Fire Warden, SMSTS"
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      Training Provider
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g. CITB, City & Guilds, In-house"
                        value={formData.provider}
                        onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                        className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                        list="common-providers"
                      />
                      <datalist id="common-providers">
                        {COMMON_PROVIDERS.map(provider => (
                          <option key={provider} value={provider} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  {/* Expiry Duration Selector for Manual Mode */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      Expires After
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {EXPIRY_OPTIONS.map((option) => (
                        <Button
                          key={option.label}
                          type="button"
                          variant={customExpiryYears === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCustomExpiryChange(option.value)}
                          className="h-9"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Quick Select Mode - Searchable Combobox */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      Course / Qualification Name
                      <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={courseOpen} onOpenChange={setCourseOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={courseOpen}
                          className="w-full h-11 justify-between bg-background border-border/50 hover:bg-muted/50 font-normal"
                        >
                          {formData.courseName ? (
                            <div className="flex items-center gap-2 truncate">
                              <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate">{formData.courseName}</span>
                              {selectedCourse?.mandatory && (
                                <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                              )}
                              {selectedCourse?.expiryYears && (
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-warning text-warning">
                                  {selectedCourse.expiryYears}yr
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Search or select a course...
                            </span>
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search courses..." 
                            className="h-10" 
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                          />
                          <CommandList className="max-h-[300px]">
                            <CommandEmpty>
                              <div className="p-4 text-center">
                                <p className="text-sm text-muted-foreground mb-2">No course found for "{searchQuery}"</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={handleAddCustomCourse}
                                  className="gap-2"
                                >
                                  <PenLine className="h-3 w-3" />
                                  Add "{searchQuery}" as custom course
                                </Button>
                              </div>
                            </CommandEmpty>
                            {Object.entries(filteredCourses).map(([category, courses]) => (
                              <CommandGroup key={category} heading={
                                <span className="flex items-center gap-2">
                                  {CATEGORY_ICONS[category]}
                                  {category}
                                </span>
                              }>
                                {courses.map((course) => (
                                  <CommandItem
                                    key={course.name}
                                    value={course.name}
                                    onSelect={() => handleCourseSelect({ ...course, category })}
                                    className="cursor-pointer"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.courseName === course.name ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div className="flex-1 flex items-center justify-between gap-2">
                                      <span>{course.name}</span>
                                      <div className="flex items-center gap-1">
                                        {course.mandatory && (
                                          <Badge variant="destructive" className="text-[10px] px-1 py-0">Required</Badge>
                                        )}
                                        {course.expiryYears !== null ? (
                                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                                            {course.expiryYears}yr
                                          </Badge>
                                        ) : (
                                          <Badge variant="secondary" className="text-[10px] px-1 py-0">No expiry</Badge>
                                        )}
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    
                    {/* Custom course indicator with expiry selector */}
                    {formData.courseName && !selectedCourse && (
                      <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Custom course:</span>
                          <Badge variant="outline" className="text-[10px]">{formData.courseName}</Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 ml-auto"
                            onClick={() => setFormData(prev => ({ ...prev, courseName: "" }))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Expiry selector for custom courses */}
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-muted-foreground">Expires after:</Label>
                          <div className="flex flex-wrap gap-1.5">
                            {EXPIRY_OPTIONS.map((option) => (
                              <Button
                                key={option.label}
                                type="button"
                                variant={customExpiryYears === option.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleCustomExpiryChange(option.value)}
                                className="h-7 text-xs"
                              >
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Provider Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      Training Provider
                    </Label>
                    {selectedCourse ? (
                      <Popover open={providerOpen} onOpenChange={setProviderOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full h-11 justify-between bg-background border-border/50 hover:bg-muted/50 font-normal"
                          >
                            {formData.provider ? (
                              <span className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                {formData.provider}
                              </span>
                            ) : (
                              <span className="text-muted-foreground flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                Select provider...
                              </span>
                            )}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search providers..." className="h-10" />
                            <CommandList>
                              <CommandEmpty>No provider found.</CommandEmpty>
                              <CommandGroup heading="Suggested Providers">
                                {selectedCourse.providers.map((provider) => (
                                  <CommandItem
                                    key={provider}
                                    value={provider}
                                    onSelect={() => {
                                      setFormData(prev => ({ ...prev, provider }));
                                      setProviderOpen(false);
                                    }}
                                    className="cursor-pointer"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        formData.provider === provider ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {provider}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup heading="Other">
                                <CommandItem
                                  value="Other"
                                  onSelect={() => {
                                    setFormData(prev => ({ ...prev, provider: "" }));
                                    setProviderOpen(false);
                                  }}
                                  className="cursor-pointer text-muted-foreground"
                                >
                                  <Building2 className="mr-2 h-4 w-4" />
                                  Enter custom provider...
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g. City & Guilds, CITB, IOSH"
                          value={formData.provider}
                          onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                          className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                          list="common-providers-quickselect"
                        />
                        <datalist id="common-providers-quickselect">
                          {COMMON_PROVIDERS.map(provider => (
                            <option key={provider} value={provider} />
                          ))}
                        </datalist>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 2: Dates & Certificate */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Dates & Certificate</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="completionDate" className="flex items-center gap-2 text-sm font-medium">
                  Completion Date
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleCompletionDateChange(e.target.value)}
                    className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="flex items-center gap-2 text-sm font-medium">
                  Expiry Date
                  {(selectedCourse?.expiryYears === null || (isManualMode && customExpiryYears === null) || (!selectedCourse && !isManualMode && customExpiryYears === null)) && (
                    <Badge variant="secondary" className="text-[10px]">No expiry</Badge>
                  )}
                  {(selectedCourse?.expiryYears || (isManualMode && customExpiryYears !== null) || (!selectedCourse && formData.courseName && customExpiryYears !== null)) && (
                    <Badge variant="outline" className="text-[10px] border-success text-success">Auto-calculated</Badge>
                  )}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                    disabled={(selectedCourse?.expiryYears === null) || (isManualMode && customExpiryYears === null) || (!selectedCourse && !isManualMode && customExpiryYears === null)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateNumber" className="text-sm font-medium">Certificate Number</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="certificateNumber"
                  placeholder="e.g. CERT-2024-12345"
                  value={formData.certificateNumber}
                  onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                  className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Documentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border/50">
              <FileCheck className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Documentation</h3>
            </div>
            
            {/* Premium Upload Area */}
            <div className="group relative border-2 border-dashed border-border/50 hover:border-elec-yellow/50 rounded-xl p-8 text-center transition-all duration-300 hover:bg-elec-yellow/5 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                  <Upload className="h-7 w-7 text-muted-foreground group-hover:text-elec-yellow transition-colors" />
                </div>
                <p className="font-medium text-foreground mb-1">Upload Certificate</p>
                <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
                <p className="text-xs text-muted-foreground/70 mt-2">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Funding Info - Collapsible Style */}
          <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-xl p-5 border border-border/30">
            <div className="flex items-center gap-2 mb-4">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Funding Information</h3>
              <Badge variant="outline" className="ml-auto text-[10px]">Optional</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Funding Source</Label>
                <Select
                  value={formData.fundingSource}
                  onValueChange={(value) => setFormData({ ...formData, fundingSource: value })}
                >
                  <SelectTrigger className="h-11 bg-background border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employer">Employer Funded</SelectItem>
                    <SelectItem value="worker">Worker Self-Funded</SelectItem>
                    <SelectItem value="grant">Grant / Subsidy</SelectItem>
                    <SelectItem value="apprenticeship">Apprenticeship Levy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost" className="text-sm font-medium">Cost (£)</Label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0.00"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="pl-10 h-11 bg-background border-border/50 focus:border-elec-yellow/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about this training..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="min-h-[80px] bg-background border-border/50 focus:border-elec-yellow/50 resize-none"
              />
            </div>
          </div>

          {/* Notification Preview - Mobile Style */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-elec-yellow" />
              <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Worker Notification Preview</h3>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 shadow-xl">
              {/* Mock phone notification */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-sm">Elec-ID Updated</p>
                      <span className="text-[10px] text-foreground/50">now</span>
                    </div>
                    <p className="text-foreground/80 text-sm mt-1">
                      {formData.courseName || "New training"} has been added to your profile
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-success/20 text-success border-success/30 text-[10px]">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      {formData.provider && (
                        <span className="text-[10px] text-foreground/50">via {formData.provider}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Home indicator */}
              <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-4" />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-11">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={addTraining.isPending}
            className="h-11 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {addTraining.isPending ? "Adding..." : "Add Training Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
