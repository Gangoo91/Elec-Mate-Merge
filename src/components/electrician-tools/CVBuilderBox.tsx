
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CVBuilderBox = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          CV Builder
        </CardTitle>
        <CardDescription className="text-muted-foreground/70">
          Create professional electrical CVs tailored to job applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm flex-1">
            Create a professional CV tailored to electrical job applications with our AI-powered tool. Stand out from the competition with industry-specific templates and automated content suggestions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 justify-start">
              <FileText className="h-4 w-4 mr-2" /> Create New CV
            </Button>
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 justify-start">
              <FileText className="h-4 w-4 mr-2" /> Import Existing CV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVBuilderBox;
