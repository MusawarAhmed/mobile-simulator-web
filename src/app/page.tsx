import Link from 'next/link';
import { getAllDevices } from '@/lib/devices';
import DeviceCatalog from '@/components/DeviceCatalog';
import { Smartphone, Monitor, ShieldCheck, Download, Code2, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const allDevices = getAllDevices();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mobile Simulator & Responsive Tester',
    operatingSystem: 'Windows, macOS, Linux, Chrome OS',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Test mobile responsive design on 77+ real smartphone, tablet, laptop, and foldable mockups with accurate CSS viewports, DPR, and user agents.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1240',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-16 py-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 p-8 sm:p-14 border border-slate-800 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>All 77+ Mobile & Tablet Devices Unlocked</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Test Any Website on Realistic{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
                Mobile & Tablet Screens
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Accurate CSS viewports, device pixel ratios, user-agent spoofing, and high-resolution transparent mockups for web developers & designers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#catalog"
                className="px-6 py-3 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                Browse All 77 Devices
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/support/activate-local-files"
                className="px-6 py-3 rounded-xl font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                Setup Local File Testing
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-extrabold text-white">77+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Real Devices</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Free & Unlocked</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-sky-400">1-Click</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Mockup PNGs</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400">Accurate</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">DPR & Viewports</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Faithful Device Frames</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every device includes transparent high-DPI bezels, notches, punch holes, and foldable hinges matching physical hardware.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Accurate CSS Viewports</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Inspect viewport widths, heights, physical pixel ratios, and CSS media queries. Copy exact User-Agent strings in one click.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Transparent Mockup Downloads</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Export and download high-resolution transparent PNG mockups ready for presentation decks, Figma, portfolios, and client previews.
            </p>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="pt-4">
          <DeviceCatalog initialDevices={allDevices} />
        </section>
      </div>
    </>
  );
}
