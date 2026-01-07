import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  BookOpen,
  Calculator,
  Building,
  GraduationCap,
  Users,
  Calendar,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { useEPAGateway, GatewayStatus } from '@/hooks/college/useEPAGateway';

interface EPAGatewayChecklistProps {
  studentId: string;
  qualificationId: string;
  readOnly?: boolean;
}

const EPAGatewayChecklist: React.FC<EPAGatewayChecklistProps> = ({
  studentId,
  qualificationId,
  readOnly = false
}) => {
  const {
    gatewayStatus,
    checklistItems,
    isLoading,
    updateChecklistItem,
    updateOJTHours,
    bookEPA
  } = useEPAGateway(studentId, qualificationId);

  const [showBookEPA, setShowBookEPA] = useState(false);
  const [epaDate, setEpaDate] = useState('');
  const [ojtHoursInput, setOjtHoursInput] = useState('');
  const [showOJTDialog, setShowOJTDialog] = useState(false);

  if (isLoading) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        </CardContent>
      </Card>
    );
  }

  const status = gatewayStatus as GatewayStatus;
  if (!status) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-12 w-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/50">No gateway data available</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (readiness: string) => {
    switch (readiness) {
      case 'gateway_passed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Gateway Passed</Badge>;
      case 'ready':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Ready for Gateway</Badge>;
      case 'nearly_ready':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Nearly Ready</Badge>;
      default:
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Not Ready</Badge>;
    }
  };

  const getIcon = (key: string) => {
    switch (key) {
      case 'portfolio_complete':
      case 'portfolio_signed_off':
        return <BookOpen className="h-5 w-5" />;
      case 'ojt_hours_verified':
        return <Clock className="h-5 w-5" />;
      case 'english_level2':
        return <GraduationCap className="h-5 w-5" />;
      case 'maths_level2':
        return <Calculator className="h-5 w-5" />;
      case 'employer_satisfied':
        return <Building className="h-5 w-5" />;
      case 'provider_satisfied':
        return <GraduationCap className="h-5 w-5" />;
      case 'gateway_meeting':
        return <Users className="h-5 w-5" />;
      default:
        return <CheckCircle2 className="h-5 w-5" />;
    }
  };

  const handleChecklistUpdate = async (key: string, completed: boolean) => {
    await updateChecklistItem.mutateAsync({
      studentId,
      qualificationId,
      field: key,
      value: completed
    });
  };

  const handleOJTUpdate = async () => {
    const hours = parseInt(ojtHoursInput);
    if (!isNaN(hours) && hours >= 0) {
      await updateOJTHours.mutateAsync({
        studentId,
        qualificationId,
        hours
      });
      setShowOJTDialog(false);
      setOjtHoursInput('');
    }
  };

  const handleBookEPA = async () => {
    if (epaDate) {
      await bookEPA.mutateAsync({
        studentId,
        qualificationId,
        epaDate
      });
      setShowBookEPA(false);
      setEpaDate('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-elec-yellow" />
                EPA Gateway Checklist
              </CardTitle>
              <CardDescription className="mt-1">
                {status.studentName} • {status.qualificationTitle}
              </CardDescription>
            </div>
            {getStatusBadge(status.readinessStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Gateway Progress</span>
              <span className="font-medium">{status.overallProgress}%</span>
            </div>
            <Progress value={status.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* OJT Hours Card */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Off-the-Job Training Hours
            </CardTitle>
            {!readOnly && (
              <Dialog open={showOJTDialog} onOpenChange={setShowOJTDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-elec-gray/40">
                    Update Hours
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-elec-dark border-elec-gray/40">
                  <DialogHeader>
                    <DialogTitle>Update OJT Hours</DialogTitle>
                    <DialogDescription>
                      Enter the total verified off-the-job training hours
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Hours Completed</Label>
                      <Input
                        type="number"
                        value={ojtHoursInput}
                        onChange={(e) => setOjtHoursInput(e.target.value)}
                        placeholder={String(status.ojtHoursCompleted)}
                        className="bg-white/5 border-elec-gray/40"
                      />
                    </div>
                    <p className="text-sm text-white/60">
                      Required: {status.ojtHoursRequired} hours
                    </p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowOJTDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleOJTUpdate} className="bg-elec-yellow text-black">
                      Update
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{status.ojtHoursCompleted} / {status.ojtHoursRequired} hours</span>
              <span className="text-white/60">
                {Math.round((status.ojtHoursCompleted / status.ojtHoursRequired) * 100)}%
              </span>
            </div>
            <Progress
              value={(status.ojtHoursCompleted / status.ojtHoursRequired) * 100}
              className="h-2"
            />
            {status.ojtHoursVerified && (
              <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                <CheckCircle2 className="h-4 w-4" />
                Hours verified
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader>
          <CardTitle className="text-base">Gateway Requirements</CardTitle>
          <CardDescription>All items must be completed before EPA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklistItems.map(item => (
            <div
              key={item.key}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                item.completed
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-white/5 border-elec-gray/40'
              }`}
            >
              {readOnly ? (
                <div className={`p-2 rounded-lg ${item.completed ? 'bg-green-500/10' : 'bg-white/5'}`}>
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-white/40" />
                  )}
                </div>
              ) : (
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) =>
                    handleChecklistUpdate(item.key, checked as boolean)
                  }
                  className="h-5 w-5 border-elec-gray/40"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className={item.completed ? 'text-green-400' : 'text-white/60'}>
                    {getIcon(item.key)}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {item.required && (
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  )}
                </div>
                <p className="text-sm text-white/60 mt-1">{item.description}</p>
              </div>
              {item.completedDate && (
                <div className="text-right text-sm text-white/50">
                  {new Date(item.completedDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EPA Booking */}
      {status.gatewayPassed && (
        <Card className={`border ${status.epaBookedDate ? 'bg-green-500/10 border-green-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              End Point Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status.epaBookedDate ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">EPA Scheduled</p>
                  <p className="text-sm text-white/60">
                    {new Date(status.epaBookedDate).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            ) : (
              <Dialog open={showBookEPA} onOpenChange={setShowBookEPA}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book EPA
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-elec-dark border-elec-gray/40">
                  <DialogHeader>
                    <DialogTitle>Book End Point Assessment</DialogTitle>
                    <DialogDescription>
                      Schedule the EPA date for this apprentice
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>EPA Date</Label>
                      <Input
                        type="date"
                        value={epaDate}
                        onChange={(e) => setEpaDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-white/5 border-elec-gray/40"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowBookEPA(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBookEPA}
                      disabled={!epaDate}
                      className="bg-elec-yellow text-black"
                    >
                      Confirm Booking
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      )}

      {/* Not Ready Message */}
      {!status.gatewayPassed && status.readinessStatus !== 'ready' && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-300">Gateway Requirements Incomplete</p>
                <p className="text-sm text-white/60 mt-1">
                  Complete all required checklist items before the apprentice can progress to EPA.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EPAGatewayChecklist;
