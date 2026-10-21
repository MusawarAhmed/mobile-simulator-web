import Link from 'next/link';
import { getAllDevices } from '@/lib/devices';
import DeviceCatalog from '@/components/DeviceCatalog';
import { Smartphone, Monitor, ShieldCheck, Download, Code2, Sparkles, ArrowRight, Chrome, Star, CheckCircle2 } from 'lucide-react';
import { CHROME_EXTENSION_URL } from '@/lib/constants';

export default function HomePage() {
  const allDevices = getAllDevices();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Responsive Viewer — Mobile & Tablet Simulator',
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best free Responsive Viewer and Mobile Simulator for Google Chrome?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Responsive Viewer — Mobile & Tablet Simulator is the premier free Google Chrome extension for testing responsive web design. It features 77+ physical device frames (iPhone, Samsung Galaxy, Google Pixel, iPad, foldables) with authentic CSS viewports, DPR, transparent mockup exports, and local file testing with zero ads or subscriptions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test mobile and tablet viewports in Chrome?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install the free Responsive Viewer extension from the Chrome Web Store, click the extension icon on any active browser tab, and select from 77+ mobile phones, tablets, or desktop screen sizes to instantly simulate mobile responsive layouts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Responsive Viewer completely free without paywalls or subscriptions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Unlike other mobile simulators that place new devices or mockup downloads behind monthly paid plans, Responsive Viewer is 100% free and unlocked with zero paywalls.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Responsive Viewer support localhost and local HTML files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Responsive Viewer natively supports localhost:3000, 127.0.0.1, Vite, React, Next.js, and local file:/// HTML files when file permissions are enabled.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                href={CHROME_EXTENSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-sky-500 via-indigo-600 to-indigo-700 hover:from-sky-400 hover:to-indigo-600 text-white shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center gap-2.5"
              >
                <Chrome className="w-5 h-5 text-white" />
                <span>Add to Chrome — Free Extension</span>
              </a>
              <a
                href="#catalog"
                className="px-6 py-3.5 rounded-xl font-medium bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-2"
              >
                Browse All 77 Devices
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/support/activate-local-files"
                className="px-6 py-3.5 rounded-xl font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
              >
                Local File Testing
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

        {/* Direct Extension Download Banner */}
        <section id="download" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-900/40 via-indigo-950 to-slate-900 p-8 sm:p-12 border border-sky-500/30">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Free on the Official Google Chrome Web Store</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Get Responsive Viewer for Google Chrome
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Test your websites directly in your browser with 1-click simulator toggling, instant orientation flipping, screenshot capture, screencast recording, and full media queries support.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={CHROME_EXTENSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-sky-500 via-indigo-600 to-indigo-700 hover:from-sky-400 hover:to-indigo-600 text-white shadow-xl shadow-sky-500/25 transition-all hover:scale-105 flex items-center gap-3"
              >
                <Chrome className="w-6 h-6 text-white" />
                <span>Add to Chrome — It&apos;s 100% Free</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Ads or Paywalls</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>77+ Verified Devices</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Works on Localhost & File URLs</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
