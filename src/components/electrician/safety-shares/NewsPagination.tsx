import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const NewsPagination = ({ currentPage, totalPages, paginate }: NewsPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Show ellipsis if current page is far from start
      if (currentPage > 4) {
        pageNumbers.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pageNumbers.includes(i)) {
          pageNumbers.push(i);
        }
      }

      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 3) {
        if (!pageNumbers.includes('...')) {
          pageNumbers.push('...');
        }
      }

      // Always show last page
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
      {/* Mobile-first navigation info */}
      <div className="text-sm text-white/70 order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex items-center gap-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-white/30 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 touch-target min-h-[44px] transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </Button>

        {/* Desktop page numbers - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <div key={`ellipsis-${index}`} className="px-2">
                <MoreHorizontal className="h-4 w-4 text-white/40" />
              </div>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => paginate(page as number)}
                className={`transition-all duration-200 ${
                  currentPage === page
                    ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 shadow-lg"
                    : "border-white/30 text-white hover:bg-white/10 bg-white/5"
                }`}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-white/30 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed bg-white/5 touch-target min-h-[44px] transition-all duration-200"
        >
          <span className="hidden xs:inline">Next</span>
          <span className="xs:hidden">Next</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default NewsPagination;