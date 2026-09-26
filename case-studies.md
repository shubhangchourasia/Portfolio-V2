# Case Studies

Updated with the approved portfolio revisions.

## Picxilens

### The Problem

The photography industry has always had a discovery problem. A talented freelance photographer or a well-equipped studio would spend more time chasing clients than doing actual work. The platforms that existed were either directories that charged for visibility (ranking profiles higher for more money) or tools that handled event management but offered no way to market yourself. Nobody had combined both into one place. And almost none of them worked well on mobile, despite the fact that most photographers live on their phones.

Picxilens was built to fix that. The idea was simple: one platform where studios and freelance photographers could showcase their work, manage their business, and get discovered by customers, all without paying for visibility or switching between five different tools.

### What Was Built

The platform was designed around three distinct user types, each with a completely different experience.

Studios got a full suite of business tools (a profile page visible to the public, a gallery to display their work, a calendar for managing shoots and events, an inventory system to track equipment, and the ability to post job openings for freelancers. Freelancers got a lighter version) a portfolio, a gallery, and a job search to find both permanent positions and temporary gigs. Customers browsing the platform could explore studios across the country, go through galleries, read about what each studio offered, and contact them directly.

The public-facing side of the platform was built as a server-side rendered application using Nuxt 2. This was a deliberate decision, photographers and studios needed to be discoverable on Google, so server rendering was chosen to make public content readily available to crawlers. Every profile, every gallery, every listing needed to be indexable from day one.

Firebase was chosen as the backend. For a two-person team building a full-featured product in under four months, managing server infrastructure would have consumed time better spent on product decisions. Firebase gave a complete backend (authentication, a real-time NoSQL database, file storage, and serverless Cloud Functions) all in one ecosystem. The trade-off of vendor lock-in was an acceptable one given the scope and timeline.

### The Authentication Architecture

One of the more interesting technical challenges was building a role-based system that felt secure and seamless at the same time. When a user signs up, they choose whether they are a Studio or a Freelancer. That role gets embedded into a custom JWT token issued by Firebase. On every page navigation, a Nuxt middleware reads that token and either allows access or redirects the user to the appropriate page.

This meant authorization wasn't just a client-side check (it happened at the server level on every request. A freelancer trying to access the studio inventory page would be redirected before the page ever loaded. The token also contained all the session data needed to personalize the experience) no extra API call required on mount.

VuexFire was used to bind Firestore collections directly to Vuex state, giving real-time updates across the UI without manual subscription management. When a studio updated their calendar or posted a new job, it reflected instantly across the platform.

### The Product Decisions

FullCalendar was integrated for studio event management because a real calendar (with day, week, month, and list views) was essential for how studios actually work. A simple date picker or table would not have served the use case.

Razorpay was integrated early as groundwork for future premium features. It wasn't needed in V1, but building the payment infrastructure in while the codebase was still young was the right call.

The platform was built as a Progressive Web App, installable directly from the browser on both desktop and mobile. Photographers often work on site at events with their phones. Having a native app experience without needing an app store was both a product advantage and a practical one for a team that couldn't build and maintain separate native apps.

### The Outcome

Picxilens was deployed as a complete application with three user roles, authentication, real-time data, payment integration, and an installable PWA experience. It was built by two developers in under four months as a final year major project, and it was the first time either of them had shipped a multi-role, authenticated, cloud-deployed product.

Looking back, there are clear things that would be done differently. Nuxt 3 with the Composition API and TypeScript would have made the codebase significantly more maintainable as it grew. Firestore worked, but the relational nature of users, studios, jobs, and applications was a constant friction point. PostgreSQL would have been a better fit. And there were no tests, which led to a few auth edge cases causing last-minute debugging sessions before submission.

But for what it was (a production-grade platform built from scratch under real constraints) Picxilens proved that shipping complete, working software was possible well before entering the industry professionally.

### Stack

Nuxt 2 (SSR)

Firebase (Firestore, Auth, Storage, Cloud Functions)

Node.js

Vuex

VuexFire

Buefy

Axios

PWA

JWT

FullCalendar

Razorpay

Google App Engine

## AmericanTamil.org

### The Problem

AmericanTamil.org exists to serve the Tamil diaspora community in the United States, publishing articles, books, cultural content, and community resources for Tamils living far from home. The community had a real need: a platform that felt professional, ranked well on Google, and gave their editorial team full control over content without needing a developer for every update.

The challenge was more layered than it first appeared. The content team was non-technical. The book library needed access control, not everyone should be able to download everything. Blog publishing needed a proper rich text experience, not raw HTML or a generic third-party CMS that the team would never adopt. And the whole thing needed to be built, deployed, and maintained by one developer.

### What Was Built

The public-facing website was built with Nuxt 2 in SSR mode. SEO was a primary distribution channel. The Tamil diaspora finds content through Google searches, so server-side rendering was chosen to make articles, book listings, and pages available to search crawlers from launch.

Firebase was chosen as the backend: Firestore for the database, Firebase Storage for PDFs and images, Cloud Functions for server-side logic, and Firebase Auth with custom JWT claims for role management. For a solo developer building a content platform with no infrastructure budget, this was the right stack. It eliminated the need to manage servers, handle deployments of a separate backend, or set up a database cluster.

### The CMS

The most significant piece of work on this project was the custom CMS. Rather than integrating a third-party solution, a complete admin panel was built from scratch (one that gave editors control over every line of content on the website. Article titles, body text, hero sections, navigation labels, book descriptions, author profiles) all editable through a clean interface built specifically for how the editorial team actually worked.

This decision was deliberate. Generic headless CMS platforms require configuration, have learning curves, and often introduce abstractions that don't match the mental model of a non-technical team. A custom admin panel that looked and felt like the website it controlled meant the team needed almost no training. After a single walkthrough, editors were publishing independently.

Quill.js was used as the rich text editor through vue2-editor. It gave editors a familiar word-processor-like experience (bold, italic, image embedding, links, formatting) without any HTML knowledge required. Image uploads from within the editor went directly to Firebase Storage, with dimensions normalized via Cloud Functions before storage.

### The Book Library

The PDF book library was one of the more technically interesting parts of the platform. Books were stored in Firebase Storage, but direct URLs were never exposed. Instead, Cloud Functions generated time-limited signed URLs on demand, URLs that expired after a short window to limit the lifetime of download access.

The platform is nonprofit and fully free. Downloads are available to registered users. Admin and editor roles had full access. Users could download. Guests could browse descriptions but not download. This was enforced server-side through the JWT claims system, the signed URL generation function validated the user's role before issuing a URL, so access checks did not depend only on the client.

### Role-Based Access Control

Three roles were implemented: Admin, Editor, and User. Firebase Auth handled the authentication layer, while custom JWT claims carried the role information. Cloud Functions handled role assignment server-side, ensuring no client could self-assign a higher role. Nuxt middleware enforced route-level access control, redirecting users to the appropriate page before any content loaded.

reCAPTCHA v3 was added to contact forms to prevent spam submissions, processed through Cloud Functions that also handled email notification delivery.

### The Outcome

AmericanTamil.org launched as a live production platform, fully SSR, with a working CMS, a members-only book library, blog publishing, role-based access, and a contact system, all built and shipped solo alongside other client work. The editorial team took over content management within days of launch and have operated independently since. The platform ranks for Tamil diaspora content on Google, which was the primary goal from day one.

### Stack

Nuxt 2 (SSR)

Firebase (Firestore, Auth, Storage, Cloud Functions)

Firebase Admin

Node.js

Vuex

VuexFire

Quill.js

vue2-editor

PWA

JWT

reCAPTCHA

Luxon

SCSS

GCP

## School ERP SaaS

### The Problem

Walk into most private schools in India with 200 to 600 students, and you will find the same scene: fee collection tracked in physical registers, attendance marked on paper and transcribed to Excel at the end of the day, and parent communication happening through a patchwork of WhatsApp groups managed by individual teachers. The schools are not poorly run; they just never had software built for them.

Enterprise ERP systems exist for large schools, but they are expensive, complex, and assume the presence of dedicated IT staff. The smaller school segment (which represents the majority of private schools in India) has been largely ignored. They cannot afford ₹50,000/year per school, they cannot train non-technical staff on complex interfaces, and they need a system that fits how they actually communicate with parents: through WhatsApp.

This is what the School ERP SaaS was built to solve. A product designed specifically for CBSE private schools and Maharashtra and MP state board schools, priced at approximately ₹10,000 per school per year, with WhatsApp as a first-class communication channel throughout the entire system.

### What Was Built

The product is a multi-tenant SaaS platform: one codebase and one infrastructure serving many schools, each completely isolated from the others. Every piece of school data lives behind a schoolId, sourced exclusively from the JWT token on every request. No school can access another school's data, and this is enforced at the middleware level, not just the query level.

Six roles were designed into the system: super admin (platform-wide), admin (multi-school access), principal, accountant, teacher, and worker. Each role has a specific set of permissions defined in a static permission catalog. Every protected route is guarded by a requirePermission middleware that checks the token's role against the permission required, requirePermission('finances.fees.collect'), for example. The system was designed so that a future custom role builder would only need to change the data source for permissions, not the middleware itself.

### The Technical Foundation

PostgreSQL was chosen over Firebase or MongoDB after careful consideration. Student data is deeply relational: a student has admissions records, fee payment history, attendance records, guardian contacts, class assignments, and document uploads, all linked together. A document database would have required significant denormalization and made queries that span multiple data types complex and fragile. PostgreSQL with Prisma gave proper foreign keys, transactions, and the ability to write clean queries without workarounds.

Custom JWT authentication was built rather than using an auth service. The reason was architectural: every API route is scoped to a schoolId that must come only from the server-issued token, never from the request body. The choice kept school scoping within the application’s authentication flow and avoided introducing a separate service and synchronization layer.

WhatsApp was chosen as the primary parent communication channel because it is where Indian school parents actually are. SMS is expensive and largely ignored. Email is rarely checked by parents in this school segment. WhatsApp penetration in Indian school communities is near-universal, and parents are already conditioned to receive school updates there. A two-tier architecture was built: a base tier using a shared platform number for one-way confirmations like fee receipts and attendance alerts, and a premium tier with a dedicated per-school number for push notifications and two-way communication. The integration was built through Meta Cloud API directly, using a provider-agnostic adapter interface so the underlying provider can be swapped without changing application logic.

BullMQ with Redis handles all asynchronous work: WhatsApp message delivery, email notifications, Excel imports, and database backups. Five named queues ensure different job types are processed with appropriate priority and retry behavior. Nothing that could take time blocks the request/response cycle.

### The Product Decisions That Mattered

Two product controls were built in by design. First, Aadhaar-based student deduplication was implemented at admission. Each student is identified by their Aadhaar number, so their history follows them when they transfer to another school on the platform, and duplicates are prevented at the database level.

Second, changes to a student’s fee structure require two-person approval: the accountant makes the change, and a principal or admin confirms it. This is enforced by the system.

Excel import was built with per-row error reporting because schools migrating from spreadsheets will always have messy data. Rejecting an entire import because three rows have formatting issues is unusable in practice. Each row is validated independently, errors are reported with row numbers and specific messages, and valid rows are imported while invalid ones are returned for correction.

### The Outcome

The platform is in beta testing. It has multi-tenant architecture, six working roles, student admissions with Aadhaar deduplication, attendance tracking with WhatsApp alerts per student, fee collection with WhatsApp receipts, two-person approval for student fee-structure changes, Excel import with error reporting, automated database backups to Cloudflare R2, a Super Admin panel for platform management, and full WhatsApp Business API integration running on Meta's Cloud API.

The first school onboarding is planned immediately after deployment. The architecture is built to scale: adding a new school is a matter of onboarding, not configuration.

### Stack

Next.js (App Router)

TypeScript

Tailwind CSS

Node.js

Express 5

PostgreSQL

Prisma 7

BullMQ

Redis

Cloudflare R2

ZeptoMail

WhatsApp Business API (Meta Cloud API)

JWT

Playwright

pnpm monorepo

Railway

Docker
