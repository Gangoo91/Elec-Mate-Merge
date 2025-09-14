import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { NewsArticle } from "@/hooks/useIndustryNews";

interface NewsManagementProps {
  onArticleCreated: () => void;
}

const NewsManagement = ({ onArticleCreated }: NewsManagementProps) => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    source_name: "",
    regulatory_body: "",
    author: ""
  });

  const categories = [
    "BS7671", "Safety", "Technical", "Industry News", "Training", 
    "Renewable Energy", "Smart Technology", "Apprenticeships", "HSE"
  ];

  const regulatoryBodies = [
    "IET", "HSE", "Industry", "NICEIC", "NAPIT", "ELECSA", "ECA"
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewArticle(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.content || !newArticle.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in title, content and category",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      // Create content hash
      const contentHash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(newArticle.title + newArticle.content)
      );
      const hashHex = Array.from(new Uint8Array(contentHash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const articleData = {
        title: newArticle.title.trim(),
        summary: newArticle.summary.trim() || newArticle.content.substring(0, 300) + '...',
        content: newArticle.content.trim(),
        category: newArticle.category,
        source_name: newArticle.source_name || 'Editorial Team',
        regulatory_body: newArticle.regulatory_body || 'Industry',
        author: newArticle.author || null,
        date_published: new Date().toISOString().split('T')[0],
        content_hash: hashHex,
        is_active: true,
        view_count: 0,
        average_rating: 0,
        quality_score: 95 // Manual articles get high quality score
      };

      const { error } = await supabase
        .from('industry_news')
        .insert([articleData]);

      if (error) throw error;

      toast({
        title: "Article Created",
        description: "Your article has been published successfully",
        duration: 5000
      });

      // Reset form
      setNewArticle({
        title: "",
        summary: "",
        content: "",
        category: "",
        source_name: "",
        regulatory_body: "",
        author: ""
      });

      onArticleCreated();
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: "Creation Failed",
        description: "Failed to create article. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full bg-elec-dark border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create News Article
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title *</label>
            <Input
              placeholder="Enter article title..."
              value={newArticle.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="bg-elec-card border-elec-yellow/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Category *</label>
            <Select value={newArticle.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-elec-card border-elec-yellow/20 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/30">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white hover:bg-elec-yellow/15">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Source</label>
            <Input
              placeholder="Source name..."
              value={newArticle.source_name}
              onChange={(e) => handleInputChange('source_name', e.target.value)}
              className="bg-elec-card border-elec-yellow/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Regulatory Body</label>
            <Select value={newArticle.regulatory_body} onValueChange={(value) => handleInputChange('regulatory_body', value)}>
              <SelectTrigger className="bg-elec-card border-elec-yellow/20 text-white">
                <SelectValue placeholder="Select body" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/30">
                {regulatoryBodies.map((body) => (
                  <SelectItem key={body} value={body} className="text-white hover:bg-elec-yellow/15">
                    {body}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Author</label>
            <Input
              placeholder="Author name..."
              value={newArticle.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className="bg-elec-card border-elec-yellow/20 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Summary</label>
          <Textarea
            placeholder="Brief summary of the article..."
            value={newArticle.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            rows={3}
            className="bg-elec-card border-elec-yellow/20 text-white resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Content *</label>
          <Textarea
            placeholder="Full article content..."
            value={newArticle.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            rows={12}
            className="bg-elec-card border-elec-yellow/20 text-white resize-none"
          />
          <div className="text-xs text-muted-foreground">
            {newArticle.content.length} characters
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/20">
          <div className="flex gap-2">
            {newArticle.category && (
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                {newArticle.category}
              </Badge>
            )}
            {newArticle.regulatory_body && (
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                {newArticle.regulatory_body}
              </Badge>
            )}
          </div>
          
          <Button
            onClick={handleCreateArticle}
            disabled={isCreating || !newArticle.title || !newArticle.content || !newArticle.category}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isCreating ? 'Publishing...' : 'Publish Article'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsManagement;