import { ArrowUpRight, Globe2, Mail, Send } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  function handleNewsletterSubmit(event) {
    event.preventDefault();
  }

  return (
    <footer className="mt-auto bg-[#6870d5] px-5 pb-6 pt-14 text-[#f7f7f2] sm:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.35fr_0.7fr_0.7fr_1.15fr]">
          <div>
            <a href="#top" className="inline-flex items-baseline font-sans text-xl font-extrabold tracking-[-0.08em]">
              4X<span className="ml-1.5 text-xs font-bold tracking-[0.18em] text-[#b9c4b3]">COLLECTION</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#b9c4b3]">
              Thoughtfully selected everyday pieces for a wardrobe that moves with you.
            </p>
            <a
              href="mailto:hello@4xcollection.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#b9c4b3]"
            >
              <Mail size={16} aria-hidden="true" />
              hello@4xcollection.com
            </a>
          </div>

          <nav aria-label="Shop links">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b9c4b3]">Shop</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="transition hover:text-[#b9c4b3]" href="#collection">New arrivals</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="#collection">Women</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="#collection">Men</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="#collection">Accessories</a></li>
            </ul>
          </nav>

          <nav aria-label="Help links">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b9c4b3]">Help</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="transition hover:text-[#b9c4b3]" href="#top">Shipping &amp; returns</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="mailto:hello@4xcollection.com">Contact us</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="#top">Size guide</a></li>
              <li><a className="transition hover:text-[#b9c4b3]" href="#top">FAQs</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[#b9c4b3]">Stay in the loop</h2>
            <p className="mt-5 text-sm leading-6 text-[#b9c4b3]">New drops, considered edits, and occasional good news.</p>
            <form className="mt-5 flex border-b border-white/35 pb-2 focus-within:border-white" onSubmit={handleNewsletterSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#b9c4b3]"
              />
              <button type="submit" className="ml-3 grid h-8 w-8 place-items-center rounded-full bg-white text-[#172017] transition hover:bg-[#dce6d6]" aria-label="Subscribe to the newsletter">
                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs text-[#b9c4b3] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} 4X Collection. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#top" className="inline-flex items-center gap-1 transition hover:text-white">Privacy <ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href="#top" className="inline-flex items-center gap-1 transition hover:text-white">Terms <ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-white" aria-label="Visit us on Instagram">
              <Globe2 size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
