
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, ArrowLeft } from "lucide-react";

const StudyHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Study Centre</h1>
      <Link to="/apprentice" className="flex-shrink-0">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Apprentice Hub
        </Button>
      </Link>
    </div>
  );
};

export default StudyHeader;
