import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import NewsPagination from "@/components/electrician/safety-shares/NewsPagination";

interface NewsArticle {
  title: string;
  url: string;
  snippet: string;
  date: string;
  tag: string;
}

const IndustryNewsCard = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/industry-news');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Could not fetch industry news:", error);
      }
    };

    fetchNews();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <Card className="bg-transparent border-none">
      <CardContent className="p-0">
        {/* News articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentArticles.map((article, index) => (
            <Card key={index} className="bg-elec-card border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                    {article.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.date).toLocaleDateString('en-GB')}
                  </span>
                </div>
                
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-elec-light">
                  {article.title}
                </h3>
                
                <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                  {article.snippet}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full text-xs border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1"
                  >
                    Read More
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination with bg-elec-gray background */}
        <div className="space-y-6 bg-elec-gray">
          <NewsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryNewsCard;
