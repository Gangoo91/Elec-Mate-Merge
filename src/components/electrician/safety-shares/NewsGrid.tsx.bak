import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/hooks/useIndustryNews";
import { motion } from "framer-motion";

interface NewsGridProps {
  articles: NewsArticle[];
  excludeId?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

const NewsGrid = ({ articles, excludeId }: NewsGridProps) => {
  const filteredArticles = excludeId
    ? articles.filter(article => article.id !== excludeId)
    : articles;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Regulation": "bg-rose-500/80 text-white",
      "Safety": "bg-amber-500/80 text-white",
      "Technology": "bg-sky-500/80 text-white",
      "Industry": "bg-emerald-500/80 text-white",
      "Standards": "bg-violet-500/80 text-white",
      "News": "bg-cyan-500/80 text-white",
      "Training": "bg-yellow-500/80 text-black",
      "Technical": "bg-indigo-500/80 text-white",
      "BS7671": "bg-purple-500/80 text-white",
    };
    return colors[category] || "bg-white/20 text-white";
  };

  const getCategoryImage = (category: string) => {
    const images: Record<string, string> = {
      "Regulation": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop&auto=format&q=80",
      "Safety": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop&auto=format&q=80",
      "Technology": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&auto=format&q=80",
      "Industry": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format&q=80",
      "Standards": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format&q=80",
      "News": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&auto=format&q=80",
      "Training": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format&q=80",
      "Technical": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format&q=80",
      "BS7671": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format&q=80",
    };
    return images[category] || images["Industry"];
  };

  const getReadTime = (content: string) => {
    const words = content?.split(' ').length || 0;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-white/40">No articles to display</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {filteredArticles.map((article) => (
        <motion.article
          key={article.id}
          variants={itemVariants}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
          className="group cursor-pointer"
        >
          <div className="relative h-[220px] sm:h-[240px] rounded-xl overflow-hidden">
            {/* Image */}
            <img
              src={article.image_url || getCategoryImage(article.category)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = getCategoryImage(article.category);
              }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col">
              {/* Top: Category */}
              <div className="flex items-start justify-between">
                <Badge className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getCategoryColor(article.category))}>
                  {article.category}
                </Badge>
                <span className="text-[10px] text-white/50 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
                  {getReadTime(article.content)} min
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom: Title + Meta */}
              <div className="space-y-2">
                <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-elec-yellow transition-colors">
                  {article.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span>{format(new Date(article.date_published), 'MMM d')}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-2.5 w-2.5" />
                      {article.view_count || 0}
                    </span>
                  </div>

                  <span className="text-elec-yellow text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Read <ExternalLink className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Hover border */}
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-elec-yellow/20 transition-colors pointer-events-none" />
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
};

export default NewsGrid;
