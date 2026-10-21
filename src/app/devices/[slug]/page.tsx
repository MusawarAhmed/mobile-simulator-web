import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllDevices, getDeviceBySlug } from '@/lib/devices';
import CopyButton from '@/components/CopyButton';
import { CHROME_EXTENSION_URL } from '@/lib/constants';
import {
  Smartphone,
  Monitor,
  Cpu,
  Layers,
  Ratio,
  Maximize2,
  Calendar,
  Download,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Chrome,
  ExternalLink,
} from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const devices = getAllDevices();
  return devices.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const device = getDeviceBySlug(slug);

  if (!device) {
    return {
      title: 'Device Not Found - Mobile Simulator',
      description: 'The requested device was not found in the catalog.',
    };
  }

  const title = `${device.display_name} Screen Size, CSS Viewport & Specs`;
  const description = `View complete responsive specifications for ${device.display_name}: CSS viewport ${device.viewport.width}x${device.viewport.height}px, DPR ${device.devicePixelRatio}, User-Agent string, and download transparent PNG mockup.`;

  return {
    title,
    description,
    keywords: [
      device.display_name,
      `${device.display_name} screen size`,
      `${device.display_name} viewport`,
      `${device.display_name} DPR`,
      `${device.display_name} CSS media query`,
      `${device.display_name} user agent`,
      `${device.display_name} mockup png`,
      'responsive design',
      'mobile simulator',
    ],
    openGraph: {
      title: `${title} | Mobile Simulator`,
      description,
      type: 'article',
      images: [
        {
          url: `/devices/${device.slug}/device.png`,
          width: 600,
          height: 1200,
          alt: `${device.display_name} Mockup Frame`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Mobile Simulator`,
      description,
      images: [`/devices/${device.slug}/device.png`],
    },
  };
}

export default async function DeviceDetailPage({ params }: Props) {
  const { slug } = await params;
  const device = getDeviceBySlug(slug);

  if (!device) {
    notFound();
  }

  const mediaQueryPortrait = `@media only screen 
  and (min-device-width: ${device.viewport.width}px) 
  and (max-device-width: ${device.viewport.width}px) 
  and (-webkit-min-device-pixel-ratio: ${device.devicePixelRatio}) {
  /* ${device.display_name} (Portrait) */
}`;

  const mediaQueryLandscape = `@media only screen 
  and (min-device-width: ${device.viewport.height}px) 
  and (max-device-width: ${device.viewport.height}px) 
  and (-webkit-min-device-pixel-ratio: ${device.devicePixelRatio}) {
  /* ${device.display_name} (Landscape) */
}`;

  const relatedDevices = getAllDevices()
    .filter((d) => d.slug !== device.slug && (d.brand === device.brand || d.category === device.category))
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${device.display_name} Specifications & Responsive Viewport`,
    description: `Complete technical specifications and CSS viewport data for testing responsive web designs on ${device.display_name}.`,
    image: `https://mobilesimulator.vercel.app/devices/${device.slug}/device.png`,
    mainEntity: {
      '@type': 'Product',
      name: device.display_name,
      brand: {
        '@type': 'Brand',
        name: device.brand_label || device.brand,
      },
      category: device.category,
      model: device.name,
      releaseDate: device.release_year ? `${device.release_year}` : undefined,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-10 py-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-indigo-400 transition-colors">
            Devices
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">{device.display_name}</span>
        </nav>

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {device.brand_label || device.brand}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                {device.category}
              </span>
              {device.release_year && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                  {device.release_year}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {device.display_name}
            </h1>
            <p className="text-slate-400 text-base max-w-2xl">
              Complete CSS viewport dimensions, device pixel ratio, physical screen specs, and downloadable high-resolution transparent mockup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
            >
              <Chrome className="w-4 h-4 text-white" />
              <span>Test in Chrome Extension</span>
            </a>
            <Link
              href={`/mockups/${device.slug}`}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Mockup PNG
            </Link>
          </div>
        </div>

        {/* Main Content Grid: Mockup Image + Specs Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Device Frame Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

              <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18] flex items-center justify-center">
                <Image
                  src={`/devices/${device.slug}/device.png`}
                  alt={`${device.display_name} Frame`}
                  width={340}
                  height={680}
                  className="object-contain max-h-[520px] w-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              <div className="relative z-10 mt-6 w-full flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                <span>Transparent PNG</span>
                <span>Frame Ratio: {device.display ? device.display.ratio.toFixed(2) : 'Default'}</span>
                <Link
                  href={`/mockups/${device.slug}`}
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                >
                  Full Preview &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Specs Table & Code Blocks */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                  CSS Viewport
                </div>
                <div className="text-xl font-bold text-white">
                  {device.viewport.width} &times; {device.viewport.height}
                  <span className="text-xs text-slate-500 font-normal ml-1">px</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Monitor className="w-3.5 h-3.5 text-sky-400" />
                  Physical Resolution
                </div>
                <div className="text-xl font-bold text-white">
                  {device.resolution
                    ? `${device.resolution.width} \u00d7 ${device.resolution.height}`
                    : `${device.viewport.width * device.devicePixelRatio} \u00d7 ${device.viewport.height * device.devicePixelRatio}`}
                  <span className="text-xs text-slate-500 font-normal ml-1">px</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Device Pixel Ratio
                </div>
                <div className="text-xl font-bold text-white">
                  @{device.devicePixelRatio}x
                  <span className="text-xs text-slate-500 font-normal ml-1">DPR</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                  Diagonal Screen
                </div>
                <div className="text-xl font-bold text-white">
                  {device.screen ? `${device.screen.inches}"` : 'Standard'}
                  {device.screen?.cm && (
                    <span className="text-xs text-slate-500 font-normal ml-1">({device.screen.cm} cm)</span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Ratio className="w-3.5 h-3.5 text-amber-400" />
                  Aspect Ratio
                </div>
                <div className="text-xl font-bold text-white">
                  {device.screen?.ratio ||
                    `${(device.viewport.height / device.viewport.width).toFixed(2)}:1`}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-rose-400" />
                  Pixel Density
                </div>
                <div className="text-xl font-bold text-white">
                  {device.screen?.ppi || device.pixel_density || Math.round(device.devicePixelRatio * 160)}
                  <span className="text-xs text-slate-500 font-normal ml-1">PPI</span>
                </div>
              </div>
            </div>

            {/* Operating System & Features */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Hardware & System Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60">
                  <span className="text-slate-400">Operating System</span>
                  <span className="text-white font-medium">
                    {device.os.name} {device.os.version}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60">
                  <span className="text-slate-400">Rotation Supported</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    {device.viewport.enableRotation ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      'Fixed'
                    )}
                    {device.viewport.enableRotation ? 'Yes (Portrait & Landscape)' : 'Portrait only'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60">
                  <span className="text-slate-400">Network Simulation</span>
                  <span className="text-white font-medium">{device.features?.network || '4G / 5G / Wi-Fi'}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60">
                  <span className="text-slate-400">Screen Curvature</span>
                  <span className="text-white font-medium">
                    {device.features?.curvedEdges ? 'Curved Edge Display' : 'Flat Display'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Agent String Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Device User-Agent String</h3>
                  <p className="text-xs text-slate-400">
                    Use this string in Chrome DevTools or curl to simulate this exact device.
                  </p>
                </div>
                <CopyButton text={device.ua} label="Copy UA" />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 break-all leading-relaxed select-all">
                {device.ua}
              </div>
            </div>

            {/* CSS Media Query Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">CSS Media Query</h3>
                  <p className="text-xs text-slate-400">
                    Target {device.display_name} precisely with CSS media rules.
                  </p>
                </div>
                <CopyButton text={mediaQueryPortrait} label="Copy CSS" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Portrait Mode
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
                  <code>{mediaQueryPortrait}</code>
                </pre>
              </div>

              {device.viewport.enableRotation && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Landscape Mode
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto leading-relaxed">
                    <code>{mediaQueryLandscape}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Extension Promo Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-900 border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Chrome className="w-3.5 h-3.5" />
              <span>Free Chrome Extension</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Test your website on {device.display_name} in 1 click
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Install the Responsive Viewer extension to simulate {device.display_name}&apos;s {device.viewport.width}&times;{device.viewport.height} viewport and DPR directly on any active browser tab.
            </p>
          </div>
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2 shrink-0 hover:scale-105"
          >
            <Chrome className="w-5 h-5" />
            <span>Install Extension</span>
          </a>
        </div>

        {/* Related Devices */}
        {relatedDevices.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white">Other {device.brand_label || device.brand} Devices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedDevices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/devices/${rel.slug}`}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-indigo-400">{rel.brand_label || rel.brand}</div>
                    <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {rel.display_name}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>{rel.viewport.width} &times; {rel.viewport.height} px</span>
                    <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
