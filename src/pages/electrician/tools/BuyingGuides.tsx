import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, BookOpen, Calculator, Star } from "lucide-react";
import { buyingGuides } from "@/data/electrician/toolData";

const BuyingGuides = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "getting-started": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "test-equipment": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "maintenance": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "budget": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/tools">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                Tool Buying Guides
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert guidance to help you make informed decisions when building your professional toolkit
            </p>
          </div>
        </div>

        {/* Featured Guide */}
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-elec-yellow" />
              <span className="text-sm font-medium text-elec-yellow">Featured Guide</span>
            </div>
            <CardTitle className="text-xl text-white">
              Complete Electrical Toolkit for New Professionals
            </CardTitle>
            <p className="text-muted-foreground">
              Our most comprehensive guide covering everything you need to start your electrical career with the right tools
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30" variant="outline">
                Getting Started
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                15 min read
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calculator className="h-4 w-4" />
                Budget: £800-2000
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
                <div className="text-elec-yellow font-semibold">25+</div>
                <div className="text-muted-foreground text-xs">Essential Tools</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
                <div className="text-elec-yellow font-semibold">8</div>
                <div className="text-muted-foreground text-xs">Categories</div>
              </div>
              <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
                <div className="text-elec-yellow font-semibold">4.8★</div>
                <div className="text-muted-foreground text-xs">User Rating</div>
              </div>
            </div>
            <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Complete Guide
            </Button>
          </CardContent>
        </Card>

        {/* All Guides */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">All Buying Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buyingGuides.map((guide) => (
              <Card key={guide.id} className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/70 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg text-white leading-tight">
                      {guide.title}
                    </CardTitle>
                    <Badge className={getCategoryColor(guide.category)} variant="outline">
                      {guide.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {guide.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Guide Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
                      <div className="text-elec-yellow font-semibold">
                        £{guide.estimatedCost.min}-{guide.estimatedCost.max}
                      </div>
                      <div className="text-muted-foreground text-xs">Estimated Cost</div>
                    </div>
                    <div className="bg-elec-dark/30 rounded-lg p-3 text-center">
                      <div className="text-elec-yellow font-semibold">{guide.timeToRead}</div>
                      <div className="text-muted-foreground text-xs">Read Time</div>
                    </div>
                  </div>

                  {/* Guide Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span className="text-white">{new Date(guide.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {guide.timeToRead} • Updated regularly with latest prices
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Use Our Guides */}
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Why Use Our Buying Guides?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-3 bg-elec-yellow/20 rounded-full w-fit mx-auto mb-3">
                  <Star className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-medium text-white mb-2">Expert Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  Written by qualified electricians with years of experience
                </p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-elec-yellow/20 rounded-full w-fit mx-auto mb-3">
                  <Calculator className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-medium text-white mb-2">Real Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Up-to-date pricing from major UK suppliers
                </p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-elec-yellow/20 rounded-full w-fit mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-elec-yellow" />
                </div>
                <h3 className="font-medium text-white mb-2">Regular Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Guides updated monthly with latest tools and standards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyingGuides;