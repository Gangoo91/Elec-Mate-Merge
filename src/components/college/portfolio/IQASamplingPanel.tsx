import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  ClipboardCheck,
  FileCheck,
  Loader2,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useIQASampling, SamplingCandidate, SamplingRecord } from '@/hooks/college/useIQASampling';

interface IQASamplingPanelProps {
  onViewSubmission?: (submissionId: string) => void;
}

const IQASamplingPanel: React.FC<IQASamplingPanelProps> = ({ onViewSubmission }) => {
  const {
    candidates,
    samplingRecords,
    stats,
    isLoading,
    sampleSubmission,
    completeVerification,
    refetchCandidates,
    refetchRecords
  } = useIQASampling();

  const [activeTab, setActiveTab] = useState('candidates');
  const [selectedRecord, setSelectedRecord] = useState<SamplingRecord | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string>('');
  const [iqaNotes, setIqaNotes] = useState('');
  const [feedbackQuality, setFeedbackQuality] = useState<string>('');
  const [gradingAccuracy, setGradingAccuracy] = useState<string>('');
  const [actionRequired, setActionRequired] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSample = async (submissionId: string) => {
    await sampleSubmission.mutateAsync(submissionId);
  };

  const handleVerification = async () => {
    if (!selectedRecord || !verificationStatus) return;
    setIsSubmitting(true);
    try {
      await completeVerification.mutateAsync({
        recordId: selectedRecord.id,
        verificationStatus: verificationStatus as 'verified' | 'concerns_raised',
        notes: iqaNotes,
        feedbackQuality,
        gradingAccuracy,
        actionRequired
      });
      setSelectedRecord(null);
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setVerificationStatus('');
    setIqaNotes('');
    setFeedbackQuality('');
    setGradingAccuracy('');
    setActionRequired('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>;
      case 'concerns_raised':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Concerns Raised</Badge>;
      default:
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Pending</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-xs text-white/60">To Sample</p>
                <p className="text-xl font-bold">{stats.pendingCandidates}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xs text-white/60">Pending Review</p>
                <p className="text-xl font-bold">{stats.pendingVerification}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-xs text-white/60">Verified</p>
                <p className="text-xl font-bold">{stats.verified}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-xs text-white/60">Concerns</p>
                <p className="text-xl font-bold">{stats.concernsRaised}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-xs text-white/60">Total Sampled</p>
                <p className="text-xl font-bold">{stats.totalSampled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-white/5 border border-elec-gray/40">
            <TabsTrigger value="candidates">Sampling Candidates</TabsTrigger>
            <TabsTrigger value="records">Sampling Records</TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetchCandidates();
              refetchRecords();
            }}
            className="border-elec-gray/40"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <TabsContent value="candidates" className="mt-4">
          <Card className="bg-white/5 border-elec-gray/40">
            <CardHeader>
              <CardTitle className="text-base">Submissions Available for Sampling</CardTitle>
              <CardDescription>
                Select submissions to add to your IQA sampling queue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-elec-gray/40">
                    <TableHead className="text-white/70">Student</TableHead>
                    <TableHead className="text-white/70">Category</TableHead>
                    <TableHead className="text-white/70">Assessor</TableHead>
                    <TableHead className="text-white/70 text-center">Grade</TableHead>
                    <TableHead className="text-white/70 text-center">Signed Off</TableHead>
                    <TableHead className="text-white/70 w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map(candidate => (
                    <TableRow key={candidate.id} className="border-elec-gray/40">
                      <TableCell>
                        <div>
                          <p className="font-medium">{candidate.studentName}</p>
                          <p className="text-xs text-white/50">{candidate.qualificationTitle}</p>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.categoryName}</TableCell>
                      <TableCell className="text-white/60">{candidate.assessorName}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="capitalize">{candidate.grade}</Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {formatDate(candidate.signedOffAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {onViewSubmission && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onViewSubmission(candidate.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => handleSample(candidate.id)}
                            className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                          >
                            Sample
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {candidates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-white/50 py-12">
                        No submissions available for sampling
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="mt-4">
          <Card className="bg-white/5 border-elec-gray/40">
            <CardHeader>
              <CardTitle className="text-base">Sampling Records</CardTitle>
              <CardDescription>
                Review and verify sampled submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-elec-gray/40">
                    <TableHead className="text-white/70">Student</TableHead>
                    <TableHead className="text-white/70">Category</TableHead>
                    <TableHead className="text-white/70 text-center">Sampled</TableHead>
                    <TableHead className="text-white/70 text-center">Status</TableHead>
                    <TableHead className="text-white/70 w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samplingRecords.map(record => (
                    <TableRow key={record.id} className="border-elec-gray/40">
                      <TableCell>
                        <p className="font-medium">{record.studentName}</p>
                      </TableCell>
                      <TableCell>{record.categoryName}</TableCell>
                      <TableCell className="text-center text-sm">
                        {formatDate(record.sampledAt)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(record.verificationStatus)}
                      </TableCell>
                      <TableCell>
                        {record.verificationStatus === 'pending' ? (
                          <Button
                            size="sm"
                            onClick={() => setSelectedRecord(record)}
                            className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
                          >
                            Review
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {samplingRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-white/50 py-12">
                        No sampling records yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="bg-elec-dark border-elec-gray/40 max-w-lg">
          <DialogHeader>
            <DialogTitle>IQA Verification</DialogTitle>
            <DialogDescription>
              {selectedRecord?.studentName} - {selectedRecord?.categoryName}
            </DialogDescription>
          </DialogHeader>

          {selectedRecord?.verificationStatus === 'pending' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Decision *</Label>
                <Select value={verificationStatus} onValueChange={setVerificationStatus}>
                  <SelectTrigger className="bg-white/5 border-elec-gray/40">
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-gray/40">
                    <SelectItem value="verified">Verified - Assessment Accurate</SelectItem>
                    <SelectItem value="concerns_raised">Concerns Raised</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assessor Feedback Quality</Label>
                <Select value={feedbackQuality} onValueChange={setFeedbackQuality}>
                  <SelectTrigger className="bg-white/5 border-elec-gray/40">
                    <SelectValue placeholder="Rate feedback quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-gray/40">
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="adequate">Adequate</SelectItem>
                    <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Grading Accuracy</Label>
                <Select value={gradingAccuracy} onValueChange={setGradingAccuracy}>
                  <SelectTrigger className="bg-white/5 border-elec-gray/40">
                    <SelectValue placeholder="Rate grading accuracy" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-gray/40">
                    <SelectItem value="accurate">Accurate</SelectItem>
                    <SelectItem value="questionable">Questionable</SelectItem>
                    <SelectItem value="inaccurate">Inaccurate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>IQA Notes</Label>
                <Textarea
                  placeholder="Add verification notes..."
                  value={iqaNotes}
                  onChange={(e) => setIqaNotes(e.target.value)}
                  className="bg-white/5 border-elec-gray/40"
                />
              </div>

              {verificationStatus === 'concerns_raised' && (
                <div className="space-y-2">
                  <Label>Action Required</Label>
                  <Textarea
                    placeholder="Describe the action required..."
                    value={actionRequired}
                    onChange={(e) => setActionRequired(e.target.value)}
                    className="bg-white/5 border-elec-gray/40"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white/60">Status</p>
                <p className="font-medium capitalize">{selectedRecord?.verificationStatus}</p>
              </div>
              {selectedRecord?.iqaNotes && (
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm text-white/60">IQA Notes</p>
                  <p>{selectedRecord.iqaNotes}</p>
                </div>
              )}
              {selectedRecord?.actionRequired && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">Action Required</p>
                  <p>{selectedRecord.actionRequired}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRecord(null)}>
              {selectedRecord?.verificationStatus === 'pending' ? 'Cancel' : 'Close'}
            </Button>
            {selectedRecord?.verificationStatus === 'pending' && (
              <Button
                onClick={handleVerification}
                disabled={!verificationStatus || isSubmitting}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/80"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Submit Verification
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IQASamplingPanel;
