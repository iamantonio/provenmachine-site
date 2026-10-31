// Static site generator for provenmachine.com. No dependencies.
// Usage: node build.mjs   → writes ./public
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { studio, apps } from "./src/apps.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "public");

// ---------- helpers ----------
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Inline markup for data strings: **bold**, [text](url), `code`. Everything else escaped.
const md = (s = "") =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
const p = (s) => (Array.isArray(s) ? s : [s]).filter(Boolean).map((x) => `<p>${md(x)}</p>`).join("\n");
const list = (items) => `<ul>${items.map((x) => `<li>${md(x)}</li>`).join("")}</ul>`;
const mail = (e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`;
const fmtDate = (iso) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

function write(rel, html) {
  const file = join(out, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function icon(app, size = "") {
  if (app.icon) {
    return `<img class="icon ${size}" src="/icons/${esc(app.slug)}.png" alt="" width="128" height="128" loading="lazy">`;
  }
  return `<span class="icon icon-letter ${size}" aria-hidden="true">${esc(app.name[0])}</span>`;
}

// ---------- layout ----------
function layout({ title, description, path, body, app }) {
  const canonical = `https://${studio.domain}${path}`;
  const appNav = app
    ? `<nav class="appnav" aria-label="${esc(app.name)}">
        ${[
          ["", "Overview"],
          ["support", "Support"],
          ["privacy", "Privacy"],
          ["terms", "Terms"],
        ]
          .map(([seg, label]) => {
            const href = `/apps/${app.slug}${seg ? "/" + seg : "/"}`;
            const cur = href === path || (seg === "" && path === `/apps/${app.slug}/`);
            return `<a href="${href}"${cur ? ' aria-current="page"' : ""}>${label}</a>`;
          })
          .join("")}
      </nav>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="theme-color" content="#F2F4F6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131B23" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site">
  <div class="wrap bar">
    <a class="wordmark" href="/">Proven<span>Machine</span></a>
    <nav aria-label="Site"><a href="/#apps">Apps</a><a href="/contact">Contact</a></nav>
  </div>
</header>
${
  app
    ? `<div class="apphead"><div class="wrap">
  <a class="appid" href="/apps/${app.slug}/">${icon(app, "sm")}<span>${esc(app.name)}</span></a>
  ${appNav}
</div></div>`
    : ""
}
<main id="main" class="wrap">
${body}
</main>
<footer class="site">
  <div class="wrap foot">
    <p>© ${new Date().getFullYear()} ${esc(studio.entity)}</p>
    <nav aria-label="Footer"><a href="/privacy">Website privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></nav>
  </div>
</footer>
</body>
</html>
`;
}

// ---------- the data ledger (signature element) ----------
const LEDGER_ROWS = [
  ["collected", "Collected by us"],
  ["leaves", "Leaves your device"],
  ["shared", "Shared with third parties"],
  ["tracking", "Used to track you"],
];
function ledger(app) {
  const rows = LEDGER_ROWS.map(([k, label]) => {
    const v = app.ledger[k];
    const tone = v.answer === "No" ? "pass" : "note";
    return `<div class="row">
      <dt>${label}</dt>
      <dd><span class="mark ${tone}">${esc(v.answer)}</span><span class="why">${md(v.detail)}</span></dd>
    </div>`;
  }).join("");
  return `<section class="ledger" aria-labelledby="ledger-h">
    <h2 id="ledger-h">${md(app.ledger.headline)}</h2>
    <dl>${rows}</dl>
  </section>`;
}

// ---------- pages ----------
function homePage() {
  const live = apps.filter((a) => !a.hidden);
  const rows = live
    .map(
      (a) => `<li class="app">
      <a class="app-main" href="/apps/${a.slug}/">${icon(a)}<span class="app-text"><span class="app-name">${esc(a.name)}</span><span class="app-tag">${esc(a.tagline)}</span></span></a>
      <span class="app-links"><a href="/apps/${a.slug}/support">Support</a><a href="/apps/${a.slug}/privacy">Privacy</a><a href="/apps/${a.slug}/terms">Terms</a></span>
    </li>`
    )
    .join("\n");
  const body = `
<section class="hero">
  <h1>Small iPhone apps that do one job and keep your data on your phone.</h1>
  <p class="lede">${esc(studio.entity)} is an independent studio. Every app below has its own support page, privacy policy and terms. Each privacy policy opens with a plain answer to what data leaves your device.</p>
</section>
<section id="apps" aria-labelledby="apps-h">
  <h2 id="apps-h" class="section-h">Apps</h2>
  <ul class="apps">${rows}</ul>
</section>`;
  return layout({ title: `${studio.name}: iPhone apps`, description: `Support, privacy policies and terms for ${studio.name} iOS apps.`, path: "/", body });
}

function appOverview(a) {
  const store = a.appStoreId
    ? `<a class="button" href="https://apps.apple.com/app/id${esc(a.appStoreId)}">View on the App Store</a>`
    : `<p class="soon">Coming soon to the App Store.</p>`;
  const body = `
<section class="overview">
  ${icon(a, "lg")}
  <h1>${esc(a.name)}</h1>
  <p class="lede">${esc(a.tagline)}</p>
  ${p(a.description)}
  ${a.features ? list(a.features) : ""}
  ${store}
</section>
${ledger(a)}
<p class="more">Read the full <a href="/apps/${a.slug}/privacy">privacy policy</a>, get <a href="/apps/${a.slug}/support">support</a>, or see the <a href="/apps/${a.slug}/terms">terms of use</a>.</p>`;
  return layout({ title: `${a.name}: ${a.tagline}`, description: a.tagline, path: `/apps/${a.slug}/`, body, app: a });
}

function privacyPage(a) {
  const pv = a.privacy;
  const sec = (h, html) => (html ? `<section><h2>${h}</h2>${html}</section>` : "");
  const table = (rows, cols) =>
    `<div class="table"><table><thead><tr>${cols.map((c) => `<th scope="col">${c[1]}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r) => `<tr>${cols.map((c, i) => (i === 0 ? `<th scope="row">${md(r[c[0]])}</th>` : `<td>${md(r[c[0]])}</td>`)).join("")}</tr>`)
      .join("")}</tbody></table></div>`;

  const body = `
<article class="doc">
  <h1>${esc(a.name)} privacy policy</h1>
  <p class="meta">Effective ${fmtDate(a.updated)}</p>
  ${ledger(a)}
  ${sec("Who we are", `<p>${esc(a.name)} is published by ${esc(studio.entity)} (“we”, “us”). Questions about this policy go to ${mail(a.email)}.</p>`)}
  ${sec("What the app stores", p(pv.stores.intro) + (pv.stores.items ? list(pv.stores.items) : ""))}
  ${sec(
    "What leaves your device",
    pv.network.length
      ? p(pv.networkIntro || "The app connects to the following services. Nothing else is sent anywhere.") +
          table(pv.network, [
            ["service", "Service"],
            ["sent", "What is sent"],
            ["why", "Why"],
          ])
      : p(pv.networkIntro || "Nothing. The app makes no network requests with your data. It works fully offline.")
  )}
  ${sec(
    "Permissions",
    pv.permissions.length
      ? p("The app asks for these permissions only when you use the feature that needs them. You can change them any time in Settings.") +
          table(pv.permissions, [
            ["name", "Permission"],
            ["why", "Used for"],
          ])
      : p("The app does not request access to your contacts, photos, location, camera, microphone or other protected data.")
  )}
  ${sec("Purchases", p(pv.purchases))}
  ${sec("Analytics, advertising and tracking", p(pv.analytics || `${a.name} contains no analytics, advertising or crash-reporting SDKs, and does not track you across apps or websites owned by other companies. We do not sell or share personal information.`))}
  ${sec("Keeping and deleting your data", p(pv.deletion))}
  ${pv.extra ? pv.extra.map((x) => sec(esc(x.h), p(x.body) + (x.items ? list(x.items) : ""))).join("") : ""}
  ${sec("Children", p(pv.children || `${a.name} is not directed at children under 13, and we do not knowingly collect personal information from children.`))}
  ${sec(
    "Your rights",
    p(
      pv.rights ||
        `Depending on where you live (for example under the GDPR in the EU and UK, or the CCPA in California), you may have the right to access, correct, delete or move personal information we hold about you, and to object to its use. Because ${a.name} keeps your data on your device, you can exercise most of these rights directly in the app. For anything else, email ${a.email} and we will reply within 30 days.`
    )
  )}
  ${sec("Changes to this policy", p(`If we change how ${a.name} handles data, we will update this page and the effective date above before the change ships. Significant changes will also be noted in the app’s release notes.`))}
  ${sec("Contact", `<p>${esc(studio.entity)} · ${mail(a.email)}</p>`)}
</article>`;
  return layout({
    title: `Privacy policy: ${a.name}`,
    description: `How ${a.name} handles your data. ${a.ledger.headline.replace(/\*\*/g, "")}`,
    path: `/apps/${a.slug}/privacy`,
    body,
    app: a,
  });
}

function supportPage(a) {
  const s = a.support;
  const faqs = [...(s.faq || [])];
  if (a.purchaseKind === "subscription") {
    faqs.push({
      q: "How do I cancel my subscription?",
      a: "Open **Settings → [your name] → Subscriptions** on your iPhone, choose " + a.name + ", and tap Cancel Subscription. You keep access until the end of the current billing period. Apple handles all billing, so we can’t cancel it for you.",
    });
  }
  if (a.purchaseKind) {
    faqs.push({
      q: "I bought this before. How do I get it back?",
      a: `Sign in with the same Apple Account you bought it with, then use **Restore Purchases** ${s.restoreWhere || "in the app’s settings"}. Purchases carry over to every device signed in to that account.`,
    });
    faqs.push({
      q: "How do I get a refund?",
      a: "Refunds are handled by Apple. Request one at [reportaproblem.apple.com](https://reportaproblem.apple.com).",
    });
  }
  faqs.push({ q: "How do I delete my data?", a: a.privacy.deletion });

  const body = `
<article class="doc">
  <h1>${esc(a.name)} support</h1>
  <div class="contact-card">
    <p>Email <strong>${mail(a.email)}</strong>. A person reads every message, usually within two business days.</p>
    <p class="hint">It helps to include your iPhone model, iOS version and the app version (shown in ${esc(s.versionWhere || "the app’s settings")}).</p>
  </div>
  <section>
    <h2>Common questions</h2>
    <div class="faq">
    ${faqs.map((f) => `<details><summary>${md(f.q)}</summary>${p(f.a)}</details>`).join("\n")}
    </div>
  </section>
  <section><h2>Requirements</h2>${p(s.requirements || `iPhone running iOS ${a.minIOS} or later.`)}</section>
  <section><h2>More</h2><p>Read the <a href="/apps/${a.slug}/privacy">privacy policy</a> or the <a href="/apps/${a.slug}/terms">terms of use</a>.</p></section>
</article>`;
  return layout({ title: `Support: ${a.name}`, description: `Get help with ${a.name}.`, path: `/apps/${a.slug}/support`, body, app: a });
}

function termsPage(a) {
  const purchases =
    a.purchaseKind === "subscription"
      ? `${a.terms?.purchases || ""} Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Your Apple Account is charged for renewal within 24 hours before the period ends. Any unused portion of a free trial is forfeited when you buy a subscription. Manage or cancel in Settings → [your name] → Subscriptions.`
      : a.purchaseKind
      ? `${a.terms?.purchases || ""} Purchases are processed by Apple and are subject to Apple’s terms. Refunds are handled by Apple.`
      : `${a.name} is free to download and use.`;
  const extra = a.terms?.extra || [];
  const body = `
<article class="doc">
  <h1>${esc(a.name)} terms of use</h1>
  <p class="meta">Effective ${fmtDate(a.updated)}</p>
  <section><h2>The agreement</h2>${p(`These terms are between you and ${studio.entity}. By using ${a.name} you agree to them. Your use of the app is also governed by Apple’s [Licensed Application End User License Agreement](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/) (the “Standard EULA”). Where these terms and the Standard EULA conflict, the Standard EULA applies.`)}</section>
  <section><h2>Purchases</h2>${p(purchases.trim())}</section>
  ${extra.map((x) => `<section><h2>${esc(x.h)}</h2>${p(x.body)}</section>`).join("")}
  <section><h2>Your data</h2>${p(`How the app handles your information is described in the [${a.name} privacy policy](/apps/${a.slug}/privacy). You are responsible for keeping your own backups of data stored on your device.`)}</section>
  <section><h2>Acceptable use</h2>${p("Don’t use the app to break the law, to infringe anyone else’s rights, or to reverse engineer, resell or interfere with the app, except as the law allows.")}</section>
  <section><h2>No warranty</h2>${p(`${a.name} is provided “as is” and “as available”. To the fullest extent the law permits, we make no warranties of any kind, express or implied, including that the app will be error-free or meet your needs. ${a.terms?.disclaimer || ""}`)}</section>
  <section><h2>Limitation of liability</h2>${p(`To the fullest extent the law permits, ${studio.entity} is not liable for any indirect, incidental, special or consequential damages, or for lost data or profits, arising from your use of the app. Our total liability for any claim is limited to the amount you paid for the app in the twelve months before the claim. Some places don’t allow these limits, so they may not apply to you.`)}</section>
  <section><h2>Changes</h2>${p("We may update these terms. If we do, we’ll change the effective date above. Continuing to use the app after a change means you accept the new terms.")}</section>
  <section><h2>Contact</h2><p>${esc(studio.entity)} · ${mail(a.email)}</p></section>
</article>`;
  return layout({ title: `Terms of use: ${a.name}`, description: `Terms of use for ${a.name}.`, path: `/apps/${a.slug}/terms`, body, app: a });
}

function sitePrivacy() {
  const body = `
<article class="doc">
  <h1>Website privacy</h1>
  <p class="meta">Effective ${fmtDate(studio.updated)}</p>
  ${p([
    `This policy covers the website ${studio.domain}. Each app has its own privacy policy, linked from the [app list](/#apps).`,
    "This site sets no cookies and runs no analytics, advertising or tracking scripts. Pages are static files.",
    `Like any web server, our host (GitHub Pages) may keep standard request logs, such as IP address, browser and time, for security and operations. We don’t use those logs to identify you. Fonts load from Google Fonts, which receives your IP address when it serves them.`,
    `If you email us, we use your message only to reply, and we delete it when it’s no longer needed. Contact ${studio.email}.`,
  ])}
</article>`;
  return layout({ title: `Website privacy: ${studio.name}`, description: "Privacy for provenmachine.com.", path: "/privacy", body });
}

function siteTerms() {
  const body = `
<article class="doc">
  <h1>Terms</h1>
  <p class="meta">Effective ${fmtDate(studio.updated)}</p>
  ${p([
    `Each ${studio.name} app has its own terms of use, linked from the [app list](/#apps). They work alongside Apple’s [Standard EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/).`,
    `This website and its content are © ${studio.entity}. App names and icons are trademarks of ${studio.entity}. The site is provided as is, without warranty.`,
    `Questions: ${studio.email}.`,
  ])}
</article>`;
  return layout({ title: `Terms: ${studio.name}`, description: "Terms for provenmachine.com and its apps.", path: "/terms", body });
}

function contactPage() {
  const rows = apps
    .filter((a) => !a.hidden)
    .map((a) => `<tr><th scope="row"><a href="/apps/${a.slug}/support">${esc(a.name)}</a></th><td>${mail(a.email)}</td></tr>`)
    .join("");
  const body = `
<article class="doc">
  <h1>Contact</h1>
  <p>For anything not about a specific app, email ${mail(studio.email)}.</p>
  <p>For help with an app, its support address reaches us fastest:</p>
  <div class="table"><table><thead><tr><th scope="col">App</th><th scope="col">Email</th></tr></thead><tbody>${rows}</tbody></table></div>
</article>`;
  return layout({ title: `Contact: ${studio.name}`, description: `Contact ${studio.name}.`, path: "/contact", body });
}

function notFound() {
  const body = `<article class="doc"><h1>This page isn’t here</h1><p>The link may be old or mistyped. Go to the <a href="/#apps">app list</a> to find support, privacy and terms for every app.</p></article>`;
  return layout({ title: "Page not found", description: "Page not found.", path: "/404", body });
}

// ---------- build ----------
if (existsSync(out)) rmSync(out, { recursive: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, "src/static"), out, { recursive: true });
cpSync(join(root, "src/icons"), join(out, "icons"), { recursive: true });

write("index.html", homePage());
write("privacy.html", sitePrivacy());
write("terms.html", siteTerms());
write("contact.html", contactPage());
write("404.html", notFound());
for (const a of apps) {
  write(`apps/${a.slug}/index.html`, appOverview(a));
  write(`apps/${a.slug}/privacy.html`, privacyPage(a));
  write(`apps/${a.slug}/support.html`, supportPage(a));
  write(`apps/${a.slug}/terms.html`, termsPage(a));
  for (const alias of a.aliases || []) {
    write(`apps/${alias}/index.html`, `<!doctype html><meta charset="utf-8"><title>${esc(a.name)}</title><meta http-equiv="refresh" content="0; url=/apps/${a.slug}/"><link rel="canonical" href="/apps/${a.slug}/">`);
    for (const pg of ["privacy", "support", "terms"])
      write(`apps/${alias}/${pg}.html`, `<!doctype html><meta charset="utf-8"><title>${esc(a.name)}</title><meta http-equiv="refresh" content="0; url=/apps/${a.slug}/${pg}"><link rel="canonical" href="/apps/${a.slug}/${pg}">`);
  }
}
const urls = ["/", "/contact", "/privacy", "/terms", ...apps.flatMap((a) => ["", "support", "privacy", "terms"].map((s) => `/apps/${a.slug}/${s}`))];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>https://${studio.domain}${u}</loc></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: https://${studio.domain}/sitemap.xml\n`);
write("CNAME", studio.domain + "\n");
console.log(`Built ${urls.length} pages for ${apps.length} apps → public/`);
