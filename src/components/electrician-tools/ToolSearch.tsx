
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ToolSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by tool name, brand or type..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <Button className="flex-1" variant="default">Search</Button>
        <Button className="flex-1" variant="outline">Filters</Button>
      </div>
    </div>
  );
};

export default ToolSearch;
