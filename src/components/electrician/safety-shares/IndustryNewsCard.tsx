import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import NewsPagination from "@/components/electrician/safety-shares/NewsPagination";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  source: string;
}

interface IndustryNewsCardProps {
  newsData: NewsItem[];
  itemsPerPage?: number;
}

const IndustryNewsCard: React.FC<IndustryNewsCardProps> = ({ newsData, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the news items for the current page
  const currentNews = newsData.slice(startIndex, endIndex);

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Newspaper className="mr-2 h-5 w-5 text-elec-yellow" />
          Industry News
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <div className="divide-y divide-elec-yellow/30">
          {currentNews.map((news) => (
            <div key={news.id} className="py-4">
              <CardTitle className="text-lg font-semibold">{news.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{news.content}</CardDescription>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-elec-yellow">{news.source}</span>
                <span className="text-xs text-muted-foreground">{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      {totalPages > 1 && (
        <div className="w-full bg-elec-gray border-elec-yellow/20">
          <NewsPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
          />
        </div>
      )}
    </Card>
  );
};

export default IndustryNewsCard;
