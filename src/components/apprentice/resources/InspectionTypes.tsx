import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InspectionTypes = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in">
      <div className="text-center py-12 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Coming soon
        </span>
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Content being updated
        </h1>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl mx-auto">
          This resource is currently being redeveloped. Please check back soon for updated content.
        </p>
        <Link to="/apprentice/study/eal/level-2-diploma-in-electrical-installation">
          <Button
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InspectionTypes;
