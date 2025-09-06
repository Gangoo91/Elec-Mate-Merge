import { useState, useEffect, useCallback } from 'react';
import { Quote } from '@/types/quote';

const QUOTES_STORAGE_KEY = 'elec-mate-quotes';

export const useQuoteStorage = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);

  // Load quotes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
      if (stored) {
        const quotes = JSON.parse(stored).map((quote: any) => ({
          ...quote,
          createdAt: new Date(quote.createdAt),
          updatedAt: new Date(quote.updatedAt),
          expiryDate: new Date(quote.expiryDate),
        }));
        setSavedQuotes(quotes);
      }
    } catch (error) {
      console.error('Error loading quotes from storage:', error);
    }
  }, []);

  // Save a new quote
  const saveQuote = useCallback((quote: Quote) => {
    try {
      const updatedQuotes = [quote, ...savedQuotes.filter(q => q.id !== quote.id)];
      setSavedQuotes(updatedQuotes);
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updatedQuotes));
      return true;
    } catch (error) {
      console.error('Error saving quote:', error);
      return false;
    }
  }, [savedQuotes]);

  // Delete a quote
  const deleteQuote = useCallback((quoteId: string) => {
    try {
      const updatedQuotes = savedQuotes.filter(q => q.id !== quoteId);
      setSavedQuotes(updatedQuotes);
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updatedQuotes));
      return true;
    } catch (error) {
      console.error('Error deleting quote:', error);
      return false;
    }
  }, [savedQuotes]);

  // Get quote statistics
  const getQuoteStats = useCallback(() => {
    const pending = savedQuotes.filter(q => q.status === 'draft').length;
    const sent = savedQuotes.filter(q => q.status === 'sent').length;
    const approved = savedQuotes.filter(q => q.status === 'approved').length;
    
    // Calculate this month's total
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const monthlyTotal = savedQuotes
      .filter(q => q.createdAt >= thisMonth)
      .reduce((total, quote) => total + (quote.total || 0), 0);

    return {
      pending,
      sent,
      approved,
      monthlyTotal,
      totalQuotes: savedQuotes.length
    };
  }, [savedQuotes]);

  return {
    savedQuotes,
    saveQuote,
    deleteQuote,
    getQuoteStats,
  };
};