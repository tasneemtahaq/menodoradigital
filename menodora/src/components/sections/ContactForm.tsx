"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
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
  );
}