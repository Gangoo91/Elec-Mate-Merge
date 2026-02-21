import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Calendar, Loader2, ExternalLink } from 'lucide-react';
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
          .select('id, quote_number, title, total, status, created_at')
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'sent':
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-400" />
            Quotes
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              navigate('/electrician/quotes/new', {
                state: { prefillCustomer: customerName, customerId },
              })
            }
            className="h-8 text-xs touch-manipulation text-elec-yellow"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : quotes.length > 0 ? (
          <div className="space-y-2">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => navigate(`/electrician/quotes?quoteId=${quote.id}`)}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border hover:border-emerald-500/30 active:bg-emerald-500/10 cursor-pointer transition-all touch-manipulation"
              >
                <FileText className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {quote.quote_number || quote.title || 'Quote'}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(quote.total)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge variant={getStatusVariant(quote.status)} className="text-[10px]">
                    {quote.status}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(quote.created_at)}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            No quotes linked to this customer yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};
