import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Roboto, Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ['400','500','600','700', '800']
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin']
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://meetxo.ai/"),
  title: "MeetXO - Connect with Experts | Learn, Grow & Earn",
  description: "Get expert advice, book 1:1 consultations, and grow your network with MeetXO. Join as an expert or find top professionals worldwide.",
  openGraph: {
    title: "MeetXO - Connect with Experts | Learn, Grow & Earn",
    description: "Get expert advice, book 1:1 consultations, and grow your network with MeetXO. Join as an expert or find top professionals worldwide.",
    url: "https://meetxo.ai/", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "/images/meetxo-logo.png", // Path to your OG image (stored in the public folder)
        width: 1000,
        height: 300,
        alt: "MeetXO - Connect with Experts",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-ED18HHVEJ0`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ED18HHVEJ0');
        `}
      </Script>
      <body
        style={{marginRight: 'auto !important'}}
        className={`${plusJakartaSans.variable} ${inter.variable} ${roboto.variable} ${poppins.variable}  antialiased font-plus-jakarta-sans 2xl:container !mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
