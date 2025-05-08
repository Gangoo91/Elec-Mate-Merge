
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MentalHealthSearchProps {
  onSearch: (query: string) => void;
}

const MentalHealthSearch = ({ onSearch }: MentalHealthSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search mental health resources, support options..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          className="flex-1" 
          variant="default"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button className="flex-1" variant="outline">Filters</Button>
      </div>
    </div>
  );
};

export default MentalHealthSearch;
