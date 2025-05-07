
import { Search } from "lucide-react";

interface ChatSearchBarProps {
  onSearch?: (query: string) => void;
}

const ChatSearchBar = ({ onSearch }: ChatSearchBarProps) => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="bg-black py-2 px-4 border-b border-elec-yellow/20">
      <div className="max-w-3xl mx-auto w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-elec-yellow text-sm"
            onChange={handleSearchInputChange}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="h-4 w-4 text-elec-yellow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSearchBar;
