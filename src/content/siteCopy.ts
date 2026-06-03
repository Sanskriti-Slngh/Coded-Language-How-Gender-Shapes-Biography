import type { SiteSection } from "./types";

export const SITE_TITLE = "Gendered Language in Biographies";

export const HOME_GUIDE_ITEMS = [
  {
    label: "What is this?",
    text: "An interactive analysis of distributional language patterns in public biographies labeled as women or men in source metadata.",
  },
  {
    label: "Why does it matter?",
    text: "Biographies shape public memory, credibility, and whose achievements feel “important.”",
  },
  {
    label: "What can I do here?",
    text: "Explore the map, neighborhoods, frames, and similar biographies using the top nav and sidebar filters.",
  },
  {
    label: "Why trust it?",
    text: "Built from a documented corpus with masking, embeddings, technical validation, and stated limitations—see Dataset and Evaluation.",
  },
] as const;

export const METHOD_PIPELINE_STEPS = [
  "Collect biographies",
  "Clean text",
  "Mask explicit gender terms",
  "Embed biographies",
  "Reduce to 3D",
  "Compute nearest neighbors",
  "Estimate local gender framing",
  "Show neighborhood summary",
] as const;

export const NAV_ITEMS: Array<{ id: SiteSection; label: string }> = [
  { id: "explore", label: "Explore" },
  { id: "how-it-works", label: "How It Works" },
  { id: "dataset", label: "Dataset" },
  { id: "evaluation", label: "Evaluation" },
  { id: "limitations", label: "Limitations" },
  { id: "github", label: "GitHub / Data" },
];

export const SECTION_HEADINGS: Record<
  Exclude<SiteSection, "explore">,
  { title: string; eyebrow: string }
> = {
  "how-it-works": {
    eyebrow: "Pipeline",
    title: "How it works",
  },
  dataset: {
    eyebrow: "Data card",
    title: "Dataset",
  },
  evaluation: {
    eyebrow: "Technical validation",
    title: "Evaluation",
  },
  limitations: {
    eyebrow: "Read with care",
    title: "Limitations",
  },
  github: {
    eyebrow: "Reproducibility",
    title: "GitHub & data downloads",
  },
};

export const HOW_IT_WORKS_INTRO =
  "Every biography on the map follows the same pipeline—from raw public text to embedding neighborhoods and corpus-level framing summaries.";

export const PURPOSE_COPY = {
  lead: "Are public biographies written differently for women and men in this corpus?",
  body: [
    "A biography is not only facts—it emphasizes awards, leadership, teaching, care, advocacy, or legacy differently.",
    "Each dot is one biography. Nearby dots use similar language in embedding space.",
    "The goal is not to judge one biography as “bad,” but to inspect repeated public writing patterns across many texts.",
  ],
  question:
    "What language appears more often around women-labeled biographies? What appears more often around men-labeled biographies?",
};

export const FINDINGS_COPY = {
  intro:
    "Biographies in this corpus do not appear randomly scattered in embedding space; repeated framing patterns align with gender labels at the neighborhood level.",
  womanFrames: [
    "current research focus",
    "education and teaching",
    "care, health, psychology, or social support",
    "advocacy, justice, access, and inclusion",
    "being a “first” or representing participation in a field",
  ],
  manFrames: [
    "senior titles and prestige",
    "fellowships, academies, and awards",
    "leadership and command roles",
    "technical authority",
    "older historical legacy",
    "business, state, war, or institutional power",
  ],
  caveat:
    "This does not mean every woman-labeled biography reads one way or every man-labeled biography reads another. It does not show author intent—only distributional patterns in public text.",
  summary:
    "When many biographies are compared, gendered patterns of recognition, authority, care, service, and legacy become visible at scale.",
};

export const RAW_LOCAL_COPY = {
  rawLead: "Raw view shows the gender label listed in source metadata for each biography.",
  localLead:
    "Local view colors each dot by the gender labels of nearby biographies in embedding space—surfacing shared framing patterns rather than the label alone.",
  together:
    "Together they separate: Who is labeled woman or man? vs. What kinds of language surround this biography in embedding space?",
};

export const EVALUATION_COPY = {
  summary:
    "Local gender neighborhoods in full MPNet embedding space carry significantly more structure than random neighborhoods of the same size (k = 30, N = 79,680).",
  trackA: [
    { metric: "Avg. local gender concentration", real: "0.8329", random: "0.7987", diff: "+0.0341" },
    { metric: "Agreement with source gender label", real: "86.26%", random: "79.87%", diff: "+6.39 pp" },
  ],
  trackBNote:
    "The interactive map can recompute neighbors on bundled 3D coordinates. That projection is lossy: it retains a small concentration lift over random neighbors but label agreement falls back to roughly chance levels. Precomputed full-embedding shares are the primary validation.",
  reportPath: "analysis/gender_neighborhood_sanity_report.md",
  reportHref: `${import.meta.env.BASE_URL}evaluation-summary.md`,
};

export const AUDIENCE_BULLETS = [
  "students studying gender, media, history, or data",
  "teachers demonstrating how gendered framing appears in public writing",
  "researchers interested in representation",
  "reviewers evaluating corpus-level language patterns",
];
