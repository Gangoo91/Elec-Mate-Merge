
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AIToolingHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tooling</h1>
        <p className="text-muted-foreground">
          Advanced AI tools to enhance your electrical work efficiency and accuracy.
        </p>
      </div>
        <Link to="/electrician">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
          </Button>
        </Link>
    </div>
  );
};

export default AIToolingHeader;
