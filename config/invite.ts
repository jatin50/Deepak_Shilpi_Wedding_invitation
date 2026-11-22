export interface WeddingEvent {
  id: string;
  name: string;
  dayLabel: string;
  date: string;
  isoDate: string;
  time: string;
  endTime?: string;
  venue: string;
  dressCode?: string;
  description?: string;
  iconSrc: string;
  mapUrl?: string;
}

export interface FamilyContact {
  role: string;
  name: string;
  phone: string;
}

export interface VenueDetail {
  name: string;
  purpose: string;
  address: string;
  mapQuery: string;
  mapUrl: string;
}

export interface WeddingConfig {
  couple: {
    groom: string;
    bride: string;
    groomShort: string;
    brideShort: string;
    monogram: string;
    groomLineage: string;
    brideLineage: string;
  };
  blessings: {
    invocation: string;
    elders: string;
    invitationNote: string;
  };
  families: string[];
  parents: {
    groom: string;
    bride: string;
  };
  weddingStart: string;
  calendarTarget: {
    year: number;
    month: number;
    day: number;
    monthName: string;
  };
  events: WeddingEvent[];
  venue: {
    name: string;
    subtitle: string;
    address: string;
    mapQuery: string;
    mapUrl: string;
    photo: string;
    allVenues: VenueDetail[];
  };
  quote: {
    text: string;
    subtext: string;
  };
  rsvp: {
    by: string;
    note: string;
    familyMembers: string[];
    whatsappNumber: string;
    prefilledMessage: string;
    contacts: FamilyContact[];
  };
  music: {
    src: string;
    title: string;
  };
  meta: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
  };
}

const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: 'Deepak Jain',
    bride: 'Shilpi Garg',
    groomShort: 'Deepak',
    brideShort: 'Shilpi',
    monogram: 'S&D',
    groomLineage: 'S/O Smt. Bhumi Jain & Sh. Manik Chand Jain',
    brideLineage: 'D/O Smt. Yashoda Garg & Sh. Ashok Garg',
  },
  blessings: {
    invocation: '॥ श्री गणेशाय नमः ॥',
    elders: 'Under The Blessings of Grand D/O Late Smt. Jagwati Devi & Late Sh. Damodar Dass Garg',
    invitationNote: 'we cordially invite you to the wedding ceremony of our Loving Daughter',
  },
  families: ['Garg', 'Jain'],
  parents: {
    groom: 'Smt. Bhumi Jain & Sh. Manik Chand Jain',
    bride: 'Smt. Yashoda Garg & Sh. Ashok Garg',
  },
  weddingStart: '2026-12-12T20:00:00+05:30', // 8:00 PM Welcome of Barat
  calendarTarget: {
    year: 2026,
    month: 12,
    day: 12,
    monthName: 'DECEMBER 2026',
  },
  events: [
    {
      id: 'haldi-chak',
      name: 'Haldi & Chak',
      dayLabel: 'FRIDAY · 4 DECEMBER 2026',
      date: '4 December 2026',
      isoDate: '2026-12-04T11:00:00+05:30',
      time: '11:00 AM · Haldi | 12:00 PM · Chak',
      endTime: '2026-12-04T13:00:00+05:30',
      venue: 'At Our Residence',
      description: 'A day full of colors, laughter and beautiful traditions. Golden turmeric blessings followed by Chak rituals.',
      iconSrc: '/img/events/haldi.webp',
    },
    {
      id: 'lunch',
      name: 'Festive Lunch',
      dayLabel: 'FRIDAY · 4 DECEMBER 2026',
      date: '4 December 2026',
      isoDate: '2026-12-04T13:00:00+05:30',
      time: '01:00 PM Onwards',
      endTime: '2026-12-04T15:00:00+05:30',
      venue: 'At Our Residence',
      description: 'Join us for a joyful family lunch with authentic festive delicacies.',
      iconSrc: '/img/events/lunch.webp',
    },
    {
      id: 'bhat',
      name: 'Bhat',
      dayLabel: 'FRIDAY · 4 DECEMBER 2026',
      date: '4 December 2026',
      isoDate: '2026-12-04T18:00:00+05:30',
      time: '06:00 PM',
      endTime: '2026-12-04T19:30:00+05:30',
      venue: 'At Our Residence',
      description: 'Warm reception of maternal family (Mama Ji) bearing blessings, love, and traditional shagun.',
      iconSrc: '/img/events/bhaat.webp',
    },
    {
      id: 'mehndi',
      name: 'Mehndi',
      dayLabel: 'FRIDAY · 4 DECEMBER 2026',
      date: '4 December 2026',
      isoDate: '2026-12-04T19:30:00+05:30',
      time: '07:30 PM Onwards',
      endTime: '2026-12-04T23:00:00+05:30',
      venue: 'At Our Residence',
      description: 'An enchanting evening of intricate henna art, joyful music, and celebratory dinner.',
      iconSrc: '/img/events/mehndi.webp',
    },
    {
      id: 'wedding',
      name: 'Shubh Vivah (The Wedding)',
      dayLabel: 'SATURDAY · 12 DECEMBER 2026',
      date: '12 December 2026',
      isoDate: '2026-12-12T20:00:00+05:30',
      time: 'Barat: 8:00 PM · Dinner: 9:00 PM · Doli: Taron ki chhaon mein',
      endTime: '2026-12-13T04:00:00+05:30',
      venue: 'Elegance By Kawatra Tent',
      description: 'Welcome of Barat at 8:00 PM, followed by Dinner at 9:00 PM and sacred Vedic Pheras under the stars. Doli in Taron ki chhaon mein.',
      iconSrc: '/img/events/wedding.webp',
      mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
    },
  ],
  venue: {
    name: 'Elegance By Kawatra Tent',
    subtitle: 'Dinner & Wedding Ceremony (Shubh Vivah)',
    address: 'Mahanagar Telephone Nigam Office, Hari Enclave, Hari Nagar, New Delhi, Delhi, 110064',
    mapQuery: 'Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064',
    mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
    photo: '/img/venue-arch.jpg',
    allVenues: [
      {
        name: 'Elegance By Kawatra Tent',
        purpose: 'Welcome of Barat (8:00 PM) · Dinner (9:00 PM) · Shubh Vivah',
        address: 'Mahanagar Telephone Nigam Office, Hari Enclave, Hari Nagar, New Delhi, Delhi, 110064',
        mapQuery: 'Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064',
        mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
      },
      {
        name: 'Our Residence',
        purpose: 'Haldi · Chak · Lunch · Bhat · Mehndi (4 December 2026)',
        address: 'At Our Residence',
        mapQuery: 'Hari Nagar, New Delhi',
        mapUrl: mapsSearchUrl('Hari Nagar, New Delhi'),
      },
    ],
  },
  quote: {
    text: 'A day full of colors, laughter and beautiful traditions.',
    subtext: 'SHILPI & DEEPAK',
  },
  rsvp: {
    by: '25 November 2026',
    note: 'We can’t wait to celebrate with you ❤️',
    familyMembers: [
      'Mr. Ashok Garg',
      'Mr. Babli Gupta',
      'Mr. Monu Gupta',
      'Mr. Deepak Garg',
      'All Garg Family',
    ],
    whatsappNumber: '7042730361',
    prefilledMessage: 'Dear Shilpi & Deepak, I would love to celebrate with you at your wedding ceremonies!',
    contacts: [
      {
        role: "Bride's Father",
        name: 'Mr. Ashok Garg',
        phone: '+91 7042730361',
      },
      {
        role: "Bride's Family",
        name: 'Mr. Deepak Garg',
        phone: '+91 8130637570',
      },
    ],
  },
  music: {
    src: '/audio/instrumental.mp3?v=5',
    title: 'Sahiba · Jasleen Royal & Stebin Ben',
  },
  meta: {
    title: 'Shilpi & Deepak · 4 & 12 December 2026',
    description: 'We cordially invite you to celebrate the wedding ceremony of our loving daughter Shilpi with Deepak.',
    url: 'https://shilpi-deepak-wedding.onrender.com',
    ogImage: '/og.jpg',
  },
};
