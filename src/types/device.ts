export interface Device {
  slug: string;
  name: string;
  full_name: string;
  display_name: string;
  brand: string;
  brand_label: string;
  category: string;
  spec_category: string;
  release_year: number | null;
  pixel_density: number;
  devicePixelRatio: number;
  resolution: {
    width: number;
    height: number;
  } | null;
  screen: {
    inches: number;
    cm: number;
    ppi: number;
    ratio: string;
  } | null;
  viewport: {
    width: number;
    height: number;
    left: number;
    top: number;
    enableRotation: boolean;
  };
  os: {
    name: string;
    version: string;
  };
  features: {
    keyboard: boolean;
    network: string;
    curvedEdges: boolean;
  };
  display: {
    shadow: boolean;
    maxHeight: number;
    ratio: number;
  } | null;
  ua: string;
  order: number;
}
