
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, ClipboardList, FileSpreadsheet } from "lucide-react";

export const ProjectTools = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Project Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Time Tracker</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Log time spent on different aspects of your electrical projects.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Material Lists</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create and manage materials lists for your electrical projects.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/90 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-base">Certificate Generator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate electrical certificates for your completed projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
