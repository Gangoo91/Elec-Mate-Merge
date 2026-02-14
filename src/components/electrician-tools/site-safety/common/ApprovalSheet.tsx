import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ShieldCheck, XCircle } from 'lucide-react';
import { SignaturePad } from './SignaturePad';
import { useApproveRecord, type ApprovableTable } from '@/hooks/useSupervisorApproval';

interface ApprovalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: ApprovableTable;
  recordId: string;
  recordTitle?: string;
}

export function ApprovalSheet({
  open,
  onOpenChange,
  table,
  recordId,
  recordTitle,
}: ApprovalSheetProps) {
  const approveMutation = useApproveRecord();

  const [approverName, setApproverName] = useState('');
  const [comments, setComments] = useState('');
  const [sigDate, setSigDate] = useState(new Date().toISOString().split('T')[0]);
  const [signatureData, setSignatureData] = useState('');

  const canSubmit = approverName.trim().length > 0;

  const handleAction = async (action: 'approved' | 'rejected') => {
    await approveMutation.mutateAsync({
      table,
      recordId,
      action,
      approverName: approverName.trim(),
      approverSignature: signatureData || undefined,
      comments: comments.trim() || undefined,
    });
    // Reset and close
    setApproverName('');
    setComments('');
    setSignatureData('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 py-4 border-b border-white/10">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <SheetTitle className="text-base font-bold text-white">
                    Supervisor Approval
                  </SheetTitle>
                  <SheetDescription className="text-sm text-white">
                    {recordTitle || 'Review and approve or reject this record'}
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5">
            {/* Approver name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-white text-sm font-bold">Supervisor Name *</Label>
              <Input
                value={approverName}
                onChange={(e) => setApproverName(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                placeholder="Enter your full name"
              />
            </motion.div>

            {/* Comments */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-2"
            >
              <Label className="text-white text-sm font-bold">Comments (optional)</Label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                placeholder="Add approval or rejection reason..."
              />
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SignaturePad
                label="Supervisor Signature"
                name={approverName}
                date={sigDate}
                signatureDataUrl={signatureData}
                onSignatureChange={setSignatureData}
                onNameChange={setApproverName}
                onDateChange={setSigDate}
              />
            </motion.div>
          </div>

          {/* Footer — Approve / Reject buttons */}
          <div className="px-4 py-3 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-2">
            <Button
              onClick={() => handleAction('approved')}
              disabled={!canSubmit || approveMutation.isPending}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <ShieldCheck className="h-5 w-5 mr-2" />
              {approveMutation.isPending ? 'Processing...' : 'Approve'}
            </Button>
            <Button
              onClick={() => handleAction('rejected')}
              disabled={!canSubmit || approveMutation.isPending}
              variant="outline"
              className="w-full h-12 bg-red-500/10 border-red-500/30 text-red-400 font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50 hover:bg-red-500/20"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ApprovalSheet;
