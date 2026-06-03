import { NAV_ITEMS } from "../content/siteCopy";
import type { SiteSection } from "../content/types";

type SiteNavProps = {
  activeSection: SiteSection | null;
  onNavigate: (section: SiteSection) => void;
};

export default function SiteNav({ activeSection, onNavigate }: SiteNavProps) {
  return (
    <nav className="site-nav" aria-label="Main">
      <ul className="site-nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`site-nav-button${activeSection === item.id ? " is-active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
