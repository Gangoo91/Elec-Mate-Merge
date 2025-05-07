
import { useState, useEffect } from "react";
import MaterialCard from "./MaterialCard";
import { Button } from "@/components/ui/button";

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

interface MaterialCategoryGridProps {
  category: string;
}

const MaterialCategoryGrid: React.FC<MaterialCategoryGridProps> = ({ category }) => {
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

  // Filter materials by category if not "all"
  const filteredMaterials = category === "all" 
    ? materials 
    : materials.filter(item => item.category === category);

  return (
    <div className="space-y-6">
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(item => (
            <MaterialCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="py-10 text-center border border-dashed border-elec-yellow/20 rounded-lg">
          <p className="text-muted-foreground">No materials found in this category</p>
        </div>
      )}
      
      {filteredMaterials.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" className="border-elec-yellow/20">
            View More {category !== "all" ? category : ""} Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default MaterialCategoryGrid;
