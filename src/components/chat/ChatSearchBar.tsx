
import { useState } from "react";
import { Search, X } from "lucide-react";

interface ChatSearchBarProps {
  onSearch?: (query: string) => void;
}

const ChatSearchBar = ({ onSearch }: ChatSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="py-2">
      <div className="max-w-3xl mx-auto w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:border-elec-yellow text-sm"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-elec-yellow">
            <Search className="h-4 w-4" />
          </div>
          
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSearchBar;
