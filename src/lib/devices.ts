import devicesData from '@/data/devices.json';
import { Device } from '@/types/device';

export const devices: Device[] = devicesData as Device[];

export function getAllDevices(): Device[] {
  return devices;
}

export function getDeviceBySlug(slug: string): Device | undefined {
  return devices.find((d) => d.slug === slug);
}

export function getDevicesByCategory(category: string): Device[] {
  if (category === 'all') return devices;
  return devices.filter((d) => d.category.toLowerCase() === category.toLowerCase() || d.brand.toLowerCase() === category.toLowerCase());
}

export function getBrandCategories(): string[] {
  return ['all', 'apple', 'samsung', 'google', 'xiaomi', 'tablet', 'others'];
}
