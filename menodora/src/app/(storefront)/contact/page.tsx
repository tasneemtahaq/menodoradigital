import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Menodora Digital Printed Rida Fabrics",
  description: "Get in touch with Menodora for questions about orders, Rida fabrics, or collaborations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-luxury-black pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-luxury-gold uppercase">
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold text-luxury-white md:text-5xl">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <ContactForm />

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 rounded-2xl bg-neutral-900 p-6">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-luxury-gold" />
              <div>
                <h3 className="text-sm font-semibold text-luxury-white">Location</h3>
                <p className="mt-1 text-sm text-gray-400">Karachi, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-neutral-900 p-6">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-luxury-gold" />
              <div>
                <h3 className="text-sm font-semibold text-luxury-white">Phone</h3>
                <p className="mt-1 text-sm text-gray-400">+92 300 0000000</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-neutral-900 p-6">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-luxury-gold" />
              <div>
                <h3 className="text-sm font-semibold text-luxury-white">Email</h3>
                <p className="mt-1 text-sm text-gray-400">hello@menodora.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}