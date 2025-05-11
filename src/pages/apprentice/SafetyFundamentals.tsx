
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SafetyFundamentals = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Safety Fundamentals</h1>
        <Link to="/apprentice/study">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study
          </Button>
        </Link>
      </div>
      
      <div className="bg-muted p-8 rounded-lg text-center">
        <p className="text-lg mb-4">This page is under development.</p>
        <p>Content will be added soon.</p>
      </div>
    </div>
  );
};

export default SafetyFundamentals;
