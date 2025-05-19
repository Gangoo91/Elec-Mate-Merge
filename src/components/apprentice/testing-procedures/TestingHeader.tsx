
import { ArrowLeft, TestTube, BookOpen, Download, BookmarkCheck } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TestingHeader = () => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-elec-yellow/20 p-2 rounded-md">
            <TestTube className="h-6 w-6 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Testing Procedures</h1>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Link to="/apprentice/study/inspection-testing">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BookmarkCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Inspection & Testing</span>
              <span className="inline sm:hidden">I&T Guide</span>
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">PDF Guide</span>
          </Button>
          <BackButton customUrl="/apprentice/on-job-tools" label="Back" />
        </div>
      </div>
      <p className="text-muted-foreground text-sm max-w-3xl">
        Follow these step-by-step guides for essential electrical testing procedures required for installation 
        and verification. The interactive wizards will help you complete accurate tests every time.
      </p>
      <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full"></div>
    </div>
  );
};

export default TestingHeader;
