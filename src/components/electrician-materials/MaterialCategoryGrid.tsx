
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  isOnSale?: boolean;
  salePrice?: string;
  stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
}

const MaterialCategoryGrid = () => {
  // This would typically come from an API or database
  const [materials, setMaterials] = useState<MaterialItem[]>([
    {
      id: 1,
      name: "6242Y Twin & Earth Cable 2.5mm² - 100m",
      category: "Cables",
      price: "£85.99",
      supplier: "ElectricalDirect",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    },
    {
      id: 2,
      name: "Consumer Unit 10-Way 100A Dual RCD",
      category: "Distribution",
      price: "£109.50",
      supplier: "City Electrical Factors",
      image: "placeholder.svg",
      isOnSale: true,
      salePrice: "£95.75",
      stockStatus: "In Stock"
    },
    {
      id: 3,
      name: "Double Socket Outlet 13A - White",
      category: "Accessories",
      price: "£6.75",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "Low Stock"
    },
    {
      id: 4,
      name: "LED GU10 Bulbs 5W - Pack of 10",
      category: "Lighting",
      price: "£29.99",
      supplier: "Toolstation",
      image: "placeholder.svg",
      isOnSale: true,
      salePrice: "£24.99",
      stockStatus: "In Stock"
    },
    {
      id: 5,
      name: "32A Type B MCB Circuit Breaker",
      category: "Protection",
      price: "£7.50",
      supplier: "ElectricalDirect",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    },
    {
      id: 6,
      name: "RCD 30mA 40A Double Pole",
      category: "Protection",
      price: "£34.25",
      supplier: "City Electrical Factors",
      image: "placeholder.svg",
      stockStatus: "Out of Stock"
    }
  ]);

  // Get unique suppliers
  const suppliers = [...new Set(materials.map(item => item.supplier))];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map(supplier => (
          <Link to={`/electrician/suppliers/${supplier.toLowerCase().replace(/\s+/g, '-')}`} key={supplier} className="block transition-transform hover:scale-[1.02]">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full">
              <CardHeader>
                <CardTitle className="text-xl">{supplier}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-elec-card/70 h-32 rounded-md flex items-center justify-center">
                    <span className="text-elec-yellow/70 text-lg">{supplier} Logo</span>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-2">
                      {materials.filter(item => item.supplier === supplier).length} products available
                    </p>
                    <Button className="w-full">Browse Products</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MaterialCategoryGrid;
