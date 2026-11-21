import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'ISMT College | International School of Management and Technology', template: '%s | ISMT College' },
  description: 'Explore study areas, student services and admissions at the International School of Management and Technology, Nepal.',
  applicationName: 'ISMT College',
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#10253e', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
