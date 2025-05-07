
export interface MaterialItem {
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

export const productsBySupplier: Record<string, MaterialItem[]> = {
  "screwfix": [
    {
      id: 101,
      name: "Double Socket Outlet 13A - White",
      category: "Accessories",
      price: "£6.75",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "In Stock" as "In Stock"
    },
    {
      id: 102,
      name: "2-Gang 2-Way Light Switch",
      category: "Accessories",
      price: "£4.99",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "In Stock" as "In Stock"
    },
    {
      id: 103,
      name: "Circuit Breaker Type C 32A",
      category: "Protection",
      price: "£8.50",
      supplier: "Screwfix",
      image: "placeholder.svg",
      stockStatus: "Low Stock" as "Low Stock"
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
      stockStatus: "In Stock" as "In Stock"
    },
    {
      id: 202,
      name: "RCD 30mA 40A Double Pole",
      category: "Protection",
      price: "£34.25",
      supplier: "City Electrical Factors",
      image: "placeholder.svg",
      stockStatus: "In Stock" as "In Stock"
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
      stockStatus: "In Stock" as "In Stock"
    },
    {
      id: 302,
      name: "32A Type B MCB Circuit Breaker",
      category: "Protection",
      price: "£7.50",
      supplier: "ElectricalDirect",
      image: "placeholder.svg",
      stockStatus: "In Stock" as "In Stock"
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
      stockStatus: "In Stock" as "In Stock"
    },
    {
      id: 402,
      name: "Weatherproof Junction Box",
      category: "Accessories",
      price: "£3.49",
      supplier: "Toolstation",
      image: "placeholder.svg",
      stockStatus: "In Stock" as "In Stock"
    }
  ]
};
