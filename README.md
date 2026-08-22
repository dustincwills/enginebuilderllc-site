# Engine Builder LLC website

This folder is a standalone static website for `enginebuilderllc.com`. It is intentionally separate from the TossLess web app at the repository root.

## Publish free with GitHub Pages

1. Create a **new public GitHub repository** named `enginebuilderllc-site`.
2. Upload the *contents* of this folder (not the `website` folder itself) to that repository’s default branch.
3. In the GitHub repository, go to **Settings → Pages** and select **Deploy from a branch**, then choose the default branch and `/ (root)` folder.
4. Once GitHub shows the temporary `github.io` address, open **Settings → Pages → Custom domain**, enter `enginebuilderllc.com`, and save. Do this before changing DNS. GitHub may immediately show **“improperly configured”** or `NotServedByPagesError`; that is expected until the next step is complete.
5. At the domain registrar, replace any old website records for the root (`@`) with these four **A** records:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |

6. Add one **CNAME** record for `www` pointing to `<your-github-username>.github.io` (replace the bracketed text with the GitHub username that owns the repository). Do not point `www` to `enginebuilderllc.com`.
7. Keep the existing **MX** records for `enginebuilderllc.com`; they control domain email and must not be removed. Remove only conflicting root-domain `A`/`AAAA` website records and any existing `www` CNAME.
8. DNS changes may take up to 24 hours. Return to **Settings → Pages** after the domain resolves, then enable **Enforce HTTPS** when GitHub makes that checkbox available.

Do not use wildcard DNS records. The root-domain addresses above and the `www` CNAME are GitHub Pages’ documented configuration.

## Before submitting to Apple

- Confirm `tosslesssupport@enginebuilderllc.com` receives mail and is monitored for support, privacy, and legal requests.
- Confirm `https://enginebuilderllc.com`, `https://www.enginebuilderllc.com`, the privacy page, and the terms page all load.
- If Apple asks for a business address or a phone number, provide the same real business details used for the LLC and Developer Program enrollment; add them to the Contact section only if you are comfortable making them public.
- Confirm that `/tossless/privacy.html` and `/tossless/support.html` reflect the final production providers and data-retention choices. These pages are product-specific; the root privacy and terms pages cover the company website only.
- Obtain legal review of `tossless/terms.html` before enabling its URL in the app. The existing root `terms.html` is only the company website agreement.
- Current legal drafting assumptions: Engine Builder LLC is organized in Ohio, its principal place of business is Ohio, and the initial TossLess launch is limited to the United States.

## Local preview

From this directory, run:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`. This only previews the static files locally; it does not publish anything.
