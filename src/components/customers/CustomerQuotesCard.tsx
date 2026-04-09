import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CustomerQuotesCardProps {
  customerId: string;
  customerName: string;
}

interface QuoteRow {
  id: string;
  quote_number: string;
  title?: string;
  total: number;
  status: string;
  created_at: string;
}

export const CustomerQuotesCard = ({ customerId, customerName }: CustomerQuotesCardProps) => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase
          .from('quotes')
          .select('id, quote_number, total, status, created_at')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setQuotes(data || []);
      } catch (error) {
        console.error('Failed to fetch customer quotes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, [customerId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount || 0);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-500/15 text-emerald-400';
      case 'sent':
      case 'pending':
        return 'bg-blue-500/15 text-blue-400';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="card-surface-interactive rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white">Quotes</h3>
        <button
          onClick={() =>
            navigate('/electrician/quotes/new', {
              state: { prefillCustomer: customerName, customerId },
            })
          }
          className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
        >
          + New
        </button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
          </div>
        ) : quotes.length > 0 ? (
          <div className="space-y-2">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => navigate(`/electrician/quotes?quoteId=${quote.id}`)}
                className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">
                    {quote.quote_number || quote.title || 'Quote'}
                  </p>
                  <p className="text-xs text-white">{formatCurrency(quote.total)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getStatusBadge(quote.status)}`}>
                    {quote.status}
                  </span>
                  <p className="text-[10px] text-white mt-1">
                    {formatDate(quote.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white text-center py-4">
            No quotes linked to this customer yet
          </p>
        )}
      </div>
    </div>
  );
};
