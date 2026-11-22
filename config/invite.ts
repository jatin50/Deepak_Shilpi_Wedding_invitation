export interface WeddingEvent {
  id: string;
  name: string;
  dayLabel: string;
  date: string;
  isoDate: string; // ISO string for calendar generator
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
  weddingStart: string; // ISO with +05:30
  calendarTarget: {
    year: number;
    month: number; // 1-12
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
    monogram: 'D&S',
    groomLineage: 'S/O Smt. Bhumi Jain & Sh. Manik Chand Jain',
    brideLineage: 'D/O Smt. Yashoda Garg & Sh. Ashok Garg',
  },
  blessings: {
    invocation: '॥ श्री महावीराय नमः ॥',
    elders: 'Under The Blessings of Late Smt. Tara Bai Jain & Late Sh. Shyam Lal Jain',
    invitationNote: 'we cordially invite you to the wedding ceremony of our Son',
  },
  families: ['Jain', 'Garg'],
  parents: {
    groom: 'Smt. Bhumi Jain & Sh. Manik Chand Jain',
    bride: 'Smt. Yashoda Garg & Sh. Ashok Garg',
  },
  weddingStart: '2026-12-12T21:00:00+05:30', // 9:00 PM Dinner & Wedding Ceremony
  calendarTarget: {
    year: 2026,
    month: 12,
    day: 12,
    monthName: 'DECEMBER 2026',
  },
  events: [
    {
      id: 'haldi-mehndi',
      name: 'Haldi & Mehndi',
      dayLabel: 'FRIDAY · 11 DECEMBER 2026',
      date: '11 December 2026',
      isoDate: '2026-12-11T11:00:00+05:30',
      time: '11:00 AM Onwards · Lunch at 1:00 PM',
      endTime: '2026-12-11T16:00:00+05:30',
      venue: 'Casa Royal Banquet, Mayapuri, New Delhi',
      description: 'An auspicious morning filled with golden turmeric blessings, fragrant henna, music, and lunch.',
      iconSrc: '/img/events/haldi.webp',
      mapUrl: mapsSearchUrl('Casa Royal Banquet, Mayapuri, New Delhi'),
    },
    {
      id: 'bhaat',
      name: 'Bhaat',
      dayLabel: 'SATURDAY · 12 DECEMBER 2026',
      date: '12 December 2026',
      isoDate: '2026-12-12T11:00:00+05:30',
      time: '11:00 AM',
      endTime: '2026-12-12T14:00:00+05:30',
      venue: 'At Our Residence',
      description: 'Auspicious maternal blessings welcoming maternal uncles (Mama Ji) and family with joy and rituals.',
      iconSrc: '/img/events/bhaat.webp',
    },
    {
      id: 'ghud-chadi',
      name: 'Ghud Chadi',
      dayLabel: 'SATURDAY · 12 DECEMBER 2026',
      date: '12 December 2026',
      isoDate: '2026-12-12T18:00:00+05:30',
      time: '6:00 PM',
      endTime: '2026-12-12T19:30:00+05:30',
      venue: 'At Our Residence',
      description: 'The auspicious horse-mounting ritual with sehra bandi, family dance, and elders’ blessings.',
      iconSrc: '/img/events/ghodi.webp',
    },
    {
      id: 'barat',
      name: 'Departure Of Barat',
      dayLabel: 'SATURDAY · 12 DECEMBER 2026',
      date: '12 December 2026',
      isoDate: '2026-12-12T20:00:00+05:30',
      time: '8:00 PM',
      endTime: '2026-12-12T21:00:00+05:30',
      venue: 'GoalChakkar, Beri Wala Bagh, Hari Nagar',
      description: 'The Barat procession begins with joyous beats of dhol, dancing, and royal celebration towards the venue.',
      iconSrc: '/img/events/sangeet.webp',
      mapUrl: mapsSearchUrl('Gol Chakkar, Beri Wala Bagh, Hari Nagar, New Delhi 110064'),
    },
    {
      id: 'wedding-dinner',
      name: 'Dinner & Wedding Ceremony',
      dayLabel: 'SATURDAY · 12 DECEMBER 2026',
      date: '12 December 2026',
      isoDate: '2026-12-12T21:00:00+05:30',
      time: '9:00 PM Onwards',
      endTime: '2026-12-13T02:00:00+05:30',
      venue: "Kawatra's Elegance, Hari Enclave, Hari Nagar",
      description: 'Varmala, Royal Dinner & the sacred Seven Pheras as Deepak & Shilpi unite in holy matrimony.',
      iconSrc: '/img/events/wedding.webp',
      mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
    },
  ],
  venue: {
    name: "Kawatra's Elegance",
    subtitle: 'Main Wedding & Reception Venue',
    address: 'Hari Enclave, Hari Nagar, New Delhi - 110064',
    mapQuery: 'Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064',
    mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
    photo: '/img/venue-arch.jpg',
    allVenues: [
      {
        name: "Kawatra's Elegance",
        purpose: 'Dinner & Wedding Ceremony (Shubh Vivah)',
        address: 'Hari Enclave, Hari Nagar, New Delhi - 110064',
        mapQuery: 'Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064',
        mapUrl: mapsSearchUrl('Elegance By Kawatra Tent, Hari Enclave, Hari Nagar, New Delhi 110064'),
      },
      {
        name: 'Casa Royal Banquet',
        purpose: 'Haldi & Mehndi · Mayapuri',
        address: 'Mayapuri, New Delhi',
        mapQuery: 'Casa Royal Banquet, Mayapuri, New Delhi',
        mapUrl: mapsSearchUrl('Casa Royal Banquet, Mayapuri, New Delhi'),
      },
      {
        name: 'GoalChakkar, Beri Wala Bagh',
        purpose: 'Barat Departure · Hari Nagar',
        address: 'Beri Wala Bagh, Hari Nagar, New Delhi',
        mapQuery: 'Gol Chakkar, Beri Wala Bagh, Hari Nagar, New Delhi 110064',
        mapUrl: mapsSearchUrl('Gol Chakkar, Beri Wala Bagh, Hari Nagar, New Delhi 110064'),
      },
    ],
  },
  quote: {
    text: 'Seven steps, one forever.',
    subtext: 'DEEPAK & SHILPI',
  },
  rsvp: {
    by: '25 November 2026',
    note: 'We can’t wait to celebrate with you ❤️',
    familyMembers: [
      'P.D Jain',
      'Manik Chand Jain',
      'Abhishek Jain',
      'And all Jain family',
    ],
    whatsappNumber: '919717508075',
    prefilledMessage: 'Dear Deepak & Shilpi, I would love to celebrate with you at your wedding on 11th & 12th December!',
    contacts: [
      {
        role: "Groom's Father",
        name: 'Manik Chand Jain',
        phone: '+91 9717508075',
      },
      {
        role: "Groom's Family",
        name: 'Abhishek Jain',
        phone: '+91 9717457062',
      },
    ],
  },
  music: {
    src: '/audio/instrumental.mp3?v=5',
    title: 'Sahiba · Jasleen Royal & Stebin Ben',
  },
  meta: {
    title: 'Deepak & Shilpi · 11 & 12 December 2026',
    description: 'We invite you to celebrate the wedding ceremonies of Deepak Jain & Shilpi Garg in Hari Nagar & Mayapuri, New Delhi.',
    url: 'https://deepak-shilpi-wedding.onrender.com',
    ogImage: '/og.jpg',
  },
};
