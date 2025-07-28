
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const JobPagination: React.FC<JobPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  paginate 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mx-auto flex w-full justify-center mt-8">
      <div className="flex flex-row items-center gap-1">
        <Button
          variant="ghost"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1 pl-2.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNum = index + 1;
          
          // Show first page, current page, last page, and one page before and after current
          if (
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "outline" : "ghost"}
                size="icon"
                onClick={() => paginate(pageNum)}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </Button>
            );
          }
          
          // Show ellipsis for gaps
          if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
            return (
              <span
                key={`ellipsis-${pageNum}`}
                aria-hidden
                className="flex h-9 w-9 items-center justify-center"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </span>
            );
          }
          
          return null;
        })}
        
        <Button
          variant="ghost"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1 pr-2.5"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default JobPagination;
