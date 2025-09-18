
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToolsData } from "@/hooks/useToolsData";
import ToolsFeaturedCarousel from "@/components/electrician-tools/ToolsFeaturedCarousel";
import ToolsGrid from "@/components/electrician-tools/ToolsGrid";

const HandTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tools = [], isLoading } = useToolsData();

  // Filter tools for hand tools and apply search
  const handTools = tools.filter(tool => {
    const isHandTool = tool.category?.toLowerCase().includes('hand') || 
                     tool.name.toLowerCase().includes('screwdriver') ||
                     tool.name.toLowerCase().includes('pliers') ||
                     tool.name.toLowerCase().includes('spanner') ||
                     tool.name.toLowerCase().includes('wrench') ||
                     tool.name.toLowerCase().includes('cutter') ||
                     tool.name.toLowerCase().includes('stripper');
    
    const matchesSearch = !searchTerm || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return isHandTool && matchesSearch;
  });

  // Get featured tools (first 6 for carousel)
  const featuredTools = handTools.slice(0, 6);
  const featuredToolIds = featuredTools.map(tool => tool.id || 0);
  
  // Get remaining tools for grid
  const gridTools = handTools.slice(6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 animate-fade-in max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/apprentice/toolbox/tools-guide">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools Guide
            </Button>
          </Link>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              placeholder="Search hand tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-gray/50 border-elec-yellow/30 text-white placeholder:text-white/60 focus:border-elec-yellow/50"
            />
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Hand Tools</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Professional hand tools for electricians. Essential equipment for precision work and daily electrical tasks.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <ToolsFeaturedCarousel />
          </div>
        ) : handTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-elec-yellow" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Hand Tools Found</h3>
            <p className="text-white/90">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Featured Carousel */}
            {featuredTools.length > 0 && (
              <div className="transform transition-all duration-300">
                <ToolsFeaturedCarousel />
              </div>
            )}

            {/* Remaining Tools Grid */}
            {gridTools.length > 0 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white px-4">
                    More Hand Tools
                  </h3>
                  <div className="h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent flex-1" />
                </div>
                <div className="transform transition-all duration-300">
                  <ToolsGrid 
                    tools={gridTools}
                    excludeIds={featuredToolIds}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HandTools;
