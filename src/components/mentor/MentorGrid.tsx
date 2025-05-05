
import { useState } from "react";
import { Button } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import MentorCard from "./MentorCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface MentorGridProps {
  mentors: any[];
  isLoading: boolean;
  error: string | null;
  requestingMentor: string | null;
  onConnectMentor: (mentor: any) => void;
}

const MentorGrid = ({ mentors, isLoading, error, requestingMentor, onConnectMentor }: MentorGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredMentors = mentors.filter(mentor => {
    const searchLower = searchTerm.toLowerCase();
    return (
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.specialty.toLowerCase().includes(searchLower) ||
      mentor.experience.toLowerCase().includes(searchLower)
    );
  });
  
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
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder="Search by name, specialty, or experience..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredMentors.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No mentors found matching your search criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
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
