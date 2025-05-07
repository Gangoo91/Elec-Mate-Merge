
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";
import LivePricingWidget from "@/components/electrician-materials/LivePricingWidget";
import DealOfTheDay from "@/components/electrician-materials/DealOfTheDay";
import MaterialCategoryGrid from "@/components/electrician-materials/MaterialCategoryGrid";

const ElectricalMaterials = () => {
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

      {/* Disclaimer */}
      <Alert className="bg-elec-gray border-elec-yellow/30">
        <AlertTriangle className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-sm">
          ElecMate is not affiliated with or endorsed by the suppliers listed. Prices and product availability may vary.
        </AlertDescription>
      </Alert>

      {/* Search bar */}
      <MaterialSearch />

      {/* Top row with Deal of the Day and Live Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DealOfTheDay />
        </div>
        <div>
          <LivePricingWidget />
        </div>
      </div>

      {/* Supplier Categories */}
      <div className="pt-4">
        <h2 className="text-2xl font-semibold mb-4">Shop by Supplier</h2>
        <MaterialCategoryGrid />
      </div>
    </div>
  );
};

export default ElectricalMaterials;
