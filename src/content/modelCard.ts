export type CardRow = { label: string; value: string };

export const DATASET_CARD: CardRow[] = [
  { label: "Biographies", value: "79,680" },
  {
    label: "Gender labels (source metadata)",
    value: "16,039 woman-labeled · 63,641 man-labeled (~20.1% / ~79.9%)",
  },
  {
    label: "Unique people",
    value: "One biography per point in this release (see paper for deduplication rules)",
  },
  {
    label: "Source types",
    value: "Academic profiles and Wikipedia-style public biographies",
  },
  {
    label: "Fields & careers",
    value: "Broad coverage with known field imbalance; use map filters to inspect subsets",
  },
  {
    label: "Biography length (words)",
    value: "Median 113 · p10 67 · p90 270 (from bundled corpus)",
  },
  {
    label: "Cleaning rules",
    value: "Public biography text normalized for analysis; explicit gender terms masked before embedding (details in paper)",
  },
  {
    label: "Exclusion rules",
    value: "Records without usable text or coordinates excluded upstream (see paper)",
  },
];

export const MODEL_CARD: CardRow[] = [
  {
    label: "Embedding model",
    value: "sentence-transformers/all-mpnet-base-v2 (MPNet)",
  },
  {
    label: "Similarity",
    value: "Cosine similarity in full embedding space",
  },
  {
    label: "Nearest neighbors (primary)",
    value: "k = 30 in full MPNet space (precomputed local_woman_share per biography)",
  },
  {
    label: "Map layout",
    value: "Bundled 3D coordinates (x, y, z); projection method documented in paper",
  },
  {
    label: "Text masking",
    value: "Explicit gender terms masked before embedding; site shows masked text",
  },
  {
    label: "Spatial clustering",
    value: "None for layout; proximity reflects embedding similarity only",
  },
  {
    label: "Frames / buckets",
    value: "Data-driven phrase-classifier buckets (not k-means map clusters)",
  },
  {
    label: "Local gender score",
    value:
      "Share of woman-labeled biographies among k nearest neighbors in full embedding space; concentration and label agreement validated vs. random baselines",
  },
  {
    label: "On-site recomputation",
    value:
      "Optional explored-local view recomputes neighbors on 3D coordinates (lossy vs. full embedding; see Evaluation)",
  },
];

export const LIMITATIONS_CARD: CardRow[] = [
  {
    label: "Gender labels",
    value:
      "Binary labels from source metadata are imperfect and socially complex; they do not capture full identity",
  },
  {
    label: "Source bias",
    value: "Public biographies reflect platform, era, and notability biases",
  },
  {
    label: "Field imbalance",
    value: "Uneven field representation can shape local neighborhoods",
  },
  {
    label: "Embeddings",
    value: "Language models can encode social patterns present in training data",
  },
  {
    label: "Exploratory scope",
    value:
      "This tool surfaces corpus-level distributional patterns; it is not a classifier of individual bias or author intent",
  },
];

export const GITHUB_REPO =
  "https://github.com/Sanskriti-Slngh/Coded-Language-How-Gender-Shapes-Biography";

export const DATA_DOWNLOADS = [
  {
    href: `${GITHUB_REPO}/blob/main/public/data/mpnet_local_3d_website_points.csv.gz`,
    name: "mpnet_local_3d_website_points.csv.gz",
    description: "All points: masked text, metadata, gender labels, 3D coords (79,680)",
  },
  {
    href: `${GITHUB_REPO}/blob/main/public/data/mpnet_local_3d_website_points_mobile.csv.gz`,
    name: "mpnet_local_3d_website_points_mobile.csv.gz",
    description: "Mobile subset (1,000 points)",
  },
  {
    href: `${GITHUB_REPO}/blob/main/public/data/point_explanations_data_driven_buckets.csv.gz`,
    name: "point_explanations_data_driven_buckets.csv.gz",
    description: "Per-point phrase evidence and pattern scores",
  },
  {
    href: `${GITHUB_REPO}/blob/main/public/data/point_frames_and_similar_profiles.csv.gz`,
    name: "point_frames_and_similar_profiles.csv.gz",
    description: "Frame evidence and similar profiles per biography",
  },
  {
    href: `${GITHUB_REPO}/blob/main/public/data/public_frame_definitions.csv`,
    name: "public_frame_definitions.csv",
    description: "Public frame definitions",
  },
] as const;

export const CONTACT_EMAIL = "sanskritisingh0914@gmail.com";
