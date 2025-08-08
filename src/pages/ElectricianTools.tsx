import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  ArrowLeft,
  Store,
  Building,
  ShoppingCart,
  Shield,
  Package,
  ExternalLink,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToolBuyingGuides from "@/components/electrician-tools/ToolBuyingGuides";

const ElectricianTools = () => {
  const [activeTab, setActiveTab] = useState<"tools" | "suppliers" | "guides">("tools");

  // Purchase categories that route to our live materials pages
  const purchaseCategories = [
    {
      id: "tools",
      title: "Electrical Tools & Testers",
      description: "Meters, hand tools and power tools for UK electricians",
      icon: Wrench,
      link: "/electrician/materials/category/tools",
    },
    {
      id: "protection",
      title: "PPE & Protection",
      description: "Gloves, eyewear and site protection essentials",
      icon: Shield,
      link: "/electrician/materials/category/protection",
    },
    {
      id: "accessories",
      title: "Installation Accessories",
      description: "Boxes, glands, fixings and consumables",
      icon: Package,
      link: "/electrician/materials/category/accessories",
    },
  ] as const;

  const suppliers = [
    {
      name: "Screwfix",
      slug: "screwfix",
      description: "Nationwide supplier with rapid Click & Collect",
      icon: Store,
    },
    {
      name: "Toolstation",
      slug: "toolstation",
      description: "Competitive pricing and next‑day delivery",
      icon: ShoppingCart,
    },
    {
      name: "ElectricalDirect",
      slug: "electricaldirect",
      description: "Trade-focused catalogue and bulk deals",
      icon: Building,
    },
    {
      name: "CEF",
      slug: "city-electrical-factors",
      description: "City Electrical Factors trade counters UK‑wide",
      icon: Building,
    },
  ] as const;

  const pageTitle = "Electrical Tools & Buying Guides | UK Suppliers";
  const pageDescription = "Browse tools, trusted UK suppliers and BS 7671 buying guides. Mobile-friendly tabs with dropdowns.";

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "https://elecmate.app/electrician/tools"}
        />
      </Helmet>

      <header className="px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Wrench className="h-6 w-6 text-elec-yellow" />
              Electrical Tools & Buying Guides
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Source and compare tools with BS 7671‑aware guidance.
            </p>
          </div>
          <Link to="/electrician/trade-essentials">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Trade Essentials
            </Button>
          </Link>
        </div>

        {/* Mobile: dropdown */}
        <div className="mt-4 sm:hidden">
          <Select value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="z-50">
              <SelectItem value="tools">Browse Tools</SelectItem>
              <SelectItem value="suppliers">UK Suppliers</SelectItem>
              <SelectItem value="guides">Buying Guides</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop: tab buttons */}
        <nav className="hidden sm:flex items-center gap-2 mt-4" aria-label="Sections">
          {([
            { key: "tools", label: "Browse Tools" },
            { key: "suppliers", label: "UK Suppliers" },
            { key: "guides", label: "Buying Guides" },
          ] as const).map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => setActiveTab(tab.key as any)}
              className={activeTab === tab.key ? "bg-elec-yellow text-elec-dark" : ""}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      </header>

      <main className="px-4 md:px-0 space-y-6">
        {activeTab === "tools" && (
          <section aria-labelledby="browse-tools" className="space-y-4">
            <h2 id="browse-tools" className="sr-only">Browse Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purchaseCategories.map((cat) => (
                <Link key={cat.id} to={cat.link} className="focus:outline-none hover-scale">
                  <Card className="bg-elec-gray border-elec-gray/40 hover:border-elec-yellow/40 transition-all cursor-pointer h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg flex items-center justify-center">
                          <cat.icon className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <CardTitle className="text-lg text-elec-light">{cat.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-elec-light/70">
                        {cat.description}
                      </CardDescription>
                      <Button className="mt-3 w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                        Browse {cat.title.split(" ")[0]}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {activeTab === "suppliers" && (
          <section aria-labelledby="uk-suppliers" className="space-y-4">
            <h2 id="uk-suppliers" className="sr-only">UK Suppliers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suppliers.map((s) => (
                <Link key={s.slug} to={`/electrician/materials/supplier/${s.slug}`} className="hover-scale">
                  <Card className="bg-elec-gray border-elec-gray/40 hover:border-elec-yellow/40 transition-all h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg flex items-center justify-center">
                          <s.icon className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <CardTitle className="text-lg text-elec-light">{s.name}</CardTitle>
                      </div>
                      <CardDescription className="text-elec-light/70 mt-1">{s.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                        Browse Deals
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <Card className="bg-elec-gray border-elec-gray/40">
              <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Full Supplier Catalogues</h3>
                  <p className="text-sm text-elec-light/70">For the complete range, visit official supplier websites.</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://www.screwfix.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2">
                      Screwfix <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="https://www.toolstation.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2">
                      Toolstation <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="https://www.electricaldirect.co.uk" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2">
                      ElectricalDirect <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeTab === "guides" && (
          <section aria-labelledby="buying-guides" className="space-y-4">
            <h2 id="buying-guides" className="sr-only">Buying Guides</h2>
            <ToolBuyingGuides />
          </section>
        )}
      </main>
    </div>
  );
};

export default ElectricianTools;
