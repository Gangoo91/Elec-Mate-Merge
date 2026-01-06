
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RcdPageHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="accent-outline" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <Shield className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">RCD Requirements Guide</h1>
        </div>
        <p className="text-xl text-white/80 max-w-4xl mx-auto">
          Comprehensive guide to RCD protection requirements, testing procedures, and installation guidelines 
          for compliance with BS7671 regulations.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-green-500 text-foreground font-bold">Essential Safety</Badge>
          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
            BS7671 Compliant
          </Badge>
        </div>
      </div>
    </>
  );
};

export default RcdPageHeader;
