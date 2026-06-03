import type { CardRow } from "../content/modelCard";

export function ModelCardTable({
  rows,
  caption,
}: {
  rows: CardRow[];
  caption: string;
}) {
  return (
    <table className="model-card-table">
      <caption className="visually-hidden">{caption}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
