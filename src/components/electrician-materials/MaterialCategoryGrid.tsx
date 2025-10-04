
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { productsBySupplier } from "@/data/electrician/productData";
import { supplierData } from "@/data/electrician/supplierData";
import { Package } from "lucide-react";

const MaterialCategoryGrid = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(supplierData).map(supplierKey => {
          const supplier = supplierData[supplierKey];
          const productCount = productsBySupplier[supplierKey]?.length || 0;
          
          return (
            <Link 
              key={supplierKey}
              to={`/electrician/suppliers/${supplierKey}`}
            >
              <Card 
                className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-card backdrop-blur cursor-pointer hover:border-elec-yellow/60 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] group overflow-hidden h-full"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative text-center pb-3">
                  {/* Icon */}
                  <div className="mx-auto mb-3 w-16 h-16 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Package className="h-8 w-8 text-elec-yellow" />
                  </div>
                  
                  {/* Title */}
                  <CardTitle className="text-xl font-semibold group-hover:text-elec-yellow transition-colors duration-300">
                    {supplier.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative text-center space-y-3 pb-6">
                  {/* Product Count */}
                  <div className="flex justify-center">
                    <Badge 
                      variant="outline" 
                      className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
                    >
                      {productCount} available
                    </Badge>
                  </div>
                  
                  {/* Browse Link */}
                  <div className="pt-2">
                    <span className="text-sm text-muted-foreground group-hover:text-elec-yellow transition-colors duration-300">
                      Browse products →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialCategoryGrid;
