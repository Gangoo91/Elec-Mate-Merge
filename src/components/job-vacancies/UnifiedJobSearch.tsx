
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, X, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { JobListing } from "@/pages/electrician/JobVacancies";

interface UnifiedJobSearchProps {
  onLocationChange: (location: string | null, radius: number) => void;
  onFiltersChange: (filters: any) => void;
  resetFilters: () => void;
  totalJobCount: number;
  filteredJobCount: number;
  jobs: JobListing[];
}

const UnifiedJobSearch: React.FC<UnifiedJobSearchProps> = ({
  onLocationChange,
  onFiltersChange,
  resetFilters,
  totalJobCount,
  filteredJobCount,
  jobs
}) => {
  const [location, setLocation] = useState("");
  const [searchRadius, setSearchRadius] = useState(25);
  const [jobType, setJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [company, setCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { toast } = useToast();

  // Get unique values for filter dropdowns
  const uniqueJobTypes = [...new Set(jobs.map(job => job.type).filter(Boolean))];
  const uniqueCompanies = [...new Set(jobs.map(job => job.company).filter(Boolean))].slice(0, 20);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const address = data.results[0].formatted;
              setLocation(address);
              onLocationChange(address, searchRadius);
              toast({
                title: "Location detected",
                description: `Using your current location: ${address}`,
              });
            }
          } else {
            // Fallback: use coordinates directly
            const coordsString = `${latitude}, ${longitude}`;
            setLocation(coordsString);
            onLocationChange(coordsString, searchRadius);
            toast({
              title: "Location detected",
              description: "Using your current coordinates",
            });
          }
        } catch (error) {
          toast({
            title: "Error getting location",
            description: "Failed to get your location details",
            variant: "destructive"
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        let message = "Failed to get your location";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Location access denied. Please enable location permissions.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Location information unavailable";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out";
        }
        
        toast({
          title: "Location Error",
          description: message,
          variant: "destructive"
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleLocationSearch = () => {
    if (location.trim()) {
      onLocationChange(location, searchRadius);
    } else {
      onLocationChange(null, 0);
    }
  };

  const handleFiltersApply = () => {
    const filters = {
      jobType: jobType || null,
      salaryMin: salaryMin ? parseInt(salaryMin) : null,
      company: company || null,
      searchTerm: searchTerm || null,
      remoteOnly
    };
    onFiltersChange(filters);
  };

  const clearAllFilters = () => {
    setLocation("");
    setJobType("");
    setSalaryMin("");
    setCompany("");
    setSearchTerm("");
    setRemoteOnly(false);
    setSearchRadius(25);
    resetFilters();
  };

  const activeFilterCount = [jobType, salaryMin, company, searchTerm, location].filter(Boolean).length + (remoteOnly ? 1 : 0);

  useEffect(() => {
    handleFiltersApply();
  }, [jobType, salaryMin, company, searchTerm, remoteOnly]);

  useEffect(() => {
    if (location) {
      handleLocationSearch();
    }
  }, [searchRadius]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Job Search & Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          <div className="text-sm font-normal text-muted-foreground">
            {filteredJobCount} of {totalJobCount} jobs
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 sm:space-y-6 px-2 sm:px-4">
          {/* Search Term */}
          <div className="space-y-2">
            <Label htmlFor="search-term">Search Jobs</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-term"
                placeholder="Search job titles, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Location Search */}
          <div className="space-y-3">
            <Label htmlFor="location">Location Search</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter city, postcode, or address..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9"
                  onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={getCurrentLocation} 
                  variant="outline" 
                  disabled={isGettingLocation}
                  className="whitespace-nowrap"
                >
                  {isGettingLocation ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  {isGettingLocation ? "Getting..." : "Use Current"}
                </Button>
                <Button onClick={handleLocationSearch} className="whitespace-nowrap">
                  Search Area
                </Button>
              </div>
            </div>
            
            {location && (
              <div className="space-y-2">
                <Label>Search Radius: {searchRadius} miles</Label>
                <Slider
                  value={[searchRadius]}
                  onValueChange={(value) => setSearchRadius(value[0])}
                  max={100}
                  min={5}
                  step={5}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Label htmlFor="advanced-toggle">Advanced Filters</Label>
            </div>
            <Switch
              id="advanced-toggle"
              checked={showAdvanced}
              onCheckedChange={setShowAdvanced}
            />
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Job Type */}
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any type</SelectItem>
                      {uniqueJobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any company</SelectItem>
                      {uniqueCompanies.map(comp => (
                        <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Minimum Salary */}
                <div className="space-y-2">
                  <Label htmlFor="salary-min">Minimum Salary (£)</Label>
                  <Input
                    id="salary-min"
                    type="number"
                    placeholder="e.g. 25000"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                  />
                </div>
              </div>

              {/* Remote Only */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="remote-only"
                  checked={remoteOnly}
                  onCheckedChange={setRemoteOnly}
                />
                <Label htmlFor="remote-only">Remote work only</Label>
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedJobSearch;
