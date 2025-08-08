
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, Search, MapPin, BookOpen, Calculator, FileText, Zap } from "lucide-react";

const ElectricalTools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/electrician/trade-essentials">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Trade Essentials
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
              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-elec-yellow" />
                    Hand Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Essential hand tools for electrical work
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Hand Tools
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Test Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Testing and measurement equipment
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Test Equipment
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-elec-yellow" />
                    Power Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Power tools and accessories
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Power Tools
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Safety Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    PPE and safety equipment
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Safety Equipment
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-elec-yellow" />
                    Specialist Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Specialist electrical tools
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Specialist Tools
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Tool Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tool bags, boxes and storage
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Browse Tool Storage
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search for tools..." 
                    className="flex-1 px-3 py-2 rounded border border-elec-yellow/20 bg-elec-dark text-white placeholder:text-gray-400"
                  />
                  <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Screwfix</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Trade electrical supplies and tools
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Visit Screwfix
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>RS Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional electrical equipment
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Visit RS Components
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Toolstation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tools and electrical supplies
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Visit Toolstation
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>City Electrical Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Electrical wholesaler nationwide
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Visit CEF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Essential Tool Kit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    What tools you need to get started as an electrician
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Choosing Test Equipment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Guide to selecting the right testing equipment
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Tool Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep your tools in top condition
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle>Budget Tool Shopping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get the best value when buying tools
                  </p>
                  <Button size="sm" className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElectricalTools;
