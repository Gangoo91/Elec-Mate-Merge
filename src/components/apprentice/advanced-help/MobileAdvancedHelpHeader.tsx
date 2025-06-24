
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const MobileAdvancedHelpHeader = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-xl font-bold tracking-tight">Advanced Help</h1>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        AI-powered assistance and cutting-edge training tools
      </p>
    </div>
  );
};

export default MobileAdvancedHelpHeader;
