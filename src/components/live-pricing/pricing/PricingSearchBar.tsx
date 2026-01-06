import { useState, useEffect, ReactNode } from "react";
import { Search, MapPin, Loader2, X, Briefcase, Plug, Lightbulb, Zap, Car, Home, ClipboardCheck, AlertTriangle, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingSearchBarProps {
  onSearch: (postcode: string, jobType?: string) => void;
  isLoading?: boolean;
  className?: string;
}

interface JobType {
  id: string;
  label: string;
  icon: ReactNode;
}

const jobTypes: JobType[] = [
  { id: "socket", label: "Socket Installation", icon: <Plug className="h-5 w-5" /> },
  { id: "lighting", label: "Light Fitting", icon: <Lightbulb className="h-5 w-5" /> },
  { id: "fusebox", label: "Fuse Box Upgrade", icon: <Zap className="h-5 w-5" /> },
  { id: "ev", label: "EV Charger", icon: <Car className="h-5 w-5" /> },
  { id: "rewire", label: "Rewiring", icon: <Home className="h-5 w-5" /> },
  { id: "inspection", label: "EICR/Inspection", icon: <ClipboardCheck className="h-5 w-5" /> },
  { id: "emergency", label: "Emergency Call Out", icon: <AlertTriangle className="h-5 w-5" /> },
  { id: "garden", label: "Garden Lighting", icon: <TreeDeciduous className="h-5 w-5" /> },
];

const popularPostcodes = ["M1", "SW1", "B1", "LS1", "G1", "E1", "BS1", "CF1"];

const PricingSearchBar = ({
  onSearch,
  isLoading = false,
  className
}: PricingSearchBarProps) => {
  const [postcode, setPostcode] = useState("");
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [showJobTypes, setShowJobTypes] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pricing-recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  const saveSearch = (pc: string) => {
    const updated = [pc, ...recentSearches.filter(s => s !== pc)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("pricing-recent-searches", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (!postcode.trim()) return;
    saveSearch(postcode.toUpperCase());
    onSearch(postcode, selectedJobType || undefined);
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
            setPostcode(data.result[0].postcode);
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

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search Input - Premium Design */}
      <div className="relative">
        {/* Glow effect when focused */}
        <div className={cn(
          "absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-yellow-400/20 via-yellow-500/30 to-yellow-400/20 blur-md",
          isFocused && "opacity-100"
        )} />

        <div className={cn(
          "relative flex gap-2 p-2 rounded-2xl transition-all duration-300",
          "bg-neutral-900/90 backdrop-blur-sm",
          "border-2",
          isFocused ? "border-yellow-400/50" : "border-white/10"
        )}>
          {/* Input container */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-400 z-10 pointer-events-none" />
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter postcode..."
              className={cn(
                "w-full h-14 pl-12 pr-12 rounded-xl",
                "bg-neutral-800/80 border-0",
                "text-lg font-medium text-white placeholder:text-white/40",
                "focus:outline-none focus:ring-0",
                "transition-all duration-200"
              )}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {postcode && (
              <button
                onClick={() => setPostcode("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10"
              >
                <X className="h-5 w-5" />
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
              "border border-white/10 hover:border-yellow-400/30",
              "transition-all duration-200"
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
              "h-14 px-6 rounded-xl flex-shrink-0",
              "bg-gradient-to-r from-yellow-400 to-yellow-500",
              "hover:from-yellow-300 hover:to-yellow-400",
              "text-black font-bold text-base",
              "transition-all duration-200",
              "disabled:opacity-50"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      {/* Job Type Filter */}
      <div>
        <button
          onClick={() => setShowJobTypes(!showJobTypes)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl",
            "text-sm font-medium transition-all duration-200",
            "bg-white/5 hover:bg-white/10 border border-white/10",
            selectedJobType && "border-yellow-400/40 bg-yellow-400/10"
          )}
        >
          <Briefcase className="h-4 w-4 text-yellow-400" />
          {selectedJobType ? (
            <span className="text-yellow-400">
              {jobTypes.find(j => j.id === selectedJobType)?.label}
            </span>
          ) : (
            <span className="text-white">Filter by job type</span>
          )}
        </button>

        {showJobTypes && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {jobTypes.map((job) => (
              <button
                key={job.id}
                onClick={() => {
                  setSelectedJobType(selectedJobType === job.id ? null : job.id);
                }}
                className={cn(
                  "flex items-center gap-2 p-4 rounded-xl text-left transition-all duration-200",
                  "border-2 touch-manipulation active:scale-[0.98]",
                  selectedJobType === job.id
                    ? "bg-yellow-400/15 border-yellow-400/50 text-yellow-400"
                    : "bg-white/5 border-white/10 text-white hover:border-white/20"
                )}
              >
                <span className="text-yellow-400">{job.icon}</span>
                <span className="text-sm font-medium truncate">{job.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Select - Recent & Popular */}
      <div className="space-y-3">
        {recentSearches.length > 0 && (
          <div>
            <span className="text-xs text-white/60 font-medium uppercase tracking-wider mb-2 block">
              Recent Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((pc) => (
                <button
                  key={pc}
                  onClick={() => {
                    setPostcode(pc);
                    onSearch(pc, selectedJobType || undefined);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded-xl",
                    "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30",
                    "hover:bg-yellow-400/25 transition-all duration-200",
                    "touch-manipulation active:scale-[0.97]"
                  )}
                >
                  {pc}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <span className="text-xs text-white/60 font-medium uppercase tracking-wider mb-2 block">
            Popular Areas
          </span>
          <div className="flex flex-wrap gap-2">
            {popularPostcodes.map((pc) => (
              <button
                key={pc}
                onClick={() => {
                  setPostcode(pc);
                  onSearch(pc, selectedJobType || undefined);
                }}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-xl",
                  "bg-white/5 text-white border border-white/10",
                  "hover:bg-white/10 hover:border-white/20",
                  "transition-all duration-200",
                  "touch-manipulation active:scale-[0.97]"
                )}
              >
                {pc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSearchBar;
