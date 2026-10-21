import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  getAllSupportArticles,
  getSupportArticleBySlug,
} from '@/data/supportArticles';
import { CHROME_EXTENSION_URL } from '@/lib/constants';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Share2,
  Chrome,
} from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllSupportArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getSupportArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found - Mobile Simulator',
      description: 'The requested support guide was not found.',
    };
  }

  return {
    title: `${article.title} - Mobile Simulator Support`,
    description: article.summary,
    openGraph: {
      title: `${article.title} - Mobile Simulator Support`,
      description: article.summary,
      type: 'article',
    },
  };
}

export default async function SupportDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getSupportArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.summary,
    step: article.content.steps?.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: s.description,
      position: s.step,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-10 py-6 max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/support" className="hover:text-indigo-400 transition-colors">
            Support
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium truncate">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {article.updatedAt}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {article.title}
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Overview */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-base">
          {article.content.overview}
        </div>

        {/* Step by Step Guide */}
        {article.content.steps && article.content.steps.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Step-by-Step Instructions</h2>

            <div className="space-y-6">
              {article.content.steps.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative pl-14 sm:pl-16"
                >
                  <div className="absolute left-4 sm:left-5 top-6 w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-indigo-600/30">
                    {step.step}
                  </div>

                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {step.code && (
                    <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed mt-2">
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notes */}
        {article.content.notes && article.content.notes.length > 0 && (
          <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Important Tips & Best Practices</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              {article.content.notes.map((note, idx) => (
                <li key={idx} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Frequently Asked Questions */}
        {article.content.faq && article.content.faq.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {article.content.faq.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-base">{item.q}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Help Box */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div>
            <div className="text-white font-bold text-sm">Need the extension to get started?</div>
            <p className="text-xs text-slate-400">Download Responsive Viewer free from Google Chrome Web Store.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Chrome className="w-3.5 h-3.5" />
              <span>Get Chrome Extension</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              Report an Issue
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              All Guides
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
