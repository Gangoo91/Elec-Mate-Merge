
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Download, ExternalLink, FileText, Video } from "lucide-react";

const TestingResources = () => {
  return (
    <div className="border border-blue-500/30 rounded-md overflow-hidden">
      <div className="bg-blue-950/30 p-4 border-b border-blue-500/30">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          <span>Additional Testing Resources</span>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="p-3 border border-gray-700/50 rounded-md bg-gray-800/30">
          <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Reference Documents</span>
          </h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>BS 7671:2018+A2:2022 Amendment 2</span>
              </Link>
            </li>
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>IET Guidance Note 3: Inspection & Testing</span>
              </Link>
            </li>
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Certificate Templates & Examples</span>
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Button size="sm" variant="outline" className="w-full border-blue-500/30 hover:bg-blue-900/20">
              <Download className="h-4 w-4 mr-2" />
              <span>Download Resources Pack</span>
            </Button>
          </div>
        </div>
        
        <div className="p-3 border border-gray-700/50 rounded-md bg-gray-800/30">
          <h4 className="text-blue-300 font-medium mb-2 flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Video Tutorials</span>
          </h4>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>R1+R2 Testing Demonstration</span>
              </Link>
            </li>
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Insulation Resistance Testing in Practice</span>
              </Link>
            </li>
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Earth Fault Loop Impedance Testing Guide</span>
              </Link>
            </li>
            <li>
              <Link to="/apprentice/study/inspection-testing" className="text-blue-100/80 hover:text-blue-200 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Polarity Testing Walkthrough</span>
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Link to="/apprentice/study/inspection-testing">
              <Button size="sm" variant="outline" className="w-full border-blue-500/30 hover:bg-blue-900/20">
                <span>View All Video Resources</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-950/30 p-4 border-t border-blue-500/30 text-center">
        <p className="text-sm text-blue-200">
          Find more resources in the <Link to="/apprentice/study/inspection-testing" className="underline hover:text-blue-300">Inspection & Testing</Link> section of your study guide.
        </p>
      </div>
    </div>
  );
};

export default TestingResources;
