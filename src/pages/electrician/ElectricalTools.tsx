
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, Search, MapPin, BookOpen, Calculator, FileText, Zap, Shield, Package } from "lucide-react";
import { toolCategories, suppliers, buyingGuides } from "@/data/electrician/toolData";
import ToolCategoryCard from "@/components/electrician-tools/ToolCategoryCard";
import ToolSearch from "@/components/electrician-tools/ToolSearch";

const ElectricalTools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Hub
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <Wrench className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                Electrical Workshop
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your comprehensive toolkit for electrical work - find tools, suppliers, and buying guides.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-elec-gray/50 border border-elec-yellow/20">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Tools
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              UK Suppliers
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Buying Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Tool Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {toolCategories.map((category) => (
                <ToolCategoryCard key={category.id} category={category} showSearchLink={true} />
              ))}
            </div>

            {/* Search */}
            <ToolSearch />
            
            <div className="text-center">
              <Link to="/electrician/tools/search">
                <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <Search className="h-4 w-4 mr-2" />
                  Advanced Tool Search
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(suppliers).map(([key, supplier]) => (
                <Card key={key} className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                  <CardHeader>
                    <CardTitle>{supplier.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {supplier.description}
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        <strong>Delivery:</strong> {supplier.deliveryOptions.join(", ")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Payment:</strong> {supplier.paymentMethods.join(", ")}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 mt-3"
                      onClick={() => window.open(supplier.website, '_blank')}
                    >
                      Visit {supplier.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buyingGuides.map((guide) => (
                <Card key={guide.id} className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                  <CardHeader>
                    <CardTitle>{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-muted-foreground">£{guide.estimatedCost.min}-{guide.estimatedCost.max}</span>
                      <span className="text-muted-foreground">{guide.timeToRead}</span>
                    </div>
                    <Link to="/electrician/tools/guides">
                      <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                        Read Guide
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/electrician/tools/guides">
                <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All Buying Guides
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElectricalTools;
