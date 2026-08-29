import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GirqBox - Cozy Book Subscription Box (Armenia & USA)',
  description: 'Gentle, soft pastel book subscription box service for Armenia and America. Curated books, handcrafted bookmarks, scented candles, tea, and reader preference quiz.',
  other: {
    'darkreader-lock': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="true" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
