export interface Service {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  includes: string[];
  image: string;
  imageAlt: string;
  keywords: string;
}

const img = (n: string) => `/images/samples/${n}.svg`;

export const services: Service[] = [
  {
    slug: 'luxury-kitchen-remodeling',
    number: '01',
    title: 'Luxury Kitchen Remodeling',
    summary: 'Complete kitchen transformations, from first sketch to final polish.',
    description:
      'A full-scope remodel managed as one cohesive commission. We study how you cook, gather and entertain, then design and build a kitchen that answers to all of it — with layout, cabinetry, surfaces, lighting and appliances resolved together rather than in isolation.',
    includes: ['Design consultation and site measure', 'Layout reconfiguration', 'Cabinetry, surfaces and fixtures', 'Coordinated trades and project management', 'Final detailing and walkthrough'],
    image: img('kitchen-noir'),
    imageAlt: 'Sample illustration of a charcoal luxury kitchen with brass pendants and a stone island',
    keywords: 'luxury kitchen remodeling South Florida',
  },
  {
    slug: 'custom-kitchen-cabinetry',
    number: '02',
    title: 'Custom Kitchen Cabinetry',
    summary: 'Cabinetry specified to the millimetre and finished by hand.',
    description:
      'Cabinetry is the architecture of a kitchen. We specify door profiles, species, finishes, interior fittings and hardware to suit the proportions of your room, producing storage that is as considered inside as it is beautiful outside.',
    includes: ['Door profile and finish selection', 'Interior organisation and fittings', 'Integrated appliance panels', 'Hardware curation', 'Pantry and tall-unit planning'],
    image: img('craft-detail'),
    imageAlt: 'Sample illustration of walnut cabinet door profiles with brass pulls',
    keywords: 'custom kitchen cabinets Palm Beach',
  },
  {
    slug: 'kitchen-design-space-planning',
    number: '03',
    title: 'Kitchen Design & Space Planning',
    summary: 'Measured plans that make every square foot work beautifully.',
    description:
      'Before anything is built, everything is drawn. Our design phase establishes circulation, work zones, sightlines and storage, and produces the plans and elevations that guide every trade on site.',
    includes: ['Existing-conditions survey', 'Space plans and elevations', 'Material and finish boards', 'Lighting and electrical layout', 'Budget alignment'],
    image: img('space-plan'),
    imageAlt: 'Sample kitchen space plan drawing on a dark background',
    keywords: 'luxury kitchen design Fort Lauderdale',
  },
  {
    slug: 'cabinet-installation',
    number: '04',
    title: 'Cabinet Installation',
    summary: 'Precise, level, perfectly aligned installation.',
    description:
      'Fine cabinetry deserves fine installation. Our installers scribe, shim and align every unit so that reveals are consistent, doors close true and fillers disappear — the details that separate a good kitchen from an exceptional one.',
    includes: ['Site preparation and protection', 'Scribing to walls and ceilings', 'Consistent reveals and door alignment', 'Hardware installation', 'Final adjustment and cleaning'],
    image: img('kitchen-ivory'),
    imageAlt: 'Sample illustration of ivory cabinetry with a walnut island',
    keywords: 'custom cabinet installation South Florida',
  },
  {
    slug: 'countertops-backsplashes',
    number: '05',
    title: 'Countertops & Backsplashes',
    summary: 'Natural stone and engineered surfaces, templated and fitted with care.',
    description:
      'Surfaces set the mood of a kitchen. We guide material selection, coordinate templating, edge profiles and seam placement, and integrate backsplashes so the stone reads as a continuous, deliberate composition.',
    includes: ['Material selection guidance', 'Templating coordination', 'Edge profiles and seam planning', 'Full-height and slab backsplashes', 'Sink and cooktop integration'],
    image: img('kitchen-walnut'),
    imageAlt: 'Sample illustration of a walnut kitchen with a dark stone backsplash',
    keywords: 'kitchen countertops Boca Raton',
  },
  {
    slug: 'kitchen-lighting-finishing',
    number: '06',
    title: 'Kitchen Lighting & Finishing',
    summary: 'Layered light and finishing details that complete the room.',
    description:
      'Light shapes how a kitchen feels at every hour. We plan ambient, task and accent lighting alongside the final finishing details — trim, paint, hardware and fixtures — so the room feels resolved from every angle.',
    includes: ['Layered lighting plans', 'Under-cabinet and interior lighting', 'Pendant and fixture selection', 'Trim and paint finishing', 'Hardware and accessory installation'],
    image: img('hero-kitchen'),
    imageAlt: 'Sample illustration of brass pendant lights glowing above a kitchen island',
    keywords: 'kitchen lighting design South Florida',
  },
  {
    slug: 'bathroom-renovations',
    number: '07',
    title: 'Bathroom Renovations',
    summary: 'Spa-calibre bathrooms with the same precision as our kitchens.',
    description:
      'We bring our cabinetry and detailing discipline to primary suites and guest baths — floating vanities, stone surfaces, curated fixtures and lighting designed for calm, everyday luxury.',
    includes: ['Vanity design and cabinetry', 'Stone and tile selection', 'Fixture and fitting curation', 'Shower and tub planning', 'Lighting and mirrors'],
    image: img('bath-ivory'),
    imageAlt: 'Sample illustration of an ivory stone bathroom with freestanding tub and round mirrors',
    keywords: 'luxury bathroom renovation Boca Raton',
  },
  {
    slug: 'custom-closets-storage',
    number: '08',
    title: 'Custom Closets & Storage',
    summary: 'Dressing rooms and storage designed around your collection.',
    description:
      'From walk-in dressing rooms to pantries, mudrooms and media walls, we design storage that brings order and quiet luxury to every part of the home.',
    includes: ['Walk-in closets and dressing rooms', 'Closet islands and display', 'Pantries and mudrooms', 'Integrated lighting', 'Built-ins throughout the home'],
    image: img('closet-walnut'),
    imageAlt: 'Sample illustration of a walnut dressing room with a central island',
    keywords: 'custom closets South Florida',
  },
  {
    slug: 'complete-interior-renovations',
    number: '09',
    title: 'Complete Interior Renovations',
    summary: 'Whole-home interiors delivered with one design vision.',
    description:
      'When a project extends beyond a single room, we coordinate the complete interior — kitchens, baths, built-ins, flooring, lighting and finishes — so the entire home shares one coherent architectural language.',
    includes: ['Whole-home design direction', 'Multi-room scheduling', 'Flooring, millwork and finishes', 'Trade coordination', 'Single point of contact'],
    image: img('interior-ivory'),
    imageAlt: 'Sample illustration of a renovated living space with floor-to-ceiling windows',
    keywords: 'interior renovation Palm Beach',
  },
];

export const serviceOptions = services.map((s) => s.title);
