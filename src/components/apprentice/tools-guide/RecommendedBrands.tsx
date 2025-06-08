
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, ExternalLink, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const RecommendedBrands = () => {
  const isMobile = useIsMobile();
  
  const categories = [
    {
      category: "Hand Tools",
      brands: [
        {
          name: "Wiha",
          rating: 4.8,
          specialty: "Precision screwdrivers & insulated tools",
          priceRange: "£££",
          website: "https://www.wiha.com",
          ukDistributor: "Available at Screwfix, CEF",
          strengths: ["German engineering", "Lifetime warranty", "Ergonomic design"]
        },
        {
          name: "Klein Tools",
          rating: 4.7,
          specialty: "Professional electrician tools",
          priceRange: "£££",
          website: "https://www.kleintools.com",
          ukDistributor: "TLC Electrical, ElectricalDirect",
          strengths: ["American quality", "Durable construction", "Professional grade"]
        },
        {
          name: "CK Tools",
          rating: 4.5,
          specialty: "UK electrician tools & cases",
          priceRange: "££",
          website: "https://www.cktools.co.uk",
          ukDistributor: "Widely available UK",
          strengths: ["UK designed", "Good value", "Electrician focused"]
        }
      ]
    },
    {
      category: "Testing Equipment",
      brands: [
        {
          name: "Fluke",
          rating: 4.9,
          specialty: "Professional test & measurement",
          priceRange: "££££",
          website: "https://www.fluke.com",
          ukDistributor: "Authorized dealers nationwide",
          strengths: ["Industry standard", "Accurate & reliable", "Comprehensive warranty"]
        },
        {
          name: "Megger",
          rating: 4.6,
          specialty: "Insulation & electrical testing",
          priceRange: "£££",
          website: "https://www.megger.com",
          ukDistributor: "CEF, TLC Electrical",
          strengths: ["UK heritage", "Specialist testing", "Robust design"]
        },
        {
          name: "Kewtech",
          rating: 4.4,
          specialty: "Affordable testing equipment",
          priceRange: "££",
          website: "https://www.kewtech.co.uk",
          ukDistributor: "Screwfix, Toolstation",
          strengths: ["Budget friendly", "Easy to use", "Good for apprentices"]
        }
      ]
    },
    {
      category: "Power Tools",
      brands: [
        {
          name: "Makita",
          rating: 4.7,
          specialty: "Cordless power tools",
          priceRange: "£££",
          website: "https://www.makita.co.uk",
          ukDistributor: "Nationwide availability",
          strengths: ["Battery technology", "Professional range", "Reliable motors"]
        },
        {
          name: "DeWalt",
          rating: 4.6,
          specialty: "Heavy-duty construction tools",
          priceRange: "£££",
          website: "https://www.dewalt.co.uk",
          ukDistributor: "Screwfix, Toolstation",
          strengths: ["Tough construction", "Widely available", "Good warranty"]
        },
        {
          name: "Bosch Professional",
          rating: 4.5,
          specialty: "Professional blue range",
          priceRange: "£££",
          website: "https://www.bosch-professional.com",
          ukDistributor: "CEF, professional dealers",
          strengths: ["German quality", "Innovation", "Comprehensive range"]
        }
      ]
    }
  ];
  
  const getPriceColor = (price: string) => {
    switch (price) {
      case "££££": return "text-red-400";
      case "£££": return "text-orange-400";
      case "££": return "text-yellow-400";
      case "£": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-2 flex items-center justify-center gap-2">
          <Award className="h-6 w-6" />
          Recommended Brands
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Trusted brands recommended by UK electricians and industry professionals. 
          Quality tools from manufacturers with proven track records in the electrical trade.
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {category.category}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {category.brands.map((brand, brandIndex) => (
                <Card key={brandIndex} className="border-elec-yellow/20 bg-elec-dark/50 hover:border-elec-yellow/40 transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-elec-yellow group-hover:text-elec-yellow/90 transition-colors">
                          {brand.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{brand.rating}</span>
                          </div>
                          <span className={`font-bold text-sm ${getPriceColor(brand.priceRange)}`}>
                            {brand.priceRange}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        asChild
                        className="text-elec-yellow hover:text-elec-yellow/80 hover:bg-elec-yellow/10"
                      >
                        <a href={brand.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {brand.specialty}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      <strong>UK Availability:</strong> {brand.ukDistributor}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="border-elec-yellow/30 text-elec-yellow text-xs"
                        >
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-elec-yellow/5 to-green-500/5 border border-elec-yellow/20 rounded-lg">
        <h3 className="font-medium text-elec-yellow mb-2">🔧 Brand Selection Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-medium mb-1">For Apprentices:</p>
            <p>Start with reliable mid-range brands like CK Tools and Kewtech. Focus on quality over quantity.</p>
          </div>
          <div>
            <p className="font-medium mb-1">For Professionals:</p>
            <p>Invest in premium brands like Fluke and Wiha for tools you'll use daily. They'll last your entire career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBrands;
