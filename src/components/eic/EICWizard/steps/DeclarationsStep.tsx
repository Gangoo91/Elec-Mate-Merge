/**
 * DeclarationsStep - Designer, Constructor & Inspector Signatures for EIC
 *
 * Mobile-optimized signature capture with role switching
 */

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  PenTool,
  User,
  Building,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle,
  Eraser,
  Pencil,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface DeclarationsStepProps {
  data: any;
  onChange: (updates: any) => void;
  isMobile?: boolean;
}

// Signature pad component
const SignaturePad: React.FC<{
  value: string;
  onChange: (signature: string) => void;
  onClear: () => void;
}> = ({ value, onChange, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
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

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        onChange(canvas.toDataURL());
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  // Load existing signature
  React.useEffect(() => {
    if (value && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = value;
      }
    }
  }, []);

  return (
    <div className="space-y-2">
      <div className="relative border-2 border-dashed border-border rounded-lg bg-white">
        <canvas
          ref={canvasRef}
          width={300}
          height={150}
          className="w-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
        <div className="absolute bottom-2 right-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearCanvas}
            className="h-8 px-2 text-xs"
          >
            <Eraser className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Sign above using your finger or stylus
      </p>
    </div>
  );
};

// Role card component
const RoleCard: React.FC<{
  title: string;
  icon: React.ElementType;
  isComplete: boolean;
  onClick: () => void;
}> = ({ title, icon: Icon, isComplete, onClick }) => {
  const haptic = useHaptic();

  const handleClick = () => {
    haptic.light();
    onClick();
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all active:scale-[0.98] touch-manipulation',
        isComplete ? 'border-green-500/30 bg-green-500/5' : 'border-border/50'
      )}
      onClick={handleClick}
    >
      <CardContent className="py-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            isComplete ? 'bg-green-500/10' : 'bg-elec-yellow/10'
          )}>
            <Icon className={cn(
              'h-5 w-5',
              isComplete ? 'text-green-500' : 'text-elec-yellow'
            )} />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground">
              {isComplete ? 'Completed' : 'Tap to complete'}
            </p>
          </div>
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Role edit sheet
const RoleEditSheet: React.FC<{
  role: 'designer' | 'constructor' | 'inspector' | null;
  data: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (roleData: any) => void;
  isMobile?: boolean;
}> = ({ role, data, open, onOpenChange, onSave, isMobile }) => {
  const [editData, setEditData] = useState<any>({});

  React.useEffect(() => {
    if (role && data) {
      setEditData({
        name: data[`${role}Name`] || '',
        qualifications: data[`${role}Qualifications`] || '',
        company: data[`${role}Company`] || '',
        date: data[`${role}Date`] || new Date().toISOString().split('T')[0],
        signature: data[`${role}Signature`] || '',
      });
    }
  }, [role, data]);

  const handleSave = () => {
    if (role) {
      onSave({
        [`${role}Name`]: editData.name,
        [`${role}Qualifications`]: editData.qualifications,
        [`${role}Company`]: editData.company,
        [`${role}Date`]: editData.date,
        [`${role}Signature`]: editData.signature,
      });
    }
    onOpenChange(false);
  };

  const roleLabels = {
    designer: 'Designer',
    constructor: 'Constructor',
    inspector: 'Inspector',
  };

  if (!role) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={isMobile ? 'bottom' : 'right'} className={cn(isMobile && 'h-[90vh]')}>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <PenTool className="h-5 w-5 text-elec-yellow" />
            </div>
            {roleLabels[role]} Declaration
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="Full name"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              Qualifications
            </Label>
            <Input
              value={editData.qualifications}
              onChange={(e) => setEditData({ ...editData, qualifications: e.target.value })}
              placeholder="e.g. JIB Approved, City & Guilds 2391"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              Company
            </Label>
            <Input
              value={editData.company}
              onChange={(e) => setEditData({ ...editData, company: e.target.value })}
              placeholder="Company name"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Date
            </Label>
            <Input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm flex items-center gap-2">
              <Pencil className="h-4 w-4 text-muted-foreground" />
              Signature <span className="text-destructive">*</span>
            </Label>
            <SignaturePad
              value={editData.signature}
              onChange={(sig) => setEditData({ ...editData, signature: sig })}
              onClear={() => setEditData({ ...editData, signature: '' })}
            />
          </div>
        </div>

        <SheetFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!editData.name || !editData.signature}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Save Declaration
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const DeclarationsStep: React.FC<DeclarationsStepProps> = ({
  data,
  onChange,
  isMobile,
}) => {
  const [editingRole, setEditingRole] = useState<'designer' | 'constructor' | 'inspector' | null>(null);
  const haptic = useHaptic();

  // Check completion status
  const isDesignerComplete = Boolean(data.designerName && data.designerSignature);
  const isConstructorComplete = Boolean(data.constructorName && data.constructorSignature);
  const isInspectorComplete = Boolean(data.inspectorName && data.inspectorSignature);

  const completedCount = [isDesignerComplete, isConstructorComplete, isInspectorComplete].filter(Boolean).length;

  const handleSave = (roleData: any) => {
    haptic.success();
    onChange(roleData);
  };

  // Check if same person for all roles
  const handleSameAsDesigner = () => {
    haptic.medium();
    onChange({
      constructorName: data.designerName,
      constructorQualifications: data.designerQualifications,
      constructorCompany: data.designerCompany,
      constructorDate: data.designerDate,
      constructorSignature: data.designerSignature,
      inspectorName: data.designerName,
      inspectorQualifications: data.designerQualifications,
      inspectorCompany: data.designerCompany,
      inspectorDate: data.designerDate,
      inspectorSignature: data.designerSignature,
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="border-border/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-elec-yellow" />
              <span className="font-semibold">Declarations</span>
            </div>
            <Badge
              variant={completedCount === 3 ? 'default' : 'secondary'}
              className={cn(
                completedCount === 3 && 'bg-green-500'
              )}
            >
              {completedCount}/3 Complete
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            All three declarations are required to complete the certificate
          </p>
        </CardContent>
      </Card>

      {/* Role Cards */}
      <div className="space-y-3">
        <RoleCard
          title="Designer"
          icon={PenTool}
          isComplete={isDesignerComplete}
          onClick={() => setEditingRole('designer')}
        />
        <RoleCard
          title="Constructor"
          icon={Building}
          isComplete={isConstructorComplete}
          onClick={() => setEditingRole('constructor')}
        />
        <RoleCard
          title="Inspector"
          icon={User}
          isComplete={isInspectorComplete}
          onClick={() => setEditingRole('inspector')}
        />
      </div>

      {/* Quick Fill Option */}
      {isDesignerComplete && (!isConstructorComplete || !isInspectorComplete) && (
        <Card className="border-elec-yellow/30 bg-elec-yellow/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Same person for all roles?</p>
                <p className="text-xs text-muted-foreground">
                  Copy designer details to other declarations
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleSameAsDesigner}
                className="shrink-0"
              >
                Apply to All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notice */}
      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Signatures are legally binding</p>
        <p>Ensure all details are accurate before signing</p>
      </div>

      {/* Edit Sheet */}
      <RoleEditSheet
        role={editingRole}
        data={data}
        open={editingRole !== null}
        onOpenChange={(open) => !open && setEditingRole(null)}
        onSave={handleSave}
        isMobile={isMobile}
      />
    </div>
  );
};

export default DeclarationsStep;
