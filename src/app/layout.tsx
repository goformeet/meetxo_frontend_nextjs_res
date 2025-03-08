import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Roboto, Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner"

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
  title: " Connect with Experts & Get 1:1 Advice | Monetize your expertise | MeetXO",
  description: "Browse top industry experts, book 1:1 sessions, and get expert guidance online or offline. Learn, grow, and make smarter decisions with meetxo.ai",
  keywords:"expert consultation online, book industry experts, 1-on-1 expert advice, expert mentorship platform, hire professionals online, virtual expert sessions, top industry mentors, best consultation platform, connect with experts, expert advice marketplace",
  openGraph: {
    title: "Connect with Experts & Get 1:1 Advice | Monetize your expertise | MeetXO",
    description: "Browse top industry experts, book 1:1 sessions, and get expert guidance online or offline. Learn, grow, and make smarter decisions with meetxo.ai",
    url: "https://meetxo.ai/", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "https://meetxo.ai/og_image.png",
        width: 1000,
        height: 300,
        alt: "MeetXO - Connect with Experts",
      },
    ],
  },

    icons: {
    icon: "/meetxo_favicon.png", // Favicon path (inside the public/ folder)
    apple: "/meetxo_favicon.png", // Optional Apple touch icon
    shortcut: "/meetxo_favicon.png", // Optional favicon variant
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
