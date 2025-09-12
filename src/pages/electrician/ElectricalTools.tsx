import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import EnhancedToolCategoryDisplay from "@/components/electrician-tools/EnhancedToolCategoryDisplay";
import { ToolCategoryMegaMenu } from "@/components/electrician-tools/ToolCategoryMegaMenu";

const ElectricalTools = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  // If a specific category is selected, show the enhanced category display
  if (category) {
    return <EnhancedToolCategoryDisplay categoryName={category} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Electrical Tools & Equipment | Professional Tools for UK Electricians</title>
        <meta name="description" content="Professional electrical tools and equipment for UK electricians. Browse power tools, test equipment, safety gear and specialist tools from leading suppliers." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Simple header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Electrical Tools & Equipment</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional tools for UK electricians. Browse by category to find deals, compare prices, and access AI-powered insights.
          </p>
        </div>

        {/* Basic search when needed */}
        {searchTerm && (
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tool categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Category Mega Menu - Main focus */}
        <ToolCategoryMegaMenu />
      </main>
    </div>
  );
};

export default ElectricalTools;