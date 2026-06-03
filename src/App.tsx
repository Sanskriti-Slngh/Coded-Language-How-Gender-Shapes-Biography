import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import "./App.css";
import DocPanel from "./components/DocPanel";
import LatentIntro, {
  type FilterOptions,
  type GenderOption,
  type PointColorMode,
  type PointFilters,
  type TimePeriodFilter,
  type LatentLoadProgress,
} from "./components/LatentIntro";
import SiteNav from "./components/SiteNav";
import { HOME_GUIDE_ITEMS, SITE_TITLE } from "./content/siteCopy";
import type { SiteSection } from "./content/types";
import { getDeviceMode } from "./utils/devicePerformance";

const DEFAULT_FILTERS: PointFilters = {
  search: "",
  genders: [],
  timePeriods: [],
  fields: [],
  careers: [],
  buckets: [],
};

const TIME_PERIOD_OPTIONS: Array<{
  value: TimePeriodFilter;
  label: string;
}> = [
  { value: "before1800", label: "Before 1800" },
  { value: "1800to1849", label: "1800–1849" },
  { value: "1850to1899", label: "1850–1899" },
  { value: "1900to1949", label: "1900–1949" },
  { value: "1950plus", label: "1950+" },
  { value: "unknown", label: "Unknown dates" },
];

function toggleArrayValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}

function readInitialBioId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  const params = new URLSearchParams(window.location.search);
  return params.get("bio")?.trim() || null;
}

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [pointColorMode, setPointColorMode] =
    useState<PointColorMode>("local");
  const [filters, setFilters] = useState<PointFilters>(DEFAULT_FILTERS);
  const [searchDraft, setSearchDraft] = useState(DEFAULT_FILTERS.search);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    fieldOptions: [],
    careerOptions: [],
    bucketOptions: [],
  });
  const [visibleCount, setVisibleCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isPointSelected, setIsPointSelected] = useState(false);
  const [isLatentReady, setIsLatentReady] = useState(false);
  const [hasEntrancePlayed, setHasEntrancePlayed] = useState(false);
  const [hasPressedExplore, setHasPressedExplore] = useState(false);
  const [isEntranceDismissed, setIsEntranceDismissed] = useState(false);
  const [activeSection, setActiveSection] = useState<SiteSection | null>(null);
  const [isDocOpen, setIsDocOpen] = useState(false);
  const [docScrollTarget, setDocScrollTarget] = useState<SiteSection | null>(null);
  const [requestedBioId, setRequestedBioId] = useState<string | null>(
    () => readInitialBioId(),
  );
  const exploreExitTimeoutRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState<LatentLoadProgress>({
    loaded: 0,
    total: 0,
    phase: "Preparing latent space",
    isReady: false,
  });
  const [deviceMode] = useState(() => getDeviceMode());
  const uiShellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entranceTimer = window.setTimeout(() => {
      setHasEntrancePlayed(true);
    }, 5000);

    return () => window.clearTimeout(entranceTimer);
  }, []);

  useEffect(() => {
    return () => {
      if (exploreExitTimeoutRef.current !== null) {
        window.clearTimeout(exploreExitTimeoutRef.current);
      }
    };
  }, []);

  const canPressExplore = hasEntrancePlayed && isLatentReady;
  const isHomeIntroReady = isEntranceDismissed && isLatentReady;

  function handleExplorePress() {
    if (!canPressExplore || hasPressedExplore) return;

    setHasPressedExplore(true);

    if (exploreExitTimeoutRef.current !== null) {
      window.clearTimeout(exploreExitTimeoutRef.current);
    }

    exploreExitTimeoutRef.current = window.setTimeout(() => {
      setIsEntranceDismissed(true);
    }, 650);
  }

  function handlePagePointerDownCapture(event: ReactPointerEvent) {
    if (!isHomeIntroReady) return;

    const target = event.target as HTMLElement;
    if (
      target.closest(
        ".home-guide, .start-here, .faq-overlay, .entrance-overlay, .view-controls, .explore-sidebar, .site-nav",
      )
    ) {
      return;
    }

    if (!isEntered) {
      setIsEntered(true);
    }
  }

  function openDocSection(section: SiteSection) {
    setDocScrollTarget(section);
    setIsDocOpen(true);
    setActiveSection(section);
  }

  function handleNavigate(section: SiteSection) {
    setActiveSection(section);

    if (section === "explore") {
      setIsDocOpen(false);
      setIsEntered(true);
      return;
    }

    openDocSection(section);
  }

  const handleRequestedBioIdHandled = useCallback(() => {
    setRequestedBioId(null);
  }, []);

  function stopIntroPointer(event: ReactPointerEvent) {
    event.stopPropagation();
  }

  useEffect(() => {
    if (!requestedBioId || !isLatentReady) return;
    setIsEntered(true);
  }, [requestedBioId, isLatentReady]);

  function updateSearch(search: string) {
    setSearchDraft(search);
  }

  function applySearch(search = searchDraft) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      search: search.trim(),
    }));
  }

  function clearSearch() {
    setSearchDraft("");
    setFilters((currentFilters) => ({
      ...currentFilters,
      search: "",
    }));
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      applySearch();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      clearSearch();
    }
  }

  function toggleGender(gender: GenderOption) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      genders: toggleArrayValue(currentFilters.genders, gender),
    }));
  }

  function toggleTimePeriod(timePeriod: TimePeriodFilter) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      timePeriods: toggleArrayValue(currentFilters.timePeriods, timePeriod),
    }));
  }

  function toggleField(field: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      fields: toggleArrayValue(currentFilters.fields, field),
    }));
  }

  function toggleCareer(career: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      careers: toggleArrayValue(currentFilters.careers, career),
    }));
  }

  function toggleBucket(bucketId: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      buckets: toggleArrayValue(currentFilters.buckets, bucketId),
    }));
  }

  function clearFilters() {
    setSearchDraft("");
    setFilters(DEFAULT_FILTERS);
  }

  const handleVisibleCountChange = useCallback((visible: number, total: number) => {
    setVisibleCount(visible);
    setTotalCount(total);
  }, []);

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.genders.length > 0 ||
    filters.timePeriods.length > 0 ||
    filters.fields.length > 0 ||
    filters.careers.length > 0 ||
    filters.buckets.length > 0;
  const isSearchPending = searchDraft.trim() !== filters.search.trim();

  const entrancePercent = loadProgress.total > 0
    ? Math.round((loadProgress.loaded / loadProgress.total) * 100)
    : 0;
  const entranceProgressPercent = hasPressedExplore || canPressExplore
    ? 100
    : Math.max(8, entrancePercent);
  const entranceStatus = hasPressedExplore
    ? "Opening the map…"
    : !hasEntrancePlayed
      ? "Letting the entrance play while the map prepares…"
      : !isLatentReady
        ? `${loadProgress.phase}…`
        : "Press Explore to see how biography language clusters.";
  const entranceButtonLabel = hasPressedExplore
    ? "Opening…"
    : canPressExplore
      ? "Explore"
      : hasEntrancePlayed
        ? "Loading map…"
        : "Entrance playing…";

  return (
    <main
      className={`home-page ${isEntered ? "is-entered" : "is-intro"} ${
        isPointSelected ? "has-selected-point" : ""
      } ${isLatentReady ? "is-latent-ready" : "is-loading-latent"} ${
        isHomeIntroReady ? "is-home-intro-ready" : "is-entrance-active"
      } ${hasPressedExplore ? "has-pressed-explore" : ""} ${
        deviceMode.isMobileLayout ? "is-mobile-like" : ""
      }`}
      aria-label={
        deviceMode.isMobileLayout && isHomeIntroReady && !isEntered
          ? "Gendered Language in Biographies"
          : undefined
      }
      onPointerDownCapture={handlePagePointerDownCapture}
    >
      {isHomeIntroReady && (
        <SiteNav activeSection={activeSection} onNavigate={handleNavigate} />
      )}

      <LatentIntro
        isEntered={isEntered}
        pointColorMode={pointColorMode}
        filters={filters}
        onFilterOptionsChange={setFilterOptions}
        onVisibleCountChange={handleVisibleCountChange}
        onSelectedPointChange={setIsPointSelected}
        onLoadProgressChange={setLoadProgress}
        onLatentReadyChange={setIsLatentReady}
        isHomeIntroReady={isHomeIntroReady}
        uiShellRef={uiShellRef}
        requestedBioId={requestedBioId}
        onRequestedBioIdHandled={handleRequestedBioIdHandled}
      />

      {!isHomeIntroReady && (
        <section
          className={`entrance-overlay ${hasEntrancePlayed ? "is-waiting-for-map" : ""} ${canPressExplore ? "is-ready-to-explore" : ""} ${hasPressedExplore ? "has-pressed-explore" : ""}`}
          aria-label="Gendered Language in Biographies entrance"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="entrance-card">
            <p className="entrance-eyebrow">Public biographies → visible patterns</p>
            <h1 className="entrance-title">
              {deviceMode.isMobileLayout
                ? ""
                : "Gendered Language in Biographies"}
            </h1>

            <p className="entrance-purpose">
              An interactive analysis of how public biographies describe men and women
              differently—each dot is one biography, and nearby dots use similar language.
            </p>

            <div className="entrance-mini-grid" aria-label="How to read the exhibit">
              <div className="entrance-mini-card">
                <strong>1. See the patterns</strong>
                <span>Each dot is a biography. Nearby dots are written in similar ways.</span>
              </div>
              <div className="entrance-mini-card">
                <strong>2. Open a biography</strong>
                <span>Click any dot to see the person, similar profiles, and the strongest woman/man text patterns in the text.</span>
              </div>
              <div className="entrance-mini-card">
                <strong>3. Ask what changes</strong>
                <span>Recompute the view on different subsets of data to see how patterns shift within the biographies currently on screen.</span>
              </div>
            </div>

            <div
              className={`entrance-progress ${canPressExplore ? "is-complete" : ""} ${hasPressedExplore ? "is-green" : ""}`}
              aria-hidden="true"
            >
              <span style={{ width: `${entranceProgressPercent}%` }} />
            </div>

            <button
              className="entrance-explore-button"
              type="button"
              disabled={!canPressExplore || hasPressedExplore}
              onClick={handleExplorePress}
              onPointerDown={(event) => event.stopPropagation()}
            >
              {entranceButtonLabel}
            </button>

            <p className="entrance-status" aria-live="polite">
              {entranceStatus}
            </p>
          </div>
        </section>
      )}

      <section className="intro-content">
        {!(deviceMode.isMobileLayout && isHomeIntroReady && !isEntered) && (
          <h1 className="site-title-center">{SITE_TITLE}</h1>
        )}

        {isHomeIntroReady && !isEntered && (
          <>
            <section className="home-guide" aria-label="About this project">
              <div className="home-guide-grid">
                {HOME_GUIDE_ITEMS.map((item) => (
                  <div key={item.label} className="home-guide-item">
                    <p className="home-guide-label">{item.label}</p>
                    <p className="home-guide-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="start-here" aria-label="Start here">
              <h2 className="start-here-title">Start Here</h2>
              <div className="start-here-actions">
                <button
                  type="button"
                  className="start-here-button start-here-button--primary"
                  onPointerDown={stopIntroPointer}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNavigate("explore");
                  }}
                >
                  Explore the Map
                </button>
                <button
                  type="button"
                  className="start-here-button"
                  onPointerDown={stopIntroPointer}
                  onClick={(event) => {
                    event.stopPropagation();
                    openDocSection("evaluation");
                  }}
                >
                  Evaluation
                </button>
                <button
                  type="button"
                  className="start-here-button"
                  onPointerDown={stopIntroPointer}
                  onClick={(event) => {
                    event.stopPropagation();
                    openDocSection("how-it-works");
                  }}
                >
                  How It Works
                </button>
              </div>
            </section>
          </>
        )}

        <p className={`click-hint${isHomeIntroReady ? "" : " is-waiting"}`}>
          {isHomeIntroReady && !isEntered
            ? "Or click anywhere on the map to enter"
            : "Click anywhere to enter"}
        </p>

        <h1 className="site-title-corner" aria-hidden="true">
          {deviceMode.isMobileLayout
            ? ""
            : "Gendered Language in Biographies"}
        </h1>
      </section>

      <DocPanel
        isOpen={isDocOpen}
        scrollTarget={docScrollTarget}
        onClose={() => {
          setIsDocOpen(false);
          setDocScrollTarget(null);
        }}
      />

      <div ref={uiShellRef} id="home-ui-shell" className="home-ui-shell">
      <div
        className="view-controls"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="view-toggle-row">
          <button
            className={pointColorMode === "raw" ? "active" : ""}
            onClick={() => setPointColorMode("raw")}
          >
            Raw labels
          </button>

          <button
            className={pointColorMode === "local" ? "active" : ""}
            onClick={() => setPointColorMode("local")}
          >
            Local pattern
          </button>
        </div>

        <p className="view-mode-note">
          Raw shows source metadata labels. Local colors each dot by the gender
          labels of nearby biographies in embedding space (distributional patterns).
        </p>
      </div>

      {!isPointSelected && (
        <div
          className="explore-sidebar"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="faq-floating-button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              openDocSection("how-it-works");
            }}
          >
            Full guide
          </button>

          <aside
            className="explore-filters"
            aria-label="Explore biography filters"
          >
          <div className="filter-header">
            <span className="filter-title">Explore</span>
            <span className="filter-count">
              {visibleCount} / {totalCount} shown
            </span>
          </div>

          <label className="filter-label">
            Search person, field, source, frame evidence, similar profiles, or masked text
            <input
              value={searchDraft}
              onChange={(event) => updateSearch(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder='Try: Ada chemist, "named awards", mathematics...'
            />
            <span className="filter-search-help">
              Press Enter or Search to update the visible cluster.
            </span>
          </label>

          <div className="filter-search-actions">
            <button
              type="button"
              className="filter-search-button"
              disabled={!isSearchPending}
              onClick={() => applySearch()}
            >
              Search
            </button>

            <button
              type="button"
              className="filter-search-button secondary"
              disabled={searchDraft.trim().length === 0 && filters.search.trim().length === 0}
              onClick={clearSearch}
            >
              Clear search
            </button>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Gender labels</div>
            <div className="filter-chip-row" aria-label="Gender filters">
              <button
                className={`filter-chip ${filters.genders.length === 0 ? "active" : ""}`}
                onClick={() =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    genders: [],
                  }))
                }
              >
                All
              </button>

              <button
                className={`filter-chip ${filters.genders.includes("woman") ? "active" : ""}`}
                onClick={() => toggleGender("woman")}
              >
                Women
              </button>

              <button
                className={`filter-chip ${filters.genders.includes("man") ? "active" : ""}`}
                onClick={() => toggleGender("man")}
              >
                Men
              </button>
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Time periods</div>
            <div className="filter-chip-row" aria-label="Time period filters">
              {TIME_PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`filter-chip ${
                    filters.timePeriods.includes(option.value) ? "active" : ""
                  }`}
                  onClick={() => toggleTimePeriod(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Fields</div>
            <div className="option-chip-grid" aria-label="Field filters">
              {filterOptions.fieldOptions.map((field) => (
                <button
                  key={field}
                  className={`option-chip ${filters.fields.includes(field) ? "active" : ""}`}
                  onClick={() => toggleField(field)}
                >
                  {field}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Roles / careers</div>
            <div className="option-chip-grid" aria-label="Role and career filters">
              {filterOptions.careerOptions.map((career) => (
                <button
                  key={career}
                  className={`option-chip ${filters.careers.includes(career) ? "active" : ""}`}
                  onClick={() => toggleCareer(career)}
                >
                  {career}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-section-title">Frame evidence</div>
            <div className="bucket-chip-grid" aria-label="Frame evidence filters">
              {filterOptions.bucketOptions.map((bucket) => (
                <button
                  key={bucket.bucketId}
                  className={`bucket-filter-chip ${
                    filters.buckets.includes(bucket.bucketId) ? "active" : ""
                  }`}
                  onClick={() => toggleBucket(bucket.bucketId)}
                  title={`${bucket.displayName}: ${bucket.topTerms.join("; ")}`}
                >
                  <span className="bucket-filter-name">
                    {bucket.displayName}
                  </span>
                  <span className={`bucket-filter-lean ${bucket.bucketLean}`}>
                    {bucket.bucketLean === "woman" ? "woman-associated" : bucket.bucketLean === "man" ? "man-associated" : "unlabeled"}
                  </span>
                  <span className="bucket-filter-preview">
                    {bucket.topTerms.slice(0, 4).join(" · ") || "No evidence phrases"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="clear-filters-button"
            disabled={!hasActiveFilters && searchDraft.trim().length === 0}
            onClick={clearFilters}
          >
            Clear filters
          </button>
          </aside>
        </div>
      )}

      <div className="gender-legend">
        {pointColorMode === "raw" ? (
          <>
            <span>
              <i className="legend-dot woman-dot" />
              Woman label
            </span>

            <span>
              <i className="legend-dot man-dot" />
              Man label
            </span>
          </>
        ) : (
          <div className="gradient-legend">
            <span>Man-leaning</span>
            <div className="gradient-bar" />
            <span>Woman-leaning</span>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}

export default App;
