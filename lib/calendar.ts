import { WeddingEvent } from '@/config/invite';
import { formatDateToICS } from './date';

export function getGoogleCalendarUrl(event: WeddingEvent, coupleNames: string): string {
  const start = new Date(event.isoDate);
  const end = event.endTime
    ? new Date(event.endTime)
    : new Date(start.getTime() + 4 * 3600 * 1000);

  const formatGCal = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const text = `${coupleNames} Wedding · ${event.name}`;
  const details = `${event.name}\n${event.time}\n${event.description || ''}\nVenue: ${event.venue}`;
  const location = event.venue;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    text
  )}&dates=${formatGCal(start)}/${formatGCal(end)}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;
}

export function getAllEventsGoogleCalendarUrl(coupleNames: string): string {
  // Main celebration weekend: 11 Dec 11:00 AM IST (05:30 UTC) to 13 Dec 02:00 AM IST (12 Dec 20:30 UTC)
  const start = '20261211T053000Z';
  const end = '20261212T203000Z';
  const text = `${coupleNames} Wedding Celebrations`;
  const details = `We cordially invite you to celebrate the wedding ceremonies of Deepak Jain & Shilpi Garg on 11th & 12th December 2026 in New Delhi.\n\nKey Functions:\n- Haldi & Mehndi: 11 Dec, 11:00 AM (Casa Royal Banquet)\n- Bhaat: 12 Dec, 11:00 AM\n- Gudh Chadi: 12 Dec, 6:00 PM\n- Departure of Barat: 12 Dec, 8:00 PM (GoalChakkar, Beri Wala Bagh)\n- Dinner & Wedding Ceremony: 12 Dec, 9:00 PM (Kawatra's Elegance)`;
  const location = "Kawatra's Elegance, Hari Enclave, Hari Nagar, New Delhi 110064";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    text
  )}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    location
  )}`;
}
