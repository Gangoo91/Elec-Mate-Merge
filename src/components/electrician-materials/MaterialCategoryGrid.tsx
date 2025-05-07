
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productsBySupplier } from "@/data/electrician/productData";
import { supplierData } from "@/data/electrician/supplierData";
import { Folder, ArrowRight } from "lucide-react";

const MaterialCategoryGrid = () => {
  // Get unique categories for each supplier
  const supplierCategories = {} as Record<string, string[]>;
  
  Object.keys(productsBySupplier).forEach(supplier => {
    const products = productsBySupplier[supplier];
    supplierCategories[supplier] = [...new Set(products.map(item => item.category))];
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(supplierData).map(supplierKey => {
          const supplier = supplierData[supplierKey];
          const categories = supplierCategories[supplierKey] || [];
          
          return (
            <Card key={supplierKey} className="border-elec-yellow/20 bg-elec-gray h-full transition-all hover:border-elec-yellow/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{supplier.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {productsBySupplier[supplierKey]?.length || 0} products available
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="bg-elec-card/70 h-32 rounded-md flex items-center justify-center mb-4">
                  <span className="text-elec-yellow/70 text-lg">{supplier.name} Logo</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-1">Available Categories:</h3>
                  <div className="flex flex-wrap gap-1">
                    {categories.map(category => (
                      <Link 
                        key={category}
                        to={`/electrician/suppliers/${supplierKey}?category=${encodeURIComponent(category)}`}
                        className="bg-elec-card hover:bg-elec-card/70 text-xs rounded-full px-2 py-1 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Link to={`/electrician/suppliers/${supplierKey}`} className="w-full">
                  <Button className="w-full flex justify-between">
                    Browse Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialCategoryGrid;
