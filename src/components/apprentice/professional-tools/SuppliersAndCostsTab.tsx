
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const SuppliersAndCostsTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Tool Suppliers & Cost Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Find the best suppliers for electrical tools and equipment across the UK. Compare prices, 
            delivery options, and take advantage of trade discounts and apprentice schemes.
          </p>
        </CardContent>
      </Card>

      <SupplierFinder />
    </div>
  );
};

export default SuppliersAndCostsTab;
