
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, AlertTriangle, TrendingUp, MapPin, Star, Clock, Search, Package, BookOpen, Users } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import ToolSearch from "@/components/electrician-tools/ToolSearch";
import DealOfTheDay from "@/components/electrician-tools/DealOfTheDay";
import ToolPricingWidget from "@/components/electrician-tools/ToolPricingWidget";
import UKWholesalersDirectory from "@/components/electrician-tools/UKWholesalersDirectory";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";
import LivePriceComparison from "@/components/electrician-tools/LivePriceComparison";
import AmazonToolsSection from "@/components/electrician-tools/AmazonToolsSection";
import FeaturedDealsCarousel from "@/components/electrician-tools/FeaturedDealsCarousel";
import ToolCategoryBrowser from "@/components/electrician-tools/ToolCategoryBrowser";
import PriceAlertsTab from "@/components/electrician-tools/PriceAlertsTab";
import ReviewsRatingsTab from "@/components/electrician-tools/ReviewsRatingsTab";

const ElectricalTools = () => {
  const keyStats = [
    { label: "Active Deals", value: "127", icon: Star, color: "text-amber-400" },
    { label: "UK Suppliers", value: "24", icon: MapPin, color: "text-blue-400" },
    { label: "Updated Today", value: "Real-time", icon: Clock, color: "text-green-400" },
    { label: "Average Savings", value: "23%", icon: TrendingUp, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
        {/* Enhanced Header */}
        <div className="space-y-6">
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

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <ShoppingCart className="h-8 w-8 text-elec-yellow" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-elec-yellow leading-tight">
                Electrical Tools Hub
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Your one-stop destination for electrical tools and equipment. Compare prices, find the best deals, 
              and shop directly from trusted UK suppliers with expert buying guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Badge className="bg-green-500/20 text-green-400">Live Pricing</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">UK Suppliers</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Expert Guides</Badge>
              <Badge className="bg-amber-500/20 text-amber-400">Daily Deals</Badge>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-elec-dark/50 rounded-lg">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="bg-elec-gray/50 border-elec-yellow/30">
          <AlertTriangle className="h-4 w-4 text-elec-yellow" />
          <AlertDescription className="text-sm">
            Elec-Mate provides price comparisons and supplier information for convenience. We are not affiliated with 
            or endorsed by the suppliers listed. Prices and availability may vary. Always verify details directly with suppliers.
          </AlertDescription>
        </Alert>

        {/* Tabbed Interface */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-elec-gray/50 border border-elec-yellow/20">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse & Search
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Deals & Offers
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              UK Suppliers
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Buying Guides
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Price Alerts
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Reviews
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

          <TabsContent value="alerts" className="space-y-6">
            <PriceAlertsTab />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewsRatingsTab />
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-blue-500/10 border border-elec-yellow/30 rounded-lg p-6 shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-elec-yellow">
              Ready to Upgrade Your Toolkit?
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Browse our curated selection of tools from trusted UK suppliers. Get the best prices, 
              expert recommendations, and fast delivery to keep your projects on track.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Browse All Tools
              </Button>
              <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
                Set Up Price Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTools;
