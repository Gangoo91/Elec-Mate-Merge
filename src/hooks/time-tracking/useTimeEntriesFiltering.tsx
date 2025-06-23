
import { useState, useMemo } from "react";
import { TimeEntry } from "@/types/time-tracking";

export const useTimeEntriesFiltering = (entries: TimeEntry[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Get unique activities for filter dropdown
  const availableActivities = useMemo(() => {
    const activities = entries.map(entry => entry.activity);
    return [...new Set(activities)].sort();
  }, [entries]);

  // Filter entries based on all criteria
  const filteredEntries = useMemo(() => {
    let filtered = [...entries];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.activity.toLowerCase().includes(query) ||
        entry.notes.toLowerCase().includes(query)
      );
    }

    // Activity filter
    if (activityFilter !== "all") {
      filtered = filtered.filter(entry => entry.activity === activityFilter);
    }

    // Date range filter
    if (dateRangeFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.date);
        
        switch (dateRangeFilter) {
          case "today":
            return entryDate >= today;
          case "week":
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return entryDate >= weekStart;
          case "month":
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            return entryDate >= monthStart;
          case "quarter":
            const quarterStart = new Date(today);
            quarterStart.setMonth(today.getMonth() - 3);
            return entryDate >= quarterStart;
          default:
            return true;
        }
      });
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(entry => {
        switch (typeFilter) {
          case "manual":
            return !entry.isAutomatic && !entry.isQuiz && !entry.notes?.includes("activity verification");
          case "automatic":
            return entry.isAutomatic;
          case "quiz":
            return entry.isQuiz;
          case "verified":
            return entry.notes?.includes("activity verification");
          default:
            return true;
        }
      });
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, searchQuery, activityFilter, dateRangeFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEntries.slice(startIndex, endIndex);
  }, [filteredEntries, currentPage, itemsPerPage]);

  // Reset page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    switch (filterType) {
      case "search":
        setSearchQuery(value);
        break;
      case "activity":
        setActivityFilter(value);
        break;
      case "dateRange":
        setDateRangeFilter(value);
        break;
      case "type":
        setTypeFilter(value);
        break;
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActivityFilter("all");
    setDateRangeFilter("all");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || 
                          activityFilter !== "all" || 
                          dateRangeFilter !== "all" || 
                          typeFilter !== "all";

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return {
    // Filtered and paginated data
    paginatedEntries,
    filteredEntries,
    availableActivities,
    
    // Filter states
    searchQuery,
    activityFilter,
    dateRangeFilter,
    typeFilter,
    hasActiveFilters,
    
    // Pagination states
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems: filteredEntries.length,
    
    // Actions
    handleFilterChange,
    clearFilters,
    handlePageChange,
    handleItemsPerPageChange
  };
};
