
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Wrench, CheckCircle, Store, AlertTriangle, Package, Award, ShoppingBag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EssentialToolsTab from "@/components/apprentice/professional-tools/EssentialToolsTab";
import ToolSelectionTab from "@/components/apprentice/professional-tools/ToolSelectionTab";
import SuppliersAndCostsTab from "@/components/apprentice/professional-tools/SuppliersAndCostsTab";

const ToolsGuide = () => {
  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-gray to-elec-card border border-elec-yellow/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Wrench className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Tools & <span className="text-elec-yellow">Materials Guide</span>
                </h1>
              </div>
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
                Comprehensive guidance for building your professional electrician toolkit in the UK.
                From essential tools to smart purchasing decisions.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">50+</div>
                  <div className="text-xs sm:text-sm text-white/60">Essential Tools</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Award className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">Quality</div>
                  <div className="text-xs sm:text-sm text-white/60">Ratings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Store className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">UK</div>
                  <div className="text-xs sm:text-sm text-white/60">Suppliers</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <ShoppingBag className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">Cost</div>
                  <div className="text-xs sm:text-sm text-white/60">Estimates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                <Package className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Career-Long Investment</h3>
                <p className="text-sm text-white/80">
                  Building a professional toolkit is a long-term investment. This guide provides everything you need
                  to make <span className="font-medium text-blue-300">informed decisions</span> and build your collection strategically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Tool Categories
          </h2>

          <Tabs defaultValue="essential" className="w-full">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-elec-gray/80 to-elec-card/50 border border-white/10 p-1">
              <TabsList className="flex w-full overflow-x-auto scrollbar-hide gap-1 bg-transparent">
                <TabsTrigger
                  value="essential"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow transition-all"
                >
                  <Wrench className="h-4 w-4" />
                  <span className="hidden sm:inline">Essential Tools</span>
                  <span className="sm:hidden">Essential</span>
                </TabsTrigger>
                <TabsTrigger
                  value="selection"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 transition-all"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Tool Selection & Quality</span>
                  <span className="sm:hidden">Quality</span>
                </TabsTrigger>
                <TabsTrigger
                  value="suppliers"
                  className="flex-shrink-0 min-w-fit px-3 sm:px-4 py-2.5 flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 transition-all"
                >
                  <Store className="h-4 w-4" />
                  <span className="hidden sm:inline">Suppliers & Costs</span>
                  <span className="sm:hidden">Suppliers</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-6">
              <TabsContent value="essential" className="mt-0">
                <EssentialToolsTab />
              </TabsContent>

              <TabsContent value="selection" className="mt-0">
                <ToolSelectionTab />
              </TabsContent>

              <TabsContent value="suppliers" className="mt-0">
                <SuppliersAndCostsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Safety Warning Banner */}
        <Card className="border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent overflow-hidden">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-300 mb-1">Quality Matters</h3>
                <p className="text-sm text-white/80">
                  <span className="font-medium text-orange-300">Never compromise on safety-critical equipment</span> like test instruments and PPE.
                  Plan your purchases strategically over 12-18 months. Quality tools last a career.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ToolsGuide;
