
import { Helmet } from "react-helmet";
import MaterialCategoryBrowser from "@/components/electrician-materials/MaterialCategoryBrowser";

const Materials = () => {
  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Electrical Materials - Elec-Mate</title>
        <meta name="description" content="Browse and source electrical materials from multiple suppliers. Compare prices on cables, components, protection equipment and more." />
        <meta name="keywords" content="electrical materials, cables, MCBs, RCDs, electrical components, UK suppliers" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Electrical Materials</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Browse electrical materials from leading UK suppliers. Real-time pricing and availability from Screwfix, Toolstation, RS Components, and CEF.
          </p>
        </div>

        <MaterialCategoryBrowser />
      </div>
    </div>
  );
};

export default Materials;
