# Jeap Technologies — Website

This repository contains the static website for Jeap Technologies (site built from a cloned template). This README documents the current state, identified remnants of the original source, security notes, and push instructions.

## What I checked
- Searched the codebase for references to the original site and cloning artifacts (HTTrack). Found several occurrences and external references.
- Inspected front-end JavaScript for any dynamic rewriting of the WhatsApp link; the site uses static `wa.me` anchors (no client-side rewriting detected).

## Findings (items you may want to address)
- HTTrack traces and mirrored comments in HTML footers:
  - `hivesecurityconsult.com/services.html` (footer comment: "Mirrored from hivesecurityconsult.com/... by HTTrack")
  - `hivesecurityconsult.com/contact.html` and `t.params.html` include similar mirrored comments.
  - `hts-cache/` contains HTTrack cache metadata referencing the original site.
  Suggestion: remove `hts-cache/`, `t.params.html`, and the mirrored HTML comments (they're safe to remove for production sites).

- Absolute external references to the original domain:
  - A few commented-out image references point to `https://hivesecurityconsult.com/...` in `index.html`. Replace with local assets or remove.

- Placeholder WhatsApp links:
  - Some portfolio pages use `https://wa.me/YOUR_PHONE_NUMBER` — replace those with the canonical number used on the site (`+233557889480`) or with the number you choose.

- Inconsistent numbers:
  - Most pages use `+233557889480`. Some checkout pages reference `+233241240813`. Decide which number is correct and standardize across the site.

- Branding artifacts:
  - Some pages and titles still contain HIVE or ImpactHive names (`HIVE - Contact`, `ImpactHive slide`) or emails like `hiveteamconsult@gmail.com`. These are harmless but may confuse visitors — consider updating copy and alt text.

## Security notes about the WhatsApp link
- Current implementation: static anchors linking to `https://wa.me/<phone>` across HTML files.
- Immediate risks:
  - Static links cannot be rerouted unless someone modifies the deployed files or a malicious script runs on the page.
  - If you include third-party scripts (CDN or otherwise), a compromised script could alter DOM anchors; reduce risk by using a Content Security Policy (CSP) and limiting remote script sources.
  - If you allow user-generated content that can inject HTML/JS, sanitize it — otherwise an attacker could change links client-side.

- Recommendations to harden WhatsApp link:
  1. Standardize the single correct number across all files and remove placeholder `YOUR_PHONE_NUMBER` instances.
  2. Add `rel="noopener noreferrer"` and `target="_blank"` to external links (I already added these for some portfolio links earlier).
  3. Serve the site over HTTPS and enable a strict CSP header (for example: `Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.example.com; img-src 'self' data:;`), configured at the web server level.
  4. Avoid including untrusted third-party scripts; pin versions and use Subresource Integrity (SRI) where possible.
  5. Make the WhatsApp number a single source-of-truth: e.g., a small server-side include or build-time constant so you don't have to edit many files.

## Cleanup suggestions (safe to perform)
- Remove `hts-cache/` directory and `t.params.html`.
- Remove or replace mirrored HTTrack comments in the HTML footers.
- Replace remote `https://hivesecurityconsult.com/...` references with local copies in `assets/img/...` or delete them if not used.
- Standardize WhatsApp numbers and replace `YOUR_PHONE_NUMBER` placeholders.

## How to push to GitHub
1. Initialize a repo locally (if you haven't):

```bash
cd "/Users/syg/websites/Jeap Technologies"
git init
git add .
git commit -m "Initial import of Jeap Technologies website"
# Create a GitHub repo (e.g., via web UI) and then add remote:
git remote add origin git@github.com:<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

2. If you prefer HTTPS remote URL, use `https://github.com/<user>/<repo>.git`.

## Next steps I can do for you
- Remove HTTrack artifacts and the `hts-cache/` directory (I won't delete without your confirmation).
- Standardize all WhatsApp links to your chosen number.
- Add a basic CSP sample and instructions to enable it on your host.
- Create a clean commit history (I can initialize a git repo here and prepare commits, but pushing requires your GitHub credentials or an existing remote).

If you want, I can now (A) remove the HTTrack files and mirrored comments, (B) replace all `YOUR_PHONE_NUMBER` placeholders with `+233557889480` and unify the checkout phone numbers, and (C) create a git repo and commit these changes locally and show you the exact git commands to push. Which of these would you like me to perform now?