
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Search, MapPin, BookOpen, TrendingUp, Wrench, Calculator, FileText } from "lucide-react";

const ElectricalTools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {/* Simplified Header */}
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
                <ShoppingCart className="h-6 w-6 text-elec-yellow" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">
                Electrical Tools Hub
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find and compare electrical tools from trusted UK suppliers.
            </p>
          </div>
        </div>

        {/* Simplified Tabs */}
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
            {/* Simple Tool Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
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

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
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

              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-elec-yellow" />
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
            </div>

            {/* Simple Search */}
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardHeader>
                <CardTitle>Search Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Search for tools..." 
                    className="flex-1 px-3 py-2 rounded border border-elec-yellow/20 bg-elec-dark text-white"
                  />
                  <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardHeader>
                <CardTitle>UK Electrical Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">Screwfix</h3>
                    <p className="text-sm text-muted-foreground">Trade electrical supplies</p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">RS Components</h3>
                    <p className="text-sm text-muted-foreground">Professional electrical equipment</p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">Toolstation</h3>
                    <p className="text-sm text-muted-foreground">Tools and electrical supplies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardHeader>
                <CardTitle>Tool Buying Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">Essential Tool Kit for New Electricians</h3>
                    <p className="text-sm text-muted-foreground">What tools you need to get started</p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">Choosing the Right Multimeter</h3>
                    <p className="text-sm text-muted-foreground">Guide to selecting test equipment</p>
                  </div>
                  <div className="p-3 border border-elec-yellow/20 rounded">
                    <h3 className="font-medium">Power Tool Maintenance</h3>
                    <p className="text-sm text-muted-foreground">Keeping your tools in top condition</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ElectricalTools;
