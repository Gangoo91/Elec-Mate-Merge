
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaterialCard from "@/components/electrician-materials/MaterialCard";
import MaterialSearch from "@/components/electrician-materials/MaterialSearch";

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

const supplierData = {
  "screwfix": {
    name: "Screwfix",
    description: "Over 33,000 products available with next day delivery available.",
    dealOfTheDay: {
      name: "5ft LED Batten Light 22W",
      price: "£24.99",
      regularPrice: "£32.99",
      discount: "25%",
      features: [
        "High output 2200 lumens",
        "Energy efficient - 50,000 hour lifespan",
        "Easy installation - surface mount",
        "Complete with fittings and instructions"
      ],
      image: "placeholder.svg"
    }
  },
  "city-electrical-factors": {
    name: "City Electrical Factors",
    description: "Leading electrical wholesalers with nationwide coverage and competitive pricing.",
    dealOfTheDay: {
      name: "3 Phase Distribution Board 250A",
      price: "£299.50",
      regularPrice: "£349.99",
      discount: "15%",
      features: [
        "250A three phase capable",
        "Up to 24 ways configuration",
        "IP65 rated for outdoor use",
        "5 year manufacturer warranty"
      ],
      image: "placeholder.svg"
    }
  },
  "electricaldirect": {
    name: "ElectricalDirect",
    description: "10,000+ electrical products with free delivery on orders over £45.",
    dealOfTheDay: {
      name: "Fire Rated Downlights Pack of 6",
      price: "£39.99",
      regularPrice: "£59.99",
      discount: "33%",
      features: [
        "90 minute fire rating",
        "Dimmable LED GU10 bulbs included",
        "IP65 rated for bathroom use",
        "Quick and easy twist-lock installation"
      ],
      image: "placeholder.svg"
    }
  },
  "toolstation": {
    name: "Toolstation",
    description: "Quality trade products at great prices with click & collect in 5 minutes.",
    dealOfTheDay: {
      name: "18th Edition Consumer Unit Kit",
      price: "£74.99",
      regularPrice: "£99.99",
      discount: "25%",
      features: [
        "Complete with RCD and 6 MCBs",
        "Metal housing with locking door",
        "Pre-wired for easier installation",
        "Compliant with 18th Edition regulations"
      ],
      image: "placeholder.svg"
    }
  }
};

// Sample product data by supplier
const productsBySupplier = {
  "screwfix": [
    {
      id: 101,
      name: "Double Socket Outlet 13A - White",
      category: "Accessories",
      price: "£6.75",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    },
    {
      id: 102,
      name: "2-Gang 2-Way Light Switch",
      category: "Accessories",
      price: "£4.99",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    },
    {
      id: 103,
      name: "Circuit Breaker Type C 32A",
      category: "Protection",
      price: "£8.50",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "Low Stock"
    }
  ],
  "city-electrical-factors": [
    {
      id: 201,
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
      id: 202,
      name: "RCD 30mA 40A Double Pole",
      category: "Protection",
      price: "£34.25",
      supplier: "City Electrical Factors",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    }
  ],
  "electricaldirect": [
    {
      id: 301,
      name: "6242Y Twin & Earth Cable 2.5mm² - 100m",
      category: "Cables",
      price: "£85.99",
      supplier: "ElectricalDirect",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    },
    {
      id: 302,
      name: "32A Type B MCB Circuit Breaker",
      category: "Protection",
      price: "£7.50",
      supplier: "ElectricalDirect",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    }
  ],
  "toolstation": [
    {
      id: 401,
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
      id: 402,
      name: "Weatherproof Junction Box",
      category: "Accessories",
      price: "£3.49",
      supplier: "Toolstation",
      image: "placeholder.svg",
      stockStatus: "In Stock"
    }
  ]
};

const SupplierMaterials = () => {
  const { supplierSlug } = useParams<{ supplierSlug: string }>();
  const [supplier, setSupplier] = useState<string>("");
  const [products, setProducts] = useState<MaterialItem[]>([]);
  const [supplierInfo, setSupplierInfo] = useState<any>(null);

  useEffect(() => {
    if (supplierSlug) {
      // In a real application, this would be an API call
      const supplierKey = supplierSlug.toLowerCase();
      setSupplier(supplierData[supplierKey as keyof typeof supplierData]?.name || "Unknown Supplier");
      setProducts(productsBySupplier[supplierKey as keyof typeof productsBySupplier] || []);
      setSupplierInfo(supplierData[supplierKey as keyof typeof supplierData]);
    }
  }, [supplierSlug]);

  if (!supplierInfo) {
    return <div className="py-10 text-center">Loading supplier information...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            {supplier} Products
          </h1>
          <p className="text-muted-foreground mt-1">
            {supplierInfo.description}
          </p>
        </div>
        <Link to="/electrician/materials">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Materials
          </Button>
        </Link>
      </div>

      {/* Search bar */}
      <MaterialSearch />

      {/* Deal of the Day */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-gray/70 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            {supplier} Deal of the Day
            <span className="bg-elec-yellow text-black px-2 py-0.5 rounded-md text-sm flex items-center">
              <Star className="h-3 w-3 mr-1 fill-current" />
              SAVE {supplierInfo.dealOfTheDay.discount}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-elec-yellow">{supplierInfo.dealOfTheDay.price}</span>
                <span className="text-lg line-through text-muted-foreground">{supplierInfo.dealOfTheDay.regularPrice}</span>
              </div>
              
              <div className="text-xl font-medium">{supplierInfo.dealOfTheDay.name}</div>
              
              <ul className="space-y-2">
                {supplierInfo.dealOfTheDay.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <Star className="h-4 w-4 text-elec-yellow mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="pt-2">
                <Button className="w-full sm:w-auto">
                  Add to Order
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="bg-elec-card w-full h-40 rounded-md flex items-center justify-center text-elec-yellow/50">
                Product Image
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">{supplier} Products</h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(item => (
              <MaterialCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center border border-dashed border-elec-yellow/20 rounded-lg">
            <p className="text-muted-foreground">No products found for this supplier</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierMaterials;
