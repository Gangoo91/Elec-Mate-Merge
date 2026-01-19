import { useState, useEffect, useRef, ReactNode } from "react";
import {
  Search,
  MapPin,
  Loader2,
  X,
  Briefcase,
  Plug,
  Lightbulb,
  Zap,
  Car,
  Home,
  ClipboardCheck,
  AlertTriangle,
  TreeDeciduous,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingSearchBarProps {
  onSearch: (postcode: string, jobType?: string) => void;
  isLoading?: boolean;
  className?: string;
  currentSearch?: { postcode: string; jobType?: string } | null;
}

interface JobType {
  id: string;
  label: string;
  shortLabel: string;
  icon: ReactNode;
}

const jobTypes: JobType[] = [
  { id: "socket", label: "Socket Installation", shortLabel: "Sockets", icon: <Plug className="h-5 w-5" /> },
  { id: "lighting", label: "Light Fitting", shortLabel: "Lighting", icon: <Lightbulb className="h-5 w-5" /> },
  { id: "fusebox", label: "Fuse Box Upgrade", shortLabel: "Fuse Box", icon: <Zap className="h-5 w-5" /> },
  { id: "ev", label: "EV Charger", shortLabel: "EV", icon: <Car className="h-5 w-5" /> },
  { id: "rewire", label: "Rewiring", shortLabel: "Rewire", icon: <Home className="h-5 w-5" /> },
  { id: "inspection", label: "EICR/Inspection", shortLabel: "EICR", icon: <ClipboardCheck className="h-5 w-5" /> },
  { id: "emergency", label: "Emergency Call Out", shortLabel: "Emergency", icon: <AlertTriangle className="h-5 w-5" /> },
  { id: "garden", label: "Garden Lighting", shortLabel: "Garden", icon: <TreeDeciduous className="h-5 w-5" /> },
];

// UK postcode district suggestions for autocomplete
const postcodeHints = [
  "M1", "M2", "M3", "M4", "M5", "M6", // Manchester
  "SW1", "SW2", "SW3", "SE1", "SE2", "E1", "E2", "W1", "W2", "N1", "N2", "NW1", "NW2", "EC1", "WC1", // London
  "B1", "B2", "B3", "B4", "B5", // Birmingham
  "LS1", "LS2", "LS3", // Leeds
  "G1", "G2", "G3", "G4", // Glasgow
  "EH1", "EH2", "EH3", // Edinburgh
  "BS1", "BS2", "BS3", // Bristol
  "CF1", "CF2", "CF3", // Cardiff
  "L1", "L2", "L3", // Liverpool
  "S1", "S2", "S3", // Sheffield
  "NG1", "NG2", "NG3", // Nottingham
  "NE1", "NE2", "NE3", // Newcastle
];

const popularPostcodes = [
  { code: "M1", area: "Manchester" },
  { code: "SW1", area: "Westminster" },
  { code: "B1", area: "Birmingham" },
  { code: "LS1", area: "Leeds" },
  { code: "G1", area: "Glasgow" },
  { code: "E1", area: "East London" },
  { code: "BS1", area: "Bristol" },
  { code: "L1", area: "Liverpool" },
];

const PricingSearchBar = ({
  onSearch,
  isLoading = false,
  className,
  currentSearch
}: PricingSearchBarProps) => {
  const [postcode, setPostcode] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [showJobTypes, setShowJobTypes] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{ postcode: string; jobType?: string }[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pricing-recent-searches-v2");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (postcode.length >= 1 && isFocused) {
      const upper = postcode.toUpperCase();
      const matches = postcodeHints
        .filter(p => p.startsWith(upper) && p !== upper)
        .slice(0, 4);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [postcode, isFocused]);

  const saveSearch = (pc: string, jobType?: string) => {
    const newSearch = { postcode: pc, jobType };
    const updated = [
      newSearch,
      ...recentSearches.filter(s => s.postcode !== pc)
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("pricing-recent-searches-v2", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (!postcode.trim()) return;
    const pc = postcode.toUpperCase().trim();
    saveSearch(pc, selectedJobType || undefined);
    onSearch(pc, selectedJobType || undefined);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPostcode(suggestion);
    setSuggestions([]);
    // Auto-search when suggestion is selected
    setTimeout(() => {
      saveSearch(suggestion, selectedJobType || undefined);
      onSearch(suggestion, selectedJobType || undefined);
    }, 100);
  };

  const handleLocationDetect = () => {
    if (!navigator.geolocation) return;

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}&limit=1`
          );
          const data = await response.json();
          if (data.result?.[0]?.postcode) {
            const pc = data.result[0].postcode;
            setPostcode(pc);
            // Auto-search when location is detected
            saveSearch(pc, selectedJobType || undefined);
            onSearch(pc, selectedJobType || undefined);
          }
        } catch (error) {
          console.error("Error getting postcode from location:", error);
        } finally {
          setIsLocating(false);
        }
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const selectedJob = jobTypes.find(j => j.id === selectedJobType);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Current Search Display - Shows what you're searching for */}
      {(postcode || selectedJobType) && (
        <div className="flex items-center gap-2 flex-wrap animate-fade-in">
          <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Searching:</span>
          {postcode && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-bold">
              <MapPin className="h-3.5 w-3.5" />
              {postcode.toUpperCase()}
            </span>
          )}
          {selectedJob && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-400/20 text-blue-400 text-sm font-medium">
              {selectedJob.icon}
              {selectedJob.shortLabel}
            </span>
          )}
        </div>
      )}

      {/* Main Search Input - Premium Mobile Design */}
      <div className="relative">
        {/* Glow effect when focused */}
        <div className={cn(
          "absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-yellow-400/30 via-yellow-500/40 to-yellow-400/30 blur-lg",
          isFocused && "opacity-100"
        )} />

        <div className={cn(
          "relative rounded-2xl transition-all duration-300",
          "bg-neutral-800/90 backdrop-blur-sm",
          "border-2",
          isFocused ? "border-yellow-400/60" : "border-white/10"
        )}>
          {/* Search Input Row */}
          <div className="flex items-center p-2 gap-2">
            {/* Input with icon */}
            <div className="relative flex-1">
              <div className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all duration-200",
                isFocused || postcode ? "text-yellow-400" : "text-white/40"
              )}>
                <Search className="h-5 w-5" />
              </div>
              <input
                ref={inputRef}
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Enter postcode (e.g. M1, SW1)"
                className={cn(
                  "w-full h-14 pl-12 pr-12 rounded-xl",
                  "bg-neutral-900/80 border-0",
                  "text-lg font-semibold text-white placeholder:text-white/30",
                  "focus:outline-none focus:ring-0",
                  "transition-all duration-200",
                  "touch-manipulation"
                )}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
              {postcode && (
                <button
                  onClick={() => {
                    setPostcode("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all z-10 touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Location button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLocationDetect}
              disabled={isLocating}
              className={cn(
                "h-14 w-14 rounded-xl flex-shrink-0",
                "bg-white/5 hover:bg-white/10",
                "border border-white/10 hover:border-yellow-400/40",
                "transition-all duration-200 touch-manipulation active:scale-95"
              )}
            >
              {isLocating ? (
                <Loader2 className="h-5 w-5 animate-spin text-yellow-400" />
              ) : (
                <MapPin className="h-5 w-5 text-yellow-400" />
              )}
            </Button>

            {/* Search button */}
            <Button
              onClick={handleSearch}
              disabled={!postcode.trim() || isLoading}
              className={cn(
                "h-14 px-5 sm:px-6 rounded-xl flex-shrink-0",
                "bg-gradient-to-r from-yellow-400 to-yellow-500",
                "hover:from-yellow-300 hover:to-yellow-400",
                "text-black font-bold text-base",
                "transition-all duration-200 touch-manipulation active:scale-95",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5 sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </Button>
          </div>

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && (
            <div className="border-t border-white/10 p-2 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                      "bg-yellow-400/10 hover:bg-yellow-400/20",
                      "text-yellow-400 font-semibold text-sm",
                      "border border-yellow-400/20 hover:border-yellow-400/40",
                      "transition-all duration-200 touch-manipulation active:scale-95"
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Type Filter - Collapsible */}
      <div className="space-y-3">
        <button
          onClick={() => setShowJobTypes(!showJobTypes)}
          className={cn(
            "flex items-center justify-between w-full gap-2 px-4 py-3 rounded-xl",
            "text-sm font-medium transition-all duration-200",
            "bg-white/5 hover:bg-white/10 border border-white/10",
            "touch-manipulation active:scale-[0.98]",
            selectedJobType && "border-blue-400/40 bg-blue-400/10"
          )}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-400" />
            {selectedJobType ? (
              <span className="text-blue-400 font-semibold">
                {jobTypes.find(j => j.id === selectedJobType)?.label}
              </span>
            ) : (
              <span className="text-white">Filter by job type</span>
            )}
          </div>
          {showJobTypes ? (
            <ChevronUp className="h-4 w-4 text-white/60" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/60" />
          )}
        </button>

        {showJobTypes && (
          <div className="grid grid-cols-2 gap-2 animate-fade-in">
            {/* Clear filter option */}
            {selectedJobType && (
              <button
                onClick={() => setSelectedJobType(null)}
                className={cn(
                  "col-span-2 flex items-center justify-center gap-2 p-3 rounded-xl",
                  "bg-red-500/10 hover:bg-red-500/20",
                  "text-red-400 font-medium text-sm",
                  "border border-red-500/20 hover:border-red-500/30",
                  "transition-all duration-200 touch-manipulation active:scale-[0.98]"
                )}
              >
                <X className="h-4 w-4" />
                Clear filter
              </button>
            )}
            {jobTypes.map((job) => (
              <button
                key={job.id}
                onClick={() => {
                  setSelectedJobType(selectedJobType === job.id ? null : job.id);
                }}
                className={cn(
                  "flex items-center gap-2.5 p-3.5 rounded-xl text-left transition-all duration-200",
                  "border-2 touch-manipulation active:scale-[0.97]",
                  selectedJobType === job.id
                    ? "bg-blue-400/15 border-blue-400/50 text-blue-400"
                    : "bg-white/5 border-white/10 text-white hover:border-white/20 hover:bg-white/10"
                )}
              >
                <span className={selectedJobType === job.id ? "text-blue-400" : "text-yellow-400"}>
                  {job.icon}
                </span>
                <span className="text-sm font-medium truncate">{job.shortLabel}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && !isFocused && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-white/40" />
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
              Recent
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, idx) => (
              <button
                key={`${search.postcode}-${idx}`}
                onClick={() => {
                  setPostcode(search.postcode);
                  setSelectedJobType(search.jobType || null);
                  onSearch(search.postcode, search.jobType);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                  "bg-yellow-400/10 hover:bg-yellow-400/20",
                  "text-yellow-400 font-semibold text-sm",
                  "border border-yellow-400/20 hover:border-yellow-400/40",
                  "transition-all duration-200 touch-manipulation active:scale-[0.97]"
                )}
              >
                <MapPin className="h-3.5 w-3.5" />
                {search.postcode}
                {search.jobType && (
                  <span className="text-yellow-400/70">
                    · {jobTypes.find(j => j.id === search.jobType)?.shortLabel}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Areas - Only show when no recent searches and not focused */}
      {recentSearches.length === 0 && !isFocused && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-white/40" />
            <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
              Popular Areas
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {popularPostcodes.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setPostcode(item.code);
                  onSearch(item.code, selectedJobType || undefined);
                }}
                className={cn(
                  "flex flex-col items-start p-3 rounded-xl",
                  "bg-white/5 hover:bg-white/10",
                  "border border-white/10 hover:border-white/20",
                  "transition-all duration-200 touch-manipulation active:scale-[0.97]"
                )}
              >
                <span className="text-white font-bold">{item.code}</span>
                <span className="text-white/50 text-xs">{item.area}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSearchBar;
