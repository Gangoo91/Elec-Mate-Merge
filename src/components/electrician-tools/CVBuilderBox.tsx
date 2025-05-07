
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CVBuilderBox = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          CV Builder
        </CardTitle>
        <CardDescription className="text-muted-foreground/70">
          Create professional electrical CVs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">
            Create a professional CV tailored to electrical job applications with our AI-powered tool.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full justify-start">
              <FileText className="h-4 w-4 mr-2" /> Create New CV
            </Button>
            <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full justify-start">
              <FileText className="h-4 w-4 mr-2" /> Import Existing CV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVBuilderBox;
