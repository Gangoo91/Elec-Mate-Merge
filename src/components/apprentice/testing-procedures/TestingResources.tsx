
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink, FileText, FileVideo } from "lucide-react";
import { useState } from "react";

const TestingResources = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Additional Testing Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              Official Documentation
            </h3>
            <ul className="text-sm space-y-3">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <ExternalLink className="h-4 w-4" />
                  <span>BS 7671:2018 Amendment 2:2022 (18th Edition)</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <ExternalLink className="h-4 w-4" />
                  <span>IET Guidance Note 3: Inspection & Testing</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <ExternalLink className="h-4 w-4" />
                  <span>IET On-Site Guide</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <ExternalLink className="h-4 w-4" />
                  <span>Electrician's Guide to the Building Regulations</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Download className="h-5 w-5 text-elec-yellow" />
              Downloadable Forms
            </h3>
            <ul className="text-sm space-y-3">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <Download className="h-4 w-4" />
                  <span>Electrical Installation Certificate Template</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <Download className="h-4 w-4" />
                  <span>Schedule of Test Results Sheet</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <Download className="h-4 w-4" />
                  <span>Test Equipment Calibration Log</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <Download className="h-4 w-4" />
                  <span>Testing Procedure Checklists</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <FileVideo className="h-5 w-5 text-elec-yellow" />
              Video Tutorials
            </h3>
            <ul className="text-sm space-y-3">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <FileVideo className="h-4 w-4" />
                  <span>Continuity Testing Demonstrations</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <FileVideo className="h-4 w-4" />
                  <span>Insulation Resistance Testing Guide</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <FileVideo className="h-4 w-4" />
                  <span>RCD Testing Tutorial</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1.5 hover:text-elec-yellow">
                  <FileVideo className="h-4 w-4" />
                  <span>Earth Fault Loop Impedance Testing</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-950/20 border border-blue-500/30 rounded-md p-4">
            <h3 className="font-medium mb-2 text-blue-300">Upcoming Testing Regulation Updates</h3>
            <p className="text-sm text-blue-100/90">
              The 2022 Amendment to the 18th Edition of BS 7671 introduced changes to residual current device testing requirements and Appendix 6. 
              Stay informed about forthcoming updates to ensure your testing procedures remain compliant.
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-blue-400">
              Learn more
            </Button>
          </div>
          
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-md p-4">
            <h3 className="font-medium mb-2 text-elec-yellow">Test Equipment Calibration</h3>
            <p className="text-sm text-gray-300">
              All test equipment used for verification and certification must be regularly calibrated.
              Most manufacturers recommend annual calibration to maintain accuracy and validity of test results.
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-elec-yellow">
              View calibration guide
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingResources;
