import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type ServiceType = "full_service" | "interim_service" | "mot" | "repair" | "tyres" | "brakes" | "other";

export interface VehicleService {
  id: string;
  user_id: string;
  vehicle_id: string;
  service_date: string;
  service_type: ServiceType;
  provider?: string;
  mileage?: number;
  cost?: number;
  description?: string;
  parts_replaced?: string[];
  invoice_url?: string;
  next_service_due?: string;
  next_service_mileage?: number;
  notes?: string;
  created_at: string;
}

export type CreateServiceInput = Omit<VehicleService, "id" | "user_id" | "created_at">;

export const SERVICE_TYPES: Array<{ value: ServiceType; label: string }> = [
  { value: "full_service", label: "Full Service" },
  { value: "interim_service", label: "Interim Service" },
  { value: "mot", label: "MOT" },
  { value: "repair", label: "Repair" },
  { value: "tyres", label: "Tyres" },
  { value: "brakes", label: "Brakes" },
  { value: "other", label: "Other" },
];

// Fetch services for a specific vehicle
export function useVehicleServices(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["vehicleServices", vehicleId],
    queryFn: async (): Promise<VehicleService[]> => {
      if (!vehicleId) return [];

      const { data, error } = await supabase
        .from("vehicle_services")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("service_date", { ascending: false });

      if (error) throw error;
      return data as VehicleService[];
    },
    enabled: !!vehicleId,
  });
}

// Get service stats for a vehicle
export function useServiceStats(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["serviceStats", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;

      const { data: services, error } = await supabase
        .from("vehicle_services")
        .select("service_date, cost, service_type, next_service_due, next_service_mileage")
        .eq("vehicle_id", vehicleId);

      if (error) throw error;

      const today = new Date().toISOString().split("T")[0];
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      // Get total costs in last year
      const yearCosts = services
        .filter(s => s.service_date >= oneYearAgo)
        .reduce((sum, s) => sum + (s.cost || 0), 0);

      // Find next service due
      const upcomingServices = services
        .filter(s => s.next_service_due && s.next_service_due >= today)
        .sort((a, b) => (a.next_service_due || "").localeCompare(b.next_service_due || ""));

      return {
        totalServices: services.length,
        yearCosts,
        lastService: services.length > 0 ? services[0] : null,
        nextServiceDue: upcomingServices.length > 0 ? upcomingServices[0].next_service_due : null,
        nextServiceMileage: upcomingServices.length > 0 ? upcomingServices[0].next_service_mileage : null,
      };
    },
    enabled: !!vehicleId,
  });
}

// Get cost analysis for a vehicle
export function useCostAnalysis(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["costAnalysis", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;

      // Get vehicle data
      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehicles")
        .select("mileage")
        .eq("id", vehicleId)
        .single();

      if (vehicleError) throw vehicleError;

      // Get all services
      const { data: services, error: servicesError } = await supabase
        .from("vehicle_services")
        .select("cost, service_date, mileage")
        .eq("vehicle_id", vehicleId);

      if (servicesError) throw servicesError;

      // Get all fuel logs
      const { data: fuel, error: fuelError } = await supabase
        .from("fuel_logs")
        .select("cost, date, mileage")
        .eq("vehicle_id", vehicleId);

      if (fuelError) throw fuelError;

      const totalServiceCost = services.reduce((sum, s) => sum + (s.cost || 0), 0);
      const totalFuelCost = fuel.reduce((sum, f) => sum + (f.cost || 0), 0);
      const totalCost = totalServiceCost + totalFuelCost;

      // Calculate mileage from earliest log to current
      const allMileages = [
        ...services.filter(s => s.mileage).map(s => ({ mileage: s.mileage!, date: s.service_date })),
        ...fuel.filter(f => f.mileage).map(f => ({ mileage: f.mileage!, date: f.date })),
      ].sort((a, b) => a.date.localeCompare(b.date));

      let milesDriven = 0;
      if (allMileages.length >= 2) {
        milesDriven = allMileages[allMileages.length - 1].mileage - allMileages[0].mileage;
      } else if (vehicle.mileage && allMileages.length > 0) {
        milesDriven = vehicle.mileage - allMileages[0].mileage;
      }

      const costPerMile = milesDriven > 0 ? totalCost / milesDriven : 0;

      // Monthly costs (last 12 months)
      const monthlyCosts: Array<{ month: string; services: number; fuel: number; total: number }> = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = date.toISOString().slice(0, 7); // YYYY-MM

        const monthServices = services
          .filter(s => s.service_date.startsWith(monthKey))
          .reduce((sum, s) => sum + (s.cost || 0), 0);

        const monthFuel = fuel
          .filter(f => f.date.startsWith(monthKey))
          .reduce((sum, f) => sum + (f.cost || 0), 0);

        monthlyCosts.push({
          month: date.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
          services: monthServices,
          fuel: monthFuel,
          total: monthServices + monthFuel,
        });
      }

      return {
        totalServiceCost,
        totalFuelCost,
        totalCost,
        milesDriven,
        costPerMile,
        monthlyCosts,
        currentMileage: vehicle.mileage,
      };
    },
    enabled: !!vehicleId,
  });
}

// Create a new service
export function useCreateService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateServiceInput): Promise<VehicleService> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("vehicle_services")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      // Update vehicle with service info
      const updates: Record<string, unknown> = {
        last_service: input.service_date,
        updated_at: new Date().toISOString(),
      };

      if (input.mileage) {
        updates.mileage = input.mileage;
      }
      if (input.next_service_due) {
        updates.next_service = input.next_service_due;
      }

      await supabase
        .from("vehicles")
        .update(updates)
        .eq("id", input.vehicle_id);

      return data as VehicleService;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleServices", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["serviceStats", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["costAnalysis", data.vehicle_id] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Service logged",
        description: "The service has been recorded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete a service
export function useDeleteService() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, vehicleId }: { id: string; vehicleId: string }): Promise<void> => {
      const { error } = await supabase
        .from("vehicle_services")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["vehicleServices", variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["serviceStats", variables.vehicleId] });
      queryClient.invalidateQueries({ queryKey: ["costAnalysis", variables.vehicleId] });
      toast({
        title: "Service deleted",
        description: "The service record has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Upload invoice
export function useUploadInvoice() {
  return useMutation({
    mutationFn: async ({ file, vehicleId }: { file: File; vehicleId: string }): Promise<string> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileName = `vehicle-invoices/${user.id}/${vehicleId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

      const { data, error } = await supabase.storage
        .from("visual-uploads")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("visual-uploads")
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    },
  });
}
