import { WeddingEvent } from '@/config/invite';
import { formatDateToICS } from './date';

export function generateICS(events: WeddingEvent[], coupleNames: string): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Deepak & Shilpi Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:' + coupleNames + ' Wedding Celebrations',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  for (const ev of events) {
    const dtStamp = formatDateToICS(new Date().toISOString());
    const dtStart = formatDateToICS(ev.isoDate);
    const dtEnd = ev.endTime
      ? formatDateToICS(ev.endTime)
      : formatDateToICS(new Date(new Date(ev.isoDate).getTime() + 4 * 3600 * 1000).toISOString());

    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-deepak-shilpi-2026@wedding.invite`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${coupleNames} Wedding · ${ev.name}`,
      `DESCRIPTION:${ev.name}\\n${ev.time}\\n${ev.description || ''}`,
      `LOCATION:${ev.venue}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${ev.name} - ${coupleNames} Wedding`,
      'END:VALARM',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadICS(events: WeddingEvent[], coupleNames: string) {
  const icsData = generateICS(events, coupleNames);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'deepak-shilpi-wedding-celebrations.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
