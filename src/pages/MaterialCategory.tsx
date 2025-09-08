import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryProductGrid from "@/components/electrician-materials/CategoryProductGrid";

const categoryMap = {
  'cables': 'Cables & Wiring',
  'components': 'Electrical Components', 
  'protection': 'Protection Equipment',
  'accessories': 'Installation Accessories',
  'lighting': 'Lighting Solutions'
};

const MaterialCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId || !categoryMap[categoryId as keyof typeof categoryMap]) {
    return (
      <div className="min-h-screen bg-elec-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Link to="/electrician/materials">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Materials
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryTitle = categoryMap[categoryId as keyof typeof categoryMap];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>{categoryTitle} - Electrical Materials - Elec-Mate</title>
        <meta name="description" content={`Browse ${categoryTitle.toLowerCase()} from leading UK suppliers. Compare prices and availability from CEF, Rexel, Edmundson, TLC and more.`} />
        <meta name="keywords" content={`${categoryTitle.toLowerCase()}, electrical materials, UK suppliers, ${categoryId}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link to="/electrician/materials">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Materials
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{categoryTitle}</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Browse {categoryTitle.toLowerCase()} from leading UK electrical suppliers with real-time pricing and availability.
            </p>
          </div>
        </div>

        <CategoryProductGrid 
          categoryId={categoryId} 
          categoryTitle={categoryTitle}
        />
      </div>
    </div>
  );
};

export default MaterialCategory;