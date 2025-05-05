
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface OJTHeaderProps {
  handleDownloadReport: () => void;
}

const OJTHeader = ({ handleDownloadReport }: OJTHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Off the Job Training</h1>
        <p className="text-muted-foreground">
          Track, manage and provide evidence for your 20% off-the-job training requirements
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>
    </div>
  );
};

export default OJTHeader;
