/**
 * Date and Calendar Helpers
 */

export interface CalendarMonthData {
  year: number;
  month: number; // 1-12
  monthName: string;
  firstDayOfWeek: number; // 0 = Sunday, 1 = Monday, ...
  daysInMonth: number;
  weeks: (number | null)[][];
}

/**
 * Computes calendar matrix dynamically for a given year and month (1-indexed)
 * Sunday is first column (index 0)
 */
export function getCalendarGrid(year: number, month: number, monthName: string): CalendarMonthData {
  // JavaScript Date month is 0-indexed (0 = Jan, 11 = Dec)
  const firstDay = new Date(year, month - 1, 1);
  const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.
  
  // Last day of month
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Pad previous month empty days
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Populate days of month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Pad remaining days of the last week if needed
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  return {
    year,
    month,
    monthName,
    firstDayOfWeek,
    daysInMonth,
    weeks,
  };
}

export function formatDateToICS(isoString: string): string {
  // Format to UTC YYYYMMDDTHHMMSSZ or local floating
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
