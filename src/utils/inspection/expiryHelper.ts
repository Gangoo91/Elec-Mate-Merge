import { differenceInDays, format } from 'date-fns';
import { ClientGroup, ExpiryReminder } from '@/types/expiryTypes';

/**
 * Calculate expiry date based on report type and property type
 */
export const calculateExpiryDate = (
  inspectionDate: string | Date,
  reportType: 'eicr' | 'eic' | 'minor-works',
  propertyType: 'domestic' | 'commercial' = 'domestic'
): Date => {
  const date = new Date(inspectionDate);
  
  if (reportType === 'eicr') {
    const years = propertyType === 'commercial' ? 3 : 5;
    date.setFullYear(date.getFullYear() + years);
  }
  
  return date;
};

/**
 * Get days until expiry (negative means expired)
 */
export const getDaysUntilExpiry = (expiryDate: string | Date): number => {
  return differenceInDays(new Date(expiryDate), new Date());
};

/**
 * Format expiry status as human-readable string
 */
export const formatExpiryStatus = (expiryDate: string | Date): string => {
  const daysRemaining = getDaysUntilExpiry(expiryDate);
  
  if (daysRemaining < 0) {
    const daysOverdue = Math.abs(daysRemaining);
    return `Expired ${daysOverdue} day${daysOverdue === 1 ? '' : 's'} ago`;
  }
  
  if (daysRemaining === 0) return 'Expires today';
  if (daysRemaining === 1) return 'Expires tomorrow';
  if (daysRemaining <= 30) return `Expires in ${daysRemaining} days`;
  if (daysRemaining <= 90) {
    const weeks = Math.floor(daysRemaining / 7);
    return `Expires in ${weeks} week${weeks === 1 ? '' : 's'}`;
  }
  
  const months = Math.floor(daysRemaining / 30);
  return `Expires in ${months} month${months === 1 ? '' : 's'}`;
};

/**
 * Get urgency level for styling based on days remaining
 */
export const getExpiryUrgency = (
  expiryDate: string | Date
): 'expired' | 'urgent' | 'warning' | 'safe' => {
  const days = getDaysUntilExpiry(expiryDate);
  
  if (days < 0) return 'expired';
  if (days <= 30) return 'urgent';
  if (days <= 60) return 'warning';
  return 'safe';
};

/**
 * Get color classes based on urgency
 */
export const getExpiryColorClasses = (urgency: 'expired' | 'urgent' | 'warning' | 'safe') => {
  switch (urgency) {
    case 'expired':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-500',
        border: 'border-red-500/20',
        badge: 'bg-red-500 text-white',
      };
    case 'urgent':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-500',
        border: 'border-orange-500/20',
        badge: 'bg-orange-500 text-white',
      };
    case 'warning':
      return {
        bg: 'bg-yellow-500/10',
        text: 'text-yellow-500',
        border: 'border-yellow-500/20',
        badge: 'bg-yellow-500 text-neutral-900',
      };
    case 'safe':
      return {
        bg: 'bg-blue-500/10',
        text: 'text-blue-500',
        border: 'border-blue-500/20',
        badge: 'bg-blue-500 text-white',
      };
  }
};

/**
 * Calculate potential revenue opportunity
 */
export const calculateRevenueOpportunity = (
  expiringCount: number,
  avgInspectionFee: number = 250
): number => {
  return expiringCount * avgInspectionFee;
};

/**
 * Format revenue as currency
 */
export const formatRevenue = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generate email template for certificate expiry reminder
 */
export const generateReminderEmail = (reminder: {
  client_name?: string;
  installation_address?: string;
  inspection_date?: string;
  expiry_date: string;
  certificate_number: string;
}): string => {
  const clientName = reminder.client_name || 'Valued Customer';
  const inspectionDate = reminder.inspection_date
    ? format(new Date(reminder.inspection_date), 'dd MMMM yyyy')
    : 'N/A';
  const expiryDate = format(new Date(reminder.expiry_date), 'dd MMMM yyyy');

  return `Subject: Time for Your Electrical Inspection Renewal - ${reminder.installation_address || 'Your Property'}

Dear ${clientName},

I hope this message finds you well.

According to our records, the electrical installation certificate for your property${
    reminder.installation_address ? ` at:\n${reminder.installation_address}` : ''
  }

Certificate Number: ${reminder.certificate_number}
Original Inspection: ${inspectionDate}
Certificate Expires: ${expiryDate}

is due for renewal. To maintain compliance with BS 7671:2018 and ensure the continued safety of your electrical installation, I'd like to schedule your next periodic inspection.

Would you be available for an inspection in the coming weeks? I have availability on [insert your available dates here].

Please let me know what works best for you, or feel free to call me directly to arrange a convenient time.

Best regards,
[Your Name]
[Your Company Name]
[Contact Details]

---
This is an automated reminder. The information provided is based on our records and standard EICR inspection intervals.`;
};

/**
 * Export reminder data to CSV format
 */
export const exportRemindersToCSV = (
  reminders: Array<{
    certificate_number: string;
    client_name?: string;
    installation_address?: string;
    inspection_date?: string;
    expiry_date: string;
    reminder_status: string;
  }>
): string => {
  const headers = [
    'Certificate Number',
    'Client Name',
    'Installation Address',
    'Inspection Date',
    'Expiry Date',
    'Days Until Expiry',
    'Status',
  ];

  const rows = reminders.map((reminder) => [
    reminder.certificate_number,
    reminder.client_name || '',
    reminder.installation_address || '',
    reminder.inspection_date || '',
    format(new Date(reminder.expiry_date), 'dd/MM/yyyy'),
    getDaysUntilExpiry(reminder.expiry_date).toString(),
    reminder.reminder_status,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  return csvContent;
};

/**
 * Filter reminders by time range
 */
export const filterByTimeRange = <
  T extends { expiry_date: string | Date }
>(
  reminders: T[],
  range: 'overdue' | '30' | '60' | '90' | 'all'
): T[] => {
  const now = new Date();

  return reminders.filter((reminder) => {
    const days = getDaysUntilExpiry(reminder.expiry_date);

    switch (range) {
      case 'overdue':
        return days < 0;
      case '30':
        return days >= 0 && days <= 30;
      case '60':
        return days >= 0 && days <= 60;
      case '90':
        return days >= 0 && days <= 90;
      case 'all':
      default:
        return true;
    }
  });
};

/**
 * Group reminders by client name
 */
export const groupRemindersByClient = (reminders: ExpiryReminder[]): ClientGroup[] => {
  const groups = new Map<string, ExpiryReminder[]>();
  const avgInspectionFee = 250;

  reminders.forEach((reminder) => {
    const clientName = reminder.client_name || 'Unnamed Client';
    if (!groups.has(clientName)) {
      groups.set(clientName, []);
    }
    groups.get(clientName)!.push(reminder);
  });

  return Array.from(groups.entries()).map(([clientName, clientReminders]) => {
    const sortedByExpiry = [...clientReminders].sort((a, b) => 
      new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()
    );
    
    const earliestExpiry = sortedByExpiry[0].expiry_date;
    const urgency = getExpiryUrgency(earliestExpiry);
    const totalRevenue = clientReminders.length * avgInspectionFee;

    return {
      clientName,
      reminders: sortedByExpiry,
      totalRevenue,
      propertyCount: clientReminders.length,
      urgency,
      earliestExpiry,
    };
  }).sort((a, b) => {
    // Sort by urgency (most urgent first)
    const urgencyOrder = { expired: 0, urgent: 1, warning: 2, safe: 3 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });
};

