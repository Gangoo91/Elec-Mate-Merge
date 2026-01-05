import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Check,
  AlertTriangle,
  User,
  Building,
  Zap,
  Calendar,
  FileText,
  PenTool,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  onComplete: () => void;
  isMobile: boolean;
}

/**
 * Step 5: Review & Sign
 * Certificate summary with signature capture
 */
export const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onChange,
  onComplete,
  isMobile,
}) => {
  const [showSignature, setShowSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const circuits = data.circuits || [];
  const completedCircuits = circuits.filter((c: any) => c.status === 'complete').length;
  const issues = circuits.filter((c: any) => c.status === 'failed').length;

  // Certificate overall status
  const overallStatus = issues > 0 ? 'unsatisfactory' : 'satisfactory';

  // Signature handlers
  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Save signature as data URL
    const canvas = canvasRef.current;
    if (canvas) {
      onChange({ inspectorSignature: canvas.toDataURL() });
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    onChange({ inspectorSignature: null });
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className={cn(
        overallStatus === 'satisfactory'
          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30'
          : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30'
      )}>
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              'p-3 rounded-full',
              overallStatus === 'satisfactory'
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-red-100 dark:bg-red-900'
            )}>
              {overallStatus === 'satisfactory' ? (
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div>
              <h3 className={cn(
                'text-lg font-bold',
                overallStatus === 'satisfactory'
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              )}>
                Installation {overallStatus === 'satisfactory' ? 'Satisfactory' : 'Unsatisfactory'}
              </h3>
              <p className={cn(
                'text-sm',
                overallStatus === 'satisfactory'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              )}>
                {issues > 0
                  ? `${issues} issue${issues > 1 ? 's' : ''} require attention`
                  : 'All tests passed - ready for certification'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Client Summary */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Client</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{data.clientName || 'Not specified'}</p>
            <p className="text-sm text-muted-foreground">{data.clientPhone || ''}</p>
          </CardContent>
        </Card>

        {/* Property Summary */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Property</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold line-clamp-1">
              {data.propertyAddress || 'Not specified'}
            </p>
            <p className="text-sm text-muted-foreground">{data.propertyPostcode || ''}</p>
          </CardContent>
        </Card>

        {/* Circuits Summary */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Circuits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{circuits.length} circuits</p>
            <p className="text-sm text-muted-foreground">
              {completedCircuits} complete, {issues} issues
            </p>
          </CardContent>
        </Card>

        {/* Installation Type */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Installation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">
              {data.supplyType === '3P' ? 'Three Phase' : 'Single Phase'}
            </p>
            <p className="text-sm text-muted-foreground">{data.earthingArrangement || ''}</p>
          </CardContent>
        </Card>
      </div>

      {/* Observations/Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Inspector Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={data.inspectorComments || ''}
            onChange={(e) => onChange({ inspectorComments: e.target.value })}
            placeholder="Add any observations or recommendations..."
            className="min-h-[100px] resize-none"
          />
        </CardContent>
      </Card>

      {/* Signature */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Inspector Signature</CardTitle>
            {data.inspectorSignature && (
              <Button variant="ghost" size="sm" onClick={clearSignature}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Inspector Name</Label>
              <input
                type="text"
                value={data.inspectorName || ''}
                onChange={(e) => onChange({ inspectorName: e.target.value })}
                placeholder="Enter your name"
                className="w-full h-12 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Signature</Label>
              <div
                className={cn(
                  'relative border-2 border-dashed rounded-lg overflow-hidden',
                  'bg-white dark:bg-gray-900',
                  data.inspectorSignature ? 'border-primary' : 'border-border'
                )}
              >
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={150}
                  className="w-full touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!data.inspectorSignature && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center text-muted-foreground">
                      <PenTool className="h-6 w-6 mx-auto mb-1 opacity-50" />
                      <p className="text-sm">Sign here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Date: {new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Button (Mobile) */}
      {isMobile && (
        <Button
          size="lg"
          className="w-full h-14 text-lg gap-2"
          onClick={onComplete}
          disabled={!data.inspectorSignature || !data.inspectorName}
        >
          <Check className="h-5 w-5" />
          Complete Certificate
        </Button>
      )}
    </div>
  );
};

export default ReviewStep;
