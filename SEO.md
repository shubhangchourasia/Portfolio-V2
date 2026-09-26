# Search and sharing setup

Production origin: https://shubhangchourasia.com

All four pages have unique titles and descriptions, static canonical URLs, author and robots metadata, focused keywords, Open Graph previews for LinkedIn and other compatible platforms, and X/Twitter large-image cards. No unverified social handle or publication dates are supplied.

Each page has a dedicated 1200 x 630 PNG social image. Structured data describes the person, website, profile page, and case-study articles and breadcrumbs. Search engines choose whether to use these features; metadata does not guarantee ranking or a rich result. Google does not use the keywords meta tag for ranking.

HTML uses a site header, labeled navigation, one main element and H1, article/section headings, a footer, a skip link, and descriptive image alternatives. The content remains available without JavaScript. The page layout and theme remain unchanged.

Deployment follow-up:
- Serve this directory at the HTTPS origin above, including assets, robots.txt and sitemap.xml.
- Configure permanent redirects from HTTP, www and /index.html to their preferred HTTPS canonical equivalents on the host. Preserve case-study paths.
- Verify ownership in Google Search Console and Bing Webmaster Tools, then submit /sitemap.xml. Verification tags require the tokens issued to the owner; none are fabricated.
- Check live previews with LinkedIn Post Inspector and validate structured data with Google's Rich Results Test after deployment.
- Return real HTTP 404 responses for missing pages; avoid a blanket homepage fallback.

Canonical links and sharing URLs are in the HTML source, not inserted by JavaScript. If the domain changes, update those URLs, JSON-LD, robots.txt and sitemap.xml together.
