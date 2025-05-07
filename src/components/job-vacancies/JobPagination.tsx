
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNum = index + 1;
          
          // Show first page, current page, last page, and one page before and after current
          if (
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  isActive={currentPage === pageNum}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          }
          
          // Show ellipsis for gaps
          if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
            return (
              <PaginationItem key={`ellipsis-${pageNum}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          
          return null;
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default JobPagination;
