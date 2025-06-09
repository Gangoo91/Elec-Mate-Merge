
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, User, Calendar, Filter, TrendingUp } from "lucide-react";

const ReviewsRatingsTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const topRatedTools = [
    {
      name: "Knipex Side Cutters 70 02 160",
      rating: 4.9,
      reviewCount: 156,
      price: "£32.50",
      category: "Hand Tools",
      pros: ["Exceptional build quality", "Perfect cutting action", "Comfortable grip"],
      cons: ["Premium price point"],
      userTypes: ["Professional", "DIY", "Trade"]
    },
    {
      name: "Fluke 1663 Multifunction Tester",
      rating: 4.8,
      reviewCount: 89,
      price: "£649.99",
      category: "Testing Equipment",
      pros: ["Accurate readings", "Robust construction", "Clear display"],
      cons: ["Expensive", "Heavy for field work"],
      userTypes: ["Professional", "Trade"]
    },
    {
      name: "DeWalt 18V XR Combi Drill",
      rating: 4.7,
      reviewCount: 234,
      price: "£149.99",
      category: "Power Tools",
      pros: ["Long battery life", "Powerful motor", "Good value"],
      cons: ["Chuck can slip", "Plastic belt clip"],
      userTypes: ["Professional", "DIY", "Trade"]
    }
  ];

  const recentReviews = [
    {
      id: 1,
      toolName: "Wiha VDE Screwdriver Set",
      rating: 5,
      reviewer: "ElectricianMike",
      date: "2024-01-20",
      verified: true,
      title: "Outstanding quality for VDE work",
      content: "Been using these for 6 months now. The insulation is top-notch and they've survived several drops. Comfortable grip even with gloves on. Worth every penny for safety-critical work.",
      helpful: 12,
      category: "Hand Tools",
      userType: "Professional"
    },
    {
      id: 2,
      toolName: "Megger MFT1741 Tester",
      rating: 4,
      reviewer: "SparkyJones",
      date: "2024-01-19",
      verified: true,
      title: "Good tester but heavy",
      content: "Does everything I need for periodic testing. Readings are consistent and the software is decent. Only downside is the weight - gets tiring carrying it around all day on site.",
      helpful: 8,
      category: "Testing Equipment",
      userType: "Trade"
    },
    {
      id: 3,
      toolName: "Klein Voltage Tester",
      rating: 5,
      reviewer: "SafetyFirst",
      date: "2024-01-18",
      verified: true,
      title: "Reliable safety tool",
      content: "Simple, effective, and has never let me down. Clear indication of live circuits. I always carry two - one as backup. Essential for any electrician's kit.",
      helpful: 15,
      category: "Testing Equipment",
      userType: "Professional"
    }
  ];

  const categories = ["all", "Testing Equipment", "Power Tools", "Hand Tools", "PPE & Safety"];
  const ratings = ["all", "5 Star", "4+ Star", "3+ Star"];

  const filteredReviews = recentReviews.filter(review => {
    if (selectedCategory !== "all" && review.category !== selectedCategory) return false;
    if (selectedRating !== "all") {
      const rating = parseInt(selectedRating.charAt(0));
      if (review.rating < rating) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
          <Star className="h-6 w-6 text-amber-400 fill-current" />
          Tool Reviews & Ratings
        </h2>
        <p className="text-muted-foreground">
          Real reviews from UK electricians and tradespeople. Make informed decisions based on professional experience.
        </p>
      </div>

      {/* Top Rated Tools */}
      <Card className="border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-elec-gray">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Highest Rated Tools This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topRatedTools.map((tool, index) => (
              <div key={index} className="p-4 bg-elec-dark/30 rounded-lg border border-amber-500/20">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-white text-sm leading-tight">{tool.name}</h3>
                    <Badge className="bg-amber-500/20 text-amber-400 text-xs">#{index + 1}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="font-bold text-amber-400">{tool.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({tool.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-elec-yellow font-medium">{tool.price}</span>
                    <Badge variant="outline" className="text-xs border-elec-yellow/30">
                      {tool.category}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-green-400">✓ Pros:</span>
                      <p className="text-muted-foreground">{tool.pros.slice(0, 2).join(", ")}</p>
                    </div>
                    {tool.cons.length > 0 && (
                      <div>
                        <span className="text-red-400">✗ Cons:</span>
                        <p className="text-muted-foreground">{tool.cons[0]}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Read Reviews
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-white mb-2 block">Minimum Rating</label>
              <select 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>
                    {rating === "all" ? "All Ratings" : rating}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">
            Recent Reviews ({filteredReviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-4 border border-elec-yellow/20 rounded-lg bg-elec-dark/30">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white">{review.toolName}</h3>
                        <Badge variant="outline" className="text-xs border-elec-yellow/30">
                          {review.category}
                        </Badge>
                        {review.verified && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {review.reviewer}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {review.date}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {review.userType}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? 'text-amber-400 fill-current' 
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">{review.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2 border-t border-elec-yellow/10">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-400 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-400 transition-colors">
                      <ThumbsDown className="h-3 w-3" />
                      Not Helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Guidelines */}
      <Card className="border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-elec-gray">
        <CardHeader>
          <CardTitle className="text-blue-400">📝 Review Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="space-y-2">
            <li>• Focus on tool performance in professional electrical work</li>
            <li>• Mention specific use cases and job types</li>
            <li>• Include information about durability and build quality</li>
            <li>• Compare with similar tools you've used</li>
            <li>• Mention any safety considerations</li>
            <li>• Keep reviews honest and constructive</li>
          </ul>
          <div className="pt-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              Write a Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsRatingsTab;
