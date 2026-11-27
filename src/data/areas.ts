export interface ServiceArea {
  slug: string;
  name: string;
  county: string;
  headline: string;
  intro: string;
  focus: string;
  keyword: string;
}

/**
 * Local service-area content. Copy describes the services offered in each
 * market; it makes no claims about past projects in that city.
 */
export const areas: ServiceArea[] = [
  {
    slug: 'boca-raton',
    name: 'Boca Raton',
    county: 'Palm Beach County',
    headline: 'Kitchen Remodeling in Boca Raton',
    intro:
      'Velluto Interiors offers luxury kitchen remodeling, custom cabinetry and interior renovation to homeowners throughout Boca Raton — from waterfront residences to country-club communities.',
    focus: 'Boca Raton homes often call for kitchens that move easily between quiet daily use and generous entertaining. We plan islands, butler’s pantries and beverage stations to suit both.',
    keyword: 'Kitchen Remodeling Boca Raton',
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    county: 'Broward County',
    headline: 'Luxury Kitchen Design in Fort Lauderdale',
    intro:
      'From Las Olas townhomes to Intracoastal estates, Velluto Interiors designs and builds refined kitchens and interiors for Fort Lauderdale homeowners.',
    focus: 'Coastal light, humidity and open-plan living all shape our recommendations — durable finishes, considered ventilation and cabinetry that holds its line for years.',
    keyword: 'Luxury Kitchen Design Fort Lauderdale',
  },
  {
    slug: 'pompano-beach',
    name: 'Pompano Beach',
    county: 'Broward County',
    headline: 'Kitchen Renovation in Pompano Beach',
    intro:
      'Velluto Interiors provides kitchen renovation, cabinetry and bathroom remodeling for homes and condominiums across Pompano Beach.',
    focus: 'For beachside condominiums we plan around building rules, delivery access and work hours, keeping projects orderly and neighbours undisturbed.',
    keyword: 'Kitchen Renovation Pompano Beach',
  },
  {
    slug: 'palm-beach',
    name: 'Palm Beach',
    county: 'Palm Beach County',
    headline: 'Custom Kitchen Cabinets in Palm Beach',
    intro:
      'Velluto Interiors designs custom kitchen cabinetry and complete interiors for Palm Beach residences that call for timeless, tailored craftsmanship.',
    focus: 'Palm Beach interiors reward restraint and quality. We favour classic proportions, inset doors and natural materials that age gracefully.',
    keyword: 'Custom Kitchen Cabinets Palm Beach',
  },
  {
    slug: 'delray-beach',
    name: 'Delray Beach',
    county: 'Palm Beach County',
    headline: 'Kitchen & Interior Renovation in Delray Beach',
    intro: 'Velluto Interiors offers kitchen remodeling, cabinetry and interior renovation for homeowners in Delray Beach and nearby communities.',
    focus: 'We blend relaxed coastal character with crisp detailing, creating kitchens that feel easy to live in and beautifully finished.',
    keyword: 'Kitchen Remodeling Delray Beach',
  },
  {
    slug: 'west-palm-beach',
    name: 'West Palm Beach',
    county: 'Palm Beach County',
    headline: 'Luxury Kitchen Remodeling in West Palm Beach',
    intro: 'Velluto Interiors designs and builds luxury kitchens and custom cabinetry for West Palm Beach homes, from historic neighbourhoods to new construction.',
    focus: 'Whether respecting the character of an older home or finishing a new build, we tailor cabinetry and surfaces to the architecture.',
    keyword: 'Luxury Kitchen Remodeling West Palm Beach',
  },
];
