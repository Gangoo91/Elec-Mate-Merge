
interface SupplierDeal {
  name: string;
  price: string;
  regularPrice: string;
  discount: string;
  features: string[];
  image: string;
}

export interface SupplierInfo {
  name: string;
  description: string;
  dealOfTheDay: SupplierDeal;
}

export const supplierData: Record<string, SupplierInfo> = {
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
