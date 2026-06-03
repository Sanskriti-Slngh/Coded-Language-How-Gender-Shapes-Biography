import { useLayoutEffect } from "react";
import {
  CONTACT_EMAIL,
  DATA_DOWNLOADS,
  DATASET_CARD,
  GITHUB_REPO,
  LIMITATIONS_CARD,
  MODEL_CARD,
} from "../content/modelCard";
import {
  AUDIENCE_BULLETS,
  EVALUATION_COPY,
  FINDINGS_COPY,
  HOW_IT_WORKS_INTRO,
  PURPOSE_COPY,
  RAW_LOCAL_COPY,
  SECTION_HEADINGS,
} from "../content/siteCopy";
import type { SiteSection } from "../content/types";
import MethodPipeline from "./MethodPipeline";
import { ModelCardTable } from "./ModelCardTable";

type DocPanelProps = {
  isOpen: boolean;
  scrollTarget: SiteSection | null;
  onClose: () => void;
};

const DOC_SECTIONS: Array<Exclude<SiteSection, "explore">> = [
  "how-it-works",
  "dataset",
  "evaluation",
  "limitations",
  "github",
];

export default function DocPanel({ isOpen, scrollTarget, onClose }: DocPanelProps) {
  useLayoutEffect(() => {
    if (!isOpen || !scrollTarget || scrollTarget === "explore") {
      return;
    }
    const el = document.getElementById(`doc-${scrollTarget}`);
    el?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [isOpen, scrollTarget]);

  if (!isOpen) return null;

  return (
    <section
      className="faq-overlay doc-panel-overlay"
      aria-label="Project documentation"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="faq-panel doc-panel">
        <div className="faq-header">
          <div>
            <p className="faq-eyebrow">Documentation</p>
            <h2>Gendered Language in Biographies</h2>
          </div>
          <button type="button" className="faq-close-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="faq-sections">
          <article className="faq-section">
            <h3>Purpose</h3>
            <p>{PURPOSE_COPY.lead}</p>
            {PURPOSE_COPY.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            <p>
              <strong>{PURPOSE_COPY.question}</strong>
            </p>
          </article>

          <article className="faq-section">
            <h3>Key patterns (corpus-level)</h3>
            <p>{FINDINGS_COPY.intro}</p>
            <p>Women-labeled biographies more often show frames connected to:</p>
            <ul className="faq-list">
              {FINDINGS_COPY.womanFrames.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>Men-labeled biographies more often show frames connected to:</p>
            <ul className="faq-list">
              {FINDINGS_COPY.manFrames.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>{FINDINGS_COPY.caveat}</p>
            <p>
              <strong>{FINDINGS_COPY.summary}</strong>
            </p>
          </article>

          {DOC_SECTIONS.map((sectionId) => (
            <article key={sectionId} id={`doc-${sectionId}`} className="faq-section doc-section">
              <p className="faq-eyebrow">{SECTION_HEADINGS[sectionId].eyebrow}</p>
              <h3>{SECTION_HEADINGS[sectionId].title}</h3>

              {sectionId === "how-it-works" && (
                <>
                  <p>{HOW_IT_WORKS_INTRO}</p>
                  <MethodPipeline className="method-pipeline-flow--faq" />
                  <h4 className="faq-subheading">Model summary</h4>
                  <ModelCardTable rows={MODEL_CARD} caption="Model card" />
                  <h4 className="faq-subheading">Raw vs. local coloring</h4>
                  <p>{RAW_LOCAL_COPY.rawLead}</p>
                  <p>{RAW_LOCAL_COPY.localLead}</p>
                  <p>
                    <strong>{RAW_LOCAL_COPY.together}</strong>
                  </p>
                </>
              )}

              {sectionId === "dataset" && (
                <>
                  <ModelCardTable rows={DATASET_CARD} caption="Dataset card" />
                  <p className="doc-section-note">
                    Use map filters to inspect field and career distributions interactively.
                  </p>
                </>
              )}

              {sectionId === "evaluation" && (
                <>
                  <p>{EVALUATION_COPY.summary}</p>
                  <table className="eval-metrics-table">
                    <thead>
                      <tr>
                        <th scope="col">Metric (Track A)</th>
                        <th scope="col">Real k-NN</th>
                        <th scope="col">Random</th>
                        <th scope="col">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EVALUATION_COPY.trackA.map((row) => (
                        <tr key={row.metric}>
                          <th scope="row">{row.metric}</th>
                          <td>{row.real}</td>
                          <td>{row.random}</td>
                          <td>{row.diff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p>{EVALUATION_COPY.trackBNote}</p>
                  <p>
                    <a href={EVALUATION_COPY.reportHref} target="_blank" rel="noreferrer">
                      Read full evaluation summary
                    </a>
                    {" · "}
                    <a
                      href={`${GITHUB_REPO}/blob/main/${EVALUATION_COPY.reportPath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Sanity-check report on GitHub
                    </a>
                  </p>
                </>
              )}

              {sectionId === "limitations" && (
                <ModelCardTable rows={LIMITATIONS_CARD} caption="Limitations" />
              )}

              {sectionId === "github" && (
                <>
                  <p>
                    <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                      Open repository
                    </a>
                    {" · "}
                    License and reproducibility details in the README.
                  </p>
                  <div className="faq-data-table" role="region" aria-label="Available data files">
                    {DATA_DOWNLOADS.map((file) => (
                      <div key={file.name} className="faq-data-row">
                        <a href={file.href} target="_blank" rel="noreferrer">
                          {file.name}
                        </a>
                        <span>{file.description}</span>
                      </div>
                    ))}
                  </div>
                  <p>
                    Questions:{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </p>
                </>
              )}
            </article>
          ))}

          <article className="faq-section">
            <h3>Who is this for?</h3>
            <ul className="faq-list">
              {AUDIENCE_BULLETS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
