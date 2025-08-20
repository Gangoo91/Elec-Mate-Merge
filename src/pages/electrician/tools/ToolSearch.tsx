import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { tools, toolCategories } from "@/data/electrician/toolData";
import ToolSearch from "@/components/electrician-tools/ToolSearch";
import ToolCard from "@/components/electrician-tools/ToolCard";

const ToolSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredTools, setFilteredTools] = useState(tools);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "");
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || "");
  const [supplier, setSupplier] = useState(searchParams.get('supplier') || "");

  useEffect(() => {
    let filtered = [...tools];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.brands.some(brand => brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.subCategory?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(tool => {
        const toolMinPrice = Math.min(...Object.values(tool.suppliers).map(s => s.price));
        return max ? (toolMinPrice >= min && toolMinPrice <= max) : (toolMinPrice >= min);
      });
    }

    // Filter by supplier
    if (supplier) {
      filtered = filtered.filter(tool => 
        Object.keys(tool.suppliers).includes(supplier)
      );
    }

    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory, priceRange, supplier]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/tools">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
              Tool Search
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find the perfect tools for your electrical work from top UK suppliers
            </p>
          </div>
        </div>

        {/* Search Component */}
        <ToolSearch />

        {/* Advanced Filters */}
        <div className="bg-elec-gray/50 rounded-lg border border-elec-yellow/20 p-4">
          <h3 className="text-lg font-medium text-white mb-4">Refine Your Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Search Term</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter search term..."
                className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white placeholder:text-gray-400"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                <option value="">All Categories</option>
                {toolCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                <option value="">Any Price</option>
                <option value="0-25">Under £25</option>
                <option value="25-100">£25 - £100</option>
                <option value="100-300">£100 - £300</option>
                <option value="300-1000">£300 - £1000</option>
                <option value="1000">Over £1000</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Supplier</label>
              <select 
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                <option value="">All Suppliers</option>
                <option value="screwfix">Screwfix</option>
                <option value="toolstation">Toolstation</option>
                <option value="rs-components">RS Components</option>
                <option value="cef">City Electrical Factors</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/30"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setPriceRange("");
                setSupplier("");
              }}
            >
              Clear All Filters
            </Button>
            <Button 
              size="sm" 
              className="bg-elec-yellow text-black"
              onClick={() => {
                // Trigger search with current filters
                const params = new URLSearchParams();
                if (searchQuery) params.set('q', searchQuery);
                if (selectedCategory) params.set('category', selectedCategory);
                if (priceRange) params.set('price', priceRange);
                if (supplier) params.set('supplier', supplier);
                window.history.replaceState({}, '', `?${params.toString()}`);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Search Results ({filteredTools.length} tools found)
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm bg-elec-dark border border-elec-yellow/30 rounded px-3 py-1 text-white">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Brand A-Z</option>
              </select>
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  showComparison={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-elec-gray/50 rounded-lg border border-elec-yellow/20 p-8">
                <h3 className="text-lg font-medium text-white mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse our tool categories
                </p>
                <Link to="/electrician/tools">
                  <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse All Tools
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolSearchPage;