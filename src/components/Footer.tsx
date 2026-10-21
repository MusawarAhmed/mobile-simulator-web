import Link from 'next/link';
import { Smartphone, Chrome, ExternalLink } from 'lucide-react';
import { CHROME_EXTENSION_URL, BLUEPRINT_SEO_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <Smartphone className="w-4 h-4" />
            </div>
            <span>Responsive Viewer</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The free, standalone responsive testing tool for developers and designers. Test on 77+ mobile phones, tablets, foldables, and computers with 100% unlocked features.
          </p>
          <div className="pt-2">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-all"
            >
              <Chrome className="w-3.5 h-3.5" />
              <span>Get Chrome Extension</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Popular Devices</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/devices/apple-iphone-18-pro-2026" className="hover:text-white transition-colors">iPhone 18 Pro Viewport</Link></li>
            <li><Link href="/devices/google-pixel-10-pro-fold-2026" className="hover:text-white transition-colors">Pixel 10 Pro Fold</Link></li>
            <li><Link href="/devices/samsung-galaxy-s26-ultra-2026" className="hover:text-white transition-colors">Galaxy S26 Ultra</Link></li>
            <li><Link href="/devices/apple-macbook-neo-2026" className="hover:text-white transition-colors">MacBook Neo 2026</Link></li>
            <li><Link href="/devices/apple-iphone-duo-unfolded-2026" className="hover:text-white transition-colors">iPhone Duo (Unfolded)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Mockups & PNGs</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/mockups/apple-iphone-18-pro-2026" className="hover:text-white transition-colors">iPhone 18 Pro Transparent PNG</Link></li>
            <li><Link href="/mockups/google-pixel-10-pro-2026" className="hover:text-white transition-colors">Pixel 10 Pro PNG Frame</Link></li>
            <li><Link href="/mockups/samsung-galaxy-s24-ultra-2024" className="hover:text-white transition-colors">Galaxy S24 Ultra Mockup</Link></li>
            <li><Link href="/mockups/apple-macbook-pro-16-2021" className="hover:text-white transition-colors">MacBook Pro 16 Mockup</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Extensions & Guides</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href={CHROME_EXTENSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-sky-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <Chrome className="w-3.5 h-3.5 text-sky-400" />
                <span>Responsive Viewer Extension</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-normal">Live</span>
              </a>
            </li>
            <li>
              <a
                href={BLUEPRINT_SEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors flex items-center gap-1"
              >
                <span>Blue Print SEO Extension</span> &rarr;
              </a>
            </li>
            <li><Link href="/support/activate-local-files" className="hover:text-white transition-colors">Test Local Files (file:///)</Link></li>
            <li><Link href="/support/media-queries-not-working" className="hover:text-white transition-colors">Media Queries Troubleshooting</Link></li>
            <li><Link href="/support/activate-shortcut" className="hover:text-white transition-colors">Keyboard Hotkeys Setup</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Report a Bug / Suggestion</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} Responsive Viewer — Mobile & Tablet Simulator. Open responsive web testing suite. Zero tracking, zero ads.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/support" className="hover:text-slate-300 transition-colors">Documentation</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">Feedback</Link>
        </div>
      </div>
    </footer>
  );
}
