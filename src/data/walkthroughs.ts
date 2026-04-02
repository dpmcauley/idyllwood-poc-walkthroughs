export interface Screen {
  tier1?: string;
  tier2?: string;
  content: string;
  visual?: string;
}

export interface PoC {
  slug: string;
  title: string;
  emotionalHook: string;
  transformation: string;
  keyFeature: string;
  mcp?: string;
  description: string;
  screens: Screen[];
}

export const WALKTHROUGHS: Record<string, PoC> = {
  "mistakes-over": {
    slug: "mistakes-over",
    title: "Mistakes Over, Now What?",
    emotionalHook: "Meeting chaos into clarity",
    transformation: "Transcript to bullet points",
    keyFeature: "Granola MCP",
    mcp: "Granola MCP",
    description: "Transform meeting transcripts into actionable summaries using Claude and Granola MCP integration.",
    screens: [
      {
        tier1: "Have you ever walked out of a meeting unsure what actually got decided?",
        tier2: "Recording, transcript extraction, and intent parsing via Claude.",
        content: "Things got decided. Owners were named. Nobody wrote it down — and by tomorrow, half the room will remember it differently.",
      },
      {
        tier1: "Upload happens once, decisions appear instantly.",
        tier2: "Supabase handles the file, Claude processes the transcript asynchronously.",
        content: "Upload your meeting recording (audio or transcript). The system prepares it for processing.",
      },
      {
        tier1: "Claude reads the entire meeting context.",
        tier2: "Prompt engineered to extract: Decisions, Action Items, Owners, Deadlines.",
        content: "Claude analyzes the full transcript and extracts structured decisions and action items.",
      },
      {
        tier1: "See who said what, who owns what.",
        tier2: "Speaker diarization via Granola MCP, task assignment normalization.",
        content: "Granola MCP adds context: speaker identification, emphasis markers, tone indicators.",
      },
      {
        tier1: "Click \"Export to Slack\" and your team gets a threaded summary.",
        tier2: "Slack Block Kit formatting, webhook integration, deduplication logic.",
        content: "Export structured decisions as: Slack message, shared document, or calendar invites.",
      },
      {
        tier1: "Every decision is dated, owned, and tracked.",
        tier2: "Supabase audit log, real-time sync to project management tools (Asana, Linear, Notion).",
        content: "All decisions logged to a central decision ledger for full traceability.",
      },
      {
        tier1: "This meeting intelligence feeds your team\'s next workflow.",
        tier2: "Webhook triggers for downstream automation (CRM updates, project status, alert logic).",
        content: "Decision outcomes automatically update downstream tools and trigger follow-up workflows.",
      },
    ],
  },
  "your-day-60": {
    slug: "your-day-60",
    title: "Your Day in 60 Seconds",
    emotionalHook: "Morning chaos into one briefing",
    transformation: "6 apps to one briefing",
    keyFeature: "Dispatch + connectors",
    mcp: "Dispatch",
    description: "Consolidate email, Slack, calendar, and task updates into a single morning briefing.",
    screens: [
      {
        tier1: "You check 6 different apps before your first coffee.",
        tier2: "OAuth2 connections to Gmail, Slack, Asana, Google Calendar, Linear, Notion.",
        content: "The problem: Your morning is fragmented across email, Slack, calendar, tasks, and more.",
      },
      {
        tier1: "Click \"Morning Briefing\" once, grab your coffee.",
        tier2: "Dispatch aggregates all sources via a unified webhook/API layer.",
        content: "One click generates your personalized 60-second briefing from all your connected tools.",
      },
      {
        tier1: "Urgent Slack threads highlighted at the top.",
        tier2: "Slack API for thread unread counts, urgency scoring via Claude sentiment analysis.",
        content: "Your briefing prioritizes urgent messages and action items from Slack conversations.",
      },
      {
        tier1: "Your 3 key meetings today — with prep notes already loaded.",
        tier2: "Google Calendar API, meeting context from participant emails + prep documents.",
        content: "Calendar section shows your day\'s key meetings with pre-loaded prep and agendas.",
      },
      {
        tier1: "Top 3 overdue or due-today tasks displayed.",
        tier2: "Asana + Linear API polling, priority weighting algorithm via Claude.",
        content: "Task inbox distilled to the 3 items that matter most for today.",
      },
      {
        tier1: "Any decisions made yesterday that affect your work today.",
        tier2: "Notion database queries, decision ledger lookups from the Mistakes Over integration.",
        content: "Previous day\'s decisions and action items relevant to your current work are highlighted.",
      },
      {
        tier1: "Share, print, or ask Claude follow-up questions about your day.",
        tier2: "Export to PDF, Slack, email; real-time Q&A with Claude on briefing content.",
        content: "Fully interactive: export, share, drill-in, or ask clarifying questions in real-time.",
      },
    ],
  },
  "receipt-box": {
    slug: "receipt-box",
    title: "Receipt Box",
    emotionalHook: "Procrastination guilt into spreadsheet automation",
    transformation: "Photos to spreadsheet entries",
    keyFeature: "Vision + folder processing",
    mcp: "Vision + folder processing",
    description: "Turn receipts and invoices into spreadsheet rows automatically with Claude Vision.",
    screens: [
      {
        tier1: "A pile of receipts on your desk. You\'ve been ignoring them for weeks.",
        tier2: "Computer vision OCR, expense categorization, vendor normalization via Granola MCP.",
        content: "The problem: Receipt data entry is tedious. You avoid it. Taxes suffer.",
      },
      {
        tier1: "Snap a photo. Drop it in one folder. That\'s the entire workflow.",
        tier2: "Folder watcher via Node.js or Zapier triggers a Lambda on each new file. Works from phone, desktop, or Dropbox.",
        content: "Set up a watched folder once. From there, just drop receipts in as you go — from your camera roll, desktop, or cloud sync.",
      },
      {
        tier1: "Claude Vision reads the receipt: vendor, amount, date, items.",
        tier2: "Claude Vision API, regex for common date/currency formats, fuzzy matching on vendor names.",
        content: "Claude Vision extracts all key fields: vendor, total, items, and tax amount.",
      },
      {
        tier1: "\"Home Depot, $47.32, 2024-03-15\" — instantly categorized as \"Supplies.\"",
        tier2: "Category rules engine, merchant category mapping from Stripe/Plaid datasets, LLM refinement.",
        content: "Receipt is automatically categorized and normalization rules applied (e.g., \"HD\" → \"Home Depot\").",
      },
      {
        tier1: "See a row appear in your Google Sheet in real-time.",
        tier2: "Google Sheets API v4, concurrent appends, data validation formulas.",
        content: "Extracted data is pushed to your Google Sheet as a new row with all fields populated.",
      },
      {
        tier1: "Export for tax prep, reconciliation, or monthly review.",
        tier2: "CSV export, IIF format for QuickBooks import, PDF report generation.",
        content: "All receipts are stored, searchable, and exportable for tax filing or accounting reconciliation.",
      },
    ],
  },
};
