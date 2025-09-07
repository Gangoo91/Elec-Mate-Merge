export interface StaticToolItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
  description?: string;
}

export const staticToolsData: StaticToolItem[] = [
  // Hand Tools
  {
    id: 1001,
    name: "Wera Kraftform Plus 334 Screwdriver Set",
    category: "Hand Tools",
    price: "£29.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Ergonomic handle", "Chrome-vanadium steel", "6-piece set"],
    description: "Professional screwdriver set with comfortable grip"
  },
  {
    id: 1002,
    name: "Stanley FatMax Tape Measure 8m",
    category: "Hand Tools", 
    price: "£24.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["8m length", "Standout reach", "Magnetic end"]
  },
  {
    id: 1003,
    name: "Bahco Superior Hacksaw Frame",
    category: "Hand Tools",
    price: "£18.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Adjustable frame", "Ergonomic handle", "Professional grade"]
  },
  {
    id: 1004,
    name: "Klein Tools Wire Strippers",
    category: "Hand Tools",
    price: "£34.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    isOnSale: true,
    salePrice: "£29.99",
    highlights: ["Multi-gauge", "Precision cutting", "Comfort grip"]
  },
  {
    id: 1005,
    name: "Irwin Vise-Grip Pliers Set",
    category: "Hand Tools",
    price: "£45.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["3-piece set", "Locking mechanism", "Hardened jaws"]
  },

  // Power Tools
  {
    id: 2001,
    name: "DeWalt DCD796 Brushless Drill",
    category: "Power Tools",
    price: "£149.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Brushless motor", "18V Li-ion", "High torque"],
    description: "Professional cordless drill with brushless motor technology"
  },
  {
    id: 2002,
    name: "Makita DHS680 Circular Saw",
    category: "Power Tools",
    price: "£189.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["165mm blade", "18V battery", "LED job light"]
  },
  {
    id: 2003,
    name: "Milwaukee M18 Multi-Tool",
    category: "Power Tools",
    price: "£119.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "Low Stock",
    highlights: ["Variable speed", "Tool-free accessory change", "Compact design"]
  },
  {
    id: 2004,
    name: "Bosch GBH 2-28 SDS Hammer Drill",
    category: "Power Tools",
    price: "£229.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    isOnSale: true,
    salePrice: "£199.99",
    highlights: ["SDS-plus chuck", "3-mode operation", "850W motor"]
  },

  // Testing Equipment
  {
    id: 3001,
    name: "Fluke T6-600 Electrical Tester",
    category: "Testing Equipment",
    price: "£299.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["FieldSense technology", "600V measurement", "OLED display"],
    description: "Non-contact voltage tester with advanced FieldSense technology"
  },
  {
    id: 3002,
    name: "Megger MFT1731 Multifunction Tester",
    category: "Testing Equipment",
    price: "£1,299.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["18th Edition compliant", "Auto sequence testing", "Bluetooth connectivity"]
  },
  {
    id: 3003,
    name: "Kewtech KT65DL RCD Tester",
    category: "Testing Equipment",
    price: "£189.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Auto ramp testing", "Digital display", "Compact design"]
  },
  {
    id: 3004,
    name: "Socket & See SOK-34 Socket Tester",
    category: "Testing Equipment",
    price: "£24.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["13A socket testing", "LED indicators", "Portable"]
  },

  // Safety Equipment
  {
    id: 4001,
    name: "DeWalt DPGS Series Safety Glasses",
    category: "Safety Equipment",
    price: "£14.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Anti-fog coating", "UV protection", "Comfortable fit"]
  },
  {
    id: 4002,
    name: "3M Peltor X5A Ear Defenders",
    category: "Safety Equipment",
    price: "£29.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["37dB noise reduction", "Comfortable headband", "Professional grade"]
  },
  {
    id: 4003,
    name: "Portwest A120 Cut Resistant Gloves",
    category: "Safety Equipment",
    price: "£8.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    isOnSale: true,
    salePrice: "£6.99",
    highlights: ["Cut level 5", "Nitrile coating", "Breathable"]
  },
  {
    id: 4004,
    name: "JSP Force 8 Half Mask",
    category: "Safety Equipment",
    price: "£19.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Dual filter system", "Comfortable seal", "Easy filter change"]
  },

  // Measuring & Marking
  {
    id: 5001,
    name: "Stabila Type 70 Spirit Level 600mm",
    category: "Measuring & Marking",
    price: "£34.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Precision vials", "Lightweight", "Robust frame"]
  },
  {
    id: 5002,
    name: "Leica Disto D2 Laser Measure",
    category: "Measuring & Marking",
    price: "£89.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["100m range", "Bluetooth connectivity", "High accuracy"]
  },
  {
    id: 5003,
    name: "Stanley Chalk Line Reel",
    category: "Measuring & Marking",
    price: "£12.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["30m line", "Quick rewind", "Blue chalk included"]
  },

  // Cutting Tools
  {
    id: 6001,
    name: "Stanley Knife Retractable",
    category: "Cutting Tools",
    price: "£8.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Retractable blade", "Ergonomic grip", "Blade storage"]
  },
  {
    id: 6002,
    name: "Irwin Jack Universal Saw 500mm",
    category: "Cutting Tools",
    price: "£16.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Fast cutting", "Comfortable grip", "Precision ground teeth"]
  },
  {
    id: 6003,
    name: "Knipex Cable Shears 95 12 165",
    category: "Cutting Tools",
    price: "£24.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Clean cuts", "Ergonomic handles", "Professional grade"]
  },

  // Installation Tools
  {
    id: 7001,
    name: "Greenlee Knockout Punch Set",
    category: "Installation Tools",
    price: "£189.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Multiple sizes", "Clean holes", "Professional grade"]
  },
  {
    id: 7002,
    name: "Klein Tools Cable Pulling System",
    category: "Installation Tools",
    price: "£79.99",
    supplier: "Toolstation",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Fish tape system", "Non-conductive", "50ft length"]
  },
  {
    id: 7003,
    name: "Ideal Cable Tracer Kit",
    category: "Installation Tools",
    price: "£149.99",
    supplier: "Screwfix",
    image: "/placeholder.svg",
    stockStatus: "In Stock",
    highlights: ["Tone generator", "Probe included", "Clear audio indication"]
  }
];

export const getToolsByCategory = (category: string): StaticToolItem[] => {
  return staticToolsData.filter(tool => tool.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = [...new Set(staticToolsData.map(tool => tool.category))];
  return categories.sort();
};

export const getToolStats = () => {
  const totalTools = staticToolsData.length;
  const categories = getAllCategories();
  const suppliers = [...new Set(staticToolsData.map(tool => tool.supplier))];
  const onSaleCount = staticToolsData.filter(tool => tool.isOnSale).length;
  
  return {
    totalTools,
    totalCategories: categories.length,
    totalSuppliers: suppliers.length,
    onSaleCount,
    categories,
    suppliers
  };
};