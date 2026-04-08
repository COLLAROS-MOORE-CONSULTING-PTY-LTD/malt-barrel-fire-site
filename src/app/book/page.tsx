import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reserve Your Table — Malt Barrel & Fire",
  description:
    "Book a table at any Malt Barrel & Fire location. Call us directly or enquire about private events.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen pt-24">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-12">
        {/* Header */}
        <div className="text-center">
          <p className="mb-5 text-sm tracking-[0.4em] uppercase text-amber">
            Reservations
          </p>
          <h1 className="font-serif text-5xl font-bold text-cream md:text-7xl">
            Reserve Your Table
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
          <p className="mx-auto mt-8 max-w-lg text-lg text-warm-gray leading-relaxed">
            Call any of our locations directly to book your table, or get in touch for private event enquiries.
          </p>
        </div>

        {/* Private Events Card */}
        <div className="mt-20 flex justify-center">
          <div className="group relative max-w-md overflow-hidden rounded-sm border border-charcoal-light p-8 transition-all duration-500 hover:border-amber/30 hover:bg-charcoal/30">
            <div className="absolute top-0 left-0 h-1 w-0 bg-amber transition-all duration-700 group-hover:w-full" />
            <div className="mb-6 text-amber/70">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-bold text-cream">
              Private Events
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-warm-gray">
              Planning a celebration, corporate function, or exclusive gathering? Let us create a bespoke experience for you.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block rounded-sm border border-amber px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>

        {/* Direct Contact CTA */}
        <div className="mt-24 border-t border-charcoal-light pt-16 text-center">
          <h3 className="font-serif text-2xl font-bold text-cream md:text-3xl">
            Ready to book?
          </h3>
          <p className="mx-auto mt-4 max-w-md text-warm-gray">
            Call any of our locations directly to reserve your table today.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-sm border border-amber bg-amber px-10 py-4 text-sm tracking-[0.25em] uppercase text-background transition-all duration-300 hover:bg-amber-light"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="rounded-sm border border-cream/20 px-10 py-4 text-sm tracking-[0.25em] uppercase text-cream transition-all duration-300 hover:border-cream/50"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
