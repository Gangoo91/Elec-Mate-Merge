import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  SlidersHorizontal,
  Briefcase,
  MapPin,
  RefreshCw,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { InternalVacancyCard, type InternalVacancy } from "./InternalVacancyCard";
import { useInternalVacancies, type VacancyFilters } from "@/hooks/useInternalVacancies";

interface InternalVacancyListProps {
  onApply: (vacancy: InternalVacancy) => void;
  onMessage: (vacancy: InternalVacancy) => void;
  onViewDetails: (vacancy: InternalVacancy) => void;
}

const EMPLOYMENT_TYPES = [
  { value: "all", label: "All Types" },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Temporary", label: "Temporary" },
];

export function InternalVacancyList({
  onApply,
  onMessage,
  onViewDetails,
}: InternalVacancyListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<VacancyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState<VacancyFilters>({});

  const { data: vacancies, isLoading, refetch, isRefetching } = useInternalVacancies({
    ...filters,
    searchQuery: searchQuery || undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive through the query
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({});
    setTempFilters({});
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex gap-2">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className={cn("pr-4", !searchQuery && "pl-9")}
            />
          </div>
        </form>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTempFilters(filters);
            setShowFilters(true);
          }}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-elec-yellow text-black text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              {filters.type}
              <button
                onClick={() => setFilters({ ...filters, type: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <button
                onClick={() => setFilters({ ...filters, location: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {vacancies?.length || 0} {vacancies?.length === 1 ? 'vacancy' : 'vacancies'} found
        </p>
      )}

      {/* Vacancy List */}
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-14 w-14 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : vacancies && vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <InternalVacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onApply={onApply}
              onMessage={onMessage}
              onViewDetails={onViewDetails}
            />
          ))
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No vacancies found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || activeFilterCount > 0
                  ? "Try adjusting your search or filters"
                  : "Check back later for new opportunities"}
              </p>
              {(searchQuery || activeFilterCount > 0) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>Filter Vacancies</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Employment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Employment Type</label>
              <Select
                value={tempFilters.type || "all"}
                onValueChange={(v) =>
                  setTempFilters({ ...tempFilters, type: v === "all" ? undefined : v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYMENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={tempFilters.location || ""}
                onChange={(e) =>
                  setTempFilters({ ...tempFilters, location: e.target.value || undefined })
                }
                placeholder="e.g. Manchester, London"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Salary (Annual)</label>
              <Select
                value={tempFilters.minSalary?.toString() || "any"}
                onValueChange={(v) =>
                  setTempFilters({
                    ...tempFilters,
                    minSalary: v === "any" ? undefined : parseInt(v),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="25000">£25,000+</SelectItem>
                  <SelectItem value="30000">£30,000+</SelectItem>
                  <SelectItem value="35000">£35,000+</SelectItem>
                  <SelectItem value="40000">£40,000+</SelectItem>
                  <SelectItem value="45000">£45,000+</SelectItem>
                  <SelectItem value="50000">£50,000+</SelectItem>
                  <SelectItem value="60000">£60,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setTempFilters({});
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
