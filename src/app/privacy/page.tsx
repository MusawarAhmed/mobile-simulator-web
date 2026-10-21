import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — Responsive Viewer — Mobile & Tablet Simulator',
  description: 'Privacy Policy for Responsive Viewer — Mobile & Tablet Simulator Chrome Extension and Web Platform.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 17, 2026';

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-10 text-slate-300">
      <div className="space-y-3 border-b border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Security Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: {lastUpdated} &bull; Applies to Responsive Viewer Chrome Extension and Website
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base leading-relaxed">
        {/* Core Principles */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            1. Zero Personal Data Collection
          </h2>
          <p>
            Responsive Viewer — Mobile & Tablet Simulator is designed with a strict privacy-first architecture. We do <strong>not</strong> collect, store, sell, or transmit any personally identifiable information (PII), browsing history, keystrokes, form submissions, or account credentials.
          </p>
          <p>
            All website responsive rendering, viewport simulation, device orientation changes, and media query inspections occur <strong>100% locally</strong> inside your browser sandbox.
          </p>
        </section>

        {/* Permissions Justification */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-sky-400" />
            2. Chrome Extension Permissions & Why They Are Needed
          </h2>
          <p className="text-slate-400 text-sm">
            Our extension requests minimal permissions required strictly to perform device emulation and viewport testing:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-semibold text-white font-mono text-xs text-sky-400">activeTab & tabs</span>
              <p className="text-xs text-slate-300">
                Used solely to capture the active tab URL and display it inside the simulated mobile viewport iframe.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-semibold text-white font-mono text-xs text-sky-400">webRequest & declarativeNetRequest</span>
              <p className="text-xs text-slate-300">
                Used to spoof User-Agent headers and modify Content-Security-Policy headers so iframes can preview websites locally without frame-busting restrictions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-semibold text-white font-mono text-xs text-sky-400">tabCapture & offscreen</span>
              <p className="text-xs text-slate-300">
                Used exclusively when you click &quot;Record Screencast&quot; or &quot;Take Screenshot&quot; to capture video/images of the simulated device. Files are saved directly to your local downloads folder.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-semibold text-white font-mono text-xs text-sky-400">storage</span>
              <p className="text-xs text-slate-300">
                Used only in <code>chrome.storage.local</code> to remember your selected device, zoom level, orientation, and theme preferences across sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Third Party Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-400" />
            3. Third-Party Services & Analytics
          </h2>
          <p>
            The extension operates offline and locally without third-party tracking cookies or advertising networks. We do not track websites you visit, URLs you test, or test session content.
          </p>
        </section>

        {/* Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            4. User Rights & Data Deletion
          </h2>
          <p>
            Because we do not store any personal data on external servers, uninstalling the extension or clearing your browser cache immediately removes all local settings, saved mockups, and configuration data permanently.
          </p>
        </section>

        {/* Contact */}
        <section className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <h2 className="text-base font-bold text-white">Contact & Inquiries</h2>
          <p className="text-sm">
            If you have questions regarding this Privacy Policy or data security practices, please contact us via our{' '}
            <Link href="/contact" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
              Contact & Feedback page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
