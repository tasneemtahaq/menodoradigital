"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Contact form submission:", data);
    reset();
  }

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
          {/* Contact form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                className="w-full rounded-full border border-white/10 bg-neutral-900 px-5 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className="w-full rounded-full border border-white/10 bg-neutral-900 px-5 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-5 py-3 text-sm text-luxury-white focus:border-luxury-gold focus:outline-none"
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-full bg-luxury-gold py-3 text-sm font-semibold text-luxury-black transition-colors hover:bg-luxury-gold-light"
            >
              Send Message
            </button>

            {isSubmitSuccessful && (
              <p className="text-sm text-green-500">
                Thank you — we&apos;ll get back to you soon!
              </p>
            )}
          </form>

          {/* Contact info */}
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