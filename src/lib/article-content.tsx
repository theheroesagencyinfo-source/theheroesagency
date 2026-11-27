import { Link } from "@tanstack/react-router";
import { articleSummaries, type Article } from "@/lib/articles";
import { formatPrice, packageAmounts } from "@/lib/pricing-values";

export const websiteArticle: Article = {
  ...articleSummaries[0],
  cta: "If you want an author website that connects your book to your wider work, send AUTHOR in your contact message to discuss your website.",
  sections: [
    { id: "beyond-the-book", title: "Why a book alone is not enough", content: <>
      <p>Your book can answer a reader's question without explaining how to work with you. Someone who enjoys your ideas may still need to know whether you offer a workshop, a consulting engagement, or one-to-one support.</p>
      <p>A nonfiction author website can connect those pieces. It should help book readers find resources, prospective clients understand your services, and event organisers find speaking information. These are different visits, so each needs a recognisable destination.</p>
      <p>Start by deciding which action matters most for your wider work. Buying the book, joining your list, and making an enquiry can all belong on the site, but they do not need equal emphasis on every page.</p>
    </> },
    { id: "website-essentials", title: "What nonfiction author website design needs", content: <>
      <p>Good <Link to="/services">author website design</Link> is about a reader's decisions, not just how the cover looks on screen. Begin with a small set of pages that each answer a specific question.</p>
      <ul>
        <li><strong>Home:</strong> who you help, what your book is about, and where the visitor can go next.</li>
        <li><strong>Book:</strong> the premise, intended reader, cover, and accurate purchase links. Add an excerpt if you have permission to share it.</li>
        <li><strong>About:</strong> your real background and relevant experience, with a current photo and no unsupported credibility claims.</li>
        <li><strong>Work with me:</strong> coaching, consulting, or other services you actually offer.</li>
        <li><strong>Speaking and media:</strong> real topics, a bio, approved photos, and an enquiry route, if speaking is part of your work.</li>
        <li><strong>Contact:</strong> a clear way to ask a question, with only the information needed to respond.</li>
      </ul>
      <p>Check the whole journey on a phone. Can a visitor read the page, open the menu, and reach the enquiry form without zooming or hunting?</p>
    </> },
    { id: "work-with-me", title: "The most important page: work with me", content: <>
      <p>If your goal is coaching or consulting enquiries, your work with me page deserves as much attention as your book page. It should connect the ideas in the book to the practical support you provide.</p>
      <p>For an author website for coaches, explain who the coaching is for, what a typical engagement involves, and how a prospective client can enquire. For an author website for consultants, clarify the organisations or problems you work with and what the first conversation is intended to establish.</p>
      <p>Use a simple order: the person or problem you serve, the support you offer, what the engagement includes, and the next step. Include evidence only when you have permission and verified details. Do not add testimonials or results merely to fill space.</p>
      <p>If you do not offer services, you do not need this page. A newsletter, book resource, or speaking enquiry may be the more appropriate destination.</p>
    </> },
    { id: "clear-enquiries", title: "How to make your enquiry next step clear", content: <>
      <p>Replace vague buttons such as “Learn more” with the action a visitor will take: “Ask about consulting”, “Enquire about speaking”, or “Get the free chapter”. Match the destination to the promise on the button.</p>
      <p>Near the form, explain what information you need and what happens after submission. Only state a response time if you can honour it. Ask for a name, email, and enough context to understand the enquiry; avoid collecting unnecessary personal information.</p>
      <p>Test the form yourself. Submit a realistic question, confirm that it arrives, and check the success message. A polished page is not useful if the enquiry never reaches you.</p>
    </> },
    { id: "website-checklist", title: "Author website checklist", content: <>
      <ul>
        <li>The first screen identifies your book, audience, and wider work.</li>
        <li>Book links go to the correct editions and retailers.</li>
        <li>Your work with me page names real services and their intended audience.</li>
        <li>Each key page has one obvious primary action.</li>
        <li>Navigation, text, and buttons remain usable on a phone.</li>
        <li>Images are appropriately sized and important text is not embedded only in an image.</li>
        <li>Your contact form works and displays a clear confirmation.</li>
        <li>Email signup explains what subscribers will receive.</li>
      </ul>
    </> },
    { id: "studio-help", title: "How TheHeroes Agency · Author Studio can help", content: <>
      <p>I build author websites, email funnels, and launch kits for nonfiction authors. The aim is to make your book, expertise, and reader's next step work together, rather than leaving them on disconnected pages.</p>
      <p>Once your website has a clear direction, the next piece is staying in touch. Read the guide to <Link to="/email-marketing-for-authors">email marketing for authors</Link> for a practical starting point.</p>
    </> },
  ],
};

export const emailArticle: Article = {
  ...articleSummaries[1],
  cta: "Want an email system that connects your book to your coaching, consulting, or speaking work? Send AUTHOR in your contact message to discuss your setup.",
  sections: [
    { id: "email-list", title: "Why email marketing for authors needs a useful list", content: <>
      <p>An author email list gives interested readers a way to hear from you again. Instead of expecting every visitor to enquire immediately, you can offer something useful and invite them to keep the conversation going.</p>
      <p>For nonfiction authors, that might mean sharing practical applications of a book's ideas, answering common questions, or inviting readers to a relevant workshop. An email list is not a guarantee of clients. Its value depends on permission, relevance, and consistent delivery.</p>
      <p>Start with one audience and a clear promise. “Practical exercises from my book” tells readers more than “Join my newsletter”.</p>
    </> },
    { id: "reader-resource", title: "What to offer readers who join your list", content: <>
      <p>A lead magnet for authors should help the reader take a small, useful step related to the book. It does not need to be a second book or a large course.</p>
      <ul>
        <li>A free chapter, where you hold the rights to share it.</li>
        <li>A workbook that applies one idea from the book.</li>
        <li>A checklist for a specific reader problem.</li>
        <li>A short reflection guide or a set of discussion questions.</li>
      </ul>
      <p>Choose the resource that is closest to both your reader's needs and your actual work. If you consult on a topic, a practical checklist can introduce your approach without promising outcomes you cannot support.</p>
      <p>Make the signup promise explicit: name the resource and describe the ongoing emails, if there will be any. A download request should not silently become permission for unrelated marketing.</p>
    </> },
    { id: "signup-placement", title: "Where to place your email signup", content: <>
      <p>Your <Link to="/author-website-design-nonfiction-authors">author website</Link> should make the resource easy to discover without interrupting every visit. Place signup where the reader already has a reason to care: on the book page, beside a relevant resource, and near the end of a useful article.</p>
      <p>A footer form offers a consistent option across the site. If you mention a resource in your book, send readers to a dedicated page with a short, readable address and the exact resource promised.</p>
      <p>Keep the form brief, make the email field easy to use on a phone, and show a useful confirmation. Check that the download or delivery email actually arrives before inviting readers to sign up.</p>
    </> },
    { id: "welcome-sequence", title: "A simple welcome email sequence", content: <>
      <p>A five-email sequence is one possible starting structure, not a rule. Adjust the number and timing to what you promised at signup. Each message should have a clear purpose.</p>
      <ol>
        <li><strong>Deliver the resource:</strong> provide the promised link, identify yourself, and explain what future emails will cover.</li>
        <li><strong>Help them use it:</strong> suggest one manageable exercise or action from the resource.</li>
        <li><strong>Expand an idea:</strong> connect that exercise to a useful concept in your book.</li>
        <li><strong>Answer a common question:</strong> clarify a genuine question about applying the idea or working with you.</li>
        <li><strong>Offer the next step:</strong> invite an enquiry about a relevant service, or point to another helpful resource.</li>
      </ol>
      <p>Avoid making every message a sales pitch. Keep subject lines accurate and make it easy to unsubscribe. Use your email tool's settings to stop the sequence when someone opts out.</p>
    </> },
    { id: "service-enquiries", title: "How email supports coaching and consulting enquiries", content: <>
      <p>A reader may understand your ideas before they understand your services. Email gives you space to explain the connection: who you work with, which problems you help with, and what an initial conversation involves.</p>
      <p>Useful author newsletter ideas include a practical exercise, a response to a reader question, a short explanation of your process, or a speaking topic connected to your book. Use real examples only with permission; do not invent client stories.</p>
      <p>For an email list for nonfiction authors, track more than list size. Resource requests, replies, and relevant enquiries can help you understand whether the emails are useful. Do not interpret a single open or click as a definite buying signal.</p>
      <p>Use permission-based signup and keep a record of what subscribers agreed to receive. Rules vary by location and audience. The <a href="https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business" target="_blank" rel="noopener noreferrer">FTC's commercial email guidance</a> and the <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules" target="_blank" rel="noopener noreferrer">ICO's electronic marketing guidance</a> explain different legal requirements; check the rules that apply to your own list.</p>
    </> },
    { id: "studio-help", title: "How TheHeroes Agency · Author Studio can help", content: <>
      <p>My <Link to="/services">email marketing for authors</Link> service brings together a reader resource landing page, an email signup form, a five-email welcome sequence, and setup in your email tool.</p>
      <p>We start with your audience, your existing resource, and the next step you want readers to take. The website and email system should tell the same story, with no unsupported promises about sales or client numbers.</p>
    </> },
  ],
};
const starter = formatPrice(packageAmounts["author-starter"]);
const growth = formatPrice(packageAmounts["author-growth"]);
const authority = formatPrice(packageAmounts["author-authority"]);

export const costArticle: Article = {
  ...articleSummaries[2],
  answer: `An author website can cost almost nothing on a DIY builder or several thousand dollars for a custom build. At TheHeroes Agency, custom author websites start at ${starter} (Author Starter), ${growth} for a site with email marketing built in (Author Growth), and ${authority} for a full authority platform (Author Authority). The right level depends on whether your site only needs to present a book, or also needs to bring in readers and client enquiries.`,
  cta: "Not sure which level fits your book? Send us a message or book a free 15-minute call and we will tell you honestly, even if the answer is the smallest package.",
  sections: [
    { id: "what-affects-cost", title: "What decides the cost of an author website?", content: <>
      <p>The price is shaped by what the website has to do, not by how many colours it uses. Four things matter most:</p>
      <ul>
        <li><strong>Number of pages:</strong> a single book page is quick; a site with book, about, services, speaking, media and blog pages takes longer.</li>
        <li><strong>Writing and strategy:</strong> whether you supply finished text, or need help deciding what each page should say and who it is for.</li>
        <li><strong>Email and lead capture:</strong> a signup form, free resource and welcome emails add real value and extra setup.</li>
        <li><strong>Support after launch:</strong> whether someone is there to fix problems and help you make changes.</li>
      </ul>
    </> },
    { id: "price-ranges", title: "Typical author website price ranges", content: <>
      <ul>
        <li><strong>DIY builder (low monthly fee):</strong> you do everything yourself. Good for testing an idea, but most authors spend many hours and still end up with a template look.</li>
        <li><strong>Freelancer template setup:</strong> a template customised with your text and cover. Fast, but usually no strategy or email system.</li>
        <li><strong>Custom studio build:</strong> a site planned around your readers and your goals, with design, writing guidance, email and launch support included.</li>
      </ul>
      <p>Be cautious of very low prices that leave out mobile testing, working forms or ownership of your domain. Always ask who owns the website when the project ends.</p>
    </> },
    { id: "our-packages", title: "What TheHeroes Agency author websites cost", content: <>
      <ul>
        <li><strong>Author Starter, {starter}:</strong> a custom author website with home, book, about and contact pages, mobile design, social links and basic SEO. Best for a first book or a clean professional presence.</li>
        <li><strong>Author Growth, {growth}:</strong> everything in Starter plus up to 8 pages, newsletter setup, a 3-email welcome sequence and analytics. Best for authors who want readers to stay in touch.</li>
        <li><strong>Author Authority, {authority}:</strong> up to 12 pages, brand positioning, advanced email automation, a 5-email sequence, lead capture, SEO strategy and 30 days of support. Best for authors who coach, consult or speak.</li>
      </ul>
      <p>Payments are split so you never pay everything up front. See the full breakdown on our <Link to="/pricing">pricing page</Link>.</p>
    </> },
    { id: "which-level", title: "Which level should you choose?", content: <>
      <p>Ask yourself one question: what should a visitor do after reading about your book? If the answer is “buy it”, Starter is usually enough. If it is “join my list”, Growth fits. If it is “hire me, book me or invite me to speak”, Authority is designed for that.</p>
      <p>You can start smaller and grow later. A good author website is built so new pages and features can be added without starting again.</p>
    </> },
    { id: "hidden-costs", title: "Costs authors often forget", content: <>
      <ul>
        <li>Your domain name, renewed every year.</li>
        <li>An email marketing tool once your list grows past free limits.</li>
        <li>Professional author photos, if you do not have current ones.</li>
        <li>Your time to review pages and gather book details.</li>
      </ul>
      <p>We list these at the start of every project so there are no surprises. Read our <Link to="/author-website-design-nonfiction-authors">guide to author website design</Link> to see what each page should include.</p>
    </> },
  ],
};

export const aiSearchArticle: Article = {
  ...articleSummaries[3],
  answer: "AI tools like ChatGPT, Google AI Overviews and Perplexity recommend authors whose websites clearly state who they are, what their book covers and who they help, in plain text that is easy to quote. To be found, give each page one clear topic, answer real reader questions directly, keep your name and bio identical everywhere online, and let AI crawlers read your site.",
  cta: "Want your author website set up so people and AI search can understand it? Tell us about your book and we will show you what to improve first.",
  sections: [
    { id: "what-is-aeo", title: "What is answer engine optimization (AEO)?", content: <>
      <p>Answer engine optimization means shaping your website so AI tools can find it, understand it and quote it when someone asks a question. Traditional SEO helps you appear in a list of links. AEO helps you appear inside the answer itself.</p>
      <p>For authors this matters because the questions people ask are often the exact questions your book answers.</p>
    </> },
    { id: "how-ai-chooses", title: "How do AI tools decide which authors to mention?", content: <>
      <p>AI tools look for sources that are clear, consistent and trustworthy. They favour pages that:</p>
      <ul>
        <li>State facts in plain sentences, such as “Jane Smith is a leadership coach and author of …”.</li>
        <li>Answer one question per section, with the answer near the top.</li>
        <li>Match what other trusted sites say about you, like your publisher, podcast appearances and bookstore listings.</li>
        <li>Are fast, readable on a phone and open to their crawlers.</li>
      </ul>
    </> },
    { id: "seven-changes", title: "Seven website changes that help authors get found", content: <>
      <ol>
        <li><strong>Write a one-sentence description of yourself</strong> and use it on your home page, about page and every profile.</li>
        <li><strong>Give your book its own page</strong> with the title, subtitle, who it is for, the problem it solves and where to buy it.</li>
        <li><strong>Use questions as headings</strong>, such as “Who is this book for?”, and answer each one in the first sentence below it.</li>
        <li><strong>Add a short answer at the top of articles</strong> so AI tools can lift a complete, accurate summary.</li>
        <li><strong>Keep important text as real text</strong>, not inside images, so it can be read.</li>
        <li><strong>Add structured data</strong> that tells search tools this is a book, an author and an article.</li>
        <li><strong>Allow AI crawlers</strong> in your site settings and publish a simple summary file for them.</li>
      </ol>
    </> },
    { id: "beyond-website", title: "What helps outside your website?", content: <>
      <p>AI tools cross-check you. Keep your author bio identical on Amazon, Goodreads, LinkedIn, your publisher page and podcast show notes. Each guest appearance or interview that links back to your site makes you easier to trust and recommend.</p>
    </> },
    { id: "what-not-to-do", title: "What should authors avoid?", content: <>
      <ul>
        <li>Stuffing pages with keywords. AI tools reward clarity, not repetition.</li>
        <li>Claiming awards, sales or clients you cannot prove. Inaccurate claims damage trust with people and machines.</li>
        <li>Publishing many thin AI-written posts. A few useful, specific articles work better.</li>
      </ul>
    </> },
    { id: "studio-help", title: "How TheHeroes Agency can help", content: <>
      <p>Every author website we build includes clear page structure, structured data and AI-friendly settings from day one. Learn what a build costs in our <Link to="/author-website-cost">author website price guide</Link>, or see the <Link to="/services">services</Link> we offer.</p>
    </> },
  ],
};
