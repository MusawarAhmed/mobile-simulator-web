import { MetadataRoute } from 'next';
import { getAllDevices } from '@/lib/devices';
import { getAllSupportArticles } from '@/data/supportArticles';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable or fallback to production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mobilesimulator.vercel.app';
  const currentDate = new Date();

  const devices = getAllDevices();
  const supportArticles = getAllSupportArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const deviceRoutes: MetadataRoute.Sitemap = devices.map((d) => ({
    url: `${baseUrl}/devices/${d.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const mockupRoutes: MetadataRoute.Sitemap = devices.map((d) => ({
    url: `${baseUrl}/mockups/${d.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const supportRoutes: MetadataRoute.Sitemap = supportArticles.map((a) => ({
    url: `${baseUrl}/support/${a.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...deviceRoutes, ...mockupRoutes, ...supportRoutes];
}
