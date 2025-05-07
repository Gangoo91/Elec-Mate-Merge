
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, Search, Zap, TrendingDown, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialCategoryGrid from "@/components/electrician-materials/MaterialCategoryGrid";
import DealOfTheDay from "@/components/electrician-materials/DealOfTheDay";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";
import LivePricingWidget from "@/components/electrician-materials/LivePricingWidget";

const ElectricalMaterials = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            Electrical Materials
          </h1>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      {/* Top row with Deal of the Day and Live Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DealOfTheDay />
        </div>
        <div>
          <LivePricingWidget />
        </div>
      </div>

      {/* Search and filters */}
      <MaterialSearch />

      {/* Main content with tabs */}
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="cables">Cables</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
          <TabsTrigger value="lighting">Lighting</TabsTrigger>
          <TabsTrigger value="protection">Protection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <MaterialCategoryGrid category="all" />
        </TabsContent>
        
        <TabsContent value="cables">
          <MaterialCategoryGrid category="Cables" />
        </TabsContent>
        
        <TabsContent value="distribution">
          <MaterialCategoryGrid category="Distribution" />
        </TabsContent>
        
        <TabsContent value="accessories">
          <MaterialCategoryGrid category="Accessories" />
        </TabsContent>
        
        <TabsContent value="lighting">
          <MaterialCategoryGrid category="Lighting" />
        </TabsContent>
        
        <TabsContent value="protection">
          <MaterialCategoryGrid category="Protection" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElectricalMaterials;
