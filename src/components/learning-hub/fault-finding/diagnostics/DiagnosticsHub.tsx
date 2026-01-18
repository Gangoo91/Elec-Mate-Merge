import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  ChevronRight,
  X,
  Activity,
  Zap,
  Shield,
  Eye,
  Target,
  Clock,
  ThermometerSun
} from 'lucide-react';
import {
  diagnosticScenarios,
  DiagnosticScenario,
  Diagnostic,
  searchDiagnostics,
  getDiagnosticCategories
} from '../data/faultFindingData';

interface DiagnosticsHubProps {
  onSelectDiagnostic: (categoryId: string, diagnosticIndex: number) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'continuity':
      return <Activity className="h-5 w-5" />;
    case 'voltage':
      return <Zap className="h-5 w-5" />;
    case 'rcd':
    case 'protection':
      return <Shield className="h-5 w-5" />;
    case 'insulation':
      return <Shield className="h-5 w-5" />;
    case 'earthing':
      return <Activity className="h-5 w-5" />;
    case 'power-quality':
      return <Eye className="h-5 w-5" />;
    case 'load':
      return <Target className="h-5 w-5" />;
    case 'thermal':
      return <ThermometerSun className="h-5 w-5" />;
    case 'transient':
      return <Clock className="h-5 w-5" />;
    default:
      return <Search className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'continuity':
      return { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    case 'voltage':
      return { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    case 'rcd':
    case 'protection':
      return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
    case 'insulation':
      return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    case 'earthing':
      return { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    case 'power-quality':
      return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' };
    case 'load':
      return { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
    case 'thermal':
      return { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    case 'transient':
      return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' };
    default:
      return { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' };
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const DiagnosticsHub = ({ onSelectDiagnostic }: DiagnosticsHubProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getDiagnosticCategories();

  // Filter diagnostics based on search and category
  const filteredDiagnostics = useMemo(() => {
    if (searchQuery.trim()) {
      return searchDiagnostics(searchQuery);
    }

    if (selectedCategory) {
      const scenario = diagnosticScenarios.find(s => s.id === selectedCategory);
      if (scenario) {
        return scenario.diagnostics.map((d, i) => ({
          ...d,
          categoryId: scenario.id,
          categoryTitle: scenario.title,
          originalIndex: i
        }));
      }
    }

    // Show all diagnostics flattened
    return diagnosticScenarios.flatMap((scenario, scenarioIndex) =>
      scenario.diagnostics.map((d, diagIndex) => ({
        ...d,
        categoryId: scenario.id,
        categoryTitle: scenario.title,
        originalIndex: diagIndex
      }))
    );
  }, [searchQuery, selectedCategory]);

  const handleDiagnosticClick = (diagnostic: any) => {
    const scenario = diagnosticScenarios.find(s => s.id === diagnostic.categoryId);
    if (scenario) {
      const index = scenario.diagnostics.findIndex(d => d.symptom === diagnostic.symptom);
      onSelectDiagnostic(diagnostic.categoryId, index >= 0 ? index : 0);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search symptoms, readings, causes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-11 text-base touch-manipulation"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          size="sm"
          className="h-8 text-xs"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((cat) => {
          const colors = getCategoryColor(cat.id.replace('-analysis', '').replace('-diagnostics', ''));
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              className={`h-8 text-xs ${selectedCategory === cat.id ? '' : colors.border + ' ' + colors.text}`}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            >
              {cat.title.replace(' Analysis', '').replace(' & Current Measurement', '')}
            </Button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-xs text-muted-foreground">
        {filteredDiagnostics.length} diagnostic{filteredDiagnostics.length !== 1 ? 's' : ''} found
      </p>

      {/* Diagnostic Results */}
      <div className="space-y-3">
        {filteredDiagnostics.map((diagnostic, index) => {
          const colors = getCategoryColor(diagnostic.categoryId.replace('-analysis', '').replace('-diagnostics', ''));

          return (
            <Card
              key={`${diagnostic.categoryId}-${index}`}
              className={`${colors.border} border cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all touch-manipulation`}
              onClick={() => handleDiagnosticClick(diagnostic)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Severity Indicator */}
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    diagnostic.severity === 'critical' ? 'bg-red-500' :
                    diagnostic.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground mb-1">
                      {diagnostic.symptom}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {diagnostic.measurement}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className={`text-xs ${colors.border} ${colors.text}`}
                      >
                        {diagnostic.categoryTitle.replace(' Analysis', '')}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs uppercase ${getSeverityColor(diagnostic.severity)}`}
                      >
                        {diagnostic.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {diagnostic.possibleCauses.length} causes
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredDiagnostics.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No diagnostics found matching your search
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try different keywords or clear filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiagnosticsHub;
