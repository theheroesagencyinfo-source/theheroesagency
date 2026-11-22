# TheHeroes Agency: premium refinement (improvement, not redesign)

## Audit of the current site

What already works and stays as it is
- Cream and forest-green editorial look, serif headings, the opening book animation, the Reader Journey photos and the shared header and footer.
- Pages: Home, Services, Pricing, About, Work, the 7 case studies, Blog and the 2 guides, Contact, Get started, Custom package, legal pages, Referrals and the client portal.
- Prices ($700 / $2,000 / $5,400 and the à-la-carte rates) come from one shared source, so Home, Services and Pricing already match.
- Forms (free review, quote, contact, newsletter, case study reviews) save to the backend. Reviews on the Adam, Trey and Sandra pages were just fixed.

Issues found
1. **Reviews stuck on "Loading reviews…"**: the homepage reviews only load after the page opens in the browser, so the first view always shows the loading text. If no reviews are approved yet, it falls back to one plain line. The section looks unfinished.
2. **Motion is uneven**: some sections fade in and others appear abruptly. There is no shared headline reveal and no hover feedback on service cards or project cards.
3. **The three services** (platform, audience, visibility) read as separate items. Nothing shows how they connect.
4. **Case studies** don't follow the same order. Real client sites (Adam, Trey, Sandra, Quiet Advantage) aren't clearly separated from the sample showcases (Daniel, Eleanor, Jonathan).
5. **Packages**: Pricing lists what each package includes, but it doesn't say who each package is for, what it leaves out, how long it takes or what happens next.
6. **Book promotion** is described only in general terms. It doesn't list concrete deliverables.
7. **Consistency checks** still to run on every page: titles and descriptions, image alt text, internal links, the email address and phone layout.

## The plan, in stages (each stage tested before the next)

**Stage 1: Shared motion and polish**
- Build one small set of reusable animations: headline word reveal, fade-and-rise when a section scrolls into view, image reveal, gentle parallax on chosen photos, and tilt on book mockups.
- Make button hover and press feedback consistent, and add a lift on hover for service and project cards.
- Everything switches off for visitors who turn on "reduced motion", and nothing causes layout shift.
- Keep the "What we build" list static, as you asked before.

**Stage 2: Homepage**
- Keep the headline "A book is only the beginning. We build what comes next." and add a refined text reveal.
- Show the three services as one connected path: Platform → Audience → Visibility, each with a short "what you get" line.
- Make the call to action clear: "Request a free website review" first, "Book a 15-minute call" second.

**Stage 3: Reviews section**
- Load reviews with the page so the loading text never shows.
- If no reviews are approved, show a finished editorial block with real project facts (the live author sites we built and links to them) and no fake ratings.
- Add a clean message if reviews can't be loaded.

**Stage 4: Portfolio and case studies**
- Give every case study the same order: category, the brief, work completed, design and strategy decisions, screenshots, and outcomes only where we have verified numbers.
- Label cards "Client project" or "Concept showcase".
- Add interactive project cards with a hover preview.

**Stage 5: About, Services, Pricing and book promotion**
- About: a warmer, more personal founder introduction, why we focus on nonfiction, how website, audience and visibility connect, and what it's like to work with us. No invented credentials.
- Pricing and Services: for each package, add who it's for, the problem it solves, what's included and not included, the timeline, and the next step. Prices stay the same.
- Book promotion: list the concrete deliverables (positioning, reader acquisition plan, email campaigns, promotional graphics, a reporting summary) with no promises of sales or rankings.

**Stage 6: Contact and site-wide check**
- Check that every button leads to the right place and the email is the same everywhere.
- Check form error and success messages and the layout on phone.
- Check titles, descriptions, alt text, internal links and image loading on every page.

## What will not change
- Page addresses, sign-in, the database, existing forms, prices or the client portal. Nothing publishes automatically.

## Technical details
- Add the `motion` package (Framer Motion) and put shared wrappers (`Reveal`, `TextReveal`, `Parallax`, `TiltCard`) in `src/components/motion.tsx`, using `useReducedMotion`.
- Reviews: route loader with `ensureQueryData` + `useSuspenseQuery`, plus an error boundary fallback.
- Case study fields go in a shared browser-safe module so cards and pages stay consistent.
- Package details (audience, exclusions, timeline) are added to the existing pricing module, with prices untouched.
