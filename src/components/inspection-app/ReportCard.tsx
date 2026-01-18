
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Calendar, User, MapPin, Trash2, Edit, Eye, Users, ArrowRightCircle } from 'lucide-react';

export interface ReportMetadata {
  id: string;
  name: string;
  clientName: string;
  installationAddress: string;
  inspectionDate?: string;
  status: 'draft' | 'in-progress' | 'completed';
  lastModified: number;
  created: number;
  inspectorName: string;
  overallAssessment?: string;
  satisfactoryForContinuedUse?: string;
  reportType?: string;
}

interface ReportCardProps {
  metadata: ReportMetadata;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview?: (id: string) => void;
  onLinkCustomer?: (id: string) => void;
  onExportToEIC?: (id: string) => void;
  onExportToEICR?: (id: string) => void;
  hasCustomer?: boolean;
  isSelected?: boolean;
  isBulkMode?: boolean;
  onSelectToggle?: (id: string) => void;
  canExportToEIC?: boolean;
  canExportToEICR?: boolean;
}

const ReportCard = ({
  metadata,
  onEdit,
  onDelete,
  onPreview,
  onLinkCustomer,
  onExportToEIC,
  onExportToEICR,
  hasCustomer = false,
  isSelected = false,
  isBulkMode = false,
  onSelectToggle,
  canExportToEIC = false,
  canExportToEICR = false,
}: ReportCardProps) => {
  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleDateString('en-GB');
  };

  const getStatusColor = () => {
    return 'border'; // Neutral outline badge styling
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  const handleCardClick = () => {
    if (isBulkMode && onSelectToggle) {
      navigator.vibrate?.(10);
      onSelectToggle(metadata.id);
    }
  };

  return (
    <Card
      className={`transition-all duration-200 touch-manipulation ${
        isBulkMode ? 'cursor-pointer active:scale-[0.99]' : 'hover:shadow-md hover:border-elec-yellow/30 hover:scale-[1.01] active:scale-[0.99]'
      } ${
        isSelected ? 'border-elec-yellow border-2 bg-elec-yellow/5' : ''
      }`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {isBulkMode && (
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => {
                    navigator.vibrate?.(10);
                    onSelectToggle?.(metadata.id);
                  }}
                  className="h-5 w-5"
                />
              </div>
            )}
            <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0" />
            <CardTitle className="text-lg sm:text-xl font-semibold truncate">{metadata.id}</CardTitle>
          </div>
          <Badge variant="outline" className="self-start">
            {getStatusText(metadata.status)}
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground font-medium truncate">
          {metadata.name}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {metadata.clientName && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{metadata.clientName}</span>
          </div>
        )}
        
        {metadata.installationAddress && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{metadata.installationAddress}</span>
          </div>
        )}
        
        {metadata.inspectionDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Inspection: {formatDate(metadata.inspectionDate)}</span>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            Modified: {formatDate(metadata.lastModified)}
          </span>
          
          {!isBulkMode && (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.vibrate?.(10);
                  onEdit(metadata.id);
                }}
                className="flex-1 sm:flex-initial min-h-[44px] sm:h-9"
              >
                <Edit className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.vibrate?.(10);
                  onPreview?.(metadata.id);
                }}
                className="flex-1 sm:flex-initial min-h-[44px] sm:h-9"
              >
                <Eye className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
              {canExportToEIC && onExportToEIC && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.vibrate?.(10);
                    onExportToEIC(metadata.id);
                  }}
                  className="flex-shrink-0 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 text-elec-yellow hover:text-elec-yellow/80"
                  title="Export to EIC"
                >
                  <ArrowRightCircle className="h-4 w-4" />
                </Button>
              )}
              {canExportToEICR && onExportToEICR && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.vibrate?.(10);
                    onExportToEICR(metadata.id);
                  }}
                  className="flex-shrink-0 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 text-blue-500 hover:text-blue-400"
                  title="Export to EICR"
                >
                  <ArrowRightCircle className="h-4 w-4" />
                </Button>
              )}
              {onLinkCustomer && !hasCustomer && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.vibrate?.(10);
                    onLinkCustomer(metadata.id);
                  }}
                  className="flex-shrink-0 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 text-elec-yellow hover:text-elec-yellow/80"
                  title="Link to Customer"
                >
                  <Users className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.vibrate?.(50);
                  onDelete(metadata.id);
                }}
                className="text-red-600 hover:text-red-700 flex-shrink-0 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
