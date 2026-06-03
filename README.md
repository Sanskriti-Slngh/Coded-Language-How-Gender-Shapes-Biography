# Gendered Language in Biographies (interactive site)

React + Vite site for exploring distributional language patterns in public biographies using embedding neighborhoods and frame evidence.

## Development

```bash
npm install
npm run dev
```

Large CSV files live under `public/data/` and are gitignored except `public_frame_definitions.csv`. Download or generate them locally before running the map.

## Data prep scripts

```bash
# Gender neighborhood sanity check → analysis/gender_neighborhood_sanity_report.md
npm run sanity-check:gender:setup   # once
npm run sanity-check:gender
```

## Reviewer URLs

- `?bio=WIKI_Q…` — open a specific biography by `bio_id`

## Build

```bash
npm run build
npm run preview
```

## Repository

https://github.com/Sanskriti-Slngh/Coded-Language-How-Gender-Shapes-Biography
