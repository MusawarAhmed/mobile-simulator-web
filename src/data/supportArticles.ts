export interface SupportArticle {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  updatedAt: string;
  content: {
    overview: string;
    steps?: { step: number; title: string; description: string; code?: string }[];
    notes?: string[];
    faq?: { q: string; a: string }[];
  };
}

export const supportArticles: SupportArticle[] = [
  {
    slug: 'activate-local-files',
    title: 'How to Test Local Files (file:/// URLs)',
    summary:
      'Learn how to enable file URL permissions in Chrome so you can test local HTML, CSS, and JS projects directly in Mobile Simulator.',
    category: 'Permissions & Setup',
    readTime: '2 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'By default, Chrome security restricts extensions from reading local files (`file:///` protocol) unless you explicitly grant permission. Enabling this takes less than 30 seconds.',
      steps: [
        {
          step: 1,
          title: 'Open Chrome Extensions Page',
          description:
            'Open a new tab in Google Chrome and navigate to `chrome://extensions` or click the puzzle piece icon in the top right and select "Manage Extensions".',
        },
        {
          step: 2,
          title: 'Find Mobile Simulator & Responsive Tester',
          description:
            'Locate the "Mobile Simulator" extension card and click the "Details" button.',
        },
        {
          step: 3,
          title: 'Toggle "Allow access to file URLs"',
          description:
            'Scroll down to find the setting labeled "Allow access to file URLs" and switch the toggle to ON (blue).',
        },
        {
          step: 4,
          title: 'Test Your Local Project',
          description:
            'Open any local HTML file in Chrome (e.g. `file:///C:/projects/my-site/index.html`) and click the Mobile Simulator extension icon. The simulator will now render your local code immediately!',
        },
      ],
      notes: [
        'You only need to do this once per browser installation.',
        'If you use a local development server (like `localhost:3000` or `127.0.0.1:8080`), you do NOT need file URL permissions; localhost works automatically out of the box.',
      ],
      faq: [
        {
          q: 'Why does Chrome require this toggle?',
          a: 'Chrome enforces this security restriction to ensure no extension can access private local files on your computer without your explicit consent.',
        },
        {
          q: 'Does this work with Vite, Next.js, or Webpack dev servers?',
          a: 'Yes, localhost servers work out-of-the-box without needing any special file URL permissions.',
        },
      ],
    },
  },
  {
    slug: 'media-queries-not-working',
    title: 'Why Are CSS Media Queries Not Working in Mobile Simulator?',
    summary:
      'Fix common viewport issues where your website desktop layout is rendered instead of responsive mobile styles.',
    category: 'Responsive Troubleshooting',
    readTime: '3 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'If your website renders like a zoomed-out desktop version on mobile devices, the issue is almost always a missing or misconfigured HTML viewport `<meta>` tag.',
      steps: [
        {
          step: 1,
          title: 'Check Your <head> Tag for the Viewport Meta Element',
          description:
            'Modern mobile browsers and simulators require the standard viewport meta tag to correctly scale CSS pixels.',
          code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        },
        {
          step: 2,
          title: 'Verify CSS Breakpoints Against Device Viewport',
          description:
            'Ensure your CSS media queries match the logical CSS viewport width of the device (not physical pixels). For example, an iPhone 16 Pro has a CSS width of 402px, even though its physical resolution is 1206px.',
          code: `@media (max-width: 480px) {
  /* Mobile styles applied here */
  .container {
    padding: 12px;
  }
}`,
        },
        {
          step: 3,
          title: 'Check for Conflicting "min-width" or Fixed Widths',
          description:
            'Ensure wrapper elements do not have hardcoded `width: 1200px` or `min-width: 1024px` which prevent your page from shrinking to mobile dimensions.',
        },
      ],
      notes: [
        'Always use `width=device-width, initial-scale=1.0` in your `<head>`.',
        'Check that no `X-Frame-Options` or Content Security Policy headers block iframe responsive scaling.',
      ],
      faq: [
        {
          q: 'What is the difference between CSS Viewport and Physical Resolution?',
          a: 'CSS Viewport is the layout dimension your CSS media queries target. Physical Resolution is the raw hardware pixels. Device Pixel Ratio (DPR) converts CSS pixels into physical pixels.',
        },
      ],
    },
  },
  {
    slug: 'activate-shortcut',
    title: 'How to Configure Keyboard Shortcuts for Mobile Simulator',
    summary:
      'Set custom hotkeys (e.g. Ctrl+Shift+M or Cmd+Shift+M) to toggle Mobile Simulator on and off in one keypress.',
    category: 'Productivity & Tips',
    readTime: '2 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'You can bind any custom keyboard shortcut in Chrome to activate or close Mobile Simulator instantly without clicking the toolbar icon.',
      steps: [
        {
          step: 1,
          title: 'Navigate to Chrome Keyboard Shortcuts',
          description:
            'Open a new tab and paste `chrome://extensions/shortcuts` into the address bar, then press Enter.',
        },
        {
          step: 2,
          title: 'Locate Mobile Simulator',
          description:
            'Find "Mobile Simulator & Responsive Tester" in the list of extensions.',
        },
        {
          step: 3,
          title: 'Assign Your Favorite Hotkey',
          description:
            'Click the pencil icon next to "Activate the extension" and press your desired shortcut (e.g., `Ctrl + Shift + M` on Windows/Linux or `Cmd + Shift + M` on Mac).',
        },
        {
          step: 4,
          title: 'Choose Scope (In Chrome vs. Global)',
          description:
            'Select "In Chrome" so the shortcut triggers whenever your browser window is active.',
        },
      ],
      notes: [
        'If `Ctrl + Shift + M` conflicts with default Chrome DevTools device mode, consider using `Alt + M` or `Ctrl + Shift + S`.',
      ],
      faq: [
        {
          q: 'Can I set a shortcut to switch between devices?',
          a: 'Device switching is currently done via the simulator top bar or device selector modal; the shortcut toggles the simulator interface on and off.',
        },
      ],
    },
  },
  {
    slug: 'activate-incognito-mode',
    title: 'How to Enable Mobile Simulator in Incognito Windows',
    summary:
      'Test your responsive pages in private browsing mode with fresh cache and zero cookie interference.',
    category: 'Permissions & Setup',
    readTime: '2 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'Testing in Incognito allows you to test login flows, clean cache state, and third-party trackers. Chrome requires you to grant Incognito permission per extension.',
      steps: [
        {
          step: 1,
          title: 'Open Extension Settings',
          description:
            'Go to `chrome://extensions` in Chrome and click "Details" under Mobile Simulator.',
        },
        {
          step: 2,
          title: 'Enable "Allow in Incognito"',
          description:
            'Scroll down and toggle the "Allow in Incognito" switch to ON.',
        },
        {
          step: 3,
          title: 'Open an Incognito Window',
          description:
            'Press `Ctrl + Shift + N` (or `Cmd + Shift + N` on Mac). The Mobile Simulator icon will now appear in your incognito toolbar ready to test.',
        },
      ],
      notes: [
        'In Incognito mode, your test sessions will not save browsing history or persistent cookies.',
      ],
      faq: [
        {
          q: 'Are screenshots and recordings saved in Incognito?',
          a: 'Yes, downloaded screenshots and video captures are saved directly to your local computer downloads folder.',
        },
      ],
    },
  },
  {
    slug: 'show-scrollbar',
    title: 'How to Show or Hide Scrollbars in Simulator Mode',
    summary:
      'Configure scrollbar behavior in the mobile simulator to emulate native iOS/Android overlay scrollbars or desktop scrollbars.',
    category: 'Display & Settings',
    readTime: '2 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'Mobile operating systems (iOS and Android) typically hide scrollbars until the user actively scrolls. Mobile Simulator lets you choose between native thin scrollbars or permanent scrollbars.',
      steps: [
        {
          step: 1,
          title: 'Open Simulator Settings',
          description:
            'While the simulator is active on any page, click the Settings (gear icon) in the simulator control panel.',
        },
        {
          step: 2,
          title: 'Locate "Scrollbar Visibility"',
          description:
            'Toggle between "Auto-hide Scrollbar" (mobile experience) and "Always Show Scrollbar".',
        },
        {
          step: 3,
          title: 'CSS Custom Scrollbar Styling (Optional)',
          description:
            'If you want custom scrollbars on your website, you can also use CSS `::-webkit-scrollbar` rules:',
          code: `/* Custom sleek mobile scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}`,
        },
      ],
      notes: [
        'On Mac, system scrollbars may also be influenced by macOS System Settings > Appearance > Show scroll bars.',
      ],
    },
  },
  {
    slug: 'subscription-doesnt-work-on-chrome',
    title: 'Features & Pro Edition Status',
    summary:
      'Information on device availability, Pro features, and unlocked status in this edition of Mobile Simulator.',
    category: 'Account & Plans',
    readTime: '2 min read',
    updatedAt: 'October 2026',
    content: {
      overview:
        'In this edition of Mobile Simulator, all premium features, high-resolution device mockups, screencasts, and developer tools are completely unlocked and free for your use.',
      steps: [
        {
          step: 1,
          title: 'All 77+ Devices Unlocked',
          description:
            'Every smartphone, tablet, laptop, smartwatch, and foldable device is accessible with zero subscription fees or paywalls.',
        },
        {
          step: 2,
          title: 'Unlimited Screenshot & Mockup Generation',
          description:
            'Capture full-page responsive screenshots, transparent mockup frames, and video recordings without watermarks.',
        },
        {
          step: 3,
          title: 'No Login or Account Needed',
          description:
            'Everything runs locally inside your browser with complete privacy and zero data collection.',
        },
      ],
      notes: [
        'No credit card, account registration, or online verification is required.',
      ],
    },
  },
];

export function getAllSupportArticles(): SupportArticle[] {
  return supportArticles;
}

export function getSupportArticleBySlug(slug: string): SupportArticle | undefined {
  return supportArticles.find((a) => a.slug === slug);
}
