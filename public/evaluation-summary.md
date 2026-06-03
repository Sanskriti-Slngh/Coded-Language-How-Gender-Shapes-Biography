# Gender neighborhood technical validation

This summary supports the **Evaluation** section of the interactive site. It tests whether local gender neighborhoods in biography embedding space carry more structure than random neighborhoods of the same size.

## Dataset (analysis run)

- Points analyzed: **79,680**
- Woman-labeled: **16,039** · Man-labeled: **63,641**
- Global woman rate: **20.13%**
- Neighborhood size **k = 30** (full MPNet embedding space)

## Track A — Precomputed full-embedding neighbors (primary)

Uses bundled `local_woman_share` from the upstream MPNet k-NN pipeline (not 3D map coordinates).

| Metric | Real nearest neighbors | Random neighbors | Difference |
| --- | ---: | ---: | ---: |
| Avg. local gender concentration | 0.8329 | 0.7987 | +0.0341 |
| Avg. agreement with known gender label | 86.26% | 79.87% | +6.39 pp |

Real embedding neighborhoods show higher gender concentration and higher agreement between neighborhood lean and source gender label than random neighbors sampled from the same dataset.

**Statistical support:** paired t-tests p ≈ 0 for both concentration and agreement; Pearson r (own label vs real share) = 0.6232.

## Track B — 3D map neighbors (website validation)

Recomputing k nearest neighbors on bundled 3D projection coordinates (as the site can do for explored subsets) is **lossy**:

| Metric | Real (3D) | Random | Difference |
| --- | ---: | ---: | ---: |
| Avg. concentration | 0.8053 | 0.7987 | +0.0066 |
| Label agreement | 79.61% | 79.87% | −0.26 pp |

The public 3D map is an exploratory view; **precomputed full-embedding neighborhoods (Track A) are the definitive validation.**

## Conclusion

Local gender neighborhoods in embedding space are **not random**. Track A shows +0.034 concentration above chance and +6.4 percentage points label agreement above chance, with strong statistical support.

Full report: [gender_neighborhood_sanity_report.md](https://github.com/Sanskriti-Slngh/Coded-Language-How-Gender-Shapes-Biography/blob/main/analysis/gender_neighborhood_sanity_report.md)
