import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  PenLine,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAddElecIdTraining } from '@/hooks/useElecId';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  fieldLabelClass,
  Eyebrow,
} from '@/components/employer/editorial';

const EXPIRY_OPTIONS = [
  { value: 1, label: '1 year' },
  { value: 3, label: '3 years' },
  { value: 5, label: '5 years' },
  { value: null, label: 'No expiry' },
] as const;

const COMMON_PROVIDERS = [
  'CITB',
  'City & Guilds',
  'IOSH',
  'NEBOSH',
  'In-house',
  'St John Ambulance',
  'British Red Cross',
  'PASMA',
  'IPAF',
];

// Training course data with categories, providers, and expiry periods
const TRAINING_COURSES = {
  'Health & Safety': [
    {
      name: 'First Aid at Work',
      providers: ['St John Ambulance', 'British Red Cross', 'CITB'],
      expiryYears: 3,
      mandatory: true,
    },
    {
      name: 'Emergency First Aid',
      providers: ['St John Ambulance', 'British Red Cross'],
      expiryYears: 3,
      mandatory: false,
    },
    {
      name: 'Mental Health First Aider',
      providers: ['MHFA England', 'Mental Health at Work'],
      expiryYears: 3,
      mandatory: false,
    },
    {
      name: 'Fire Marshal / Warden',
      providers: ['CITB', 'IOSH', 'In-house'],
      expiryYears: 3,
      mandatory: true,
    },
    {
      name: 'Manual Handling',
      providers: ['CITB', 'IOSH', 'In-house'],
      expiryYears: 3,
      mandatory: true,
    },
    {
      name: 'COSHH Awareness',
      providers: ['CITB', 'IOSH', 'In-house'],
      expiryYears: 3,
      mandatory: false,
    },
    {
      name: 'DSE Assessment',
      providers: ['IOSH', 'In-house'],
      expiryYears: null,
      mandatory: false,
    },
  ],
  'Working at Height': [
    {
      name: 'PASMA (Scaffold Towers)',
      providers: ['PASMA', 'CITB'],
      expiryYears: 5,
      mandatory: true,
    },
    { name: 'MEWP Operator', providers: ['IPAF', 'CITB'], expiryYears: 5, mandatory: true },
    {
      name: 'Harness & Fall Arrest',
      providers: ['CITB', 'Heightec', 'Lyon Equipment'],
      expiryYears: 3,
      mandatory: true,
    },
    { name: 'Roof Work Safety', providers: ['CITB', 'IOSH'], expiryYears: 3, mandatory: false },
    {
      name: 'Working at Height General',
      providers: ['CITB', 'IOSH', 'In-house'],
      expiryYears: 3,
      mandatory: true,
    },
    { name: 'Ladder Safety', providers: ['CITB', 'In-house'], expiryYears: 3, mandatory: false },
  ],
  'Hazardous Environments': [
    {
      name: 'Asbestos Awareness',
      providers: ['CITB', 'UKATA', 'IOSH'],
      expiryYears: 1,
      mandatory: true,
    },
    {
      name: 'Confined Spaces',
      providers: ['CITB', 'SafeContractor'],
      expiryYears: 3,
      mandatory: true,
    },
    { name: 'Respirator Fit Test', providers: ['Fit2Fit', 'HSL'], expiryYears: 1, mandatory: true },
    {
      name: 'Control of Substances Hazardous to Health',
      providers: ['CITB', 'IOSH'],
      expiryYears: 3,
      mandatory: false,
    },
    { name: 'Lead Awareness', providers: ['CITB', 'IOSH'], expiryYears: 3, mandatory: false },
    {
      name: 'Legionella Awareness',
      providers: ['CITB', 'Water Hygiene Centre'],
      expiryYears: 3,
      mandatory: false,
    },
  ],
  Electrical: [
    {
      name: '18th Edition Wiring Regulations',
      providers: ['City & Guilds', 'NICEIC', 'ECA'],
      expiryYears: null,
      mandatory: true,
    },
    {
      name: 'PAT Testing',
      providers: ['City & Guilds', 'ECA', 'JIB'],
      expiryYears: 3,
      mandatory: false,
    },
    {
      name: 'EV Charger Installation',
      providers: ['City & Guilds', 'IMI', 'ECA'],
      expiryYears: null,
      mandatory: false,
    },
    {
      name: 'Solar PV Installation',
      providers: ['City & Guilds', 'MCS', 'ECA'],
      expiryYears: null,
      mandatory: false,
    },
    {
      name: 'Inspection & Testing (2391)',
      providers: ['City & Guilds', 'EAL', 'NICEIC'],
      expiryYears: 5,
      mandatory: true,
    },
    {
      name: 'Initial Verification (2392)',
      providers: ['City & Guilds', 'EAL'],
      expiryYears: 5,
      mandatory: false,
    },
    {
      name: 'Electrical Safety Awareness',
      providers: ['In-house', 'ECA', 'JIB'],
      expiryYears: 3,
      mandatory: false,
    },
  ],
  'Equipment & Plant': [
    { name: 'CSCS Card Renewal', providers: ['CSCS', 'CITB'], expiryYears: 5, mandatory: true },
    {
      name: 'Forklift / Telehandler',
      providers: ['RTITB', 'ITSSAR', 'AITT'],
      expiryYears: 3,
      mandatory: true,
    },
    { name: 'Abrasive Wheels', providers: ['CITB', 'In-house'], expiryYears: 3, mandatory: true },
    {
      name: 'Excavator / Plant Operator',
      providers: ['CPCS', 'CITB'],
      expiryYears: 5,
      mandatory: true,
    },
    { name: 'Slinger / Signaller', providers: ['CPCS', 'CITB'], expiryYears: 5, mandatory: false },
    { name: 'Crane Operator', providers: ['CPCS', 'ALLMI'], expiryYears: 5, mandatory: true },
    {
      name: 'Powered Access (Boom)',
      providers: ['IPAF', 'CITB'],
      expiryYears: 5,
      mandatory: false,
    },
  ],
  'Construction & Trade': [
    {
      name: 'Site Management Safety Training Scheme (SMSTS)',
      providers: ['CITB'],
      expiryYears: 5,
      mandatory: true,
    },
    {
      name: 'Site Supervisor Safety Training Scheme (SSSTS)',
      providers: ['CITB'],
      expiryYears: 5,
      mandatory: true,
    },
    {
      name: 'Health & Safety Awareness',
      providers: ['CITB', 'IOSH'],
      expiryYears: 5,
      mandatory: true,
    },
    { name: 'IOSH Managing Safely', providers: ['IOSH'], expiryYears: 3, mandatory: false },
    {
      name: 'NEBOSH General Certificate',
      providers: ['NEBOSH'],
      expiryYears: null,
      mandatory: false,
    },
    {
      name: 'Temporary Works Coordinator',
      providers: ['CITB', 'TWforum'],
      expiryYears: 5,
      mandatory: false,
    },
  ],
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Health & Safety': <Heart className="h-4 w-4" />,
  'Working at Height': <HardHat className="h-4 w-4" />,
  'Hazardous Environments': <AlertTriangle className="h-4 w-4" />,
  Electrical: <Zap className="h-4 w-4" />,
  'Equipment & Plant': <Wrench className="h-4 w-4" />,
  'Construction & Trade': <Shield className="h-4 w-4" />,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    courseName: '',
    provider: '',
    completionDate: '',
    expiryDate: '',
    certificateNumber: '',
    fundingSource: 'employer',
    cost: '',
    notes: '',
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
      courses.map((course) => ({ ...course, category }))
    );
  }, []);

  // Get filtered courses based on selected category
  const filteredCourses = useMemo(() => {
    if (selectedCategory) {
      return {
        [selectedCategory]: TRAINING_COURSES[selectedCategory as keyof typeof TRAINING_COURSES],
      };
    }
    return TRAINING_COURSES;
  }, [selectedCategory]);

  // Calculate expiry date based on completion date and course expiry years
  const calculateExpiryDate = (completionDate: string, expiryYears: number | null) => {
    if (!completionDate || expiryYears === null) return '';
    const date = new Date(completionDate);
    date.setFullYear(date.getFullYear() + expiryYears);
    return date.toISOString().split('T')[0];
  };

  // Handle course selection
  const handleCourseSelect = (course: (typeof allCourses)[0]) => {
    setSelectedCourse(course);
    setFormData((prev) => ({
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
    setFormData((prev) => ({
      ...prev,
      completionDate: date,
      expiryDate: calculateExpiryDate(date, expiryYears),
    }));
  };

  // Handle custom expiry years change for manual mode
  const handleCustomExpiryChange = (years: number | null) => {
    setCustomExpiryYears(years);
    if (formData.completionDate) {
      setFormData((prev) => ({
        ...prev,
        expiryDate: calculateExpiryDate(prev.completionDate, years),
      }));
    }
  };

  // Handle adding custom course from search
  const handleAddCustomCourse = () => {
    if (searchQuery.trim()) {
      setFormData((prev) => ({ ...prev, courseName: searchQuery.trim() }));
      setSelectedCourse(null);
      setCourseOpen(false);
      setSearchQuery('');
    }
  };

  const handleSubmit = async () => {
    if (!formData.courseName || !formData.completionDate) {
      toast({
        title: 'Required fields missing',
        description: 'Please fill in the course name and completion date.',
        variant: 'destructive',
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
          title: 'Training record added',
          description: `${formData.courseName} has been added to ${workerName}'s Elec-ID.`,
        });
        onOpenChange(false);
        resetForm();
      } catch (error) {
        console.error('Error adding training:', error);
        toast({
          title: 'Error',
          description: 'Could not add training record. Please try again.',
          variant: 'destructive',
        });
      }
    } else {
      // Fallback for when no profileId (mock behavior)
      toast({
        title: 'Training record added',
        description: `${formData.courseName} has been added to ${workerName}'s Elec-ID.`,
      });
      onOpenChange(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      courseName: '',
      provider: '',
      completionDate: '',
      expiryDate: '',
      certificateNumber: '',
      fundingSource: 'employer',
      cost: '',
      notes: '',
    });
    setSelectedCourse(null);
    setSelectedCategory(null);
    setIsManualMode(false);
    setCustomExpiryYears(3);
    setSearchQuery('');
  };

  const completedFields = [
    formData.courseName,
    formData.provider,
    formData.completionDate,
    formData.certificateNumber,
  ].filter(Boolean).length;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        {/* Premium Header */}
        <div className="border-b border-white/[0.06] p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">Add Training Record</DialogTitle>
                <DialogDescription className="text-white">
                  Adding to <span className="font-medium text-white">{workerName}</span>'s
                  Elec-ID
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
                      step <= completedFields ? 'bg-elec-yellow' : 'bg-white/[0.08]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-white">
                {completedFields}/4 fields completed
              </span>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-5">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-full w-fit">
            <button
              type="button"
              onClick={() => setIsManualMode(false)}
              className={cn(
                'h-9 px-4 rounded-full text-[12.5px] font-medium gap-2 inline-flex items-center transition-colors',
                !isManualMode ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
              )}
            >
              <Search className="h-4 w-4" />
              Quick Select
            </button>
            <button
              type="button"
              onClick={() => setIsManualMode(true)}
              className={cn(
                'h-9 px-4 rounded-full text-[12.5px] font-medium gap-2 inline-flex items-center transition-colors',
                isManualMode ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
              )}
            >
              <PenLine className="h-4 w-4" />
              Manual Entry
            </button>
          </div>

          {/* Category Quick Filter */}
          {!isManualMode && (
            <div className="space-y-2">
              <label className={fieldLabelClass}>Quick filter by category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'h-8 px-3 rounded-full text-[12px] font-medium border transition-colors',
                    selectedCategory === null
                      ? 'bg-elec-yellow text-black border-elec-yellow'
                      : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                  )}
                >
                  All
                </button>
                {Object.keys(TRAINING_COURSES).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'h-8 px-3 rounded-full text-[12px] font-medium border transition-colors inline-flex items-center gap-1.5',
                      selectedCategory === category
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                    )}
                  >
                    {CATEGORY_ICONS[category]}
                    <span className="hidden sm:inline">{category}</span>
                    <span className="sm:hidden">{category.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 1: Course Details */}
          <FormCard eyebrow="Course details">
            <div className="flex items-center gap-2 -mt-1">
              <Award className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Select the course / qualification</span>
            </div>

            {isManualMode ? (
              <>
                <Field label="Course / qualification name" required>
                  <Input
                    placeholder="e.g. Manual Handling, Fire Warden, SMSTS"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className={inputClass}
                  />
                </Field>

                <Field label="Training provider">
                  <Input
                    placeholder="e.g. CITB, City & Guilds, In-house"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className={inputClass}
                    list="common-providers"
                  />
                  <datalist id="common-providers">
                    {COMMON_PROVIDERS.map((provider) => (
                      <option key={provider} value={provider} />
                    ))}
                  </datalist>
                </Field>

                <div className="space-y-2">
                  <label className={fieldLabelClass}>Expires after</label>
                  <div className="flex flex-wrap gap-2">
                    {EXPIRY_OPTIONS.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => handleCustomExpiryChange(option.value)}
                        className={cn(
                          'h-9 px-3 rounded-full text-[12px] font-medium border transition-colors',
                          customExpiryYears === option.value
                            ? 'bg-elec-yellow text-black border-elec-yellow'
                            : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className={fieldLabelClass}>
                    Course / qualification name
                    <span className="ml-1 text-elec-yellow">*</span>
                  </label>
                  <Popover open={courseOpen} onOpenChange={setCourseOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-expanded={courseOpen}
                        className={cn(inputClass, 'flex items-center justify-between font-normal text-left')}
                      >
                        {formData.courseName ? (
                          <div className="flex items-center gap-2 truncate">
                            <GraduationCap className="h-4 w-4 text-white flex-shrink-0" />
                            <span className="truncate">{formData.courseName}</span>
                            {selectedCourse?.mandatory && (
                              <Badge className="text-[10px] px-1.5 py-0 bg-red-500/15 text-red-400 border-red-500/30">
                                Required
                              </Badge>
                            )}
                            {selectedCourse?.expiryYears && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 border-amber-500/40 text-amber-400"
                              >
                                {selectedCourse.expiryYears}yr
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-white flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Search or select a course...
                          </span>
                        )}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0 bg-[hsl(0_0%_12%)] border-white/[0.08]"
                      align="start"
                    >
                      <Command className="bg-transparent">
                        <CommandInput
                          placeholder="Search courses..."
                          className="h-10"
                          value={searchQuery}
                          onValueChange={setSearchQuery}
                        />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>
                            <div className="p-4 text-center">
                              <p className="text-[12.5px] text-white mb-2">
                                No course found for "{searchQuery}"
                              </p>
                              <SecondaryButton onClick={handleAddCustomCourse} size="sm">
                                <PenLine className="h-3 w-3 mr-1" />
                                Add "{searchQuery}" as custom course
                              </SecondaryButton>
                            </div>
                          </CommandEmpty>
                          {Object.entries(filteredCourses).map(([category, courses]) => (
                            <CommandGroup
                              key={category}
                              heading={
                                <span className="flex items-center gap-2">
                                  {CATEGORY_ICONS[category]}
                                  {category}
                                </span>
                              }
                            >
                              {courses.map((course) => (
                                <CommandItem
                                  key={course.name}
                                  value={course.name}
                                  onSelect={() => handleCourseSelect({ ...course, category })}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      formData.courseName === course.name
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  <div className="flex-1 flex items-center justify-between gap-2">
                                    <span>{course.name}</span>
                                    <div className="flex items-center gap-1">
                                      {course.mandatory && (
                                        <Badge className="text-[10px] px-1 py-0 bg-red-500/15 text-red-400 border-red-500/30">
                                          Required
                                        </Badge>
                                      )}
                                      {course.expiryYears !== null ? (
                                        <Badge
                                          variant="outline"
                                          className="text-[10px] px-1 py-0 border-white/[0.15] text-white"
                                        >
                                          {course.expiryYears}yr
                                        </Badge>
                                      ) : (
                                        <Badge
                                          variant="secondary"
                                          className="text-[10px] px-1 py-0 bg-white/[0.06] text-white border-white/[0.08]"
                                        >
                                          No expiry
                                        </Badge>
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
                    <div className="space-y-3 p-3 bg-white/[0.04] rounded-xl border border-white/[0.08] mt-2">
                      <div className="flex items-center gap-2 text-[11px] text-white">
                        <span>Custom course:</span>
                        <Badge variant="outline" className="text-[10px] border-white/[0.15] text-white">
                          {formData.courseName}
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 ml-auto text-white hover:bg-white/[0.08]"
                          onClick={() => setFormData((prev) => ({ ...prev, courseName: '' }))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-medium text-white">Expires after:</label>
                        <div className="flex flex-wrap gap-1.5">
                          {EXPIRY_OPTIONS.map((option) => (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => handleCustomExpiryChange(option.value)}
                              className={cn(
                                'h-7 px-2.5 rounded-full text-[11px] font-medium border transition-colors',
                                customExpiryYears === option.value
                                  ? 'bg-elec-yellow text-black border-elec-yellow'
                                  : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Provider Selection */}
                <div className="space-y-1.5">
                  <label className={fieldLabelClass}>Training provider</label>
                  {selectedCourse ? (
                    <Popover open={providerOpen} onOpenChange={setProviderOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(inputClass, 'flex items-center justify-between font-normal text-left')}
                        >
                          {formData.provider ? (
                            <span className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-white" />
                              {formData.provider}
                            </span>
                          ) : (
                            <span className="text-white flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Select provider...
                            </span>
                          )}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[var(--radix-popover-trigger-width)] p-0 bg-[hsl(0_0%_12%)] border-white/[0.08]"
                        align="start"
                      >
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search providers..." className="h-10" />
                          <CommandList>
                            <CommandEmpty>No provider found.</CommandEmpty>
                            <CommandGroup heading="Suggested Providers">
                              {selectedCourse.providers.map((provider) => (
                                <CommandItem
                                  key={provider}
                                  value={provider}
                                  onSelect={() => {
                                    setFormData((prev) => ({ ...prev, provider }));
                                    setProviderOpen(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      formData.provider === provider ? 'opacity-100' : 'opacity-0'
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
                                  setFormData((prev) => ({ ...prev, provider: '' }));
                                  setProviderOpen(false);
                                }}
                                className="cursor-pointer text-white"
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
                    <Input
                      placeholder="e.g. City & Guilds, CITB, IOSH"
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      className={inputClass}
                      list="common-providers-quickselect"
                    />
                  )}
                  <datalist id="common-providers-quickselect">
                    {COMMON_PROVIDERS.map((provider) => (
                      <option key={provider} value={provider} />
                    ))}
                  </datalist>
                </div>
              </>
            )}
          </FormCard>

          {/* Section 2: Dates & Certificate */}
          <FormCard eyebrow="Dates & certificate">
            <div className="flex items-center gap-2 -mt-1">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Record when completed and when it expires</span>
            </div>
            <FormGrid cols={2}>
              <Field label="Completion date" required>
                <Input
                  id="completionDate"
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => handleCompletionDateChange(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Expiry date">
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className={inputClass}
                  disabled={
                    selectedCourse?.expiryYears === null ||
                    (isManualMode && customExpiryYears === null) ||
                    (!selectedCourse && !isManualMode && customExpiryYears === null)
                  }
                />
              </Field>
            </FormGrid>
            <Field label="Certificate number">
              <Input
                id="certificateNumber"
                placeholder="e.g. CERT-2024-12345"
                value={formData.certificateNumber}
                onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                className={inputClass}
              />
            </Field>
          </FormCard>

          {/* Section 3: Documentation */}
          <FormCard eyebrow="Documentation">
            <div className="flex items-center gap-2 -mt-1">
              <FileCheck className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Upload supporting certificate</span>
            </div>
            <div className="group relative border-2 border-dashed border-white/[0.12] hover:border-elec-yellow/50 rounded-xl p-8 text-center transition-all duration-300 hover:bg-elec-yellow/5 cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-4 group-hover:bg-elec-yellow/20 transition-colors">
                <Upload className="h-7 w-7 text-white group-hover:text-elec-yellow transition-colors" />
              </div>
              <p className="font-medium text-white mb-1">Upload Certificate</p>
              <p className="text-[12.5px] text-white">Drag and drop or click to browse</p>
              <p className="text-[11px] text-white mt-2">PDF, JPG, PNG up to 10MB</p>
            </div>
          </FormCard>

          {/* Funding Info */}
          <FormCard eyebrow="Funding information">
            <div className="flex items-center gap-2 -mt-1">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
              <span className="text-[12.5px] text-white">Optional</span>
            </div>
            <FormGrid cols={2}>
              <Field label="Funding source">
                <Select
                  value={formData.fundingSource}
                  onValueChange={(value) => setFormData({ ...formData, fundingSource: value })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="employer">Employer Funded</SelectItem>
                    <SelectItem value="worker">Worker Self-Funded</SelectItem>
                    <SelectItem value="grant">Grant / Subsidy</SelectItem>
                    <SelectItem value="apprenticeship">Apprenticeship Levy</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Cost (£)">
                <Input
                  id="cost"
                  type="number"
                  placeholder="0.00"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Notes">
              <Textarea
                id="notes"
                placeholder="Any additional notes about this training..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={cn(textareaClass, 'min-h-[80px]')}
              />
            </Field>
          </FormCard>

          {/* Notification Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-elec-yellow" />
              <Eyebrow>Worker notification preview</Eyebrow>
            </div>

            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl p-4">
              <div className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white text-[13px]">Elec-ID Updated</p>
                      <span className="text-[10px] text-white">now</span>
                    </div>
                    <p className="text-white text-[12.5px] mt-1">
                      {formData.courseName || 'New training'} has been added to your profile
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                      {formData.provider && (
                        <span className="text-[10px] text-white">
                          via {formData.provider}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 gap-3">
          <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={addTraining.isPending}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {addTraining.isPending ? 'Adding...' : 'Add Training Record'}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
