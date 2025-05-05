
import { Download, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ResourceDownloads = () => {
  return (
    <Card className="border-red-500/20 bg-elec-gray hover:shadow-md transition-shadow shadow-sm">
      <CardHeader className="pb-3 border-b border-red-500/10">
        <CardTitle className="text-base flex items-center gap-2">
          <Download className="h-4 w-4 text-red-500" />
          Crisis Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-6 space-y-3">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full flex items-center gap-2 text-xs hover:bg-red-500/5"
          onClick={() => {
            toast.success("Crisis plan template downloaded", {
              description: "Document saved to your downloads folder"
            });
          }}
        >
          <Download className="h-3.5 w-3.5" />
          Crisis Plan Template
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full flex items-center gap-2 text-xs hover:bg-red-500/5"
          onClick={() => {
            toast.success("Emergency contacts card downloaded", {
              description: "Document saved to your downloads folder"
            });
          }}
        >
          <Phone className="h-3.5 w-3.5" />
          Emergency Contacts Card
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceDownloads;
