
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  datePublished: string;
  readTime: string;
  views: number;
  comments: number;
  imageUrl?: string;
}

const IndustryNewsCard = () => {
  const [articles] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "New BS 7671:2024 Amendment Released",
      summary: "The latest amendment to the wiring regulations includes important updates for EV charging installations and smart home technology.",
      content: "The Institution of Engineering and Technology (IET) has released Amendment 1 to BS 7671:2024...",
      category: "Regulations",
      source: "IET Wiring Matters",
      datePublished: "2024-06-14",
      readTime: "5 min",
      views: 1247,
      comments: 23
    },
    {
      id: "2", 
      title: "Government Announces £2.5B Investment in Grid Infrastructure",
      summary: "Major investment package to modernise the UK's electrical grid infrastructure and support renewable energy transition.",
      content: "The government has announced a comprehensive investment programme...",
      category: "Government Policy",
      source: "GOV.UK",
      datePublished: "2024-06-13",
      readTime: "7 min",
      views: 892,
      comments: 34
    },
    {
      id: "3",
      title: "NICEIC Updates Inspection Procedures",
      summary: "New guidance on electrical installation inspections following industry feedback and safety concerns.",
      content: "NICEIC has published updated procedures for electrical installation inspections...",
      category: "Industry Updates",
      source: "NICEIC",
      datePublished: "2024-06-12",
      readTime: "4 min",
      views: 567,
      comments: 12
    },
    {
      id: "4",
      title: "Skills Shortage Crisis: Industry Response",
      summary: "Electrical industry leaders discuss strategies to address the growing skills shortage and attract new talent.",
      content: "Industry representatives met this week to discuss the ongoing skills shortage...",
      category: "Industry Analysis",
      source: "Electrical Review",
      datePublished: "2024-06-11",
      readTime: "6 min",
      views: 723,
      comments: 18
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "regulations": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "government policy": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "industry updates": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "industry analysis": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Industry News</h2>
          <p className="text-muted-foreground">Latest regulatory updates and industry developments</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Newspaper className="h-4 w-4 mr-2" />
          Subscribe to News
        </Button>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">by {article.source}</span>
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {article.summary}
                  </p>
                </div>
                <Button size="sm" variant="ghost" className="ml-4">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.datePublished).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{article.readTime} read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.comments}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default IndustryNewsCard;
