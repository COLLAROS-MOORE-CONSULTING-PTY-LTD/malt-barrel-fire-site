import Link from "next/link";
import Image from "next/image";
import { locations } from "@/content/locations";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-light bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Malt Barrel & Fire"
              width={120}
              height={50}
              className="mb-6 h-12 w-auto"
            />
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Our Locations
            </h4>
            <div className="space-y-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="block text-sm text-warm-gray transition-colors hover:text-cream"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Navigate
            </h4>
            <div className="space-y-3">
              <Link
                href="/menu"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Menu
              </Link>
              <Link
                href="/book"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Book a Table
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-warm-gray">
              <a
                href="mailto:info@maltmidrand.co.za"
                className="block transition-colors hover:text-cream"
              >
                info@maltmidrand.co.za
              </a>
              <a
                href="tel:0115947947"
                className="block transition-colors hover:text-cream"
              >
                011 594 7947
              </a>
              <p className="text-warm-gray/60">
                General enquiries &amp; bookings
              </p>
            </div>
            <Link
              href="/book"
              className="mt-6 inline-block rounded-sm border border-amber px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background"
            >
              Reserve a Table
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-charcoal-light pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-warm-gray/60">
            &copy; {new Date().getFullYear()} MALT Barrel &amp; Fire
          </p>
          <p className="text-xs text-warm-gray/60">
            Designed by Benjamin Moore
          </p>
        </div>
      </div>
    </footer>
  );
}
