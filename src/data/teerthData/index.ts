import { TeerthDestination } from "../../types";
import { GURUDWARA_DESTINATIONS } from "./gurudwaras";
import { TEMPLE_DESTINATIONS } from "./temples";
import { MORE_TEMPLE_DESTINATIONS } from "./moreTemples";

export const ALL_TEERTH_DESTINATIONS: TeerthDestination[] = [
  ...GURUDWARA_DESTINATIONS,
  ...TEMPLE_DESTINATIONS,
  ...MORE_TEMPLE_DESTINATIONS,
];

export const GURUDWARAS_LIST = GURUDWARA_DESTINATIONS;
export const TEMPLES_LIST = [...TEMPLE_DESTINATIONS, ...MORE_TEMPLE_DESTINATIONS];

export function getDestinationById(id: string): TeerthDestination | undefined {
  return ALL_TEERTH_DESTINATIONS.find((d) => d.id === id);
}

export function searchDestinations(query: string): TeerthDestination[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_TEERTH_DESTINATIONS;
  return ALL_TEERTH_DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.sanctumTitle.toLowerCase().includes(q) ||
      (d.gurmukhiHindiName && d.gurmukhiHindiName.toLowerCase().includes(q))
  );
}
