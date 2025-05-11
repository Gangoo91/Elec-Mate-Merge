
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SafetyFundamentals = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Safety Fundamentals</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="mb-4">Safety fundamentals content is currently under development.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Card>
    </div>
  );
};

export default SafetyFundamentals;
