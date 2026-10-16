'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  MessageSquare,
  Bug,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') || '';
  const errorParam = searchParams.get('error') || '';
  const keyParam = searchParams.get('key') || '';

  const [inquiryType, setInquiryType] = useState('bug');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (source.includes('bug') || source.includes('screencast') || source.includes('screenshot')) {
      setInquiryType('bug');
      if (source.includes('screencast')) {
        setSubject(`Screencast recording issue ${keyParam ? `(${keyParam})` : ''}`);
      } else if (source.includes('screenshot')) {
        setSubject(`Screenshot capture issue ${keyParam ? `(${keyParam})` : ''}`);
      } else {
        setSubject('Bug Report');
      }
      if (errorParam) {
        setMessage(`Error code/details: ${errorParam}\n\nPlease describe what happened: `);
      }
    } else if (source.includes('suggestion')) {
      setInquiryType('feature');
      setSubject('Device / Feature Suggestion');
    } else if (source.includes('review')) {
      setInquiryType('feedback');
      setSubject('User Feedback & Review');
    }
  }, [source, errorParam, keyParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Thank you for reaching out!</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Your message has been received. Our team will review your feedback and get back to you if follow-up is needed.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Inquiry Type Radio / Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Topic / Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'bug', label: 'Bug Report', icon: Bug },
            { id: 'feature', label: 'Feature Idea', icon: Sparkles },
            { id: 'device', label: 'Request Device', icon: MessageSquare },
            { id: 'feedback', label: 'General / Other', icon: HelpCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = inquiryType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setInquiryType(item.id)}
                className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto detected error banner */}
      {errorParam && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Diagnostic Code Attached: </span>
            <code>{errorParam}</code>
            {keyParam && <span> (Target: {keyParam})</span>}
          </div>
        </div>
      )}

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Your Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Subject
        </label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief description of your feedback or issue"
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Details / Description
        </label>
        <textarea
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Provide any helpful context, reproduction steps, or suggested features..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-sm"
      >
        <Send className="w-4 h-4" />
        Submit Feedback
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-8 py-8 max-w-2xl mx-auto">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Feedback & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Encountered an issue or want to suggest a new device frame? Let us know and we will get on it.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl backdrop-blur-sm">
        <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading form...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
