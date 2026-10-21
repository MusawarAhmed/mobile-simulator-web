import Link from 'next/link';
import { Smartphone, Download, HelpCircle, MessageSquare, Chrome } from 'lucide-react';
import { CHROME_EXTENSION_URL } from '@/lib/constants';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-white group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Smartphone className="w-5 h-5" />
          </div>
          <span className="tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Responsive Viewer
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Simulator
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#catalog" className="hover:text-white transition-colors">
            Devices (77)
          </Link>
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <Chrome className="w-4 h-4 text-sky-400" />
            Chrome Extension
          </a>
          <Link href="/support" className="hover:text-white transition-colors flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            Support & Guides
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            Feedback
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all hover:shadow-sky-500/30 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Install Extension</span>
          </a>
        </div>
      </div>
    </header>
  );
}
