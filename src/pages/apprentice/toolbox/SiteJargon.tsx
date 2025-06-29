
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Users, Lightbulb, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { siteJargonTerms, siteJargonCategories } from "@/data/apprentice/siteJargonData";
import JargonSearchAndFilter from "@/components/apprentice/site-jargon/JargonSearchAndFilter";
import JargonTermCard from "@/components/apprentice/site-jargon/JargonTermCard";
import LearningFeatures from "@/components/apprentice/site-jargon/LearningFeatures";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("browse");

  // Get all available tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    siteJargonTerms.forEach(term => {
      term.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter terms based on search and filters
  const filteredTerms = useMemo(() => {
    return siteJargonTerms.filter(term => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(search);
        const matchesDefinition = term.definition.toLowerCase().includes(search);
        const matchesUsage = term.commonUsage?.toLowerCase().includes(search);
        const matchesRelated = term.relatedTerms?.some(related => 
          related.toLowerCase().includes(search)
        );
        
        if (!matchesTerm && !matchesDefinition && !matchesUsage && !matchesRelated) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && term.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "all" && term.difficulty !== selectedDifficulty) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const termTags = term.tags || [];
        if (!selectedTags.some(tag => termTags.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedTags]);

  // Group filtered terms by category
  const termsByCategory = useMemo(() => {
    const grouped: { [key: string]: typeof filteredTerms } = {};
    
    siteJargonCategories.forEach(category => {
      grouped[category.id] = filteredTerms.filter(term => term.category === category.id);
    });
    
    return grouped;
  }, [filteredTerms]);

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'MessageCircle': MessageCircle,
      'BookOpen': BookOpen,
      'Users': Users,
      'Lightbulb': Lightbulb
    };
    return icons[iconName] || MessageCircle;
  };

  const categoryStats = useMemo(() => {
    return siteJargonCategories.map(category => ({
      ...category,
      count: filteredTerms.filter(term => term.category === category.id).length,
      totalCount: siteJargonTerms.filter(term => term.category === category.id).length
    }));
  }, [filteredTerms]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Site Jargon & Terminology</h1>
          <p className="text-muted-foreground max-w-2xl">
            Master the language of the electrical trade with our comprehensive terminology database. 
            From basic electrical terms to complex industry jargon, learn what every electrician needs to know.
          </p>
        </div>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guidance Area
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{siteJargonTerms.length}</div>
            <div className="text-sm text-muted-foreground">Total Terms</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {siteJargonTerms.filter(t => t.difficulty === 'basic').length}
            </div>
            <div className="text-sm text-muted-foreground">Basic Level</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {siteJargonTerms.filter(t => t.difficulty === 'intermediate').length}
            </div>
            <div className="text-sm text-muted-foreground">Intermediate</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {siteJargonTerms.filter(t => t.difficulty === 'advanced').length}
            </div>
            <div className="text-sm text-muted-foreground">Advanced</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Terms</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="study">Study Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6 mt-6">
          {/* Search and Filter */}
          <JargonSearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            totalTerms={siteJargonTerms.length}
            filteredCount={filteredTerms.length}
          />

          {/* Terms Grid */}
          {filteredTerms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {filteredTerms.map((term, index) => (
                <JargonTermCard key={index} term={term} />
              ))}
            </div>
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No terms found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6 mt-6">
          <div className="grid gap-6">
            {categoryStats.map((category) => {
              const IconComponent = getIconComponent(category.icon);
              const categoryTerms = termsByCategory[category.id] || [];
              
              return (
                <Card key={category.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-elec-yellow/10">
                          <IconComponent className="h-6 w-6 text-elec-yellow" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {category.count} terms
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  {categoryTerms.length > 0 && (
                    <CardContent>
                      <div className="grid gap-3">
                        {categoryTerms.slice(0, 5).map((term, index) => (
                          <div key={index} className="flex items-start justify-between p-3 border border-elec-yellow/10 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-elec-yellow text-sm">{term.term}</h4>
                              <p className="text-xs text-elec-light/80 mt-1 line-clamp-2">
                                {term.definition}
                              </p>
                            </div>
                            {term.difficulty && (
                              <Badge 
                                variant="outline" 
                                className="ml-2 text-xs"
                              >
                                {term.difficulty}
                              </Badge>
                            )}
                          </div>
                        ))}
                        
                        {categoryTerms.length > 5 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setActiveTab("browse");
                            }}
                            className="mt-2"
                          >
                            View all {categoryTerms.length} terms
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="study" className="space-y-6 mt-6">
          <LearningFeatures terms={filteredTerms} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteJargon;
