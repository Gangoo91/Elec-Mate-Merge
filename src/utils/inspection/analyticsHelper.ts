import { ExpiryReminder } from '@/types/expiryTypes';
import { format, startOfMonth, parseISO } from 'date-fns';

export interface ConversionMetrics {
  contactRate: number;
  bookingRate: number;
  completionRate: number;
  avgResponseTime: number;
}

export interface MonthlyTrend {
  month: string;
  pending: number;
  contacted: number;
  booked: number;
  completed: number;
  revenue: number;
}

export interface PropertyTypeRevenue {
  domestic: number;
  commercial: number;
  domesticCount: number;
  commercialCount: number;
}

export const calculateConversionMetrics = (reminders: ExpiryReminder[]): ConversionMetrics => {
  const total = reminders.length;
  const contacted = reminders.filter(r => 
    r.reminder_status === 'contacted' || 
    r.reminder_status === 'booked' || 
    r.reminder_status === 'completed'
  ).length;
  const booked = reminders.filter(r => 
    r.reminder_status === 'booked' || 
    r.reminder_status === 'completed'
  ).length;
  const completed = reminders.filter(r => r.reminder_status === 'completed').length;
  
  return {
    contactRate: total > 0 ? (contacted / total) * 100 : 0,
    bookingRate: contacted > 0 ? (booked / contacted) * 100 : 0,
    completionRate: booked > 0 ? (completed / booked) * 100 : 0,
    avgResponseTime: calculateAverageResponseTime(reminders)
  };
};

export const calculateAverageResponseTime = (reminders: ExpiryReminder[]): number => {
  const withResponseTime = reminders.filter(r => r.response_time_hours && r.response_time_hours > 0);
  if (withResponseTime.length === 0) return 0;
  const sum = withResponseTime.reduce((acc, r) => acc + (r.response_time_hours || 0), 0);
  return Math.round(sum / withResponseTime.length);
};

export const getMonthlyTrends = (reminders: ExpiryReminder[], months: number = 6): MonthlyTrend[] => {
  const trends = new Map<string, MonthlyTrend>();
  const avgInspectionFee = 250;
  
  reminders.forEach(reminder => {
    const date = reminder.created_at ? parseISO(reminder.created_at) : new Date();
    const monthKey = format(startOfMonth(date), 'MMM yyyy');
    
    if (!trends.has(monthKey)) {
      trends.set(monthKey, {
        month: monthKey,
        pending: 0,
        contacted: 0,
        booked: 0,
        completed: 0,
        revenue: 0
      });
    }
    
    const trend = trends.get(monthKey)!;
    
    switch (reminder.reminder_status) {
      case 'pending':
        trend.pending++;
        break;
      case 'contacted':
        trend.contacted++;
        break;
      case 'booked':
        trend.booked++;
        break;
      case 'completed':
        trend.completed++;
        trend.revenue += avgInspectionFee;
        break;
    }
  });
  
  return Array.from(trends.values()).slice(-months);
};

export const formatResponseTime = (hours: number): string => {
  if (hours < 1) return 'Less than 1 hour';
  if (hours < 24) return `${Math.round(hours)} hours`;
  const days = Math.round(hours / 24);
  return `${days} ${days === 1 ? 'day' : 'days'}`;
};
