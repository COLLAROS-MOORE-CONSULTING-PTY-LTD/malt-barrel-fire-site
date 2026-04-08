export interface Location {
  name: string;
  slug: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  tradingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  mapUrl: string;
  instagram: string;
  instagramHandle: string;
  heroImage: string;
  menuPdf: string;
}

export const locations: Location[] = [
  {
    name: "Midrand",
    slug: "midrand",
    tagline: "Where the flame was born",
    phone: "011 594 7947",
    email: "info@maltmidrand.co.za",
    address: "Shop 8 Waterfall Walk, Ridge Road, Midrand, 1682",
    hours: "Trading hours coming soon",
    tradingHours: {
      monday: "TBC",
      tuesday: "TBC",
      wednesday: "TBC",
      thursday: "TBC",
      friday: "TBC",
      saturday: "TBC",
      sunday: "TBC",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Malt+Barrel+%26+Fire+Midrand",
    instagram: "https://www.instagram.com/malt_midrand",
    instagramHandle: "@malt_midrand",
    heroImage: "/images/locations/midrand-hero.jpg",
    menuPdf: "/menus/midrand-menu.pdf",
  },
  {
    name: "Silver Lakes",
    slug: "silver-lakes",
    tagline: "Smoke and sophistication on the east side",
    phone: "012 809 3330",
    email: "info@mymalt.co.za",
    address: "Silver Oaks Crossing Shopping Centre, Silver Lakes, Pretoria",
    hours: "Trading hours coming soon",
    tradingHours: {
      monday: "TBC",
      tuesday: "TBC",
      wednesday: "TBC",
      thursday: "TBC",
      friday: "TBC",
      saturday: "TBC",
      sunday: "TBC",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Malt+Barrel+%26+Fire+Silver+Lakes+Pretoria",
    instagram: "https://www.instagram.com/malt_silverlakes",
    instagramHandle: "@malt_silverlakes",
    heroImage: "/images/locations/silver-lakes-hero.jpg",
    menuPdf: "/menus/silverlakes-queenswood-menu.pdf",
  },
  {
    name: "Queenswood",
    slug: "queenswood",
    tagline: "Fire-forged flavour in the heart of Pretoria",
    phone: "078 151 7059",
    email: "qc@mymalt.co.za",
    address: "Queens Corner Shopping Centre, Queenswood, Pretoria",
    hours: "Trading hours coming soon",
    tradingHours: {
      monday: "TBC",
      tuesday: "TBC",
      wednesday: "TBC",
      thursday: "TBC",
      friday: "TBC",
      saturday: "TBC",
      sunday: "TBC",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Malt+Barrel+%26+Fire+Queenswood+Pretoria",
    instagram: "https://www.instagram.com/malt_queenswood",
    instagramHandle: "@malt_queenswood",
    heroImage: "/images/locations/queenswood-hero.jpg",
    menuPdf: "/menus/silverlakes-queenswood-menu.pdf",
  },
  {
    name: "Monte Casino",
    slug: "monte-casino",
    tagline: "Premium dining meets nightlife energy",
    phone: "011 465 1625",
    email: "info@maltmonte.co.za",
    address: "Montecasino Piazza, Fourways, Gauteng",
    hours: "Trading hours coming soon",
    tradingHours: {
      monday: "TBC",
      tuesday: "TBC",
      wednesday: "TBC",
      thursday: "TBC",
      friday: "TBC",
      saturday: "TBC",
      sunday: "TBC",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Malt+Barrel+%26+Fire+Montecasino+Fourways",
    instagram: "https://www.instagram.com/malt_montecasino",
    instagramHandle: "@malt_montecasino",
    heroImage: "/images/locations/monte-casino-hero.jpg",
    menuPdf: "/menus/montecasino-menu.pdf",
  },
];
