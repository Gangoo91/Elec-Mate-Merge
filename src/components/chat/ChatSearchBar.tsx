
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
    <div className="sticky top-[150px] z-10 bg-black py-4 border-b border-elec-yellow/20">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#2c2c2c] border border-elec-yellow/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-elec-yellow"
            onChange={handleSearchInputChange}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Search className="h-6 w-6 text-elec-yellow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSearchBar;
