import Link from 'next/link';
import { Metadata } from 'next';
import { getAllSupportArticles } from '@/data/supportArticles';
import { CHROME_EXTENSION_URL } from '@/lib/constants';
import {
  HelpCircle,
  FileCode,
  Sliders,
  Shield,
  Layers,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Chrome,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center & Documentation - Mobile Simulator',
  description:
    'Guides, troubleshooting, and tutorials for Mobile Simulator & Responsive Tester. Learn how to test local files, fix viewport media queries, and configure shortcuts.',
};

export default function SupportIndexPage() {
  const articles = getAllSupportArticles();

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          Documentation & Guides
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          How can we help you?
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Find step-by-step solutions for testing local files, troubleshooting responsive media queries, and configuring keyboard shortcuts.
        </p>
        <div className="pt-2">
          <a
            href={CHROME_EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 transition-all hover:scale-105"
          >
            <Chrome className="w-4 h-4 text-white" />
            <span>Install Extension from Chrome Web Store</span>
          </a>
        </div>
      </div>

      {/* Quick Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FileCode className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Local Testing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure Chrome permissions to test local files (file:/// protocol) directly in the simulator.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Media Queries & CSS</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fix issues where desktop layout displays on mobile or media queries do not trigger.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Incognito & Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enable private browsing mode testing and custom browser keyboard hotkeys.
          </p>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">All Support Guides</h2>
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/support/${article.slug}`}
              className="p-6 rounded-2xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-400">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform self-end sm:self-center shrink-0">
                <span>Read Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Need more help banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">Still have questions or found a bug?</h3>
          <p className="text-sm text-slate-400">
            Send us feedback or report an issue and our team will get back to you promptly.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg transition-all flex items-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          Contact Support
        </Link>
      </div>
    </div>
  );
}
