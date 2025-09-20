import { useState, useMemo } from 'react';

interface UsePaginationProps {
  items: any[];
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePagination<T>({
  items,
  itemsPerPage = 12,
  initialPage = 1
}: UsePaginationProps): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);

  const totalPages = Math.ceil(items.length / currentItemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * currentItemsPerPage;
    const endIndex = startIndex + currentItemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, currentItemsPerPage]);

  const startIndex = (currentPage - 1) * currentItemsPerPage + 1;
  const endIndex = Math.min(currentPage * currentItemsPerPage, items.length);

  const handleSetCurrentPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results when changing pages
      const resultsSection = document.querySelector('[data-pagination-target]');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSetItemsPerPage = (count: number) => {
    setCurrentItemsPerPage(count);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const nextPage = () => {
    handleSetCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    handleSetCurrentPage(currentPage - 1);
  };

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentItems,
    currentPage,
    totalPages,
    itemsPerPage: currentItemsPerPage,
    totalItems: items.length,
    startIndex,
    endIndex,
    setCurrentPage: handleSetCurrentPage,
    setItemsPerPage: handleSetItemsPerPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage
  };
}