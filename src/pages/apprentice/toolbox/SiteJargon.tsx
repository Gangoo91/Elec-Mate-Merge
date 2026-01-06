
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, Users, Lightbulb, Search, Layers, GraduationCap } from "lucide-react";
import { siteJargonTerms, siteJargonCategories } from "@/data/apprentice/siteJargonData";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import JargonSearchAndFilter from "@/components/apprentice/site-jargon/JargonSearchAndFilter";
import JargonTermCard from "@/components/apprentice/site-jargon/JargonTermCard";
import LearningFeatures from "@/components/apprentice/site-jargon/LearningFeatures";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const SiteJargon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("browse");
  const isMobile = useIsMobile();

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

  const renderBrowseContent = () => (
    <div className="space-y-6">
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
        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="text-center py-12">
            <MessageCircle className="h-12 w-12 text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No terms found</h3>
            <p className="text-white/70">
              Try adjusting your search or filter criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderCategoriesContent = () => (
    <div className="grid gap-6">
      {categoryStats.map((category) => {
        const IconComponent = getIconComponent(category.icon);
        const categoryTerms = termsByCategory[category.id] || [];

        return (
          <Card key={category.id} className="border-elec-yellow/20 bg-white/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                    <p className="text-sm text-white/70 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-white/80 border-white/20">
                  {category.count} terms
                </Badge>
              </div>
            </CardHeader>

            {categoryTerms.length > 0 && (
              <CardContent>
                <div className="grid gap-3">
                  {categoryTerms.slice(0, 5).map((term, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-white/5 border border-white/10 rounded-lg hover:border-elec-yellow/30 transition-all">
                      <div className="flex-1">
                        <h4 className="font-semibold text-elec-yellow text-sm">{term.term}</h4>
                        <p className="text-xs text-white/70 mt-1 line-clamp-2">
                          {term.definition}
                        </p>
                      </div>
                      {term.difficulty && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-xs text-white/70 border-white/20"
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
                      className="mt-2 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
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
  );

  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="browse" className="w-full">
      <MobileAccordionItem value="browse">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Browse Terms
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderBrowseContent()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="categories">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            By Category
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderCategoriesContent()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="study">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Study Mode
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <LearningFeatures terms={filteredTerms} />
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Site Jargon & Terminology
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Master the language of the electrical trade with our comprehensive terminology database.
          From basic electrical terms to complex industry jargon, learn what every electrician needs to know.
        </p>
        <SmartBackButton />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-orange-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{siteJargonTerms.length}</div>
            <div className="text-sm text-white/70">Total Terms</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {siteJargonTerms.filter(t => t.difficulty === 'basic').length}
            </div>
            <div className="text-sm text-white/70">Basic Level</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-amber-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {siteJargonTerms.filter(t => t.difficulty === 'intermediate').length}
            </div>
            <div className="text-sm text-white/70">Intermediate</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-rose-500/5">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {siteJargonTerms.filter(t => t.difficulty === 'advanced').length}
            </div>
            <div className="text-sm text-white/70">Advanced</div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="browse" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Search className="h-4 w-4" />
              Browse Terms
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Layers className="h-4 w-4" />
              By Category
            </TabsTrigger>
            <TabsTrigger value="study" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <GraduationCap className="h-4 w-4" />
              Study Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {renderBrowseContent()}
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            {renderCategoriesContent()}
          </TabsContent>

          <TabsContent value="study" className="mt-6">
            <LearningFeatures terms={filteredTerms} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default SiteJargon;
