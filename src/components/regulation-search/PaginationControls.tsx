import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-card/50 border border-border rounded-lg p-3 sm:p-4 gap-3 sm:gap-0">
      <div className="text-xs sm:text-sm text-gray-400 order-2 sm:order-1">
        Showing {startItem}-{endItem} of {totalResults} regulations
      </div>
      
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-border text-gray-300 hover:bg-neutral-600 disabled:opacity-50 text-xs sm:text-sm"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        
        <div className="hidden sm:flex gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={
                  currentPage === pageNum
                    ? "bg-elec-yellow text-black hover:bg-elec-yellow/90 text-xs sm:text-sm"
                    : "border-border text-gray-300 hover:bg-neutral-600 text-xs sm:text-sm"
                }
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        
        {/* Mobile: Just show current page info */}
        <div className="sm:hidden flex items-center gap-2 text-xs text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-border text-gray-300 hover:bg-neutral-600 disabled:opacity-50 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;