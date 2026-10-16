import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllDevices, getDeviceBySlug } from '@/lib/devices';
import {
  Download,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle,
  ExternalLink,
  Info,
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
      title: 'Mockup Not Found - Mobile Simulator',
      description: 'The requested device mockup was not found.',
    };
  }

  const title = `Free ${device.display_name} Mockup PNG (Transparent Background)`;
  const description = `Download free high-resolution transparent PNG mockup for ${device.display_name}. Accurate hardware bezels, notch, camera cutout, and screen frame ready for Figma, portfolios, and presentations.`;

  return {
    title,
    description,
    keywords: [
      `${device.display_name} mockup`,
      `${device.display_name} transparent png`,
      `${device.display_name} frame download`,
      'free phone mockup',
      'device frame transparent',
      'figma mockup',
      'mobile mockup png',
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
          alt: `${device.display_name} Transparent Mockup PNG`,
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

export default async function MockupDetailPage({ params }: Props) {
  const { slug } = await params;
  const device = getDeviceBySlug(slug);

  if (!device) {
    notFound();
  }

  const mockupFileUrl = `/devices/${device.slug}/device.png`;
  const downloadFileName = `${device.slug}-transparent-mockup.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: `${device.display_name} Transparent Mockup PNG`,
    contentUrl: `https://mobilesimulator.vercel.app${mockupFileUrl}`,
    description: `High-resolution transparent PNG mockup of ${device.display_name} with accurate bezels and screen cutout.`,
    encodingFormat: 'image/png',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-10 py-6 max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#catalog" className="hover:text-indigo-400 transition-colors">
            Mockups
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">{device.display_name} Mockup</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Transparent PNG
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Free
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {device.display_name} Mockup PNG
            </h1>
            <p className="text-slate-400 text-base max-w-2xl">
              High-resolution device frame with transparent screen cutout. Perfect for Figma, Photoshop, portfolio case studies, and responsive design presentations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mockupFileUrl}
              download={downloadFileName}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-base"
            >
              <Download className="w-5 h-5" />
              Download PNG
            </a>
            <Link
              href={`/devices/${device.slug}`}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700 transition-all flex items-center gap-1.5 text-sm"
            >
              <Info className="w-4 h-4 text-slate-400" />
              View Device Specs
            </Link>
          </div>
        </div>

        {/* Mockup Preview on Checkered Transparent Canvas */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Transparent Screen Area & Outer Boundary</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Viewport: {device.viewport.width} &times; {device.viewport.height} px
            </div>
          </div>

          {/* Checkered Canvas */}
          <div className="p-8 sm:p-16 flex items-center justify-center min-h-[500px] sm:min-h-[640px] bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)] bg-[size:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] bg-slate-950">
            <div className="relative max-w-[340px] sm:max-w-[400px] w-full flex items-center justify-center">
              <Image
                src={mockupFileUrl}
                alt={`${device.display_name} Free Mockup`}
                width={420}
                height={840}
                className="w-auto max-h-[580px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>

          {/* Download Action Footer */}
          <div className="p-6 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                No Attribution Required &bull; Commercial & Personal Use
              </div>
              <p className="text-xs text-slate-400">
                Format: 32-bit PNG with alpha transparency channel &bull; Ready to insert into your layouts
              </p>
            </div>

            <a
              href={mockupFileUrl}
              download={downloadFileName}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Free PNG
            </a>
          </div>
        </div>

        {/* Instructions / How To Use */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1</div>
            <h3 className="text-base font-bold text-white">Download Mockup</h3>
            <p className="text-sm text-slate-400">
              Click the download button to save the transparent PNG frame to your computer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Step 2</div>
            <h3 className="text-base font-bold text-white">Place Screenshot</h3>
            <p className="text-sm text-slate-400">
              Drag the mockup frame into Figma or Photoshop, and position your website screenshot on the layer below it.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3</div>
            <h3 className="text-base font-bold text-white">Export & Showcase</h3>
            <p className="text-sm text-slate-400">
              Export your composite graphic for client presentations, landing page banners, or App Store previews.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
