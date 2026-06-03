import { METHOD_PIPELINE_STEPS } from "../content/siteCopy";

export default function MethodPipeline({ className = "" }: { className?: string }) {
  return (
    <ol className={`method-pipeline-flow${className ? ` ${className}` : ""}`}>
      {METHOD_PIPELINE_STEPS.map((step, index) => (
        <li key={step} className="method-pipeline-step">
          <span className="method-pipeline-step-index">{index + 1}</span>
          <span className="method-pipeline-step-label">{step}</span>
          {index < METHOD_PIPELINE_STEPS.length - 1 && (
            <span className="method-pipeline-arrow" aria-hidden="true">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
