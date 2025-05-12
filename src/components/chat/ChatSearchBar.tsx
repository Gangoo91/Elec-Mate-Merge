
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  
  return (
    <div className="relative">
      <div 
        className={`flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-2 border transition-all ${
          isFocused 
            ? 'border-yellow-500 ring-2 ring-yellow-500/20' 
            : 'border-yellow-500/20'
        }`}
      >
        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
        <Input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="border-0 bg-transparent p-0 focus-visible:ring-0 text-sm text-white placeholder:text-gray-400 flex-1 h-6"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full bg-zinc-800 p-1 text-gray-400 hover:text-white hover:bg-zinc-700"
                onClick={handleClearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatSearchBar;
