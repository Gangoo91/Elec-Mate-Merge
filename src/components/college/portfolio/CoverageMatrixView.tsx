import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Brain,
  Wrench,
  Heart,
  ChevronRight,
  Target
} from 'lucide-react';
import { CoverageMatrixEntry, KSBMapping } from '@/hooks/college/useCollegePortfolios';

interface CoverageMatrixViewProps {
  coverageMatrix: CoverageMatrixEntry[];
  ksbMappings?: KSBMapping[];
  onCategoryClick?: (categoryId: string) => void;
  studentName?: string;
  qualificationTitle?: string;
}

const CoverageMatrixView: React.FC<CoverageMatrixViewProps> = ({
  coverageMatrix,
  ksbMappings = [],
  onCategoryClick,
  studentName,
  qualificationTitle
}) => {
  const [activeTab, setActiveTab] = useState('categories');

  // Group KSBs by type
  const knowledgeKSBs = ksbMappings.filter(k => k.ksbType === 'knowledge');
  const skillKSBs = ksbMappings.filter(k => k.ksbType === 'skill');
  const behaviourKSBs = ksbMappings.filter(k => k.ksbType === 'behaviour');

  // Calculate stats
  const totalCategories = coverageMatrix.length;
  const completedCategories = coverageMatrix.filter(c => c.status === 'complete').length;
  const inProgressCategories = coverageMatrix.filter(c => c.status === 'in_progress').length;
  const notStartedCategories = coverageMatrix.filter(c => c.status === 'not_started').length;

  const totalKSBs = ksbMappings.length;
  const verifiedKSBs = ksbMappings.filter(k => k.mappingStatus === 'verified').length;
  const partialKSBs = ksbMappings.filter(k => k.mappingStatus === 'partial').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Complete</Badge>;
      case 'in_progress':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-400">Not Started</Badge>;
    }
  };

  const getKSBIcon = (type: string) => {
    switch (type) {
      case 'knowledge':
        return <Brain className="h-4 w-4 text-blue-400" />;
      case 'skill':
        return <Wrench className="h-4 w-4 text-green-400" />;
      case 'behaviour':
        return <Heart className="h-4 w-4 text-pink-400" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const KSBSection = ({ title, items, icon }: { title: string; items: KSBMapping[]; icon: React.ReactNode }) => {
    const verified = items.filter(k => k.mappingStatus === 'verified').length;
    const progress = items.length > 0 ? Math.round((verified / items.length) * 100) : 0;

    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <Badge variant="outline">{verified}/{items.length}</Badge>
          </div>
          <Progress value={progress} className="h-1.5 mt-2" />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.map(ksb => (
              <div
                key={ksb.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-sm"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {ksb.ksbCode}
                  </Badge>
                  <span className="truncate text-white/80">{ksb.ksbTitle}</span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {ksb.mappingStatus === 'verified' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : ksb.mappingStatus === 'partial' ? (
                    <Clock className="h-4 w-4 text-amber-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-white/50 py-4 text-sm">No {title.toLowerCase()} mapped yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {(studentName || qualificationTitle) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            {studentName && <h3 className="text-lg font-semibold">{studentName}</h3>}
            {qualificationTitle && <p className="text-sm text-white/70">{qualificationTitle}</p>}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Categories</p>
                <p className="text-xl font-bold">{completedCategories}/{totalCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">KSBs Verified</p>
                <p className="text-xl font-bold">{verifiedKSBs}/{totalKSBs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">In Progress</p>
                <p className="text-xl font-bold">{inProgressCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-500/10">
                <AlertCircle className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-white/60">Not Started</p>
                <p className="text-xl font-bold">{notStartedCategories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-elec-gray/40">
          <TabsTrigger value="categories">Unit Coverage</TabsTrigger>
          <TabsTrigger value="ksbs">KSB Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-4">
          <Card className="bg-white/5 border-elec-gray/40">
            <CardHeader>
              <CardTitle className="text-base">Qualification Unit Coverage</CardTitle>
              <CardDescription>
                Track evidence coverage across all qualification units
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-elec-gray/40">
                      <TableHead className="text-white/70">Category</TableHead>
                      <TableHead className="text-white/70 text-center">Evidence</TableHead>
                      <TableHead className="text-white/70 text-center">Verified</TableHead>
                      <TableHead className="text-white/70">Progress</TableHead>
                      <TableHead className="text-white/70 text-center">Status</TableHead>
                      <TableHead className="text-white/70 w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coverageMatrix.map(entry => (
                      <TableRow
                        key={entry.id}
                        className="border-elec-gray/40 hover:bg-white/5 cursor-pointer"
                        onClick={() => onCategoryClick?.(entry.categoryId)}
                      >
                        <TableCell className="font-medium">{entry.categoryName}</TableCell>
                        <TableCell className="text-center">
                          {entry.completedEntries}/{entry.requiredEntries}
                        </TableCell>
                        <TableCell className="text-center">
                          {entry.verifiedCriteria}/{entry.totalCriteria}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={entry.completionPercentage} className="h-2 w-20" />
                            <span className="text-xs text-white/60">{entry.completionPercentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {getStatusBadge(entry.status)}
                        </TableCell>
                        <TableCell>
                          {onCategoryClick && (
                            <ChevronRight className="h-4 w-4 text-white/40" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {coverageMatrix.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-white/50 py-8">
                          No coverage data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ksbs" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KSBSection
              title="Knowledge"
              items={knowledgeKSBs}
              icon={<Brain className="h-5 w-5 text-blue-400" />}
            />
            <KSBSection
              title="Skills"
              items={skillKSBs}
              icon={<Wrench className="h-5 w-5 text-green-400" />}
            />
            <KSBSection
              title="Behaviours"
              items={behaviourKSBs}
              icon={<Heart className="h-5 w-5 text-pink-400" />}
            />
          </div>

          {ksbMappings.length === 0 && (
            <Card className="bg-white/5 border-elec-gray/40 mt-4">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">No KSB mappings available yet</p>
                <p className="text-sm text-white/30 mt-1">
                  KSBs will appear here once evidence is mapped to apprenticeship standards
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoverageMatrixView;
