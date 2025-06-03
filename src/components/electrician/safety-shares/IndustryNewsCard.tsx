
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface IndustryNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  regulatory_body: string;
  category: string;
  date_published: string;
}

const IndustryNewsCard = () => {
  const [news, setNews] = useState<IndustryNews[]>([]);
  const [selectedNews, setSelectedNews] = useState<IndustryNews | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_news')
        .select('*')
        .eq('is_active', true)
        .order('date_published', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching industry news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRegulatoryBodyColor = (body: string) => {
    switch (body.toUpperCase()) {
      case 'IET': return 'bg-blue-500';
      case 'HSE': return 'bg-red-500';
      case 'NICEIC': return 'bg-green-500';
      case 'NAPIT': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-400" />
            Industry News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-elec-gray-light/20 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-blue-400" />
          Industry News
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-elec-gray-light/10 rounded-lg border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white">{item.title}</h3>
                <Badge className={`${getRegulatoryBodyColor(item.regulatory_body)} text-white`}>
                  {item.regulatory_body}
                </Badge>
              </div>
              <p className="text-sm text-gray-300 mb-2">{item.summary}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                  {item.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(item.date_published).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedNews && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{selectedNews.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNews(null)}
                  >
                    Close
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getRegulatoryBodyColor(selectedNews.regulatory_body)} text-white`}>
                    {selectedNews.regulatory_body}
                  </Badge>
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded text-sm">
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {new Date(selectedNews.date_published).toLocaleDateString()}
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedNews.content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IndustryNewsCard;
