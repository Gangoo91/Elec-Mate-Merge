import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Columns3, Rows3, ZoomIn, ZoomOut, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

interface TableViewControlsProps {
  onToggleGroup?: (groupId: string) => void;
  collapsedGroups?: Set<string>;
}

type ViewMode = 'compact' | 'normal' | 'comfortable';
type ZoomLevel = 80 | 100 | 120;

const TABLE_PREFS_KEY = 'test-table-preferences';

export const TableViewControls: React.FC<TableViewControlsProps> = ({
  onToggleGroup,
  collapsedGroups = new Set(),
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(100);
  const [colorMode, setColorMode] = useState(true);

  // Load preferences from IndexedDB
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const prefs = await offlineStorage.getTablePreference('circuit-table-prefs');
        if (prefs) {
          setViewMode(prefs.viewMode || 'normal');
          setZoomLevel(prefs.zoomLevel || 100);
          setColorMode(prefs.colorMode !== false);
        }
      } catch (e) {
      }
    };
    loadPreferences();
  }, []);

  // Save preferences to IndexedDB
  useEffect(() => {
    const savePreferences = async () => {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const prefs = { viewMode, zoomLevel, colorMode };
      await offlineStorage.setTablePreference('circuit-table-prefs', prefs);
    };
    savePreferences();
  }, [viewMode, zoomLevel, colorMode]);

  const columnGroups = [
    { id: 'circuit', label: 'Circuit Details' },
    { id: 'conductor', label: 'Conductors' },
    { id: 'protection', label: 'Protective Device' },
    { id: 'rcdDetails', label: 'RCD Details' },
    { id: 'continuity', label: 'Continuity Tests' },
    { id: 'insulation', label: 'Insulation' },
    { id: 'zs', label: 'Zs Tests' },
    { id: 'rcd', label: 'RCD Tests' },
    { id: 'afdd', label: 'AFDD' },
    { id: 'functional', label: 'Functional' },
  ];

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    document.documentElement.style.setProperty(
      '--table-spacing',
      mode === 'compact' ? '0.25rem' : mode === 'comfortable' ? '0.75rem' : '0.5rem'
    );
  };

  const handleZoomChange = (zoom: ZoomLevel) => {
    setZoomLevel(zoom);
    document.documentElement.style.setProperty('--table-zoom', `${zoom}%`);
  };

  const handleColorModeToggle = () => {
    const newColorMode = !colorMode;
    setColorMode(newColorMode);
    document.documentElement.style.setProperty(
      '--table-color-mode',
      newColorMode ? '1' : '0'
    );
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/30 border-b border-border">
      {/* Column Visibility */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Columns3 className="h-4 w-4 mr-2" />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-background z-50">
          <DropdownMenuLabel>Toggle Column Groups</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columnGroups.map((group) => (
            <DropdownMenuCheckboxItem
              key={group.id}
              checked={!collapsedGroups.has(group.id)}
              onCheckedChange={() => onToggleGroup?.(group.id)}
            >
              {group.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Mode */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Rows3 className="h-4 w-4 mr-2" />
            {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-background z-50">
          <DropdownMenuLabel>Row Spacing</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={viewMode} onValueChange={(v) => handleViewModeChange(v as ViewMode)}>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Zoom */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <ZoomIn className="h-4 w-4 mr-2" />
            {zoomLevel}%
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="bg-background z-50">
          <DropdownMenuLabel>Text Size</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={zoomLevel.toString()} onValueChange={(v) => handleZoomChange(parseInt(v) as ZoomLevel)}>
            <DropdownMenuRadioItem value="80">80%</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="100">100%</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="120">120%</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Color Mode */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleColorModeToggle}
        className="h-8 px-3"
      >
        {colorMode ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
        Colors
      </Button>

      <div className="flex-1" />

      <div className="text-xs text-muted-foreground">
        💡 Tip: Use Tab/Enter to navigate • Right-click for more options
      </div>
    </div>
  );
};
