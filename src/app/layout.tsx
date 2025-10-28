import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Starfield from '@/components/Starfield';
import Loading from '@/components/Loading';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Neonlights.ai - Command the Power of AI Creation',
  description: 'Generate the Future with AI-powered image and video generation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Loading />
        <Starfield />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
