
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MentorCard from "./MentorCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MentorGridProps {
  mentors: any[];
  isLoading: boolean;
  error: string | null;
  requestingMentor: string | null;
  onConnectMentor: (mentor: any) => void;
}

const MentorGrid = ({ mentors, isLoading, error, requestingMentor, onConnectMentor }: MentorGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  
  // Extract unique values for filter dropdowns
  const specialties = Array.from(new Set(mentors.map(mentor => mentor.specialty)));
  const availabilities = Array.from(new Set(mentors.map(mentor => mentor.availability)));
  
  const filteredMentors = mentors.filter(mentor => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.specialty.toLowerCase().includes(searchLower) ||
      mentor.experience.toLowerCase().includes(searchLower);
    
    const matchesSpecialty = specialtyFilter === "all" || mentor.specialty === specialtyFilter;
    const matchesAvailability = availabilityFilter === "all" || mentor.availability === availabilityFilter;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });
  
  const handleClearFilters = () => {
    setSearchTerm("");
    setSpecialtyFilter("all");
    setAvailabilityFilter("all");
  };
  
  const hasActiveFilters = searchTerm || specialtyFilter !== "all" || availabilityFilter !== "all";
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="w-full max-w-sm mx-auto">
          <div className="h-10 bg-elec-gray/50 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-elec-yellow/10 bg-elec-gray/50 h-64 animate-pulse">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-elec-yellow/10"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-elec-yellow/10 rounded"></div>
                    <div className="h-4 w-20 bg-elec-yellow/10 rounded"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500/20 bg-red-500/5 text-center p-6">
        <p className="text-lg font-medium">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search by name, specialty, or learning focus..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-col sm:flex-row md:w-auto">
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-elec-dark border-elec-yellow/20">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent className="bg-elec-dark border-elec-yellow/20">
              <SelectItem value="all">All Availability</SelectItem>
              {availabilities.map(availability => (
                <SelectItem key={availability} value={availability}>
                  {availability}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {specialtyFilter !== "all" && (
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {specialtyFilter}
              <button 
                className="ml-1 hover:text-white"
                onClick={() => setSpecialtyFilter("all")}
              >
                ×
              </button>
            </Badge>
          )}
          {availabilityFilter !== "all" && (
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {availabilityFilter}
              <button 
                className="ml-1 hover:text-white"
                onClick={() => setAvailabilityFilter("all")}
              >
                ×
              </button>
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              "{searchTerm}"
              <button 
                className="ml-1 hover:text-white"
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={handleClearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
      
      {filteredMentors.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-elec-yellow/10 mb-4">
            <Filter className="h-8 w-8 text-elec-yellow/40" />
          </div>
          <p className="text-lg font-medium mb-2">No mentors found</p>
          <p className="text-muted-foreground mb-4">No mentors match your current filter criteria.</p>
          <Button 
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard 
              key={mentor.id}
              mentor={mentor}
              onConnect={onConnectMentor}
              isRequesting={requestingMentor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorGrid;
