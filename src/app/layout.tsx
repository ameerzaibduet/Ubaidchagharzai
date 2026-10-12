
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"
import WhatsappButton from "@/components/ui/WhatsappButton"

export const metadata: Metadata = {
  title: "Ubaidify",
  description: "Premium Bike Seat Covers by Bin Watan",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Facebook Meta Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1580910959892502');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Facebook Pixel fallback when JavaScript is disabled */}
        <noscript>
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1580910959892502&ev=PageView&noscript=1"
          />
        </noscript>

        <CartProvider>
          <Navbar />

          <main className="flex-grow">
            {children}
            <WhatsappButton />
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}