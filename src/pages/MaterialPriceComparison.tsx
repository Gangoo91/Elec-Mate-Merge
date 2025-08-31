import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import MaterialPriceComparison from "@/components/electrician-materials/MaterialPriceComparison";

const MaterialPriceComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Material Price Comparison - Elec-Mate</title>
        <meta name="description" content="Compare electrical material prices across multiple UK suppliers. Find the best deals on cables, components, and electrical equipment." />
        <meta name="keywords" content="electrical materials price comparison, UK suppliers, cables prices, electrical components deals" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <MaterialPriceComparison />
      </div>
    </div>
  );
};

export default MaterialPriceComparisonPage;