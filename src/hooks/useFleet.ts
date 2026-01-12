import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type VehicleStatus = "Active" | "Available" | "Maintenance" | "Off Road";
export type VehicleType = "Van" | "Truck" | "Car" | "Pickup";

export interface Vehicle {
  id: string;
  user_id: string;
  registration: string;
  make?: string;
  model?: string;
  year?: number;
  colour?: string;
  vehicle_type?: VehicleType;
  assigned_to?: string;
  driver_id?: string;
  mot_expiry?: string;
  tax_expiry?: string;
  insurance_expiry?: string;
  last_service?: string;
  next_service?: string;
  mileage: number;
  status: VehicleStatus;
  tracker_fitted: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  driver?: {
    id: string;
    name: string;
  };
}

export interface FuelLog {
  id: string;
  vehicle_id: string;
  user_id: string;
  date: string;
  litres?: number;
  cost?: number;
  mileage?: number;
  location?: string;
  fuel_type?: string;
  payment_method?: string;
  notes?: string;
  created_at: string;
  // Joined data
  vehicle?: {
    id: string;
    registration: string;
  };
}

export type CreateVehicleInput = Omit<Vehicle, "id" | "user_id" | "created_at" | "updated_at" | "driver">;
export type UpdateVehicleInput = Partial<CreateVehicleInput>;
export type CreateFuelLogInput = Omit<FuelLog, "id" | "user_id" | "created_at" | "vehicle">;

// Fetch all vehicles for the current user
export function useVehicles() {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async (): Promise<Vehicle[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("vehicles")
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .eq("user_id", user.id)
        .order("registration", { ascending: true });

      if (error) throw error;
      return data as Vehicle[];
    },
  });
}

// Fetch fuel logs for the current user
export function useFuelLogs() {
  return useQuery({
    queryKey: ["fuelLogs"],
    queryFn: async (): Promise<FuelLog[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("fuel_logs")
        .select(`
          *,
          vehicle:vehicles(id, registration)
        `)
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;
      return data as FuelLog[];
    },
  });
}

// Fetch fuel logs for a specific vehicle
export function useFuelLogsByVehicle(vehicleId: string | undefined) {
  return useQuery({
    queryKey: ["fuelLogs", "vehicle", vehicleId],
    queryFn: async (): Promise<FuelLog[]> => {
      if (!vehicleId) return [];

      const { data, error } = await supabase
        .from("fuel_logs")
        .select(`
          *,
          vehicle:vehicles(id, registration)
        `)
        .eq("vehicle_id", vehicleId)
        .order("date", { ascending: false });

      if (error) throw error;
      return data as FuelLog[];
    },
    enabled: !!vehicleId,
  });
}

// Get fleet statistics
export function useFleetStats() {
  return useQuery({
    queryKey: ["fleet", "stats"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get vehicles
      const { data: vehicles, error: vehiclesError } = await supabase
        .from("vehicles")
        .select("id, status, mot_expiry, tax_expiry, mileage")
        .eq("user_id", user.id);

      if (vehiclesError) throw vehiclesError;

      // Get this month's fuel logs
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: fuelLogs, error: fuelError } = await supabase
        .from("fuel_logs")
        .select("cost")
        .eq("user_id", user.id)
        .gte("date", startOfMonth.toISOString().split("T")[0]);

      if (fuelError) throw fuelError;

      const today = new Date().toISOString().split("T")[0];
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const stats = {
        total: vehicles.length,
        active: vehicles.filter(v => v.status === "Active").length,
        available: vehicles.filter(v => v.status === "Available").length,
        maintenance: vehicles.filter(v => v.status === "Maintenance").length,
        motDue: vehicles.filter(v =>
          v.mot_expiry &&
          v.mot_expiry <= thirtyDaysFromNow
        ).length,
        taxDue: vehicles.filter(v =>
          v.tax_expiry &&
          v.tax_expiry <= thirtyDaysFromNow
        ).length,
        totalMileage: vehicles.reduce((sum, v) => sum + (v.mileage || 0), 0),
        monthlyFuelCost: fuelLogs.reduce((sum, f) => sum + (f.cost || 0), 0),
      };

      return stats;
    },
  });
}

// Create a new vehicle
export function useCreateVehicle() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateVehicleInput): Promise<Vehicle> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("vehicles")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as Vehicle;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Vehicle added",
        description: `${data.registration} has been added to your fleet.`,
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

// Update a vehicle
export function useUpdateVehicle() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...input }: UpdateVehicleInput & { id: string }): Promise<Vehicle> => {
      const { data, error } = await supabase
        .from("vehicles")
        .update({ ...input, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select(`
          *,
          driver:employer_employees(id, name)
        `)
        .single();

      if (error) throw error;
      return data as Vehicle;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Vehicle updated",
        description: "The vehicle has been updated successfully.",
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

// Delete a vehicle
export function useDeleteVehicle() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Vehicle removed",
        description: "The vehicle has been removed from your fleet.",
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

// Create a fuel log
export function useCreateFuelLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateFuelLogInput): Promise<FuelLog> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("fuel_logs")
        .insert({ ...input, user_id: user.id })
        .select(`
          *,
          vehicle:vehicles(id, registration)
        `)
        .single();

      if (error) throw error;

      // Update vehicle mileage if provided
      if (input.mileage) {
        await supabase
          .from("vehicles")
          .update({ mileage: input.mileage, updated_at: new Date().toISOString() })
          .eq("id", input.vehicle_id);
      }

      return data as FuelLog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuelLogs"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Fuel logged",
        description: "The fuel entry has been recorded.",
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

// Delete a fuel log
export function useDeleteFuelLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("fuel_logs")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fuelLogs"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
      toast({
        title: "Fuel log deleted",
        description: "The fuel entry has been removed.",
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
