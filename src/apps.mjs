// Single source of truth for every app page on provenmachine.com.
// Facts here were verified against each app's source code on 2026-10-31.
// When an app changes how it handles data, update its entry, bump `updated`, and run `node build.mjs`.

export const studio = {
  name: "ProvenMachine",
  entity: "ProvenMachine LLC",
  domain: "provenmachine.com",
  email: "inquiry@provenmachine.com",
  updated: "2026-10-31",
};

const UPDATED = "2026-10-31";

// Reusable ledger answers
const no = (detail) => ({ answer: "No", detail });
const onlyIf = (detail, answer = "Only if you choose") => ({ answer, detail });

export const apps = [
  // ───────────────────────────────── Calibrate
  {
    slug: "calibrate",
    minIOS: "17",
    name: "Calibrate",
    tagline: "A private decision journal that shows how well calibrated your judgment is.",
    icon: true,
    appStoreId: "6789403906",
    bundleId: "com.calibrateapp.app",
    email: "calibrate@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "subscription",
    description: [
      "Log a decision with how confident you are, review it when the outcome is known, and Calibrate shows whether your 70% calls come true about 70% of the time.",
    ],
    features: [
      "Log decisions with options, stakes, confidence and a review date",
      "Review reminders when a decision is due",
      "Calibration chart and hit rate over time",
      "Home Screen widgets for what’s due next",
    ],
    ledger: {
      headline: "Your decisions stay on your iPhone.",
      collected: no("We never receive your decisions, notes or outcomes."),
      leaves: no("Calibrate makes no network requests. There is no account and no cloud sync."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "Everything you enter is stored on your device in the app’s private database:",
        items: [
          "Decisions: title, notes, options, confidence, stakes, review date, outcome and hindsight notes",
          "A small summary for the Home Screen widget (number of decisions due, the next decision’s title, your hit rate), kept in a container shared only between the app and its widget",
          "Two app preferences, such as whether you’ve finished onboarding",
        ],
      },
      network: [],
      permissions: [{ name: "Notifications", why: "Reminding you when a decision is due for review. Reminders are scheduled on the device." }],
      purchases:
        "Calibrate Pro is an optional subscription (monthly or yearly, with a one-week free trial on eligible plans) sold through Apple’s App Store. Apple processes the payment; we never see your payment details. The app checks your subscription status with Apple’s StoreKit.",
      deletion:
        "You can delete any decision in the app by swiping it or from its detail screen. Deleting the app removes all of its data from your device. Pro subscribers can export their decisions as a CSV file at any time. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      versionWhere: "Settings inside the app",
      faq: [
        { q: "What does the free version include?", a: "Unlimited decision logging. Free shows your 10 most recent reviewed decisions in history and a 30-day insights window. Calibrate Pro unlocks your full history, all-time insights and CSV export." },
        { q: "Does Calibrate sync between my devices?", a: "No. Your journal lives only on the device where you created it, and it is included in your regular iPhone backup." },
        { q: "I’m not getting review reminders.", a: "Check **Settings → Notifications → Calibrate** and make sure notifications are allowed. Reminders are scheduled for each decision’s review date." },
      ],
    },
    terms: {
      disclaimer: "Calibrate helps you reflect on your own decisions. It does not give financial, medical, legal or other professional advice.",
    },
  },

  // ───────────────────────────────── CashSplit
  {
    slug: "cashsplit",
    minIOS: "17",
    name: "CashSplit",
    tagline: "Who pays whom, in seconds. A bill splitter for cash and payment apps.",
    icon: true,
    appStoreId: "6780253703",
    bundleId: "com.tony.cashsplit",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: [
      "Enter who paid what, by cash or by app, and CashSplit works out the shortest list of who pays whom. It balances to the cent.",
    ],
    features: [
      "Mixed cash, Venmo and Cash App settlements",
      "Receipt scanning that reads totals on your device",
      "Share cards to send the result to your group",
    ],
    ledger: {
      headline: "Your splits stay on your iPhone.",
      collected: no("We never receive names, amounts or receipts."),
      leaves: onlyIf("Only when you tap a Venmo or Cash App payment link. The app then opens that service with the handle, amount and note you entered."),
      shared: no("We don’t share anything. A payment link goes straight from your phone to the payment app you chose."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "CashSplit stores the following on your device only:",
        items: [
          "Saved splits: people’s names, amounts, payment method and any Venmo or Cash App handles you enter",
          "Your in-progress split and app settings",
        ],
      },
      networkIntro:
        "CashSplit makes no network requests of its own. It never sends anything to us. The only time information leaves the app is when you choose to open a payment link:",
      network: [
        { service: "Venmo or Cash App (only when you tap a payment link)", sent: "The recipient’s handle, the amount and the note, as part of the link", why: "Opening the payment so you can send it. That service’s own privacy policy applies from there." },
      ],
      permissions: [
        { name: "Camera", why: "Scanning a receipt. The text is read on your device with Apple’s Vision framework, and the photo is not saved." },
      ],
      purchases:
        "CashSplit Pro is an optional one-time purchase sold through Apple’s App Store. Apple processes the payment; we never see your payment details.",
      deletion:
        "Use **Delete all history** in the app’s settings to erase every saved split and your in-progress draft. You can also delete splits one at a time. Deleting the app removes all of its data. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "What does Pro add?", a: "Free saves your 3 most recent splits. Pro adds unlimited history, receipt scanning, CSV export and extra share-card styles." },
        { q: "Does CashSplit send money?", a: "No. CashSplit works out who owes whom. When you tap a Venmo or Cash App link, the payment happens in that app, not in CashSplit." },
        { q: "The totals are off by a cent.", a: "CashSplit assigns leftover cents so the settlement always balances exactly. If a result still looks wrong, email us the amounts and we’ll look into it." },
      ],
    },
    terms: {
      extra: [{ h: "Not a payment service", body: "CashSplit calculates settlements. It does not move money or hold funds. Payments you make through Venmo, Cash App or any other service are between you and that service." }],
      disclaimer: "Check amounts before you pay anyone.",
    },
  },

  // ───────────────────────────────── Hearthkeep
  {
    slug: "hearthkeep",
    minIOS: "17",
    name: "Hearthkeep",
    tagline: "A private home inventory for insurance claims and moves.",
    icon: true,
    appStoreId: "6779967392",
    bundleId: "com.hearthkeep.app",
    email: "hearthkeep@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: [
      "Catalog what you own room by room, with photos, values, serial numbers, receipts and warranties, so you are ready if you ever need to file an insurance claim.",
    ],
    features: [
      "Items with photos, values, serial numbers and documents",
      "Serial number scanning on your device",
      "Insurance-ready PDF reports and CSV export",
      "Optional iCloud sync and Face ID lock",
    ],
    ledger: {
      headline: "Your inventory stays on your devices.",
      collected: no("We never receive your items, photos or documents."),
      leaves: onlyIf("Only if you turn on iCloud sync, which stores your inventory in your own private iCloud account, or choose to email us a bug report."),
      shared: no("iCloud data lives in your Apple account. We can’t read it."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "Hearthkeep stores the following on your device:",
        items: [
          "Your inventory: items, rooms, values, serial numbers, warranty dates, notes, photos and attached documents",
          "Crash and performance diagnostics from Apple’s MetricKit, kept on the device and sent only if you include them in a bug report",
          "App settings, such as whether Face ID lock and iCloud sync are on",
        ],
      },
      networkIntro: "Hearthkeep sends nothing to us automatically. Data leaves your device only in these cases, all of which you control:",
      network: [
        { service: "Apple iCloud (CloudKit), off by default", sent: "Your inventory, stored in your private iCloud database", why: "Syncing between your devices. Apple’s privacy policy applies. We have no access to your private iCloud data." },
        { service: "Email to us (only when you send a bug report)", sent: "Your message, device model, iOS version, and diagnostics if you choose to attach them", why: "Helping us fix the problem you reported" },
      ],
      permissions: [
        { name: "Camera", why: "Photographing items and scanning serial numbers. Text is read on your device with Apple’s Vision framework." },
        { name: "Face ID", why: "The optional app lock. Face ID is handled by iOS. The app never sees your face data." },
        { name: "Notifications", why: "Reminders before a warranty expires, scheduled on the device" },
      ],
      purchases:
        "Hearthkeep Pro is an optional one-time purchase sold through Apple’s App Store. Apple processes the payment; we never see your payment details.",
      deletion:
        "Delete items individually in the app. Deleting the app removes local data. If you used iCloud sync, also remove Hearthkeep’s data in **Settings → [your name] → iCloud → Manage Account Storage**. You can export everything as CSV, a PDF report, or an encrypted backup file before deleting. Encrypted backups are protected by a passphrase only you know, so we can’t recover them.",
    },
    support: {
      faq: [
        { q: "What does the free version include?", a: "Up to 25 items with one photo each, plus CSV export. Hearthkeep Pro unlocks unlimited items and photos, PDF insurance reports and document attachments." },
        { q: "How do I move my inventory to a new iPhone?", a: "Turn on iCloud sync in the app’s settings, or create an encrypted backup and restore it on the new device. Keep your backup passphrase safe; it can’t be recovered." },
        { q: "Face ID lock won’t unlock.", a: "Make sure Face ID is allowed for Hearthkeep in **Settings → Face ID & Passcode → Other Apps**. You can always unlock with your device passcode." },
      ],
    },
    terms: {
      disclaimer: "Hearthkeep helps you keep records. It is not insurance advice, and we don’t guarantee that any insurer will accept its reports.",
    },
  },

  // ───────────────────────────────── TrialGuard
  {
    slug: "trialguard",
    minIOS: "17",
    name: "TrialGuard",
    tagline: "Kill free trials before they charge you.",
    icon: true,
    appStoreId: null,
    bundleId: "app.trialguard.TrialGuard",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: [
      "Share a trial signup email, web page or screenshot to TrialGuard. It picks out the service, price and charge date, then alerts you before you’re billed so you can cancel in time.",
    ],
    features: [
      "Add trials from the share sheet, a screenshot or by hand",
      "Time-sensitive alerts that get through Focus modes",
      "Home Screen widget for the next charge",
    ],
    ledger: {
      headline: "Your trials stay on your iPhone.",
      collected: no("We never receive your trials, emails or screenshots."),
      leaves: no("TrialGuard makes no network requests. Shared pages and screenshots are read on your device."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "TrialGuard stores the following on your device, in a container shared only by the app, its share extension and its widget:",
        items: [
          "Each trial: service name, charge date, price, billing period and cancel link",
          "App settings",
        ],
      },
      networkIntro:
        "Nothing. TrialGuard makes no network requests. When you share a web page, the share extension reads the page’s text, title and address on your device. Screenshots are read with Apple’s on-device text recognition. The app opens links in your browser only when you tap them, such as a cancel link or Apple’s subscriptions page.",
      network: [],
      permissions: [
        { name: "Notifications (time-sensitive)", why: "Alerting you before a trial charges, even when a Focus mode is on" },
        { name: "Background App Refresh", why: "Keeping alerts and the widget up to date" },
      ],
      purchases:
        "TrialGuard Unlock is an optional one-time purchase sold through Apple’s App Store, and it can be shared with your Family Sharing group. Apple processes the payment; we never see your payment details.",
      deletion:
        "Delete any trial in the app. Deleting the app removes all of its data, including data used by the share extension and widget. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "What does the free version include?", a: "Two active trials at a time. TrialGuard Unlock removes the limit." },
        { q: "TrialGuard didn’t pick up the right charge date.", a: "Open the trial and edit the date. Signup pages word things differently; if a particular service is read wrong every time, email us its name and we’ll improve detection." },
        { q: "Can TrialGuard cancel the trial for me?", a: "No. It reminds you and opens the cancel page or Apple’s subscriptions page. You cancel with the service itself." },
      ],
    },
    terms: {
      disclaimer: "Alerts depend on your device’s notification settings and may not arrive. You are responsible for cancelling any trial or subscription in time.",
    },
  },

  // ───────────────────────────────── Habits
  {
    slug: "habits",
    minIOS: "17",
    name: "Habits",
    tagline: "Forgiving streaks, no account. A simple habit tracker.",
    icon: true,
    appStoreId: "6786055485",
    bundleId: "com.tank.SimpleHabitTracker",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    restoreWhere: "on the app’s Settings screen",
    description: [
      "Track daily habits with streaks that forgive a missed day, so one slip doesn’t wipe out your progress.",
    ],
    features: ["Forgiving streaks", "Home Screen widget", "Optional daily reminder", "Export and import as JSON or CSV"],
    ledger: {
      headline: "Your habits stay on your iPhone.",
      collected: no("We never receive your habits or history."),
      leaves: no("Habits makes no network requests. There is no account."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "Habits stores the following on your device, in a container shared only by the app and its widget:",
        items: ["Your habits and check-in history", "Automatic on-device backups of that history", "App settings, such as your reminder time and accent color"],
      },
      network: [],
      permissions: [{ name: "Notifications", why: "The optional daily reminder, scheduled on the device" }],
      purchases:
        "The supporter tip is an optional one-time purchase sold through Apple’s App Store. It unlocks extra accent colors and app icons. Apple processes the payment; we never see your payment details.",
      deletion:
        "Delete any habit in the app. You can export your data as JSON or CSV first. Deleting the app removes all of its data, including backups. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "How do forgiving streaks work?", a: "Missing a single day doesn’t reset your streak. Your streak only breaks if you miss more than the allowed gap." },
        { q: "I lost my habits after an import.", a: "Habits keeps a backup from before every import. Restore it from the backup option in the app’s settings." },
        { q: "What does the tip unlock?", a: "Extra accent colors and supporter app icons. Every tracking feature is free." },
      ],
    },
  },

  // ───────────────────────────────── Return Window Radar
  {
    slug: "return-window-radar",
    minIOS: "16.4",
    name: "Return Window Radar",
    tagline: "Never miss a return deadline.",
    icon: true,
    appStoreId: "6785049120",
    bundleId: "com.provenmachine.returnwindowradar",
    email: "inquiry@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    aliases: ["returnwindowradar"],
    description: [
      "Add a purchase, snap the receipt, and Return Window Radar counts down to the last day you can return it, with reminders before the window closes.",
    ],
    features: ["Receipt capture with on-device text reading", "Reminders before each deadline", "Optional calendar events for deadlines"],
    ledger: {
      headline: "Your purchases stay on your phone.",
      collected: no("We never receive your purchases or receipts."),
      leaves: no("Return Window Radar makes no network requests with your data. There is no account."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "Return Window Radar stores the following on your device only:",
        items: ["Items you track: store, item name, purchase date, return deadline and notes", "Receipt photos, in the app’s private storage", "App settings and whether you’ve unlocked Radar Pro"],
      },
      networkIntro:
        "Nothing. The app makes no network requests with your data. Receipt text is read on your device: Apple’s Vision framework on iPhone, Google ML Kit’s on-device text recognition on Android. The app contacts the App Store or Google Play only to process purchases and when you choose to leave a review.",
      network: [],
      permissions: [
        { name: "Camera", why: "Photographing receipts" },
        { name: "Photo library", why: "Choosing an existing receipt photo" },
        { name: "Calendar (add events only)", why: "Adding a return deadline to your calendar when you ask. The app cannot read your calendar." },
        { name: "Notifications", why: "Reminders before a return window closes, scheduled on the device" },
      ],
      purchases:
        "Radar Pro is an optional one-time purchase sold through the App Store or Google Play. The store processes the payment; we never see your payment details.",
      deletion:
        "Delete an item to remove it and its receipt photos, or use **Clear all items** in Settings. Deleting the app removes all of its data. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "What does the free version include?", a: "Up to 5 active items. Radar Pro unlocks unlimited items." },
        { q: "How does the app know the return window?", a: "It suggests a window based on the store’s typical policy. Policies change and vary by item, so always check your receipt or the store’s website and adjust the deadline if needed." },
        { q: "I’m not getting reminders.", a: "Check that notifications are allowed for Return Window Radar in your phone’s settings." },
      ],
    },
    terms: {
      disclaimer: "Return windows suggested by the app are estimates. Always confirm the actual deadline with the retailer. We are not responsible for missed returns.",
    },
  },

  // ───────────────────────────────── Warranty Window Radar
  {
    slug: "warranty-window-radar",
    minIOS: "17",
    name: "Warranty Window Radar",
    tagline: "Know what is still covered.",
    icon: true,
    appStoreId: null,
    bundleId: "io.antoniovargas.WarrantyWindowRadar",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: [
      "Keep warranty end dates, receipts and proof of purchase in one place, with reminders before coverage runs out and a ready-to-send packet when you need to make a claim.",
    ],
    features: ["Receipt scanning on your device", "Reminders 30, 7 and 1 day before coverage ends", "PDF proof packets and a full warranty binder"],
    ledger: {
      headline: "Your warranties stay on your iPhone.",
      collected: no("We never receive your items, receipts or files."),
      leaves: no("Warranty Window Radar makes no network requests. There is no account and no cloud sync."),
      shared: no("Nothing is shared unless you export a PDF and send it yourself."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "The app stores the following on your device only:",
        items: [
          "Warranty records: item, seller, dates, price, serial and model numbers, manufacturer support details, claim case numbers and notes",
          "Receipts and proof files, kept in the app’s private storage with iOS file protection",
          "Reminder and app settings",
        ],
      },
      network: [],
      networkIntro: "Nothing. The app makes no network requests. It opens a support website or phone number only when you tap one you saved.",
      permissions: [
        { name: "Camera", why: "Scanning receipts. Text is read on your device." },
        { name: "Notifications", why: "Reminders before coverage ends. Item names are hidden on the Lock Screen by default." },
      ],
      purchases:
        "Warranty Window Radar Pro is an optional one-time purchase sold through Apple’s App Store, and it can be shared with your Family Sharing group. Apple processes the payment; we never see your payment details.",
      deletion:
        "Delete an item to remove it and its files. Deleting the app removes all of its data. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "What does the free version include?", a: "Up to 10 warranties with one proof file each. Pro unlocks unlimited records and files, the full PDF binder, custom reminders and the support-message builder." },
        { q: "Can I choose which photos the app sees?", a: "Yes. Photos and files are added through Apple’s pickers, so the app only receives the items you select." },
      ],
    },
    terms: {
      disclaimer: "Warranty terms are set by manufacturers and sellers. Confirm coverage with them. We are not responsible for missed claims.",
    },
  },

  // ───────────────────────────────── MemoryMapster
  {
    slug: "memorymapster",
    minIOS: "18.1",
    name: "MemoryMapster",
    tagline: "Turn your photos into a story atlas.",
    icon: true,
    appStoreId: null,
    bundleId: "com.provenmachine.memory-lane-map-app",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: ["Pick photos from a trip or a chapter of your life and MemoryMapster places them on a map, so you can tell the story of where you’ve been."],
    features: ["Places photos using their location data", "Story-book PDFs and share cards", "No account"],
    ledger: {
      headline: "Your photos stay on your iPhone.",
      collected: no("We never receive your photos or stories."),
      leaves: { answer: "Map lookups only", detail: "To draw maps and name places, the app sends map areas, search terms and photo coordinates to Apple Maps. Your photos are never uploaded." },
      shared: no("We don’t share anything. Apple Maps requests go directly from your phone to Apple."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "MemoryMapster stores the following on your device:",
        items: [
          "Your story: the places, captions and layout you create",
          "Copies of the photos you add, kept in the app’s private storage (included in your iCloud or computer backup)",
          "Whether you’ve unlocked Keep My Stories",
        ],
      },
      networkIntro: "MemoryMapster never sends anything to us. It uses Apple Maps services, which receive only what they need to show the map:",
      network: [
        { service: "Apple Maps (MapKit)", sent: "The map area you are viewing", why: "Drawing map tiles" },
        { service: "Apple Maps place search", sent: "Words you type when searching for a place", why: "Finding the place you’re looking for" },
        { service: "Apple geocoding", sent: "Coordinates from your photos’ location data", why: "Showing place names such as a city or landmark" },
      ],
      permissions: [],
      purchases:
        "Keep My Stories is an optional one-time purchase sold through Apple’s App Store. Apple processes the payment; we never see your payment details.",
      deletion:
        "Use **Delete This Story…** in the app’s settings to erase your story and its photo copies. The originals in your Photos library are never changed. Deleting the app removes all of its data. Because we never receive your data, there is nothing for us to delete on our side.",
      extra: [{ h: "Photo access", body: "Photos are chosen with Apple’s photo picker, so MemoryMapster only receives the photos you select. It never asks for access to your whole library or your current location." }],
    },
    support: {
      faq: [
        { q: "A photo landed in the wrong place.", a: "The app uses the location saved in the photo. Open the photo in the app and search for the right place to move it." },
        { q: "Some photos didn’t appear on the map.", a: "Photos without location data can’t be placed automatically. Open the photo and choose a place by hand." },
      ],
    },
  },

  // ───────────────────────────────── FrictionKiller
  {
    slug: "frictionkiller",
    minIOS: "17",
    name: "FrictionKiller",
    tagline: "Turn 1-star reviews into fixes.",
    icon: true,
    appStoreId: "6756983270",
    bundleId: "madhouseonmadison.frictionkillerapp",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "subscription",
    description: [
      "Pull in your app’s low-star App Store reviews, and FrictionKiller groups them into themes, ranks what’s hurting you most, and can write a suggested fix for each theme.",
    ],
    features: ["Imports public App Store reviews", "Groups and ranks complaint themes on your device", "Optional AI-written fixes (smart runs)", "Markdown export"],
    ledger: {
      headline: "Reviews are analyzed on your iPhone. Smart runs use our server.",
      collected: { answer: "Account only", detail: "If you sign in for smart runs, we keep your Apple account ID, email (if you share it), name and credit balance." },
      leaves: { answer: "Smart runs", detail: "A smart run sends theme summaries and up to three quotes per theme to our server, which asks an AI model for fixes." },
      shared: { answer: "Service providers", detail: "Smart-run content is processed by Anthropic (AI) and our host Render. It is not sold or used for ads." },
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "On your device, FrictionKiller stores:",
        items: [
          "Your analyses: themes, keywords, up to three quotes per theme, scores and smart-run results",
          "Your sign-in token, in the iOS Keychain",
          "Whether you’ve finished onboarding",
        ],
      },
      networkIntro: "FrictionKiller contacts these services:",
      network: [
        { service: "Apple App Store (public reviews feed)", sent: "The app you searched for, its ID and the country", why: "Downloading public reviews to analyze" },
        { service: "Sign in with Apple", sent: "Apple’s sign-in token. Your name and email only if you choose to share them.", why: "Creating your account for smart runs" },
        { service: "FrictionKiller server (api.frictionkiller.app)", sent: "For smart runs: the app name, review count, and for each theme its name, keywords, scores and up to three quotes", why: "Generating suggested fixes" },
        { service: "Anthropic (Claude API), via our server", sent: "The smart-run content above", why: "Writing the suggested fixes. Anthropic processes it on our behalf under its commercial API terms." },
        { service: "Render (hosting)", sent: "Everything our server handles, plus standard request logs (IP address, time, path)", why: "Running our server and database" },
        { service: "Apple App Store (purchases)", sent: "Signed purchase records", why: "Adding credits and checking your subscription" },
      ],
      permissions: [],
      purchases:
        "FrictionKiller Pro (a monthly subscription that includes credits) and credit packs are sold through Apple’s App Store. New accounts get 3 free credits. Apple processes the payment; we never see your payment details. Our server keeps records of your purchases and credit balance.",
      analytics:
        "FrictionKiller contains no analytics, advertising or crash-reporting SDKs and does not track you across apps or websites owned by other companies. We do not sell personal information or use it for advertising.",
      deletion:
        "**Delete All Local Data** in Settings erases analyses on your device. **Delete Account** in Settings deletes your account and analysis records from our server and revokes the Apple sign-in. We keep purchase records, detached from your account, where tax and accounting rules require it. Our server never stores review text or quotes: it keeps only an analysis ID, the number of themes and whether a credit was charged.",
    },
    support: {
      restoreWhere: "on the credits screen",
      faq: [
        { q: "Do I need an account?", a: "No, not for analysis. Importing reviews and finding themes runs on your device without an account. Sign in with Apple only to use smart runs." },
        { q: "What is a credit?", a: "One smart run uses one credit. Every account starts with 3 free credits. Pro includes 25 credits a month, and you can buy credit packs any time." },
        { q: "My smart run failed. Did I lose a credit?", a: "No. A credit is charged only when a smart run completes. If you think you were charged for a failed run, email us." },
      ],
    },
    terms: {
      purchases: "Credits are used for smart runs and have no cash value.",
      extra: [{ h: "AI-generated suggestions", body: "Smart-run fixes are written by an AI model and may be wrong or incomplete. Review them before acting on them. You must have the right to analyze any reviews you import." }],
    },
  },

  // ───────────────────────────────── Aftercall
  {
    slug: "aftercall",
    minIOS: "17",
    name: "Aftercall",
    tagline: "Help now. Clarity later. A private decision partner.",
    icon: false,
    appStoreId: null,
    bundleId: "com.provenmachine.aftercall",
    email: "aftercall@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "subscription",
    description: ["Talk a decision through, track it, and come back later to score how it turned out, so you learn how good your calls really are."],
    features: ["Guided decision conversations", "Decision tracking with review reminders", "Calibration over time"],
    ledger: {
      headline: "Your conversations stay on your iPhone.",
      collected: no("We never receive your conversations, decisions or profile."),
      leaves: no("Aftercall’s decision help runs on your device. It makes no network requests with your data."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "Aftercall stores the following on your device only:",
        items: [
          "Conversations and the decisions you track",
          "An optional profile you fill in (name, goals, constraints, income range, notes), used to tailor guidance",
          "App settings",
        ],
      },
      networkIntro: "Nothing. Decision help is generated on your device, and the app makes no network requests with your data. If a future version adds cloud-powered help, we will update this policy and ask before anything is sent.",
      network: [],
      permissions: [{ name: "Notifications", why: "Reminding you to review a decision, scheduled on the device" }],
      purchases:
        "Aftercall Pro is an optional subscription (monthly or yearly, with a one-week free trial on eligible plans) sold through Apple’s App Store. Apple processes the payment; we never see your payment details.",
      deletion: "Deleting the app removes all of its data from your device. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [
        { q: "What does the free version include?", a: "5 decision helps a month and your 10 most recent scored decisions. Aftercall Pro removes both limits." },
        { q: "Is my profile sent anywhere?", a: "No. Your profile stays on your device and is used only to tailor the guidance the app shows you." },
      ],
    },
    terms: {
      disclaimer: "Aftercall helps you think decisions through. It does not give financial, medical, legal or other professional advice, and you are responsible for your own decisions.",
    },
  },

  // ───────────────────────────────── PackQueue
  {
    slug: "packqueue",
    minIOS: "17",
    name: "PackQueue",
    tagline: "Photograph a box, get the next number, keep packing.",
    icon: true,
    appStoreId: null,
    bundleId: "com.antoniovargas.PackQueue",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: "one-time",
    description: ["A moving-day packing log. Snap what goes in each box, get its number, and know exactly where everything is when you unpack."],
    features: ["Numbered boxes with photos", "Stack Maps that read box labels on your device", "Move Proof PDF and JSON export"],
    ledger: {
      headline: "Your boxes and photos stay on your iPhone.",
      collected: no("We never receive your photos or packing lists."),
      leaves: no("PackQueue makes no network requests. There is no account."),
      shared: no("Nothing is shared unless you export and send it yourself."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: {
        intro: "PackQueue stores the following on your device only:",
        items: ["Boxes, their contents and their photos", "Stack Map photos and the box labels read from them on your device", "Camera and app settings"],
      },
      network: [],
      permissions: [{ name: "Camera", why: "Photographing boxes and stacks. Labels are read on your device with Apple’s Vision framework." }],
      purchases: "PackQueue Pro is an optional one-time purchase sold through Apple’s App Store. Apple processes the payment; we never see your payment details.",
      deletion:
        "Use **Delete all** in the app’s settings to erase every box and photo. You can export a JSON manifest with photos first. Deleting the app removes all of its data. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: {
      faq: [{ q: "What does the free version include?", a: "Up to 5 boxes and 1 Stack Map. PackQueue Pro unlocks unlimited boxes and Stack Maps and the Move Proof PDF." }],
    },
  },

  // ───────────────────────────────── RationaleLab (not yet public: hidden from the index)
  {
    slug: "rationalelab",
    minIOS: "18",
    name: "RationaleLab",
    hidden: true,
    tagline: "Offline scenario practice for architecture certification study.",
    icon: false,
    appStoreId: null,
    bundleId: "com.local.rationalelab",
    email: "support@provenmachine.com",
    updated: UPDATED,
    purchaseKind: null,
    description: ["Work through original scenario questions offline and see the reasoning behind each answer."],
    ledger: {
      headline: "Your progress stays on your device.",
      collected: no("We never receive your answers or progress."),
      leaves: no("RationaleLab works fully offline and makes no network requests."),
      shared: no("Nothing is shared because nothing is sent."),
      tracking: no("No analytics, ads or tracking SDKs."),
    },
    privacy: {
      stores: { intro: "RationaleLab stores your answers and progress in a single file in the app’s private storage on your device. All questions are built into the app." },
      network: [],
      permissions: [],
      purchases: "RationaleLab has no purchases.",
      deletion: "Deleting the app removes all of its data from your device. Because we never receive your data, there is nothing for us to delete on our side.",
    },
    support: { faq: [] },
  },
];
