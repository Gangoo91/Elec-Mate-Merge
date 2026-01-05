import { Helmet } from "react-helmet";
import EnhancedIndustryNewsCard from "@/components/electrician/safety-shares/EnhancedIndustryNewsCard";
import { ArrowLeft, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNewsEnhanced = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <Helmet>
        <title>Industry News - Elec-Mate</title>
        <meta name="description" content="Latest electrical industry news and updates" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Newspaper className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Industry News
              </h1>
              <p className="text-sm text-white/60">Latest electrical industry updates</p>
            </div>
          </div>
          <Link to="/electrician">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Hub
            </Button>
          </Link>
        </header>

        {/* Content */}
        <EnhancedIndustryNewsCard />
      </main>
    </div>
  );
};

export default IndustryNewsEnhanced;
