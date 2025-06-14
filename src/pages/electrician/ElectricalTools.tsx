
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Search, MapPin, BookOpen, TrendingUp } from "lucide-react";
import ToolSearch from "@/components/electrician-tools/ToolSearch";
import DealOfTheDay from "@/components/electrician-tools/DealOfTheDay";
import ToolPricingWidget from "@/components/electrician-tools/ToolPricingWidget";
import UKWholesalersDirectory from "@/components/electrician-tools/UKWholesalersDirectory";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";
import LivePriceComparison from "@/components/electrician-tools/LivePriceComparison";
import AmazonToolsSection from "@/components/electrician-tools/AmazonToolsSection";
import FeaturedDealsCarousel from "@/components/electrician-tools/FeaturedDealsCarousel";
import ToolCategoryBrowser from "@/components/electrician-tools/ToolCategoryBrowser";

const ElectricalTools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Simplified Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/trade-essentials">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Trade Essentials
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <ShoppingCart className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                Electrical Tools Hub
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find and compare electrical tools from trusted UK suppliers with expert guidance.
            </p>
          </div>
        </div>

        {/* Simplified Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50 border border-elec-yellow/20">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Tools
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Deals & Prices
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              UK Suppliers
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Buying Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <ToolSearch />
            <ToolCategoryBrowser />
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <FeaturedDealsCarousel />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DealOfTheDay />
              </div>
              <div className="space-y-6">
                <ToolPricingWidget />
                <AmazonToolsSection />
              </div>
            </div>
            <LivePriceComparison />
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <UKWholesalersDirectory />
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <ToolBuyingGuides />
          </TabsContent>
        </Tabs>

        {/* Simplified Call to Action */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-blue-500/10 border border-elec-yellow/30 rounded-lg p-6">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-elec-yellow">
              Ready to Find Your Tools?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Browse our selection from trusted UK suppliers and get the best prices for your electrical projects.
            </p>
            <div className="flex justify-center gap-3">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Browse All Tools
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTools;
