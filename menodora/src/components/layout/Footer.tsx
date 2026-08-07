import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-luxury-black px-6 pt-16 pb-8 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/">
               <Image
                  src="/images/logo.jpg"
                  alt="Menodora Logo"
                  width={150}
                  height={50}
                  priority
                 />
              </Link>
           
            <p className="mt-3 text-sm text-gray-400">
              Premium digital printed Rida fabrics, crafted for those who value timeless luxury.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/30 text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/30 text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-black"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-luxury-white uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/shop" className="text-sm text-gray-400 hover:text-luxury-gold">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-luxury-gold">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm text-gray-400 hover:text-luxury-gold">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-luxury-gold">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-luxury-white uppercase">
              Customer Service
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-luxury-gold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-gray-400 hover:text-luxury-gold">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm text-gray-400 hover:text-luxury-gold">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-gray-400 hover:text-luxury-gold">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-luxury-white uppercase">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
                Karachi, Pakistan
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 shrink-0 text-luxury-gold" />
                +92 300 0000000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 shrink-0 text-luxury-gold" />
                hello@menodora.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Menodora Digital Printed Fabrics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}