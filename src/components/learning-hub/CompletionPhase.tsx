
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, FileText } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  workDescription: string;
}

interface CompletionPhaseProps {
  customerDetails: CustomerDetails;
  completedSteps: number;
  totalSteps: number;
  criticalStepsCompleted: number;
  totalCriticalSteps: number;
  allTestsValid: boolean;
  canComplete: boolean;
  certificateGenerated: boolean;
  onGenerateCertificate: () => void;
}

const CompletionPhase = ({
  customerDetails,
  completedSteps,
  totalSteps,
  criticalStepsCompleted,
  totalCriticalSteps,
  allTestsValid,
  canComplete,
  certificateGenerated,
  onGenerateCertificate
}: CompletionPhaseProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Digital Signature & Certificate
          </CardTitle>
          <CardDescription className="text-white">
            Sign and generate your safe isolation certificate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SignatureCanvas />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-sm">Procedure Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Steps Completed:</span>
                  <span className="text-elec-yellow">{completedSteps}/{totalSteps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Critical Steps:</span>
                  <span className="text-green-400">{criticalStepsCompleted}/{totalCriticalSteps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Test Results:</span>
                  <span className="text-green-400">{allTestsValid ? 'Valid' : 'Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Customer:</span>
                  <span className="text-foreground">{customerDetails.name}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-sm">Certificate Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white">Date:</span>
                  <span className="text-foreground">{new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Time:</span>
                  <span className="text-foreground">{new Date().toLocaleTimeString('en-GB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Standard:</span>
                  <span className="text-elec-yellow">BS 7671</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">Status:</span>
                  <span className="text-green-400">
                    {canComplete ? 'Ready to Generate' : 'Incomplete'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={onGenerateCertificate}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={!canComplete || certificateGenerated}
            >
              <FileText className="h-4 w-4 mr-2" />
              {certificateGenerated ? 'Certificate Generated' : 'Generate Certificate'}
            </Button>
            {certificateGenerated && (
              <Button 
                variant="outline"
                className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>

          {certificateGenerated && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="font-medium text-green-400">Procedure Complete</span>
              </div>
              <p className="text-white text-sm">
                Safe isolation procedure completed successfully. Certificate generated and ready for download.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionPhase;
