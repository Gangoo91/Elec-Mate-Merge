/**
 * Existing Client Select Component
 *
 * Dropdown to select previous fire alarm certificate clients:
 * - Queries previous fire alarm certificates from Supabase
 * - Shows client name, address, and date
 * - Auto-fills client details when selected
 * - Supports filtering/search
 */

import * as React from 'react';
import { Check, ChevronsUpDown, User, MapPin, Calendar, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PreviousClient {
  id: string;
  reportId: string;
  clientName: string;
  clientAddress?: string;
  clientTelephone?: string;
  clientEmail?: string;
  premisesName?: string;
  premisesAddress?: string;
  premisesType?: string;
  floorsCount?: number;
  inspectionDate?: string;
  lastUpdated: string;
}

export interface ClientFormData {
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;
  premisesName: string;
  premisesAddress: string;
  premisesType: string;
  floorsCount: number;
}

interface ExistingClientSelectProps {
  onClientSelect: (client: ClientFormData | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function ExistingClientSelect({
  onClientSelect,
  placeholder = 'Load previous client...',
  className,
  disabled = false,
}: ExistingClientSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState<PreviousClient[]>([]);
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Fetch previous clients when popover opens
  const fetchPreviousClients = React.useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        setClients([]);
        return;
      }

      // Query fire alarm reports
      const { data, error } = await supabase
        .from('reports')
        .select('id, report_id, client_name, installation_address, inspection_date, updated_at, data')
        .eq('user_id', session.user.id)
        .eq('report_type', 'fire-alarm')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Map to client objects, deduplicating by client name
      const clientMap = new Map<string, PreviousClient>();

      (data || []).forEach(report => {
        const clientName = report.client_name || report.data?.clientName;
        if (!clientName) return;

        // Use client name as key for deduplication (keep most recent)
        if (!clientMap.has(clientName)) {
          clientMap.set(clientName, {
            id: report.id,
            reportId: report.report_id,
            clientName,
            clientAddress: report.data?.clientAddress || '',
            clientTelephone: report.data?.clientTelephone || '',
            clientEmail: report.data?.clientEmail || '',
            premisesName: report.data?.premisesName || '',
            premisesAddress: report.installation_address || report.data?.premisesAddress || '',
            premisesType: report.data?.premisesType || '',
            floorsCount: report.data?.floorsCount || 1,
            inspectionDate: report.inspection_date || report.data?.inspectionDate,
            lastUpdated: report.updated_at,
          });
        }
      });

      setClients(Array.from(clientMap.values()));
    } catch (error) {
      console.error('[ExistingClientSelect] Failed to fetch clients:', error);
      toast({
        title: 'Failed to load clients',
        description: 'Could not retrieve previous clients.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Fetch when popover opens
  React.useEffect(() => {
    if (open) {
      fetchPreviousClients();
    }
  }, [open, fetchPreviousClients]);

  // Filter clients based on search
  const filteredClients = React.useMemo(() => {
    if (!search.trim()) return clients;

    const searchLower = search.toLowerCase();
    return clients.filter(client =>
      client.clientName.toLowerCase().includes(searchLower) ||
      (client.premisesAddress && client.premisesAddress.toLowerCase().includes(searchLower)) ||
      (client.premisesName && client.premisesName.toLowerCase().includes(searchLower))
    );
  }, [clients, search]);

  // Handle client selection
  const handleSelect = React.useCallback((clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    setSelectedClientId(clientId);
    onClientSelect({
      clientName: client.clientName,
      clientAddress: client.clientAddress || '',
      clientTelephone: client.clientTelephone || '',
      clientEmail: client.clientEmail || '',
      premisesName: client.premisesName || '',
      premisesAddress: client.premisesAddress || '',
      premisesType: client.premisesType || '',
      floorsCount: client.floorsCount || 1,
    });

    setOpen(false);
    setSearch('');

    toast({
      title: 'Client loaded',
      description: `Loaded details for ${client.clientName}`,
    });
  }, [clients, onClientSelect, toast]);

  // Format date for display
  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return '';
    }
  };

  // Get selected client name
  const selectedClient = React.useMemo(() => {
    if (!selectedClientId) return null;
    return clients.find(c => c.id === selectedClientId);
  }, [selectedClientId, clients]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-between h-11 touch-manipulation',
            'bg-elec-gray border-white/30 text-foreground',
            'hover:bg-gray-700 hover:border-white/40',
            'focus:border-yellow-500 focus:ring-yellow-500',
            'data-[state=open]:border-elec-yellow data-[state=open]:ring-2',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <span className={cn(
            'truncate flex items-center gap-2',
            !selectedClient && 'text-muted-foreground'
          )}>
            <User className="h-4 w-4 shrink-0 opacity-60" />
            {selectedClient ? selectedClient.clientName : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-elec-gray border border-white/20 shadow-lg z-[100]"
        align="start"
        sideOffset={4}
      >
        <Command className="bg-elec-gray" shouldFilter={false}>
          <CommandInput
            placeholder="Search clients..."
            value={search}
            onValueChange={setSearch}
            className="border-none bg-elec-gray text-foreground placeholder:text-gray-400"
          />
          <CommandList className="bg-elec-gray max-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
                <span className="ml-2 text-sm text-gray-400">Loading clients...</span>
              </div>
            ) : (
              <>
                <CommandEmpty className="p-4 text-sm text-gray-400">
                  {clients.length === 0
                    ? 'No previous fire alarm clients found.'
                    : 'No matching clients.'}
                </CommandEmpty>

                {filteredClients.length > 0 && (
                  <CommandGroup heading="Previous Clients" className="bg-elec-gray">
                    {filteredClients.map((client) => (
                      <CommandItem
                        key={client.id}
                        value={client.id}
                        onSelect={handleSelect}
                        className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2.5"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedClientId === client.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                          <span className="font-medium truncate">{client.clientName}</span>
                          {(client.premisesAddress || client.premisesName) && (
                            <span className="text-xs text-gray-400 truncate flex items-center gap-1">
                              <MapPin className="h-3 w-3 shrink-0" />
                              {client.premisesName || client.premisesAddress}
                            </span>
                          )}
                          {client.inspectionDate && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3 shrink-0" />
                              Last: {formatDate(client.inspectionDate)}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ExistingClientSelect;
