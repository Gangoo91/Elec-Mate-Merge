
import { Fragment } from "react";
import BusinessResources from "./BusinessResources";
import BusinessRoadmap from "./BusinessRoadmap";
import BusinessTips from "./BusinessTips";

const BusinessBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Business Builder</h2>
        <p className="text-muted-foreground">
          Starting your own electrical business can be a rewarding career path. Below are essential resources and guidance 
          to help you establish and grow a successful electrical contracting business in the UK market.
        </p>
      </div>

      <BusinessResources />
      
      <BusinessRoadmap />
      
      <BusinessTips />
    </div>
  );
};

export default BusinessBuilder;
